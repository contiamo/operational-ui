import { keyframes } from "@emotion/core"
import * as React from "react"
import { Icon } from "../"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface ProgressProps extends DefaultProps {
  /** Show an error instead of the progress */
  error?: string
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
    position: "absolute",
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

const Bar = styled("div")<{ isError: boolean }>(({ theme, isError }) => ({
  width: "100%",
  height: 3,
  backgroundColor: theme.color.primary,
  ...(isError
    ? {
        backgroundColor: theme.color.error,
      }
    : {
        animation: `${fillProgress} cubic-bezier(0, 0.9, 0.26, 1) forwards 20s`,
      }),
}))

const ErrorMessage = styled("div")(({ theme }) => ({
  padding: `${theme.space.small}px ${theme.space.small}px`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  textAlign: "center",
  backgroundColor: theme.color.error,
  color: theme.color.white,
}))

const Action = styled("div")(({ theme }) => ({
  opacity: 0.7,
  display: "inline-block",
  marginLeft: theme.space.content,
  userSelect: "none",
  "& > *": {
    display: "inline-block",
    verticalAlign: "middle",
  },
  "& svg": {
    width: theme.space.content,
    height: theme.space.content,
    marginRight: theme.space.base,
  },
  ":first-of-type svg": {
    width: theme.space.medium,
    height: theme.space.medium,
  },
  ":hover": {
    opacity: 1,
  },
}))

const Progress: React.SFC<ProgressProps> = ({ error, onRetry, onClose, ...props }) => (
  <Container {...props}>
    <Bar isError={Boolean(error)} />
    {error ? (
      <ErrorMessage>
        {error}
        {onRetry && (
          <Action onClick={onRetry}>
            <Icon name="Sync" />
            <span>Retry</span>
          </Action>
        )}
        {onClose && (
          <Action onClick={onClose}>
            <Icon name="No" />
            <span>Dismiss</span>
          </Action>
        )}
      </ErrorMessage>
    ) : null}
  </Container>
)

export default Progress
