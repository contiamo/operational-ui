import * as React from "react"
import { lighten } from "../utils"
import { OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"
import { ContextMenuProps } from "./ContextMenu"
import { IconComponentType } from "../Icon/Icon"

type StringOrItem = string | IContextMenuItem

export interface Props {
  condensed?: boolean
  width?: string | number
  onClick?: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void
  align?: "left" | "right"
  iconLocation?: "left" | "right"
  item: StringOrItem
  isActive?: boolean
  id?: string
}

export interface IContextMenuItem<TValue = any> {
  label: string | React.ReactElement<any>
  description?: string
  icon?: IconComponentType
  iconColor?: keyof OperationalStyleConstants["color"]
  onClick?: ContextMenuProps["onClick"]
  value?: TValue
  isActive?: boolean
}

const Container = styled("div")<Props>(({ align, theme, isActive, condensed, width, item }) => {
  const activeShadow = `0 0 0 1px ${theme.color.primary} inset`

  return {
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
    fontWeight: isActive ? theme.font.weight.bold : theme.font.weight.medium,
    boxShadow: isActive ? activeShadow : "none",
    "&[aria-selected='true']": {
      boxShadow: activeShadow,
      outline: "none",
    },
    ...(typeof item !== "string" && Boolean(item.description)
      ? {
          borderBottom: `1px solid ${theme.color.border.select}`,
        }
      : {}),
    cursor: "pointer",
    "&:hover, &[aria-selected='true']": {
      backgroundColor: lighten(theme.color.primary, 50),
      color: theme.color.primary,
    },
    color: isActive ? theme.color.primary : theme.color.text.default,
    borderTop: `1px solid ${theme.color.border.select}`,
    "&:last-child": {
      paddingBottom: 2,
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

const ContextMenuItem: React.SFC<Props> = ({ iconLocation, item, onClick, condensed, ...props }) => {
  return (
    <Container
      {...props}
      onKeyDown={e => {
        switch (e.key) {
          case " ":
          case "Enter":
            if (onClick) {
              e.stopPropagation()
              e.preventDefault()
              onClick(e)
            }
        }
      }}
      onClick={onClick}
      condensed={condensed}
      item={item}
    >
      {(!iconLocation || iconLocation === "left") && <ContextMenuItemIcon iconLocation={iconLocation} item={item} />}
      <Content value={item} />
      {iconLocation === "right" && <ContextMenuItemIcon iconLocation={iconLocation} item={item} />}
    </Container>
  )
}

export default ContextMenuItem
