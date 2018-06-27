import * as React from "react"
import { createPortal } from "react-dom"
import styled from "react-emotion"
import * as marked from "marked"

import Animation from "./Animation"
import OperationalLogo from "./OperationalLogo"
import { OperationalUI, Button, Icon } from "../src"

export interface Props {}

export interface State {
  hash: string
  isPortalRendered: boolean
  rotation: number
  animationSize: number
  isClosing: boolean
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
  ${({ isClosing }: { isClosing: boolean }) => `
    opacity: ${isClosing ? 0 : 1};
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

const LogoType = styled("h1")`
  font-size: 18px;
  font-weight: 400;
  margin: 0px;
  cursor: pointer;
  & > * {
    display: inline-block;
    vertical-align: middle;
  }
`

const operationalBannerContainerId = "operational-banner-container"

class LogoAndBanner extends React.Component<Props, State> {
  state = {
    hash: window.location.hash,
    isPortalRendered: false,
    rotation: 0,
    animationSize: Math.max(window.innerWidth, window.innerHeight),
    isClosing: false,
  }

  rotationInterval: number

  handleResize = () => {
    this.setState(prevState => ({
      animationSize: Math.max(window.innerWidth, window.innerHeight) as number,
    }))
  }

  handlePopState = () => {
    this.setState(prevState => ({
      hash: window.location.hash,
    }))
  }

  redirect(newHash: string) {
    history.pushState(null, null, `#${newHash}`)
    if (newHash !== "") {
      this.setState(prevState => ({
        hash: newHash,
        isClosing: true,
      }))
      setTimeout(() => {
        this.setState(prevState => ({
          isClosing: false,
        }))
      }, 200)
      return
    }
    this.setState(prevState => ({
      hash: newHash,
    }))
  }

  componentDidMount() {
    if (!document.querySelector(`#${operationalBannerContainerId}`)) {
      const operationalBannerContainer = document.createElement("div")
      operationalBannerContainer.setAttribute("id", operationalBannerContainerId)
      document.body.appendChild(operationalBannerContainer)
      this.setState(prevState => ({
        isPortalRendered: true,
      }))
    } else {
      if (!this.state.isPortalRendered) {
        this.setState(prevState => ({
          isPortalRendered: true,
        }))
      }
    }
    window.addEventListener("popstate", this.handlePopState)
    window.addEventListener("resize", this.handleResize)
    this.rotationInterval = window.setInterval(() => {
      this.setState(prevState => ({
        rotation: 180 - prevState.rotation,
      }))
    }, 8000)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
    window.removeEventListener("popstate", this.handlePopState)
    window.clearInterval(this.rotationInterval)
  }

  render() {
    const isOpen = this.state.hash === ""
    return (
      <OperationalUI>
        {(isOpen || this.state.isClosing) &&
          this.state.isPortalRendered &&
          createPortal(
            <Container isClosing={this.state.isClosing}>
              <Animation size={this.state.animationSize} />
              <Content>
                <TitleBar>
                  <OperationalLogo size={110} rotation={this.state.rotation} />
                  <TitleBarContent>
                    <h1>Operational UI</h1>
                    <div>
                      <Button
                        onClick={() => {
                          this.redirect("docs-home")
                        }}
                      >
                        Docs
                      </Button>
                      <Button to="https://github.com/contiamo/operational-ui/">GitHub</Button>
                    </div>
                  </TitleBarContent>
                </TitleBar>
                <Static
                  dangerouslySetInnerHTML={{
                    __html: marked(`Operational is a UI library optimized for day-to-day operational decision-making. It does its best when used for interfaces that assume familiarity through routine use, prioritizing compactness and [small effective differences](https://twitter.com/edwardtufte/status/450076034759524352).

It is predictable to use, and it lets you and your team breathe. Exhales, not sighs.
              `),
                  }}
                />
              </Content>
            </Container>,
            document.querySelector(`#${operationalBannerContainerId}`),
          )}
        {!isOpen && (
          <LogoType
            onClick={() => {
              this.redirect("")
            }}
          >
            <Icon name="OperationalUI" size={28} left />
            <span>Operational UI</span>
          </LogoType>
        )}
      </OperationalUI>
    )
  }
}

export default LogoAndBanner
