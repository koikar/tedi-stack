// CORE
import { useEffect } from 'react'
import { data, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import type { Route } from '@/rr/+types/root'

// I18N
import { useTranslation } from 'react-i18next'
import { useChangeLanguage } from 'remix-i18next/react'

// UTILS
import { getColorScheme } from './utils/color-scheme.server'
import { combineHeaders, getDomainUrl } from './utils/misc'
import { makeTimings } from './utils/timing.server'
import { ClientHintCheck, getHints } from './utils/client-hints'
import { useNonce } from './utils/nonce-provider'
import { pipeHeaders } from './utils/headers.server'
import { usePosthogPageView } from './features/analytics/posthog/hooks/usePosthogPageView'
import { usePosthogDistinctIdSync } from './features/analytics/posthog/hooks/usePosthogDistinctIdSync'
import { getPosthogDistinctId } from './features/analytics/posthog/posthog.server'
import { initPosthog } from './features/analytics/posthog/posthog.client'
import { useColorScheme, type ColorScheme } from './routes/resource/color-scheme'

// STYLES
import tailwindStyleSheetUrl from './styles/tailwind.css?url'
import fontStyleSheetUrl from './styles/font.css?url'

// COMPONENTS
import { GeneralErrorBoundary } from './components/error-boundary'
import { href as iconsHref } from './components/ui/icon'
import { EpicProgress } from './components/progress-bar'

// ASSETS
import appleTouchIconAssetUrl from '/favicons/apple-touch-icon.png'
import faviconAssetUrl from '/favicons/favicon.png'

export const links: Route.LinksFunction = () => {
	return [
		// Preload svg sprite as a resource to avoid render blocking
		{ rel: 'preload', href: iconsHref, as: 'image' },
		{
			rel: 'icon',
			href: '/favicon.ico',
			sizes: '48x48',
		},
		{ rel: 'icon', type: 'image/svg+xml', href: faviconAssetUrl },
		{ rel: 'apple-touch-icon', href: appleTouchIconAssetUrl },
		{
			rel: 'manifest',
			href: '/site.webmanifest',
			crossOrigin: 'use-credentials',
		} as const, // necessary to make typescript happy
		{ rel: 'stylesheet', href: tailwindStyleSheetUrl },
		{ rel: 'stylesheet', href: fontStyleSheetUrl },
	].filter(Boolean)
}

export const handle = {
	// In the handle export, we can add a i18n key with namespaces our route
	// will need to load. This key can be a single string or an array of strings.
	// TIP: In most cases, you should set this to your defaultNS from your i18n config
	// or if you did not set one, set it to the i18next default namespace "translation"
	i18n: 'common',
}

export const loader = async ({ context, request }: Route.LoaderArgs) => {
	const { locale, t, clientEnv } = context

	const timings = makeTimings('root loader')

	const distinctId = await getPosthogDistinctId(request)

	const colorScheme = await getColorScheme(request)
	const domainUrl = getDomainUrl(request)

	const title = t('TEDI Stack | React Router v7 + Hono + Bun')
	const description = t('The fast, modern stack for building web applications')
	const error = t('Error | TEDI Stack')

	return data(
		{
			meta: { title, description, error },
			requestInfo: {
				origin: domainUrl,
				domain: domainUrl,
				hints: getHints(request),
				path: new URL(request.url).pathname,
				userPrefs: {
					colorScheme,
				},
				locale,
			},
			ENV: clientEnv,
			distinctId,
		},
		{
			headers: combineHeaders({ 'Server-Timing': timings.toString() }),
		}
	)
}

export const headers: Route.HeadersFunction = pipeHeaders

function Document({
	children,
	nonce,
	colorScheme = 'light',
	env = {},
	allowIndexing = true,
}: {
	children: React.ReactNode
	nonce: string
	colorScheme?: ColorScheme
	env?: Record<string, string | undefined>
	allowIndexing?: boolean
}) {
	const { i18n } = useTranslation()

	return (
		<html lang={i18n.language} dir={i18n.dir()} className={colorScheme}>
			<head>
				<ClientHintCheck nonce={nonce} />
				<Meta />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				{allowIndexing ? null : <meta name="robots" content="noindex, nofollow" />}
				<Links />
			</head>
			<body className="bg-background text-foreground">
				{children}
				<script
					nonce={nonce}
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(env)}`,
					}}
				/>
				<ScrollRestoration nonce={nonce} />
				<Scripts nonce={nonce} />
			</body>
		</html>
	)
}

export default function App({ loaderData }: Route.ComponentProps) {
	const { ENV, requestInfo } = loaderData
	const nonce = useNonce()
	const colorScheme = useColorScheme()
	const allowIndexing = ENV.ALLOW_INDEXING !== 'false'
	const locale = requestInfo.locale
	useChangeLanguage(locale)

	// ANALYTICS
	useEffect(() => {
		if (window !== undefined) {
			initPosthog()
		}
	}, [])
	usePosthogPageView()
	usePosthogDistinctIdSync()

	return (
		<Document nonce={nonce} colorScheme={colorScheme} allowIndexing={allowIndexing} env={ENV}>
			<Outlet />
			<EpicProgress />
		</Document>
	)
}

export const meta = ({ data }: Route.MetaArgs) => {
	return [
		{
			title: data?.meta.title ?? data?.meta.error,
		},
		{
			name: 'description',
			content: data?.meta.description,
		},
		{
			name: 'keywords',
			content: 'fast,modern,repair,garage,paint,auto,business,workflow,invoicing,mechanic,software',
		},
		{
			name: 'author',
			content: 'TEDI',
		},
		{
			name: 'theme-color',
			content: '#0E927A',
		},
	]
}

// this is a last resort error boundary. There's not much useful information we
// can offer at this level.
export const ErrorBoundary = GeneralErrorBoundary
