import type { Plugin } from 'unified'
import type { VFile } from 'vfile'

declare module 'vfile' {
  interface VFile {
    originalLineOffsets?: number[]
  }
}

export const remarkPositionTracking: Plugin = function () {
  return function (_, file: VFile) {
    const content = String(file)
    const lines = content.split('\n')
    let currentOffset = 0

    // Store the starting offset of each line
    file.originalLineOffsets = lines.map((line) => {
      const offset = currentOffset
      currentOffset += line.length + 1 // +1 for newline
      console.log(`Line offset for "${line.trim()}": ${offset}`)
      return offset
    })

    console.log('All line offsets:', file.originalLineOffsets)
  }
}
