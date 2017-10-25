import * as React from "react"
import glamorous from "glamorous"

interface IProps {
  css?: any
  className?: string
  children?: React.ReactNode
  id?: string
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: theme.spacing * 3,
  margin: theme.spacing * -1,
  marginBottom: theme.spacing * 4 / 3,
  padding: `0 ${theme.spacing}px`,
  borderBottom: `1px solid ${theme.colors.usage.contentSeparatorLine}`,
  fontWeight: 700,
  lineHeight: 1,
  color: theme.colors.usage.emphasizedText,
  "* + &": {
    marginTop: theme.spacing
  }
}))

const CardHeader: React.SFC<IProps> = ({ css, className, children, id }) => (
  <Container id={id} css={css} className={className}>
    {children}
  </Container>
)

export default CardHeader
