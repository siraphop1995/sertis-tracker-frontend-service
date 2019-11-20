import React from 'react';
import HelperMethods from '../Helpers/HelperMethods';
import withAuth from '../components/withAuth';
import UserListTable from './UserListTable';

import { getUserList } from '../Helpers/dbHandler';

import { MDBContainer, MDBRow, MDBCol, MDBAlert } from 'mdbreact';
import { MDBCard, MDBCardBody } from 'mdbreact';
class UserListPage extends React.Component {
  Helper = new HelperMethods();
  constructor(props) {
    super(props);

    this.state = {
      userSearch: '',
      dataLoaded: true,
      userListData: [],
      token: '12346',
      validToken: true
    };
  }

  async componentDidMount() {
    try {
      await this.axiosUserData();
      this.setState({ dataLoaded: true });
    } catch (err) {
      this.setState({ dataLoaded: false });
    }
  }

  axiosUserData = async () => {
    let userListData = await getUserList();
    this.setState({ userListData });
  };

  handleSearchChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { userListData, dataLoaded, validToken, userSearch } = this.state;

    return (
      <div>
        <MDBContainer fluid>
          <MDBCol>
            <MDBCard style={{ marginTop: '20px' }}>
              <MDBRow className="mx-3 mt-4">
                <MDBCol size="5">
                  <h2>User List</h2>
                </MDBCol>
                <MDBCol size="3"></MDBCol>
                <MDBCol size="4">
                  <div className="md-form my-0">
                    <input
                      className="form-control mr-sm-2"
                      name="userSearch"
                      onChange={this.handleSearchChange}
                      type="text"
                      placeholder="Search"
                    />
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBCardBody>
                {!dataLoaded ? (
                  <MDBAlert color="danger">No user data</MDBAlert>
                ) : null}
                <UserListTable
                  validToken={validToken}
                  userListData={userListData.filter(u =>
                    userSearch ? u.uid.includes(userSearch) : u
                  )}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBContainer>
      </div>
    );
  }
}
export const AuthUserListPage = withAuth(UserListPage);
