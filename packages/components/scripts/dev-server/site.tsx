import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"

import { OperationalUI, operationalTheme, Sidebar, SidebarHeader, SidebarItem } from "../../src/index"

class Site extends React.Component<{}, {}> {
  render() {
    return (
      <OperationalUI>
        <Sidebar>
          <SidebarHeader label="1234" open>
            <SidebarHeader label="sub" open>
              <SidebarItem>1234</SidebarItem>
              <SidebarItem>5678</SidebarItem>
            </SidebarHeader>

            <SidebarItem>1234</SidebarItem>
            <SidebarItem>5678</SidebarItem>
            <SidebarItem>9012</SidebarItem>
          </SidebarHeader>
        </Sidebar>
      </OperationalUI>
    )
  }
}

injectStylesheet(baseStylesheet(operationalTheme))
render(<Site />, document.getElementById("app"))
