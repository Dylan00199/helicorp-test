import { useTranslation } from 'react-i18next'
import { SEO } from '../components/ui/SEO'
import { PageBackground } from '../components/ui/PageBackground'
import { PageHeader } from '../components/ui/PageHeader'
import { Container, Section } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { BrandCard } from '../components/ui/BrandCard'
import { Reveal, StaggerReveal } from '../components/ui/Reveal'
import { ROUTES } from '../utils/constants'

export function Brands() {
  const { t } = useTranslation()
  const partners = t('brands.partners', { returnObjects: true })
  const inhouse = t('brands.inhouse', { returnObjects: true })

  return (
    <>
      <SEO title={t('brands.title')} description={t('brands.intro')} />
      <PageBackground />
      <PageHeader eyebrow={t('brands.eyebrow')} title={t('brands.title')} body={t('brands.intro')} />

      <Section>
        <Container>
          <SectionHeading title={t('brands.partnersTitle')} />
          <StaggerReveal className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((brand) => (
              <div key={brand.name} className="flex flex-col gap-3">
                <BrandCard name={brand.name} />
                <p className="text-sm text-primary-l-2">{brand.body}</p>
              </div>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      <Section className="bg-cream/30">
        <Container>
          <SectionHeading title={t('brands.inhouseTitle')} />
          <StaggerReveal className="mt-8 grid gap-6 sm:grid-cols-2">
            {inhouse.map((brand) => (
              <div key={brand.name} className="flex flex-col gap-3">
                <BrandCard name={brand.name} label="In-house" />
                <p className="text-sm text-primary-l-2">{brand.body}</p>
              </div>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      {/* These two CTAs are intentionally distinct in copy AND destination --
          the current site sends "For Partners" and "For Agents" to the same
          page; this pairing is the direct fix. */}
      <Section>
        <Container className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Card className="flex h-full flex-col justify-between border-l-4 border-l-ink">
              <div>
                <h3 className="text-lg font-semibold text-ink">{t('brands.ctaAgentTitle')}</h3>
                <p className="mt-3 text-primary-l-2">{t('brands.ctaAgentBody')}</p>
              </div>
              <Button to={ROUTES.forAgents} className="mt-6 self-start">
                {t('nav.forAgents')}
              </Button>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="flex h-full flex-col justify-between border-l-4 border-l-primary-l-2">
              <div>
                <h3 className="text-lg font-semibold text-ink">{t('brands.ctaSupplierTitle')}</h3>
                <p className="mt-3 text-primary-l-2">{t('brands.ctaSupplierBody')}</p>
              </div>
              <Button to={ROUTES.forSuppliers} variant="primary" className="mt-6 self-start">
                {t('nav.forSuppliers')}
              </Button>
            </Card>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
