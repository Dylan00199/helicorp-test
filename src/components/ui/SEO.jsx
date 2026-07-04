import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

/**
 * Client-rendered <title>/<meta> per route. This is a Vite SPA (see
 * README for the SSR trade-off), so these tags won't be present in the
 * initial HTML for crawlers that don't execute JavaScript -- fine for
 * Googlebot today, worth revisiting with SSR/prerendering if OG-preview
 * fidelity on social platforms becomes a priority.
 */
export function SEO({ title, description }) {
  const { t } = useTranslation()
  const fullTitle = title ? `${title} — ${t('meta.titleSuffix')}` : t('meta.titleSuffix')

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  )
}
