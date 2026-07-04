import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import vi from './locales/vi.json'

/**
 * Fixes the current site's main language bug: switching language must never
 * touch the URL or trigger a reload. i18next-browser-languagedetector caches
 * the choice to localStorage; React re-renders in place when the language
 * changes. `path`/`cookie` detectors/caches are deliberately excluded from
 * `order`/`caches` below so the URL is never touched.
 */
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'vi'],
    nonExplicitSupportedLngs: true,
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'helicorp-lang',
    },
    interpolation: {
      escapeValue: false,
    },
    returnEmptyString: false,
  })

export default i18n
