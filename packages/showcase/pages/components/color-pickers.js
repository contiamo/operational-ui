import * as React from "react"
import { ColorPicker, Card, CardHeader, Heading2Type } from "@operational/components"

import Layout from "../../components/Layout"
import Playground from "../../components/Playground"
import Table from "../../components/PropsTable"

const simpleSnippet = `
(() => {
  class CompWithColorPicker extends React.Component {
    state = {
      color: "#013"
    }

    handleColorChange = (color) => {
      this.setState(prevState => ({
        color
      }))
    }

    render() {
      return (
        <div>
          <ColorPicker color={this.state.color} onChange={this.handleColorChange} />
          <p style={{ color: this.state.color }}>What color should I wear today?</p>
        </div>
      )
    }
  }

  return (
    <div>
      <CompWithColorPicker />
      <br />
      Click above for fun times!
    </div>
  )
})()
`

const propDescription = [
  {
    name: "color",
    description: "The starting color of the component",
    defaultValue: "blue",
    type: "string<hex>",
    optional: true
  },
  {
    name: "size",
    description: "The size of the color picker.",
    defaultValue: "16",
    type: "number",
    optional: true
  },
  {
    name: "onChange",
    description: "A function that is called when the color changes. It is passed a color object as the first argument.",
    defaultValue: "void",
    type: "func",
    optional: true
  }
]

export default props => (
  <Layout pathname={props.url.pathname}>
    <Card>
      <p>
        Colors are an important part of any user interface. This calls for a reasonable control that allows a user to
        choose a color from a canvas. Our component library exposes such a control, as seen below.
      </p>
      {process.env.NODE_ENV !== "test" && <Playground snippet={String(simpleSnippet)} components={{ ColorPicker }} />}

      <Heading2Type>Props</Heading2Type>
      <Table props={propDescription} />
    </Card>
  </Layout>
)
