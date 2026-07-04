import { cn } from '../../utils/cn'

const TONES = {
  primary: 'bg-primary/10 text-primary',
  orange: 'bg-brand-orange/10 text-secondary-d-1',
  neutral: 'bg-primary-l-4/40 text-primary-l-2',
}

export function Tag({ tone = 'primary', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-token-pill px-3 py-1 text-xs font-semibold',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
