import { ReactLenis } from 'lenis/react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { LenisScrollTriggerBridge } from '../animations/LenisScrollTriggerBridge'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'

/**
 * Takes `children` rather than rendering a react-router <Outlet /> --
 * AnimatePresence needs to sit directly around the <Routes> element for
 * page-transition exit animations to fire, so the routing lives in
 * AnimatedRoutes (rendered as children here) instead of nested route
 * matching. Every page shares this exact shell, so there's no need for
 * react-router's nested-layout machinery.
 */
export function RootLayout({ children }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false, // driven by gsap.ticker instead, see LenisScrollTriggerBridge
        lerp: prefersReducedMotion ? 1 : 0.1,
        smoothWheel: !prefersReducedMotion,
        syncTouch: false,
        anchors: true,
        stopInertiaOnNavigate: true,
      }}
    >
      <LenisScrollTriggerBridge />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </ReactLenis>
  )
}
