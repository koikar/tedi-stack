// CORE
import { useFetcher } from 'react-router'

// UTILS
import { useTranslation } from 'react-i18next'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import {
	ColorSchemeSchema,
	useColorScheme,
	useOptimisticColorScheme,
} from '@/routes/resource/color-scheme'
import { z } from 'zod'

// COMPONENTS
import { Icon, type IconName } from './ui/icon'
import { Button } from './ui/button'

export function ColorSchemeSwitch() {
	const fetcher = useFetcher()
	const { t } = useTranslation()

	const colorScheme = useColorScheme()
	const optimisticMode = useOptimisticColorScheme()

	const [_form, fields] = useForm({
		id: 'color-scheme-form',
		onValidate({ formData }) {
			return parseWithZod(formData, {
				schema: z.object({
					colorScheme: ColorSchemeSchema,
				}),
			})
		},
		defaultValue: {
			colorScheme,
		},
	})

	const COLOR_SCHEME_OPTIONS = [
		{
			value: 'light',
			name: t('Light'),
			icon: 'sun',
		},
		{
			value: 'dark',
			name: t('Dark'),
			icon: 'moon',
		},
		{
			value: 'system',
			name: t('System'),
			icon: 'laptop',
		},
	]

	const mode = optimisticMode ?? colorScheme

	return (
		<fetcher.Form method="POST" action="/r/color-scheme">
			<div className="flex items-center gap-2">
				{COLOR_SCHEME_OPTIONS.map((option) => (
					<Button
						key={option.value}
						name={fields.colorScheme.name}
						value={option.value}
						variant={mode === option.value ? 'secondary' : 'ghost'}
						type="submit"
						size="icon"
					>
						<Icon name={option.icon as IconName} />
					</Button>
				))}
			</div>
		</fetcher.Form>
	)
}
