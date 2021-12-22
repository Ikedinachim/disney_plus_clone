import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom"
import App from './App';

import { Provider } from 'react-redux'
import { store, persistor } from './store'
// import persistor from './store'

import { PersistGate } from 'redux-persist/integration/react'

import { positions, transitions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  timeout: 5000,
  offset: '75px',
  position: positions.TOP_RIGHT,
  transition: transitions.SCALE
}

ReactDOM.render(
  
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider template={AlertTemplate} {...options}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AlertProvider>
      </PersistGate>
    </Provider>,
  document.getElementById('root')
);
