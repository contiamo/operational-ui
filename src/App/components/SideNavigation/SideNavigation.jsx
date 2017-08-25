import React from "react"
import glamorous from "glamorous"
import { Link } from "react-router-dom"
import { Div, Img } from "glamorous"
import { Box, BarChart2, Grid } from "react-feather"

import SideNavigation, {
  SideNavigationItem,
  SideNavigationLink
} from "../../../components/SideNavigation/SideNavigation"

import Select from "../../../components/Select/Select"

const AppSideNavigation = ({ className }: { className: string }) =>
  <SideNavigation expandOnHover className={className} color="#0c0c1b">
    <SideNavigationItem css={{ marginLeft: -6 }} tooltip="Contiamo" size={24}>
      <Link to="/">
        <Img
          alt="Contiamo"
          src="https://www.contiamo.com/assets/favicon/favicon-32x32.png"
        />
      </Link>
      <Select
        css={{ marginLeft: 26 }}
        placeholder="Project"
        options={[
          { id: 1, label: "Contiamo" },
          { id: 2, label: "Frontiamo" },
          { id: 3, label: "Metriamo" }
        ]}
      />
    </SideNavigationItem>

    <SideNavigationItem tooltip="Components">
      <Box color="#67C283" size={20} />
      <div className="SideNavigationItem__label">Components</div>
    </SideNavigationItem>
    <SideNavigationItem tooltip="Composed">
      <Grid color="#aaa" size={20} />
      <div className="SideNavigationItem__label">Composed</div>
    </SideNavigationItem>
    <SideNavigationItem tooltip="Visualizations">
      <BarChart2 color="#aaa" size={20} />
      <div className="SideNavigationItem__label">Visualizations</div>
    </SideNavigationItem>
    <Div css={{ flexGrow: 1, height: "100%" }} />
  </SideNavigation>

const style: {} = ({ theme }) => ({
  boxShadow: "1px 0 2px rgba(0, 0, 0, 0.2)",
  "& .SideNavigationItem__label": {
    marginLeft: theme.spacing ? theme.spacing * 2 : 32
  }
})

export default glamorous(AppSideNavigation)(style)
