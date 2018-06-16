import * as React from "react"
import * as ReactFeather from "react-feather"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme, expandColor } from "@operational/theme"
import { WithTheme, Css, CssStatic } from "../types"
export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */

  css?: Css
  className?: string
  /** Content */

  children?: React.ReactNode
  /** Color */

  color?: string
}
const StatusContainer = styled("div")(
  {
    border: "2px solid transparent",
    borderRadius: "50%",
    height: 11,
    position: "absolute",
    top: 6,
    width: 11,
  },
  ({ theme, color }: { theme?: OperationalStyleConstants & { deprecated: Theme }; color?: string }): CssStatic => {
    return {
      backgroundColor: expandColor(theme.deprecated, color) || theme.deprecated.colors.info,
    }
  },
)
const Content = styled("div")(
  {
    padding: "0 0 5px 26px",
    position: "relative",
    top: 0,
    "& > *": {
      margin: 0,
    },
    "& p": {
      marginBottom: 0,
    },
  },
  ({ theme }: WithTheme): CssStatic => ({
    ...theme.deprecated.typography.body,
  }),
)
const Container = styled("li")(
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
      height: "100%",
    },
    "&:last-child::before": {
      display: "none",
    },
  },
  ({ theme }: WithTheme): CssStatic => ({
    paddingBottom: theme.deprecated.spacing,
    "&::before": {
      borderLeft: `1px solid ${theme.deprecated.colors.separator}`,
    },
  }),
)

const TimelineItem = ({ css, id, className, children, color = "info" }: Props) => {
  return (
    <Container id={id} css={css} className={className}>
      <StatusContainer color={color} />
      <Content>{children}</Content>
    </Container>
  )
}

export default TimelineItem
