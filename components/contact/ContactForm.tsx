'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import type { Dictionary, Locale } from '@/types/i18n'

type FormCopy = Dictionary['contact']['form']

type FormFields = {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormFields, string>>

type Status = 'idle' | 'loading' | 'success' | 'error'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validate(fields: FormFields, messages: FormCopy['errors']): FormErrors {
  const errors: FormErrors = {}
  const name = fields.name.trim()
  const email = fields.email.trim()
  const message = fields.message.trim()

  if (!name || name.length > 100) {
    errors.name = messages.name
  }
  if (!email || !isValidEmail(email)) {
    errors.email = messages.email
  }
  if (!message || message.length < 10 || message.length > 2000) {
    errors.message = messages.message
  }
  return errors
}

const inputBase =
  'w-full bg-surface border rounded-xl px-4 py-3 text-white text-sm placeholder:text-text-secondary focus:outline-none transition-colors duration-150'

type Props = {
  locale: Locale
  copy: FormCopy
}

export default function ContactForm({ locale, copy }: Props) {
  const [fields, setFields] = useState<FormFields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [globalError, setGlobalError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGlobalError('')

    const validationErrors = validate(fields, copy.errors)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setStatus('loading')

    try {
      // The locale travels in a header: the body keeps its shape, and the route can
      // localize its errors even when the JSON is unreadable.
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-locale': locale },
        body: JSON.stringify(fields),
      })

      if (res.ok) {
        setStatus('success')
        setFields({ name: '', email: '', message: '' })
      } else {
        const data = await res.json().catch(() => ({}))
        setGlobalError((data as { error?: string }).error ?? copy.errors.generic)
        setStatus('error')
      }
    } catch {
      setGlobalError(copy.errors.retry)
      setStatus('error')
    }
  }

  const inputClass = (field: keyof FormErrors) =>
    `${inputBase} ${errors[field] ? 'border-red-400/50 focus:border-red-400/70' : 'border-white/10 focus:border-accent'}`

  if (status === 'success') {
    return (
      <div className="py-10">
        <p className="text-accent font-medium text-base mb-2">{copy.successTitle}</p>
        <p className="text-text-secondary text-sm">{copy.successMessage}</p>
      </div>
    )
  }

  const isLoading = status === 'loading'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-1.5">
          {copy.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={fields.name}
          onChange={handleChange}
          placeholder={copy.namePlaceholder}
          disabled={isLoading}
          className={inputClass('name')}
        />
        {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-1.5">
          {copy.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
          placeholder={copy.emailPlaceholder}
          disabled={isLoading}
          className={inputClass('email')}
        />
        {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white mb-1.5">
          {copy.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={fields.message}
          onChange={handleChange}
          placeholder={copy.messagePlaceholder}
          disabled={isLoading}
          className={`${inputClass('message')} resize-none`}
        />
        {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
      </div>

      {globalError && <p className="text-sm text-red-400">{globalError}</p>}

      <Button
        label={isLoading ? copy.submitting : copy.submit}
        variant="primary"
        type="submit"
        icon={isLoading ? undefined : 'send'}
        className="w-full justify-center"
      />
    </form>
  )
}
