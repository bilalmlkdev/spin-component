import { Command } from 'commander'
import prompts from 'prompts'
import chalk from 'chalk'
import { loadConfig } from './config.js'
import { assertValidName, generateComponent, reportResults } from './generate.js'
import { logger } from './utils/logger.js'

const STYLE_CHOICES = ['css-modules', 'tailwind', 'styled-components', 'plain']
const LANG_CHOICES = ['ts', 'js']

/** @param {string[]} argv */
export async function run(argv) {
  const program = new Command()

  program
    .name('spin-component')
    .description('Generate a React component with a matching test, story, and barrel export.')
    .argument('[name]', 'Component name, PascalCase (e.g. SubmitButton)')
    .option('-d, --dir <path>', 'output directory, relative to cwd')
    .option('-s, --style <style>', `styling approach (${STYLE_CHOICES.join(' | ')})`)
    .option('-l, --lang <lang>', `language (${LANG_CHOICES.join(' | ')})`)
    .option('--no-test', 'skip generating a test file')
    .option('--no-story', 'skip generating a story file')
    .option('--no-index', 'skip generating/updating a barrel export')
    .option('-y, --yes', 'skip prompts, fail instead if the name is missing')
    .action(async (name, flags) => {
      const config = await loadConfig()

      const merged = {
        dir: flags.dir ?? config.dir,
        style: flags.style ?? config.style,
        lang: flags.lang ?? config.lang,
        test: flags.test ?? config.test,
        story: flags.story ?? config.story,
        index: flags.index ?? config.index,
      }

      if (merged.style && !STYLE_CHOICES.includes(merged.style)) {
        throw new Error(`Unknown style "${merged.style}". Expected one of: ${STYLE_CHOICES.join(', ')}`)
      }
      if (merged.lang && !LANG_CHOICES.includes(merged.lang)) {
        throw new Error(`Unknown lang "${merged.lang}". Expected one of: ${LANG_CHOICES.join(', ')}`)
      }

      let resolvedName = name

      if (!resolvedName) {
        if (flags.yes) {
          throw new Error('A component name is required. Usage: spin-component <Name>')
        }
        const response = await prompts({
          type: 'text',
          name: 'name',
          message: 'Component name (PascalCase)',
          validate: (value) => (/^[A-Z][A-Za-z0-9]*$/.test(value) ? true : 'Use PascalCase, e.g. SubmitButton'),
        })
        resolvedName = response.name
        if (!resolvedName) {
          logger.info('Cancelled.')
          return
        }
      }

      assertValidName(resolvedName)

      logger.info(`\nGenerating ${chalk.bold(resolvedName)} in ${merged.dir}/${resolvedName}\n`)

      const results = await generateComponent({ ...merged, name: resolvedName })
      reportResults(results)

      const createdCount = results.filter((r) => r.status === 'created').length
      console.log()
      if (createdCount === 0) {
        logger.info('Nothing new to create — every file already existed.')
      } else {
        logger.info(`Done. ${createdCount} file${createdCount === 1 ? '' : 's'} created.`)
      }
    })

  await program.parseAsync(argv)
}
