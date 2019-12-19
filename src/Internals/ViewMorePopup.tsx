import { keyframes } from "@emotion/core"
import styled from "../utils/styled"
import { customScrollbar } from "../utils"

export const ViewMoreToggle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`

const animateIn = keyframes`
from {
  opacity: 0;
  transform: translateY(-16px);
}
to {
  opacity: 1;
  transform: none;
}
`

export const ViewMorePopup = styled.div<{ top: number; left: number; padding?: number }>`
  position: fixed;
  padding: ${({ theme, padding }) => (padding !== undefined ? padding : theme.space.content)}px;
  font-family: ${({ theme }) => theme.font.family.code};
  max-height: 50vh;
  max-width: 50vw;
  word-wrap: break-word;
  word-break: break-all;
  hyphens: auto;
  overflow: auto;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background: ${({ theme }) => theme.color.white};
  box-shadow: ${({ theme }) => theme.shadows.popup};
  animation: ${animateIn} 0.15s ease forwards;

  ${customScrollbar}

  ${({ left }) =>
    window.innerWidth - left > 0.5 * window.innerWidth ? `left: ${left}` : `right: ${window.innerWidth - left}`}px;
  ${({ top }) =>
    window.innerHeight - top > 0.5 * window.innerHeight ? `top: ${top}` : `bottom: ${window.innerHeight - top}`}px;
`
