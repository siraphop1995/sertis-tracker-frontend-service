import React from 'react';
import EditModal from '../components/EditModal';

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

class UserTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateData: [],
      validToken: false,
      modal: false,
      userDate: {},
      userData: {}
    };
  }

  componentDidMount() {
    this.setState({
      validToken: this.props.validToken
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.dateData !== prevProps.dateData) {
      this.setState({
        dateData: this.props.dateData
      });
    }
    if (this.props.validToken !== prevProps.validToken) {
      this.setState({
        validToken: this.props.validToken
      });
    }
    if (this.props.userData !== prevProps.userData) {
      this.setState({
        userData: this.props.userData
      });
    }
  }

  toggle = userDate => {
    if (!this.state.modal === true) {
      console.log(userDate);
      this.setState({
        userDate: userDate
      });
    }
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { dateData, validToken } = this.state;

    return (
      <div>
        {/* <MDBContainer>
          <MDBModal isOpen={this.state.modal} toggle={this.toggle} centered>
            <MDBModalHeader toggle={this.toggle}>MDBModal title</MDBModalHeader>
            <MDBModalBody>(...)</MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={this.toggle}>
                Close
              </MDBBtn>
              <MDBBtn color="primary">Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        </MDBContainer> */}
        <EditModal
          modal={this.state.modal}
          userDate={this.state.userDate}
          userData={this.state.userData}
          toggle={this.toggle}
        />
        <MDBTable hover small responsive>
          <MDBTableHead>
            <tr>
              <th scope="col">date</th>
              <th scope="col">inTime</th>
              <th scope="col">outTime</th>
              <th scope="col">expectWork</th>
              <th scope="col">actualWork</th>
              <th scope="col">status</th>
              <th scope="col">action</th>
            </tr>
          </MDBTableHead>

          <MDBTableBody>
            {dateData.map(data => {
              let color =
                data.data.status === 'incomplete'
                  ? 'table-danger'
                  : 'table-light';
              return (
                <tr key={data.date} className={color}>
                  <th>{data.date}</th>
                  <td>{data.data.inTime}</td>
                  <td>{data.data.outTime}</td>
                  <td>{data.data.expectedWorkTime}</td>
                  <td>{data.data.actualWorkTime}</td>
                  <td>{data.data.status}</td>
                  <td>
                    <span>
                      {validToken ? (
                        <MDBBtn
                          color="warning"
                          size="sm"
                          className="my-0 py-1"
                          onClick={() => this.toggle(data)}
                        >
                          <MDBIcon icon="edit" />
                        </MDBBtn>
                      ) : null}
                    </span>
                  </td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
      </div>
    );
  }
}
export default UserTable;
