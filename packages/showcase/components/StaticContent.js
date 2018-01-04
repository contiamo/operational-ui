import marked from "marked"
import glamorous from "glamorous"
import { Box, BarChart2, Grid } from "react-feather"

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
  }
}))

const StaticContent = ({ css, className, markdownContent, children }) =>
  markdownContent ? (
    <Container css={css} className={className} dangerouslySetInnerHTML={{ __html: marked(markdownContent) }} />
  ) : (
    <Container css={css} className={className}>
      {children}
    </Container>
  )

export default StaticContent
