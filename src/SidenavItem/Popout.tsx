import * as React from "react"

import styled from "../utils/styled"
import useSticky from "../useSticky/useSticky"

export interface SidenavPopoutProps {
  ref?: React.RefObject<HTMLDivElement>
}

const Container = styled("div")<{ top: string; alignment: string; left: string; position: string }>`
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  width: 256px;
  max-height: 90vh;
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
  const { alignment, left, position, top } = useSticky({ inputRef: containerNode })

  return (
    <Container {...props} position={position} top={top} alignment={alignment} left={left} ref={containerNode}>
      <ScrollTrap>{children}</ScrollTrap>
    </Container>
  )
}

export default SidenavPopout
