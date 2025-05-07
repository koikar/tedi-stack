// CORE
import { Link } from 'react-router'

// UTILS
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/misc'

// COMPONENTS
import { useColorScheme, type ColorScheme } from '@/routes/resource/color-scheme'

type LogoProps = {
	redirect?: string
	className?: string
	variant: 'long' | 'icon'
	colorScheme?: ColorScheme
	alt?: string
}

export const logoVariants = cva('', {
	variants: {
		variant: {
			long: 'w-40 h-auto',
			icon: 'size-7',
		},
	},
})

export default function Logo({ redirect, className, variant, alt, colorScheme }: LogoProps) {
	const preferredColorScheme = useColorScheme()
	return (
		<Link to={redirect ? redirect : '/'}>
			<img
				loading="lazy"
				className={cn(logoVariants({ variant }), className)}
				alt={alt ? alt : 'Tedi Logo'}
				src={`/images/logo/tedi-${variant}-${colorScheme === 'dark' ? 'dark' : preferredColorScheme === 'dark' ? 'dark' : 'light'}.png`}
			/>
		</Link>
	)
}
