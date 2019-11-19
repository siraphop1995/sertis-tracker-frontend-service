import React from 'react';
import { updateDateUser } from '../Helpers/dbHandler';

import { MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import {
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';

class UserModal extends React.Component {
  constructor(props) {
    super(props);

    this.form = React.createRef();

    this.state = {
      modal: false,
      userDate: { data: {} },
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

  submitHandler = async event => {
    try {
      event.preventDefault();
      event.target.className += ' was-validated';
      if (this.validate()) {
        console.log('Valid!!!!');
        let { userData, userDate } = this.state;
        const { uid } = userData;
        const { did } = userDate;
        const newData = userDate.data;

        await updateDateUser(did, uid, newData);
        this.props.onUpdate(userDate);
        this.props.toggle();
      }
    } catch (err) {
      console.error(err);
    }
  };

  changeHandler = event => {
    const { name, value } = event.target;
    let isValid = true;
    switch (name) {
      case 'inTime':
        isValid = this._validTime(value);
        break;
      case 'outTime':
        isValid = this._validTime(value);
        break;
      case 'expectedWorkTime':
        isValid = this._validTime(value);
        break;
      case 'actualWorkTime':
        isValid = this._validTime(value);
        break;
    }

    if (isValid) {
      event.target.setCustomValidity('');
    } else {
      event.target.setCustomValidity('invalid');
    }

    this.setState({
      userDate: {
        ...this.state.userDate,
        data: {
          ...this.state.userDate.data,
          [name]: value
        }
      }
    });
  };
  _validTime = value => {
    return value.length !== 5
      ? false
      : value.split(':').length !== 2
      ? false
      : isNaN(value.split(':')[0])
      ? false
      : isNaN(value.split(':')[1])
      ? false
      : true;
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
                  <MDBCol>
                    <form
                      className="needs-validation"
                      ref={this.form}
                      onSubmit={this.submitHandler}
                      noValidate
                    >
                      <MDBRow className="mb-1">
                        <MDBCol md="12" lg="12">
                          <label className="grey-text">Line message</label>
                          <p className="text-justify">
                            {userDate.data.lineMessage}
                          </p>
                        </MDBCol>
                      </MDBRow>
                      <MDBRow>
                        <MDBCol md="4" lg="3" className="mb-3">
                          <label className="grey-text">inTime</label>
                          <input
                            name="inTime"
                            value={userDate.data.inTime}
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            required
                          />
                          <div className="invalid-feedback">
                            Wrong format, please use [hh:mm]
                          </div>
                        </MDBCol>
                        <MDBCol md="4" lg="3" className="mb-3">
                          <label className="grey-text">outTime</label>
                          <input
                            name="outTime"
                            value={userDate.data.outTime}
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            required
                          />
                          <div className="invalid-feedback">
                            Wrong format, please use [hh:mm]
                          </div>
                        </MDBCol>
                        <MDBCol md="4" lg="3" className="mb-3">
                          <label className="grey-text">expectedWork</label>
                          <input
                            name="expectedWorkTime"
                            value={userDate.data.expectedWorkTime}
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            required
                          />
                          <div className="invalid-feedback">
                            Wrong format, please use [hh:mm]
                          </div>
                        </MDBCol>
                        <MDBCol md="4" lg="3" className="mb-3">
                          <label className="grey-text">actualWork</label>
                          <input
                            name="actualWorkTime"
                            value={userDate.data.actualWorkTime}
                            onChange={this.changeHandler}
                            type="text"
                            className="form-control"
                            required
                          />
                          <div className="invalid-feedback">
                            Wrong format, please use 'hh:mm'
                          </div>
                        </MDBCol>
                        <MDBCol md="4" lg="3" className="mb-3">
                          <label className="grey-text">status</label>
                          <select
                            className="browser-default custom-select"
                            name="status"
                            value={userDate.data.status}
                            onChange={this.changeHandler}
                          >
                            <option value="complete">complete</option>
                            <option value="incomplete">incomplete</option>
                            <option value="overtime">overtime</option>
                          </select>
                          <div className="invalid-feedback">Require!</div>
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
            <MDBModalFooter>
              {/* <MDBBtn color="secondary" onClick={this.props.toggle}>
                Close
              </MDBBtn>
              <MDBBtn color="primary">Save changes</MDBBtn> */}
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}
export default UserModal;
