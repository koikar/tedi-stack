// CORE
import { useCallback } from 'react'
import { useSearchParams, useLocation } from 'react-router'

export default function useUpdateSearchParams() {
	const [searchParams] = useSearchParams()
	const location = useLocation()

	const updateSearchParams = useCallback(
		(params: Record<string, unknown>, opts?: { override: boolean }) => {
			const newSearchParams = new URLSearchParams(
				opts?.override ? undefined : searchParams?.toString()
			)

			for (const [key, value] of Object.entries(params)) {
				if (value === null) {
					newSearchParams.delete(key)
				} else {
					if (Array.isArray(value)) {
						newSearchParams.delete(key)
						for (const v of value) {
							newSearchParams.append(key, String(v))
						}
					} else {
						newSearchParams.set(key, String(value))
					}
				}
			}

			return newSearchParams.toString()
		},
		[searchParams]
	)

	const getCurrentPathWithParams = useCallback(() => {
		return `${location.pathname}?${searchParams.toString()}`
	}, [location, searchParams])

	const getCurrentPath = useCallback(() => {
		return `${location.pathname}`
	}, [location])

	return {
		updateSearchParams,
		getCurrentPathWithParams,
		getCurrentPath,
	}
}
