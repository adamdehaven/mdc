import type { Plugin } from 'unified'
import type { VFile } from 'vfile'

declare module 'vfile' {
  interface VFile {
    content?: string
  }
}

export const remarkSourceMapping: Plugin = function () {
  return function transformer(_: any, file: VFile) {
    // Store the original content for position mapping
    file.content = String(file)
    console.log('Content length:', file.content.length)
    console.log('Content preview:', file.content.slice(0, 100))
  }
}
