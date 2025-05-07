// UTILS
import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/misc'

// COMPONENTS
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Link } from 'react-router'
import { buttonVariants } from '@/components/ui/button'
import { MobileNavigation } from './public-mobile-navigation'
import { ColorSchemeSwitch } from '@/components/color-scheme-switch'
import Logo from './logo'
import LanguageDropDown from './language-dropdown'

export function Header() {
	const { t } = useTranslation()

	return (
		<nav className="w-full items-center justify-center lg:flex py-4">
			<NavigationMenu className="hidden px-4 2xl:px-20 max-w-full items-center justify-between lg:flex">
				<Logo className="h-10 w-auto" variant="long" />
				<NavigationMenuList className="gap-4">
					<NavigationMenuItem>
						<LanguageDropDown />
					</NavigationMenuItem>
					<NavigationMenuItem>
						<ColorSchemeSwitch />
					</NavigationMenuItem>

					<NavigationMenuItem>
						<NavigationMenuLink asChild>
							<Link to="/sign-up" className={cn(buttonVariants({ variant: 'default' }))}>
								{t('Start Free Trial')}
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink asChild>
							<Link to="/login" className={cn(buttonVariants({ variant: 'outline' }))}>
								{t('Log in')}
							</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			<div className="relative flex items-center justify-center">
				<Logo className="h-12 w-auto lg:hidden" variant="long" />
				<div className="absolute left-4">
					<MobileNavigation />
				</div>
			</div>
		</nav>
	)
}
