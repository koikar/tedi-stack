import * as Sentry from '@sentry/react-router'
// IMPORTANT: Incompatible dependency for Bun runtime (libuv function) - https://github.com/oven-sh/bun/issues/18546
// import { nodeProfilingIntegration } from '@sentry/profiling-node'
import { getServerEnv } from '@/utils/env.server'

const env = getServerEnv()

export function init() {
	Sentry.init({
		dsn: env.SENTRY_DSN,
		environment: env.NODE_ENV,
		tracesSampleRate: env.NODE_ENV === 'production' ? 1 : 0,
		// Trace lifecycle automatically enables profiling during active traces
		profileLifecycle: 'trace',
		denyUrls: [
			/\/r\/healthcheck/,
			/\/build\//,
			/\/favicons\//,
			/\/images\//,
			/\/fonts\//,
			/\/favicon.ico/,
			/\/site\.webmanifest/,
		],
		sendDefaultPii: true, // Adds request headers and IP for users
		integrations: [
			Sentry.httpIntegration(),
			// nodeProfilingIntegration()
		],
		tracesSampler(samplingContext) {
			// ignore healthcheck transactions by other services (consul, etc.)
			if (samplingContext.request?.url?.includes('/r/healthcheck')) {
				return 0
			}
			return 1
		},
		beforeSendTransaction(event) {
			// ignore all healthcheck related transactions
			//  note that name of header here is case-sensitive
			if (event.request?.headers?.['x-healthcheck'] === 'true') {
				return null
			}

			return event
		},
	})
}
