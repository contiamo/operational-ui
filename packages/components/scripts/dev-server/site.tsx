import * as React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "glamorous"
import { injectStylesheet, baseStylesheet } from "@operational/utils"

import { Sidenav, SidenavHeader, SidenavItem, contiamoTheme } from "../../src/index"

class Site extends React.Component<{}, {}> {
  render() {
    return (
      <ThemeProvider theme={contiamoTheme}>
       <Sidenav expandOnHover> 
        <SidenavHeader label="Operational UI" icon="Box"/>
        <SidenavHeader label="Components" icon="Box"/>
        <SidenavHeader label="Blocks" icon="Grid"/>
        <SidenavHeader label="Visualizations" icon="BarChart2"/>
        <SidenavHeader label="Documentation" icon="Edit"/>
        <SidenavItem label="Buttons"/>
        <SidenavItem label="Chips"/>
        <SidenavItem label="Form Fields"/>
        <SidenavItem label="Buttons"/>
       </Sidenav>
      </ThemeProvider>
    )
  }
}

injectStylesheet(baseStylesheet(contiamoTheme))
render(<Site />, document.getElementById("app"))
