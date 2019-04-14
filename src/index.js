import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from "./redux/reducer";
import App from './App';
import './index.css';

const logger = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(logger)
);


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);