/* eslint-disable */
import React, { Component } from 'react';
import './LoginPage.css';
import AuthHelperMethods from '../Helpers/AuthHelperMethods';
import HelperMethods from '../Helpers/HelperMethods';
import {
  MDBRow,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol
} from 'mdbreact';

class LoginPage extends Component {
  Auth = new AuthHelperMethods();
  Helper = new HelperMethods();
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      validState: '',
      errorMessage: ''
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
    let errorMessage = this.state.errorMessage;
    if (!err.response) {
      errorMessage = 'Server fail, please check server status';
    } else {
      switch (err.response.status) {
        case 401:
          errorMessage = 'Username or password are incorrect';
          break;
        default:
          this.Helper.errorHandler(err);
          break;
      }
    }

    this.setState({
      errorMessage,
      validState: 'is-invalid'
    });
  };

  handleNewAccount = e => {
    e.preventDefault();
    this.props.history.push('/signup');
  };

  render() {
    const { errorMessage, validState } = this.state;
    let formValidState = `form-control ${validState}`;
    return (
      <section className="section -fluid login-container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle className="text-center mt-2">Login</MDBCardTitle>
                <form className="form-signin">
                  <MDBRow className="mb-2">
                    <MDBCol md="12" lg="12">
                      <label>Username</label>
                      <input
                        className={formValidState}
                        placeholder="Username"
                        required
                        autoFocus
                        name="username"
                        onChange={this.handleChange}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-3">
                    <MDBCol md="12" lg="12">
                      <label>Password</label>
                      <input
                        type="password"
                        className={formValidState}
                        placeholder="Password"
                        required
                        name="password"
                        onChange={this.handleChange}
                      />
                      <div className="invalid-feedback">{errorMessage}</div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-1">
                    <MDBCol md="12" lg="12">
                      <button
                        className="mt-60 pt-50 btn btn-lg btn-primary btn-block text-uppercase"
                        onClick={this.handleSubmit}
                      >
                        Sign in
                      </button>
                    </MDBCol>
                  </MDBRow>
                </form>
              </MDBCardBody>
            </MDBCard>
          </div>
        </div>
      </section>
    );
  }
}

export { LoginPage };
