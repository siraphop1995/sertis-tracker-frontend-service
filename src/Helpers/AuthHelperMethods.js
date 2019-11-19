import decode from 'jwt-decode';
import axios from 'axios';

export default class AuthHelperMethods {
  login = async loginData => {
    try {
      return await axios
        .post(`http://localhost:7001/login`, loginData)
        .then(res => {
          this.setToken(res.data.token);
          return Promise.resolve(res);
        });
    } catch (error) {
      // var errors = new Error(error.response.data.message);
      throw error;
    }
  };

  loggedIn = () => {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  };

  isTokenExpired = token => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  };

  setToken = token => {
    localStorage.setItem('token', token);
  };

  getToken = () => {
    return localStorage.getItem('token');
  };

  logout = () => {
    localStorage.removeItem('token');
  };

  getConfirm = () => {
    let answer = decode(this.getToken());
    return answer;
  };

  _checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };
}
