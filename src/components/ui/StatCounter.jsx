import { useEffect, useRef } from 'react'
import { gsap } from '../../animations/gsapConfig'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'

/**
 * Splits "80%" into { number: 80, suffix: '%' } so the digits can count up
 * while the suffix stays static. Falls back to displaying the raw string
 * untouched if it doesn't start with a number (defensive, not currently hit
 * by any real data in this project).
 */
function splitValue(value) {
  const match = String(value).match(/^(-?\d+(?:\.\d+)?)(.*)$/)
  if (!match) return { number: null, prefix: '', suffix: value }
  return { number: Number(match[1]), suffix: match[2] }
}

export function StatCounter({ value, label, className }) {
  const numberRef = useRef(null)
  const wrapperRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { number, suffix } = splitValue(value)

  useEffect(() => {
    const el = numberRef.current
    const wrapper = wrapperRef.current
    if (!el || !wrapper || number === null) return

    if (prefersReducedMotion) {
      el.textContent = String(number)
      return
    }

    el.textContent = '0'
    const counter = { val: 0 }

    const tween = gsap.to(counter, {
      val: number,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        el.textContent = String(Math.round(counter.val))
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [number, prefersReducedMotion])

  return (
    <div ref={wrapperRef} className={className}>
      <p className="text-2xl font-bold text-primary sm:text-3xl">
        {number !== null ? <span ref={numberRef}>0</span> : null}
        {suffix}
      </p>
      {label && <p className="mt-1 text-sm text-primary-l-2">{label}</p>}
    </div>
  )
}
