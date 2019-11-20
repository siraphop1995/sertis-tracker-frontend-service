import React from 'react';
import { updateUser } from '../Helpers/dbHandler';

import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import {
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';

class UserListModal extends React.Component {
  constructor(props) {
    super(props);

    this.form = React.createRef();

    this.state = {
      modal: false,
      userData: {}
    };
  }
  validate() {
    return this.form.current.reportValidity();
  }

  componentDidUpdate(prevProps) {
    if (this.props.modal !== prevProps.modal) {
      this.setState({
        modal: this.props.modal
      });
    }
    if (this.props.userData !== prevProps.userData) {
      console.log(this.props.userData);
      this.setState({
        userData: this.props.userData
      });
    }
  }

  submitHandler = async event => {
    try {
      event.preventDefault();
      event.target.className += ' was-validated';
      if (this.validate()) {
        console.log('Valid!!!!');
        let { userData } = this.state;
        const id = userData._id;
        
        await updateUser(id, userData);
        this.props.onUpdate(userData);
        this.props.toggle();
      }
    } catch (err) {
      console.error(err);
    }
  };

  changeHandler = event => {
    const { name, value } = event.target;
    let isValid = this._validLength(value);

    if (isValid) {
      event.target.setCustomValidity('');
    } else {
      event.target.setCustomValidity('invalid');
    }

    this.setState({
      userData: {
        ...this.state.userData,
        [name]: value
      }
    });
  };

  _validLength = value => {
    return value.length > 1 ? true : false;
  };

  render() {
    const { userData } = this.state;

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
              {userData.uid}
            </MDBModalHeader>
            <MDBModalBody>
              <MDBContainer>
                <MDBRow>
                  <MDBCol>
                    <form
                      className="needs-validation"
                      ref={this.form}
                      onSubmit={this.submitHandler}
                      noValidate
                    >
                      <MDBRow>
                        <MDBCol md="3" lg="2">
                          <label className="grey-text">Init Code</label>
                          <p className="text-justify">{userData.initCode}</p>
                        </MDBCol>
                        <MDBCol md="9" lg="10">
                          <label className="grey-text">Line Id</label>
                          <p className="text-justify">{userData.lid}</p>
                        </MDBCol>

                        <MDBCol md="12" lg="6" className="mb-3">
                          <label className="grey-text">firstName</label>
                          <input
                            name="firstName"
                            value={userData.firstName}
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            required
                          />
                          <div className="invalid-feedback">Require</div>
                        </MDBCol>
                        <MDBCol md="12" lg="6" className="mb-3">
                          <label className="grey-text">lastName</label>
                          <input
                            name="lastName"
                            value={userData.lastName}
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            required
                          />
                          <div className="invalid-feedback">Require</div>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="4">
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
                              Accept change
                            </label>
                            <div className="invalid-feedback">
                              You must agree before submitting.
                            </div>
                          </div>
                        </MDBCol>

                        <MDBCol md="8">
                          <MDBBtn color="primary" type="submit">
                            Submit Form
                          </MDBBtn>
                        </MDBCol>
                      </MDBRow>
                    </form>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </MDBModalBody>
            <MDBModalFooter></MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}
export default UserListModal;
