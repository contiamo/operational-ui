import { keyframes } from "@emotion/react"
import styled from "../utils/styled"
import { ControlledModalProps } from "./ControlledModal"

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

export const Overlay = styled("div")<{ type?: ControlledModalProps["type"] }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  animation: ${fadeIn} 0.1s ease-in;
  z-index: ${({ theme, type }) => (type === "confirm" ? theme.zIndex.confirm : theme.zIndex.modal) - 1};
`

export default Overlay
