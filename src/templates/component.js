/**
 * Returns the component source file content.
 * @param {{ name: string, style: import('../config.js').StyleOption, lang: import('../config.js').LangOption }} opts
 */
export function componentTemplate({ name, style, lang }) {
  const isTs = lang === 'ts'
  const propsType = isTs ? `\n\nexport interface ${name}Props {\n  children?: React.ReactNode\n}` : ''
  const propsAnnotation = isTs ? `: ${name}Props` : ''

  if (style === 'css-modules') {
    return `import styles from './${name}.module.css'${propsType}

export function ${name}({ children }${propsAnnotation}) {
  return <div className={styles.root}>{children}</div>
}
`
  }

  if (style === 'tailwind') {
    return `${propsType}

export function ${name}({ children }${propsAnnotation}) {
  return <div className="flex items-center">{children}</div>
}
`
  }

  if (style === 'styled-components') {
    return `import styled from 'styled-components'${propsType}

const Root = styled.div\`
  display: flex;
  align-items: center;
\`

export function ${name}({ children }${propsAnnotation}) {
  return <Root>{children}</Root>
}
`
  }

  // plain — no styling opinion at all
  return `${propsType}

export function ${name}({ children }${propsAnnotation}) {
  return <div>{children}</div>
}
`
}

/** @param {{ name: string, style: import('../config.js').StyleOption }} opts */
export function cssModuleTemplate({ name }) {
  return `.root {
  display: flex;
  align-items: center;
}
`
}
