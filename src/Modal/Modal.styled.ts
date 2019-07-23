import isNumber from "lodash/isNumber"

import styled from "../utils/styled"
import Card from "../Card/Card"
import { customScrollbar } from "../utils"
import { cardHeaderHeight } from "../Internals/CardHeader"
import { Top, Left, Width, Height, ModalProps } from "./Modal"
import { getTop } from "./Modal.util"

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndex.modal - 1};
`

export const Container = styled("div", { shouldForwardProp: prop => !["width", "height"].includes(prop) })<{
  top: Top
  left: Left
  width: Width
  height: Height
}>`
  position: fixed;
  margin: 0 auto;
  box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.32);
  top: ${({ top, theme, height }) =>
    `calc(${getTop({ top, theme, height: isNumber(height) ? height : 0 })}px + ${theme.space.content}px)`};
  left: ${({ left, theme }) => `calc(${left}px + ${theme.space.content}px)`};
  right: ${({ left }) => (left ? "auto" : 0)};
  width: ${({ width, theme }) =>
    width === "max-content" ? "max-content" : `calc(${width}px - ${theme.space.content * 2}px)`};
  max-width: calc(100vw - ${({ theme }) => theme.space.element}px);
  height: ${({ height, theme }) => (height === "auto" ? "auto" : `calc(${height}px - ${theme.space.content * 2}px)`)};
  max-height: calc(100vh - ${({ theme }) => theme.space.content * 2}px);
  z-index: ${({ theme }) => theme.zIndex.modal};

  :focus {
    outline: none;
  }
`

export const ModalCard = styled(Card)`
  width: 100%;
  height: 100%;
`

export const ModalContent = styled.div<{ anchor: boolean; height: ModalProps["height"] }>`
  display: grid;
  grid-template-rows: auto max-content;
  height: ${({ height }) => height || "100%"};
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
