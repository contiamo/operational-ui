import * as React from "react"
import { Card, CardHeader, Button, Heading2Type, Select, Input, DatePicker } from "@operational/components"
import { Auth } from "@operational/blocks"

import Layout from "../../components/Layout"
import Table from "../../components/PropsTable"
import Playground from "../../components/Playground"

const propDescription = []

class AuthExpand extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: false
    }
  }
  render() {
    return (
      <div>
        <Button
          color="info"
          onClick={() => {
            this.setState(p => ({
              isExpanded: true
            }))
          }}
        >
          Log in
        </Button>
        {this.state.isExpanded ? (
          <Auth css={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 10000 }} />
        ) : null}
      </div>
    )
  }
}

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>The Auth block supports general authentication needs.</p>

      <AuthExpand />

      <Heading2Type>Props</Heading2Type>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
