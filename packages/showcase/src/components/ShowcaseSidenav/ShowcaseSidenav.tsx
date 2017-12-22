import * as React from "react"
import glamorous, { Div, Img, withTheme } from "glamorous"
import { Link } from "react-router-dom"
import { Box, BarChart2, Grid } from "react-feather"

import { Sidenav, SidenavHeader, SidenavItem, Icon } from "@operational/components"
import { Theme } from "@operational/theme"
import { routes, IRoute } from "../../routes"
import Logo from "../Logo/Logo"

export interface IProps {
  pathname: string
}

const getMainRouteIcon = (mainRoute: string): ReactFeatherIconName => {
  if (mainRoute === "/components") {
    return "Box"
  }
  if (mainRoute === "/blocks") {
    return "Grid"
  }
  if (mainRoute === "/visualizations") {
    return "BarChart2"
  }
  return "Edit"
}

const style: {} = {
  "& a": {
    textDecoration: "none",
    width: "100%"
  }
}

export default ({ pathname }: IProps) => {
  const pathSegments = pathname ? pathname.split("/").filter(s => s !== "") : []
  return (
    <Sidenav css={style} expanded>
      <Link to="/">
        <SidenavHeader
          css={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
          label="Operational UI"
          icon={<Logo size={28} />}
        />
      </Link>
      {routes.map(({ url, label, items }: IRoute, index: number) => {
        const routeMatch = pathname && url && pathname.slice(0, url.length) === url
        const el = (
          <SidenavHeader expanded key={index} active={pathname === url} icon={getMainRouteIcon(url)} label={label}>
            {routeMatch
              ? items.map((item, index) => (
                  <Link to={url + item.url} key={index}>
                    <SidenavItem label={item.label} key={index} active={item.url.slice(1) === pathSegments[1]} />
                  </Link>
                ))
              : null}
          </SidenavHeader>
        )
        return routeMatch ? (
          el
        ) : (
          <Link to={url || "/"} key={index}>
            {el}
          </Link>
        )
      })}
    </Sidenav>
  )
}
