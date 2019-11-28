import React from 'react';
import { withRouter } from 'react-router-dom';
import UserListModal from './UserListModal';
import { deleteUser } from '../Helpers/dbHandler';

import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
  MDBBtn
} from 'mdbreact';
import { MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';

class UserListTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userListData: [],
      userData: {},
      modal: false,
      deleteModal: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.userListData !== prevProps.userListData) {
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

  toggleConfirmDelete = userData => {
    if (!this.state.deleteModal === true) {
      this.setState({
        userData: userData
      });
    }
    this.setState({
      deleteModal: !this.state.deleteModal
    });
  };

  handleDelete = async () => {
    const { userData } = this.state;
    const id = userData._id;
    try {
      await deleteUser(id);
      const { userListData } = this.state;
      this.setState({
        deleteModal: false,
        userListData: userListData.filter(u => u.uid !== userData.uid)
      });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { userListData, userData } = this.state;
    return (
      <div>
        <MDBModal
          isOpen={this.state.deleteModal}
          toggle={this.toggleConfirmDelete}
          centered
        >
          <MDBModalHeader toggle={this.toggleConfirmDelete}>
            <p>Confirm delete</p>
            <p>
              {userData.uid}: {userData.firstName} {userData.lastName}
            </p>
          </MDBModalHeader>
          <MDBModalBody>
            <div className="mx-5">
              <MDBBtn
                className="mx-3"
                color="primary"
                onClick={this.handleDelete}
              >
                Yes
              </MDBBtn>
              <MDBBtn
                className="mx-3"
                color="secondary"
                onClick={this.toggleConfirmDelete}
              >
                No
              </MDBBtn>
            </div>
          </MDBModalBody>
        </MDBModal>

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
                      <div className="mx-auto">
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
                        <MDBBtn
                          color="danger"
                          size="sm"
                          className="my-0 py-1"
                          onClick={() => this.toggleConfirmDelete(user)}
                        >
                          <MDBIcon icon="edit" />
                        </MDBBtn>
                      </div>
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
