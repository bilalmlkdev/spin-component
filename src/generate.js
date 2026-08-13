import path from 'node:path'
import fs from 'fs-extra'
import { componentTemplate, cssModuleTemplate } from './templates/component.js'
import { testTemplate } from './templates/test.js'
import { storyTemplate } from './templates/story.js'
import { mergeIndexContent } from './templates/index.js'
import { logger } from './utils/logger.js'

const EXT = { ts: 'tsx', js: 'jsx' }
const BARREL_EXT = { ts: 'ts', js: 'js' }

const NAME_PATTERN = /^[A-Z][A-Za-z0-9]*$/

/** @param {string} name */
export function assertValidName(name) {
  if (!NAME_PATTERN.test(name)) {
    throw new Error(`Component name "${name}" should be PascalCase, e.g. "SubmitButton".`)
  }
}

/**
 * @param {import('./config.js').SpinConfig & { name: string }} opts
 * @param {string} cwd
 */
export async function generateComponent(opts, cwd = process.cwd()) {
  const { name, dir, style, lang, test, story, index } = opts

  assertValidName(name)

  const ext = EXT[lang]
  const componentDir = path.join(cwd, dir, name)
  const written = []

  await fs.ensureDir(componentDir)

  written.push(
    await writeIfAbsent(
      path.join(componentDir, `${name}.${ext}`),
      componentTemplate({ name, style, lang })
    )
  )

  if (style === 'css-modules') {
    written.push(
      await writeIfAbsent(
        path.join(componentDir, `${name}.module.css`),
        cssModuleTemplate({ name })
      )
    )
  }

  if (test) {
    written.push(
      await writeIfAbsent(
        path.join(componentDir, `${name}.test.${ext}`),
        testTemplate({ name, lang })
      )
    )
  }

  if (story) {
    written.push(
      await writeIfAbsent(
        path.join(componentDir, `${name}.stories.${ext}`),
        storyTemplate({ name, lang })
      )
    )
  }

  if (index) {
    const barrelExt = BARREL_EXT[lang]
    written.push(
      await writeIfAbsent(
        path.join(componentDir, `index.${barrelExt}`),
        `export * from './${name}'\n`
      )
    )

    // Best-effort: if the parent directory already has its own barrel file,
    // keep it in sync too. Never creates one that didn't already exist —
    // that's a structural choice the project owner should make, not this tool.
    const parentBarrel = path.join(cwd, dir, `index.${barrelExt}`)
    if (await fs.pathExists(parentBarrel)) {
      const existing = await fs.readFile(parentBarrel, 'utf8')
      const merged = mergeIndexContent(existing, { name })
      if (merged !== existing) {
        await fs.writeFile(parentBarrel, merged)
        written.push({ path: parentBarrel, status: 'updated' })
      }
    }
  }

  return written
}

/**
 * Writes a file only if it doesn't already exist, so re-running the
 * generator on an existing component never clobbers hand-edited code.
 */
async function writeIfAbsent(filePath, content) {
  const exists = await fs.pathExists(filePath)
  if (exists) {
    return { path: filePath, status: 'skipped', reason: 'already exists' }
  }
  await fs.writeFile(filePath, content)
  return { path: filePath, status: 'created' }
}

/** Prints a written-files summary using the shared logger. */
export function reportResults(results, cwd = process.cwd()) {
  for (const result of results) {
    const relative = path.relative(cwd, result.path)
    if (result.status === 'created') logger.created(relative)
    else if (result.status === 'updated') logger.updated(relative)
    else logger.skipped(relative, result.reason)
  }
}
