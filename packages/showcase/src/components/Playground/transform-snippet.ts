const trimAfter: string = "export default ("

const removeLeadingNewLine = (s: string): string => (s[0] === "\n" ? s.slice(1) : s)

// Processes a tsx file-string to include only the exported snippet into Component Playground.
const toReactPlayground = (snippet: string): string => {
  if (snippet.indexOf(trimAfter) > -1) {
    const frontTrimmedSnippet = removeLeadingNewLine(snippet.slice(snippet.indexOf(trimAfter) + trimAfter.length))

    if (frontTrimmedSnippet.indexOf(")()")) {
      // If it's an IIFE-style snippet
      return "(" + frontTrimmedSnippet
    }
    // Otherwise, drop trailing paranthesis
    return frontTrimmedSnippet.slice(0, -2)
  }
  return snippet
}

export default toReactPlayground
