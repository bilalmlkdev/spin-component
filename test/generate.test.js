import path from 'node:path'
import os from 'node:os'
import fs from 'fs-extra'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { generateComponent } from '../src/generate.js'
import { DEFAULTS } from '../src/config.js'

let tmpDir

beforeEach(async () => {
  tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'spin-component-'))
})

afterEach(async () => {
  await fs.remove(tmpDir)
})

describe('generateComponent', () => {
  it('creates component, test, story, css module, and barrel files', async () => {
    const results = await generateComponent({ ...DEFAULTS, name: 'Button' }, tmpDir)

    const created = results.filter((r) => r.status === 'created').map((r) => path.basename(r.path))
    expect(created).toEqual(
      expect.arrayContaining(['Button.tsx', 'Button.module.css', 'Button.test.tsx', 'Button.stories.tsx', 'index.ts'])
    )

    const componentSource = await fs.readFile(path.join(tmpDir, 'src/components/Button/Button.tsx'), 'utf8')
    expect(componentSource).toContain('export function Button')
  })

  it('rejects non-PascalCase names', async () => {
    await expect(generateComponent({ ...DEFAULTS, name: 'button' }, tmpDir)).rejects.toThrow(/PascalCase/)
  })

  it('never overwrites an existing file on a second run', async () => {
    await generateComponent({ ...DEFAULTS, name: 'Card' }, tmpDir)
    const componentPath = path.join(tmpDir, 'src/components/Card/Card.tsx')
    await fs.writeFile(componentPath, '// hand-edited\n')

    const results = await generateComponent({ ...DEFAULTS, name: 'Card' }, tmpDir)
    const componentResult = results.find((r) => r.path === componentPath)

    expect(componentResult.status).toBe('skipped')
    const contentAfter = await fs.readFile(componentPath, 'utf8')
    expect(contentAfter).toBe('// hand-edited\n')
  })

  it('skips the CSS module file when style is not css-modules', async () => {
    const results = await generateComponent({ ...DEFAULTS, name: 'Tag', style: 'tailwind' }, tmpDir)
    const cssFile = results.find((r) => r.path.endsWith('Tag.module.css'))
    expect(cssFile).toBeUndefined()
  })

  it('appends to an existing parent barrel file without duplicating', async () => {
    const barrelPath = path.join(tmpDir, 'src/components/index.ts')
    await fs.ensureDir(path.dirname(barrelPath))
    await fs.writeFile(barrelPath, "export * from './Existing'\n")

    await generateComponent({ ...DEFAULTS, name: 'Modal' }, tmpDir)

    const content = await fs.readFile(barrelPath, 'utf8')
    expect(content).toContain("export * from './Existing'")
    expect(content).toContain("export * from './Modal'")
  })
})
