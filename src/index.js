/* eslint-disable */
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './AppPage';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

axios.interceptors.request.use(
  request => {
    let token = localStorage.getItem('token');
    if (token) {
      request.headers.common = {
        Authorization: 'Bearer ' + token
      };
    }
    return request;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <Router>
    <App />
  </Router>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
