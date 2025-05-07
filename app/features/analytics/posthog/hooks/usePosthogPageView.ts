// CORE
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

// UTILS
import { posthog } from 'posthog-js'

const usePosthogPageView = () => {
	const location = useLocation()
	const [previousLocation, setPreviousLocation] = useState(location.pathname)

	// TODO: How to handle changes in search params?
	useEffect(() => {
		if (location.pathname !== previousLocation) {
			posthog.capture('$pageview')
			setPreviousLocation(location.pathname)
		}
	}, [location, previousLocation])
}

export { usePosthogPageView }
