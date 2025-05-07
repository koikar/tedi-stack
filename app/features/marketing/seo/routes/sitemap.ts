// CORE
import type { Route } from '@/rr/features/marketing/seo/routes/+types/sitemap'

// UTILS
import { generateSitemapIndex } from '@forge42/seo-tools/sitemap'
import { createDomain } from '@/utils/misc'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const domain = createDomain(request)
	const sitemaps = generateSitemapIndex([
		{
			url: `${domain}/sitemap/en.xml`,
			lastmod: '2025-05-01',
		},
		{
			url: `${domain}/sitemap/es.xml`,
			lastmod: '2025-05-01',
		},
	])

	return new Response(sitemaps, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	})
}
