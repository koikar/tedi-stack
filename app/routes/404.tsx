// CORE
import { Link } from 'react-router'

// UTILS
import { useTranslation } from 'react-i18next'

// COMPONENTS
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export default function Page404() {
	const { t } = useTranslation()
	return (
		<section className="bg-primary-10 dark:bg-dark-gray">
			<Container className="flex h-screen items-center justify-center pt-32">
				<div className="space-y-8 text-center">
					<h1 className="text-h1 lg:pb-5 lg:text-9xl">400</h1>
					<h2 className="text-h2">{t('Page not found.')}</h2>
					<p className="max-w-xl text-lg">
						{t(
							"The page you are looking for doesn't exist or has been moved. Please go back to the homepage."
						)}
					</p>
					<Button size="lg">
						<Link to="/">{t('Go back home')}</Link>
					</Button>
				</div>
			</Container>
		</section>
	)
}
