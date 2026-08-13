/** @param {{ name: string }} opts */
export function indexExportLine({ name }) {
  return `export * from './${name}'`
}

/**
 * Adds an export line to existing barrel file content if it isn't already
 * present. Keeps existing content untouched otherwise — this is the only
 * generated file that's ever safe to merge into rather than overwrite.
 * @param {string} existingContent
 * @param {{ name: string }} opts
 */
export function mergeIndexContent(existingContent, opts) {
  const line = indexExportLine(opts)
  if (existingContent.includes(line)) return existingContent
  const trimmed = existingContent.replace(/\n+$/, '')
  return trimmed.length > 0 ? `${trimmed}\n${line}\n` : `${line}\n`
}
