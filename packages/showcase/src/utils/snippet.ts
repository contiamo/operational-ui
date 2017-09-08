import { ReactNode } from "react"

const trimAfter: string = "export default"

function removeLeadingNewLine(s: string): string {
  return s[0] === "\n" ? s.slice(1) : s
}

export function toReactPlayground(snippet: ReactNode): string {
  // On the server, there is no webpack-raw-loader.
  if (typeof snippet !== "string") {
    return ""
  }
  return removeLeadingNewLine(
    snippet.slice(snippet.indexOf(trimAfter) + trimAfter.length)
  )
}
