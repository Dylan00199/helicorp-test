import { useScrollReveal, useStaggerReveal } from '../../animations/useScrollReveal'

/**
 * Wrap any block of content to have it fade + rise in on scroll. For a
 * container whose direct children should stagger in one after another
 * (card grids, nav items, list items), use `StaggerReveal` instead.
 */
export function Reveal({ as: Tag = 'div', y, delay, className, children, ...props }) {
  const ref = useScrollReveal({ y, delay })
  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  )
}

export function StaggerReveal({ as: Tag = 'div', stagger, y, className, children, ...props }) {
  const ref = useStaggerReveal({ stagger, y })
  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  )
}
