import React from 'react';
import moment from 'moment-timezone';
import { withRouter } from 'react-router-dom';
import DateModal from './DateModal';
import LineModal from '../components/LineModal';

import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
  MDBBtn,
  MDBBadge
} from 'mdbreact';

class DateTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateData: {},
      userData: [],
      editModal: false,
      userDate: {},
      lineModal: false,
      lineMessage: ''
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.dateData !== prevProps.dateData) {
      this.setState({
        dateData: this.props.dateData
      });
    }

    if (this.props.userData !== prevProps.userData) {
      this.setState({
        userData: this.props.userData
      });
    }
  }

  toUserPage = userDate => {
    const userId = userDate.uid;
    const date = moment(this.state.dateData.date).format('DD-MM-YYYY');
    this.props.history.push(`/users/${userId}/${date}`);
  };

  editModalToggle = userDate => {
    if (!this.state.editModal === true) {
      this.setState({
        userDate: userDate
      });
    }
    this.setState({
      editModal: !this.state.editModal
    });
  };

  lineModalToggle = lineMessage => {
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
    const { userData } = this.state;
    this.setState({
      userData: userData.map(u => (u.uid === userDate.uid ? userDate : u))
    });
  };

  render() {
    const { dateData, userData, userDate, lineMessage } = this.state;

    return (
      <div>
        <LineModal
          modal={this.state.lineModal}
          toggle={this.lineModalToggle}
          lineMessage={lineMessage}
        />
        <DateModal
          modal={this.state.editModal}
          userDate={userDate}
          dateData={dateData}
          toggle={this.editModalToggle}
          onUpdate={this.updateHandler}
        />
        <MDBTable hover small responsive>
          <MDBTableHead>
            <tr>
              <th scope="col">User Id</th>
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
            {userData.map(data => {
              if (data.data) {
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
                  <tr key={data.uid} className={color}>
                    <th>
                      {data.uid}: {data.firstName} {data.lastName}
                    </th>
                    <td>{data.data.inTime}</td>
                    <td>{data.data.outTime}</td>
                    <td>{data.data.expectedWorkTime}</td>
                    <td>{data.data.actualWorkTime}</td>
                    <td>{isLine}</td>
                    <td>{data.data.status}</td>
                    <td>
                      <span>
                        <div className="mx-0">
                          <MDBBtn
                            color="primary"
                            size="sm"
                            className="my-0 py-1"
                            onClick={() => this.toUserPage(data)}
                          >
                            <MDBIcon icon="user" />
                          </MDBBtn>
                          <MDBBtn
                            color="warning"
                            size="sm"
                            className="my-0 py-1"
                            onClick={() => this.editModalToggle(data)}
                          >
                            <MDBIcon icon="edit" />
                          </MDBBtn>
                        </div>
                      </span>
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr key={data.uid} className="table-danger">
                    <th>{data.uid}</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                );
              }
            })}
          </MDBTableBody>
        </MDBTable>
      </div>
    );
  }
}
export default withRouter(DateTable);
