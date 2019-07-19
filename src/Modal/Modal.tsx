import * as React from "react"
import styled from "../utils/styled"
import Card from "../Card/Card"
import { customScrollbar } from "../utils"
import { cardHeaderHeight } from "../Internals/CardHeader"

export interface ModalProps {
  title: string
  isOpen: boolean
  children: React.ReactNode
  onClickOutside?: () => void
  height?: React.CSSProperties["height"]
  anchor?: React.RefObject<HTMLElement>
  actions?: React.ReactNode[]
}

type Top = number
type Left = number
type Width = number
type Height = ModalProps["height"] // undefined for `auto`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndex.modal - 1};
`

const Container = styled("div", { shouldForwardProp: prop => !["width", "height"].includes(prop) })<{
  top: Top
  left: Left
  width: Width
  height: Height
}>`
  position: fixed;
  top: ${({ top, theme }) => `calc(${top}px + ${theme.space.small}px)`};
  left: ${({ left, theme }) => `calc(${left}px + ${theme.space.small}px)`};
  right: ${({ left }) => (left ? "auto" : 0)};
  margin: 0 auto;
  width: ${({ width, theme }) => `calc(${width}px - ${theme.space.small * 2}px)`};
  max-width: calc(100vw - ${({ theme }) => theme.space.element}px);
  height: ${({ height, theme }) => `calc(${height}px - ${theme.space.small * 2}px)`};
  max-height: calc(100vh - ${({ theme }) => theme.space.element}px);
  z-index: ${({ theme }) => theme.zIndex.modal};

  :focus {
    outline: none;
  }
`

const ModalCard = styled(Card)`
  width: 100%;
  height: 100%;
`

const ModalContent = styled.div<{ anchor: boolean; height: ModalProps["height"] }>`
  display: grid;
  grid-template-rows: auto max-content;
  height: ${({ height }) => height || "100%"};
  max-height: calc(
    /* card title + bottom padding + bottom margin + border */ 100vh -
      ${({ theme }) => cardHeaderHeight + theme.space.content + theme.space.content + theme.space.element + 1}px
  );
  overflow: auto;

  ${({ theme }) => customScrollbar({ theme })};
`

const Actions = styled.div<{ childCount: number }>`
  display: grid;
  grid-template-columns: ${({ childCount }) => `repeat(${childCount}, max-content)`};
  margin-top: auto;
  padding-top: ${({ theme }) => theme.space.element}px;
`

const Modal: React.RefForwardingComponent<HTMLDivElement, ModalProps> = (
  { title, anchor, children, onClickOutside, height, isOpen, actions },
  ref,
) => {
  const $modalContainer = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState<[Top, Left, Width, Height]>([50, 0, 480, height])

  // Focus the modal on open
  React.useEffect(() => {
    const currentModalContainer = $modalContainer.current
    if (currentModalContainer && open) {
      currentModalContainer.focus()
    }
  }, [isOpen])

  // Anchor if anchor
  React.useEffect(() => {
    const currentAnchor = anchor && anchor.current
    if (currentAnchor) {
      currentAnchor.scrollIntoView()
      const { top, left, width, height } = currentAnchor.getBoundingClientRect()
      setSize([top, left, width, height])
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <>
      <Overlay onClick={onClickOutside} />
      <Container tabIndex={0} ref={$modalContainer} top={size[0]} left={size[1]} width={size[2]} height={size[3]}>
        <ModalCard ref={ref} fullSize title={title}>
          <ModalContent anchor={Boolean(anchor)} height={height}>
            <div>{children}</div>
            {actions && <Actions childCount={actions.length}>{actions}</Actions>}
          </ModalContent>
        </ModalCard>
      </Container>
    </>
  )
}

export default React.forwardRef(Modal)
