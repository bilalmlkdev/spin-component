import { cosmiconfig } from 'cosmiconfig'

/** @typedef {'css-modules' | 'tailwind' | 'styled-components' | 'plain'} StyleOption */
/** @typedef {'ts' | 'js'} LangOption */

/**
 * @typedef {Object} SpinConfig
 * @property {string} dir - where components are created, relative to cwd
 * @property {StyleOption} style
 * @property {LangOption} lang
 * @property {boolean} test - generate a test file
 * @property {boolean} story - generate a Storybook story
 * @property {boolean} index - generate/update a barrel export
 */

/** @type {SpinConfig} */
export const DEFAULTS = {
  dir: 'src/components',
  style: 'css-modules',
  lang: 'ts',
  test: true,
  story: true,
  index: true,
}

const explorer = cosmiconfig('spin', {
  searchPlaces: [
    '.spinrc',
    '.spinrc.json',
    '.spinrc.js',
    '.spinrc.cjs',
    'spin.config.js',
    'spin.config.cjs',
    'package.json',
  ],
})

/**
 * Loads user config (if present) and merges it over the defaults.
 * Never throws on a missing config file — that's the expected common case.
 * @returns {Promise<SpinConfig>}
 */
export async function loadConfig() {
  try {
    const result = await explorer.search()
    if (!result || !result.config) return { ...DEFAULTS }
    return { ...DEFAULTS, ...result.config }
  } catch {
    // A malformed config shouldn't crash the whole CLI — fall back to defaults
    // and let validation elsewhere catch anything that matters.
    return { ...DEFAULTS }
  }
}
