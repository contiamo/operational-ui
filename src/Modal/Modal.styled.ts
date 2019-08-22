import styled from "../utils/styled"
import Card from "../Card/Card"
import { customScrollbar } from "../utils"
import { cardHeaderHeight } from "../Internals/CardHeader"
import { Top, Left, Width, Height } from "./Modal"
import { getTop, getContainerHeight } from "./Modal.util"

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndex.modal - 1};
`

// We use styled("div") here to filter out `height` and `width` props.
export const Container = styled("div", {
  shouldForwardProp: prop => !["width", "height", "top", "left", "modalHeight", "anchorHeight"].includes(prop),
})<{
  top: Top
  left: Left
  width: Width
  height: Height
  modalHeight: number | null
  anchorHeight: number | false
}>`
  position: fixed;
  margin: 0 auto;
  box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.32);
  top: ${({ top, theme, anchorHeight }) =>
    `calc(${getTop({ top, theme, height: anchorHeight || 0 })}px + ${theme.space.content}px)`};
  left: ${({ left }) => `${left}px`};
  right: ${({ left }) => (left ? "auto" : 0)};
  width: ${({ width, theme }) =>
    width === "max-content" ? "max-content" : `calc(${width}px - ${theme.space.content * 2}px)`};
  max-width: calc(100vw - ${({ left, theme }) => theme.space.content * 2 /* <- two sides */ + left}px);
  height: ${getContainerHeight};
  max-height: calc(100vh - ${({ theme }) => theme.space.content * 2}px);
  z-index: ${({ theme }) => theme.zIndex.modal};

  min-width: 480px;
  border-radius: 4px;

  :focus {
    outline: none;
  }
`

export const ModalCard = styled(Card)`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`

export const ModalContent = styled.div<{ anchor: boolean; actions: boolean }>`
  display: grid;
  grid-template-rows: ${({ actions }) => (actions ? "minmax(auto, 100%) max-content" : "auto")};
  height: 100%;
  max-height: calc(
    /* card title + bottom padding + bottom margin + border */ 100vh -
      ${({ theme }) => cardHeaderHeight + theme.space.element + theme.space.element + theme.space.element + 1}px
  );
  overflow: auto;
  row-gap: ${({ theme }) => theme.space.element}px;

  ${({ theme }) => customScrollbar({ theme })};
`

export const Actions = styled.div<{ childCount: number }>`
  display: grid;
  grid-template-columns: ${({ childCount }) => `repeat(${childCount}, max-content)`};
  margin-top: auto;
`

export const ContentWrapper = styled.div`
  overflow: auto;
  height: 100%;
  ${({ theme }) => customScrollbar({ theme })}
`
