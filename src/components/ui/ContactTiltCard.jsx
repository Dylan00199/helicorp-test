const CELLS = Array.from({ length: 25 }, (_, i) => i + 1)

/**
 * Pure-CSS tilt card (see globals.css `.tilt-*` rules, ported from
 * contact_apply.html). No JS mouse tracking needed -- a 5x5 grid of
 * invisible hover targets drives the tilt via sibling selectors.
 */
export function ContactTiltCard({ children, className }) {
  return (
    <div className={`tilt-container ${className ?? ''}`}>
      <div className="tilt-canvas" aria-hidden="true">
        {CELLS.map((n) => (
          <div key={n} className={`tilt-tr tilt-tr-${n}`} />
        ))}
      </div>
      <div className="tilt-card p-6 text-bg">{children}</div>
    </div>
  )
}
