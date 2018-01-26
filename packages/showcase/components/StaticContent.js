import * as React from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import marked from "marked"
import glamorous from "glamorous"
import { Box, BarChart2, Grid } from "react-feather"
import { lighten } from "@operational/utils"
import highlight from "highlight.js"

const Container = glamorous.div(({ theme }) => ({
  label: "showcasestaticcontent",
  "& h2": {
    ...theme.typography.heading1
  },
  "& h3": {
    ...theme.typography.heading2,
    color: "#888"
  },
  "& p, & li": {
    ...theme.typography.body,
    lineHeight: 1.8
  },
  "& ul": {
    paddingLeft: theme.spacing * 1.25
  },
  "& code": {
    backgroundColor: "#eee",
    padding: "2px 4px",
    borderRadius: 2
  },
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

export default class StaticContent extends React.Component {
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
    for (let i = 0; i < n; i++) {
      this.codes.push(this.codeNodes[i].innerText)
      highlight.highlightBlock(this.codeNodes[i])
    }
  }
}
