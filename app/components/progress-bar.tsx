// CORE
import { useEffect, useRef, useState } from 'react'
import { useNavigation } from 'react-router'

// UTILS
import { cn } from '@/utils/misc'
import { useSpinDelay } from 'spin-delay'

// COMPONENTS
import { Icon } from './ui/icon'

function EpicProgress() {
	const transition = useNavigation()
	const busy = transition.state !== 'idle'

	const delayedPending = useSpinDelay(busy, {
		delay: 600,
		minDuration: 400,
	})

	const ref = useRef<HTMLDivElement>(null)
	const [animationComplete, setAnimationComplete] = useState(true)

	useEffect(() => {
		if (!ref.current) return
		if (delayedPending) setAnimationComplete(false)

		const animationPromises = ref.current.getAnimations().map(({ finished }) => finished)

		void Promise.allSettled(animationPromises).then(() => {
			if (!delayedPending) setAnimationComplete(true)
		})
	}, [delayedPending])

	return (
		// biome-ignore lint/a11y/useFocusableInteractive: <explanation>
		<div
			// biome-ignore lint/a11y/useAriaPropsForRole: <explanation>
			role="progressbar"
			aria-hidden={delayedPending ? undefined : true}
			className="fixed inset-x-0 top-0 z-50 h-[0.20rem] animate-pulse"
		>
			<div
				ref={ref}
				className={cn(
					'h-full w-0 bg-linear-to-r from-purple-500 via-pink-500 to-red-500 transition-all duration-500 ease-in-out',
					transition.state === 'idle' &&
						(animationComplete ? 'transition-none' : 'w-full opacity-0 transition-all'),
					delayedPending && transition.state === 'submitting' && 'w-5/12',
					delayedPending && transition.state === 'loading' && 'w-8/12'
				)}
			/>
			{delayedPending && (
				<div className="absolute flex items-center justify-center">
					<Icon
						name="loader-circle"
						size="md"
						className="text-foreground m-1 animate-spin"
						aria-hidden
					/>
				</div>
			)}
		</div>
	)
}

export { EpicProgress }
