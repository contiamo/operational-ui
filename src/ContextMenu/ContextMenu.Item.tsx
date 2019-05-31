import * as React from "react"
import { lighten, inputFocus } from "../utils"
import { OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"
import { ContextMenuProps } from "./ContextMenu"
import { IconComponentType } from "../Icon/Icon"

type StringOrItem = string | IContextMenuItem

export interface Props {
  condensed?: boolean
  width?: string | number
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  align?: "left" | "right"
  iconLocation?: "left" | "right"
  item: StringOrItem
  tabIndex: number
}

export interface IContextMenuItem<TValue = any> {
  label: string | React.ReactElement<any>
  description?: string
  icon?: IconComponentType
  iconColor?: keyof OperationalStyleConstants["color"]
  onClick?: ContextMenuProps["onClick"]
  value?: TValue
}

const Container = styled("div")<Props>(({ align, theme, onClick, condensed, width, item }) => ({
  userSelect: "none",
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
  ":focus": {
    ...inputFocus({ theme }),
  },
  ...(Boolean(typeof item !== "string" && item.description)
    ? {
        borderBottom: `1px solid ${theme.color.border.default}`,
      }
    : {}),
  ...(!!onClick
    ? {
        cursor: "pointer",
        color: theme.color.text.default,
        "&:hover": {
          backgroundColor: lighten(theme.color.primary, 50),
          color: theme.color.primary,
        },
      }
    : {
        cursor: "not-allowed",
        color: theme.color.text.lightest,
      }),
  borderTop: `1px solid ${theme.color.border.default}`,
  "&:last-child": {
    paddingBottom: 2,
  },
}))

Container.defaultProps = { role: "button", "aria-disabled": false, "aria-hidden": false, "aria-invalid": false }

const Title = styled("p")`
  font-weight: bold;
  color: ${({ theme }) => theme.color.text.dark};
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  width: 100%;
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
  font-weight: ${({ theme }) => theme.font.weight.medium};
`

const ContextMenuIconBase = styled("div")<{ iconlocation_: Props["iconLocation"] }>`
  flex: 0 0 auto;
  margin-left: ${({ iconlocation_ }) => (iconlocation_ && iconlocation_ === "right" ? "auto" : 0)};
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

const ContextMenuItemIcon: React.SFC<Pick<Props, "item" | "iconLocation">> = props => {
  // If item is just a string,
  if (typeof props.item === "string") {
    return <></>
  }

  // If it's an object with an icon property
  if (typeof props.item.icon === "function") {
    const ContextMenuIcon = ContextMenuIconBase.withComponent(props.item.icon)
    return (
      <ContextMenuIcon
        iconlocation_={props.iconLocation}
        color={props.item.iconColor}
        left={props.iconLocation === "left" || !props.iconLocation}
      />
    )
  }

  // If it's an object with a React Element as a property
  return <>{props.item.icon}</>
}

const ContextMenuItem: React.SFC<Props> = props => (
  <Container {...props} condensed={props.condensed}>
    {(!props.iconLocation || props.iconLocation === "left") && (
      <ContextMenuItemIcon iconLocation={props.iconLocation} item={props.item} />
    )}
    <Content value={props.item} />
    {props.iconLocation === "right" && <ContextMenuItemIcon iconLocation={props.iconLocation} item={props.item} />}
  </Container>
)

export default ContextMenuItem
