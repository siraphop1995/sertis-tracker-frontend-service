import React from 'react';
import UserModal from './UserModal';
import LineModal from '../components/LineModal';

import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
  MDBBtn,
  MDBBadge
} from 'mdbreact';

class UserTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateData: [],
      validToken: false,
      editModal: false,
      userDate: {},
      userData: {},
      lineModal: false,
      lineMessage: ''
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

  editModalToggle = userDate => {
    if (!this.state.editModal === true) {
      console.log(userDate);
      this.setState({
        userDate: userDate
      });
    }
    this.setState({
      editModal: !this.state.editModal
    });
  };

  lineModalToggle = lineMessage => {
    console.log(lineMessage);
    if (!this.state.lineModal === true) {
      this.setState({
        lineMessage: lineMessage
      });
    }
    this.setState({
      lineModal: !this.state.lineModal
    });
  };

  updateHandler = userDate => {
    const { dateData } = this.state;
    this.setState({
      dateData: dateData.map(d => (d.did === userDate.did ? userDate : d))
    });
  };

  render() {
    const { dateData, validToken, lineMessage } = this.state;

    return (
      <div>
        <LineModal
          modal={this.state.lineModal}
          toggle={this.lineModalToggle}
          lineMessage={lineMessage}
        />
        <UserModal
          modal={this.state.editModal}
          userDate={this.state.userDate}
          userData={this.state.userData}
          toggle={this.editModalToggle}
          onUpdate={this.updateHandler}
        />
        <MDBTable hover small responsive>
          <MDBTableHead>
            <tr>
              <th scope="col">date</th>
              <th scope="col">inTime</th>
              <th scope="col">outTime</th>
              <th scope="col">expectWork</th>
              <th scope="col">actualWork</th>
              <th scope="col">line</th>
              <th scope="col">status</th>
              <th scope="col">action</th>
            </tr>
          </MDBTableHead>

          <MDBTableBody>
            {dateData.map(data => {
              const isLine = data.data.lineMessage ? (
                <MDBBadge
                  tag="a"
                  color="success"
                  onClick={() => this.lineModalToggle(data.data.lineMessage)}
                >
                  <MDBIcon far icon="comment-dots" size="2x" />
                </MDBBadge>
              ) : null;

              const color =
                data.data.status === 'incomplete'
                  ? 'table-danger'
                  : data.data.status === 'overtime'
                  ? 'table-warning'
                  : '';

              return (
                <tr key={data.date} className={color}>
                  <th>{data.date}</th>
                  <td>{data.data.inTime}</td>
                  <td>{data.data.outTime}</td>
                  <td>{data.data.expectedWorkTime}</td>
                  <td>{data.data.actualWorkTime}</td>
                  <td>{isLine}</td>
                  <td>{data.data.status}</td>
                  <td>
                    <span>
                      {validToken ? (
                        <MDBBtn
                          color="warning"
                          size="sm"
                          className="my-0 py-1"
                          onClick={() => this.editModalToggle(data)}
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
