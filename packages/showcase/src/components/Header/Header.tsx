import * as React from "react"
import { Route } from "react-router-dom"

import { Header } from "@operational/components"

const AppHeader: React.SFC<{}> = () => (
  <Header
    css={{
      boxShadow: "0px 1px 2px #d3d1d1",
      backgroundColor: "#fff"
    }}
    color="#fff"
  >
    Contiamo UI
    <Route
      path="/components"
      render={() => (
        <div>
          &nbsp;/&nbsp;<strong>Components</strong>
        </div>
      )}
    />
  </Header>
)

export default AppHeader
