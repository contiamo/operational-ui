import * as React from "react"

import Playground from "../../components/Playground/Playground"
import Table from "../../components/PropsTable/PropsTable"
import { ColorPicker, CardHeader } from "contiamo-ui-components"

import * as snippet from "./snippets/ColorPicker.snippet"
import propDescription from "./propDescription"

class ColorPickerPage extends React.Component {
  state = {
    color: "#222",
  }
  updateColor = ({ detail }: CustomEvent) => this.onColorChange(detail)
  componentDidMount() {
    window.addEventListener("colorChange", this.updateColor)
  }
  componentWillUnmount() {
    window.removeEventListener("colorChange", this.updateColor)
  }
  onColorChange({ hex }: { hex: string }) {
    this.setState(() => ({ color: hex }))
  }
  render() {
    return (
      <div style={{ color: this.state.color }}>
        <CardHeader>Color Picker</CardHeader>
        <p>
          Colors are an important part of any user interface. This calls for a reasonable control that allows a user to
          choose a color from a canvas. Our component library exposes such a control, as seen below.
        </p>
        {process.env.NODE_ENV !== "test" && <Playground snippet={String(snippet)} components={{ ColorPicker }} />}

        <h4>Props</h4>
        <Table props={propDescription} />
      </div>
    )
  }
}

export default ColorPickerPage
