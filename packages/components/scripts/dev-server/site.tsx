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
        <SidenavHeader label="Hello"/>
       </Sidenav>
      </ThemeProvider>
    )
  }
}

injectStylesheet(baseStylesheet(contiamoTheme))
render(<Site />, document.getElementById("app"))
