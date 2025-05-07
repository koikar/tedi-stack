// UTILS
import { useTranslation } from 'react-i18next'
import { cn } from '@/utils/misc'

// COMPONENTS
import { Container } from '@/components/ui/container'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// ASSETS
import { LOGOS } from '../constants'

// Tailwind Grid cell classes lookup
const columnClasses: Record<(typeof LOGOS)[number]['column'], string> = {
	1: 'xl:col-start-1',
	2: 'xl:col-start-2',
	3: 'xl:col-start-3',
	4: 'xl:col-start-4',
	5: 'xl:col-start-5',
}
const rowClasses: Record<(typeof LOGOS)[number]['row'], string> = {
	1: 'xl:row-start-1',
	2: 'xl:row-start-2',
	3: 'xl:row-start-3',
	4: 'xl:row-start-4',
	5: 'xl:row-start-5',
	6: 'xl:row-start-6',
}

export default function Hero() {
	const { t } = useTranslation()

	return (
		<Container className="px-0">
			<main className="grid h-full place-items-center">
				<div className="grid place-items-center px-4 py-16 xl:grid-cols-2 xl:gap-24">
					<div className="flex max-w-md flex-col items-center text-center xl:order-2 xl:items-start xl:text-left">
						<img
							src="/images/logo/tedi-mascot.png"
							alt="TEDI Stack"
							className="w-40 xl:-mt-4 animate-slide-top xl:animate-slide-left [animation-delay:0.3s] [animation-fill-mode:backwards] xl:[animation-delay:0.8s] xl:[animation-fill-mode:backwards]"
						/>
						<h1
							data-heading
							className="animate-slide-top text-foreground xl:animate-slide-left mt-8 text-4xl font-medium [animation-delay:0.3s] [animation-fill-mode:backwards] md:text-5xl xl:mt-4 xl:text-6xl xl:[animation-delay:0.8s] xl:[animation-fill-mode:backwards]"
						>
							TEDI Stack
						</h1>
						<p
							data-paragraph
							className="animate-slide-top text-muted-foreground xl:animate-slide-left mt-6 text-xl/7 [animation-delay:0.8s] [animation-fill-mode:backwards] xl:mt-8 xl:text-xl/6 xl:leading-10 xl:[animation-delay:1s] xl:[animation-fill-mode:backwards]"
						>
							{t('TEDI stands for')} <b>T</b>echnology <b>E</b>ducation <b>D</b>iversity <b>I</b>
							nnovation!
						</p>
					</div>
					<ul className="mt-16 flex max-w-3xl flex-wrap justify-center gap-2 sm:gap-4 xl:mt-0 xl:grid xl:grid-flow-col xl:grid-cols-5 xl:grid-rows-6">
						<TooltipProvider>
							{LOGOS.map((logo, i) => (
								<li
									key={logo.href}
									className={cn(
										columnClasses[logo.column],
										rowClasses[logo.row],
										'animate-roll-reveal [animation-fill-mode:backwards]'
									)}
									style={{ animationDelay: `${i * 0.07}s` }}
								>
									<Tooltip>
										<TooltipTrigger asChild>
											<a
												href={logo.href}
												className="grid size-20 place-items-center rounded-2xl bg-violet-600/10 p-4 transition hover:-rotate-6 hover:bg-violet-600/15 sm:size-24 dark:bg-violet-200 dark:hover:bg-violet-100"
											>
												<img src={logo.src} alt="" />
											</a>
										</TooltipTrigger>
										<TooltipContent>{logo.alt}</TooltipContent>
									</Tooltip>
								</li>
							))}
						</TooltipProvider>
					</ul>
				</div>
			</main>
		</Container>
	)
}
