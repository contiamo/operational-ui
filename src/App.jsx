// @flow
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import glamorous, { Div, ThemeProvider } from 'glamorous';

import CoreNavigation, {
  CoreNavigationIcon,
  CoreNavigationLink,
} from './components/CoreNavigation/CoreNavigation';

import Canvas from './Canvas/Canvas';
import DEFAULT_THEME from './App.theme';

import logo from './img/logo/outline.png';
import { Box } from 'react-feather';

const App = ({ className, match }: { className: string }) =>
  (<Router>
    <ThemeProvider theme={DEFAULT_THEME}>
      <div className={className}>
        <CoreNavigation>
          <CoreNavigationIcon main src={logo} link="" label="Contiamo" />
          <CoreNavigationIcon link="" label="Components">
            <Box color="white" size={20} />
          </CoreNavigationIcon>

          {/* A simple separator */}
          <Div css={{ flexGrow: 1, height: '100%' }} />

          <CoreNavigationIcon
            main
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP0K2M10ttKd6aRHT-7LUhVB3rW2rVZ16N3yJux4pRFXd9jdWNi4eczg"
            dropdown
            tooltipPosition="bottom"
          >
            <CoreNavigationLink>My Account</CoreNavigationLink>
            <CoreNavigationLink>Feedback</CoreNavigationLink>
            <CoreNavigationLink>Logout</CoreNavigationLink>
          </CoreNavigationIcon>
        </CoreNavigation>

        <Canvas>//Put Routes in Here</Canvas>
      </div>
    </ThemeProvider>
  </Router>);

const styles: {} = {
  display: 'flex',
  fontSize: DEFAULT_THEME.fonts.defaultSize,
  fontFamily: DEFAULT_THEME.fonts.main,
};

export default glamorous(App)(styles);
