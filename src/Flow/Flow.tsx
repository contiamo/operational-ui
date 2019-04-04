import React from "react"
import { IContextMenuItem } from "../ContextMenu/ContextMenu.Item"
import Icon from "../Icon/Icon"
import { Body } from "../Typography/Body"
import constants, { expandColor } from "../utils/constants"
import styled from "../utils/styled"

export interface FlowProps {
  items: IContextMenuItem[]
  iconColor?: string
}

const Container = styled("div")`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.element}px;
`

const Box = styled<"div", { onClick: FlowProps["items"][-1]["onClick"] }>("div")`
  width: 120px;
  height: 80px;
  border: 1px solid ${({ theme }) => theme.color.border.disabled};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 2;
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

const Flow: React.FC<FlowProps> = ({ items, iconColor }) => (
  <Container>
    {items.map((item, index) => (
      <>
        <Box
          key={index}
          onClick={() => {
            if (item.onClick) {
              item.onClick(item)
            }
          }}
        >
          {item.icon ? (
            typeof item.icon === "string" ? (
              <Icon
                size={22}
                name={item.icon}
                color={expandColor(constants, item.iconColor || iconColor) || undefined}
              />
            ) : (
              item.icon
            )
          ) : null}
          <Label>{item.label}</Label>
        </Box>
        {index !== items.length - 1 && <NextArrow />}
      </>
    ))}
  </Container>
)

export default Flow
