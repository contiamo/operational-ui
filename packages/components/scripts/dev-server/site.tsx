import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"
import * as c from "../../src/index"

<<<<<<< HEAD
import { OperationalUI, operationalTheme, Message } from "../../src/index"
=======
import { OperationalUI, operationalTheme, Checkbox } from "../../src/index"
>>>>>>> Implement API

class Site extends React.Component<{}, {}> {
  state = {
    selected: ["1"]
  }
  render() {
    return (
      <OperationalUI>
<<<<<<< HEAD
        <div style={{padding: 20}}>
          <Message color="info" onClose={() => {
            console.log("closing")
          }}>
            Hello
          </Message>
=======
        <div style={{ padding: 20 }}>
          <Checkbox
            label="Something"
            options={["1", "2", "3"]}
            selected={this.state.selected}
            onChange={(n: string[]) => {
              this.setState(p => ({
                selected: n
              }))
            }}
          />
>>>>>>> Implement API
        </div>
      </OperationalUI>
    )
  }
}

injectStylesheet(baseStylesheet(operationalTheme))
render(<Site />, document.getElementById("app"))
