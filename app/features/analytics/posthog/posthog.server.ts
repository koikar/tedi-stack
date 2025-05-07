// CORE
import crypto from 'node:crypto'

// UTILS
import { PostHog } from 'posthog-node'
import { getClientIPAddress } from 'remix-utils/get-client-ip-address'
import { getServerEnv } from '@/utils/env.server'

// QUERIES
// import { getUserId } from '@/features/security/authentication/server/auth'

let posthogInstance: PostHog
const uuid = crypto.randomUUID()
const env = getServerEnv()

const getPosthogInstance = () => {
	if (!posthogInstance) {
		posthogInstance = new PostHog(env.POSTHOG_API_KEY, {
			host: env.POSTHOG_API_ENDPOINT,
		})
	}
	return posthogInstance
}

const posthogServer = getPosthogInstance()

export const getPosthogDistinctId = async (request: Request) => {
	// const userId = await getUserId(request)
	const ipAddress = getClientIPAddress(request)

	// if (userId) {
	// 	return String(userId)
	// }

	if (ipAddress) {
		return ipAddress
	}

	return uuid
}

type PosthogEvent = Parameters<PostHog['capture']>[0]
export const capturePosthogServerEvent = async (
	request: Request,
	event: Omit<PosthogEvent, 'distinctId'>
) => {
	// TODO: Check why the Posthog URL property is not working in server-side events
	const distinctId = await getPosthogDistinctId(request)
	posthogServer.capture({
		...event,
		distinctId,
	})
}

export { posthogServer }
