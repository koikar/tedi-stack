import { createCookie } from 'react-router'
import { createTypedCookie } from 'remix-utils/typed-cookie'
import { getServerEnv } from './env.server'
import { ColorSchemeSchema } from '@/routes/resource/color-scheme'

const env = getServerEnv()

const cookie = createCookie('kb-color-scheme', {
	path: '/',
	sameSite: 'lax',
	httpOnly: true,
	secrets: [env.COOKIE_SECRET ?? 'secret'],
})

const typedCookie = createTypedCookie({ cookie, schema: ColorSchemeSchema })

export function getColorScheme(request: Request) {
	const colorScheme = typedCookie.parse(request.headers.get('Cookie'))
	return colorScheme ?? 'system' // Default to "system" if no cookie is found
}

export async function setColorScheme(colorScheme: string) {
	return await typedCookie.serialize(colorScheme)
}
