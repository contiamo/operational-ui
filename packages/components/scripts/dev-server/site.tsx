import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"
import * as c from "../../src/index"

import { OperationalUI, operationalTheme, Checkbox } from "../../src/index"

class Site extends React.Component<{}, {}> {
  state = {
    selected: ["1"]
  }
  render() {
    return (
      <OperationalUI>
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
        </div>
      </OperationalUI>
    )
  }
}

injectStylesheet(baseStylesheet(operationalTheme))
render(<Site />, document.getElementById("app"))
