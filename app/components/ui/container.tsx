// UTILS
import { cn } from '@/utils/misc'

const Container = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
	<div className={cn('mx-auto max-w-7xl px-4 py-10 sm:px-6', className)}>{children}</div>
)

export { Container }
