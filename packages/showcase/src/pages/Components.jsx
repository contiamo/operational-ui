import React from "react"
import { Route, withRouter } from "react-router-dom"
import { Div } from "glamorous"

import Sidebar from "../components/Sidebar/Sidebar"
import AppCanvas from "../components/Canvas/Canvas"

import ButtonsPage from "./Buttons/Buttons"
import FormFieldsPage from "./FormFields/FormFields"
import CardsPage from "./Cards/Cards"
import ChipsPage from "./Chips/Chips"
import TooltipsPage from "./Tooltips/Tooltips"
import StatsPage from "./Stats/Stats"
import SidebarPage from "./Sidebar/Sidebar"
import Icons from "./Icons/Icons"

const SidebarWithRouter = withRouter(Sidebar),
  style = {
    position: "fixed",
    top: 80,
    background: "black",
    color: "white",
    padding: 8,
    "&::after": {
      content: "''",
      position: "absolute",
      top: 8,
      left: -12,
      width: 0,
      height: 0,
      border: "6px solid transparent",
      borderRight: "6px solid black"
    }
  },
  InfoTooltip = () => <Div css={style}>Choose a Component to Get Started</Div>

export default () =>
  <Div
    css={{
      display: "flex",
      padding: 16,
      width: "100%",
      height: "100vh"
    }}
  >
    <SidebarWithRouter />
    <AppCanvas css={{ position: "relative", marginLeft: 16, flexBasis: "100%" }}>
      <Route exact path="/components" component={InfoTooltip} />
      <Route path="/components/buttons" component={ButtonsPage} />
      <Route path="/components/form-fields" component={FormFieldsPage} />
      <Route path="/components/cards" component={CardsPage} />
      <Route path="/components/chips" component={ChipsPage} />
      <Route path="/components/tooltips" component={TooltipsPage} />
      <Route path="/components/stats" component={StatsPage} />
      <Route path="/components/sidebar" component={SidebarPage} />
      <Route path="/components/icons" component={Icons} />
      <Route path="/demo" render={() => <img style={{ maxWidth: "175%" }} src="/screen.png" />} />
    </AppCanvas>
  </Div>
