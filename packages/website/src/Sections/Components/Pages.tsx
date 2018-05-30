import * as React from "react"
import { Modal, Layout, Sidenav, Page, Button, Breadcrumbs, Breadcrumb } from "@operational/components"
import * as constants from "../../constants"

export const title = "Pages"

export const docsUrl = `${constants.docsBaseUrl}/#page`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Pages.tsx`

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
          </Modal>
        ) : null}
      </>
    )
  }
}
