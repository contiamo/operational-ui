import * as React from "react"
import { Route, withRouter } from "react-router-dom"
import { Div } from "glamorous"

import AppCanvas from "../components/Canvas/Canvas"
import Sidebar from "../components/Sidebar/Sidebar"

import Buttons from "./Buttons/Buttons"
import FormFields from "./FormFields/FormFields"
import Cards from "./Cards/Cards"
import Chips from "./Chips/Chips"
import Tooltips from "./Tooltips/Tooltips"
import Stats from "./Stats/Stats"
import SidebarPage from "./Sidebar/Sidebar"
import ColorPicker from "./ColorPicker/ColorPicker"
import Switch from "./Switch/Switch"
import Icons from "./Icons/Icons"
import Typography from "./Typography/Typography"
import Colors from "./Colors/Colors"

const SidebarWithRouter = withRouter(Sidebar)
const InfoTooltip = () => <Div>Choose a Component to Get Started</Div>

export default () => (
  <Div
    css={{
      display: "flex",
      alignItems: "flex-start",
      padding: 16,
      width: "100%",
      height: "100vh",
    }}
  >
    <SidebarWithRouter css={{ height: "100%" }} />
    <AppCanvas>
      <Route exact path="/components" component={InfoTooltip} />
      <Route path="/components/buttons" component={Buttons} />
      <Route path="/components/form-fields" component={FormFields} />
      <Route path="/components/color-picker" component={ColorPicker} />
      <Route path="/components/cards" component={Cards} />
      <Route path="/components/chips" component={Chips} />
      <Route path="/components/tooltips" component={Tooltips} />
      <Route path="/components/stats" component={Stats} />
      <Route path="/components/sidebar" component={SidebarPage} />
      <Route path="/components/icons" component={Icons} />
      <Route path="/components/switch" component={Switch} />
      <Route path="/components/typography" component={Typography} />
      <Route path="/components/colors" component={Colors} />
      <Route path="/demo" render={() => <img style={{ maxWidth: "175%" }} src="/screen.png" />} />
    </AppCanvas>
  </Div>
)
