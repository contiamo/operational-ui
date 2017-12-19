import * as React from "react"
import { Route, withRouter } from "react-router-dom"
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

const SidebarWithRouter = withRouter(Sidebar as any)

const Intro = () => (
  <Card>
    <CardHeader>Components overview</CardHeader>
    <StaticContent markdownContent={introContent} />
  </Card>
)

const links: ISidebarLink[] = [
  {
    label: "Basics",
    links: [
      { url: "/components/colors", label: "Colors" },
      { url: "/components/typography", label: "Typography" },
      { url: "/components/icons", label: "Icons" }
    ]
  },
  {
    label: "UI Elements",
    links: [
      { url: "/components/buttons", label: "Buttons" },
      { url: "/components/cards", label: "Cards" },
      { url: "/components/chips", label: "Chips" },
      { url: "/components/breakdowns", label: "Breakdown" },
      { url: "/components/context-menus", label: "Context Menu" },
      { url: "/components/info-tiles", label: "InfoTiles" },
      { url: "/components/timeline", label: "Timeline" }
    ]
  },
  {
    label: "Data Entry",
    links: [
      { url: "/components/color-picker", label: "Color Picker" },
      { url: "/components/date-pickers", label: "Date Picker" },
      { url: "/components/form-fields", label: "Form Fields" },
      { url: "/components/switch", label: "Switch" },
      { url: "/components/upload", label: "Upload" }
    ]
  },
  {
    label: "Feedback",
    links: [
      { url: "/components/modals", label: "Modals" },
      { url: "/components/progress", label: "Progress" },
      { url: "/components/spinners", label: "Spinners" },
      { url: "/components/tooltips", label: "Tooltips" }
    ]
  },
  {
    label: "Navigation",
    links: [
      { url: "/components/paginator", label: "Pagination" },
      { url: "/components/sidebar", label: "Sidebar" },
      { label: "Side Navigation" },
      { url: "/components/tabs", label: "Tabs" }
    ]
  },
  {
    label: "Layout",
    links: [{ url: "/components/grids", label: "Grid" }, { label: "List" }]
  }
]

export default () => (
  <PageContent>
    <SidebarWithRouter links={links} css={{ height: "100%" }} />
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
      <Route path="/demo" render={() => <img style={{ maxWidth: "175%" }} src="/screen.png" />} />
    </Canvas>
  </PageContent>
)
