import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme, expandColor } from "@operational/theme"
import { readableTextColor, darken } from "@operational/utils"
import { Icon } from "../"
import { CssStatic } from "../types"

export interface Props {
  id?: number | string
  css?: any
  className?: string
  selected?: boolean
  onClick?: () => void
  children?: React.ReactNode
}

const Container = styled("div")(
  ({
    theme,
    selected,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
    selected: boolean
  }): CssStatic => {
    const backgroundColor = selected ? theme.deprecated.colors.background : theme.deprecated.colors.white
    return {
      backgroundColor,
      label: "selectoption",
      position: "relative",
      padding: `${theme.deprecated.spacing / 2}px ${(theme.deprecated.spacing * 3) / 4}px`,
      wordWrap: "break-word",
      outline: "none",
      borderTop: "1px solid",
      borderColor: darken(theme.deprecated.colors.background, 10),
      ":hover": {
        backgroundColor: darken(theme.deprecated.colors.background, 5),
      },
    }
  },
)

const IconContainer = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): CssStatic => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: theme.deprecated.spacing * 1.25,
    height: theme.deprecated.spacing * 1.25,
    backgroundColor: theme.deprecated.colors.info,
    position: "absolute",
    top: "50%",
    right: 4,
    borderRadius: "50%",
    transform: "translate3d(0, -50%, 0)",
    "& svg": {
      color: theme.deprecated.colors.white,
      width: theme.deprecated.spacing * 0.75,
      height: theme.deprecated.spacing * 0.75,
    },
  }),
)

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
