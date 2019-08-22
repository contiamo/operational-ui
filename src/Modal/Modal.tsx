import * as React from "react"

import { Overlay, Container, ModalCard, ModalContent, Actions, ContentWrapper } from "./Modal.styled"
import { NoIcon } from "../Icon"

export interface ModalProps {
  title: React.ReactNode
  isOpen: boolean
  children: React.ReactNode
  onClickOutside?: () => void
  width?: "max-content" | number
  height?: React.CSSProperties["height"]
  anchor?: React.RefObject<HTMLElement>
  actions?: React.ReactNode[]
  fullSize?: boolean
}

const margin = 16

export type Top = number
export type Left = number
export type Width = ModalProps["width"]
export type Height = ModalProps["height"] // undefined for `auto`

const Modal: React.RefForwardingComponent<HTMLDivElement, ModalProps> = (
  { title, anchor, children, onClickOutside, height, isOpen, actions, width, fullSize },
  ref,
) => {
  const $modalContainer = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState<[Top, Left, Width, Height]>(
    fullSize ? [0, 0, window.innerWidth - margin, window.innerHeight] : [50, 0, 480, height],
  )

  if (
    process.env.NODE_ENV !== "development" &&
    fullSize &&
    (height !== undefined || width !== undefined || anchor !== undefined)
  ) {
    console.warn("width, height and anchor are ignored when used together with fullSize")
  }

  if (
    process.env.NODE_ENV !== "development" &&
    fullSize &&
    (height !== undefined || width !== undefined || anchor !== undefined)
  ) {
    console.warn("width, height and anchor are ignored when used together with fullSize")
  }

  // Focus the modal on open
  React.useEffect(() => {
    const currentModalContainer = $modalContainer.current
    if (currentModalContainer && isOpen) {
      currentModalContainer.focus()
    }
  }, [isOpen])

  // Anchor
  React.useEffect(() => {
    const currentAnchor = anchor && anchor.current
    if (currentAnchor) {
      currentAnchor.scrollIntoView()
      const { top, left, width, height } = currentAnchor.getBoundingClientRect()
      setSize([top, left, width, height])
    }
    if (fullSize) {
      setSize([0, 0, window.innerWidth - margin, window.innerHeight])
    }
  }, [isOpen, anchor, fullSize])

  // Resize
  React.useEffect(() => {
    if (isOpen && fullSize) {
      const handleResize = () => setSize([0, 0, window.innerWidth - margin, window.innerHeight])
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [isOpen, fullSize, setSize])

  // Close on Escape
  React.useEffect(() => {
    if (onClickOutside) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClickOutside()
        }
      }
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClickOutside])

  if (!isOpen) {
    return null
  }

  return (
    <>
      <Overlay onClick={onClickOutside} />
      <Container
        tabIndex={0}
        ref={$modalContainer}
        top={size[0]}
        left={size[1]}
        width={width || size[2]}
        height={height}
        modalHeight={$modalContainer.current && $modalContainer.current.clientHeight}
        anchorHeight={typeof size[3] === "number" && size[3]}
      >
        <ModalCard ref={ref} fullSize title={title} action={fullSize ? <NoIcon onClick={onClickOutside} /> : undefined}>
          <ModalContent actions={Boolean(actions)} anchor={Boolean(anchor)}>
            <ContentWrapper>{children}</ContentWrapper>
            {actions && <Actions childCount={actions.length}>{actions}</Actions>}
          </ModalContent>
        </ModalCard>
      </Container>
    </>
  )
}

export default React.forwardRef(Modal)
