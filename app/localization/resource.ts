import en from '../../other/locales/en/common.json'
import es from '../../other/locales/es/common.json'

const languages = ['en', 'es'] as const
export const supportedLanguages = [...languages]
export type Language = (typeof languages)[number]

type Resource = {
	common: Partial<typeof en> // Sub-locales only include the ones that are different from the default language
}

export type Namespace = keyof Resource

export const resources: Record<Language, Resource> = {
	en: {
		common: en,
	},
	es: {
		common: es,
	},
}

declare module 'i18next' {
	export interface CustomTypeOptions {
		defaultNS: 'common'
		fallbackNS: 'common'
		// custom resources type
		resources: Resource
	}
}
