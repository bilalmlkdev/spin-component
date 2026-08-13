import chalk from 'chalk'

export const logger = {
  created(path) {
    console.log(`  ${chalk.green('created')}  ${path}`)
  },
  updated(path) {
    console.log(`  ${chalk.yellow('updated')}  ${path}`)
  },
  skipped(path, reason) {
    console.log(`  ${chalk.dim('skipped')}  ${path}${reason ? chalk.dim(` (${reason})`) : ''}`)
  },
  info(message) {
    console.log(chalk.cyan(message))
  },
  error(message) {
    console.error(chalk.red(message))
  },
}
