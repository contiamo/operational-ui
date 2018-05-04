import * as React from "react"
import { render } from "react-dom"
import glamorous, { Div } from "glamorous"
import { operational, Theme } from "@operational/theme"
import { transparentize } from "@operational/utils"
import { OperationalUI, Layout, Page, Sidenav, SidenavHeader, Breadcrumbs, Breadcrumb, Button, Table } from "../../src"

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
              <Table columns={["a", "b"]} rows={[["a1", "b1"], ["a2", "b2"]]} __experimentalRowActions={["a", "b"]} />
            </Page>
          }
        />
      </OperationalUI>
    )
  }
}

render(<Explore />, document.querySelector("#app"))
