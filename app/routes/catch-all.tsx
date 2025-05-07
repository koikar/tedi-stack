// This is called a "splat route" and as it's in the root `/app/routes/`
// directory, it's a catchall. If no other routes match, this one will and we
// can know that the user is hitting a URL that doesn't exist. By throwing a
// 404 from the loader, we can force the error boundary to render which will
// ensure the user gets the right status code and we can display a nicer error
// message for them than the Remix and/or browser default.

// CORE
import { Link, useLocation } from 'react-router'

// UTILS
import { useTranslation } from 'react-i18next'

// COMPONENTS
import { Icon } from '@/components/ui/icon'
import { GeneralErrorBoundary } from '@/components/error-boundary'

export function loader() {
	throw new Response('Not found', { status: 404 })
}

export function action() {
	throw new Response('Not found', { status: 404 })
}

export default function NotFound() {
	// due to the loader, this component will never be rendered, but we'll return
	// the error boundary just in case.
	return <ErrorBoundary />
}

export function ErrorBoundary() {
	const location = useLocation()
	const { t } = useTranslation()
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: () => (
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-3">
							<h1>{t("We can't find this page:")}</h1>
							<pre className="whitespace-pre-wrap break-all text-lg">{location.pathname}</pre>
						</div>
						<Link to="/" className="text-md underline">
							<Icon name="arrow-left">{t('Back to home')}</Icon>
						</Link>
					</div>
				),
			}}
		/>
	)
}
