import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"

import { OperationalUI } from "@operational/components"
import { operational } from "@operational/theme"
import { Auth } from  "../../src/index"

class Site extends React.Component<{}, {}> {
  render() {
    return (
      <OperationalUI>
        <Auth title="Log in" username="1@2.3" password="1234">
        </Auth>
      </OperationalUI>
    )
  }
}

injectStylesheet(baseStylesheet(operational))
render(<Site />, document.getElementById("app"))
