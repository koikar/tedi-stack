// CORE
import * as fs from 'node:fs'
import { createHonoServer } from 'react-router-hono-server/bun'
import { Hono } from 'hono/quick'
import sourceMapSupport from 'source-map-support'

// UTILS
// import { compress } from 'hono/compress' // IMPORTANT: This middleware is not compatible with Hono's bun adapter. - https://hono.dev/docs/middleware/builtin/compress
import { i18next } from 'remix-hono/i18next'
import * as Sentry from '@sentry/react-router'
import { serveStatic } from 'hono/bun'
import { poweredBy } from 'hono/powered-by'
import { createMiddleware } from 'hono/factory'
import { getLoadContext } from './context'
import { IS_PROD, ALLOW_INDEXING, IS_DEV } from './utils/misc.ts'

// MIDDLEWARES
import { remixI18Next } from '@/localization/i18n.server'
import { epicLogger } from './middleware/epic-logger.ts'
import { removeTrailingSlash } from './middleware/remove-trailing-slash.ts'
import { secureHeadersMiddleware } from './middleware/secure-headers.ts'
import { rateLimitMiddleware } from './middleware/rate-limit.ts'

// biome-ignore lint/nursery/noProcessEnv: <explanation>
const SENTRY_ENABLED = IS_PROD && process.env.SENTRY_DSN

sourceMapSupport.install({
	retrieveSourceMap: (source) => {
		// get source file without the `file://` prefix or `?t=...` suffix
		const match = source.match(/^file:\/\/(.*)\?t=[.\d]+$/)
		if (match) {
			return {
				url: source,
				map: fs.readFileSync(`${match[1]}.map`, 'utf8'),
			}
		}
		return null
	},
})

if (SENTRY_ENABLED) {
	import('./utils/monitoring.js').then(({ init }) => init())
}

export default await createHonoServer({
	app: new Hono(),
	defaultLogger: false,
	getLoadContext,
	configure: (server) => {
		server.use('*', epicLogger())

		// Handle no ending slashes (SEO)
		server.use(removeTrailingSlash)

		// https://docs.sentry.io/platforms/javascript/guides/remix/profiling/browser/
		server.get('/', async (c, next) => {
			c.header('Document-Policy', 'js-profiling')
			await next()
		})

		// Ensure HTTPS only (X-Forwarded-Proto comes from Fly)
		server.use('*', async (c, next) => {
			if (c.req.method !== 'GET') return await next()

			const proto = c.req.header('X-Forwarded-Proto')
			const host = c.req.header('X-Forwarded-Host') || c.req.header('Host')
			if (proto === 'http') {
				const secureUrl = `https://${host}${c.req.url}`
				return c.redirect(secureUrl, 301)
			}
			await next()
		})

		server.use('*', secureHeadersMiddleware)
		server.use('*', rateLimitMiddleware)
		server.use('*', poweredBy({ serverName: 'TEDI' }))

		// Static file serving middleware for production
		if (!IS_DEV) {
			// Serve immutable assets (cached for a year)
			server.use('/assets/*', serveStatic({ root: './build/client' }))
			// Other static files (cached for an hour)
			server.use('/build/*', serveStatic({ root: './' }))
			server.use('/favicons/*', serveStatic({ root: './build/client' }))
			server.use('/images/*', serveStatic({ root: './build/client' }))
		}

		// Return 404 for missing images/favicons
		// if we made it past the static for these, then we're missing something.
		// So we'll just send a 404 and won't bother calling other middleware.
		server.on('GET', ['/favicons/*', '/images/*'], (c) => {
			return c.text('Not found', 404)
		})

		// No indexing if configured
		if (!ALLOW_INDEXING) {
			server.use(
				createMiddleware(async (c, next) => {
					c.set('X-Robots-Tag', 'noindex, nofollow')
					await next()
				})
			)
		}

		// Handle HTTPS redirection (for production)
		server.use('*', async (c, next) => {
			if (c.req.method !== 'GET') return await next()

			const proto = c.req.header('X-Forwarded-Proto')
			const host = c.req.header('X-Forwarded-Host') || c.req.header('host') || ''

			if (proto === 'http') {
				c.header('X-Forwarded-Proto', 'https')
				return c.redirect(`https://${host}${c.req.path}${c.req.query}`)
			}

			await next()
		})

		// Health check endpoint
		server.get('/r/healthcheck', (c) => {
			return c.json(
				{
					status: 'ok',
					timestamp: new Date().toISOString(),
					uptime: process.uptime(),
				},
				200
			)
		})

		// Add i18next middleware
		server.use('*', i18next(remixI18Next))

		server.onError(async (err, c) => {
			// biome-ignore lint/suspicious/noConsole: <explanation>
			console.error(`${err}`)
			if (SENTRY_ENABLED) {
				Sentry.captureException(err)
				await Sentry.flush(500)
			}
			return c.text('Internal Server Error', 500)
		})
	},
})
