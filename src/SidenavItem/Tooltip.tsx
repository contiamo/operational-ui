import * as React from "react"

import styled from "../utils/styled"

const Container = styled.div<{ dark: boolean; rect: ClientRect | null }>`
  position: ${({ rect }) => (rect ? "fixed" : "absolute")};
  top: ${({ rect }) => (rect ? `${rect.top}px` : "25%")};
  left: ${({ rect }) => (rect ? `${rect.left}px` : "100%")};
  border-radius: 2px;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.small}px;
  background: ${({ theme, dark }) => (dark ? theme.color.primaryDark : theme.color.white)};
  box-shadow: ${({ theme }) => theme.shadows.popup};
  color: ${({ theme, dark }) => (dark ? theme.color.white : theme.color.text.default)};
  z-index: ${({ theme }) => theme.zIndex.tooltip};

  ::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -12px;
    transform: translateY(-50%);
    display: block;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-right-color: ${({ theme, dark }) => (dark ? theme.color.primaryDark : theme.color.white)};
  }
`

const SidenavTooltip: React.FC<{ dark: boolean }> = ({ children, ...props }) => {
  const [rect, setRect] = React.useState<ClientRect | null>(null)
  const $container = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const currentContainer = $container.current
    if (currentContainer) {
      setRect(currentContainer.getBoundingClientRect())
    }
  }, [])

  return (
    <Container {...props} ref={$container} rect={rect}>
      {children}
    </Container>
  )
}

export default SidenavTooltip
