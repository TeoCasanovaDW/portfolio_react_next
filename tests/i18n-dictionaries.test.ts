import { describe, expect, it } from 'vitest'
import { getDictionary, locales } from '@/lib/i18n'
import { en } from '@/data/i18n/en'
import { fr } from '@/data/i18n/fr'

type Node = unknown

/** Paths of every leaf of a dictionary, arrays included, sorted. */
function leafPaths(node: Node, prefix = ''): string[] {
  if (Array.isArray(node)) {
    return node.flatMap((item, index) => leafPaths(item, `${prefix}[${index}]`))
  }
  if (typeof node === 'object' && node !== null) {
    return Object.entries(node).flatMap(([key, value]) =>
      leafPaths(value, prefix ? `${prefix}.${key}` : key)
    )
  }
  return [prefix]
}

function leafEntries(node: Node, prefix = ''): [string, unknown][] {
  return leafPaths(node, prefix).map((path) => [path, valueAt(node, path)])
}

function valueAt(node: Node, path: string): unknown {
  return path
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean)
    .reduce<Node>((current, key) => (current as Record<string, unknown>)?.[key], node)
}

describe('dictionary parity', () => {
  it('exposes exactly the same leaf keys in both languages', () => {
    expect(leafPaths(fr).sort()).toEqual(leafPaths(en).sort())
  })

  it.each(locales)('has no empty string in %s', (locale) => {
    const empty = leafEntries(getDictionary(locale))
      .filter(([, value]) => typeof value !== 'string' || value.trim() === '')
      .map(([path]) => path)

    expect(empty).toEqual([])
  })

  it('translates every user-facing string instead of copying english into french', () => {
    /** Structural or factual fields, identical by nature in both languages. */
    const structuralSuffixes = ['.id', '.period', '.company']

    /** Deliberately identical labels: proper nouns, brands or anglicisms already in use. */
    const sharedByDesign = new Set([
      'metadata.contact.title',
      'nav.contact',
      'about.skills.categories.frontend',
      'about.skills.categories.backend',
      'contact.title',
      'contact.form.email',
      'contact.form.message',
      'contact.form.emailPlaceholder',
      'project.stack',
      'projects.workInProgress',
      'metadata.project.title',
      'blog.title',
    ])

    const identical = leafPaths(en)
      .filter((path) => valueAt(en, path) === valueAt(fr, path))
      .filter((path) => !structuralSuffixes.some((suffix) => path.endsWith(suffix)))
      .filter((path) => !sharedByDesign.has(path))

    expect(identical).toEqual([])
  })

  it('keeps the {name} placeholder of the project title in both languages', () => {
    for (const locale of locales) {
      expect(getDictionary(locale).metadata.project.title).toContain('{name}')
    }
  })
})
