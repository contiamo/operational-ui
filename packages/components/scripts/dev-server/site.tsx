import * as React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "glamorous"
import { injectStylesheet, baseStylesheet } from "@operational/utils"

import { ContextMenu, ContextMenuItem, Icon, contiamoTheme } from "../../src/index"

class Site extends React.Component<{}, {}> {
  render() {
    return (
      <ThemeProvider theme={contiamoTheme}>
        <div style={{ padding: 40 }}>
          <ContextMenu expandOnHover>
            <span>
              <Icon name="X" size={30} />
            </span>
            <ContextMenuItem
              onClick={() => {
                console.log("clicked")
              }}
            >
              Menu 1
            </ContextMenuItem>
            <ContextMenuItem>Menu 2</ContextMenuItem>
            <ContextMenuItem>Menu 3</ContextMenuItem>
          </ContextMenu>
        </div>
      </ThemeProvider>
    )
  }
}

injectStylesheet(baseStylesheet(contiamoTheme))
render(<Site />, document.getElementById("app"))
