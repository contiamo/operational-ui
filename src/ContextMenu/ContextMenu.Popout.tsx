import * as React from "react"
import { createPortal } from "react-dom"

import styled from "../utils/styled"
import { ContextMenuProps } from "./ContextMenu"
import useSticky from "../useSticky/useSticky"
import { isRefRefObject } from "../utils/isRefRefObject"

export interface ContextMenuPopoutProps {
  embedChildrenInMenu?: ContextMenuProps["embedChildrenInMenu"]
  align: ContextMenuProps["align"]
  condensed: ContextMenuProps["condensed"]
  rowHeight: number
  anchored: boolean
  container?: React.RefObject<HTMLDivElement>
  children?: React.ReactNode
}

interface PositionProps {
  left: string
  top: string
  position: string
  width?: string
}

const Container = styled.div<ContextMenuPopoutProps & PositionProps>`
  label: ContextMenuPopout;
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  max-height: 50vh;
  overflow: auto;
  box-shadow: ${({ theme }) => theme.shadows.contextMenu};
  width: ${({ width }) => width};
  max-width: 90vw;
  min-height: ${({ rowHeight }) => rowHeight}px;
  background-color: ${({ theme }) => theme.color.white};
  padding: ${({ theme }) => theme.space.small}px 0;
  display: inline-flex;
  width: auto;
  flex-direction: column;

  ${({ theme, anchored }) => (anchored ? "" : `z-index: ${theme.zIndex.selectOptions + 2};`)}
`

const ContextMenuPopout = React.forwardRef<HTMLDivElement, ContextMenuPopoutProps & { width?: number }>(
  (
    { align, children, condensed, container, embedChildrenInMenu, rowHeight, anchored, width: propsWidth },
    forwardRef,
  ) => {
    const $fallback = React.useRef<HTMLDivElement | null>(null)
    const $el = isRefRefObject(forwardRef) ? forwardRef : $fallback

    const initialValue = {
      position: "absolute",
      left: align === "left" ? "0" : "auto",
      top: embedChildrenInMenu ? "0" : "100%",
      width: propsWidth ? `${propsWidth}px` : "100%",
    } as const

    const { left, position, top, width } = useSticky({
      $el: $el,
      initialValue,
    })

    const areWeFixedYet = position === "fixed"

    const popOut = (
      <Container
        align={align}
        condensed={condensed}
        rowHeight={rowHeight}
        anchored={anchored}
        left={anchored ? initialValue.left : left}
        width={anchored ? initialValue.width : width}
        top={anchored ? initialValue.top : top}
        position={anchored ? initialValue.position : position}
        ref={$el}
        role="listbox"
      >
        {children}
      </Container>
    )

    return !anchored && areWeFixedYet && container && container.current
      ? createPortal(popOut, container.current)
      : popOut
  },
)

export default ContextMenuPopout
