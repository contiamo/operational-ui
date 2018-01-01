import * as React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "glamorous"
import { injectStylesheet, baseStylesheet } from "@operational/utils"

import { Sidenav, SidenavHeader, SidenavItem, operationalTheme } from "../../src/index"

class Site extends React.Component<{}, {}> {
  render() {
    return (
      <ThemeProvider theme={operationalTheme}>
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
      </ThemeProvider>
    )
  }
}

injectStylesheet(baseStylesheet(operationalTheme))
render(<Site />, document.getElementById("app"))
