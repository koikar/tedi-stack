import type { Config } from '@react-router/dev/config'
import { sentryOnBuildEnd } from '@sentry/react-router'

// biome-ignore lint/nursery/noProcessEnv: <explanation>
const MODE = process.env.NODE_ENV

export default {
	future: {
		unstable_optimizeDeps: true,
		unstable_splitRouteModules: true,
		unstable_viteEnvironmentApi: true,
	},
	buildEnd: async ({ viteConfig, reactRouterConfig, buildManifest }) => {
		// biome-ignore lint/nursery/noProcessEnv: <explanation>
		if (MODE === 'production' && process.env.SENTRY_AUTH_TOKEN) {
			await sentryOnBuildEnd({
				viteConfig,
				reactRouterConfig,
				buildManifest,
			})
		}
	},
} satisfies Config
