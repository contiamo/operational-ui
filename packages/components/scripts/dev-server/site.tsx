import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"

import { OperationalUI, operationalTheme, Chip, Tooltip, Sidebar, SidebarHeader, SidebarItem } from "../../src/index"

interface IState {
  isOpen: boolean
}

class Site extends React.Component<{}, IState> {
  state = {
    isOpen: false
  }
  render() {
    return (
      <OperationalUI>
        <div style={{ margin: 20 }}>
          <Chip color="info" icon="X" onIconClick={() => {}}>Hello</Chip>
        </div>
      </OperationalUI>
    )
  }
}

injectStylesheet(baseStylesheet(operationalTheme))
render(<Site />, document.getElementById("app"))
