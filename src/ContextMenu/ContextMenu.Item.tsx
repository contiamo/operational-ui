import * as React from "react"

import { OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"
import { ContextMenuProps } from "./ContextMenu"
import { IconComponentType } from "../Icon"

export interface Props {
  condensed?: boolean
  width?: string | number
  onClick?: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void
  align?: "left" | "right"
  iconLocation?: "left" | "right"
  item: IContextMenuItem
  isActive?: boolean
  id?: string
  disabled: boolean
}

export interface IContextMenuItem<TValue = any> {
  label: string | React.ReactElement<any>
  description?: string
  icon?: IconComponentType
  iconColor?: keyof OperationalStyleConstants["color"]
  onClick?: ContextMenuProps["onClick"]
  value?: TValue
  isActive?: boolean
  separator?: "top" | "bottom" | "both"
}

export const rowHeight = 32

const Container = styled("div")<Props>(({ condensed, disabled, align, theme, width }) => {
  return {
    userSelect: "none",
    label: "contextmenuitem",
    width: width || "100%",
    minWidth: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    backgroundColor: theme.color.white,
    lineHeight: `${condensed ? 28 : rowHeight}px`,
    padding: `0 ${theme.space.content}px`,
    textAlign: align,
    display: "flex",
    alignItems: "center",
    outline: "none",
    color: disabled ? theme.color.text.disabled : theme.color.text.default,
    cursor: disabled ? "initial" : "pointer",
    "&[aria-selected='true']": {
      outline: "none",
    },
    "&:hover, &:focus, &[aria-selected='true']": {
      backgroundColor: theme.color.background.lightest,
    },
  }
})

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
`

const ContextMenuIconBase = styled("div", { shouldForwardProp: prop => prop !== "iconLocation" })<{
  iconLocation: Props["iconLocation"]
}>`
  flex: 0 1 auto;
  height: 100%;
  margin-left: ${({ iconLocation }) => (iconLocation && iconLocation === "right" ? "auto" : 0)};
  & svg {
    vertical-align: text-bottom;
  }
`

const Ellipsis = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`

const Content: React.SFC<{ value: IContextMenuItem }> = ({ value }) => {
  // Fragments are required to hint to the compiler that these are valid types.
  if (typeof value === "string") {
    return <Ellipsis>{value}</Ellipsis>
  }

  if (typeof value.description === "undefined") {
    return <Ellipsis>{value.label}</Ellipsis>
  }

  return (
    <ContentContainer>
      <Title>{value.label}</Title>
      <Description>{value.description}</Description>
    </ContentContainer>
  )
}

const ContextMenuItemIcon: React.SFC<Pick<Props, "item" | "iconLocation">> = ({ iconLocation, item }) => {
  // If item is just a string,
  if (typeof item === "string") {
    return null
  }

  // If it's an object with an icon property
  if (typeof item.icon === "function") {
    return (
      <ContextMenuIconBase iconLocation={iconLocation}>
        {React.createElement(item.icon, {
          left: iconLocation === "left" || !iconLocation,
        })}
      </ContextMenuIconBase>
    )
  }

  // If it's an object with a React Element as a property
  return <>{item.icon}</>
}

const ContextMenuItem: React.SFC<Props> = ({ iconLocation, item, onClick, condensed, ...props }) => (
  <Container {...props} onClick={onClick} condensed={condensed} item={item}>
    {(!iconLocation || iconLocation === "left") && <ContextMenuItemIcon iconLocation={iconLocation} item={item} />}
    <Content value={item} />
    {iconLocation === "right" && <ContextMenuItemIcon iconLocation={iconLocation} item={item} />}
  </Container>
)

export default ContextMenuItem
