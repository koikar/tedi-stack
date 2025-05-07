// CORE
import { Link } from 'react-router'

// UTILS
import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/misc'

// COMPONENTS
import { Button, buttonVariants } from '@/components/ui/button'
import { ColorSchemeSwitch } from '@/components/color-scheme-switch'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet'
import { Icon } from '@/components/ui/icon'
import LanguageDropDown from './language-dropdown'
import Logo from './logo'

export function MobileNavigation() {
	const { t } = useTranslation()

	return (
		<Sheet>
			<SheetTrigger asChild className="lg:hidden">
				<Button variant="ghost" size="icon">
					<Icon name="menu" />
					<span className="sr-only">Menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="hide-scrollbar w-4/6 overflow-y-auto lg:hidden">
				<SheetHeader>
					<Logo className="h-8 w-32" variant="long" />
				</SheetHeader>
				<div className="mt-8 h-full px-2">
					<ul className="space-y-4">
						<li>
							<div className="px-4">
								<LanguageDropDown />
							</div>
						</li>
						<li>
							<div className="mb-4 px-4">
								<ColorSchemeSwitch />
							</div>
						</li>
						<li>
							<div className="flex w-full">
								<Link
									to="/sign-up"
									className={cn(
										buttonVariants({ variant: 'default', size: 'full' }),
										'w-full px-4 py-2'
									)}
								>
									{t('Start Free Trial')}
								</Link>
							</div>
						</li>

						<li>
							<div className="flex w-full">
								<Link
									to="/login"
									className={cn(
										buttonVariants({ variant: 'outline', size: 'full' }),
										'w-full px-4 py-2'
									)}
								>
									{t('Log in')}
								</Link>
							</div>
						</li>
					</ul>
				</div>
			</SheetContent>
		</Sheet>
	)
}
