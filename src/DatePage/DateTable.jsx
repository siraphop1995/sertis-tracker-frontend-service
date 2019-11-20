import React from 'react';
import moment from 'moment-timezone';
import { withRouter } from 'react-router-dom';
import DateModal from './DateModal';

import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
  MDBBtn,
  MDBBadge,
} from 'mdbreact';

class DateTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateData: {},
      userData: [],
      validToken: false,
      modal: false,
      userDate: {}
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

  toUserPage = userDate => {
    const userId = userDate.uid;
    const date = moment(this.state.dateData.date).format('DD-MM-YYYY');
    this.props.history.push(`/users/${userId}/${date}`);
  };

  toggleModal = userDate => {
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

  updateHandler = userDate => {
    const { userData } = this.state;
    this.setState({
      userData: userData.map(u => (u.uid === userDate.uid ? userDate : u))
    });
  };

  render() {
    const { dateData, validToken, userData, userDate } = this.state;

    return (
      <div>
        <DateModal
          modal={this.state.modal}
          userDate={userDate}
          dateData={dateData}
          toggle={this.toggleModal}
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
                let color = 'table-light';
                let isLine = '';
                if (data.data.status) {
                  isLine = data.data.lineMessage ? (
                    <MDBBadge color="success">
                      <MDBIcon far icon="comment-dots" size="2x" />
                    </MDBBadge>
                  ) : null;
                  color = data.data.lineMessage ? 'table-success' : color;
                }
                color =
                  data.data.status === 'incomplete'
                    ? 'table-danger'
                    : data.data.status === 'overtime'
                    ? 'table-warning'
                    : 'table-light';

                return (
                  <tr key={data.uid} className={color}>
                    <th>{data.uid}</th>
                    <td>{data.data.inTime}</td>
                    <td>{data.data.outTime}</td>
                    <td>{data.data.expectedWorkTime}</td>
                    <td>{data.data.actualWorkTime}</td>
                    <td>{isLine}</td>
                    <td>{data.data.status}</td>
                    <td>
                      <span>
                        {validToken ? (
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
                              onClick={() => this.toggleModal(data)}
                            >
                              <MDBIcon icon="edit" />
                            </MDBBtn>
                          </div>
                        ) : null}
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
