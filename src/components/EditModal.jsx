import React from 'react';

import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import {
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';

class EditModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      userDate: {},
      userData: {},
      fname: 'Mark',
      lname: 'Otto',
      email: '',
      city: '',
      state: '',
      zip: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.modal !== prevProps.modal) {
      this.setState({
        modal: this.props.modal
      });
    }
    if (this.props.userDate !== prevProps.userDate) {
      console.log(this.props.userDate);

      this.setState({
        userDate: this.props.userDate
      });
    }
    if (this.props.userData !== prevProps.userData) {
      console.log(this.props.userData);
      this.setState({
        userData: this.props.userData
      });
    }
  }

  submitHandler = event => {
    event.preventDefault();
    event.target.className += ' was-validated';
  };

  changeHandler = event => {
    const { name, value } = event.target;
    let isValid = undefined;
    switch (name) {
      case 'fname':
        isValid = value.length < 8 ? false : true;
        break;
      case 'lname':
        break;
    }

    if (isValid) {
      event.target.setCustomValidity('');
    } else {
      event.target.setCustomValidity('invalid');
    }

    this.setState({ [name]: value });
  };

  render() {
    const { userDate, userData } = this.state;

    return (
      <div>
        <MDBContainer>
          <MDBModal
            isOpen={this.state.modal}
            toggle={this.props.toggle}
            centered
            size="lg"
          >
            <MDBModalHeader toggle={this.props.toggle}>
              {userData.firstName} {userData.lastName} {userDate.date}
            </MDBModalHeader>
            <MDBModalBody>
              <MDBContainer>
                <MDBRow>
                  <MDBCol md="12">
                    <form
                      className="needs-validation"
                      onSubmit={this.submitHandler}
                      noValidate
                    >
                      <MDBRow>
                        <MDBCol md="4" className="mb-3">
                          <label
                            htmlFor="defaultFormRegisterNameEx"
                            className="grey-text"
                          >
                            First name
                          </label>
                          <input
                            value={this.state.fname}
                            name="fname"
                            onChange={this.changeHandler}
                            type="text"
                            id="defaultFormRegisterNameEx"
                            className="form-control"
                            placeholder="First name"
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                          <label
                            htmlFor="defaultFormRegisterEmailEx2"
                            className="grey-text"
                          >
                            Last name
                          </label>
                          <input
                            value={this.state.lname}
                            name="lname"
                            onChange={this.changeHandler}
                            type="text"
                            id="defaultFormRegisterEmailEx2"
                            className="form-control"
                            placeholder="Last name"
                            required
                          />
                          <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                          <label
                            htmlFor="defaultFormRegisterConfirmEx3"
                            className="grey-text"
                          >
                            Email
                          </label>
                          <input
                            value={this.state.email}
                            onChange={this.changeHandler}
                            type="email"
                            id="defaultFormRegisterConfirmEx3"
                            className="form-control"
                            name="email"
                            placeholder="Your Email address"
                          />
                          <small
                            id="emailHelp"
                            className="form-text text-muted"
                          >
                            We'll never share your email with anyone else.
                          </small>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="4" className="mb-3">
                          <label
                            htmlFor="defaultFormRegisterPasswordEx4"
                            className="grey-text"
                          >
                            City
                          </label>
                          <input
                            value={this.state.city}
                            onChange={this.changeHandler}
                            type="text"
                            id="defaultFormRegisterPasswordEx4"
                            className="form-control"
                            name="city"
                            placeholder="City"
                            required
                          />
                          <div className="invalid-feedback">
                            Please provide a valid city.
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                          <label
                            htmlFor="defaultFormRegisterPasswordEx4"
                            className="grey-text"
                          >
                            State
                          </label>
                          <input
                            value={this.state.state}
                            onChange={this.changeHandler}
                            type="text"
                            id="defaultFormRegisterPasswordEx4"
                            className="form-control"
                            name="state"
                            placeholder="State"
                            required
                          />
                          <div className="invalid-feedback">
                            Please provide a valid state.
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                        <MDBCol md="4" className="mb-3">
                          <label
                            htmlFor="defaultFormRegisterPasswordEx4"
                            className="grey-text"
                          >
                            Zip
                          </label>
                          <input
                            value={this.state.zip}
                            onChange={this.changeHandler}
                            type="text"
                            id="defaultFormRegisterPasswordEx4"
                            className="form-control"
                            name="zip"
                            placeholder="Zip"
                            required
                          />
                          <div className="invalid-feedback">
                            Please provide a valid zip.
                          </div>
                          <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                      </MDBRow>
                      <MDBCol md="4" className="mb-3">
                        <div className="custom-control custom-checkbox pl-3">
                          <input
                            className="custom-control-input"
                            type="checkbox"
                            value=""
                            id="invalidCheck"
                            required
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="invalidCheck"
                          >
                            Agree to terms and conditions
                          </label>
                          <div className="invalid-feedback">
                            You must agree before submitting.
                          </div>
                        </div>
                      </MDBCol>
                      <MDBBtn color="primary" type="submit">
                        Submit Form
                      </MDBBtn>
                    </form>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.props.toggle}>
                Close
              </MDBBtn>
              <MDBBtn color="primary">Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}
export default EditModal;
