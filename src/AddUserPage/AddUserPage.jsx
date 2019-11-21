import React from 'react';
import HelperMethods from '../Helpers/HelperMethods';
import withAuth from '../components/withAuth';
import { MDBRow, MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from 'mdbreact';

class AddUserPage extends React.Component {
  Helper = new HelperMethods();
  constructor(props) {
    super(props);
    this.state = {
      account: {
        uid: {
          value: '',
          validState: 'form-control '
        },
        firstName: {
          value: '',
          validState: 'form-control '
        },
        lastName: {
          value: '',
          validState: 'form-control '
        }
      },
      errorMessage: ''
    };
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState(
      {
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

  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.state.account)

    // const { username, password } = this.state;
    // let loginData = {
    //   username: username,
    //   password: password
    // };

    // this.Auth.login(loginData)
    //   .then(res => {
    //     if (res === false) {
    //       return alert("Sorry those credentials don't exist!");
    //     }
    //     this.props.history.push('/date');
    //   })
    //   .catch(error => {
    //     this.handleStatusCode(error);
    //   });
  };

  render() {
    const { account } = this.state;
    return (
      <div className="container my-5">
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle className="text-center mt-2">Add user</MDBCardTitle>
            <form className="form-signin">
              <MDBRow className="mb-2">
                <MDBCol md="12" lg="12">
                  <label>User Id</label>
                  <input
                    className={account.uid.validState}
                    placeholder="User Id"
                    required
                    autoFocus
                    name="uid"
                    onChange={this.handleChange}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-2">
                <MDBCol md="12" lg="12">
                  <label>First name</label>
                  <input
                    className={account.firstName.validState}
                    placeholder="First name"
                    required
                    name="firstName"
                    onChange={this.handleChange}
                  />
                  {/* <div className="invalid-feedback">{errorMessage}</div> */}
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-4">
                <MDBCol md="12" lg="12">
                  <label>Last name</label>
                  <input
                    className={account.lastName.validState}
                    placeholder="Last name"
                    required
                    name="lastName"
                    onChange={this.handleChange}
                  />
                  {/* <div className="invalid-feedback">{errorMessage}</div> */}
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-5">
                <MDBCol md="12" lg="12">
                  <button
                    className="mt-60 pt-50 btn btn-lg btn-primary btn-block text-uppercase"
                    onClick={this.handleSubmit}
                  >
                    Add
                  </button>
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
