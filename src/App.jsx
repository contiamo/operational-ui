// @flow
import React from 'react';
import glamorous from 'glamorous';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { APP_COLORS, APP_GREYS, APP_FONTS, MENU } from './App.settings';
import Navigation from './Navigation/Navigation';
import Canvas from './Canvas/Canvas';

const App = ({ className, match }: { className: string }) =>
  (<Router>
    <div className={className}>
      <Navigation menuItems={MENU} />
      <Canvas>//Put Routes in Here</Canvas>
    </div>
  </Router>);

const styles = {
  fontFamily: APP_FONTS.main,
  fontSize: APP_FONTS.defaultSize,
  display: 'flex',
};

export default glamorous(App)(styles);
