import * as React from "react"
import { SFC } from "react"

import glamorous from "glamorous"

interface Props {
  className?: string
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
  css?: {}
  theme?: Theme
}

const Container = glamorous.div(({ theme, active }: Props): {} => {
  const activeBackgroundColor = "rgba(0, 0, 0, 0.2)"
  return {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: `${theme.spacing / 2}px ${theme.spacing * 1.7}px`,
    borderRadius: 2,
    width: "fit-content",
    minHeight: 40,
    cursor: "pointer",
    backgroundColor: active ? activeBackgroundColor : "transparent",
    minWidth: "100%",
    whiteSpace: "pre",

    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.07)",
    },

    ":first-child": {
      marginTop: 0,
    },
  }
})

const SideNavigationItem: SFC<Props> = ({ className, css, children, onClick, active }: Props) => (
  <Container css={css} className={`${className}`} active={!!active} onClick={onClick} role="button" tabIndex={-1}>
    {children}
  </Container>
)

export default SideNavigationItem
