import * as React from "react"
import { Route } from "react-router-dom"

import { Header } from "contiamo-ui-components"

const AppHeader = () => (
  <Header
    style={{
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
