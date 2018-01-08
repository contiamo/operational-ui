import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"

import { OperationalUI, Sidenav, SidenavHeader, SidenavItem, operationalTheme } from "../../src/index"

class Site extends React.Component<{}, {}> {
  render() {
    return (
      <OperationalUI>
        <Sidenav expanded expandOnHover>
          <SidenavHeader label="Components" icon="Box">
            <SidenavItem label="Buttons" />
            <SidenavItem label="Chips" />
            <SidenavItem label="Form Fields" />
            <SidenavItem label="Buttons" />
          </SidenavHeader>
          <SidenavHeader label="Blocks" icon="Grid" />
          <SidenavHeader label="Visualizations" expanded icon="BarChart2">
            <SidenavItem label="Process Flow" active />
            <SidenavItem label="Process Flow" active />
          </SidenavHeader>
          <SidenavHeader label="Documentation" icon="Edit" />
        </Sidenav>
      </OperationalUI>
    )
  }
}

injectStylesheet(baseStylesheet(operationalTheme))
render(<Site />, document.getElementById("app"))
