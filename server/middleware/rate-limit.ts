import type { Context } from 'hono'
import { createMiddleware } from 'hono/factory'
import { rateLimiter } from 'hono-rate-limiter'
import { IS_PROD } from '../utils/misc'

// Define your rate limit options
// When running tests or running in development, we want to effectively disable
// rate limiting because playwright tests are very fast and we don't want to
// have to wait for the rate limit to reset between tests.
// biome-ignore lint/nursery/noProcessEnv: <explanation>
const maxMultiple = !IS_PROD || process.env.PLAYWRIGHT_TEST_BASE_URL ? 10_000 : 1

type RateLimit = Parameters<typeof rateLimiter>[0]

const rateLimitDefault: RateLimit = {
	windowMs: 60 * 1000, // 1 minute
	limit: 1000 * maxMultiple, // limit each IP to 1000 requests per windowMs
	keyGenerator: (c: Context) => c.get('fly-client-ip') ?? c.req.header('cf-connecting-ip'),
	standardHeaders: true,
	// Malicious users can spoof their IP address which means we should not default
	// to trusting req.ip when hosted on Fly.io. However, users cannot spoof Fly-Client-Ip.
	// When sitting behind a CDN such as cloudflare, replace fly-client-ip with the CDN
	// specific header such as cf-connecting-ip
}

const strongestRateLimit = rateLimiter({
	...rateLimitDefault,
	limit: 10 * maxMultiple,
})

const strongRateLimit = rateLimiter({
	...rateLimitDefault,
	limit: 100 * maxMultiple,
})

const generalRateLimit = rateLimiter(rateLimitDefault)

// Middleware pour gérer les limitations
export const rateLimitMiddleware = createMiddleware(async (c, next) => {
	const path = c.req.url
	const method = c.req.method

	const strongPaths = ['/login', '/signup', '/verify', '/onboarding', '/reset-password']

	const isStrongPath = strongPaths.some((p) => path.includes(p))

	// For non-GET/HEAD requests, use stricter limits on sensitive paths
	if (method !== 'GET' && method !== 'HEAD') {
		return isStrongPath ? strongestRateLimit(c, next) : strongRateLimit(c, next)
	}

	// the verify route is a special case because it's a GET route that
	// can have a token in the query string
	if (path.includes('/verify')) {
		return strongestRateLimit(c, next)
	}

	// For all other requests, apply general rate limiting
	return generalRateLimit(c, next)
})
