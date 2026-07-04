import { useTranslation } from 'react-i18next'
import { TrendingUp, BookOpen, Users, Star } from 'lucide-react'
import { SEO } from '../components/ui/SEO'
import { PageBackground } from '../components/ui/PageBackground'
import { Container, Section } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Card } from '../components/ui/Card'
import { Reveal, StaggerReveal } from '../components/ui/Reveal'

// Icons matching each pillar by index
const PILLAR_ICONS = [
  <TrendingUp key="growth" size={32} strokeWidth={1.5} aria-hidden="true" />, // Growth & Passion
  <BookOpen   key="skill"  size={32} strokeWidth={1.5} aria-hidden="true" />, // Skill Up
  <Users      key="team"   size={32} strokeWidth={1.5} aria-hidden="true" />, // Team Engagement
  <Star       key="talent" size={32} strokeWidth={1.5} aria-hidden="true" />, // Talent Pipeline
]

export function Culture() {
  const { t } = useTranslation()
  const pillars = t('culture.pillars', { returnObjects: true })

  return (
    <>
      <SEO title={t('culture.title')} description={t('culture.intro')} />
      <PageBackground />

      {/* Hero — image only, no text */}
      <div className="mt-[70px] w-full">
        <img
          src="/images/CORPORATE_CULTURE.png"
          alt="Corporate Culture"
          className="w-full object-contain"
        />
      </div>

      {/* What Makes HELICORP Different — plain background, no image */}
      <Section>
        <Container>
          <SectionHeading eyebrow={t('culture.pillarsEyebrow')} title={t('culture.title')} />
          <StaggerReveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => (
              <Card key={pillar.title} className="flex flex-col gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-ink text-bg">
                  {PILLAR_ICONS[i]}
                </div>
                <div>
                  <h3 className="font-semibold text-ink">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-primary-l-2">{pillar.body}</p>
                </div>
              </Card>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      {/* Working Environment */}
      <Section className="bg-cream/30">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-semibold text-ink">{t('culture.workingEnvTitle')}</h3>
                <p className="mt-3 text-primary-l-2">{t('culture.workingEnvBody')}</p>
              </div>
              <img
                src="/images/workingEnviroment.png"
                alt="Working Environment"
                className="w-full rounded-token-sm object-contain"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Training & Development */}
      <Section>
        <Container>
          <Reveal>
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-semibold text-ink">{t('culture.trainingTitle')}</h3>
                <p className="mt-3 text-primary-l-2">{t('culture.trainingBody')}</p>
              </div>
              <img
                src="/images/trainandev.png"
                alt="Training and Development"
                className="w-full rounded-token-sm object-contain"
              />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
