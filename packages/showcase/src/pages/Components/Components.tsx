import * as React from "react"
import { Route } from "react-router-dom"
import { Card, CardHeader } from "@operational/components"

import Canvas from "../../components/Canvas/Canvas"
import PageContent from "../../components/PageContent/PageContent"
import Sidebar, { ISidebarLink } from "../../components/Sidebar/Sidebar"
import StaticContent from "../../components/StaticContent/StaticContent"
import Buttons from "./Buttons/Buttons"
import Breakdowns from "./Breakdowns/Breakdowns"
import FormFields from "./FormFields/FormFields"
import Cards from "./Cards/Cards"
import Chips from "./Chips/Chips"
import ContextMenus from "./ContextMenus/ContextMenus"
import Grids from "./Grids/Grids"
import Tooltips from "./Tooltips/Tooltips"
import InfoTiles from "./InfoTiles/InfoTiles"
import SidebarPage from "./Sidebar/Sidebar"
import ColorPickers from "./ColorPickers/ColorPickers"
import DatePickers from "./DatePickers/DatePickers"
import Modals from "./Modals/Modals"
import Spinners from "./Spinners/Spinners"
import Switches from "./Switches/Switches"
import Icons from "./Icons/Icons"
import Typography from "./Typography/Typography"
import Colors from "./Colors/Colors"
import Paginator from "./Paginator/Paginator"
import Progress from "./Progress/Progress"
import Tabs from "./Tabs/Tabs"
import Timeline from "./Timeline/Timeline"
import Uploads from "./Uploads/Uploads"
import introContent from "./intro.docs"

const Intro = () => (
  <Card>
    <CardHeader>Components overview</CardHeader>
    <StaticContent markdownContent={introContent} />
  </Card>
)

export default () => (
  <PageContent>
    <Canvas>
      <Route exact path="/components" component={Intro} />
      <Route path="/components/buttons" component={Buttons} />
      <Route path="/components/breakdowns" component={Breakdowns} />
      <Route path="/components/form-fields" component={FormFields} />
      <Route path="/components/grids" component={Grids} />
      <Route path="/components/color-picker" component={ColorPickers} />
      <Route path="/components/date-pickers" component={DatePickers} />
      <Route path="/components/cards" component={Cards} />
      <Route path="/components/chips" component={Chips} />
      <Route path="/components/context-menus" component={ContextMenus} />
      <Route path="/components/tooltips" component={Tooltips} />
      <Route path="/components/info-tiles" component={InfoTiles} />
      <Route path="/components/modals" component={Modals} />
      <Route path="/components/sidebar" component={SidebarPage} />
      <Route path="/components/icons" component={Icons} />
      <Route path="/components/switch" component={Switches} />
      <Route path="/components/spinners" component={Spinners} />
      <Route path="/components/typography" component={Typography} />
      <Route path="/components/colors" component={Colors} />
      <Route path="/components/paginator" component={Paginator} />
      <Route path="/components/progress" component={Progress} />
      <Route path="/components/tabs" component={Tabs} />
      <Route path="/components/timeline" component={Timeline} />
      <Route path="/components/upload" component={Uploads} />
    </Canvas>
  </PageContent>
)
