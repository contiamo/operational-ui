import * as React from "react"
import { Div } from "glamorous"
import { Theme } from "@operational/theme"

const n: number = 10

export interface Props {
  css?: {}
}

export interface State {
  animationStep: number
  coordinates: { x: number; y: number }[]
}

const integerRandom = (range: number): number => {
  return Math.floor(Math.random() * range)
}

const bounce = (coord: number): number => {
  if (coord < 0) {
    return -coord
  }
  if (coord > n - 1) {
    return 2 * n - 2 - coord
  }
  return coord
}

class Animation extends React.Component<Props, State> {
  state = {
    animationStep: 0,
    coordinates: Array.apply(null, { length: 30 })
      .map(Number.call, Number)
      .map((i: number) => ({ x: integerRandom(n), y: integerRandom(n) }))
  }

  animationInterval: any

  shuffle() {
    this.setState(prevState => ({
      animationStep: prevState.animationStep + 1,
      coordinates: prevState.coordinates.map((coord: { x: number; y: number }, index: number) => {
        if (index % 3 === prevState.animationStep % 3) {
          const dx = integerRandom(3) - 1
          const dy = integerRandom(3) - 1
          return {
            x: bounce(coord.x + dx),
            y: bounce(coord.y - dy)
          }
        }
        return coord
      })
    }))
  }

  componentDidMount() {
    this.animationInterval = setInterval(this.shuffle.bind(this), 5000)
  }

  componentWillUnmount() {
    clearInterval(this.animationInterval)
  }

  render() {
    return (
      <Div
        css={{
          ...(this.props.css || {}),
          width: 600,
          height: 600
        }}
      >
        {this.state.coordinates.map((coord: { x: number; y: number }, index: number) => (
          <Div
            key={index}
            css={{
              position: "absolute",
              transition: "all 0.5s ease-in-out",
              top: `calc(${coord.x / (n - 1) * 100}% + 2px)`,
              left: `calc(${coord.y / (n - 1) * 100}% + 2px)`,
              borderRadius: 3,
              width: `calc(${100 / (n - 1)}% - 4px)`,
              height: `calc(${100 / (n - 1)}% - 4px)`,
              backgroundColor: "rgba(255, 255, 255, 0.06)"
            }}
          />
        ))}
      </Div>
    )
  }
}

export default Animation
