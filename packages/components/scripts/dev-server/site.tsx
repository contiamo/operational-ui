import * as React from "react"
import { render } from "react-dom"
import { injectStylesheet, baseStylesheet } from "@operational/utils"

import { OperationalUI, Header, HeaderTitle, HeaderSeparator, Breadcrumbs, Breadcrumb, operationalTheme, ContextMenu, ContextMenuItem } from "../../src/index"

class Site extends React.Component<{}, {}> {
  render() {
    return (
      <OperationalUI>
        <div>
          <Header>
            <Breadcrumbs>
              <ContextMenu css={{display: "inline-block", margin: 0}}>
                <Breadcrumb icon="ChevronDown">Hello</Breadcrumb>
                <ContextMenuItem>Item 1</ContextMenuItem>
                <ContextMenuItem>Item 2</ContextMenuItem>
                <ContextMenuItem>Item 3</ContextMenuItem>
              </ContextMenu>
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
