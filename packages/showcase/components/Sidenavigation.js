import glamorous, { Div, Img, withTheme } from "glamorous"
import Link from "next/link"
import Router from "next/router"
import { Box, BarChart2, Grid } from "react-feather"

import { Sidenav, SidenavHeader, SidenavItem, Icon } from "@operational/components"
import * as icons from "./Icons"

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

const mainPaths = ["/components", "/blocks", "/visualizations", "/documentation"]

export default ({ pathname, pathmap }) => {
  const pathSegments = pathname ? pathname.split("/").filter(s => s !== "") : []
  return (
    <Sidenav css={style} width={240} expanded>
      <Link prefetch href="/">
        <a>
          <SidenavHeader
            css={{ borderBottom: "1px solid #515151" }}
            label="Operational UI"
            icon={<icons.Operational size={28} />}
          />
        </a>
      </Link>
      {mainPaths.map((url, index) => {
        const label = pathmap[url].query.title
        const items = Object.keys(pathmap)
          .filter(s => !!s.match(new RegExp("^" + url)) && s !== url)
          .map(url => ({
            url,
            label: pathmap[url].query.title
          }))
        const routeMatch = pathname && url && pathname.slice(0, url.length) === url
        const Logo = (() => {
          if (url === "/components") {
            return icons.Components
          }
          if (url === "/blocks") {
            return icons.Blocks
          }
          if (url === "/visualizations") {
            return icons.Visualizations
          }
          if (url === "/documentation") {
            return icons.Documentation
          }
          return icons.Components
        })()
        const el = (
          <SidenavHeader
            css={{ cursor: "pointer" }}
            expanded={routeMatch}
            key={index}
            active={pathname === url}
            icon={<Logo size={28} />}
            label={label}
          >
            {routeMatch
              ? items.map((item, index) => (
                  <Link prefetch retch href={item.url} key={index}>
                    <a>
                      <SidenavItem label={item.label} key={index} active={item.url === pathname} />
                    </a>
                  </Link>
                ))
              : null}
          </SidenavHeader>
        )
        return routeMatch ? (
          el
        ) : (
          <Link prefetch href={url || "/"} key={index}>
            <a>{el}</a>
          </Link>
        )
      })}
    </Sidenav>
  )
}
