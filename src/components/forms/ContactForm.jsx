import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '../ui/Button'

const FIELD_TYPE = {
  name: 'text',
  phone: 'tel',
  email: 'email',
  company: 'text',
  jobTitle: 'text',
  productCategory: 'text',
  message: 'textarea',
}

const AUTOCOMPLETE = {
  name: 'name',
  phone: 'tel',
  email: 'email',
  company: 'organization',
  jobTitle: 'organization-title',
  productCategory: 'off',
  message: 'off',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9+\-\s()]{7,}$/

/**
 * `fields` controls which inputs render, in order -- e.g.
 * `['name','phone','email','company','jobTitle','message']` for FR10, or
 * swap `jobTitle` for `productCategory` for FR11. `onSubmitFn` is one of
 * the functions in `src/services/api.js`.
 */
export function ContactForm({ fields, onSubmitFn }) {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
  const [status, setStatus] = useState(null) // null | 'success' | 'error'

  async function onSubmit(data) {
    setStatus(null)
    try {
      await onSubmitFn(data)
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-token-sm border border-primary-l-4 bg-cream/50 p-6">
        <div className="flex items-center gap-2 text-primary">
          <CheckCircle2 aria-hidden="true" size={22} />
          <p className="font-semibold">{t('common.formSuccessTitle')}</p>
        </div>
        <p className="mt-2 text-sm text-primary-l-2">{t('common.formSuccess')}</p>
        <Button variant="secondary" className="mt-5" onClick={() => setStatus(null)}>
          {t('common.back')}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {fields.map((fieldKey) => {
        const type = FIELD_TYPE[fieldKey]
        const label = t(`common.${fieldKey}`)
        const fieldError = errors[fieldKey]
        const describedBy = fieldError ? `${fieldKey}-error` : undefined

        const validation = {
          required: t('common.errorRequired'),
          ...(fieldKey === 'email' && {
            pattern: { value: EMAIL_PATTERN, message: t('common.errorEmail') },
          }),
          ...(fieldKey === 'phone' && {
            pattern: { value: PHONE_PATTERN, message: t('common.errorPhone') },
          }),
        }

        const sharedClasses =
          'w-full rounded-token-sm border bg-bg px-4 py-3 text-ink placeholder:text-primary-l-3 transition-colors duration-base ease-out-soft focus-visible:outline-2 focus-visible:outline-offset-2 ' +
          (fieldError ? 'border-coral' : 'border-primary-l-4 focus:border-primary')

        return (
          <div key={fieldKey}>
            <label htmlFor={fieldKey} className="mb-2 block text-sm font-medium text-ink">
              {label}
            </label>
            {type === 'textarea' ? (
              <textarea
                id={fieldKey}
                rows={5}
                aria-invalid={fieldError ? 'true' : 'false'}
                aria-describedby={describedBy}
                className={sharedClasses}
                {...register(fieldKey, validation)}
              />
            ) : (
              <input
                id={fieldKey}
                type={type}
                autoComplete={AUTOCOMPLETE[fieldKey]}
                aria-invalid={fieldError ? 'true' : 'false'}
                aria-describedby={describedBy}
                className={sharedClasses}
                {...register(fieldKey, validation)}
              />
            )}
            {fieldError && (
              <p id={`${fieldKey}-error`} className="mt-1.5 text-sm text-secondary-d-2">
                {fieldError.message}
              </p>
            )}
          </div>
        )
      })}

      {status === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-token-sm border border-coral/40 bg-coral/5 p-4 text-sm text-secondary-d-2"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>{t('common.formError')}</p>
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full sm:w-auto">
        {isSubmitting ? t('common.sending') : t('common.send')}
      </Button>
    </form>
  )
}
