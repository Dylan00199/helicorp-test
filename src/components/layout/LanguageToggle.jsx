import { useTranslation } from 'react-i18next'
import { cn } from '../../utils/cn'

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'vi', label: 'VI' },
]

/**
 * Visual language borrowed from ButtonLanguage.html -- the chunky
 * multi-layer "bezel" look (inset highlight + soft drop shadow stack,
 * gradient fill on the active state) -- adapted from that file's single
 * hidden-text-swap button into a persistent two-segment toggle, since the
 * requirement here is that both "EN" and "VI" stay legible at all times
 * rather than one being revealed only on hover/focus.
 *
 * Fixes the current site's language-switch bug: this only ever calls
 * `i18n.changeLanguage`, which re-renders the already-mounted tree in
 * place -- same route, same scroll position, no reload.
 */
export function LanguageToggle({ className }) {
  const { i18n, t } = useTranslation()
  const current = i18n.resolvedLanguage?.startsWith('vi') ? 'vi' : 'en'

  return (
    <div
      role="group"
      aria-label={t('nav.languageLabel')}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-token-pill border-2 border-ink bg-bg p-1',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_2px_0_rgba(0,0,0,0.15)]',
        className,
      )}
    >
      {LANGS.map(({ code, label }) => {
        const active = current === code
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            onClick={() => i18n.changeLanguage(code)}
            className={cn(
              'rounded-token-pill px-3.5 py-1.5 text-sm font-bold tracking-wide transition-all duration-base ease-out-soft',
              'focus-visible:outline-2 focus-visible:outline-offset-2',
              active
                ? 'bg-ink text-bg shadow-[inset_0_-2px_2px_rgba(255,255,255,0.15),inset_0_2px_2px_rgba(0,0,0,0.3)] -translate-y-px'
                : 'text-primary-l-2 hover:text-ink',
            )}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
