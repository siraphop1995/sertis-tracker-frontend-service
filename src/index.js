/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './AppPage';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { directive } from '@babel/types';

const local_url = 'http://localhost:3000'
const vm_url = 'http://35.198.233.48:3000'

axios.defaults.baseURL = vm_url;

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
    console.log(error);
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
