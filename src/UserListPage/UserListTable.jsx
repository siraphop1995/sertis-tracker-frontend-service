import React from 'react';
import { withRouter } from 'react-router-dom';
import UserListModal from './UserListModal';

import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
  MDBBtn
} from 'mdbreact';

class UserListTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userListData: [],
      userData: {},
      validToken: false,
      modal: false
    };
  }

  componentDidMount() {
    this.setState({
      validToken: this.props.validToken
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.validToken !== prevProps.validToken) {
      this.setState({
        validToken: this.props.validToken
      });
    }
    if (this.props.userListData !== prevProps.userListData) {
      console.log(this.props.userListData);
      this.setState({
        userListData: this.props.userListData
      });
    }
  }

  toUserPage = userDate => {
    const userId = userDate.uid;
    this.props.history.push(`/users/${userId}`);
  };

  toggleModal = userData => {
    if (!this.state.modal === true) {
      console.log(userData);
      this.setState({
        userData: userData
      });
    }
    this.setState({
      modal: !this.state.modal
    });
  };

  updateHandler = userData => {
    const { userListData } = this.state;
    this.setState({
      userListData: userListData.map(u =>
        u.uid === userData.uid ? userData : u
      )
    });
  };

  render() {
    const { validToken, userListData, userData } = this.state;

    return (
      <div>
        <UserListModal
          modal={this.state.modal}
          userData={userData}
          toggle={this.toggleModal}
          onUpdate={this.updateHandler}
        />

        <MDBTable hover small responsive>
          <MDBTableHead>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Line Id</th>
              <th scope="col">Init Code</th>
              <th scope="col">action</th>
            </tr>
          </MDBTableHead>

          <MDBTableBody>
            {userListData.map(user => {
              const color = !user.lid ? 'table-danger' : '';
              return (
                <tr key={user.uid} className={color}>
                  <th>{user.uid}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.lid}</td>
                  <td>{user.initCode}</td>
                  <td>
                    <span>
                      {validToken ? (
                        <div className="mx-0">
                          <MDBBtn
                            color="primary"
                            size="sm"
                            className="my-0 py-1"
                            onClick={() => this.toUserPage(user)}
                          >
                            <MDBIcon icon="user" />
                          </MDBBtn>
                          <MDBBtn
                            color="warning"
                            size="sm"
                            className="my-0 py-1"
                            onClick={() => this.toggleModal(user)}
                          >
                            <MDBIcon icon="edit" />
                          </MDBBtn>
                        </div>
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
export default withRouter(UserListTable);
