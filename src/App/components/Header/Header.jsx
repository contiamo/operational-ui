// @flow
import React from "react"
import glamorous from "glamorous"
import { Box, Camera } from "react-feather"
import { Route } from "react-router-dom"

import Header, {
  HeaderItem,
  HeaderSeparator,
  HeaderTitle
} from "../../../components/Header/Header"

const AppHeader = ({ className }: { className: string }) =>
  <Header className={className} color="#fff">
    Contiamo UI
    <Route
      path="/components"
      render={() =>
        <div>
          &nbsp;/&nbsp;<strong>Components</strong>
        </div>}
    />
  </Header>

const style: {} = {
  boxShadow: "0px 1px 2px #d3d1d1",
  backgroundColor: "#fff"
}

export default glamorous(AppHeader)(style)
