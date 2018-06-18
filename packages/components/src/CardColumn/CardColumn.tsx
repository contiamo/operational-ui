import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"

export interface Props {
  /** Column title */
  title?: string
}

const Container = styled("div")({
  label: "card-column",
  minWidth: 280 / 2,
  padding: 11,
  flex: "1 0",
  " img": {
    maxWidth: "100%",
  },
})

const Title = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  fontFamily: theme.font.family.main,
  color: theme.color.text.default,
  fontSize: 14,
  borderBottom: "1px solid #e8e8e8",
  marginBottom: theme.space.content,
}))

const CardColumn: React.SFC<Props> = ({ title, children, ...props }) => (
  <Container {...props}>
    {title && <Title>{title}</Title>}
    {children}
  </Container>
)

export default CardColumn
