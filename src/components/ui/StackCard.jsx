import { useEffect, useRef } from 'react'
import { gsap } from '../../animations/gsapConfig'

/**
 * Core Values scroll story: each value gets its own full panel.
 * On desktop (lg+), the container pins and each image card swipes away
 * on scroll to reveal the one beneath it — the text list on the right
 * is static and unchanged. On mobile, all cards and text render normally.
 */
const VALUE_IMAGES = [
  '/images/integrity.avif',
  '/images/Professionalism.avif',
  '/images/Companionship.avif',
  '/images/Innovation.avif',
  '/images/Dedication.avif',
]

export function StackCard({ items }) {
  const containerRef = useRef(null)
  const cardAreaRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const cardArea = cardAreaRef.current
    if (!container || !cardArea) return

    // Grab every absolute image card (data-card attribute)
    const cards = gsap.utils.toArray('[data-card]', cardArea)

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      // Suppress CSS transitions while GSAP drives the animation
      gsap.set(cards, { clearProps: 'transition' })

      // Stack cards absolutely — card[0] is Integrity (on top)
      // They are all positioned absolute inside a relative wrapper
      // so they perfectly overlap. zIndex: 5,4,3,2,1
      cards.forEach((card, i) => {
        gsap.set(card, {
          zIndex: cards.length - i,
          opacity: 1,
          y: 0,
          x: 0,
          rotation: 0,
          scale: 1,
        })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80px',
          // Give each card its own scroll "page" of 100vh
          end: () => `+=${(cards.length - 1) * 100}%`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      })

      // For each card except the last, animate it off-screen
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return // last card stays
        tl.to(
          card,
          {
            opacity: 0,
            y: -160,
            x: -50,
            rotation: -6,
            scale: 0.88,
            duration: 1,
            ease: 'power2.in',
          },
          index // sequentially, one after another
        )
      })

      return () => {}
    })

    mm.add('(max-width: 1023px)', () => {
      gsap.set(cards, {
        clearProps: 'all',
      })
    })

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16 w-full py-6"
    >
      {/* Left side: stacked image cards (absolutely positioned on top of each other) */}
      <div
        ref={cardAreaRef}
        className="
          shrink-0
          relative
          w-[260px] h-[300px]
          lg:w-[260px] lg:h-[300px]
          mx-auto lg:mx-0
        "
        style={{ perspective: '600px' }}
      >
        {items.map((item, i) => (
          <div
            key={item.title}
            data-card
            className="
              absolute inset-0
              rounded-2xl overflow-hidden
              border border-white/20
              shadow-[4px_-4px_18px_rgba(0,0,0,0.2)]
            "
          >
            {/* Background image */}
            <img
              src={VALUE_IMAGES[i]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            {/* Label */}
            <span className="absolute bottom-3 left-4 text-sm font-bold text-white z-10">
              {item.title}
            </span>
          </div>
        ))}
      </div>

      {/* Right side: static text list — no animation, no opacity changes */}
      <ul className="grid flex-1 gap-5 sm:grid-cols-2 self-center">
        {items.map((item) => (
          <li key={item.title} className="border-l-2 border-ink pl-4">
            <p className="font-semibold text-ink">{item.title}</p>
            <p className="mt-1 text-sm text-primary-l-2">{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
