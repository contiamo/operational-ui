import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { hexOrColor, readableTextColor } from "@operational/utils"
import { Theme } from "@operational/theme"

// Accepting top/left/right/bottom props is a bit redundant, but it makes for a nice casual API:
// <Tooltip top/>, as opposed to <Tooltip position="top"/>
// It gets translated into the Position type inside the component, so it allows for a more
// straightforward implementation.

export interface IProps {
  css?: {}
  className?: string
  children?: React.ReactNode
  top?: boolean
  left?: boolean
  right?: boolean
  bottom?: boolean
}

// bbTop is an abbreviation of boundingBoxTop
export interface IState {
  bbTop: number
  bbBottom: number
  bbLeft: number
  bbRight: number
}

type Position = "top" | "left" | "right" | "bottom"

const Container = glamorous.div(({ position, theme }: { position: Position; theme: Theme }): {} => {
  const backgroundColor = theme.colors.black
  return {
    backgroundColor,
    label: "tooltip",
    ...theme.typography.small,
    position: "absolute",
    zIndex: theme.baseZIndex + 101,
    width: "fit-content",
    maxWidth: 200,
    opacity: 1, // Initially, they're hidden...
    transition: ".07s opacity ease", // ...for 0.07 seconds.
    padding: `${theme.spacing / 3}px ${theme.spacing * 2 / 3}`,
    borderRadius: 2,
    wordWrap: "break-word",
    boxShadow: theme.shadows.popup,
    ...(() => {
      if (position === "top") {
        return {
          left: "50%",
          transform: "translate3d(-50%, calc(-100% - 6px), 0)"
        }
      }
      if (position === "bottom") {
        return {
          left: "50%",
          top: "100%",
          transform: "translate3d(-50%, 6px, 0)"
        }
      }
      if (position === "left") {
        return {
          top: "50%",
          left: -6,
          transform: "translate3d(-100%, -50%, 0)"
        }
      }
      if (position === "right") {
        return {
          top: "50%",
          right: -6,
          transform: "translate3d(100%, -50%, 0)"
        }
      }
      return {}
    })(),
    color: readableTextColor(backgroundColor)(["black", "white"]),

    // This pseudo-element extends the clickable area of the far-away tooltip.
    "&::after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: theme.spacing * -2,
      display: "block",
      width: theme.spacing * 2,
      height: "100%"
    },

    // They say behind every great tooltip is a great caret.
    "&::before": {
      content: "''",
      position: "absolute",
      zIndex: theme.baseZIndex - 1,
      width: 0,
      height: 0,
      ...(() => {
        if (position === "top") {
          return {
            bottom: -4,
            left: `calc(50% - 6px)`,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: `6px solid ${backgroundColor}`
          }
        }
        if (position === "bottom") {
          return {
            top: -4,
            left: `calc(50% - 6px)`,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: `6px solid ${backgroundColor}`
          }
        }
        if (position === "left") {
          return {
            right: -4,
            top: `calc(50% - 6px)`,
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",
            borderLeft: `6px solid ${backgroundColor}`
          }
        }
        if (position === "right") {
          return {
            left: -4,
            top: `calc(50% - 6px)`,
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",
            borderRight: `6px solid ${backgroundColor}`
          }
        }
        return {}
      })()
    }
  }
})

export default class Tooltip extends React.Component<IProps, IState> {
  state = {
    bbTop: 0,
    bbLeft: 0,
    bbRight: 0,
    bbBottom: 0
  }
  containerNode: HTMLElement
  render() {
    console.log(this.state)
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
      top: bbRect.top,
      bottom: bbRect.bottom,
      left: bbRect.left,
      right: bbRect.right
    }))
  }
}
