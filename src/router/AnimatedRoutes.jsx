import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { PageTransition } from './PageTransition'
import { ScrollToTop } from './ScrollToTop'
import { ROUTES } from '../utils/constants'

const Home = lazy(() => import('../pages/Home').then((m) => ({ default: m.Home })))
const About = lazy(() => import('../pages/About').then((m) => ({ default: m.About })))
const History = lazy(() => import('../pages/History').then((m) => ({ default: m.History })))
const Culture = lazy(() => import('../pages/Culture').then((m) => ({ default: m.Culture })))
const Brands = lazy(() => import('../pages/Brands').then((m) => ({ default: m.Brands })))
const ForAgents = lazy(() => import('../pages/ForAgents').then((m) => ({ default: m.ForAgents })))
const ForSuppliers = lazy(() =>
  import('../pages/ForSuppliers').then((m) => ({ default: m.ForSuppliers })),
)
const Careers = lazy(() => import('../pages/Careers').then((m) => ({ default: m.Careers })))
const News = lazy(() => import('../pages/News').then((m) => ({ default: m.News })))
const ContactAgent = lazy(() =>
  import('../pages/ContactAgent').then((m) => ({ default: m.ContactAgent })),
)
const ContactSupplier = lazy(() =>
  import('../pages/ContactSupplier').then((m) => ({ default: m.ContactSupplier })),
)
const NotFound = lazy(() => import('../pages/NotFound').then((m) => ({ default: m.NotFound })))

const routeTable = [
  { path: ROUTES.home, Component: Home },
  { path: ROUTES.about, Component: About },
  { path: ROUTES.history, Component: History },
  { path: ROUTES.culture, Component: Culture },
  { path: ROUTES.brands, Component: Brands },
  { path: ROUTES.forAgents, Component: ForAgents },
  { path: ROUTES.forAgentsContact, Component: ContactAgent },
  { path: ROUTES.forSuppliers, Component: ForSuppliers },
  { path: ROUTES.forSuppliersContact, Component: ContactSupplier },
  { path: ROUTES.careers, Component: Careers },
  { path: ROUTES.news, Component: News },
]

/**
 * `location` is passed explicitly to <Routes> (rather than letting it read
 * the router context itself) so AnimatePresence can key on the pathname and
 * play an exit animation for the outgoing page before the new one mounts.
 */
export function AnimatedRoutes() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            {routeTable.map(({ path, Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <PageTransition>
                    <Component />
                  </PageTransition>
                }
              />
            ))}
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  )
}
