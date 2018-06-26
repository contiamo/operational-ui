import * as React from "react"
import styled from "react-emotion"
import { Theme } from "@operational/theme"

export interface Props {
  size?: number
}

export interface State {
  animationStep: number
  coordinates: { x: number; y: number }[]
}

// Number of squares in the animation grid
const n: number = 10

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
  if (coord > n - 1) {
    return 2 * n - 2 - coord
  }
  return coord
}

const Container = styled("div")(({ size }: { size: number }) => ({
  width: size,
  height: size,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate3d(-50%, -50%, 0)",
}))

const Box = styled("div")(({ n, x, y }: { n: number; x: number; y: number }) => ({
  position: "absolute",
  transition: "all 0.5s ease-in-out",
  top: `calc(${(x / (n - 1)) * 100}% + 4px)`,
  left: `calc(${(y / (n - 1)) * 100}% + 4px)`,
  borderRadius: 6,
  width: `calc(${100 / (n - 1)}% - 8px)`,
  height: `calc(${100 / (n - 1)}% - 8px)`,
  backgroundColor: "rgba(255, 255, 255, 0.06)",
}))

class Animation extends React.Component<Props, State> {
  state = {
    animationStep: 0,
    coordinates: Array.apply(null, { length: 30 })
      .map(Number.call, Number)
      .map((i: number) => ({ x: integerRandom(n), y: integerRandom(n) })),
  }

  animationInterval: any

  // Shift the coordinate of every third tile in a random direction.
  // Each animation shifts a different set of tiles.
  shiftSomeTiles() {
    this.setState(prevState => ({
      animationStep: prevState.animationStep + 1,
      coordinates: prevState.coordinates.map((coord: { x: number; y: number }, index: number) => {
        if (index % 3 === prevState.animationStep % 3) {
          const dx = integerRandom(3) - 1
          const dy = integerRandom(3) - 1
          return {
            x: bounce(coord.x + dx),
            y: bounce(coord.y - dy),
          }
        }
        return coord
      }),
    }))
  }

  componentDidMount() {
    this.animationInterval = setInterval(this.shiftSomeTiles.bind(this), 5000)
  }

  componentWillUnmount() {
    clearInterval(this.animationInterval)
  }

  render() {
    const size = this.props.size || 600
    return (
      <Container size={size}>
        {this.state.coordinates.map((coord: { x: number; y: number }, index: number) => (
          <Box key={index} n={n} x={coord.x} y={coord.y} />
        ))}
      </Container>
    )
  }
}

export default Animation
