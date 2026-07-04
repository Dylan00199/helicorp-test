import { useTranslation } from 'react-i18next'
import { Eye, Target, Compass } from 'lucide-react'
import { SEO } from '../components/ui/SEO'
import { PageBackground } from '../components/ui/PageBackground'
import { PageHeader } from '../components/ui/PageHeader'
import { Container, Section } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Card } from '../components/ui/Card'
import { StatCounter } from '../components/ui/StatCounter'
import { StackCard } from '../components/ui/StackCard'
import { Reveal, StaggerReveal } from '../components/ui/Reveal'

export function About() {
  const { t } = useTranslation()
  const stats = t('about.stats', { returnObjects: true })
  const values = t('about.values', { returnObjects: true })
  const facilitiesPillars = t('about.facilitiesPillars', { returnObjects: true })

  const channels = [
    { key: 'channelOffline', ...t('about.channelOffline', { returnObjects: true }) },
    { key: 'channelOnline', ...t('about.channelOnline', { returnObjects: true }) },
    { key: 'channelB2B', ...t('about.channelB2B', { returnObjects: true }) },
  ]

  return (
    <>
      <SEO title={t('about.title')} description={t('about.intro')} />
      <PageBackground />
      <PageHeader eyebrow={t('about.eyebrow')} title={t('about.title')} body={t('about.intro')} />

      <Section>
        <Container>
          <StaggerReveal className="grid gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <StatCounter value={stat.value} label={stat.label} />
              </Card>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      {/* Core Values -- stack_card.html effect, with a real accessible list
          of full descriptions alongside it (see StackCard.jsx) */}
      <Section className="bg-cream/30">
        <Container>
          <SectionHeading eyebrow={t('about.valuesEyebrow')} title={t('about.valuesTitle')} />
          <div className="mt-10">
            <StackCard items={values} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-6 lg:grid-cols-3">
          <Reveal>
            <Card className="flex h-full flex-col gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-ink text-bg">
                <Eye size={36} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">{t('about.visionTitle')}</h3>
                <p className="mt-3 text-primary-l-2">{t('about.visionBody')}</p>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="flex h-full flex-col gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-ink text-bg">
                <Target size={36} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">{t('about.missionTitle')}</h3>
                <p className="mt-3 text-primary-l-2">{t('about.missionBody')}</p>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.2}>
            <Card className="flex h-full flex-col gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-ink text-bg">
                <Compass size={36} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">{t('about.strategyTitle')}</h3>
                <p className="mt-3 text-primary-l-2">{t('about.strategyBody')}</p>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-cream/30">
        <Container>
          <SectionHeading eyebrow={t('about.omnichannelTitle')} title={t('about.omnichannelIntro')} />
          <StaggerReveal className="mt-10 grid gap-5 lg:grid-cols-3">
            {channels.map((channel) => (
              <Card key={channel.key} className="flex flex-col gap-4">

                <div>
                  <h3 className="font-semibold text-ink">{channel.title}</h3>
                  <p className="mt-3 text-sm text-primary-l-2">{channel.body}</p>
                </div>
              </Card>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow={t('about.facilitiesTitle')} title={t('about.facilitiesIntro')} />
          <StaggerReveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {facilitiesPillars.map((pillar) => (
              <Card key={pillar.title} className="flex flex-col gap-2">
                <div>
                  <h3 className="font-semibold text-ink">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-primary-l-2">{pillar.body}</p>
                </div>
              </Card>
            ))}
          </StaggerReveal>
        </Container>
        {/* Full-width environment photo below the cards */}
        <div className="mt-10 w-full overflow-hidden">
          <img
            src="/images/workingEnviroment.png"
            alt="Working Environment"
            className="w-full object-cover"
          />
        </div>
      </Section>
    </>
  )
}
