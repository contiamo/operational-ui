import * as React from "react"
import glamorous, { Div, Img, withTheme } from "glamorous"
import { Link } from "react-router-dom"
import { Box, BarChart2, Grid } from "react-feather"

import { Sidenav, SidenavHeader, SidenavItem, Icon } from "@operational/components"
import { Theme } from "@operational/theme"
import Logo from "../Logo/Logo"

export interface IProps {
  location?: {
    pathname: string
  }
}

interface ILink {
  url?: string
  label: string
  icon: ReactFeatherIconName
  items: {
    url: string
    label: string
  }[]
}

const style: {} = {
  "& a": {
    textDecoration: "none",
    width: "100%"
  }
}

const links: ILink[] = [
  {
    url: "/components",
    label: "Components",
    icon: "Box",
    items: [
      { url: "/buttons", label: "Basics" },
      { url: "/buttons", label: "Breakdowns" },
      { url: "/buttons", label: "Buttons" },
      { url: "/buttons", label: "Cards" },
      { url: "/buttons", label: "Chips" },
      { url: "/buttons", label: "ColorPickers" },
      { url: "/buttons", label: "Context Menus" },
      { url: "/buttons", label: "Form Fields" },
      { url: "/buttons", label: "Grids" },
      { url: "/buttons", label: "Icons" },
      { url: "/buttons", label: "Info Tiles" },
      { url: "/buttons", label: "Modals" },
      { url: "/buttons", label: "Paginators" },
      { url: "/buttons", label: "Progress" },
      { url: "/buttons", label: "Sidebar" },
      { url: "/buttons", label: "Switches" },
      { url: "/buttons", label: "Tabs" },
      { url: "/buttons", label: "Timeline" },
      { url: "/buttons", label: "Tooltips" }
    ]
  },
  {
    url: "/blocks",
    label: "Blocks",
    icon: "Grid",
    items: []
  },
  {
    url: "/visualizations",
    label: "Visualizations",
    icon: "BarChart2",
    items: []
  },
  {
    url: "/documentation",
    label: "Documentation",
    icon: "Edit",
    items: []
  }
]

export default ({ location }: IProps) => {
  return (
    <Sidenav css={style} expanded>
      <Link to="/">
        <SidenavHeader
          css={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
          label="Operational UI"
          icon={<Logo size={28} />}
        />
      </Link>

      {links.map(({ url, label, icon, items }: ILink, index: number) => {
        const routeMatch = location && location.pathname && url && location.pathname.slice(0, url.length) === url
        return (
          <Link to={url || "/"}>
            <SidenavHeader expanded key={index} active={routeMatch} icon={icon} label={label}>
              {items.map((item, index) => <SidenavItem label={item.label} key={index} />)}
            </SidenavHeader>
          </Link>
        )
      })}
    </Sidenav>
  )
}
