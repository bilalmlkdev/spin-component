/**
 * @param {{ name: string, lang: import('../config.js').LangOption }} opts
 */
export function testTemplate({ name }) {
  return `import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ${name} } from './${name}'

describe('${name}', () => {
  it('renders its children', () => {
    render(<${name}>Hello</${name}>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
`
}
