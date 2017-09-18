const trimAfter: string = "export default ("

function removeLeadingNewLine(s: string): string {
  return s[0] === "\n" ? s.slice(1) : s
}

function removeTrailingClosingParanthesis(s: string): string {
  return s
}

// Processes a tsx file-string to include only the exported snippet into Component Playground.
export default function toReactPlayground(snippet: string): string {
  if (snippet.indexOf(trimAfter) > -1) {
    let frontTrimmedSnippet = removeLeadingNewLine(snippet.slice(snippet.indexOf(trimAfter) + trimAfter.length))

    if (frontTrimmedSnippet.indexOf(")()")) {
      // If it's an IIFE-style snippet
      return "(" + frontTrimmedSnippet
    } else {
      // Otherwise, drop trailing paranthesis
      return frontTrimmedSnippet.slice(0, -2)
    }
  }
  return snippet
}
