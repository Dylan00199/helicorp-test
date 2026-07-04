import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SEO } from '../components/ui/SEO'
import { PageBackground } from '../components/ui/PageBackground'
import { PageHeader } from '../components/ui/PageHeader'
import { Container, Section } from '../components/ui/Container'
import { Tag } from '../components/ui/Tag'
import { StaggerReveal } from '../components/ui/Reveal'
import { NewsCard } from '../components/news/NewsCard'
import { fetchNews } from '../services/api'

export function News() {
  const { t } = useTranslation()
  const [items, setItems] = useState([])

  useEffect(() => {
    let active = true
    fetchNews().then((data) => {
      if (active) setItems(data)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <SEO title={t('news.title')} description={t('news.intro')} />
      <PageBackground />
      <PageHeader eyebrow={t('news.eyebrow')} title={t('news.title')} body={t('news.intro')} />

      <Section>
        <Container>
          <Tag tone="neutral" className="mb-6">
            {t('news.sampleBadge')}
          </Tag>
          <StaggerReveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </StaggerReveal>
        </Container>
      </Section>
    </>
  )
}
