import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "contiamo-ui-theme"
import { darken } from "contiamo-ui-utils"

export interface IProps {
  css?: any
  className?: string
  children?: any
  onClick?: () => void
}

const Container = glamorous.div(({ theme, clickable }: { theme: Theme; clickable: boolean }): any => ({
  backgroundColor: theme.colors.palette.white,
  minWidth: 160,
  width: "fit-content",
  padding: `${theme.spacing * 2 / 3}px ${theme.spacing}px`,
  border: "1px solid",
  borderColor: theme.colors.usage.contentSeparatorLine,
  ...clickable
    ? {
        cursor: "pointer",
        "&:hover": {
          backgroundColor: darken(theme.colors.palette.white)(2)
        }
      }
    : {},
  "&:not(:first-child)": {
    borderTop: 0
  }
}))

const ContextMenuItem = ({ css, className, onClick, children }: IProps) => (
  <Container css={css} className={className} clickable={!!onClick} onClick={onClick}>
    {children}
  </Container>
)

export default ContextMenuItem
