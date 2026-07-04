import { useTranslation } from 'react-i18next'
import { MapPin, Briefcase } from 'lucide-react'
import { Card } from '../ui/Card'
import { Tag } from '../ui/Tag'
import { Button } from '../ui/Button'
import { COMPANY } from '../../utils/constants'

export function JobCard({ job }) {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage?.startsWith('vi') ? 'vi' : 'en'
  const applyHref = `mailto:${COMPANY.email}?subject=${encodeURIComponent(`Application: ${job.title.en}`)}`

  return (
    <Card interactive className="flex flex-col">
      <Tag tone="orange" className="self-start">
        {job.type[lang]}
      </Tag>
      <h3 className="mt-4 text-lg font-semibold text-ink">{job.title[lang]}</h3>
      <p className="mt-2 flex-1 text-sm text-primary-l-2">{job.summary[lang]}</p>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-primary-l-2">
        <span className="flex items-center gap-1.5">
          <MapPin size={16} aria-hidden="true" />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase size={16} aria-hidden="true" />
          {job.experience[lang]}
        </span>
      </div>

      {job.link ? (
        <Button
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          className="mt-6 self-start"
        >
          {t('common.viewDetails')}
        </Button>
      ) : (
        <Button href={applyHref} variant="secondary" className="mt-6 self-start">
          {t('common.viewDetails')}
        </Button>
      )}
    </Card>
  )
}
