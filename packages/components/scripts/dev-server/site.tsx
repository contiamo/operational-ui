import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"

import { Header, HeaderTitle, HeaderSeparator, Breadcrumbs, Breadcrumb, operationalTheme } from "../../src/index"

class Site extends React.Component<{}, {}> {
  render() {
    return (
      <OperationalUI>
        <div>
          <Header>
            <Breadcrumbs>
              <Breadcrumb>Hello</Breadcrumb>
              <Breadcrumb>Good Bye</Breadcrumb>
            </Breadcrumbs>
          </Header>
        </div>
      </OperationalUI>
    )
  }
}

injectStylesheet(baseStylesheet(operationalTheme))
render(<Site />, document.getElementById("app"))
