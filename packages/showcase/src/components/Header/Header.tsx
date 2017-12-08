import * as React from "react"
import { Route } from "react-router-dom"
import { Header } from "@operational/components"

interface IProps {}

const AppHeader = (props: IProps) => (
  <Header
    css={{
      boxShadow: "0px 1px 2px #d3d1d1",
      backgroundColor: "#fff",
      paddingLeft: 16
    }}
    color="#fff"
  >
    Operational UI
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
