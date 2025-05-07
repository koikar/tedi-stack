import { layout, route, index } from '@react-router/dev/routes'

export const marketingRoutes = [
	// HOME ROUTES
	layout('routes/layout/layout-public.tsx', [index('features/marketing/home/routes/index.tsx')]),

	// SEO ROUTES
	route('robots.txt', 'features/marketing/seo/routes/robots.ts'),
	route('sitemap.xml', 'features/marketing/seo/routes/sitemap.ts'),
	route('sitemap/:lang.xml', 'features/marketing/seo/routes/sitemap-lang.ts'),
]
