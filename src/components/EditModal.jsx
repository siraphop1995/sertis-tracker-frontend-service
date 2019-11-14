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

    this.state = { modal: false, userData: {} };
  }

  componentDidUpdate(prevProps) {
    console.log('update');
    console.log(this.props);

    if (this.props.modal !== prevProps.modal) {
      this.setState({
        modal: this.props.modal
      });
    }
    if (this.props.userData !== prevProps.userData) {
      this.setState({
        userData: this.props.userData
      });
    }
  }

  render() {
    const { userData } = this.state;

    return (
      <div>
        <MDBContainer>
          <MDBModal
            isOpen={this.state.modal}
            toggle={this.props.toggle}
            centered
          >
            <MDBModalHeader toggle={this.props.toggle}>
              MDBModal title
            </MDBModalHeader>
            <MDBModalBody>{userData.date}</MDBModalBody>
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
