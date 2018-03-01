import * as React from "react"
import * as ReactFeather from "react-feather"
import glamorous, { GlamorousComponent, withTheme } from "glamorous"
import { Theme, expandColor } from "@operational/theme"

export interface Props {
  id?: string | number
  css?: {}
  className?: string
  children?: React.ReactNode
  color?: string
}

const StatusContainer = glamorous.div(
  {
    border: "2px solid transparent",
    borderRadius: "50%",
    height: 11,
    position: "absolute",
    top: 6,
    width: 11
  },
  ({ theme, color }: { theme: Theme; color?: string }) => {
    return {
      backgroundColor: expandColor(theme, color) || theme.colors.info
    }
  }
)

const Content = glamorous.div(
  {
    padding: "0 0 5px 26px",
    position: "relative",
    top: 0,
    "& > *": {
      margin: 0
    },
    "& p": {
      marginBottom: 0
    }
  },
  ({ theme }: { theme: Theme }): {} => ({
    ...theme.typography.body
  })
)

const Container = glamorous.li(
  {
    label: "timelineitem",
    listStyle: "none",
    margin: 0,
    position: "relative",
    "&::before": {
      content: "' '",
      position: "absolute",
      left: 5,
      top: 6,
      height: "100%"
    },
    "&:last-child::before": {
      display: "none"
    }
  },
  ({ theme }: { theme: Theme }): {} => ({
    paddingBottom: theme.spacing,
    "&::before": {
      borderLeft: `1px solid ${theme.colors.separator}`
    }
  })
)

const TimelineItem = ({ css, id, className, children, color = "info" }: Props) => {
  return (
    <Container key={id} css={css} className={className}>
      <StatusContainer color={color} />
      <Content>{children}</Content>
    </Container>
  )
}

export default TimelineItem
