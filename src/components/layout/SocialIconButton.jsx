/**
 * Facebook path below is the exact glyph from the provided contact_icon.html
 * reference. YouTube/TikTok/Zalo are deliberately simplified, generic
 * representations (a play-button glyph, a stylized note, a speech bubble)
 * rather than reconstructed official brand paths -- worth swapping for each
 * platform's official brand-kit SVG before this goes live.
 */
const ICONS = {
  facebook: (
    <svg viewBox="0 0 320 512" fill="currentColor" aria-hidden="true">
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="5" fill="currentColor" />
      <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="var(--color-bg)" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 3c.4 2.2 1.8 3.6 4 3.9v2.7c-1.4.1-2.7-.3-4-1.1v5.6a5 5 0 1 1-4.3-4.9v2.8a2.3 2.3 0 1 0 1.6 2.2V3H14z" />
    </svg>
  ),
  zalo: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.5 2 2 5.8 2 10.5c0 2.7 1.5 5.1 3.8 6.7-.2.9-.7 2.3-1.4 3.3 1.6-.3 3.3-1 4.5-1.8.9.2 1.9.3 2.9.3 5.5 0 10-3.8 10-8.5S17.5 2 12 2z" />
      <text x="12" y="13.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--color-bg)">
        Z
      </text>
    </svg>
  ),
}

export function SocialIconButton({ platform, href, label }) {
  return (
    <div className="social-icon-slot">
      <a href={href} target="_blank" rel="noreferrer noopener" aria-label={label} className="social-icon-button">
        <span className="h-5 w-5">{ICONS[platform]}</span>
      </a>
    </div>
  )
}
