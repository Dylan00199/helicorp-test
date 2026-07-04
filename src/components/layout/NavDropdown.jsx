import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '../../utils/cn'

/**
 * A disclosure (button revealing a list of real links), not an
 * application-style ARIA menu -- that's the correct pattern for site
 * navigation per the WAI-ARIA Authoring Practices, and it avoids the
 * roving-tabindex complexity a true `role="menu"` would require for no
 * real benefit here.
 *
 * Click-to-toggle rather than hover-to-open: hover-only dropdowns break for
 * keyboard and touch users, which is exactly the kind of "clunky
 * navigation" the brief calls out on the current site.
 */
export function NavDropdown({ label, items, isActive }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const triggerRef = useRef(null)
  const id = useId()
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return

    function onPointerDown(e) {
      if (!containerRef.current?.contains(e.target)) setOpen(false)
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-1 rounded-token-sm px-1 py-2 text-sm font-medium transition-colors duration-base ease-out-soft',
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          isActive ? 'text-primary' : 'text-ink hover:text-primary',
        )}
      >
        {label}
        <ChevronDown
          size={16}
          className={cn('transition-transform duration-base ease-out-soft', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={id}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 z-50 mt-2 min-w-[220px] rounded-token-sm border border-primary-l-4 bg-bg p-2"
          >
            {items.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="block rounded-token-sm px-3 py-2 text-sm text-ink transition-colors duration-base ease-out-soft hover:bg-cream hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
