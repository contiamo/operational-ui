import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import glamorous, { ThemeProvider } from 'glamorous';
import { AppContainer } from 'react-hot-loader';

import App from './App/App';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.querySelector('#app'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App/App', () => {
    const NextAppContainer = require('./App/App');
    render(NextAppContainer);
  });
}
