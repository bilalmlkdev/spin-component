/**
 * @param {{ name: string, lang: import('../config.js').LangOption }} opts
 */
export function storyTemplate({ name, lang }) {
  const typeImport = lang === 'ts' ? `\nimport type { Meta, StoryObj } from '@storybook/react'` : ''
  const metaType = lang === 'ts' ? `: Meta<typeof ${name}>` : ''
  const storyType = lang === 'ts' ? `: StoryObj<typeof ${name}>` : ''

  return `import { ${name} } from './${name}'${typeImport}

const meta${metaType} = {
  title: 'Components/${name}',
  component: ${name},
}

export default meta

export const Default${storyType} = {
  args: {
    children: '${name}',
  },
}
`
}
