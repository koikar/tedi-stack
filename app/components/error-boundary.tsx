// CORE
import { useEffect, type ReactElement } from 'react'
import { type ErrorResponse, isRouteErrorResponse, useParams, useRouteError } from 'react-router'

// UTILS
import { captureException } from '@sentry/react-router'
import { getErrorMessage } from '@/utils/misc'

type StatusHandler = (info: {
	error: ErrorResponse
	params: Record<string, string | undefined>
}) => ReactElement | null

export function GeneralErrorBoundary({
	defaultStatusHandler = ({ error }) => (
		<p>
			{error.status} {error.data}
		</p>
	),
	statusHandlers,
	unexpectedErrorHandler = (error) => <p>{getErrorMessage(error)}</p>,
}: {
	defaultStatusHandler?: StatusHandler
	statusHandlers?: Record<number, StatusHandler>
	unexpectedErrorHandler?: (error: unknown) => ReactElement | null
}) {
	const error = useRouteError()
	const params = useParams()
	const isResponse = isRouteErrorResponse(error)

	if (typeof document !== 'undefined') {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.error(error)
	}

	useEffect(() => {
		if (isResponse) return
		captureException(error)
	}, [error, isResponse])

	return (
		<div className="container flex items-center justify-center p-20 text-h2">
			{isResponse
				? (statusHandlers?.[error.status] ?? defaultStatusHandler)({
						error,
						params,
					})
				: unexpectedErrorHandler(error)}
		</div>
	)
}
