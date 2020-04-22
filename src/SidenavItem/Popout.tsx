import * as React from "react"

import styled from "../utils/styled"
import useSticky from "../useSticky/useSticky"
import useWindowSize from "../useWindowSize"
import { getDarkLightTheme } from "../utils/constants"

export interface SidenavPopoutProps {
  ref?: React.RefObject<HTMLDivElement>
  dark: boolean
}

const Container = styled("div")<{ top: string; left: string; position: string; dark: boolean }>`
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  width: 256px;
  max-height: 90vh;
  overflow: hidden;
  z-index: ${({ theme }) => theme.zIndex.selectOptions + 1};
  display: flex;
  flex-direction: column;
  background: ${({ theme, dark }) => getDarkLightTheme(theme, dark).bg};
`

const ScrollTrap = styled("div")`
  max-height: 50vh;
  overflow: auto;
`

export const SidenavPopout: React.FC<SidenavPopoutProps> = ({ children, ...props }) => {
  const $container = React.useRef<HTMLDivElement>(null)
  const [initialTop, setInitialTop] = React.useState("0")
  const { height } = useWindowSize()

  React.useLayoutEffect(() => {
    const node = $container.current
    if (node) {
      const rect = node.getBoundingClientRect()
      // If we're in the lower half of the screen
      if (rect.top > height / 2) {
        // open towards the top
        setInitialTop(`${rect.top - (rect.height - (node.parentElement ? node.parentElement.clientHeight : 0))}px`)
      } else {
        setInitialTop(`${rect.top}px`)
      }
    }
  }, [height])

  const { left, position } = useSticky({ $el: $container })

  return (
    <Container {...props} position={position} top={initialTop} left={left} ref={$container}>
      <ScrollTrap>{children}</ScrollTrap>
    </Container>
  )
}

export default SidenavPopout
