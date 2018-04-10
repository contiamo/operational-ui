import * as React from "react"
import glamorous, { withTheme, GlamorousComponent } from "glamorous"
import { Theme, expandColor } from "@operational/theme"
import { readableTextColor, darken } from "@operational/utils"

import Icon from "../Icon"

export interface Props {
  id?: number | string
  css?: any
  className?: string
  selected?: boolean
  onClick?: () => void
  children?: React.ReactNode
  color?: string
}

const Container = glamorous.div(
  ({ theme, color, selected }: { theme: Theme; color?: string; selected: boolean }): any => {
    const backgroundColor = expandColor(theme, color) || theme.colors.white

    return {
      backgroundColor,
      label: "selectoption",
      position: "relative",
      padding: `${theme.spacing / 2}px ${theme.spacing * 3 / 4}`,
      wordWrap: "break-word",
      color: readableTextColor(backgroundColor, ["black", "white"]),
      outline: "none",

      ":hover": {
        backgroundColor: darken(backgroundColor, 5),
        color: readableTextColor(darken(backgroundColor, 5), ["black", "white"])
      },

      "&:not(:first-child)": {
        borderTop: "1px solid",
        borderColor: darken(backgroundColor, 10)
      }
    }
  }
)

const IconContainer = glamorous.div(({ theme }: { theme: Theme }): any => ({
  width: 10,
  height: 10,
  position: "absolute",
  top: "50%",
  right: 4,
  transform: "translate3d(-50%, -50%, 0)",
  "& svg": {
    width: "100%",
    height: "100%"
  }
}))

const SelectOption = (props: Props) => (
  <Container
    key={props.id}
    css={props.css}
    className={props.className}
    selected={!!props.selected}
    color={props.color}
    tabIndex={-2}
    role="option"
    aria-selected={props.selected}
    onClick={props.onClick}
  >
    {props.children}
    {props.selected ? (
      <IconContainer>
        <Icon name="Check" size={10} />
      </IconContainer>
    ) : null}
  </Container>
)

export default SelectOption
