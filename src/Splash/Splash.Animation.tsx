import * as React from "react"
import styled from "react-emotion"

export interface Props {
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

const Container = styled("div")(({ size }: { size: number }) => ({
  width: size,
  height: size,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate3d(-50%, -50%, 0)",
}))

const Box = styled("div")(({ x, y }: { x: number; y: number }) => ({
  position: "absolute",
  transition: "all 0.5s ease-in-out",
  top: `calc(${(x / (squares - 1)) * 100}% + 4px)`,
  left: `calc(${(y / (squares - 1)) * 100}% + 4px)`,
  borderRadius: 6,
  width: `calc(${100 / (squares - 1)}% - 8px)`,
  height: `calc(${100 / (squares - 1)}% - 8px)`,
  backgroundColor: "rgba(255, 255, 255, 0.06)",
}))

class Animation extends React.Component<Props, State> {
  public state = {
    animationStep: 0,
    coordinates: Array.apply(null, { length: boxes })
      .map(Number.call, Number)
      .map(() => ({ x: integerRandom(squares), y: integerRandom(squares) })),
  }

  public animationInterval?: number

  // Shift the coordinate of every third tile in a random direction.
  // Each animation shifts a different set of tiles.
  public shiftSomeTiles() {
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

  public componentDidMount() {
    this.animationInterval = setInterval(this.shiftSomeTiles.bind(this), 5000)
  }

  public componentWillUnmount() {
    clearInterval(this.animationInterval)
  }

  public render() {
    const size = this.props.size || 600
    return (
      <Container size={size}>
        {this.state.coordinates.map((coord: { x: number; y: number }, index: number) => (
          <Box key={index} x={coord.x} y={coord.y} />
        ))}
      </Container>
    )
  }
}

export default Animation
