import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Mail } from 'lucide-react'
import { SEO } from '../components/ui/SEO'
import { PageBackground } from '../components/ui/PageBackground'
import { PageHeader } from '../components/ui/PageHeader'
import { Container, Section } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { StaggerReveal, Reveal } from '../components/ui/Reveal'
import { JobCard } from '../components/career/JobCard'
import { fetchJobs } from '../services/api'
import { COMPANY } from '../utils/constants'

export function Careers() {
  const { t } = useTranslation()
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    let active = true
    fetchJobs().then((data) => {
      if (active) setJobs(data)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <SEO title={t('careers.title')} description={t('careers.intro')} />
      <PageBackground />
      <PageHeader eyebrow={t('careers.eyebrow')} title={t('careers.title')} body={t('careers.intro')} />

      <Section>
        <Container>
          <SectionHeading title={t('careers.openRolesTitle')} />
          <StaggerReveal className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </StaggerReveal>

          <Reveal delay={0.15} className="mt-10">
            <Card className="flex flex-col items-start gap-4 bg-cream/40 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-ink">{t('careers.generalCtaTitle')}</h3>
                <p className="mt-2 text-sm text-primary-l-2">{t('careers.generalCtaBody')}</p>
              </div>
              <Button href={`mailto:${COMPANY.email}?subject=${encodeURIComponent('General application')}`}>
                <Mail size={18} aria-hidden="true" />
                {t('careers.generalCtaButton')}
              </Button>
            </Card>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
