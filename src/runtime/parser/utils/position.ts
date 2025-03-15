export function findLineNumber(content: string): number {
  const lines = content.split('\n')
  const lineIndex = lines.findIndex(line => line.trim().startsWith('another-prop'))
  return lineIndex === -1 ? 0 : lineIndex + 1
}
