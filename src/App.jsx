import React from 'react';
import { hot } from 'react-hot-loader';

import logoReact from './react-logo.svg';

const App = () => (
  <div className="container">
    <img src={logoReact} alt="logo react" />
    <span>React Boilerplate</span>
  </div>
);

export default hot(module)(App);
