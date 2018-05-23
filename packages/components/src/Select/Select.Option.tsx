import * as React from "react"
import glamorous, { withTheme, GlamorousComponent } from "glamorous"
import { Theme, expandColor } from "@operational/theme"
import { readableTextColor, darken } from "@operational/utils"

import { Icon } from "../"

export interface Props {
  id?: number | string
  css?: any
  className?: string
  selected?: boolean
  onClick?: () => void
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme, selected }: { theme: Theme; selected: boolean }): any => {
  const backgroundColor = selected ? theme.colors.background : theme.colors.white

  return {
    backgroundColor,
    label: "selectoption",
    position: "relative",
    padding: `${theme.spacing / 2}px ${theme.spacing * 3 / 4}px`,
    wordWrap: "break-word",
    outline: "none",
    borderTop: "1px solid",
    borderColor: darken(theme.colors.background, 10),

    ":hover": {
      backgroundColor: darken(theme.colors.background, 5),
    },
  }
})

const IconContainer = glamorous.div(({ theme }: { theme: Theme }): any => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: theme.spacing * 1.25,
  height: theme.spacing * 1.25,
  backgroundColor: theme.colors.info,
  position: "absolute",
  top: "50%",
  right: 4,
  borderRadius: "50%",
  transform: "translate3d(0, -50%, 0)",
  "& svg": {
    color: theme.colors.white,
    width: theme.spacing * 0.75,
    height: theme.spacing * 0.75,
  },
}))

const SelectOption = (props: Props) => (
  <Container
    key={props.id}
    css={props.css}
    className={props.className}
    selected={Boolean(props.selected)}
    tabIndex={-2}
    role="option"
    aria-selected={props.selected}
    onClick={(ev: React.SyntheticEvent<Node>) => {
      ev.stopPropagation()
      props.onClick && props.onClick()
    }}
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
