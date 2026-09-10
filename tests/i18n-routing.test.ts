import { describe, expect, it } from 'vitest'
import { defaultLocale, isLocale, locales, localizePath, resolveLocale, stripLocale } from '@/lib/i18n'

describe('locales', () => {
  it('supports exactly english and french, english by default', () => {
    expect([...locales]).toEqual(['en', 'fr'])
    expect(defaultLocale).toBe('en')
  })

  it('rejects anything that is not a supported locale', () => {
    expect(isLocale('en')).toBe(true)
    expect(isLocale('fr')).toBe(true)
    expect(isLocale('es')).toBe(false)
    expect(isLocale('EN')).toBe(false)
    expect(isLocale(undefined)).toBe(false)
  })

  it('falls back to english for an unknown value', () => {
    expect(resolveLocale('fr')).toBe('fr')
    expect(resolveLocale('de')).toBe('en')
    expect(resolveLocale(undefined)).toBe('en')
  })
})

describe('localizePath', () => {
  it('leaves english paths unprefixed', () => {
    expect(localizePath('/', 'en')).toBe('/')
    expect(localizePath('/about', 'en')).toBe('/about')
    expect(localizePath('/projects/abricot', 'en')).toBe('/projects/abricot')
  })

  it('prefixes french paths', () => {
    expect(localizePath('/', 'fr')).toBe('/fr')
    expect(localizePath('/about', 'fr')).toBe('/fr/about')
    expect(localizePath('/projects/abricot', 'fr')).toBe('/fr/projects/abricot')
  })

  it('normalizes a path given without a leading slash', () => {
    expect(localizePath('about', 'fr')).toBe('/fr/about')
    expect(localizePath('about', 'en')).toBe('/about')
  })
})

describe('stripLocale', () => {
  it('removes a locale prefix', () => {
    expect(stripLocale('/fr')).toBe('/')
    expect(stripLocale('/fr/about')).toBe('/about')
    expect(stripLocale('/fr/projects/abricot')).toBe('/projects/abricot')
  })

  it('removes the english prefix so prerendered pages never link to /en/...', () => {
    expect(stripLocale('/en')).toBe('/')
    expect(stripLocale('/en/about')).toBe('/about')
  })

  it('leaves an unprefixed path untouched', () => {
    expect(stripLocale('/')).toBe('/')
    expect(stripLocale('/about')).toBe('/about')
    expect(stripLocale('/projects/abricot')).toBe('/projects/abricot')
  })

  it('does not strip a segment that merely starts with a locale code', () => {
    expect(stripLocale('/entretien')).toBe('/entretien')
    expect(stripLocale('/france')).toBe('/france')
  })
})

describe('localizePath and stripLocale round-trip', () => {
  const paths = ['/', '/about', '/projects', '/contact', '/projects/abricot']

  it.each(locales)('restores the source path in %s', (locale) => {
    for (const path of paths) {
      expect(stripLocale(localizePath(path, locale))).toBe(path)
    }
  })
})
