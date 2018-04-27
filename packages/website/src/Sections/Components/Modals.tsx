import * as React from "react"
import { Modal, Button } from "@operational/components"

export const title = "Modals"

export const docsUrl = "https://github.com/contiamo/operational-ui/blob/master/docs/components/modal.md"

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
            onClose={() => {
              this.setState(prevState => ({
                isExpanded: false,
              }))
            }}
          >
            Hello
          </Modal>
        ) : null}
      </React.Fragment>
    )
  }
}
