import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LanguageToggle } from './LanguageToggle'
import { cn } from '../../utils/cn'

export function MobileMenu({ open, onClose, navGroups, flatLinks }) {
  const { t } = useTranslation()
  const location = useLocation()
  const [expandedGroup, setExpandedGroup] = useState(null)

  useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-100 bg-bg lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.home')}
        >
          <div className="flex items-center justify-end px-4 py-4">
            <button
              type="button"
              onClick={onClose}
              aria-label={t('common.back')}
              className="rounded-token-sm p-2 text-ink focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <X size={26} aria-hidden="true" />
            </button>
          </div>

          <nav className="flex h-[calc(100%-64px)] flex-col overflow-y-auto px-6 pb-8">
            <ul className="flex flex-1 flex-col gap-1">
              {navGroups.map((group) => {
                const isExpanded = expandedGroup === group.label
                return (
                  <li key={group.label} className="border-b border-primary-l-4 py-2">
                    <button
                      type="button"
                      onClick={() => setExpandedGroup(isExpanded ? null : group.label)}
                      aria-expanded={isExpanded}
                      className="flex w-full items-center justify-between py-3 text-lg font-semibold text-ink"
                    >
                      {group.label}
                      <ChevronDown
                        size={20}
                        className={cn('transition-transform duration-base', isExpanded && 'rotate-180')}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pl-3"
                        >
                          {group.items.map((item) => (
                            <li key={item.to}>
                              <Link to={item.to} className="block py-2.5 text-base text-primary-l-2">
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}

              {flatLinks.map((link) => (
                <li key={link.to} className="border-b border-primary-l-4 py-2">
                  <Link to={link.to} className="block py-3 text-lg font-semibold text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <LanguageToggle className="mt-6 self-start" />
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
