// CORE
import { data, href, useFetchers } from 'react-router'
import type { Route } from '@/rr/routes/resource/+types/color-scheme'

// UTILS
import { setColorScheme } from '@/utils/color-scheme.server'
import { useHints } from '@/utils/client-hints'
import { useRequestInfo } from '@/utils/request-info'
import { parseWithZod } from '@conform-to/zod'
import { z } from 'zod'

export const ColorSchemeSchema = z
	.enum(['dark', 'light', 'system']) // Possible color schemes
	.default('system') // If there's no cookie, default to "system"
	.catch('system') // In case of an error, default to "system"

export type ColorScheme = z.infer<typeof ColorSchemeSchema>

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: z.object({
			colorScheme: ColorSchemeSchema,
		}),
	})

	if (submission.status !== 'success') {
		return data(
			{ result: submission.reply() },
			{
				status: submission.status === 'error' ? 400 : 200,
			}
		)
	}

	const { colorScheme } = submission.value

	return data(
		// { result: submission.reply() },
		null,
		{ headers: { 'set-cookie': await setColorScheme(colorScheme) } }
	)
}

/**
 * @returns the user's theme preference, or the client hint theme if the user
 * has not set a preference.
 */
export function useColorScheme() {
	const hints = useHints()
	const requestInfo = useRequestInfo()
	const optimisticMode = useOptimisticColorScheme()

	if (optimisticMode) {
		return optimisticMode
	}

	return requestInfo.userPrefs.colorScheme ?? hints.theme
}

/**
 * If the user's changing their color scheme mode preference, this will return the
 * value it's being changed to.
 */
export function useOptimisticColorScheme() {
	const fetchers = useFetchers()
	const themeFetcher = fetchers.find((f) => f.formAction === href('/r/color-scheme'))

	if (themeFetcher?.formData) {
		const submission = parseWithZod(themeFetcher.formData, {
			schema: z.object({
				colorScheme: ColorSchemeSchema,
			}),
		})

		if (submission.status === 'success') {
			return submission.value.colorScheme
		}
	}
}
