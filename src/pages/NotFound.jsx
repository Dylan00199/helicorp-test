import { useTranslation } from 'react-i18next'
import { SEO } from '../components/ui/SEO'
import { PageBackground } from '../components/ui/PageBackground'
import { Container, Section } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { ROUTES } from '../utils/constants'

export function NotFound() {
  const { t } = useTranslation()

  return (
    <>
      <SEO title={t('notFound.title')} />
      <PageBackground />
      <div className="pt-[70px]" />
      <Section className="flex min-h-[60vh] items-center">
        <Container className="text-center">
          <p className="text-sm font-semibold tracking-wide text-primary">{t('notFound.eyebrow')}</p>
          <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">{t('notFound.title')}</h1>
          <p className="mx-auto mt-4 max-w-md text-primary-l-2">{t('notFound.body')}</p>
          <Button to={ROUTES.home} size="lg" className="mt-8">
            {t('notFound.cta')}
          </Button>
        </Container>
      </Section>
    </>
  )
}
