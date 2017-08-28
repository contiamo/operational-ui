import React from "react"
import glamorous from "glamorous"
import { Link } from "react-router-dom"
import { Div, Img } from "glamorous"
import { Box, BarChart2, Grid } from "react-feather"

import SideNavigation, {
  SideNavigationItem,
  SideNavigationLink
} from "../../../components/SideNavigation/SideNavigation"

const AppSideNavigation = ({
  className,
  location
}: {
  className: string,
  location: {},
}) =>
  <SideNavigation fix expandOnHover className={className} color="#0c0c1b">
    <SideNavigationItem css={{ marginLeft: -6 }} tooltip="Contiamo" size={24}>
      <Link to="/">
        <Img
          alt="Contiamo"
          src="https://www.contiamo.com/assets/favicon/favicon-32x32.png"
        />
      </Link>
    </SideNavigationItem>

    <SideNavigationItem tooltip="Components">
      <Link to="/components">
        <Box
          color={location.pathname.match(/\/components/) ? "#67C283" : "#aaa"}
          size={20}
        />
        <div className="SideNavigationItem__label">Components</div>
      </Link>
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
  "& a": {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "white"
  },
  "& .SideNavigationItem__label": {
    marginLeft: theme.spacing ? theme.spacing * 2 : 32
  }
})

export default glamorous(AppSideNavigation)(style)
