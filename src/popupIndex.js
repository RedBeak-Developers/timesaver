import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import Popup from './components/Popup';
import './popupIndex.css';

const root = ReactDOM.createRoot(document.getElementById('popup-root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Popup />
    </React.StrictMode>
  </Provider>
);
