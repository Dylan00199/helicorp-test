import { useTranslation } from 'react-i18next'
import { Card } from '../ui/Card'
import { Tag } from '../ui/Tag'

export function NewsCard({ item }) {
  const { i18n } = useTranslation()
  const lang = i18n.resolvedLanguage?.startsWith('vi') ? 'vi' : 'en'

  return (
    <Card as="article" interactive className="flex flex-col overflow-hidden p-0">

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <Tag>{item.tag[lang]}</Tag>
          <span className="text-xs text-primary-l-3">{item.date}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold text-ink">{item.title[lang]}</h3>
        <p className="mt-2 flex-1 text-sm text-primary-l-2">{item.excerpt[lang]}</p>
      </div>
    </Card>
  )
}
