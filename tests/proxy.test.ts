import { describe, expect, it } from 'vitest'
import { NextRequest } from 'next/server'
import { config, proxy } from '@/proxy'
import { LOCALE_COOKIE } from '@/lib/i18n'

const ORIGIN = 'https://portfolio.test'

function request(path: string, cookie?: string) {
  const req = new NextRequest(new URL(path, ORIGIN))
  if (cookie) req.cookies.set(LOCALE_COOKIE, cookie)
  return req
}

/** Path the proxy rewrites to internally, the displayed URL staying unchanged. */
function rewrittenTo(response: Response) {
  const target = response.headers.get('x-middleware-rewrite')
  return target ? new URL(target).pathname : null
}

function redirectedTo(response: Response) {
  const target = response.headers.get('location')
  return target ? new URL(target, ORIGIN).pathname : null
}

describe('rule 1 — /en... is an explicit choice', () => {
  it.each([
    ['/en', '/'],
    ['/en/about', '/about'],
    ['/en/projects/abricot', '/projects/abricot'],
  ])('redirects %s to %s', (from, to) => {
    const response = proxy(request(from))

    expect(response.status).toBe(307)
    expect(redirectedTo(response)).toBe(to)
  })

  it('resets the cookie to english so the choice survives the redirect', () => {
    const response = proxy(request('/en/about'))
    const cookie = response.cookies.get(LOCALE_COOKIE)

    expect(cookie?.value).toBe('en')
    expect(cookie?.maxAge).toBe(60 * 60 * 24 * 365)
  })

  it('wins over a stored french preference', () => {
    const response = proxy(request('/en/about', 'fr'))

    expect(redirectedTo(response)).toBe('/about')
    expect(response.cookies.get(LOCALE_COOKIE)?.value).toBe('en')
  })

  it('preserves the query string', () => {
    const response = proxy(request('/en/projects?tag=api'))

    expect(response.headers.get('location')).toContain('?tag=api')
  })
})

describe('rule 2 — /fr... passes through', () => {
  it.each(['/fr', '/fr/about', '/fr/projects/abricot'])('lets %s through untouched', (path) => {
    const response = proxy(request(path))

    expect(response.status).toBe(200)
    expect(response.headers.get('x-middleware-next')).toBe('1')
    expect(redirectedTo(response)).toBeNull()
    expect(rewrittenTo(response)).toBeNull()
  })

  it('exposes the french locale to server components through x-locale', () => {
    const response = proxy(request('/fr/about'))

    expect(response.headers.get('x-middleware-request-x-locale')).toBe('fr')
  })
})

describe('rule 3 — stored french preference on an unprefixed path', () => {
  it.each([
    ['/', '/fr'],
    ['/about', '/fr/about'],
    ['/projects/abricot', '/fr/projects/abricot'],
  ])('redirects %s to %s', (from, to) => {
    const response = proxy(request(from, 'fr'))

    expect(response.status).toBe(307)
    expect(redirectedTo(response)).toBe(to)
  })

  it('ignores an unsupported cookie value and serves english', () => {
    const response = proxy(request('/about', 'de'))

    expect(rewrittenTo(response)).toBe('/en/about')
  })
})

describe('rule 4 — english by default', () => {
  it.each([
    ['/', '/en'],
    ['/about', '/en/about'],
    ['/projects/abricot', '/en/projects/abricot'],
  ])('rewrites %s to %s without changing the visible URL', (from, to) => {
    const response = proxy(request(from))

    expect(rewrittenTo(response)).toBe(to)
    expect(redirectedTo(response)).toBeNull()
  })

  it('serves english to a visitor without a cookie whatever the browser language', () => {
    const req = new NextRequest(new URL('/about', ORIGIN), {
      headers: { 'accept-language': 'fr-FR,fr;q=0.9' },
    })

    expect(rewrittenTo(proxy(req))).toBe('/en/about')
    expect(proxy(req).headers.get('x-middleware-request-x-locale')).toBe('en')
  })

  it('never produces a double prefix, because a rewrite does not re-enter the proxy', () => {
    const response = proxy(request('/about'))

    expect(rewrittenTo(response)).not.toContain('/en/en')
  })
})

describe('matcher', () => {
  const matcher = new RegExp(`^${config.matcher[0]}$`)

  it.each(['/', '/about', '/fr/about', '/en', '/projects/abricot'])('handles %s', (path) => {
    expect(matcher.test(path)).toBe(true)
  })

  it.each(['/api/contact', '/_next/static/chunk.js', '/sitemap.xml', '/logo.svg', '/favicon.ico'])(
    'skips %s',
    (path) => {
      expect(matcher.test(path)).toBe(false)
    }
  )
})
