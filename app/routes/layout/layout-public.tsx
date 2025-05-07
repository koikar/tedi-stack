// CORE
import { Outlet, type MetaFunction } from 'react-router'
import type { Route } from '@/rr/routes/layout/+types/layout-public'

// UTILS
import { remixI18Next } from '@/localization/i18n.server'

// COMPONENTS
import { Layout } from './components/public-layout'

export async function loader({ request }: Route.LoaderArgs) {
	const t = await remixI18Next.getFixedT(request)
	const title = t('TEDI Stack | Get started with cutting edge technologies')
	return { meta: { title } }
}

export default function PublicLayout() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	)
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [{ title: data?.meta.title }]
}
