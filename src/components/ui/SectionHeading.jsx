import { useScrollReveal } from '../../animations/useScrollReveal'
import { cn } from '../../utils/cn'

/**
 * Eyebrow labels are kept in sentence case, not text-transform: uppercase --
 * the design system reserves full caps for acronyms only, so distinction
 * comes from color/weight/tracking instead of shouting.
 */
export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'left',
  as: Heading = 'h2',
  className,
}) {
  const ref = useScrollReveal({ y: 20 })

  return (
    <div
      ref={ref}
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold tracking-wide text-primary">{eyebrow}</p>
      )}
      <Heading className="text-xl font-semibold text-ink sm:text-2xl">{title}</Heading>
      {body && <p className="mt-4 text-lg text-primary-l-2">{body}</p>}
    </div>
  )
}
