import * as React from "react"
import styled from "../utils/styled"

export interface SidenavPopoutProps {
  ref?: React.RefObject<HTMLDivElement>
}

const Container = styled("div")<{ top: string; alignment: string; left: string; position: string }>`
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  width: 256px;
  height: 100vh;
  overflow: hidden;
  z-index: ${({ theme }) => theme.zIndex.selectOptions + 1};
  display: flex;
  flex-direction: column;
  justify-content: ${({ alignment }) => alignment};
`

const ScrollTrap = styled("div")`
  max-height: 50vh;
  overflow: auto;
`

export const SidenavPopout: React.FC<SidenavPopoutProps> = ({ children, ...props }) => {
  const containerNode = React.useRef<HTMLDivElement>(null)
  const otherOpenMenuRef = React.useRef<HTMLDivElement>(null)
  const [top, setTop] = React.useState("0")
  const [alignment, setAlignment] = React.useState("flex-start")
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

  React.useLayoutEffect(() => {
    const node = containerNode.current
    if (node) {
      const rect = node.getBoundingClientRect()
      setLeft(`${rect.left}px`)
      if (rect.top > window.innerHeight / 2) {
        setTop(`${rect.top - (rect.height - (node.parentElement ? node.parentElement.clientHeight : 0))}px`)
        setAlignment("flex-end")
      } else {
        setTop(`${rect.top}px`)
        setAlignment("flex-start")
      }
      setPosition("fixed")
    }
  }, [])

  return (
    <Container {...props} position={position} top={top} alignment={alignment} left={left} ref={containerNode}>
      <ScrollTrap>{children}</ScrollTrap>
    </Container>
  )
}

export default SidenavPopout
