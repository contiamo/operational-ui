import * as marked from "marked"
import * as React from "react"

import Code from "../Code/Code"
import Table from "../Table/Table"
import Body from "../Typography/Body"
import Title from "../Typography/Title"

export interface MarkdownProps {
  value: string
}

// @ts-ignore
const Markdown: React.SFC<MarkdownProps> = ({ value: inputValue }) => {
  const raw = new marked.Lexer({
    breaks: false,
    gfm: true,
    headerIds: true,
    headerPrefix: "",
    langPrefix: "language-",
    mangle: true,
    pedantic: false,
    sanitize: false,
    silent: false,
    smartLists: false,
    smartypants: false,
    tables: true,
    xhtml: false,
  }).lex(inputValue)

  return raw.map(node => {
    switch (node.type) {
      case "code":
        return <Code syntax={node.lang as any}>{node.text}</Code>
      case "heading":
        return <Title>{node.text}</Title>
      case "paragraph":
        return <Body>{node.text}</Body>
      case "list_start":
        return React.createElement("li")
      case "list_end":
        return ">"
      case "list_item_start":
        return ">"
      case "list_item_end":
        return "<"
      case "space":
        return " "
      case "hr":
        return ">"
      case "blockquote_start":
        return "<"
      case "blockquote_end":
        return ""
      case "loose_item_start":
        return ""
      case "html":
        return ""
      case "text":
        return ""
      case "table":
        return (
          <Table<any>
            columns={node.header}
            data={node.cells.map(row => row.reduce((acc, cell, index) => ({ ...acc, [node.header[index]]: cell }), {}))}
          />
        )
    }
  })
}

export default Markdown
