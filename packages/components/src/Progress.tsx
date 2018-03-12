import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { css } from "glamor"
import { Theme } from "@operational/theme"

import Icon from "./Icon"

export interface Props {
  id?: string | number
  css?: any
  className?: string
  error?: string
  onRetry?: () => void
  fadeParent?: boolean
}

const width: number = 120
const height: number = 45
const padding: number = 15

const Container = glamorous.div(
  {
    label: "progress",
    width: "100%",
    overflow: "hidden",
    top: 0,
    left: 0,
    position: "absolute"
  },
  ({ theme, fadeParent }: { theme: Theme; fadeParent: boolean }) => ({
    zIndex: theme.baseZIndex + 300,
    backgroundColor: fadeParent ? "rgba(255, 255, 255, 0.8)" : "transparent"
  })
)

const fillProgress = css.keyframes({
  from: {
    transform: "translate3d(-100%, 0, 0)"
  },
  to: {
    transform: "translate3d(0, 0, 0)"
  }
})

const Bar = glamorous.div(({ theme, isError }: { theme?: Theme; isError: boolean }) => ({
  width: "100%",
  height: 2,
  backgroundColor: theme.colors.info,
  ...isError
    ? {
        backgroundColor: theme.colors.error
      }
    : {
        animation: `${fillProgress} cubic-bezier(0, 0.9, 0.26, 1) forwards 20s`
      }
}))

const ErrorMessage = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  minWidth: 160,
  ...theme.typography.body,
  padding: `${theme.spacing / 6}px ${theme.spacing / 2}px`,
  position: "absolute",
  borderBottomLeftRadius: 2,
  borderBottomRightRadius: 2,
  top: 2,
  left: "50%",
  textAlign: "center",
  transform: "translate3d(-50%, 0, 0)",
  backgroundColor: theme.colors.error,
  color: theme.colors.white
}))

const RetryLink = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  opacity: 0.7,
  display: "inline-block",
  marginLeft: theme.spacing * 3 / 4,
  userSelect: "none",
  "& svg": {
    marginRight: theme.spacing / 3
  },
  ":hover": {
    opacity: 1
  }
}))

const Progress = (props: Props) => (
  <Container key={props.id} css={props.css} className={props.className} fadeParent={!!props.fadeParent}>
    <Bar isError={Boolean(props.error)} />
    {props.error ? (
      <ErrorMessage>
        {props.error}
        {props.onRetry ? (
          <RetryLink onClick={props.onRetry}>
            <Icon name="RefreshCw" size={10} />
            Retry
          </RetryLink>
        ) : null}
      </ErrorMessage>
    ) : null}
  </Container>
)

export default Progress
