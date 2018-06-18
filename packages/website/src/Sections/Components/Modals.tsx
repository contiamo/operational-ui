import * as React from "react"
import { Modal, Button } from "@operational/components"
import * as constants from "../../constants"

export const title = "Modals"

export const docsUrl = `${constants.docsBaseUrl}/#modal`

export const snippetUrl = `${constants.snippetBaseUrl}/Components/Modals.tsx`

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
