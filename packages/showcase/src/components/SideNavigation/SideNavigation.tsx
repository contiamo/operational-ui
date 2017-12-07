import * as React from "react"
import glamorous, { Div, Img, withTheme } from "glamorous"
import { Link } from "react-router-dom"
import { Box, BarChart2, Grid } from "react-feather"

import { SideNavigation, SideNavigationHeader, SideNavigationItem, Icon } from "@operational/components"
import { Theme } from "@operational/theme"

export interface IProps {
  location?: {
    pathname: string
  }
}

interface IPropsWithTheme extends IProps {
  theme: Theme
}

interface ILink {
  url?: string
  label: string
  icon: ReactFeatherIconName
}

const style: {} = {
  "& a": {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    textDecoration: "none",
    color: "white",
    width: "100%",
    padding: `10px 20px`,
    minHeight: "100%"
  }
}

const links: ILink[] = [
  { url: "/components", label: "Components", icon: "Box" },
  { url: "/blocks", label: "Blocks", icon: "Grid" },
  { url: "/visualizations", label: "Visualizations", icon: "BarChart2" },
  { url: "/documentation", label: "Documentation", icon: "Edit" }
]

const highlightColor = "rgb(20, 153, 206)"

const AppSideNavigation: React.SFC<IPropsWithTheme> = ({ location, theme }: IPropsWithTheme) => {
  return (
    <SideNavigation css={style} fix expandOnHover>
      <SideNavigationHeader>
        <Link to="/">
          <Img
            css={{ position: "relative", maxWidth: 32, marginRight: 16, left: -7 }}
            alt="Contiamo"
            src="/img/logo/outline.png"
          />
          <span style={{ position: "relative", left: -7 }}>Operational</span>
        </Link>
      </SideNavigationHeader>

      {links.map(({ url, label, icon }: ILink, index: number) => {
        const routeMatch = location && location.pathname && url && location.pathname.slice(0, url.length) === url
        const color = routeMatch ? theme.colors.usage.link : "#fff"
        return (
          <SideNavigationItem key={index} active={routeMatch}>
            <Link to={url || "/"}>
              <Icon name={icon} color={color} size={20} />
              <Div css={{ color, marginLeft: 20 }}>{label}</Div>
            </Link>
          </SideNavigationItem>
        )
      })}
      <Div css={{ flexGrow: 1, height: "100%" }} />
    </SideNavigation>
  )
}

const WrappedAppSideNavigation: React.SFC<IProps> = withTheme(AppSideNavigation)

export default WrappedAppSideNavigation
