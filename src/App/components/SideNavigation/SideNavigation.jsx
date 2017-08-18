import React from 'react'
import { Link } from 'react-router-dom'
import { Div, Img } from 'glamorous'
import { Box } from 'react-feather'

import SideNavigation, {
  SideNavigationItem,
  SideNavigationLink,
} from '../../../components/SideNavigation/SideNavigation'

export default () =>
  (<SideNavigation color="#445873">
    <SideNavigationItem tooltip="Contiamo" size={60}>
      <Link to="/">
        <Img css={{ maxWidth: '100%' }} alt="Contiamo" src="img/logo/outline.png" />
      </Link>
    </SideNavigationItem>

    <SideNavigationItem tooltip="Components">
      <Box color="white" size={30} />
    </SideNavigationItem>

    {/* A simple separator */}
    <Div css={{ flexGrow: 1, height: '100%' }} />

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
        css={{ maxWidth: '100%' }}
        alt="Avatar"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP0K2M10ttKd6aRHT-7LUhVB3rW2rVZ16N3yJux4pRFXd9jdWNi4eczg"
      />
    </SideNavigationItem>
  </SideNavigation>)
