import * as React from "react"

import { DefaultProps } from "../types"
import Container from "./Tooltip.Container"
import useWindowSize from "../useWindowSize"
import styled from "../utils/styled"
import { customScrollbar } from "../utils"

export interface TooltipProps extends DefaultProps {
  className?: string
  children?: React.ReactNode
  position?: "top" | "right" | "bottom" | "left"
  textId?: string
}

const ContentContainer = styled.div`
  max-width: 25vw;
  max-height: 25vh;
  width: 100%;
  height: 100%;
  overflow: auto;
  ${customScrollbar};

  > img {
    max-width: 100%;
  }
`

const Tooltip: React.SFC<TooltipProps> = ({ children, position = "right", ...props }) => {
  const [rect, setRect] = React.useState<ClientRect | null>(null)
  const [scroll, setScroll] = React.useState([window.scrollX, window.scrollY])
  const $node = React.useRef<HTMLDivElement>(null)
  const windowSize = useWindowSize()

  React.useEffect(() => {
    const handleScroll = () => setScroll([window.scrollX, window.scrollY])
    document.addEventListener("scroll", handleScroll)
    return () => document.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    const currentNode = $node.current
    if (currentNode && currentNode.parentElement) {
      const currentNodeRect = currentNode.parentElement.getBoundingClientRect()
      setRect(currentNodeRect)
    }
  }, [windowSize, scroll])

  const coords = React.useMemo(() => {
    if (!rect) {
      return {
        top: 0,
        left: 0,
      }
    }
    switch (position) {
      case "top":
        return {
          top: rect.top,
          left: rect.left + rect.width / 2,
        }
      case "bottom":
        return {
          top: rect.top + rect.height,
          left: rect.left + rect.width / 2,
        }
      case "left":
        return {
          top: rect.top + rect.height / 2,
          left: rect.left,
        }
      case "right":
        return {
          top: rect.top + rect.height / 2,
          left: rect.left + rect.width,
        }
    }
  }, [rect, position])

  return (
    <Container {...props} visible={Boolean(rect)} top={coords.top} left={coords.left} position={position} ref={$node}>
      <ContentContainer>{children}</ContentContainer>
    </Container>
  )
}

export default Tooltip
