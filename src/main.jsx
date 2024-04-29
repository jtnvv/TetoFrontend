import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>

      <Provider store={store}>
        <App />
      </Provider>

  </React.StrictMode>,
);
