import * as React from "react"
import { render } from "react-dom"
import glamorous, { Div } from "glamorous"
import { operational, Theme } from "@operational/theme"
import { transparentize } from "@operational/utils"
import {
  OperationalUI,
  Layout,
  Page,
  Sidenav,
  SidenavHeader,
  Breadcrumbs,
  Breadcrumb,
  Button,
  Table,
  AvatarGroup,
  Avatar,
} from "../../src"

export interface Props {}

export interface State {}

class Explore extends React.Component<Props, State> {
  state = {}

  render() {
    return (
      <OperationalUI withBaseStyles>
        <Layout
          sidenav={
            <Sidenav expanded>
              <a href="/">
                <SidenavHeader label="Labs" icon="Labs" />
              </a>
              <SidenavHeader label="Pantheon" icon="Pantheon" />
            </Sidenav>
          }
          main={
            <Page
              title="My page"
              breadcrumbs={
                <Breadcrumbs>
                  <Breadcrumb>
                    <a>Link one</a>
                  </Breadcrumb>
                  <Breadcrumb>Link two</Breadcrumb>
                </Breadcrumbs>
              }
              controls={
                <React.Fragment>
                  <Button condensed color="info">
                    Edit
                  </Button>
                </React.Fragment>
              }
            >
              <AvatarGroup>
                <Avatar name="Alfred Black" title="1234" showName assignColor />
                <Avatar
                  name="Alfred Gray"
                  title="1234"
                  showName
                  photo="data:image/jpeg;base64,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"
                />
                <Avatar name="Alfred Gray" title="1234" showName />
              </AvatarGroup>
              <Avatar name="Alfred Gray" title="1234" showName />
            </Page>
          }
        />
      </OperationalUI>
    )
  }
}

render(<Explore />, document.querySelector("#app"))
