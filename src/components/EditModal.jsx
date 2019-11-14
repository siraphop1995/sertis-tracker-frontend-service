import React from 'react';

import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
  MDBBtn
} from 'mdbreact';
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

    this.state = { modal: false, userDate: {}, userData: {} };
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
            <MDBModalBody>{userDate.date}</MDBModalBody>
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
