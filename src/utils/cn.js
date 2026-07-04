import clsx from 'clsx'

/**
 * Thin wrapper around clsx. A `tailwind-merge` layer was deliberately left
 * out -- this project doesn't dynamically override conflicting utility
 * classes on the same element often enough to justify the extra dependency.
 * Add it back if that changes.
 */
export function cn(...inputs) {
  return clsx(...inputs)
}
