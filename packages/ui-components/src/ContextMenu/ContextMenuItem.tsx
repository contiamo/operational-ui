import * as React from "react"
import glamorous from "glamorous"

interface IProps {
  css?: any
  className?: string
  children?: any
  onClick?: () => void
}

const Container = glamorous.div(({ theme, clickable }: { theme: Theme; clickable: boolean }): any => ({
  backgroundColor: theme.colors.palette.white,
  minWidth: 160,
  width: "fit-content",
  padding: theme.spacing / 2,
  border: "1px solid",
  borderColor: theme.colors.palette.grey30,
  ...clickable
    ? {
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.05)"
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
