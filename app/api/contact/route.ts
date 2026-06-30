import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const raw = body as Record<string, unknown>
  const name = typeof raw.name === 'string' ? raw.name.trim() : ''
  const email = typeof raw.email === 'string' ? raw.email.trim() : ''
  const message = typeof raw.message === 'string' ? raw.message.trim() : ''

  if (!name || name.length > 100) {
    return NextResponse.json({ error: 'Nom invalide.' }, { status: 400 })
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })
  }
  if (!message || message.length < 10 || message.length > 2000) {
    return NextResponse.json({ error: 'Message invalide.' }, { status: 400 })
  }

  const to = process.env.CONTACT_EMAIL
  if (!to) {
    return NextResponse.json({ error: 'Configuration manquante.' }, { status: 500 })
  }

  const { error } = await resend.emails.send({
    from: 'Portfolio Contact <onboarding@resend.dev>',
    to,
    subject: `[Contact Portfolio] — ${name}`,
    text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
  })

  if (error) {
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
