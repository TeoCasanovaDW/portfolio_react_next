'use client'

import { useState } from 'react'
import Icon from '@/components/ui/Icon'

type Props = {
  email: string
}

export default function CopyEmailButton({ email }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — silent fail
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copier l'adresse email"
      className="inline-flex items-center justify-between gap-6 px-5 py-3.5 rounded-2xl bg-accent hover:bg-accent/90 transition-colors duration-150 w-full sm:w-auto"
    >
      <span className="text-[#121212] font-medium text-sm">{email}</span>
      <span className="flex items-center gap-1.5 min-w-[52px] justify-end">
        {copied ? (
          <span className="text-[#121212] text-xs font-medium">Copié !</span>
        ) : (
          <Icon name="copy" size={16} alt="" className="brightness-0" />
        )}
      </span>
    </button>
  )
}
