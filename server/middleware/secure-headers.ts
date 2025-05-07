import type { Context, Next } from 'hono'
import { secureHeaders } from 'hono/secure-headers'

const secureHeadersConfig = secureHeaders({
	// Skip referrerPolicy which breaks redirectTo logic
	referrerPolicy: 'same-origin',
	crossOriginEmbedderPolicy: false,
	xFrameOptions: 'DENY',
	xXssProtection: '1; mode=block',
	xContentTypeOptions: 'nosniff',
})

export const secureHeadersMiddleware = async (c: Context, next: Next) => {
	await next()
	// Check if the response is HTML before applying the CSP headers
	if (c.res.headers.get('Content-Type')?.includes('text/html')) {
		await secureHeadersConfig(c, () => Promise.resolve())
	}
}
