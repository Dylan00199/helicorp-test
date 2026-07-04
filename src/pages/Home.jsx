import { useTranslation } from 'react-i18next'
import { ArrowRight, MousePointer2 } from 'lucide-react'
import { SEO } from '../components/ui/SEO'
import { PageBackground } from '../components/ui/PageBackground'
import { Container, Section } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Reveal, StaggerReveal } from '../components/ui/Reveal'
import { BrandCard } from '../components/ui/BrandCard'
import { HeroCanvas } from '../components/three/HeroCanvas'
import { CanvasBoundary } from '../components/three/CanvasBoundary'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'
import { ROUTES } from '../utils/constants'

const PARTNERS = [
  { name: 'PETKIT', label: 'Smart Pet Tech' },
  { name: 'Dr.VET', label: 'Health & Nutrition' },
  { name: 'PETREE', label: 'Product Partner' },
  { name: 'HELIPET', label: 'In-house Brand' },
  { name: 'Max Clean', label: 'In-house Brand' },
  { name: 'NEAKASA', label: 'Smart Cleaning' },
  { name: 'UBPET', label: 'Partner Brand' },
]

export function Home() {
  const { t } = useTranslation()
  const reducedMotion = usePrefersReducedMotion()

  const services = t('home.services', { returnObjects: true })
  const industries = t('home.industries', { returnObjects: true })
  const strengths = t('home.strengths', { returnObjects: true })

  return (
    <>
      <SEO title={t('home.heroTitle')} description={t('home.heroBody')} />
      <PageBackground />

      {/* Hero: normal height now (was a 220vh scroll-pinned rig driving the
          old model's rotation) -- the rebuilt 3D model uses OrbitControls
          for user-driven rotation instead of scroll-scrubbing, so there's
          no need to pin the section across an extended scroll range
          anymore. This also directly addresses the "too much blank space
          below the model" issue: the next section now starts right after
          a normal-height hero instead of after a 220vh pin. */}
      <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden bg-[#0a0a0a]">
        <CanvasBoundary>
          <HeroCanvas autoRotate={!reducedMotion} />
        </CanvasBoundary>

        <Container className="relative z-10 flex h-full flex-col items-start justify-center">
          <p className="text-sm font-semibold tracking-wide text-primary-l-4">{t('home.heroEyebrow')}</p>
          <h1 className="mt-4 max-w-2xl text-3xl font-bold text-bg">{t('home.heroTitle')}</h1>
          <p className="mt-3 text-lg font-medium text-primary-l-4">{t('home.heroSubtitle')}</p>
          <p className="mt-5 max-w-xl text-lg text-primary-l-3">{t('home.heroBody')}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to={ROUTES.forSuppliers} variant="accent" size="lg">
              {t('home.heroCtaPrimary')}
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button to={ROUTES.forAgents} variant="outlineOnDark" size="lg">
              {t('home.heroCtaSecondary')}
            </Button>
          </div>
        </Container>

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-xs font-medium text-primary-l-3">
          <MousePointer2 size={14} aria-hidden="true" />
          Drag to rotate
        </div>
      </section>

      {/* Core Services */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow={t('home.servicesEyebrow')}
            title={t('home.servicesTitle')}
            body={t('home.servicesBody')}
          />
          <StaggerReveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card
                key={service.title}
                interactive
                className="relative overflow-hidden flex flex-col justify-end min-h-[320px] group border-primary-l-4"
              >
                {/* Background Image */}
                <img
                  src={`/images/home${index + 1}.png`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20" />

                {/* Card Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white">{service.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-white/80">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      {/* Industries */}
      <Section className="bg-cream/30">
        <Container>
          <SectionHeading eyebrow={t('home.industriesEyebrow')} title={t('home.industriesTitle')} />
          <StaggerReveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <Card
                key={industry.title}
                interactive
                className="relative overflow-hidden flex flex-col justify-end min-h-[300px] group border-primary-l-4"
              >
                {/* Background Image */}
                <img
                  src={`/images/industry (${index + 1}).png`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20" />

                {/* Card Content */}
                <div className="relative z-10">
                  <h3 className="font-bold text-white">{industry.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{industry.body}</p>
                </div>
              </Card>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      {/* Strengths */}
      <Section>
        <Container>
          <SectionHeading eyebrow={t('home.strengthsEyebrow')} title={t('home.strengthsTitle')} />
          <StaggerReveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map((strength) => (
              <Card key={strength.title} className="border-l-4 border-l-ink">
                <div>
                  <h3 className="font-semibold text-ink">{strength.title}</h3>
                  <p className="mt-2 text-sm text-primary-l-2">{strength.body}</p>
                </div>
              </Card>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      {/* Partners -- brutalist showcase cards ported from brand.html */}
      <Section className="bg-cream/30">
        <Container>
          <SectionHeading eyebrow={t('home.partnersEyebrow')} title={t('home.partnersTitle')} />
          <p className="mt-3 text-sm text-primary-l-3">{t('home.partnersNote')}</p>
          <StaggerReveal className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERS.map((partner) => (
              <BrandCard key={partner.name} name={partner.name} label={partner.label} />
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section>
        <Container>
          <Reveal className="rounded-token-sm bg-ink px-8 py-10 text-center sm:px-10">
            <h2 className="text-xl font-semibold text-bg sm:text-2xl">{t('home.finalCtaTitle')}</h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-l-4">{t('home.finalCtaBody')}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to={ROUTES.forAgentsContact} variant="accent" size="lg">
                {t('home.finalCtaPrimary')}
              </Button>
              <Button to={ROUTES.forSuppliersContact} variant="outlineOnDark" size="lg">
                {t('home.finalCtaSecondary')}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
