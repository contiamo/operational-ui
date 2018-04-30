import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"
import { darken } from "@operational/utils"

export interface Props {
  id?: string
  css?: any
  className?: string
  children?: any
  onClick?: () => void
  __isContextMenuItem?: boolean
}

const Container = glamorous.div(({ theme, clickable }: { theme: Theme; clickable: boolean }): any => ({
  label: "contextmenuitem",
  backgroundColor: theme.colors.white,
  minWidth: 160,
  width: "fit-content",
  padding: `${theme.spacing / 2}px ${theme.spacing}px`,
  border: "1px solid",
  borderColor: theme.colors.separator,
  ...clickable
    ? {
        cursor: "pointer",
        "&:hover": {
          backgroundColor: darken(theme.colors.white, 2)
        }
      }
    : {},
  "&:not(:first-child)": {
    borderTop: 0
  }
}))

const ContextMenuItem = (props: Props) => (
  <Container
    id={props.id}
    css={props.css}
    className={props.className}
    clickable={!!props.onClick}
    onClick={props.onClick}
  >
    {props.children}
  </Container>
)

export default Object.assign(ContextMenuItem, {
  defaultProps: {
    __isContextMenuItem: true
  }
})
