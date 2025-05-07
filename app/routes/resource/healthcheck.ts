// learn more: https://fly.io/docs/reference/configuration/#services-http_checks
// CORE
import type { Route } from '@/rr/routes/resource/+types/healthcheck'

export async function loader({ request }: Route.LoaderArgs) {
	const host = request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')

	try {
		// if we can connect to the database and make a simple query
		// and make a HEAD request to ourselves, then we're good.
		await Promise.all([
			fetch(`${new URL(request.url).protocol}${host}`, {
				method: 'HEAD',
				headers: { 'X-Healthcheck': 'true' },
			}).then((r) => {
				if (!r.ok) return Promise.reject(r)
			}),
		])
		return new Response('OK')
	} catch (error: unknown) {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.log('healthcheck ❌', { error, timestamp: new Date().toISOString(), host })
		return new Response('ERROR', { status: 500 })
	}
}
