import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"

import { OperationalUI, operationalTheme, Card, Spinner, Progress } from "../../src/index"

class Site extends React.Component<{}, {}> {
  state = {
    selected: ["1"]
  }
  render() {
    return (
      <OperationalUI>
        <div style={{ padding: 20 }}>
          <Card>
            <Spinner/>
          </Card>
        </div>
      </OperationalUI>
    )
  }
}

injectStylesheet(baseStylesheet(operationalTheme))
render(<Site />, document.getElementById("app"))
