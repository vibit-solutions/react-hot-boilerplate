import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

const renderApp = Component => (
  <AppContainer>
    <Component />
  </AppContainer>
);

const appEl = document.getElementById('app');
render(renderApp(App), appEl);

if (module.hot) {
  // module.hot.accept();
  module.hot.accept('./App', () => {
    // eslint-disable-next-line
    const NextApp = require('./App');
    render(<NextApp />, appEl);
  });
}
