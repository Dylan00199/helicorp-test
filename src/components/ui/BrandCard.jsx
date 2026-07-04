import { cn } from '../../utils/cn'

const LOGO_MAP = {
  'petkit': '/images/logo/petkit.webp',
  'petree': '/images/logo/petree.webp',
  'neakasa': '/images/logo/neakasa.webp',
  'helipet': '/images/logo/helipet.webp',
  'maxclean': '/images/logo/maxclean.webp',
  'ubpet': '/images/logo/UBPet.webp',
  'dr.vet': '/images/logo/drvet.webp',
}

/**
 * Brutalist showcase card ported from brand.html -- hard offset shadow,
 * hover lift + shadow grow, press-down active state, subtle rotating
 * conic-gradient sheen on hover. `label` is a short descriptor shown under
 * the brand name (e.g. its category or relationship to HELICORP).
 */
export function BrandCard({ name, label }) {
  const key = name.toLowerCase().replace(/\s+/g, '')
  const logo = LOGO_MAP[key] || null

  return (
    <div className="brand-card group relative overflow-hidden">
      {/* Subtle watermark background logo */}
      {logo && (
        <div
          className="absolute inset-0 z-0 opacity-10 transition-transform duration-500 group-hover:scale-110 pointer-events-none"
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right -10px center',
            width: '40%',
            left: 'auto',
          }}
        />
      )}

      {/* Brand card mark (circle) */}
      <div
        className={cn(
          "brand-card-mark relative z-10 flex items-center justify-center rounded-full overflow-hidden transition-transform",
          logo && "bg-white border border-primary-l-4"
        )}
        aria-hidden="true"
      >
        {logo ? (
          <img src={logo} alt="" className="h-full w-full object-contain p-1.5" />
        ) : (
          name.charAt(0)
        )}
      </div>

      {/* Brand card text */}
      <div className="brand-card-text relative z-10">
        <span>{name}</span>
        {label && <span>{label}</span>}
      </div>
    </div>
  )
}

