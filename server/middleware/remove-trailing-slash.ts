import type { MiddlewareHandler } from 'hono/types'

export const removeTrailingSlash: MiddlewareHandler = async (c, next) => {
	const url = new URL(c.req.url)

	if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
		const safepath = url.pathname.slice(0, -1).replace(/\/+/g, '/')
		const newUrl = `${safepath}${url.search}`

		return c.redirect(newUrl, 302)
	}

	await next()
}
