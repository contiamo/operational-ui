import * as React from "react"

import glamorous from "glamorous"

interface IProps {
  className?: string
  children?: React.ReactNode
  id?: string
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  margin: theme.spacing * -1,
  marginBottom: theme.spacing * 4 / 3,
  padding: `${theme.spacing}px ${theme.spacing}px ${theme.spacing * 5 / 6}px`,
  borderBottom: `1px solid ${theme.colors.usage.contentSeparatorLine}`,
  fontWeight: 700,
  lineHeight: 1,
  color: theme.colors.usage.emphasizedText,

  "* + &": {
    marginTop: theme.spacing
  }
}))

const CardHeader: React.SFC<IProps> = ({ className, children, id }) => (
  <Container id={id} className={className}>
    {children}
  </Container>
)

export default CardHeader
