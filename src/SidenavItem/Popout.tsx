import * as React from "react"
import styled from "../utils/styled"

export interface SidenavPopoutProps {
  ref?: React.RefObject<HTMLDivElement>
}

const Container = styled("div")<{ top: string; left: string; position: string }>`
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  width: 256px;
  height: calc(100vh - ${({ theme, top }) => theme.space.element + parseFloat(top)}px);
  overflow: overlay;
  z-index: ${({ theme }) => theme.zIndex.selectOptions + 1};
`

export const SidenavPopout: React.FC<SidenavPopoutProps> = ({ children }) => {
  const containerNode = React.useRef<HTMLDivElement>(null)
  const otherOpenMenuRef = React.useRef<HTMLDivElement>(null)
  const [top, setTop] = React.useState("0")
  const [left, setLeft] = React.useState("100%")
  const [position, setPosition] = React.useState("absolute")

  React.useEffect(() => {
    // @ts-ignore find open menu
    otherOpenMenuRef.current = document.querySelector(`[tabindex="0"]`)
    if (otherOpenMenuRef.current) {
      otherOpenMenuRef.current.setAttribute("tabindex", "-1")
    }
    return () => {
      if (otherOpenMenuRef.current) {
        otherOpenMenuRef.current.setAttribute("tabindex", "0")
      }
    }
  }, [])

  React.useEffect(() => {
    const node = containerNode.current
    if (node) {
      const rect = node.getBoundingClientRect()
      setTop(`${rect.top}px`)
      setLeft(`${rect.left}px`)
      setPosition("fixed")
    }
  }, [])

  return (
    <Container position={position} top={top} left={left} ref={containerNode}>
      {children}
    </Container>
  )
}

export default SidenavPopout
