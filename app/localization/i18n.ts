// CORE
import { supportedLanguages } from './resource'

// TYPES
import type { InitOptions } from 'i18next'

export const i18nConfig = {
	// debug: true, // Enable debug mode.
	supportedLngs: supportedLanguages, // Supported languages.
	nsSeparator: false, // allow keys to be phrases having `:`, `.`
	keySeparator: false, // allow keys to be phrases having `:`, `.`
	returnEmptyString: false, // Keep this false to allow natural language keys to work - https://www.i18next.com/principles/fallback#key-fallback
	fallbackLng: 'en', // if the user language is not in the supportedLngs
	defaultNS: 'common', // Default namespace.
} satisfies Omit<InitOptions, 'react' | 'detection'>
