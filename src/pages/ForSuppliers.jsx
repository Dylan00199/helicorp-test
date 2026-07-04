import { useTranslation } from 'react-i18next'
import { SEO } from '../components/ui/SEO'
import { PageHeader } from '../components/ui/PageHeader'
import { Container, Section } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { StatCounter } from '../components/ui/StatCounter'
import { Reveal, StaggerReveal } from '../components/ui/Reveal'
import { ROUTES } from '../utils/constants'

export function ForSuppliers() {
  const { t } = useTranslation()
  const sections = t('forSuppliers.sections', { returnObjects: true })
  const logistics = t('forSuppliers.logistics', { returnObjects: true })
  const stats = t('forSuppliers.stats', { returnObjects: true })

  return (
    <>
      <SEO title={t('forSuppliers.title')} description={t('forSuppliers.intro')} />
      <PageHeader
        eyebrow={t('forSuppliers.eyebrow')}
        title={t('forSuppliers.title')}
        body={t('forSuppliers.intro')}
      />

      <Section>
        <Container>
          <StaggerReveal className="grid gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <StatCounter value={stat.value} label={stat.label} />
              </Card>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      <Section className="bg-cream/30">
        <Container>
          <StaggerReveal className="grid gap-5 lg:grid-cols-2">
            {sections.map((section) => (
              <Card key={section.title}>
                <h3 className="font-semibold text-ink">{section.title}</h3>
                <p className="mt-3 text-sm text-primary-l-2">{section.body}</p>
              </Card>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title={t('forSuppliers.logisticsTitle')} />
          <StaggerReveal className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {logistics.map((item) => (
              <Card key={item.title}>
                <h3 className="font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-primary-l-2">{item.body}</p>
              </Card>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal className="rounded-token-sm bg-brand-orange px-8 py-10 text-center sm:px-10">
            <p className="text-sm font-semibold tracking-wide text-cream">{t('forSuppliers.ctaEyebrow')}</p>
            <h2 className="mt-3 text-xl font-semibold text-bg sm:text-2xl">{t('forSuppliers.ctaTitle')}</h2>
            <p className="mx-auto mt-4 max-w-xl text-cream">{t('forSuppliers.ctaBody')}</p>
            <Button
              to={ROUTES.forSuppliersContact}
              variant="accent"
              size="lg"
              className="mt-8"
            >
              {t('forSuppliers.ctaButton')}
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
