import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'

/**
 * A functioning brand mark is needed on every page today, unlike the
 * photographic/3D placeholders elsewhere -- so this is a real (if simple)
 * wordmark rather than a gray placeholder box. It's isolated to this one
 * component specifically so swapping in real logo artwork later is a
 * single-file change.
 */
export function Logo({ className }) {
  return (
    <Link
      to={ROUTES.home}
      className={className ?? 'inline-flex items-center gap-2 text-ink'}
      aria-label="HELICORP — home"
    >
      <span className="text-lg font-bold tracking-tight">HELICORP</span>
    </Link>
  )
}
