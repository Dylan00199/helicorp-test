import { cn } from '../../utils/cn'

/**
 * The source design system detected zero elevation tokens (no shadows
 * anywhere on the live site). Rather than quietly add drop-shadows because
 * they're a common card affordance, this card leans on a 1px border plus a
 * subtle background shift on hover -- flat by design, not by oversight.
 */
export function Card({ as: Tag = 'div', interactive = false, className, children, ...props }) {
  return (
    <Tag
      className={cn(
        'rounded-token-sm border border-primary-l-4 bg-bg p-6',
        interactive &&
          'transition-colors duration-base ease-out-soft hover:bg-cream/50 hover:border-secondary-l-3',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
