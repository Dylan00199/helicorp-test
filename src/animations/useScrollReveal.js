import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, EASE_PREMIUM, DURATION_SLOW } from './gsapConfig'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'

/**
 * Attach the returned ref to any element to have it fade + rise into place
 * the first time it crosses into the viewport on scroll.
 *
 * @param {object} options
 * @param {number} [options.y=32] distance (px) the element travels in from
 * @param {number} [options.delay=0] seconds
 * @param {string} [options.start='top 82%'] ScrollTrigger start position
 */
export function useScrollReveal({ y = 32, delay = 0, start = 'top 82%' } = {}) {
  const ref = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    gsap.set(el, { opacity: 0, y })

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: DURATION_SLOW,
      delay,
      ease: EASE_PREMIUM,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none reverse',
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [y, delay, start, prefersReducedMotion])

  return ref
}

/**
 * Same idea, but staggers direct children of the returned container ref --
 * for grids of cards, service lists, nav items, etc.
 *
 * @param {object} options
 * @param {number} [options.stagger=0.08] seconds between each child
 * @param {number} [options.y=24]
 * @param {string} [options.start='top 82%']
 */
export function useStaggerReveal({ stagger = 0.08, y = 24, start = 'top 82%' } = {}) {
  const ref = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const children = Array.from(el.children)
    if (!children.length) return

    if (prefersReducedMotion) {
      gsap.set(children, { opacity: 1, y: 0 })
      return
    }

    gsap.set(children, { opacity: 0, y })

    const tween = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: EASE_PREMIUM,
      stagger,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none reverse',
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [stagger, y, start, prefersReducedMotion])

  return ref
}

export { ScrollTrigger, gsap }
