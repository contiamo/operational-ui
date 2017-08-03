// @flow
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import glamorous, { ThemeProvider } from 'glamorous';

import Navigation from './Navigation/Navigation';
import Canvas from './Canvas/Canvas';
import DEFAULT_THEME from './App.theme';

const App = ({ className, match }: { className: string }) =>
  (<Router>
    <ThemeProvider theme={DEFAULT_THEME}>
      <div className={className}>
        <Navigation />
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
