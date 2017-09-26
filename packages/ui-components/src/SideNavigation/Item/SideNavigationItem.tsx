import * as React from "react"
import { SFC } from "react"

import glamorous from "glamorous"

type Props = {
  className?: string
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
}

const Container = glamorous.div(({ theme, active }: { theme: Theme; active: boolean }): {} => {
  const activeBackgroundColor = "rgba(0, 0, 0, 0.2)"
  return {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: `${theme.spacing / 2}px ${theme.spacing * 1.7}px`,
    borderRadius: 2,
    width: "100%",
    minHeight: 40,
    cursor: "pointer",
    backgroundColor: active ? activeBackgroundColor : "transparent",

    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.07)"
    },

    ":first-child": {
      marginTop: 0,
      marginBottom: theme.spacing * 2
    }
  }
})

const SideNavigationItem: SFC<Props> = ({ className, children, onClick, active }: Props) => (
  <Container className={`${className}`} active={!!active} onClick={onClick} role="button" tabIndex={-1}>
    {children}
  </Container>
)

export default SideNavigationItem
