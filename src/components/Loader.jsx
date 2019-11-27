import React from 'react';

import {
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.modal !== prevProps.modal) {
      this.setState({
        modal: this.props.modal
      });
    }
  }

  render() {
    const { modal, toggle } = this.state;

    return (
      <div>
        <MDBContainer>
          <MDBModal
            isOpen={this.state.modal}
            toggle={this.props.toggle}
            centered
            size="lg"
          >
            <MDBModalHeader toggle={this.props.toggle}></MDBModalHeader>
            <MDBModalBody>
              <MDBContainer>
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </MDBContainer>
            </MDBModalBody>
            <MDBModalFooter></MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}
export default Loader;
