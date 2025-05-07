// CORE
import { prefix, route, type RouteConfig } from '@react-router/dev/routes'

// FEATURES
import { marketingRoutes } from './features/marketing/routes'

export default [
	// GENERIC
	route('/*', 'routes/catch-all.tsx'),
	route('404', 'routes/404.tsx'),
	route('500', 'routes/500.tsx'),

	// RESOURCE
	...prefix('r', [
		route('healthcheck', 'routes/resource/healthcheck.ts'),
		route('locales', 'routes/resource/language.ts'),
		route('color-scheme', 'routes/resource/color-scheme.tsx'),
	]),

	// PUBLIC
	...marketingRoutes,
] satisfies RouteConfig
