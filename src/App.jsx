// @flow
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import glamorous, { Img, Div, ThemeProvider } from 'glamorous';
import { Box, Camera } from 'react-feather';

import { darken } from './utils/color';

import SideNavigation, {
  SideNavigationItem,
  SideNavigationLink,
  SideNavigationTooltip,
} from './components/SideNavigation/SideNavigation';

import Header, { HeaderItem, HeaderSeparator, HeaderTitle } from './components/Header/Header';

import Sidebar, { SidebarItem, SidebarLink, SidebarTooltip } from './components/Sidebar/Sidebar';

import Canvas from './Canvas/Canvas';

import logo from './img/logo/outline.png';

import DEFAULT_THEME from './App.theme';

/* @todo remove this after the sidebar is proper.
This just generates some sidebar items to play with. */
const getItems = [...Array(100)];

const App = ({ className, match }: { className: string }) =>
  (<Router>
    <ThemeProvider theme={DEFAULT_THEME}>
      <div className={className}>
        <SideNavigation color="#445873">
          <SideNavigationItem size={60}>
            <Img css={{ maxWidth: '100%' }} alt="Contiamo" src={logo} />
            <SideNavigationTooltip>Contiamo</SideNavigationTooltip>
          </SideNavigationItem>

          <SideNavigationItem>
            <Box color="white" size={30} />
            <SideNavigationTooltip>Components</SideNavigationTooltip>
          </SideNavigationItem>

          {/* A simple separator */}
          <Div css={{ flexGrow: 1, height: '100%' }} />

          <SideNavigationItem size={40}>
            <Img
              css={{ maxWidth: '100%' }}
              alt="Avatar"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP0K2M10ttKd6aRHT-7LUhVB3rW2rVZ16N3yJux4pRFXd9jdWNi4eczg"
            />
            <SideNavigationTooltip position="bottom">
              <SideNavigationLink>My Account</SideNavigationLink>
              <SideNavigationLink>Feedback</SideNavigationLink>
              <SideNavigationLink>Logout</SideNavigationLink>
            </SideNavigationTooltip>
          </SideNavigationItem>
        </SideNavigation>

        <Div css={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
          <Header color="#445873">
            <HeaderTitle>Contiamo</HeaderTitle>
            <HeaderItem>
              <Camera /> Gallery
            </HeaderItem>
            <HeaderItem>
              <Box /> Components
            </HeaderItem>
            <HeaderSeparator />
            <HeaderItem>Logout</HeaderItem>
          </Header>

          <Canvas>
            <Route default>
              <Sidebar>
                {/* It's play time! See line 22 */}
                {getItems.map((item, index) =>
                  (<div key={index}>
                    <SidebarLink color="#fff" symbol="%">
                      Hola Compadre
                      <SidebarTooltip>This says hi, friend in Spanish</SidebarTooltip>
                    </SidebarLink>
                    <SidebarItem title="My">
                      <SidebarLink symbol="%">
                        Hola Compadre
                        <SidebarTooltip>This says hi, friend in Spanish</SidebarTooltip>
                      </SidebarLink>
                      <SidebarItem title="Name">
                        <SidebarLink symbol="%">
                          Hola Compadre
                          <SidebarTooltip>This says hi, friend in Spanish</SidebarTooltip>
                        </SidebarLink>
                      </SidebarItem>
                      <SidebarItem title="Name">
                        <SidebarItem title="Name" />
                        <SidebarItem title="Name" />
                        <SidebarItem title="Name" />
                        <SidebarItem title="Name">
                          <SidebarItem title="Name" />
                          <SidebarItem title="Name" />
                          <SidebarItem title="Name" />
                          <SidebarItem title="Name">
                            <SidebarItem title="Name" />
                            <SidebarItem title="Name" />
                            <SidebarItem title="Name" />
                          </SidebarItem>
                        </SidebarItem>
                      </SidebarItem>

                      <SidebarItem title="Name" />
                      <SidebarItem title="Name" />
                    </SidebarItem>
                  </div>),
                )}
              </Sidebar>
            </Route>
          </Canvas>
        </Div>
      </div>
    </ThemeProvider>
  </Router>);

const styles: {} = {
  display: 'flex',
  fontSize: DEFAULT_THEME.fonts.defaultSize,
  fontFamily: DEFAULT_THEME.fonts.main,
};

export default glamorous(App)(styles);
