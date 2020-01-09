import { css } from "@emotion/react"

import styled from "../utils/styled"
import { TooltipProps } from "./Tooltip"

const caretSize = 6

const getCaretPosition = ({ position }: { position: TooltipProps["position"] }) => {
  switch (position) {
    case "top":
      return css`
        top: 100%;
        left: 0;
        right: 0;
        margin: 0 auto;
      `
    case "right":
      return css`
        top: 50%;
        left: ${caretSize * -2}px;
        transform: translateY(-50%);
      `
    case "bottom":
      return css`
        top: ${caretSize * -2}px;
        left: 0;
        right: 0;
        margin: 0 auto;
      `
    case "left":
      return css`
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
      `
  }
}

const Container = styled.div<{ top: number; left: number; position: TooltipProps["position"]; visible: boolean }>`
  position: fixed;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  padding: ${({ theme }) => theme.space.base}px ${({ theme }) => theme.space.small}px;
  background-color: ${({ theme }) => theme.color.primaryDark};
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.font.size.fineprint}px;
  border-radius: 2px;
  white-space: pre;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  transform: ${({ position }) => {
    switch (position) {
      case "top":
        return "translate(-50%, -100%)"
      case "bottom":
        return "translateX(-50%)"
      case "left":
        return "translate(-100%, -50%)"
      case "right":
        return `translateY(-50%)`
    }
  }};

  /* Caret */
  ::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border: ${caretSize}px solid transparent;
    ${({ theme, position }) => `border-${position}-color: ${theme.color.primaryDark}`};
    ${getCaretPosition}
  }
`

export default Container
