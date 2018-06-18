import * as React from "react"
import styled from "react-emotion"
import { readableTextColor } from "@operational/utils"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { WithTheme, Css, CssStatic } from "../types" // Accepting top/left/right/bottom props is a bit redundant, but it makes for a nice casual API:
// <Tooltip top/>, as opposed to <Tooltip position="top"/>
// It gets translated into the Position type inside the component, so it allows for a more
// straightforward implementation.

export interface Props {
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  children?: React.ReactNode
  /** Smart-positioned tooltip, with positioning reversed so it doesn't flow out of the window's bounding box. Currently works for left and top-positioned tooltips. */

  smart?: boolean
  /** Top-positioned tooltip */

  top?: boolean
  /** Left-positioned tooltip */

  left?: boolean
  /** Right-positioned tooltip */

  right?: boolean
  /** Bottom-positioned tooltip */

  bottom?: boolean
} // bbTop is an abbreviation of boundingBoxTop

export interface State {
  bbTop: number
  bbBottom: number
  bbLeft: number
  bbRight: number
}
type Position = "top" | "left" | "right" | "bottom"
const Container = styled("div")(
  ({
    position,
    theme,
  }: {
    position: Position
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): CssStatic => {
    const backgroundColor = theme.deprecated.colors.black
    return {
      backgroundColor,
      label: "tooltip",
      ...theme.deprecated.typography.small,
      lineHeight: 1.3,
      position: "absolute",
      zIndex: theme.deprecated.baseZIndex + 101,
      width: "fit-content",
      minWidth: 80,
      maxWidth: 360,
      whiteSpace: "nowrap",
      padding: `${theme.deprecated.spacing / 3}px ${(theme.deprecated.spacing * 2) / 3}px`,
      borderRadius: 2,
      boxShadow: theme.deprecated.shadows.popup,
      ...(() => {
        if (position === "top") {
          return {
            left: "50%",
            transform: "translate3d(-50%, calc(-100% - 6px), 0)",
          }
        }

        if (position === "bottom") {
          return {
            left: "50%",
            top: "100%",
            transform: "translate3d(-50%, 6px, 0)",
          }
        }

        if (position === "left") {
          return {
            top: "50%",
            left: -6,
            transform: "translate3d(-100%, -50%, 0)",
          }
        }

        if (position === "right") {
          return {
            top: "50%",
            right: -6,
            transform: "translate3d(100%, -50%, 0)",
          }
        }

        return {}
      })(),
      color: readableTextColor(backgroundColor, ["black", "white"]),
      // This pseudo-element extends the clickable area of the far-away tooltip.
      "&::after": {
        content: "''",
        position: "absolute",
        top: 0,
        left: theme.deprecated.spacing * -2,
        display: "block",
        width: theme.deprecated.spacing * 2,
        height: "100%",
      },
      // They say behind every great tooltip is a great caret.
      "&::before": {
        content: "''",
        position: "absolute",
        zIndex: theme.deprecated.baseZIndex - 1,
        width: 0,
        height: 0,
        ...(() => {
          if (position === "top") {
            return {
              bottom: -4,
              left: `calc(50% - 6px)`,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: `6px solid ${backgroundColor}`,
            }
          }

          if (position === "bottom") {
            return {
              top: -4,
              left: `calc(50% - 6px)`,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderBottom: `6px solid ${backgroundColor}`,
            }
          }

          if (position === "left") {
            return {
              right: -4,
              top: `calc(50% - 6px)`,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: `6px solid ${backgroundColor}`,
            }
          }

          if (position === "right") {
            return {
              left: -4,
              top: `calc(50% - 6px)`,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderRight: `6px solid ${backgroundColor}`,
            }
          }

          return {}
        })(),
      },
    }
  },
)

class Tooltip extends React.Component<Props, State> {
  state = {
    bbTop: 0,
    bbLeft: 0,
    bbRight: 0,
    bbBottom: 0,
  }
  containerNode: HTMLElement

  render() {
    let position: Position = "top"

    if (this.props.left) {
      position = "left"
    }

    if (this.props.right) {
      position = "right"
    }

    if (this.props.bottom) {
      position = "bottom"
    }

    if (this.props.smart) {
      // TODO: implement bounding box checks for right- and bottom-placed tooltips.
      // This should be easier once the OperationalUI provides window dimensions in context.
      if (this.state.bbLeft < 0 && String(position) === "left") {
        position = "right"
      }

      if (this.state.bbTop < 0 && String(position) === "top") {
        position = "bottom"
      }
    }

    return (
      <Container
        className={this.props.className}
        css={this.props.css}
        position={position}
        innerRef={node => {
          this.containerNode = node
        }}
      >
        {this.props.children}
      </Container>
    )
  }

  componentDidMount() {
    const bbRect = this.containerNode.getBoundingClientRect()
    this.setState(prevState => ({
      bbTop: bbRect.top,
      bbBottom: bbRect.bottom,
      bbLeft: bbRect.left,
      bbRight: bbRect.right,
    }))
  }
}

export default Tooltip
