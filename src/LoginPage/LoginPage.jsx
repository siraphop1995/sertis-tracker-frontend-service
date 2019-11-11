/* eslint-disable */
import React, { Component } from 'react';
import './LoginPage.css';
import AuthHelperMethods from '../Helpers/AuthHelperMethods';
import HelperMethods from '../Helpers/HelperMethods';
import axios from 'axios';

class LoginPage extends Component {
  Auth = new AuthHelperMethods();
  Helper = new HelperMethods();
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      currentUser: null,
      errors: ''
    };
  }

  async componentDidMount() {
    try {
      const res = await axios('/test');
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { username, password } = this.state;
    let loginData = {
      username: username,
      password: password
    };

    this.Auth.login(loginData)
      .then(res => {
        if (res === false) {
          return alert("Sorry those credentials don't exist!");
        }
        this.props.history.push('/');
      })
      .catch(error => {
        this.handleStatusCode(error);
      });
  };

  handleStatusCode = err => {
    let errors = this.state.errors;
    switch (err.response.status) {
      case 401:
        errors = 'Username or password are incorrect';
        break;
      default:
        this.Helper.errorHandler(err);
        break;
    }

    this.setState({
      errors
    });
  };

  handleNewAccount = e => {
    e.preventDefault();
    this.props.history.push('/signup');
  };

  render() {
    return (
      <section className="section -fluid login-container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5 bg-light">
              <div className="card-body">
                <h5 className="card-title text-center">Login</h5>
                <form className="form-signin">
                  <img
                    className="mb-4"
                    src="{{ site.baseurl }}/docs/{{
      site.docs_version
    }}/assets/brand/bootstrap-solid.svg"
                    alt=""
                    width="72"
                    height="72"
                  />
                  {/* <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1> */}
                  <label htmlFor="inputUsername" className="sr-only">
                  Username
                  </label>
                  <input
                    id="inputUsername"
                    className="form-control"
                    placeholder="Username"
                    required
                    autoFocus
                  />
                  <label htmlFor="inputPassword" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required
                  />
                  <div className="checkbox mb-3">
                    <label>
                      {' '}
                      <input type="checkbox" value="remember-me" /> Remember me{' '}
                    </label>
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                  >
                    Sign in
                  </button>
                  {/* <p class="mt-5 mb-3 text-muted">&copy; 2017-{{ site.time | date: "%Y" }}</p> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export { LoginPage };
