// UTILS
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function getErrorMessage(error: unknown) {
	if (typeof error === 'string') return error
	if (
		error &&
		typeof error === 'object' &&
		'message' in error &&
		typeof error.message === 'string'
	) {
		return error.message
	}
	// biome-ignore lint/suspicious/noConsole: <explanation>
	console.error('Unable to get error message for error', error)
	return 'Unknown Error'
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

/**
 * Helper utility used to extract the domain from the request even if it's
 * behind a proxy. This is useful for sitemaps and other things.
 * @param request Request object
 * @returns Current domain
 */
export const createDomain = (request: Request) => {
	const headers = request.headers
	const maybeProto = headers.get('x-forwarded-proto')
	const maybeHost = headers.get('host')
	const url = new URL(request.url)
	// If the request is behind a proxy, we need to use the x-forwarded-proto and host headers
	// to get the correct domain
	if (maybeProto) {
		return `${maybeProto}://${maybeHost ?? url.host}`
	}
	// If we are in local development, return the localhost
	if (url.hostname === 'localhost') {
		return `http://${url.host}`
	}
	// If we are in production, return the production domain
	return `https://${url.host}`
}

export function getDomainUrl(request: Request) {
	const host =
		request.headers.get('X-Forwarded-Host') ??
		request.headers.get('host') ??
		new URL(request.url).host
	const protocol = request.headers.get('X-Forwarded-Proto') ?? 'http'
	return `${protocol}://${host}`
}

/**
 * Combine multiple header objects into one (uses append so headers are not overridden)
 */
export function combineHeaders(...headers: Array<ResponseInit['headers'] | null | undefined>) {
	const combined = new Headers()
	for (const header of headers) {
		if (!header) continue
		for (const [key, value] of new Headers(header).entries()) {
			combined.append(key, value)
		}
	}
	return combined
}
