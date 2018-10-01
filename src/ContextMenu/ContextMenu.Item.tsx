import * as React from "react"
import Icon, { IconProps } from "../Icon/Icon"
import { darken } from "../utils"
import { OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"

type StringOrItem = string | IContextMenuItem

export interface Props {
  condensed?: boolean
  width?: string | number
  onClick?: () => void
  align?: "left" | "right"
  item: StringOrItem
}

export interface IContextMenuItem {
  label: string
  description?: string
  icon?: IconProps["name"]
  iconColor?: keyof OperationalStyleConstants["color"]
  onClick?: (item: StringOrItem) => void
}

const Container = styled("div")<Props>(({ align, theme, onClick, condensed, width, item }) => ({
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  label: "contextmenuitem",
  width: width || (condensed ? 160 : "100%"),
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
  line-height: ${({ theme }) => theme.font.lineHeight};
  padding: ${({ theme }) => theme.space.content}px 0;
  width: calc(100% - ${({ theme }) => theme.space.content}px);
`

const ContextMenuIcon = styled(Icon)`
  flex: 0 0 auto;
`

const Content: React.SFC<{ value: StringOrItem }> = ({ value }) => {
  // Fragments are required to hint to the compiler that these are valid types.
  if (typeof value === "string") {
    return <>{value}</>
  }

  if (typeof value.description === "undefined") {
    return <>{value.label}</>
  }

  return (
    <ContentContainer>
      <Title>{value.label}</Title>
      <Description>{value.description}</Description>
    </ContentContainer>
  )
}

const ContextMenuItem: React.SFC<Props> = props => (
  <Container {...props} condensed={props.condensed}>
    {typeof props.item !== "string" &&
      props.item.icon && <ContextMenuIcon color={props.item.iconColor} left name={props.item.icon} />}
    <Content value={props.item} />
  </Container>
)

export default ContextMenuItem
