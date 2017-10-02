import * as React from "react"
import glamorous, { Div, Img } from "glamorous"
import { Link } from "react-router-dom"
import { Box, BarChart2, Grid } from "react-feather"

import { SideNavigation, SideNavigationHeader, SideNavigationItem } from "contiamo-ui-components"

type Props = {
  location?: {
    pathname: string
  }
  theme?: Theme
}

const style: {} = (): {} => ({
  "& a": {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "white"
  },
  "& .SideNavigationItem__label": {
    marginLeft: 20
  }
})

const AppSideNavigation = ({ location }: Props) => {
  const routeMatch = !!(
    location &&
    location.pathname &&
    location.pathname.match(/\/components/) &&
    location.pathname.match(/\/components/).length > 0
  )

  return (
    <SideNavigation css={style} fix expandOnHover color="#4E5665">
      <SideNavigationHeader>
        <Link to="/">
          <Img css={{ maxWidth: 32, marginRight: 16 }} alt="Contiamo" src="/img/logo/outline.png" />
          Contiamo
        </Link>
      </SideNavigationHeader>

      <SideNavigationItem active={routeMatch}>
        <Link to="/components">
          <Box color={routeMatch ? "#67FFAA" : "#fff"} size={20} />
          <Div
            css={{
              color: routeMatch ? "#67FFAA" : "#fff"
            }}
            className="SideNavigationItem__label"
          >
            Components
          </Div>
        </Link>
      </SideNavigationItem>
      <SideNavigationItem>
        <Link to="#">
          <Grid color="#fff" size={20} />
          <div className="SideNavigationItem__label">Composed</div>
        </Link>
      </SideNavigationItem>
      <SideNavigationItem>
        <Link to="#">
          <BarChart2 color="#fff" size={20} />
          <div className="SideNavigationItem__label">Visualizations</div>
        </Link>
      </SideNavigationItem>
      <Div css={{ flexGrow: 1, height: "100%" }} />
    </SideNavigation>
  )
}

export default glamorous(AppSideNavigation)(style)
