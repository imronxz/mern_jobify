import React from 'react';
import ReactDOM from 'react-dom';
//! Context Provider
import { AppProvider } from './context/appContext';

import 'normalize.css';
import './index.css';

import App from './App';

ReactDOM.render(
  <AppProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppProvider>,
  document.getElementById('root'),
);
