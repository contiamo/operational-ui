// @flow
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import glamorous, { Img, Div, ThemeProvider } from 'glamorous';

import SideNavigation, {
  SideNavigationItem,
  SideNavigationLink,
  SideNavigationTooltip,
} from './components/SideNavigation/SideNavigation';

import Header, { HeaderItem, HeaderSeparator, HeaderTitle } from './components/Header/Header';

import Canvas from './Canvas/Canvas';
import DEFAULT_THEME from './App.theme';

import logo from './img/logo/outline.png';
import { Box, Camera } from 'react-feather';

const App = ({ className, match }: { className: string }) =>
  (<Router>
    <ThemeProvider theme={DEFAULT_THEME}>
      <div className={className}>
        <SideNavigation>
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

        <Div css={{ display: 'flex', flexDirection: 'column', width: '100vw' }}>
          <Header color="primary">
            <HeaderTitle>Holamundo</HeaderTitle>
            <HeaderItem>
              <Camera /> Hi
            </HeaderItem>
          </Header>

          <Canvas>//Put Routes in Here</Canvas>
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
