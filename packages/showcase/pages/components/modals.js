import * as React from "react"
import { Modal, Card, CardHeader, Heading2Type } from "@operational/components"

import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"

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
          <p
            onClick={ev => {
              this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }))
            }}
          >
            Expand your modal!
          </p>
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
      <p>Modals are customizable full-screen alert boxes.</p>

      <Heading2Type>Usage</Heading2Type>
      <Playground snippet={simpleSnippet} components={{ Modal }} />

      <Heading2Type>Props</Heading2Type>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
