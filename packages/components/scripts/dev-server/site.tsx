import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"

import { OperationalUI, operationalTheme, Tooltip, Sidebar, SidebarHeader, SidebarItem } from "../../src/index"

class Site extends React.Component<{}, {}> {
  render() {
    return (
      <OperationalUI>
        <div style={{ padding: 100 }}>
          <div style={{ width: 20, height: 20, display: "inline-block", position: "relative", border: "1px solid black" }}>
            <Tooltip right>Right</Tooltip>
            <Tooltip left smart>Left</Tooltip>
            <Tooltip top>Top</Tooltip>
            <Tooltip bottom>Bottom</Tooltip>
          </div>
        </div>
      </OperationalUI>
    )
  }
}

injectStylesheet(baseStylesheet(operationalTheme))
render(<Site />, document.getElementById("app"))
