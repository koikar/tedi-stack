// CORE
import { posthog } from 'posthog-js'

export function initPosthog() {
	posthog.init(ENV.POSTHOG_API_KEY, {
		api_host: ENV.POSTHOG_API_ENDPOINT,
		capture_pageview: false,
		// session_recording:
		// 	ENV.MODE === 'production'
		// 		? {
		// 				maskAllInputs: true,
		// 			}
		// 		: undefined,
	})
}
