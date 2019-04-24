import * as React from "react"

import { DefaultProps } from "../types"
import useWindowSize from "../useWindowSize"
import styled from "../utils/styled"
import Container, { Position } from "./Tooltip.Container"

/**
 * In order to allow for tooltips that have a sensible max-width that adjusts its width for shorter text,
 * and in order to have that working reliably across browsers, this implementation renders the tooltip offscreen
 * in order to determine how wide it would be were it to not do line breaks at any width.
 * The actual tooltip is rendered with this information extracted from the DOM node.
 */

export interface BaseProps extends DefaultProps {
  className?: string
  children?: React.ReactNode
  /** Smart-positioned tooltip, with positioning reversed so it doesn't flow out of the window's bounding box. Currently works for left and top-positioned tooltips. */
  smart?: boolean
  textId?: string
}

export interface TopProps extends BaseProps {
  /** Top-positioned tooltip */
  top?: boolean
  /** Left-positioned tooltip */
  left?: never
  /** Right-positioned tooltip */
  right?: never
  /** Bottom-positioned tooltip */
  bottom?: never
}

export interface SmartProps extends BaseProps {
  /** Top-positioned tooltip */
  top?: never
  /** Left-positioned tooltip */
  left?: never
  /** Right-positioned tooltip */
  right?: never
  /** Bottom-positioned tooltip */
  bottom?: never
}

export interface LeftProps extends BaseProps {
  /** Top-positioned tooltip */
  top?: never
  /** Left-positioned tooltip */
  left?: boolean
  /** Right-positioned tooltip */
  right?: never
  /** Bottom-positioned tooltip */
  bottom?: never
}

export interface RightProps extends BaseProps {
  /** Top-positioned tooltip */
  top?: never
  /** Left-positioned tooltip */
  left?: never
  /** Right-positioned tooltip */
  right?: boolean
  /** Bottom-positioned tooltip */
  bottom?: never
}

export interface BottomProps extends BaseProps {
  /** Top-positioned tooltip */
  top?: never
  /** Left-positioned tooltip */
  left?: never
  /** Right-positioned tooltip */
  right?: never
  /** Bottom-positioned tooltip */
  bottom?: boolean
}

export type TooltipProps = TopProps | LeftProps | RightProps | BottomProps | SmartProps

interface State {
  // bbTop is an abbreviation of boundingBoxTop
  bbTop: number
  bbBottom: number
  bbLeft: number
  bbRight: number
  singleLineTextWidth: number
}

const getPosition = (props: TooltipProps) => {
  let position = "right" as Position

  if (props.left) {
    position = "left"
  }
  if (props.right) {
    position = "right"
  }
  if (props.bottom) {
    position = "bottom"
  }
  if (props.top) {
    position = "top"
  }

  return position
}

const getDisplayPosition = (windowSize: { width: number; height: number }, state: State, props: TooltipProps) => {
  let position = getPosition(props)

  /** Swap the positions of tooltips in case they are clipped in this particular viewport */
  if (props.smart) {
    if (state.bbLeft < 0 && position === "left") {
      position = "right"
    }
    if (state.bbTop < 0 && position === "top") {
      position = "bottom"
    }
    if (state.bbRight > windowSize.width && position === "right") {
      position = "left"
    }
    if (state.bbBottom > windowSize.height && position === "bottom") {
      position = "top"
    }
  }

  return position
}

/*
 * This class name is used as a selector when customizing the opacity for tooltips
 * that are only displayed when a particular parent of theirs is hovered.
 * The pattern replaces the https://emotion.sh/docs/babel#components-as-selectors
 * pattern to remove the need for babel plugin dependancy in projects that rely on
 * this library.
 */
export const dangerousTooltipContainerClassName = "operational-ui-tooltip"

const SizeRestriction = styled("div")`
  max-height: 80vh;
  max-width: 80vw;
  overflow: auto;
  width: fit-content;
  height: 100%;

  img {
    max-width: 100%;
  }

  p {
    font-size: ${({ theme }) => theme.font.size.tiny}px;
    line-height: 1.3;
    margin: 0;
    padding: 2px 6px;
    text-align: center;
  }
`

const Tooltip: React.SFC<TooltipProps> = props => {
  const containerNode = React.useRef<HTMLDivElement>(null)
  const offScreenWidthTestNode = React.useRef<HTMLDivElement>(null)
  const [state, setState] = React.useState<State>({
    bbTop: 0,
    bbLeft: 0,
    bbRight: 0,
    bbBottom: 0,
    singleLineTextWidth: 0,
  })

  React.useEffect(() => {
    if (!offScreenWidthTestNode.current || !containerNode.current) {
      return
    }

    const bbOffScreen = offScreenWidthTestNode.current.getBoundingClientRect()
    const bbRect = containerNode.current.getBoundingClientRect()
    setState({
      bbTop: bbRect.top,
      bbBottom: bbRect.bottom,
      bbLeft: bbRect.left,
      bbRight: bbRect.right,
      singleLineTextWidth: bbOffScreen.width,
    })
  }, [])

  const windowSize = useWindowSize()
  const displayPosition = getDisplayPosition(windowSize, state, props)

  return (
    <>
      {/* Test node rendered to determine how wide the text is if it were written in a single line.
       * Note that the position is set arbitrarily since it does not influence text width.
       */}
      <Container
        position="bottom"
        offScreenWidthTest
        singleLineTextWidth={state.singleLineTextWidth}
        ref={offScreenWidthTestNode}
      >
        {/* Wrapping in a paragraph tag is necessary in order to have Safari read the correct single line width. */}
        <p>{props.children}</p>
      </Container>
      <Container
        role="tooltip"
        className={dangerousTooltipContainerClassName}
        singleLineTextWidth={state.singleLineTextWidth}
        position={displayPosition}
        ref={containerNode}
      >
        <SizeRestriction>
          {/* Wrapping in a paragraph tag is necessary in order to have Safari read the correct single line width. */}
          <p id={props.textId}>{props.children}</p>
        </SizeRestriction>
      </Container>
    </>
  )
}

export default Tooltip
