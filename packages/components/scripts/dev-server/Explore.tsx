import * as React from "react"
import glamorous, { Div } from "glamorous"
import { render } from "react-dom"
import { Theme } from "@operational/theme"
import { OperationalUI, Layout, Page, Sidenav, SidenavHeader, Breadcrumbs, Breadcrumb, Button } from "../../src"

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  padding: theme.spacing,
  maxWidth: 640,
  margin: "auto",
  "& h1": {
    ...theme.typography.title
  }
}))

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
              <SidenavHeader label="Labs" icon="Labs" />
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
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
            </Page>
          }
        />
      </OperationalUI>
    )
  }
}

export default Explore
