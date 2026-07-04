/**
 * Full-page background placeholder. Renders behind all content on every
 * page. Pass `image` (a URL) once real photography is ready -- until then
 * it shows a faint dot-grid so the layer is visibly "there" without
 * competing with foreground content the way a loud labeled placeholder
 * block would if it covered the whole viewport.
 */
export function PageBackground({ image }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-bg"
      style={
        image
          ? {
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {
              backgroundImage:
                'radial-gradient(circle, var(--color-primary-l-4) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              opacity: 0.35,
            }
      }
    />
  )
}
