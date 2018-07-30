import * as React from "react"
import styled from "react-emotion"

import { Button } from "../"
import Animation from "./Animation"
import OperationalLogo from "./OperationalLogo"

export interface Props {
  hide: () => void
}

export interface State {
  rotation: number
  animationSize: number
}

const Container = styled("div")`
  position: fixed;
  z-index: 10000;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  padding: 10px;
  background-color: #005f96;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
`

const Content = styled("div")`
  position: relative;
  color: #ffffff;
`

const TitleBar = styled("div")`
  max-width: 640px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const TitleBarContent = styled("div")`
  margin-left: 10px;
  & h1 {
    font-size: 40px;
    line-height: 1;
    font-weight: 400;
    margin: 0 0 15px;
  }
`

const Static = styled("div")`
  font-size: 22px;
  max-width: 640px;
  margin: 20px auto;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 20px;
  border-radius: 6px;
  & a:link,
  & a:visited {
    color: inherit;
    text-decoration: underline;
  }
  & > *:first-child {
    margin-top: 0px;
  }
  & > *:last-child {
    margin-bottom: 0px;
  }
  & p {
    line-height: 1.35;
  }
`

class Splash extends React.Component<Props, Readonly<State>> {
  public readonly state = {
    rotation: 0,
    animationSize: Math.max(window.innerWidth, window.innerHeight),
  }

  public rotationInterval?: number

  public handleResize = () => {
    this.setState({
      animationSize: Math.max(window.innerWidth, window.innerHeight) as number,
    })
  }

  public componentDidMount() {
    window.addEventListener("resize", this.handleResize)
    this.rotationInterval = window.setInterval(() => {
      this.setState(prevState => ({
        rotation: 180 - prevState.rotation,
      }))
    }, 8000)
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
    window.clearInterval(this.rotationInterval)
  }

  public render() {
    return (
      <Container>
        <Animation size={this.state.animationSize} />
        <Content>
          <TitleBar>
            <OperationalLogo size={110} rotation={this.state.rotation} />
            <TitleBarContent>
              <h1>Operational UI</h1>
              <div>
                <Button
                  onClick={() => {
                    this.props.hide()
                  }}
                >
                  Docs
                </Button>
                <Button to="https://github.com/contiamo/operational-ui/">GitHub</Button>
              </div>
            </TitleBarContent>
          </TitleBar>
          <Static>
            <p>
              Operational is a UI library optimized for day-to-day operational decision-making. It does its best when
              used for interfaces that assume familiarity through routine use, prioritizing compactness and{" "}
              {
                <a href="https://twitter.com/edwardtufte/status/450076034759524352" target="_blank">
                  small effective differences
                </a>
              }.
            </p>
            <p>It is predictable to use, and it lets you and your team breathe. Exhales, not sighs.</p>
          </Static>
        </Content>
      </Container>
    )
  }
}

export default Splash
