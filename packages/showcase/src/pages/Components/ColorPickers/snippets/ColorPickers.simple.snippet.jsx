import * as React from "react"
import { ColorPicker } from "@operational/components"

export default (function() {
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
