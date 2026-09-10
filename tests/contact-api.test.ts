import { beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from '@/app/api/contact/route'
import { getDictionary, locales } from '@/lib/i18n'
import type { Locale } from '@/types/i18n'

const send = vi.hoisted(() => vi.fn())

vi.mock('resend', () => ({
  Resend: class {
    emails = { send }
  },
}))

const VALID = {
  name: 'Alex Martin',
  email: 'alex@example.com',
  message: 'Bonjour, je souhaite échanger à propos de votre profil.',
}

function post(body: unknown, locale?: Locale) {
  return new Request('https://portfolio.test/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(locale ? { 'x-locale': locale } : {}),
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  })
}

function api(locale: Locale) {
  return getDictionary(locale).contact.api
}

beforeEach(() => {
  send.mockReset().mockResolvedValue({ error: null })
  process.env.CONTACT_EMAIL = 'owner@example.com'
})

describe.each(locales)('POST /api/contact with x-locale %s', (locale) => {
  it('rejects an unreadable body in that language', async () => {
    const response = await POST(post('{ not json', locale))

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error: api(locale).invalidRequest })
  })

  it.each([
    ['name', { ...VALID, name: '' }, 'invalidName'],
    ['email', { ...VALID, email: 'alex@invalide' }, 'invalidEmail'],
    ['message', { ...VALID, message: 'court' }, 'invalidMessage'],
  ] as const)('rejects an invalid %s in that language', async (_field, body, key) => {
    const response = await POST(post(body, locale))

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toEqual({ error: api(locale)[key] })
    expect(send).not.toHaveBeenCalled()
  })

  it('reports a missing recipient configuration in that language', async () => {
    delete process.env.CONTACT_EMAIL

    const response = await POST(post(VALID, locale))

    expect(response.status).toBe(500)
    await expect(response.json()).resolves.toEqual({ error: api(locale).missingConfiguration })
  })

  it('reports a Resend failure in that language', async () => {
    send.mockResolvedValue({ error: { message: 'nope' } })

    const response = await POST(post(VALID, locale))

    expect(response.status).toBe(500)
    await expect(response.json()).resolves.toEqual({ error: api(locale).sendFailed })
  })

  it('accepts a valid message', async () => {
    const response = await POST(post(VALID, locale))

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({ success: true })
    expect(send).toHaveBeenCalledOnce()
  })
})

describe('internal email', () => {
  it('stays in french and reports the visitor language', async () => {
    await POST(post(VALID, 'en'))
    expect(send.mock.calls[0][0].text).toContain('Langue du visiteur : Anglais')

    send.mockClear()
    await POST(post(VALID, 'fr'))
    expect(send.mock.calls[0][0].text).toContain('Langue du visiteur : Français')
  })

  it('keeps the french field labels whatever the visitor language', async () => {
    await POST(post(VALID, 'en'))

    const { text, subject } = send.mock.calls[0][0]
    expect(text).toContain(`Nom : ${VALID.name}`)
    expect(text).toContain(`Email : ${VALID.email}`)
    expect(text).toContain('Message :')
    expect(subject).toBe(`[Contact Portfolio] — ${VALID.name}`)
  })
})

describe('missing x-locale header', () => {
  it('falls back to english', async () => {
    const response = await POST(post({ ...VALID, email: 'alex@invalide' }))

    await expect(response.json()).resolves.toEqual({ error: api('en').invalidEmail })
  })
})
