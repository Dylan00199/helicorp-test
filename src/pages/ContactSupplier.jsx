import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Clock } from 'lucide-react'
import { SEO } from '../components/ui/SEO'
import { PageBackground } from '../components/ui/PageBackground'
import { PageHeader } from '../components/ui/PageHeader'
import { Container, Section } from '../components/ui/Container'
import { ContactTiltCard } from '../components/ui/ContactTiltCard'
import { ContactForm } from '../components/forms/ContactForm'
import { submitSupplierContact } from '../services/api'
import { COMPANY } from '../utils/constants'

const FIELDS = ['name', 'phone', 'email', 'company', 'productCategory', 'message']

export function ContactSupplier() {
  const { t } = useTranslation()

  return (
    <>
      <SEO title={t('contactSupplier.title')} description={t('contactSupplier.intro')} />
      <PageBackground />
      <PageHeader
        eyebrow={t('contactSupplier.eyebrow')}
        title={t('contactSupplier.title')}
        body={t('contactSupplier.intro')}
      />

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm fields={FIELDS} onSubmitFn={submitSupplierContact} />

          <div className="space-y-6">
            <ContactTiltCard>
              <h2 className="font-semibold text-bg">{t('contactSupplier.infoTitle')}</h2>
              <ul className="mt-4 space-y-3 text-sm text-primary-l-4">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {COMPANY.hq.address}
                </li>
                <li className="flex items-start gap-2">
                  <Phone size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {COMPANY.phones.purchase}
                </li>
                <li className="flex items-start gap-2">
                  <Clock size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {t('footer.workingHoursValue')}
                </li>
              </ul>
            </ContactTiltCard>

            <ContactTiltCard>
              <h2 className="font-semibold text-bg">{t('contactSupplier.sideNoteTitle')}</h2>
              <p className="mt-3 text-sm text-primary-l-4">{t('contactSupplier.sideNoteBody')}</p>
            </ContactTiltCard>
          </div>
        </Container>
      </Section>
    </>
  )
}
