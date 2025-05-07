// CORE
import { useNavigate } from 'react-router'

// UTILS
import { useTranslation } from 'react-i18next'
import useUpdateSearchParams from '@/utils/hooks/use-update-search-params'

// COMPONENTS
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@/components/ui/icon'
import { Button } from '@/components/ui/button'

const LanguageDropDown = () => {
	const { t, i18n } = useTranslation()
	const navigate = useNavigate()
	const { updateSearchParams } = useUpdateSearchParams()

	const onValueChange = (lang: string) => {
		i18n.changeLanguage(lang)
		navigate({ search: updateSearchParams({ lng: lang }) })
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<Icon name="globe" />
					<span className="sr-only">Language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuRadioGroup value={i18n.language} onValueChange={onValueChange}>
					<DropdownMenuRadioItem
						className="p-2 data-[state=checked]:font-bold cursor-pointer"
						indicator={false}
						value="es"
					>
						<img
							src={'/images/flag/mx.svg'}
							alt="logo"
							className="mr-2"
							width={27}
							height={27}
							loading="lazy"
						/>
						{t('Español')}
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						className="p-2 data-[state=checked]:font-bold cursor-pointer"
						indicator={false}
						value="en"
					>
						<img
							src={'/images/flag/us.svg'}
							alt="logo"
							className="mr-2"
							width={27}
							height={27}
							loading="lazy"
						/>
						{t('English')}
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default LanguageDropDown
