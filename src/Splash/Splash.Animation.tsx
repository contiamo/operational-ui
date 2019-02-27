import React, { useState } from "react"
import useInterval from "../useInterval"
import useWindowSize from "../useWindowSize"
import styled from "../utils/styled"

export interface Props {
  fullscreen?: boolean
  size?: number
}

export interface State {
  animationStep: number
  coordinates: Array<{ x: number; y: number }>
}

// Number of squares in the animation grid
const squares: number = 16

// Number of animating boxes
const boxes: number = 50

// Return integer random between 0 and range - 1, boundaries included
const integerRandom = (range: number): number => {
  return Math.floor(Math.random() * range)
}

// If a coordinate falls out of the (0, n - 1) range,
// bounce it back into the animation frame.
const bounce = (coord: number): number => {
  if (coord < 0) {
    return -coord
  }
  if (coord > squares - 1) {
    return 2 * (squares - 1) - coord
  }
  return coord
}

const Container = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate3d(-50%, -50%, 0)",
})

/// Move highly highly dynamic style out of css-js to prevent uneeded classname generation

const Box = styled("div")({
  position: "absolute",
  transition: "all 0.5s ease-in-out",

  borderRadius: 6,
  width: `calc(${100 / (squares - 1)}% - 8px)`,
  height: `calc(${100 / (squares - 1)}% - 8px)`,
  backgroundColor: "rgba(255, 255, 255, 0.06)",
})

const initialState = {
  animationStep: 0,
  coordinates: Array.apply(null, Array(boxes))
    .map((_: any, i: number) => i) // Fixes typescript Error
    .map(() => ({ x: integerRandom(squares), y: integerRandom(squares) })),
}

const Animation: React.FC<Props> = ({ fullscreen, size }) => {
  let containerSize = size || 600

  if (fullscreen) {
    const windowSize = useWindowSize()
    containerSize = Math.max(windowSize.width, windowSize.height) - 20
  }

  const [state, updateAnimation] = useState<State>(initialState)
  useInterval(
    () => {
      updateAnimation({
        animationStep: state.animationStep + 1,
        coordinates: state.coordinates.map((coord: { x: number; y: number }, index: number) => {
          if (index % 3 === state.animationStep % 3) {
            const dx = integerRandom(3) - 1
            const dy = integerRandom(3) - 1
            return {
              x: bounce(coord.x + dx),
              y: bounce(coord.y - dy),
            }
          }
          return coord
        }),
      })
    },
    5000,
    true,
  )

  return (
    <Container style={{ width: containerSize, height: containerSize }}>
      {state.coordinates.map((coord: { x: number; y: number }, index: number) => (
        <Box
          key={index}
          style={{
            top: `${(coord.x / (squares - 1)) * 100}%`,
            left: `${(coord.y / (squares - 1)) * 100}%`,
          }}
        />
      ))}
    </Container>
  )
}

export default Animation
