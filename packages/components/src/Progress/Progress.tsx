import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { css } from "glamor"
import { Theme } from "@operational/theme"
import { lighten } from "@operational/utils"

import { WithTheme, Css, CssStatic } from "../types"
import { Icon } from "../"

export interface Props {
  id?: string
  css?: Css
  className?: string
  /** Show an error instead of the progress */
  error?: string
  /** Provide a button to retry the action to load */
  onRetry?: () => void
  /** OnClose callback */
  onClose?: () => void
}

const width = 120
const height = 45
const padding = 15

const Container = glamorous.div(
  {
    label: "progress",
    width: "100%",
    overflowX: "hidden",
    textAlign: "center",
    top: 0,
    left: 0,
    position: "absolute",
  },
  ({ theme }: { theme: Theme }): CssStatic => ({
    zIndex: theme.baseZIndex + 300,
    backgroundColor: "transparent",
  })
)

const fillProgress = css.keyframes({
  from: {
    transform: "translate3d(-100%, 0, 0)",
  },
  to: {
    transform: "translate3d(0, 0, 0)",
  },
})

const Bar = glamorous.div(({ theme, isError }: { theme?: Theme; isError: boolean }): CssStatic => ({
  width: "100%",
  height: 3,
  backgroundColor: theme.colors.info,
  ...isError
    ? {
        backgroundColor: theme.colors.error,
      }
    : {
        animation: `${fillProgress} cubic-bezier(0, 0.9, 0.26, 1) forwards 20s`,
      },
}))

const ErrorMessage = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  ...theme.typography.body,
  padding: `${theme.spacing / 2}px ${theme.spacing / 2}px`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  zIndex: theme.baseZIndex + 301,
  textAlign: "center",
  backgroundColor: lighten(theme.colors.error, 15),
  color: theme.colors.white,
}))

const Action = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  opacity: 0.7,
  display: "inline-block",
  marginLeft: theme.spacing,
  userSelect: "none",
  "& > *": {
    display: "inline-block",
    verticalAlign: "middle",
  },
  "& svg": {
    width: theme.spacing,
    height: theme.spacing,
    marginRight: theme.spacing / 4,
  },
  // Temporary hack since feather icons for refresh and close
  // have a mismatch in size.
  ":first-of-type svg": {
    width: theme.spacing * 3 / 4,
    height: theme.spacing * 3 / 4,
  },
  ":hover": {
    opacity: 1,
  },
}))

const Progress: React.SFC<Props> = props => (
  <Container id={props.id} css={props.css} className={props.className}>
    <Bar isError={Boolean(props.error)} />
    {props.error ? (
      <ErrorMessage>
        {props.error}
        {props.onRetry && (
          <Action onClick={props.onRetry}>
            <Icon name="RefreshCw" />
            <span>Retry</span>
          </Action>
        )}
        {props.onClose && (
          <Action onClick={props.onClose}>
            <Icon name="X" />
            <span>Dismiss</span>
          </Action>
        )}
      </ErrorMessage>
    ) : null}
  </Container>
)

export default Progress
