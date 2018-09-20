import * as React from "react"
import Icon from "../Icon/Icon"
import { darken } from "../utils"
import styled from "../utils/styled"
import { ContextMenuItem } from "./ContextMenu"

export interface Props {
  condensed?: boolean
  width?: string | number
  onClick?: () => void
  align?: "left" | "right"
  item: string | ContextMenuItem
}

const Container = styled("div")<Props>(({ align, theme, onClick, condensed, width, item }) => ({
  userSelect: "none",
  label: "contextmenuitem",
  width: width || (condensed ? 160 : 250),
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  backgroundColor: theme.color.white,
  lineHeight: `${condensed ? 35 : 44}px`,
  padding: `0 ${theme.space.content}px`,
  textAlign: align,
  display: "flex",
  alignItems: "center",
  ...(Boolean(typeof item !== "string" && item.description)
    ? {
        borderBottom: `1px solid ${theme.color.separators.default}`,
      }
    : {}),
  ...(!!onClick
    ? {
        cursor: "pointer",
        color: theme.color.text.default,
        "&:hover": {
          backgroundColor: darken(theme.color.white, 2),
        },
      }
    : {
        cursor: "not-allowed",
        color: theme.color.text.lightest,
      }),
  "&:not(:first-child)": {
    borderTop: `1px solid ${theme.color.separators.default}`,
  },
  "&:last-child": {
    paddingBottom: 2,
  },
}))

const Title = styled("span")`
  font-weight: bold;
  color: ${({ theme }) => theme.color.text.dark};
`

const Description = styled("p")`
  margin: 0;
  color: ${({ theme }) => theme.color.text.lighter};
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
`

const ContentContainer = styled("div")`
  line-height: 1.4;
  padding: ${({ theme }) => theme.space.content}px 0;
  width: calc(100% - ${({ theme }) => theme.space.content}px);
`

const ContextMenuIcon = styled(Icon)`
  flex: 0 0 auto;
`

const Content: React.SFC<any> = ({ children }) => {
  if (typeof children === "string") {
    return children
  }

  if (!children.description) {
    return children.label
  }

  return (
    <ContentContainer>
      <Title>{children.label}</Title>
      <Description>{children.description}</Description>
    </ContentContainer>
  )
}

const ContextMenuItem: React.SFC<Props> = props => (
  <Container {...props} condensed={props.condensed}>
    {typeof props.item !== "string" &&
      props.item.icon && <ContextMenuIcon color={props.item.iconColor} left name={props.item.icon} />}
    <Content>{props.item}</Content>
  </Container>
)

export default ContextMenuItem
