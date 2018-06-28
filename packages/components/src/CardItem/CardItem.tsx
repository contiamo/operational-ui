import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"

export interface Props {
  /** Title of the item */
  title: string
  /** Value of the item */
  value: React.ReactNode
}

const CardItemTitle = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  color: theme.color.text.lightest,
  fontFamily: theme.font.family.main,
  fontWeight: 500,
  fontSize: theme.font.size.fineprint,
  textTransform: "uppercase",
}))

const CardItemBody = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  color: theme.color.text.default,
  fontFamily: theme.font.family.main,
  fontSize: theme.font.size.body,
  marginTop: theme.space.base,
  marginBottom: theme.space.content,
}))

const CardItem: React.SFC<Props> = ({ title, value, children }) => (
  <div>
    <CardItemTitle>{title}</CardItemTitle>
    <CardItemBody>{children || value}</CardItemBody>
  </div>
)

export default CardItem
