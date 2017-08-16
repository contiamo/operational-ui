import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import glamorous, { ThemeProvider } from 'glamorous';
import { css } from 'glamor';
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

css.global('h1', {
  margin: 0,
  fontSize: '2rem',
});

css.global('h2', {
  fontSize: '1.3rem',
});

css.global('p', {
  margin: 0,
  marginBottom: 16,
});

render(App);

if (module.hot) {
  module.hot.accept('./App/App', () => {
    const NextAppContainer = require('./App/App');
    render(NextAppContainer);
  });
}
