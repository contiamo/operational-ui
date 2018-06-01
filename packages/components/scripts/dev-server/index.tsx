import * as React from "react"
import { render } from "react-dom"
import glamorous, { Div } from "glamorous"
import { operational, Theme } from "@operational/theme"
import { transparentize } from "@operational/utils"
import {
  OperationalUI,
  Layout,
  Page,
  Progress,
  Sidenav,
  SidenavHeader,
  SidenavItem,
  Breadcrumbs,
  Breadcrumb,
  Button,
  Table,
  Messages,
  Message,
  AvatarGroup,
  Avatar,
} from "../../src"

export interface Props {}

export interface State {
  path: string
}

class Explore extends React.Component<Props, State> {
  state = {
    path: window.location.pathname,
  }

  render() {
    return (
      <OperationalUI
        withBaseStyles
        pushState={path => {
          window.history.pushState(null, null, path)
          this.setState(() => ({
            path,
          }))
        }}
      >
        <Layout
          sidenav={
            <Sidenav>
              <SidenavHeader label="The Prize">
                <SidenavItem label="The First Prize" icon="Settings" to="/one/1" />
                <SidenavItem label="The Second Prize" icon="Settings" to="/one/2" />
                <SidenavItem label="The Third Prize" icon="Settings" to="/one/3" />
              </SidenavHeader>
              <SidenavHeader label="Let It Snow" color="#ac44b9">
                <SidenavItem label="The First Prize" icon="Settings" to="/two/1" />
                <SidenavItem label="The Second Prize" icon="Settings" to="/two/2" />
                <SidenavItem label="The Third Prize" icon="Settings" to="/two/3" />
              </SidenavHeader>
            </Sidenav>
          }
          main={
            <Page
              title={`We're at ${this.state.path}`}
              breadcrumbs={
                <Breadcrumbs>
                  <Breadcrumb to="/one">Link one</Breadcrumb>
                  <Breadcrumb to="/one/1">Link one in one</Breadcrumb>
                  <Breadcrumb>Link one in one</Breadcrumb>
                </Breadcrumbs>
              }
              controls={
                <React.Fragment>
                  <Button color="info" condensed to="/two/1">
                    Edit
                  </Button>
                </React.Fragment>
              }
            >
              <Avatar name="Alfred Gray" title="1234" showName />
              <Messages>
                <Message>1234</Message>
                <Message>1234</Message>
              </Messages>
            </Page>
          }
        />
      </OperationalUI>
    )
  }
}

render(<Explore />, document.querySelector("#app"))
