'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

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

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {}
  const name = fields.name.trim()
  const email = fields.email.trim()
  const message = fields.message.trim()

  if (!name || name.length > 100) {
    errors.name = 'Le nom est requis (100 caractères max).'
  }
  if (!email || !isValidEmail(email)) {
    errors.email = 'Adresse email invalide.'
  }
  if (!message || message.length < 10 || message.length > 2000) {
    errors.message = 'Le message doit contenir entre 10 et 2000 caractères.'
  }
  return errors
}

const inputBase =
  'w-full bg-surface border rounded-xl px-4 py-3 text-white text-sm placeholder:text-text-secondary focus:outline-none transition-colors duration-150'

export default function ContactForm() {
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

    const validationErrors = validate(fields)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })

      if (res.ok) {
        setStatus('success')
        setFields({ name: '', email: '', message: '' })
      } else {
        const data = await res.json().catch(() => ({}))
        setGlobalError((data as { error?: string }).error ?? 'Une erreur est survenue.')
        setStatus('error')
      }
    } catch {
      setGlobalError('Une erreur est survenue. Veuillez réessayer.')
      setStatus('error')
    }
  }

  const inputClass = (field: keyof FormErrors) =>
    `${inputBase} ${errors[field] ? 'border-red-400/50 focus:border-red-400/70' : 'border-white/10 focus:border-accent'}`

  if (status === 'success') {
    return (
      <div className="py-10">
        <p className="text-accent font-medium text-base mb-2">Message envoyé !</p>
        <p className="text-text-secondary text-sm">Je vous répondrai dans les plus brefs délais.</p>
      </div>
    )
  }

  const isLoading = status === 'loading'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-1.5">
          Nom
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={fields.name}
          onChange={handleChange}
          placeholder="Votre nom"
          disabled={isLoading}
          className={inputClass('name')}
        />
        {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-1.5">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
          placeholder="votre@email.com"
          disabled={isLoading}
          className={inputClass('email')}
        />
        {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={fields.message}
          onChange={handleChange}
          placeholder="Votre message..."
          disabled={isLoading}
          className={`${inputClass('message')} resize-none`}
        />
        {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
      </div>

      {globalError && <p className="text-sm text-red-400">{globalError}</p>}

      <Button
        label={isLoading ? 'Envoi en cours…' : 'Envoyer'}
        variant="primary"
        type="submit"
        icon={isLoading ? undefined : 'send'}
        className="w-full justify-center"
      />
    </form>
  )
}
