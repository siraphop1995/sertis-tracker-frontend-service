import React from 'react';
import HelperMethods from '../Helpers/HelperMethods';
import withAuth from '../components/withAuth';
import UserListTable from './UserListTable';

import { getUserList } from '../Helpers/dbHandler';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBAlert,
  MDBBtn,
  MDBIcon
} from 'mdbreact';
import { MDBCard, MDBCardBody } from 'mdbreact';
class UserListPage extends React.Component {
  Helper = new HelperMethods();
  constructor(props) {
    super(props);

    this.state = {
      userSearch: '',
      dataLoaded: true,
      userListData: [],
      loading: false
    };
  }

  async componentDidMount() {
    await this.axiosUserData();
  }

  axiosUserData = async () => {
    try {
      this.setState({ loading: true });
      let userListData = await getUserList();
      this.setState({ loading: false });
      this.setState({ userListData, dataLoaded: true });
    } catch (err) {
      this.setState({ loading: false, dataLoaded: false });
    }
  };

  handleSearchChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleAddUser = () => {
    this.props.history.push(`/adduser`);
  };

  render() {
    const { userListData, dataLoaded, userSearch, loading } = this.state;

    return (
      <div>
        <MDBContainer fluid>
          <MDBCol>
            <MDBCard style={{ marginTop: '20px' }}>
              <MDBRow className="mx-3 mt-4">
                <MDBCol md="5">
                  <h2>User List</h2>
                </MDBCol>
                <MDBCol md="3" className="ml-md-auto"></MDBCol>
                <MDBCol md="4">
                  <div className="md-form my-0">
                    <input
                      className="form-control mr-sm-2"
                      name="userSearch"
                      onChange={this.handleSearchChange}
                      type="text"
                      placeholder="Search"
                    />
                    <MDBBtn
                      color="green"
                      size="sm"
                      onClick={this.handleAddUser}
                    >
                      <MDBIcon icon="user-plus" />
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBCardBody>
                {loading ? (
                  <div
                    className="my-5"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    {!dataLoaded ? (
                      <MDBAlert color="danger">No user data</MDBAlert>
                    ) : null}
                    <UserListTable
                      userListData={userListData.filter(u =>
                        userSearch
                          ? u.uid
                              .toLowerCase()
                              .includes(userSearch.toLowerCase()) ||
                            u.firstName
                              .toLowerCase()
                              .includes(userSearch.toLowerCase()) ||
                            u.lastName
                              .toLowerCase()
                              .includes(userSearch.toLowerCase())
                          : u
                      )}
                    />
                  </div>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBContainer>
      </div>
    );
  }
}
export const AuthUserListPage = withAuth(UserListPage);
