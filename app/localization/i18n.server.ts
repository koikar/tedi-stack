// CORE
import { createCookie } from 'react-router'
import { RemixI18Next } from 'remix-i18next/server'

// UTILS
import { getServerEnv } from '@/utils/env.server'

// CONFIG
import { i18nConfig } from './i18n'
import { resources } from './resource'

const env = getServerEnv()

export const i18nCookie = createCookie('kb_lang', {
	sameSite: 'lax', // CSRF protection is advised if changing to 'none'
	path: '/',
	secure: env.NODE_ENV === 'production',
	httpOnly: true,
})

export const remixI18Next = new RemixI18Next({
	detection: {
		supportedLanguages: i18nConfig.supportedLngs, // The supported languages.
		fallbackLanguage: i18nConfig.fallbackLng, // The fallback language.
		cookie: i18nCookie, // The cookie used to store user's language preference.
	},
	// This is the configuration for i18next used
	// when translating messages server-side only
	i18next: {
		...i18nConfig,
		resources,
		fallbackLng: {
			default: ['en'],
		},
	},
})
