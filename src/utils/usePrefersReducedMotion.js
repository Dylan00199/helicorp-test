import { useEffect, useState } from 'react'

/**
 * Tracks `prefers-reduced-motion`. Used to tone down or fully disable the
 * hero 3D idle motion, Lenis smoothing, and GSAP scroll-scrub so the site
 * respects the OS-level accessibility setting instead of forcing motion on
 * everyone regardless of preference.
 */
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setPrefersReduced(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return prefersReduced
}
