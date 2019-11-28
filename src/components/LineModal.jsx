import React from 'react';

import {
  MDBContainer,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';

class LineModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      lineMessage: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.modal !== prevProps.modal) {
      this.setState({
        modal: this.props.modal
      });
    }
    if (this.props.lineMessage !== prevProps.lineMessage) {
      this.setState({
        lineMessage: this.props.lineMessage
      });
    }
  }

  render() {
    const { lineMessage } = this.state;
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
              Line message
            </MDBModalHeader>
            <MDBModalBody>
              <MDBContainer>
                <p className="text-justify mb-0">Message: {lineMessage}</p>
              </MDBContainer>
            </MDBModalBody>
            <MDBModalFooter></MDBModalFooter>
          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}
export default LineModal;
