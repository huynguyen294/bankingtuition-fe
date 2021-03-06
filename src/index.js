import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

/* redux */
import { Provider } from 'react-redux';
import store from './redux/store';

/* bootstrap */
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import './css/font-awesome/all.min.css';
import App from './components/App';

import reportWebVitals from './reportWebVitals';
import configData from './configs/configs.json';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter basename={configData.basename}>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
