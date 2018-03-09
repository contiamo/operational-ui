import * as React from "react"
import { ColorPicker, Card, CardHeader } from "@operational/components"

import { Layout, Props, Playground, StaticContent } from "../../components"

const simpleSnippet = `
(() => {
  class CompWithColorPicker extends React.Component {
    state = {
      color: "#123456"
    }

    handleColorChange = (color) => {
      this.setState(prevState => ({
        color
      }))
    }

    render() {
      return (
          <ColorPicker color={this.state.color} onChange={this.handleColorChange} />
      )
    }
  }

  return (
    <CompWithColorPicker />
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
      <Playground snippet={simpleSnippet} components={{ ColorPicker }} />
    </Card>
    <Card />
    <Card>
      <CardHeader>Props</CardHeader>
      <Props props={propDescription} />
    </Card>
  </Layout>
)
