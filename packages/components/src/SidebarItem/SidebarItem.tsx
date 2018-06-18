import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { readableTextColor, darken } from "@operational/utils"
import { WithTheme, Css, CssStatic } from "../types"
export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */

  css?: Css
  className?: string
  children?: React.ReactNode
  onClick?: () => void
  /** Disabled */

  disabled?: boolean
  /** Active */

  active?: boolean
}
const Container = styled("div")(
  ({
    theme,
    isDisabled,
    isActive,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
    isDisabled: boolean
    isActive: boolean
  }): CssStatic => ({
    label: "sidebaritem",
    backgroundColor: theme.deprecated.colors.white,
    height: 30,
    ...theme.deprecated.typography.body,
    fontWeight: isActive ? 600 : 400,
    position: "relative",
    borderBottom: "1px solid",
    borderColor: theme.deprecated.colors.separator,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `0px ${theme.deprecated.spacing}px`,
    cursor: "pointer",
    textDecoration: "none",
    color: isActive ? theme.deprecated.colors.linkText : theme.deprecated.colors.text,
    ...(isDisabled
      ? {
          opacity: 0.25,
          pointerEvents: "none",
        }
      : {}),
    ":hover": {
      backgroundColor: theme.deprecated.colors.lighterBackground,
    },
    ":focus": {
      outline: 0,
    },
  }),
)

const SidebarItem = (props: Props) => (
  <Container
    id={props.id}
    css={props.css}
    onClick={props.onClick}
    className={props.className}
    isActive={!!props.active}
    isDisabled={!!props.disabled}
  >
    {props.children}
  </Container>
)

export default SidebarItem
