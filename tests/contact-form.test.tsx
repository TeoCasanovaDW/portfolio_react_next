import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

/** Frappe sans délai simulé : ces tests vérifient des libellés, pas un rythme de saisie. */
const user = userEvent.setup({ delay: null })
import ContactForm from '@/components/contact/ContactForm'
import { getDictionary, locales } from '@/lib/i18n'
import type { Locale } from '@/types/i18n'

vi.mock('next/link', () => ({
  default: ({ children, href, ...rest }: React.ComponentProps<'a'>) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

function copyFor(locale: Locale) {
  return getDictionary(locale).contact.form
}

function renderForm(locale: Locale) {
  return render(<ContactForm locale={locale} copy={copyFor(locale)} />)
}

async function fillValidForm(locale: Locale) {
  const copy = copyFor(locale)
  await user.type(screen.getByLabelText(copy.name), 'Alex Martin')
  await user.type(screen.getByLabelText(copy.email), 'alex@example.com')
  await user.type(screen.getByLabelText(copy.message), 'Bonjour, je souhaite échanger.')
}

function submit(locale: Locale) {
  return user.click(screen.getByRole('button', { name: copyFor(locale).submit }))
}

beforeEach(() => {
  vi.spyOn(globalThis, 'fetch')
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe.each(locales)('ContactForm in %s', (locale) => {
  const copy = copyFor(locale)

  it('labels every field in the current language', () => {
    renderForm(locale)

    expect(screen.getByLabelText(copy.name)).toHaveAttribute('placeholder', copy.namePlaceholder)
    expect(screen.getByLabelText(copy.email)).toHaveAttribute('placeholder', copy.emailPlaceholder)
    expect(screen.getByLabelText(copy.message)).toHaveAttribute(
      'placeholder',
      copy.messagePlaceholder
    )
    expect(screen.getByRole('button', { name: copy.submit })).toBeInTheDocument()
  })

  it('reports empty fields in the current language without calling the API', async () => {
    renderForm(locale)

    await submit(locale)

    expect(screen.getByText(copy.errors.name)).toBeInTheDocument()
    expect(screen.getByText(copy.errors.email)).toBeInTheDocument()
    expect(screen.getByText(copy.errors.message)).toBeInTheDocument()
    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  it('reports an invalid email in the current language', async () => {
    renderForm(locale)

    await user.type(screen.getByLabelText(copy.name), 'Alex Martin')
    await user.type(screen.getByLabelText(copy.email), 'alex@invalide')
    await user.type(screen.getByLabelText(copy.message), 'Un message assez long.')
    await submit(locale)

    expect(screen.getByText(copy.errors.email)).toBeInTheDocument()
    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  it('reports a message shorter than ten characters in the current language', async () => {
    renderForm(locale)

    await user.type(screen.getByLabelText(copy.name), 'Alex Martin')
    await user.type(screen.getByLabelText(copy.email), 'alex@example.com')
    await user.type(screen.getByLabelText(copy.message), 'court')
    await submit(locale)

    expect(screen.getByText(copy.errors.message)).toBeInTheDocument()
    expect(globalThis.fetch).not.toHaveBeenCalled()
  })

  it('sends the locale to the API and shows the success message', async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue(Response.json({ success: true }))
    renderForm(locale)

    await fillValidForm(locale)
    await submit(locale)

    const [url, init] = vi.mocked(globalThis.fetch).mock.calls[0]
    expect(url).toBe('/api/contact')
    expect((init?.headers as Record<string, string>)['x-locale']).toBe(locale)

    expect(await screen.findByText(copy.successTitle)).toBeInTheDocument()
    expect(screen.getByText(copy.successMessage)).toBeInTheDocument()
  })

  it('shows the server error and keeps the filled form', async () => {
    const serverError = getDictionary(locale).contact.api.sendFailed
    vi.mocked(globalThis.fetch).mockResolvedValue(
      Response.json({ error: serverError }, { status: 500 })
    )
    renderForm(locale)

    await fillValidForm(locale)
    await submit(locale)

    expect(await screen.findByText(serverError)).toBeInTheDocument()
    expect(screen.getByLabelText(copy.name)).toHaveValue('Alex Martin')
  })

  it('falls back to its own retry message when the request itself fails', async () => {
    vi.mocked(globalThis.fetch).mockRejectedValue(new Error('offline'))
    renderForm(locale)

    await fillValidForm(locale)
    await submit(locale)

    expect(await screen.findByText(copy.errors.retry)).toBeInTheDocument()
  })
})
