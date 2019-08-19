import * as React from "react"
import tinycolor from "tinycolor2"
import { IconComponentType } from "../Icon"
import { DefaultProps } from "../types"
import { inputFocus } from "../utils"
import { expandColor, OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"

export interface ChipProps extends DefaultProps {
  /** Chip color, provided as a hex value or a named theme color */
  color?: string
  /** Handle clicks on the chip's body. This is never triggered when the icon bar is clicked. When an icon is not specified, however, this basically turns into a full element click handler. */
  onClick?: () => void
  /** Handle clicks on the chip's icon area on the right. */
  onIconClick?: () => void
  /** The name of the icon shown in the right icon bar area of the chip. A typical use here would be the `X` icon for closing the chip. Note that this icon is only displayed if there is an `onIconClick` prop present.  */
  icon?: IconComponentType | React.ReactNode
  children: React.ReactNode
}

const height = 20

const Container = styled("div")<{ color_?: string }>(({ theme, color_ }) => {
  const backgroundColor = tinycolor(expandColor(theme, color_) || theme.color.primary)
    .setAlpha(0.1)
    .toString()
  return {
    backgroundColor,
    border: 0,
    padding: 0,
    fontSize: theme.font.size.small,
    fontWeight: theme.font.weight.medium,
    label: "chip",
    position: "relative",
    height,
    display: "inline-flex",
    alignItems: "center",
    boxSizing: "border-box",
    width: "fit-content",
    borderRadius: 2,
    color: theme.color.text.default,
    margin: `0px ${theme.space.small}px 0px 0px`,
    ":focus": {
      ...inputFocus({ theme }),
    },
  }
})

const getInteractiveStyle = (
  theme: OperationalStyleConstants,
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
) => ({
  ...(Boolean(onClick)
    ? {
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
        "&:focus": inputFocus({ theme }),
      }
    : {}),
})

const Content = styled<"div" | "button">("div")<{ as?: "div" | "button"; onClick: ChipProps["onClick"] }>(
  ({ theme, onClick }) => ({
    height,
    display: "flex",
    backgroundColor: "transparent",
    font: "inherit",
    color: "inherit",
    border: 0,
    outline: "none",
    alignItems: "center",
    padding: `0px ${theme.space.base}px`,
    cursor: Boolean(onClick) ? "pointer" : "initial",
    ...getInteractiveStyle(theme, onClick),
  }),
)

const Action = styled("button")(({ theme, onClick }) => {
  return {
    border: 0,
    backgroundColor: "transparent",
    font: "inherit",
    color: "inherit",
    padding: 0,
    borderLeft: `1px solid ${theme.color.ghost}`,
    width: theme.space.element,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height,
    cursor: Boolean(onClick) ? "pointer" : "initial",
    ...getInteractiveStyle(theme, onClick),
  }
})

const Chip: React.SFC<ChipProps> = ({ onClick, onIconClick: onIconClick, icon: Icon, children, ...props }) => (
  <Container color_={props.color} {...props}>
    <Content
      aria-label={typeof children === "string" ? children : undefined}
      role={Boolean(onClick) ? "button" : undefined}
      as={Boolean(onClick) ? "button" : "div"}
      onClick={onClick}
    >
      {children}
    </Content>
    {onIconClick && (
      <Action aria-label={typeof Icon === "function" ? Icon.name : undefined} role="button" onClick={onIconClick}>
        {typeof Icon === "function" ? <Icon size={12} /> : Icon}
      </Action>
    )}
  </Container>
)

export default Chip
