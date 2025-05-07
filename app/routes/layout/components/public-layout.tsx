// COMPONENTS
import { Header } from './public-header'

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<Header />
			{children}
		</main>
	)
}
