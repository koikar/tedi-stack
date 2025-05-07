// CORE
import { useEffect } from 'react'
import { useLoaderData } from 'react-router'

// UTILS
import { posthog } from 'posthog-js'

const usePosthogDistinctIdSync = () => {
	const loaderData = useLoaderData<{ distinctId: string | undefined }>()
	const distinctId = loaderData?.distinctId

	useEffect(() => {
		if (!distinctId) return
		if (posthog.get_distinct_id() === distinctId) return

		posthog.identify(distinctId)
	}, [distinctId])
}

export { usePosthogDistinctIdSync }
