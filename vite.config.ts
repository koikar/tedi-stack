// CORE
import { reactRouter } from '@react-router/dev/vite'
import { sentryReactRouter, type SentryReactRouterBuildOptions } from '@sentry/react-router'
import { defineConfig } from 'vite'
import { reactRouterHonoServer } from 'react-router-hono-server/dev'

// PLUGINS
import { reactRouterDevTools } from 'react-router-devtools'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet'

// biome-ignore lint/nursery/noProcessEnv: <explanation>
const MODE = process.env.NODE_ENV

export default defineConfig((config) => {
	return {
		sentryConfig,
		server: {
			open: true,
			// biome-ignore lint/nursery/noProcessEnv: <explanation>
			port: Number(process.env.PORT) || 3000,
		},
		plugins: [
			reactRouterDevTools(),
			tailwindcss(),
			iconsSpritesheet({
				inputDir: './other/icons',
				outputDir: './app/components/ui/icons',
				fileName: 'sprite.svg',
				withTypes: true,
				formatter: 'biome',
				iconNameTransformer: (name) => name,
			}),
			reactRouter(),
			reactRouterHonoServer({
				runtime: 'bun',
				serverEntryPoint: './server',
				dev: {
					exclude: [
						/^\/(other\/icons)\/.+/, // Add pattern for SVG icons in /other/icons
						/^\/(other\/locales)\/.+/, // Add pattern for locales in /other/locales
					],
				},
			}),
			tsconfigPaths(),
			// biome-ignore lint/nursery/noProcessEnv: <explanation>
			MODE === 'production' && process.env.SENTRY_AUTH_TOKEN
				? sentryReactRouter(sentryConfig, config)
				: null,
		],
	}
})

const sentryConfig: SentryReactRouterBuildOptions = {
	// biome-ignore lint/nursery/noProcessEnv: <explanation>
	org: process.env.SENTRY_ORG,
	// biome-ignore lint/nursery/noProcessEnv: <explanation>
	project: process.env.SENTRY_PROJECT,
	// biome-ignore lint/nursery/noProcessEnv: <explanation>
	authToken: process.env.SENTRY_AUTH_TOKEN,

	unstable_sentryVitePluginOptions: {
		telemetry: false,
		release: {
			// biome-ignore lint/nursery/noProcessEnv: <explanation>
			name: process.env.COMMIT_SHA,
			setCommits: {
				auto: true,
			},
		},
		sourcemaps: {
			filesToDeleteAfterUpload: ['./build/**/*.map'],
		},
	},
}
