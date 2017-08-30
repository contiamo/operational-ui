import React from "react"
import glamorous from "glamorous"
import { Link } from "react-router-dom"
import { Div, Img } from "glamorous"
import { Box, BarChart2, Grid } from "react-feather"

import {
  SideNavigation,
  SideNavigationHeader,
  SideNavigationItem,
  SideNavigationLink
} from "contiamo-ui-components"

const style: {} = ({ theme }) => ({
  "& a": {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "white"
  },
  "& .SideNavigationItem__label": {
    marginLeft: 25
  }
})
//expandedShadow => 3px 0 11px rgba(0, 0, 0, 0.19)
// tooltip => 222
// card headers
//lineheight 20, color #747474, fontsize: 13, proximanova400
// card tabs (tabs)
// buttons, 2px radius, bordercolor #e2e2e2, no shadow, inherit color <- copy shadows
//cliuckable things have  a 2px borderraduus

const AppSideNavigation = ({ location }: { location: {} }) =>
  <SideNavigation css={style} fix expandOnHover color="#4E5665">
    <SideNavigationHeader tooltip="Contiamo" size={24}>
      <Img
        css={{ maxWidth: 32, marginRight: 16 }}
        alt="Contiamo"
        src="/img/logo/outline.png"
      />
      Contiamo
    </SideNavigationHeader>

    <SideNavigationItem
      active={location.pathname.match(/\/components/)}
      tooltip="Components"
    >
      <Link to="/components">
        <Box
          color={location.pathname.match(/\/components/) ? "#67FFAA" : "#fff"}
          size={20}
        />
        <Div
          css={{
            color: location.pathname.match(/\/components/) ? "#67FFAA" : "#fff"
          }}
          className="SideNavigationItem__label"
        >
          Components
        </Div>
      </Link>
    </SideNavigationItem>
    <SideNavigationItem tooltip="Composed">
      <Link to="#">
        <Grid color="#fff" size={20} />
        <div className="SideNavigationItem__label">Composed</div>
      </Link>
    </SideNavigationItem>
    <SideNavigationItem tooltip="Visualizations">
      <Link to="#">
        <BarChart2 color="#fff" size={20} />
        <div className="SideNavigationItem__label">Visualizations</div>
      </Link>
    </SideNavigationItem>
    <Div css={{ flexGrow: 1, height: "100%" }} />
  </SideNavigation>

export default AppSideNavigation
