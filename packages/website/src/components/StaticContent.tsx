import * as React from "react"
import marked from "marked"
import glamorous from "glamorous"
import { Box, BarChart2, Grid } from "react-feather"
import { Theme } from "@operational/theme"
import highlight from "highlight.js"

interface Props {
  css?: {}
  className?: string
  markdownContent?: string
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "showcasestaticcontent",
  "& pre": {
    backgroundColor: "#eee",
    color: theme.colors.black,
    borderRadius: 2,
    padding: theme.spacing,
    maxWidth: 680
  },
  "& pre code": {
    backgroundColor: "transparent"
  }
}))

export default class StaticContent extends React.Component<Props, {}> {
  containerNode: any
  codeNodes: any
  codes: any[]

  render() {
    return this.props.markdownContent ? (
      <Container
        css={this.props.css}
        className={this.props.className}
        dangerouslySetInnerHTML={{ __html: marked(this.props.markdownContent) }}
        innerRef={node => {
          this.containerNode = node
        }}
      />
    ) : (
      <Container
        css={this.props.css}
        className={this.props.className}
        innerRef={node => {
          this.containerNode = node
        }}
      >
        {this.props.children}
      </Container>
    )
  }

  componentDidMount() {
    this.codeNodes = this.containerNode.querySelectorAll("pre code")
    this.codes = []
    const n = this.codeNodes.length
    for (let i = 0; i < n; i = i + 1) {
      const code = this.codeNodes[i].innerText
      this.codes.push(code)
      if (code[0] === " ") {
        this.codeNodes[i].innerText = code.slice(1)
      }
      highlight.highlightBlock(this.codeNodes[i])
    }
  }
}
