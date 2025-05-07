// CORE
import type * as React from 'react'

// UTILS
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/misc'

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default: cn(
					'bg-primary text-primary-foreground hover:bg-primary-hover',
					// CUSTOM STYLES OVERRIDE
					'bg-button-primary text-button-primary-foreground hover:bg-button-primary-hover'
				),
				destructive: cn(
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
					// CUSTOM STYLES OVERRIDE
					'bg-button-destructive text-button-destructive-foreground hover:bg-button-destructive-hover'
				),
				outline: cn(
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
					// CUSTOM STYLES OVERRIDE
					'bg-button-outline border-button-outline-border'
				),
				secondary: cn(
					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
					// CUSTOM STYLES OVERRIDE
					'bg-button-secondary text-button-secondary-foreground hover:bg-button-secondary-hover'
				),
				ghost: cn(
					'hover:bg-accent hover:text-accent-foreground',
					// CUSTOM STYLES OVERRIDE
					'bg-button-ghost hover:bg-button-ghost-hover hover:text-button-ghost-foreground'
				),
				link: cn(
					'text-primary underline-offset-4 hover:underline',
					// CUSTOM STYLES OVERRIDE
					'text-button-primary'
				),

				// CUSTOM VARIANTS
				input: cn(
					'bg-button-input text-button-input-foreground hover:bg-button-input-hover hover:text-accent-foreground border border-input-border justify-start text-left overflow-auto'
				),
				dashed: cn(
					'border-2 border-dashed bg-button-outline border-button-outline-border hover:bg-accent hover:text-accent-foreground'
				),
			},
			size: {
				default: 'h-button p-button',
				sm: 'h-button-sm rounded-md p-button-sm',
				lg: 'h-button-lg rounded-md p-button-lg',
				icon: 'h-button-icon p-button-icon', // CUSTOMIZED

				// CUSTOM SIZES
				wide: 'px-24 py-5',
				pill: 'px-12 py-3 leading-3',
				xs: 'h-button-xs rounded-md px-button-xs',
				input: 'h-input p-button-sm',
				full: 'w-full h-full px-4 py-2',
				dropdown: 'h-button-lg p-button-lg justify-start w-full',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

export type ButtonVariant = VariantProps<typeof buttonVariants>

const Button = ({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	ButtonVariant & {
		asChild?: boolean
	}) => {
	const Comp = asChild ? Slot : 'button'
	return (
		<Comp
			data-slot="button"
			className={cn(
				buttonVariants({ variant, size }),
				'[&_svg]:size-5', // CUSTOM STYLES OVERRIDE
				className
			)}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
