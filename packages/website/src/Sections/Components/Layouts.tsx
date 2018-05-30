import * as React from "react"
import { Modal, Layout, Sidenav, Page, Button, Breadcrumbs, Breadcrumb } from "@operational/components"
import * as constants from "../../constants"

export const title = "Layouts"

export const docsUrl = `${constants.docsBaseUrl}/#layout`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Layouts.tsx`

export class Component extends React.Component<{}, { isExpanded: boolean }> {
  state = {
    isExpanded: false,
  }

  render() {
    return (
      <>
        <Button
          color="info"
          onClick={() => {
            this.setState(prevState => ({
              isExpanded: true,
            }))
          }}
        >
          View this component in a modal
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
                    <>
                      <Button condensed color="info">
                        Help
                      </Button>
                    </>
                  }
                />
              }
            />
          </Modal>
        ) : null}
      </>
    )
  }
}
