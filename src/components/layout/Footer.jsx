import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Phone, Clock, MapPin } from 'lucide-react'
import { Container } from '../ui/Container'
import { SocialIconButton } from './SocialIconButton'
import { ROUTES, COMPANY } from '../../utils/constants'

const SOCIALS = [
  { platform: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
  { platform: 'youtube', href: 'https://youtube.com', label: 'YouTube' },
  { platform: 'tiktok', href: 'https://tiktok.com', label: 'TikTok' },
  { platform: 'zalo', href: 'https://zalo.me', label: 'Zalo' },
]

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const columns = [
    {
      title: t('nav.introduction'),
      links: [
        { to: ROUTES.about, label: t('nav.about') },
        { to: ROUTES.history, label: t('nav.history') },
        { to: ROUTES.culture, label: t('nav.culture') },
      ],
    },
    {
      title: t('nav.ecommerce'),
      links: [
        { to: ROUTES.brands, label: t('nav.brands') },
        { to: ROUTES.forAgents, label: t('nav.forAgents') },
        { to: ROUTES.forSuppliers, label: t('nav.forSuppliers') },
      ],
    },
  ]

  return (
    <footer className="border-t border-primary-l-4 bg-ink text-primary-l-4">
      {/* Brand block: the wordmark is deliberately oversized (~1/3 of the
          footer's width at desktop) per direct request -- bigger than the
          type scale's own 60px ceiling, so treated as a one-off exception
          rather than a new token. */}
      <Container className="py-12 sm:py-[50px]">
        <span
          className="block font-black leading-[0.85] tracking-tight text-bg"
          style={{ fontSize: 'clamp(2.5rem, 9vw, 6rem)' }}
        >
          HELICORP
        </span>
        <p className="mt-4 max-w-sm text-sm">{t('footer.tagline')}</p>
        <div className="mt-6 flex gap-3">
          {SOCIALS.map((social) => (
            <SocialIconButton key={social.platform} {...social} />
          ))}
        </div>
      </Container>

      <Container className="grid gap-10 border-t border-primary-l-2/20 py-10 sm:py-[50px] lg:grid-cols-4">
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-sm font-semibold text-bg">{col.title}</h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors duration-base ease-out-soft hover:text-bg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label={t('nav.contact')}>
          <h3 className="text-sm font-semibold text-bg">{t('nav.contact')}</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <Link to={ROUTES.forAgentsContact} className="text-sm hover:text-bg">
                {t('nav.contactAgent')}
              </Link>
            </li>
            <li>
              <Link to={ROUTES.forSuppliersContact} className="text-sm hover:text-bg">
                {t('nav.contactSupplier')}
              </Link>
            </li>
            <li>
              <Link to={ROUTES.careers} className="text-sm hover:text-bg">
                {t('nav.careers')}
              </Link>
            </li>
            <li>
              <Link to={ROUTES.news} className="text-sm hover:text-bg">
                {t('nav.news')}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-1">
          <h3 className="text-sm font-semibold text-bg">{t('footer.support')}</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>{COMPANY.hq.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                {t('footer.purchaseConsultation')}: {COMPANY.phones.purchase}
                <br />
                {t('footer.warrantyCenter')}: {COMPANY.phones.warranty}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Clock size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>
                {t('footer.workingHours')}: {t('footer.workingHoursValue')}
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-4 border-t border-primary-l-2/30 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>{t('footer.rights', { year })}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <span className="text-primary-l-3">{t('footer.corporateWebsites')}:</span>
          {COMPANY.corporateSites.map((site) => (
            <a
              key={site.url}
              href={site.url}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors duration-base ease-out-soft hover:text-bg"
            >
              {site.name}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  )
}
