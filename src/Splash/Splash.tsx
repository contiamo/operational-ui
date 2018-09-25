import * as React from "react"

import { readableTextColor } from "../utils"
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
  color: string
  /* Splash Logo */
  logo?: React.ReactElement<any>
  /* Size of splash logo */
  logoSize: number
}

export interface State {
  animationSize: number
}

const Container = styled("div")<{ color: string }>`
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
  ${({ color }) => `
      background-color: ${color};
  `};
`

const Content = styled("div")<{ color: string }>`
  position: relative;
  ${({ color }) => `
    color: ${readableTextColor(color, ["#000", "#FFF"])};
  `};
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
    animationSize: Math.max(window.innerWidth, window.innerHeight),
  }

  public static defaultProps = {
    logoSize: 110,
    color: "#fff",
  }

  public handleResize = () => {
    this.setState({
      animationSize: Math.max(window.innerWidth, window.innerHeight) as number,
    })
  }

  public componentDidMount() {
    window.addEventListener("resize", this.handleResize)
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
  }

  public render() {
    const { logo, logoSize, color } = this.props
    return (
      <Container color={color}>
        <Animation size={this.state.animationSize} />
        <Content color={color}>
          <TitleBar>
            <OperationalLogo size={logoSize} logo={logo} />
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
