import * as React from "react"
import glamorous, { Div, Img } from "glamorous"
import { Link } from "react-router-dom"
import { Box, BarChart2, Grid } from "react-feather"

import { SideNavigation, SideNavigationHeader, SideNavigationItem, Icon } from "contiamo-ui-components"

type Props = {
  location?: {
    pathname: string
  }
  theme?: Theme
}

const style: {} = (): {} => ({
  "& a": {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    textDecoration: "none",
    color: "white",
    width: "100%",
    paddingLeft: 20,
    height: 40
  },
  "& .SideNavigationItem__label": {
    marginLeft: 20
  }
})

const AppSideNavigation = ({ location }: Props) => {
  return (
    <SideNavigation css={style} fix expandOnHover color="#4E5665">
      <SideNavigationHeader>
        <Link style={{ left: -7 }} to="/">
          <Img css={{ maxWidth: 32, marginRight: 16 }} alt="Contiamo" src="/img/logo/outline.png" />
          Contiamo
        </Link>
      </SideNavigationHeader>

      {[
        { url: "/components", label: "Components", icon: "Box" },
        { label: "Composed", icon: "Grid" },
        { url: "/visualizations", label: "Visualizations", icon: "BarChart2" }
      ].map(({ url, label, icon }: { url?: string; label: string; icon: string }, index: number) => {
        const routeMatch = location && location.pathname && url && location.pathname.slice(0, url.length) === url
        const color = routeMatch ? "#67FFAA" : "#fff"
        return (
          <SideNavigationItem key={index} active={routeMatch}>
            <Link to={url || "/"}>
              <Icon name={icon} color={color} size={20} />
              <Div css={{ color }} className="SideNavigationItem__label">
                {label}
              </Div>
            </Link>
          </SideNavigationItem>
        )
      })}
      <Div css={{ flexGrow: 1, height: "100%" }} />
    </SideNavigation>
  )
}

export default glamorous(AppSideNavigation)(style)
