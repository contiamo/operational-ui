// @flow
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import glamorous, { Div, ThemeProvider } from 'glamorous';

import SideNavigation from './SideNavigation/SideNavigation';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import AppCanvas from './Canvas/Canvas';

import DEFAULT_THEME from '../theme';

const App = ({ className }: { className: string }) =>
  (<Router>
    <ThemeProvider theme={DEFAULT_THEME}>
      <div className={className}>
        <SideNavigation />
        <Div css={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
          <Header />
          <Div css={{ display: 'flex', padding: 16, width: '100%', height: '100vh' }}>
            <Sidebar />
            <AppCanvas css={{ marginLeft: 16, flexBasis: '100%' }} />
          </Div>
        </Div>
      </div>
    </ThemeProvider>
  </Router>);

const styles: {} = {
  display: 'flex',
  backgroundColor: DEFAULT_THEME.greys && DEFAULT_THEME.greys['10'],
  ...DEFAULT_THEME.fonts,
};

export default glamorous(App)(styles);
