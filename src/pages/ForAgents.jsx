import { useTranslation } from 'react-i18next'
import { CheckCircle2 } from 'lucide-react'
import { SEO } from '../components/ui/SEO'
import { PageHeader } from '../components/ui/PageHeader'
import { Container, Section } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Reveal, StaggerReveal } from '../components/ui/Reveal'
import { PageBackground } from '../components/ui/PageBackground'
import { ROUTES } from '../utils/constants'

export function ForAgents() {
  const { t } = useTranslation()
  const why = t('forAgents.why', { returnObjects: true })
  const excellenceItems = t('forAgents.excellenceItems', { returnObjects: true })

  const channels = [
    { title: t('forAgents.channelOnlineTitle'), body: t('forAgents.channelOnlineBody') },
    { title: t('forAgents.channelOfflineTitle'), body: t('forAgents.channelOfflineBody') },
    { title: t('forAgents.channelB2BTitle'), body: t('forAgents.channelB2BBody') },
  ]

  return (
    <>
      <SEO title={t('forAgents.title')} description={t('forAgents.intro')} />
      <PageBackground />
      <PageHeader eyebrow={t('forAgents.eyebrow')} title={t('forAgents.title')} body={t('forAgents.intro')} />

      <Section>
        <Container className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-xl font-semibold text-ink">{t('forAgents.whyTitle')}</h2>
            <ul className="mt-5 space-y-3">
              {why.map((reason) => (
                <li key={reason} className="flex gap-3 text-primary-l-2">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                  {reason}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-full">
              <h2 className="text-xl font-semibold text-ink">{t('forAgents.opsTitle')}</h2>
              <p className="mt-4 text-primary-l-2">{t('forAgents.opsBody')}</p>
            </Card>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-cream/30">
        <Container>
          <SectionHeading title={t('forAgents.distributionTitle')} />
          <StaggerReveal className="mt-8 grid gap-5 lg:grid-cols-3">
            {channels.map((channel) => (
              <Card key={channel.title}>
                <h3 className="font-semibold text-ink">{channel.title}</h3>
                <p className="mt-3 text-sm text-primary-l-2">{channel.body}</p>
              </Card>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow={t('forAgents.mapEyebrow')} title={t('forAgents.mapTitle')} body={t('forAgents.mapBody')} />

        </Container>
      </Section>

      <Section className="bg-cream/30">
        <Container>
          <SectionHeading title={t('forAgents.excellenceTitle')} />
          <StaggerReveal className="mt-8 grid gap-5 sm:grid-cols-2">
            {excellenceItems.map((item) => (
              <Card key={item}>
                <p className="text-primary-l-2">{item}</p>
              </Card>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal className="rounded-token-sm bg-primary px-8 py-10 text-center sm:px-10">
            <p className="text-sm font-semibold tracking-wide text-primary-l-4">{t('forAgents.ctaEyebrow')}</p>
            <h2 className="mt-3 text-xl font-semibold text-bg sm:text-2xl">{t('forAgents.ctaTitle')}</h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-l-4">{t('forAgents.ctaBody')}</p>
            <Button to={ROUTES.forAgentsContact} variant="accent" size="lg" className="mt-8">
              {t('forAgents.ctaButton')}
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
