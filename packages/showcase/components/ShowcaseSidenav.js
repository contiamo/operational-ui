import glamorous, { Div, Img, withTheme } from "glamorous"
import Link from "next/link"
import { Box, BarChart2, Grid } from "react-feather"

import { Sidenav, SidenavHeader, SidenavItem, Icon } from "@operational/components"
import { routes } from "./routes"
import Logo from "./Logo"

const getMainRouteIcon = mainRoute => {
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

const style = {
  flex: "0 0 240px",
  "& a": {
    textDecoration: "none",
    width: "100%"
  }
}

export default ({ pathname }) => {
  const pathSegments = pathname ? pathname.split("/").filter(s => s !== "") : []
  return (
    <Sidenav css={style} expanded>
      <Link href="/">
        <a>
          <SidenavHeader
            css={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
            label="Operational UI"
            icon={<Logo size={28} />}
          />
        </a>
      </Link>
      {routes.map(({ url, label, items }: IRoute, index: number) => {
        const routeMatch = pathname && url && pathname.slice(0, url.length) === url
        const el = (
          <SidenavHeader expanded key={index} active={pathname === url} icon={getMainRouteIcon(url)} label={label}>
            {routeMatch
              ? items.map((item, index) => (
                  <Link href={url + item.url} key={index}>
                    <a>
                      <SidenavItem label={item.label} key={index} active={item.url.slice(1) === pathSegments[1]} />
                    </a>
                  </Link>
                ))
              : null}
          </SidenavHeader>
        )
        return routeMatch ? (
          el
        ) : (
          <Link href={url || "/"} key={index}>
            <a>{el}</a>
          </Link>
        )
      })}
    </Sidenav>
  )
}
