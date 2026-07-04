import { useTranslation } from 'react-i18next'
import { SEO } from '../components/ui/SEO'
import { PageBackground } from '../components/ui/PageBackground'

import { Container, Section } from '../components/ui/Container'
import { Timeline } from '../components/history/Timeline'

export function History() {
  const { t } = useTranslation()
  const milestones = t('history.milestones', { returnObjects: true })

  return (
    <>
      <SEO title={t('history.title')} description={t('history.intro')} />
      <PageBackground />
      {/* Hero — image only, no text */}
      <div className="mt-[70px] w-full">
        <img
          src="/images/Devhistory.png"
          alt={t('history.title')}
          className="w-full object-contain"
        />
      </div>

      <Section>
        <Container>
          {/* Widened from max-w-3xl now that each entry carries an image
              alongside its text, not just text alone. */}
          <div className="mx-auto max-w-4xl">
            <Timeline milestones={milestones} />
          </div>
        </Container>
      </Section>
    </>
  )
}
