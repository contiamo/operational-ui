import marked from "marked"
import glamorous from "glamorous"
import { Box, BarChart2, Grid } from "react-feather"
import highlight from "highlight.js"

const Container = glamorous.div(({ theme }) => ({
  "& h2": {
    ...theme.typography.heading1
  },
  "& h3": {
    ...theme.typography.heading2
  },
  "& p, & li": {
    ...theme.typography.body
  },
  "& ul": {
    paddingLeft: theme.spacing * 1.25
  },
  "& code": {
    backgroundColor: "rgba(0, 0, 0, 0.06)",
    padding: "2px 4px",
    borderRadius: 2
  },
  "& pre": {
    backgroundColor: "#454545",
    color: theme.colors.white,
    borderRadius: 4,
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
        {children}
      </Container>
    )
  }

  componentDidMount() {
    const nodes = this.containerNode.querySelectorAll("pre code")
    const n = nodes.length
    for (let i = 0; i < n; i++) {
      highlight.highlightBlock(nodes[i])
    }
  }
}
