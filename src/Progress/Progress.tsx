import { keyframes } from "@emotion/core"
import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface ProgressProps extends DefaultProps {
  /** Provide a button to retry the action to load */
  onRetry?: () => void
  /** OnClose callback */
  onClose?: () => void
  /** Show progress bar on the bottom? */
  bottom?: boolean
}

const Container = styled("div")<ProgressProps>(
  {
    label: "progress",
    width: "100%",
    overflowX: "hidden",
    textAlign: "center",
    left: 0,
    position: "fixed",
    backgroundColor: "transparent",
  },
  ({ theme, bottom }) => ({
    zIndex: theme.zIndex.globalProgress,
    top: bottom ? "auto" : 0,
    bottom: bottom ? 0 : "auto",
  }),
)

const fillProgress = keyframes({
  from: {
    transform: "translate3d(-100%, 0, 0)",
  },
  to: {
    transform: "translate3d(0, 0, 0)",
  },
})

const Bar = styled("div")(({ theme }) => ({
  width: "100%",
  height: 3,
  backgroundColor: theme.color.primary,
  animation: `${fillProgress} cubic-bezier(0, 0.9, 0.26, 1) forwards 20s`,
}))

const Progress: React.SFC<ProgressProps> = ({ onRetry, onClose, ...props }) => (
  <Container {...props}>
    <Bar />
  </Container>
)

export default Progress
