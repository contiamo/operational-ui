import * as React from "react"
import { createPortal } from "react-dom"
import styled from "react-emotion"
import marked from "marked"

import Animation from "./Animation"
import OperationalLogo from "./OperationalLogo"
import { OperationalUI, Button, Icon } from "../src"

export interface Props {}

export interface State {
  isOpen: boolean
  isPortalRendered: boolean
  rotation: number
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
  font-size: 20px;
  font-weight: 400;
  margin: 0px;
  cursor: pointer;
  & > * {
    display: inline-block;
    vertical-align: middle;
  }
`

const operationalBannerContainerId = "operational-banner-container"

class Logo extends React.Component<Props, State> {
  state = {
    isOpen: !window.location.hash,
    isPortalRendered: false,
    rotation: 0,
  }

  rotationInterval: number

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
    this.rotationInterval = window.setInterval(() => {
      this.setState(prevState => ({
        rotation: 180 - prevState.rotation,
      }))
    }, 8000)
  }

  componentWillUnmount() {
    window.clearInterval(this.rotationInterval)
  }

  render() {
    return (
      <OperationalUI>
        {this.state.isOpen && this.state.isPortalRendered ? (
          createPortal(
            <Container>
              <Animation size={Math.max(window.innerHeight, window.innerWidth)} />
              <Content>
                <TitleBar>
                  <OperationalLogo size={110} rotation={this.state.rotation} />
                  <TitleBarContent>
                    <h1>Operational UI</h1>
                    <div>
                      <Button
                        onClick={() => {
                          window.location.hash = "docs-home"
                          this.setState(prevState => ({
                            isOpen: !prevState.isOpen,
                          }))
                        }}
                      >
                        Docs
                      </Button>
                      <Button>GitHub</Button>
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
          )
        ) : (
          <LogoType
            onClick={() => {
              window.location.hash = ""
              this.setState(prevState => ({
                isOpen: true,
              }))
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

export default Logo
