// CORE
import { useRouteLoaderData } from 'react-router'

// UTILS
import { invariant } from '@epic-web/invariant'

// TYPES
import type { Route } from '@/rr/+types/root'

/**
 * @returns the request info from the root loader (throws an error if it does not exist)
 */
export function useRequestInfo() {
	const maybeRequestInfo = useOptionalRequestInfo()
	invariant(maybeRequestInfo, 'No requestInfo found in root loader')

	return maybeRequestInfo
}

export function useOptionalRequestInfo() {
	const data = useRouteLoaderData<Route.ComponentProps['loaderData']>('root')

	return data?.requestInfo
}
