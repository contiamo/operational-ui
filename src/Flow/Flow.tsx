import { kebab } from "case"
import * as React from "react"

import { IContextMenuItem } from "../ContextMenu/ContextMenu.Item"
import Icon from "../Icon/Icon"
import { Body } from "../Typography/Body"
import { inputFocus } from "../utils"
import styled from "../utils/styled"

export interface FlowProps {
  items: IContextMenuItem[]
  condensed?: boolean
  activeItemIndex?: number
}

const Container = styled("div")`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.element}px;
`

const Box = styled<
  "button",
  { isActive: boolean; condensed: FlowProps["condensed"]; onClick: FlowProps["items"][-1]["onClick"] }
>("button")`
  width: ${({ condensed }) => (condensed ? 32 : 120)}px;
  height: ${({ condensed }) => (condensed ? 32 : 80)}px;
  border: 1px solid ${({ theme, isActive }) => (isActive ? theme.color.primary : theme.color.border.disabled)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 2px;
  cursor: ${({ onClick }) => (Boolean(onClick) ? "pointer" : "initial")};
  padding: 0 ${({ theme }) => theme.space.content}px;
  text-align: center;
  word-wrap: break-word;

  :hover {
    border-color: ${({ theme }) => theme.color.border.default};
  }

  :focus {
    ${({ theme }) => inputFocus({ theme, isError: false })}
  }
`

const Label = styled(Body)`
  font-weight: bold;
  margin: 10px 0 0;
`

const NextArrow = styled("div")`
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-left-color: ${({ theme }) => theme.color.border.disabled};
  margin: 0 0 0 ${({ theme }) => theme.space.small}px;
`

const FlowIcon = styled(Icon)`
  pointer-events: none;
`

const getIconColor = (currentIndex: number, activeItemIndex?: number, iconColor?: string) => {
  if (iconColor) {
    return iconColor
  }

  if (typeof activeItemIndex === "undefined") {
    return "primary"
  }

  if (currentIndex === activeItemIndex) {
    return "primary"
  }

  return "color.border.default"
}

const Flow: React.FC<FlowProps> = ({ items, condensed, activeItemIndex }) => (
  <Container>
    {items.map((item, index) => (
      <React.Fragment key={index}>
        <Box
          aria-label={typeof item.label === "string" ? item.label : undefined}
          role={item.onClick ? "button" : undefined}
          tabIndex={0}
          data-cy={`operational-ui__flow flow__box box-${
            typeof item.label === "string" ? kebab(item.label) : kebab(item.description || "")
          }`}
          isActive={activeItemIndex === index}
          condensed={Boolean(condensed)}
          onClick={
            Boolean(item.onClick)
              ? () => {
                  if (item.onClick) {
                    item.onClick(item)
                  }
                }
              : undefined
          }
        >
          {item.icon && typeof item.icon === "string" ? (
            <FlowIcon
              size={condensed ? 16 : 22}
              name={item.icon}
              color={getIconColor(index, activeItemIndex, item.iconColor)}
            />
          ) : (
            item.icon
          )}
          {!condensed && <Label>{item.label}</Label>}
        </Box>
        {index !== items.length - 1 && <NextArrow />}
      </React.Fragment>
    ))}
  </Container>
)

export default Flow
