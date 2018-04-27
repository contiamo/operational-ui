import * as React from "react"
import { Modal, Layout, Sidenav, Page, Button, Breadcrumbs, Breadcrumb } from "@operational/components"

export const title = "Layouts"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/layout.md"

export class Component extends React.Component<{}, { isExpanded: boolean }> {
  state = {
    isExpanded: false,
  }
  render() {
    return (
      <React.Fragment>
        <Button
          onClick={() => {
            this.setState(prevState => ({
              isExpanded: true,
            }))
          }}
        >
          Expand!
        </Button>
        {this.state.isExpanded ? (
          <Modal
            contentCss={{
              padding: 0,
              width: "80vw",
              height: "80vh",
            }}
            onClose={() => {
              this.setState(prevState => ({
                isExpanded: false,
              }))
            }}
          >
            <Layout
              sidenav={<Sidenav expanded />}
              main={
                <Page
                  title="Page Title"
                  breadcrumbs={
                    <Breadcrumbs>
                      <Breadcrumb>One</Breadcrumb>
                      <Breadcrumb>One</Breadcrumb>
                      <Breadcrumb>One</Breadcrumb>
                    </Breadcrumbs>
                  }
                  controls={
                    <div>
                      <Button color="info">Help</Button>
                    </div>
                  }
                />
              }
            />
          </Modal>
        ) : null}
      </React.Fragment>
    )
  }
}
