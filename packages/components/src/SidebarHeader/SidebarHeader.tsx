import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { spin } from "@operational/utils"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */

  css?: Css
  className?: string
  /** Is it open? */

  open?: boolean
  /** Toggle callback */

  onToggle?: () => void
  /** Header label */

  label?: string
  children?: React.ReactNode
}

const Container = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    label: "sidebarheader",
    position: "relative",
  }),
)

const Content = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    position: "relative",
    paddingLeft: theme.deprecated.spacing * 1,
    "::after": {
      content: "' '",
      position: "absolute",
      width: 1,
      height: "100%",
      top: 0,
      left: theme.deprecated.spacing * 1,
      borderLeft: "1px solid",
      borderColor: theme.deprecated.colors.separator,
    },
  }),
)

const Header = styled("div")(
  ({
    theme,
    isOpen,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
    isOpen: boolean
  }): CssStatic => ({
    position: "relative",
    display: "flex",
    height: 30,
    alignItems: "center",
    padding: `0px ${theme.deprecated.spacing}px`,
    borderBottom: "1px solid",
    borderBottomColor: theme.deprecated.colors.separator,
    cursor: "pointer",
    outline: "none",
    backgroundColor: theme.deprecated.colors.white,
    ...(isOpen
      ? {
          borderBottom: "1px solid",
          borderBottomColor: theme.deprecated.colors.separator,
        }
      : {}),
    "&:hover": {
      backgroundColor: theme.deprecated.colors.lighterBackground,
    },
    "&::after": {
      content: "' '",
      display: "block",
      width: 0,
      height: 0,
      marginLeft: "auto",
      border: "4px solid transparent",
      borderLeftColor: theme.deprecated.colors.lightGray,
      transition: ".15s transform ease",
      transform: isOpen ? "translate3d(-2px, 1px, 0) rotate(90deg)" : null,
    },
  }),
)

const SidebarHeader = (props: Props) => (
  <Container css={props.css} id={props.id} className={props.className}>
    <Header isOpen={!!props.open} onClick={props.onToggle}>
      {props.label}
    </Header>
    {props.open ? <Content>{props.children}</Content> : null}
  </Container>
)

export default SidebarHeader
