import { useState, useCallback, useId } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '../../utils/cn'

/**
 * Variants for the black & white theme:
 *  - primary: solid black, for light backgrounds
 *  - accent: solid white with a black border, for dark backgrounds (hero,
 *    dark CTA blocks) -- the "inverse" of primary rather than a hue swap
 *  - secondary: outlined, transparent fill
 *  - ghost: text only
 *
 * `--btn-blob-color` feeds the .btn-blob hover glow (see globals.css,
 * ported from button.html) -- light blobs on dark buttons, dark blobs on
 * light/outlined ones, so the glow always reads against its own surface.
 */
const VARIANTS = {
  primary: {
    classes: 'bg-primary text-bg hover:bg-secondary-d-1',
    blobColor: '#ffffff',
  },
  accent: {
    classes: 'bg-bg text-ink border-2 border-bg hover:bg-cream',
    blobColor: '#000000',
  },
  secondary: {
    classes: 'bg-transparent text-ink border-2 border-ink hover:bg-ink hover:text-bg',
    blobColor: '#000000',
  },
  outlineOnDark: {
    classes: 'bg-transparent text-bg border-2 border-bg hover:bg-bg hover:text-ink',
    blobColor: '#ffffff',
  },
  ghost: {
    classes: 'bg-transparent text-ink hover:text-primary-l-2',
    blobColor: '#000000',
  },
}

const SIZES = {
  base: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

/**
 * Design-system-compliant button: explicit hover/focus-visible/active/
 * disabled states, pill radius token, the button.html-derived glow-on-hover
 * effect, plus a tactile press (active:scale) and a small particle burst on
 * click -- "premium, not overdone" per the brief.
 *
 * Renders as a react-router <Link> when `to` is given, otherwise a native
 * <button>.
 */
export function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'base',
  disabled = false,
  className,
  children,
  onClick,
  ...props
}) {
  const [bursts, setBursts] = useState([])
  const uid = useId()
  const { classes: variantClasses, blobColor } = VARIANTS[variant]

  const handleClick = useCallback(
    (e) => {
      if (disabled) return
      const rect = e.currentTarget.getBoundingClientRect()
      const id = `${uid}-${Date.now()}`
      setBursts((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id))
      }, 500)
      onClick?.(e)
    },
    [disabled, onClick, uid],
  )

  const classes = cn(
    'btn-blob relative inline-flex items-center justify-center gap-2',
    'rounded-token-pill font-medium select-none',
    'transition-[background-color,color,border-color,transform] duration-base ease-out-soft',
    'active:scale-[0.96]',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    disabled && 'opacity-45 pointer-events-none',
    variantClasses,
    SIZES[size],
    className,
  )

  const burstLayer = (
    <AnimatePresence>
      {bursts.map((b) => (
        <motion.span
          key={b.id}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-current"
          style={{ left: b.x, top: b.y, width: 8, height: 8, marginLeft: -4, marginTop: -4 }}
          initial={{ opacity: 0.45, scale: 0 }}
          animate={{ opacity: 0, scale: 7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </AnimatePresence>
  )

  const Tag = as ?? (to ? Link : href ? 'a' : 'button')
  const tagProps = to ? { to } : href ? { href } : { type: props.type ?? 'button' }

  return (
    <Tag
      className={classes}
      style={{ '--btn-blob-color': blobColor }}
      onClick={handleClick}
      aria-disabled={disabled || undefined}
      {...tagProps}
      {...props}
    >
      {children}
      {burstLayer}
    </Tag>
  )
}
