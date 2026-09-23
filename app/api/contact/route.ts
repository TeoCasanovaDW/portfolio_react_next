import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getDictionary, resolveLocale } from '@/lib/i18n'
import type { Locale } from '@/types/i18n'

const resend = new Resend(process.env.RESEND_API_KEY)

/** The internal email stays in French: only the visitor's language is reported in it. */
const VISITOR_LANGUAGE: Record<Locale, string> = {
  en: 'Anglais',
  fr: 'Français',
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  // Read before the body: even an unreadable JSON gets its error in the right language.
  const locale = resolveLocale(request.headers.get('x-locale') ?? undefined)
  const t = getDictionary(locale).contact.api

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: t.invalidRequest }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: t.invalidRequest }, { status: 400 })
  }

  const raw = body as Record<string, unknown>
  const name = typeof raw.name === 'string' ? raw.name.trim() : ''
  const email = typeof raw.email === 'string' ? raw.email.trim() : ''
  const message = typeof raw.message === 'string' ? raw.message.trim() : ''

  if (!name || name.length > 100) {
    return NextResponse.json({ error: t.invalidName }, { status: 400 })
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: t.invalidEmail }, { status: 400 })
  }
  if (!message || message.length < 10 || message.length > 2000) {
    return NextResponse.json({ error: t.invalidMessage }, { status: 400 })
  }

  const to = process.env.CONTACT_EMAIL
  if (!to) {
    return NextResponse.json({ error: t.missingConfiguration }, { status: 500 })
  }

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to,
    subject: `[Contact Portfolio] — ${name}`,
    text: `Nom : ${name}\nEmail : ${email}\nLangue du visiteur : ${VISITOR_LANGUAGE[locale]}\n\nMessage :\n${message}`,
  })

  if (error) {
    return NextResponse.json({ error: t.sendFailed }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
