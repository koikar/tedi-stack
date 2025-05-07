// KEEP SENTRY CONFIG AT TOP
import * as Sentry from '@sentry/react-router'

// CORE
import crypto from 'node:crypto'
import { renderToReadableStream } from 'react-dom/server.bun'
import { styleText } from 'node:util'
import { contentSecurity } from '@nichtsam/helmet/content'
import {
	ServerRouter,
	type HandleErrorFunction,
	type AppLoadContext,
	type EntryContext,
} from 'react-router'
import { isbot } from 'isbot'

// I18N
import { createInstance } from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { remixI18Next } from './localization/i18n.server'
import { i18nConfig } from './localization/i18n'
import { resources } from './localization/resource'

// UTILS
import { NonceProvider } from './utils/nonce-provider'
import { makeTimings } from './utils/timing.server'
import { getClientEnv, getServerEnv } from './utils/env.server'

// Initialize environment variables so that they are available in any file
const env = getServerEnv()
global.ENV = getClientEnv()

const MODE = env.NODE_ENV ?? 'development'

const handleRequest = async function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	routerContext: EntryContext,
	appContext: AppLoadContext
) {
	const userAgent = request.headers.get('user-agent')
	const isBot = isbot(userAgent)

	if (env.NODE_ENV === 'production' && env.SENTRY_DSN) {
		responseHeaders.append('Document-Policy', 'js-profiling')
	}

	// First, we create a new instance of i18next so every request will have a
	// completely unique instance and not share any state
	const i18nInstance = createInstance()
	// Then we could detect locale from the request
	const lng = appContext.locale
	// And here we detect what namespaces the routes about to render want to use
	const ns = remixI18Next.getRouteNamespaces(routerContext)

	await i18nInstance
		.use(initReactI18next) // Tell our instance to use react-i18next
		.init({
			...i18nConfig, // spread the configuration
			lng, // The locale we detected above
			ns, // The namespaces the routes about to render wants to use
			resources,
		})

	const nonce = crypto.randomBytes(16).toString('hex')

	let didError = false
	// NOTE: this timing will only include things that are rendered in the shell
	// and will not include suspended components and deferred loaders
	const timings = makeTimings('render', 'renderToReadableStream')

	const stream = await renderToReadableStream(
		<NonceProvider value={nonce}>
			<I18nextProvider i18n={i18nInstance}>
				<ServerRouter context={routerContext} url={request.url} nonce={nonce} />
			</I18nextProvider>
		</NonceProvider>,
		{
			signal: request.signal,
			onError: (error) => {
				// biome-ignore lint/suspicious/noConsole: <explanation>
				console.error(error)
				didError = true
			},
			nonce,
		}
	)

	// For bots or SPA mode, wait until all content is ready
	if (userAgent && isBot) {
		await stream.allReady
	} else {
		responseHeaders.set('Transfer-Encoding', 'chunked')
	}

	responseHeaders.set('Content-Type', 'text/html; charset=utf-8')
	responseHeaders.append('Server-Timing', timings.toString())

	contentSecurity(responseHeaders, {
		crossOriginEmbedderPolicy: false,
		contentSecurityPolicy: {
			// NOTE: Remove reportOnly when you're ready to enforce this CSP
			reportOnly: true,
			directives: {
				fetch: {
					'connect-src': [
						MODE === 'development' ? 'ws:' : undefined,
						env.SENTRY_DSN ? '*.sentry.io' : undefined,
						env.POSTHOG_API_KEY ? '*.posthog.com' : null, // PostHog
						"'self'",
					].filter(Boolean),
					'font-src': ["'self'", 'data:'], // Allow data URIs
					'frame-src': ["'self'"],
					'img-src': [
						"'self'", // Allow images from the same origin
						'data:', // Allow data URIs
					],
					'script-src': ["'strict-dynamic'", "'self'", `'nonce-${nonce}'`],
					'script-src-attr': [`'nonce-${nonce}'`],
				},
			},
		},
	})

	return new Response(stream, {
		headers: responseHeaders,
		status: didError ? 500 : responseStatusCode,
	})
}

// wrap the default export
export default Sentry.wrapSentryHandleRequest(handleRequest)

export const handleError: HandleErrorFunction = (error, { request }) => {
	// Skip capturing if the request is aborted as Remix docs suggest
	if (request.signal.aborted) {
		return
	}
	if (error instanceof Error) {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.error(styleText('red', String(error.stack)))
		void Sentry.captureException(error)
	} else {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.error(error)
	}
	Sentry.captureException(error)
}
