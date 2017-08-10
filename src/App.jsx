// @flow
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import glamorous, { Img, Div, ThemeProvider } from 'glamorous';
import { Box, Camera } from 'react-feather';

import { darken } from './utils/color';

import SideNavigation, {
  SideNavigationItem,
  SideNavigationLink,
} from './components/SideNavigation/SideNavigation';

import Header, { HeaderItem, HeaderSeparator, HeaderTitle } from './components/Header/Header';

import Sidebar, { SidebarItem, SidebarLink } from './components/Sidebar/Sidebar';

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
          <SideNavigationItem tooltip="Contiamo" size={60}>
            <Img css={{ maxWidth: '100%' }} alt="Contiamo" src={logo} />
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
                  (<SidebarItem key={index} title="My">
                    <SidebarLink
                      tooltip="The Channel Group associated with an end user's session for this View (defined by the View's Channel Groupings)."
                      symbol="%"
                    >
                      Hola Compadre
                    </SidebarLink>
                    <SidebarLink to="/route" symbol="%">
                      No albo español?
                    </SidebarLink>
                    <SidebarItem tooltip="Sup" key={index} title="My">
                      <SidebarLink tooltip="This means hi friend in spanish" symbol="%">
                        Hola Compadre
                      </SidebarLink>
                      <SidebarItem
                        onClick={() => new Promise(resolve => setTimeout(() => resolve(), 2000))}
                        key={index}
                        title="My"
                      >
                        <SidebarLink symbol="%">Hola Compadre</SidebarLink>
                        <SidebarItem key={index} title="My">
                          <SidebarLink symbol="%">Hola Compadre</SidebarLink>
                          <SidebarItem key={index} title="My">
                            <SidebarLink
                              tooltip={<img src="http://placehold.it/200x200" />}
                              symbol="%"
                            >
                              Hola Compadre
                            </SidebarLink>
                            <SidebarItem key={index} title="My">
                              <SidebarLink symbol="%">Hola Compadre</SidebarLink>
                            </SidebarItem>
                          </SidebarItem>
                        </SidebarItem>
                      </SidebarItem>
                    </SidebarItem>
                  </SidebarItem>),
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
