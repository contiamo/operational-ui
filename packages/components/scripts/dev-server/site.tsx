import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"

import { OperationalUI, operationalTheme, Tooltip, Sidebar, SidebarHeader, SidebarItem } from "../../src/index"

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
          <Sidebar>
            <SidebarHeader
              label="Label"
              open={this.state.isOpen}
              onToggle={() => {
                this.setState(prevState => ({
                  isOpen: !prevState.isOpen
                }))
              }}
            >
              <SidebarItem>Hello</SidebarItem>
            </SidebarHeader>
          </Sidebar>
        </div>
      </OperationalUI>
    )
  }
}

injectStylesheet(baseStylesheet(operationalTheme))
render(<Site />, document.getElementById("app"))
