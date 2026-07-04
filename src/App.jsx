import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { RootLayout } from './layouts/RootLayout'
import { AnimatedRoutes } from './router/AnimatedRoutes'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <RootLayout>
          <AnimatedRoutes />
        </RootLayout>
      </BrowserRouter>
    </HelmetProvider>
  )
}
