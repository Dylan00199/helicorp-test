import { useEffect } from 'react'
import { useLenis } from 'lenis/react'
import { gsap, ScrollTrigger } from './gsapConfig'

/**
 * Must render inside <ReactLenis root options={{ autoRaf: false }}>.
 *
 * Lenis and GSAP each want to own the requestAnimationFrame loop. Running
 * both independently causes the smooth-scroll position and ScrollTrigger's
 * understanding of it to drift a frame apart, which shows up as jitter in
 * anything scrubbed (like the hero monogram). Disabling Lenis's own
 * autoRaf and driving `lenis.raf()` from `gsap.ticker` instead keeps both
 * on the same clock -- this is the integration Lenis's own docs recommend.
 */
export function LenisScrollTriggerBridge() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    function onTick(time) {
      lenis.raf(time * 1000)
    }

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
    }
  }, [lenis])

  return null
}
