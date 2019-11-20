/* eslint-disable */
import React, { Component } from 'react';
import './LoginPage.css';
import AuthHelperMethods from '../Helpers/AuthHelperMethods';
import HelperMethods from '../Helpers/HelperMethods';

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

  async componentDidMount() {}

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
        this.props.history.push('/date');
      })
      .catch(error => {
        this.handleStatusCode(error);
      });
  };

  handleStatusCode = err => {
    let errors = this.state.errors;
    console.log(err);
    if (!err.response) {
      errors = 'Server fail, please check server status';
    } else {
      switch (err.response.status) {
        case 401:
          errors = 'Username or password are incorrect';
          break;
        default:
          this.Helper.errorHandler(err);
          break;
      }
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
                  <div className="form-label-group">
                    <label>Username</label>
                    <input
                      className="form-control"
                      placeholder="Username"
                      required
                      autoFocus
                      name="username"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="form-label-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      name="password"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.length > 0 && (
                    <span className="text-danger">{this.state.errors}</span>
                  )}
                  {this.state.errors.length === 0 && (
                    <div className="text-light">invisible</div>
                  )}
                  <div className="text-light">invisible</div>
                  <button
                    className="mt-60 pt-50 btn btn-lg btn-primary btn-block text-uppercase"
                    onClick={this.handleSubmit}
                  >
                    Sign in
                  </button>
                  <hr className="my-4" />
                  <button
                    className="btn btn-lg btn-block text-uppercase"
                    onClick={this.handleNewAccount}
                  >
                    <i className="fab mr-2" /> Create new account
                  </button>
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
