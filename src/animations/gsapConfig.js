import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Design-system motion tokens (see globals.css @theme) mirrored as GSAP-ready
// values. Duration in seconds, easing as literal cubic-bezier strings GSAP
// accepts directly.
export const EASE_PREMIUM = 'cubic-bezier(0.22, 1, 0.36, 1)'
export const EASE_OUT_SOFT = 'cubic-bezier(0, 0, 0.2, 1)'
export const DURATION_FAST = 0.1
export const DURATION_BASE = 0.3
export const DURATION_SLOW = 0.6

export { gsap, ScrollTrigger }
