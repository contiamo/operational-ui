import React from "react"
import glamorous from "glamorous"
import { Link } from "react-router-dom"
import { Div, Img } from "glamorous"
import { Box, BarChart, Sidebar, Star, Zap } from "react-feather"

import SideNavigation, {
  SideNavigationItem,
  SideNavigationLink
} from "../../../components/SideNavigation/SideNavigation"

const AppSideNavigation = ({ className }: { className: string }) =>
  <SideNavigation className={className} color="#0c0c1b">
    <SideNavigationItem tooltip="Contiamo" size={60}>
      <Link to="/">
        <Img
          css={{ maxWidth: "100%" }}
          alt="Contiamo"
          src="https://www.contiamo.com/assets/favicon/favicon-32x32.png"
        />
      </Link>
    </SideNavigationItem>

    <SideNavigationItem tooltip="Components">
      <Box color="#aaa" size={30} />
    </SideNavigationItem>
    <SideNavigationItem tooltip="Components">
      <BarChart color="#67C283" size={30} />
    </SideNavigationItem>
    <SideNavigationItem tooltip="Components">
      <Sidebar color="#aaa" size={30} />
    </SideNavigationItem>
    <SideNavigationItem tooltip="Components">
      <Star color="#aaa" size={30} />
    </SideNavigationItem>
    <SideNavigationItem tooltip="Components">
      <Zap color="#aaa" size={30} />
    </SideNavigationItem>
    {/*
    primary: "#22205F",
    accent: "#3333FF",
    secondary: "#00CB98",
    tertiary: "#FFFF98",
    warn: "#DE1A1A"*/}
    {/* A simple separator */}
    <Div css={{ flexGrow: 1, height: "100%" }} />

    <SideNavigationItem
      tooltip={
        <div>
          <SideNavigationLink>My Account</SideNavigationLink>
          <SideNavigationLink>Feedback</SideNavigationLink>
          <SideNavigationLink>Logout</SideNavigationLink>
        </div>
      }
      tooltipAnchor="bottom"
      size={40}
    >
      <Img
        css={{ maxWidth: "100%" }}
        alt="Avatar"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP0K2M10ttKd6aRHT-7LUhVB3rW2rVZ16N3yJux4pRFXd9jdWNi4eczg"
      />
    </SideNavigationItem>
  </SideNavigation>

const style: {} = {
  boxShadow: "1px 0 2px rgba(0, 0, 0, 0.2)"
}

export default glamorous(AppSideNavigation)(style)
