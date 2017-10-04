import * as React from "react"
import { Route, withRouter } from "react-router-dom"
import { Div } from "glamorous"

import Canvas from "../../components/Canvas/Canvas"
import Sidebar from "../../components/Sidebar/Sidebar"

import Buttons from "./Buttons/Buttons"
import Breakdown from "./Breakdown/Breakdown"
import FormFields from "./FormFields/FormFields"
import Cards from "./Cards/Cards"
import Chips from "./Chips/Chips"
import Tooltips from "./Tooltips/Tooltips"
import InfoTiles from "./InfoTiles/InfoTiles"
import SidebarPage from "./Sidebar/Sidebar"
import ColorPickers from "./ColorPickers/ColorPickers"
import Switches from "./Switches/Switches"
import Icons from "./Icons/Icons"
import Typography from "./Typography/Typography"
import Colors from "./Colors/Colors"
import Paginator from "./Paginator/Paginator"
import Progress from "./Progress/Progress"
import Tabs from "./Tabs/Tabs"
import Timeline from "./Timeline/Timeline"

const SidebarWithRouter = withRouter(Sidebar)
const InfoTooltip = () => <Div>Choose a Component to Get Started</Div>

export default () => (
  <Div
    css={{
      display: "flex",
      alignItems: "flex-start",
      padding: 16,
      width: "100%",
      height: "100vh"
    }}
  >
    <SidebarWithRouter css={{ height: "100%" }} />
    <Canvas>
      <Route exact path="/components" component={InfoTooltip} />
      <Route path="/components/buttons" component={Buttons} />
      <Route path="/components/breakdown" component={Breakdown} />
      <Route path="/components/form-fields" component={FormFields} />
      <Route path="/components/color-picker" component={ColorPickers} />
      <Route path="/components/cards" component={Cards} />
      <Route path="/components/chips" component={Chips} />
      <Route path="/components/tooltips" component={Tooltips} />
      <Route path="/components/info-tiles" component={InfoTiles} />
      <Route path="/components/sidebar" component={SidebarPage} />
      <Route path="/components/icons" component={Icons} />
      <Route path="/components/switch" component={Switches} />
      <Route path="/components/typography" component={Typography} />
      <Route path="/components/colors" component={Colors} />
      <Route path="/components/paginator" component={Paginator} />
      <Route path="/components/progress" component={Progress} />
      <Route path="/components/tabs" component={Tabs} />
      <Route path="/components/timeline" component={Timeline} />
      <Route path="/demo" render={() => <img style={{ maxWidth: "175%" }} src="/screen.png" />} />
    </Canvas>
  </Div>
)
