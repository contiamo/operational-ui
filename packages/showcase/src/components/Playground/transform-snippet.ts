const trimAfter1: string = "export default ("
const trimAfter2: string = "export default"

function removeLeadingNewLine(s: string): string {
  return s[0] === "\n" ? s.slice(1) : s
}

function removeTrailingClosingParanthesis(s: string): string {
  return s
}

// Processes a tsx file-string to include only the exported snippet into Component Playground.
export default function toReactPlayground(snippet: string): string {
  if (snippet.indexOf(trimAfter1) > -1) {
    return removeLeadingNewLine(snippet.slice(snippet.indexOf(trimAfter1) + trimAfter1.length)).slice(0, -2)
  }
  if (snippet.indexOf(trimAfter2) > -1) {
    return removeLeadingNewLine(snippet.slice(snippet.indexOf(trimAfter2) + trimAfter2.length))
  }
  return snippet
}
