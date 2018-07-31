import * as React from "react"
import styled, { keyframes } from "react-emotion"
import { Icon } from "../"
import { lighten } from "../utils"

export interface Props {
  /** Show an error instead of the progress */
  error?: string
  /** Provide a button to retry the action to load */
  onRetry?: () => void
  /** OnClose callback */
  onClose?: () => void
}

const Container = styled("div")(
  {
    label: "progress",
    width: "100%",
    overflowX: "hidden",
    textAlign: "center",
    top: 0,
    left: 0,
    position: "absolute",
  },
  ({ theme }) => ({
    zIndex: theme.deprecated.baseZIndex + 300,
    backgroundColor: "transparent",
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
  backgroundColor: theme.deprecated.colors.info,
  ...(isError
    ? {
        backgroundColor: theme.deprecated.colors.error,
      }
    : {
        animation: `${fillProgress} cubic-bezier(0, 0.9, 0.26, 1) forwards 20s`,
      }),
}))

const ErrorMessage = styled("div")(({ theme }) => ({
  ...theme.deprecated.typography.body,
  padding: `${theme.deprecated.spacing / 2}px ${theme.deprecated.spacing / 2}px`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  zIndex: theme.deprecated.baseZIndex + 301,
  textAlign: "center",
  backgroundColor: lighten(theme.deprecated.colors.error, 15),
  color: theme.deprecated.colors.white,
}))

const Action = styled("div")(({ theme }) => ({
  opacity: 0.7,
  display: "inline-block",
  marginLeft: theme.deprecated.spacing,
  userSelect: "none",
  "& > *": {
    display: "inline-block",
    verticalAlign: "middle",
  },
  "& svg": {
    width: theme.deprecated.spacing,
    height: theme.deprecated.spacing,
    marginRight: theme.deprecated.spacing / 4,
  },
  // Temporary hack since feather icons for refresh and close
  // have a mismatch in size.
  ":first-of-type svg": {
    width: (theme.deprecated.spacing * 3) / 4,
    height: (theme.deprecated.spacing * 3) / 4,
  },
  ":hover": {
    opacity: 1,
  },
}))

const Progress: React.SFC<Props> = ({ error, onRetry, onClose, ...props }) => (
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
