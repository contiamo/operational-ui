import * as React from "react"
import { render } from "react-dom"
import { ThemeProvider } from "glamorous"

import { ContextMenu, ContextMenuItem, Icon, contiamoTheme } from "../../index"

class Site extends React.Component<{}, {}> {
  render() {
    return (
      <ThemeProvider theme={contiamoTheme}>
        <div style={{padding: 40}}>
          <ContextMenu expandOnHover>
            <span><Icon name="X" size={30}></Icon></span>
            <ContextMenuItem onClick={() => {console.log("clicked")}}>Menu 1</ContextMenuItem>
            <ContextMenuItem>Menu 2</ContextMenuItem>
            <ContextMenuItem>Menu 3</ContextMenuItem>
          </ContextMenu>
        </div>
      </ThemeProvider>
    )
  }
}

render(<Site/>, document.getElementById("app"))
