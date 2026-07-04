/**
 * Raw JS mirror of the tokens defined in `globals.css`.
 *
 * Tailwind utilities can't be read by Three.js materials or GSAP tweens, so
 * anything touching the <canvas> (WebGL) or animating a non-DOM value needs
 * the actual value here instead. Keep this in sync with the `@theme` block
 * in `globals.css` -- these two files are the single source of truth for
 * the design system in this project.
 *
 * Black & white theme: every token keeps its original name/lightness role,
 * desaturated to grayscale (see globals.css for the full mapping notes).
 */
export const colors = {
  bg: '#ffffff',
  primary: '#000000',
  ink: '#0a0a0a',
  primaryL2: '#696a6d',
  primaryL3: '#97989b',
  primaryL4: '#cbcccd',
  textInactive: '#aaaaaa',
  secondary: '#333333',
  secondaryD1: '#1a1a1a',
  secondaryD2: '#141414',
  secondaryD3: '#0d0d0d',
  secondaryL1: '#4d4d4d',
  secondaryL2: '#666666',
  secondaryL3: '#999999',
  secondaryL4: '#e0e0e0',
  brandOrange: '#1a1a1a',
  coral: '#1a1a1a',
  gold: '#808080',
  cream: '#f5f5f5',
}

export const motion = {
  durationFast: 0.1,
  durationBase: 0.3,
  durationSlow: 0.6,
  easeOutSoft: [0, 0, 0.2, 1],
  easePremium: [0.22, 1, 0.36, 1],
}
