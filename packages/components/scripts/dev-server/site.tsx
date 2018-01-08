import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"

import { Breadcrumbs, Breadcrumb, operationalTheme } from "../../src/index"

class Site extends React.Component<{}, {}> {
  render() {
    return (
      <OperationalUI>
        <Breadcrumbs>
          <Breadcrumb>Hello</Breadcrumb>
          <Breadcrumb>Good Bye</Breadcrumb>
        </Breadcrumbs>
      </ThemeProvider>
    )
  }
}

injectStylesheet(baseStylesheet(operationalTheme))
render(<Site />, document.getElementById("app"))
