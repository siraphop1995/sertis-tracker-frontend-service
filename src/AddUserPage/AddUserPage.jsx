import React from 'react';
import HelperMethods from '../Helpers/HelperMethods';
import withAuth from '../components/withAuth';
import { createUser } from '../Helpers/dbHandler';

import {
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCol,
  MDBBtn
} from 'mdbreact';

class AddUserPage extends React.Component {
  Helper = new HelperMethods();

  constructor(props) {
    super(props);
    this.form = React.createRef();

    this.state = {
      account: {
        uid: {
          value: '',
          validState: 'form-control ',
          error: ''
        },
        firstName: {
          value: '',
          validState: 'form-control ',
          error: ''
        },
        lastName: {
          value: '',
          validState: 'form-control ',
          error: ''
        }
      }
    };
  }
  validate() {
    return this.form.current.reportValidity();
  }

  changeHandler = e => {
    const { name, value } = e.target;

    let error = '';
    let validState = 'form-control ';
    switch (name) {
      case 'uid':
        if (value.length < 3) {
          error = 'Employee ID must be at least 3 character';
          validState += 'is-invalid';
        }
        break;
      case 'firstName':
        if (value.length < 1) {
          error = 'Require';
          validState += 'is-invalid';
        }
        break;
      case 'lastName':
        if (value.length < 1) {
          error = 'Require';
          validState += 'is-invalid';
        }
        break;
    }
    this.setState(
      {
        account: {
          ...this.state.account,
          [name]: {
            ...this.state.account[name],
            value,
            validState,
            error
          }
        }
      },
      () => {
        // console.log(errors);
      }
    );
  };

  submitHandler = async e => {
    e.preventDefault();
    if (this.validate()) {
      const { account } = this.state;
      try {
        let userData = {
          uid: account.uid.value,
          firstName: account.firstName.value,
          lastName: account.lastName.value
        };
        await createUser(userData);
      } catch (err) {
        this.handleStatusCode(err);
      }
    }
  };

  handleStatusCode = err => {
    let { account } = this.state;
    switch (err.response.status) {
      case 400:
        account.uid.error = 'Username already exist';
        account.uid.validState = 'form-control is-invalid';
        break;
      default:
        this.Helper.errorHandler(err);
        break;
    }

    this.setState({
      account
    });
  };

  render() {
    const { account } = this.state;
    return (
      <div className="container my-5">
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle className="text-center mt-2">Add user</MDBCardTitle>
            <form ref={this.form} onSubmit={this.submitHandler} noValidate>
              <MDBRow className="mb-3">
                <MDBCol className="mx-5">
                  <label className="grey-text">Employee ID</label>
                  <input
                    name="uid"
                    value={account.uid.value}
                    onChange={this.changeHandler}
                    type="text"
                    className={account.uid.validState}
                    required
                  />
                  <div className="invalid-feedback">{account.uid.error}</div>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol className="mx-5">
                  <label className="grey-text">First name</label>
                  <input
                    name="firstName"
                    value={account.firstName.value}
                    onChange={this.changeHandler}
                    type="text"
                    className={account.firstName.validState}
                    required
                  />
                  <div className="invalid-feedback">
                    {account.firstName.error}
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-3">
                <MDBCol className="mx-5">
                  <label className="grey-text">Last name</label>
                  <input
                    name="lastName"
                    value={account.lastName.value}
                    onChange={this.changeHandler}
                    type="text"
                    className={account.lastName.validState}
                    required
                  />
                  <div className="invalid-feedback">
                    {account.lastName.error}
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="8" className="mx-5">
                  <MDBBtn color="primary" type="submit">
                    Submit Form
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </form>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }
}

export const AuthAddUserPage = withAuth(AddUserPage);
