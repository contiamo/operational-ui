import * as React from "react"

import { expandColor } from "../utils/constants"
import styled from "../utils/styled"
import Animation from "./Splash.Animation"
import OperationalLogo from "./Splash.Logo"

export interface SplashProps {
  /** The title of the project */
  title: string
  /** Actions displayed below the title, typically a fragment of `<Button/>` elements */
  actions: React.ReactNode
  /** Main content */
  children: React.ReactNode
  /** Backdrop color, dark enough to support white text as in the example. */
  color?: string
}

export interface State {
  rotation: number
  animationSize: number
}

const Container = styled("div")<{ color_?: string }>`
  z-index: 10000;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
  ${({ color_, theme }) => `
      background-color: ${expandColor(theme, color_) || theme.color.primary};
  `};
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

class Splash extends React.Component<SplashProps, Readonly<State>> {
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
      <Container color_={this.props.color}>
        <Animation size={this.state.animationSize} />
        <Content>
          <TitleBar>
            <OperationalLogo size={110} rotation={this.state.rotation} />
            <TitleBarContent>
              <h1>{this.props.title}</h1>
              <div>{this.props.actions}</div>
            </TitleBarContent>
          </TitleBar>
          <Static>{this.props.children}</Static>
        </Content>
      </Container>
    )
  }
}

export default Splash
