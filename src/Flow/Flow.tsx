import React from "react"
import { IContextMenuItem } from "../ContextMenu/ContextMenu.Item"
import Icon from "../Icon/Icon"
import { Body } from "../Typography/Body"
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
  "div",
  { isActive: boolean; condensed: FlowProps["condensed"]; onClick: FlowProps["items"][-1]["onClick"] }
>("div")`
  width: ${({ condensed }) => (condensed ? 32 : 120)}px;
  height: ${({ condensed }) => (condensed ? 32 : 80)}px;
  border: 1px solid ${({ theme, isActive }) => (isActive ? theme.color.primary : theme.color.border.disabled)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 2px;
  cursor: ${({ onClick }) => (Boolean(onClick) ? "pointer" : "initial")};

  :hover {
    border-color: ${({ theme }) => theme.color.border.default};
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

const getIconColor = (currentIndex: number, activeItemIndex?: number) => {
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
            <Icon size={condensed ? 16 : 22} name={item.icon} color={getIconColor(index, activeItemIndex)} />
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
