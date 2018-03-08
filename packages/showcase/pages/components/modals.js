import * as React from "react"
import { Modal, Card, CardHeader, Button } from "@operational/components"

import { Layout, Props, Playground, StaticContent } from "../../components"

const simpleSnippet = `
(() => {
  class ContentWithModal extends React.Component {
    state = {
      isModalOpen: false
    }
    render() {
      return (
        <div>
          {this.state.isModalOpen ? (
            <Modal
              onClose={() => {
                this.setState(prevState => ({
                  isModalOpen: false
                }))
              }}
            >
              <div style={{ width: 300, height: 240 }}>
                Hello
              </div>
            </Modal>
          ) : null}
          <Button
            color="info"
            onClick={ev => {
              this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }))
            }}
          >
            Expand your modal!
          </Button>
        </div>
      )
    }
  }

  return <ContentWithModal />
})()
`

const propDescription = [
  {
    name: "childCss",
    description:
      "Glamor CSS object passed down to the container's immediate child, which holds the content. Use to specify/override styles",
    defaultValue: "-",
    type: "string",
    optional: true
  },
  {
    name: "childClassName",
    description:
      "Class name for the modal container's immediate child, which holds the content. Use to specify/override styles.",
    defaultValue: "-",
    type: "string",
    optional: true
  },
  {
    name: "onClose",
    description: "Callback called when the modal is closed (outside area is clicked).",
    defaultValue: "-",
    type: "string",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        Modals are customizable full-screen alert boxes. They should be used sparingly, but they come in handy when
        there is a legitimate reason to block the rest of the screen. Several Operational components such as date
        pickers and select boxes implement local pop-ups, which are preferable most of the time.
      </p>

      <h2>Usage</h2>
      <Playground snippet={simpleSnippet} components={{ Modal, Button }} />
    </Card>
    <Card />
    <Card>
      <CardHeader>Props</CardHeader>
      <Props
        props={propDescription}
      />
    </Card>
  </Layout>
)
