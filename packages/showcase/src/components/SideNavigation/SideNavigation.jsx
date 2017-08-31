// @flow
import React from "react"
import { Link } from "react-router-dom"
import { Div, Img } from "glamorous"
import { Box, BarChart2, Grid } from "react-feather"

import { SideNavigation, SideNavigationItem } from "contiamo-ui-components"

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
}),
  AppSideNavigation = ({ location }: { location?: { pathname: string } }) =>
    <SideNavigation css={style} fix expandOnHover color="#0c0c1b">
      <SideNavigationItem css={{ marginLeft: -6 }} tooltip="Contiamo" size={24}>
        <Link to="/">
          <Img alt="Contiamo" src="https://www.contiamo.com/assets/favicon/favicon-32x32.png" />
        </Link>
      </SideNavigationItem>

      <SideNavigationItem tooltip="Components">
        <Link to="/components">
          <Box color={location && location.pathname.match(/\/components/) ? "#67C283" : "#aaa"} size={20} />
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

export default AppSideNavigation
