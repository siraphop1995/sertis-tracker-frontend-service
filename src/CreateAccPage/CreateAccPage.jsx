import React from 'react';
import axios from 'axios';
import './CreateAccPage.css';
import HelperMethods from '../Helpers/HelperMethods';

class CreateAccPage extends React.Component {
  Helper = new HelperMethods();
  constructor(props) {
    super(props);
    this.state = {
      account: {
        username: {
          value: ''
        },
        password: {
          value: ''
        },
        repeatPassword: {
          value: ''
        },
        name: {
          value: ''
        },
        email: {
          value: ''
        }
      },
      errors: {
        username: 'Username must be 8 characters long!',
        email: 'Email is not valid!',
        password: 'Password must be 8 characters long!'
      }
    };
  }
  state = {
    account: {}
  };

  handleChange = e => {
    const { name, value } = e.target;
    let errors = this.state.errors;

    const validEmailRegex = RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    switch (name) {
      case 'username':
        errors.username =
          value.length < 8 ? 'Username must be 8 characters long!' : '';
        break;
      case 'email':
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 8 ? 'Password must be 8 characters long!' : '';
        break;
      default:
        break;
    }

    this.setState(
      {
        errors,
        account: {
          ...this.state.account,
          [name]: {
            ...this.state.account[name],
            value
          }
        }
      },
      () => {
        // console.log(errors);
      }
    );
  };

  handleStatusCode = err => {
    let errors = this.state.errors;
    switch (err.response.status) {
      case 409:
        errors.username = 'Username already exist';
        break;
      default:
        this.Helper.errorHandler(err);
        break;
    }

    this.setState({
      errors
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const validateForm = errors => {
      let valid = true;
      Object.values(errors).forEach(
        // if we have an error string set valid to false
        val => val.length > 0 && (valid = false)
      );
      return valid;
    };

    try {
      if (validateForm(this.state.errors)) {
        const { account } = this.state;
        let newAccount = {
          username: account.username.value,
          password: account.password.value,
          name: account.name.value,
          email: account.email.value
        };
        const response = await axios.post(
          `/users`,
          newAccount
        );
        this.props.history.push('/login');
      } else {
        console.error('Invalid Form');
      }
    } catch (error) {
      console.error(error);
      this.handleStatusCode(error);
    }
  };

  render() {
    return (
      <div className="container">
        <div className="card bg-light my-5">
          <article className="card-body mx-auto" style={{ maxWidth: '400px' }}>
            <h4 className="card-title mt-3 text-center">Create Account</h4>

            <p className="text-center">Get started with your free account</p>
            <p className="divider-text">
              <span className="bg-light" />
            </p>
            <form>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {' '}
                    <i className="fa fa-lock" />{' '}
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Username"
                  name="username"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.username.length > 0 && (
                <span className="error-text">{this.state.errors.username}</span>
              )}
              {this.state.errors.username.length === 0 && (
                <div className="text-light">invisible</div>
              )}
              <div className="input-group mt-">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {' '}
                    <i className="fa fa-lock" />{' '}
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Create password"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.password.length > 0 && (
                <span className="error-text">{this.state.errors.password}</span>
              )}
              {this.state.errors.password.length === 0 && (
                <div className="text-light">invisible</div>
              )}
              <div className="input-group mt-1.5">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {' '}
                    <i className="fa fa-lock" />{' '}
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Repeat password"
                  type="password"
                  name="repeatPassword"
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-group mt-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {' '}
                    <i className="fa fa-user" />{' '}
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Full name"
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-group mt-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {' '}
                    <i className="fa fa-envelope" />{' '}
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Email address"
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.email.length > 0 && (
                <span className="error-text">{this.state.errors.email}</span>
              )}
              {this.state.errors.email.length === 0 && (
                <div className="text-light">invisible</div>
              )}
              <div className="input-group mt-2.5">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {' '}
                    <i className="fa fa-phone" />{' '}
                  </span>
                </div>
                <select className="custom-select" style={{ maxWidth: '120px' }}>
                  <option defaultValue="">+971</option>
                  <option value="1">+972</option>
                  <option value="2">+198</option>
                  <option value="3">+701</option>
                </select>
                <input
                  name=""
                  className="form-control"
                  placeholder="Phone number"
                  type="text"
                />
              </div>
              <div className="input-group mt-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {' '}
                    <i className="fa fa-building" />{' '}
                  </span>
                </div>
                <select className="form-control">
                  <option defaultValue=""> Select job type</option>
                  <option>Designer</option>
                  <option>Manager</option>
                  <option>Accaunting</option>
                </select>
              </div>

              <div className="form-group mt-3">
                <button
                  onClick={this.handleSubmit}
                  className="btn btn-primary btn-block"
                >
                  {' '}
                  Create Account{' '}
                </button>
              </div>
              <p className="text-center">
                Have an account? <a href="login">Log In</a>{' '}
              </p>
            </form>
          </article>
        </div>
      </div>
    );
  }
}

export { CreateAccPage };
