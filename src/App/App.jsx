// @flow
import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import glamorous, { Div, ThemeProvider } from 'glamorous';

import SideNavigation from './components/SideNavigation/SideNavigation';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import AppCanvas from './components/Canvas/Canvas';

import CardsPage from './pages/Cards/Cards';
import ChipsPage from './pages/Chips/Chips';
import TooltipsPage from './pages/Tooltips/Tooltips';
import StatsPage from './pages/Stats/Stats';
import SidebarPage from './pages/Sidebar/Sidebar';

import DEFAULT_THEME from '../theme';

const SidebarWithRouter = withRouter(Sidebar);

const App = ({ className }: { className: string }) =>
  (<Router>
    <ThemeProvider theme={DEFAULT_THEME}>
      <div className={className}>
        <SideNavigation />
        <Div
          css={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            height: '100vh',
          }}
        >
          <Header />
          <Div
            css={{
              display: 'flex',
              padding: 16,
              width: '100%',
              height: '100vh',
            }}
          >
            <SidebarWithRouter />
            <AppCanvas css={{ marginLeft: 16, flexBasis: '100%' }}>
              <Route path="/cards" component={CardsPage} />
              <Route path="/chips" component={ChipsPage} />
              <Route path="/tooltips" component={TooltipsPage} />
              <Route path="/stats" component={StatsPage} />
              <Route path="/sidebar" component={SidebarPage} />
            </AppCanvas>
          </Div>
        </Div>
      </div>
    </ThemeProvider>
  </Router>);

const styles: {} = {
  display: 'flex',
  backgroundColor: DEFAULT_THEME.greys['10'],
  ...DEFAULT_THEME.fonts,
};

export default glamorous(App)(styles);
