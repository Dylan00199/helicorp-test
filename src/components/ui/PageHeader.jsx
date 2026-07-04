import { useScrollReveal } from '../../animations/useScrollReveal'
import { Container } from './Container'

/**
 * Every non-Home page gets this instead of its own 3D canvas. Running a
 * second WebGL context per route would multiply GPU/battery cost for
 * something users see for a moment while scrolling past -- a CSS gradient
 * is a fraction of the cost and, at this scale, indistinguishable from a
 * "premium" background at a glance.
 */
export function PageHeader({ eyebrow, title, body }) {
  const ref = useScrollReveal({ y: 16 })

  return (
    <header className="relative overflow-hidden border-b border-primary-l-4 bg-cream/30">
      <div
        aria-hidden="true"
        className="animate-blob-drift absolute -top-24 -left-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-blob-drift-slow absolute -right-20 -bottom-24 h-80 w-80 rounded-full bg-brand-orange/10 blur-3xl"
      />
      <Container className="relative py-10 pt-[calc(70px+4rem)] sm:pt-[calc(70px+60px)] sm:pb-10">
        <div ref={ref} className="max-w-2xl">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold tracking-wide text-primary">{eyebrow}</p>
          )}
          <h1 className="text-2xl font-semibold text-ink sm:text-3xl">{title}</h1>
          {body && <p className="mt-4 text-lg text-primary-l-2">{body}</p>}
        </div>
      </Container>
    </header>
  )
}
