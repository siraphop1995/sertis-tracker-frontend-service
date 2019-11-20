import React from 'react';
import HelperMethods from '../Helpers/HelperMethods';
import AuthHelperMethods from '../Helpers/AuthHelperMethods';

import UserTable from './UserTable';
import moment from 'moment-timezone';

import { findUserDate } from '../Helpers/dbHandler';
import { DatePicker } from '@material-ui/pickers';

import { MDBContainer, MDBRow, MDBCol, MDBAlert, MDBIcon } from 'mdbreact';
import { MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
class UserPage extends React.Component {
  Auth = new AuthHelperMethods();
  Helper = new HelperMethods();
  constructor(props) {
    super(props);

    this.state = {
      dateData: [],
      selectedMonth: this.loadSelectedMonth(),
      userSearch: '',
      dataLoaded: true,
      alertMessage: '',
      userId: '',
      userData: {},
      validToken: true
    };
  }

  async componentDidMount() {
    this.checkAdmin();
    let { userId, dateQuery } = this.props.match.params;
    if (!userId) {
      userId = this.loadUserSearch();
    }
    if (userId) {
      try {
        if (dateQuery) {
          const [dd, mm, yy] = this.praseDate(dateQuery);
          this.setState({ selectedMonth: moment([yy, mm - 1, dd]) });
          await this.axiosUserData(userId, moment([yy, mm - 1, dd]));
        } else {
          const { selectedMonth } = this.state;
          await this.axiosUserData(userId, selectedMonth);
        }

        this.setState({ dataLoaded: true });
      } catch (err) {
        this.setState({ dataLoaded: false });
      }
    }
  }

  checkAdmin = () => {
    const isTokenValid = this.Auth.loggedIn();
    this.setState({ validToken: isTokenValid });
  };

  praseDate = date => {
    return date.split('-').map(d => parseInt(d, 10));
  };

  loadSelectedMonth = () => {
    let selectedMonth = sessionStorage.getItem('selectedMonth');
    return selectedMonth ? moment(selectedMonth) : moment();
  };
  loadUserSearch = () => {
    let userSearch = sessionStorage.getItem('userSearch');
    return userSearch ? userSearch : '';
  };

  axiosUserData = async (userId, selectedMonth) => {
    const userDateData = await findUserDate(userId, selectedMonth);

    const { dateData } = userDateData;
    userDateData.dateData = undefined;
    this.setState({ dateData, userData: userDateData });
  };

  handleSearchChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSearch = async () => {
    try {
      const { userSearch, selectedMonth } = this.state;
      await this.axiosUserData(userSearch, selectedMonth);
      sessionStorage.setItem('userSearch', userSearch);
      this.setState({ dataLoaded: true });
    } catch (err) {
      this.setState({ dataLoaded: false, dateData: [] });
    }
  };

  handleMonthChange = async event => {
    try {
      this.setState({ selectedMonth: event });
      sessionStorage.setItem(
        'selectedMonth',
        moment(event)
          .tz('Asia/Bangkok')
          .format()
      );
      const { uid } = this.state.userData;
      await this.axiosUserData(uid, event);
      this.setState({ dataLoaded: true });
    } catch (err) {
      this.setState({ dataLoaded: false, dateData: [] });
    }
  };

  render() {
    const {
      userData,
      dateData,
      dataLoaded,
      selectedMonth,
      validToken
    } = this.state;

    return (
      <div>
        <MDBContainer fluid>
          <MDBCol>
            <MDBCard style={{ marginTop: '20px' }}>
              <MDBRow className="mx-3 mt-4">
                <MDBCol size="5">
                  {Object.keys(userData).length ? (
                    <h2>
                      {userData.uid}: {userData.firstName} {userData.lastName}
                    </h2>
                  ) : null}
                </MDBCol>
                <MDBCol size="3">
                  <DatePicker
                    views={['year', 'month']}
                    label="Month"
                    disabled={!userData}
                    minDate={new Date('2017-01-01')}
                    maxDate={new Date()}
                    value={selectedMonth}
                    onChange={this.handleMonthChange}
                  />
                </MDBCol>
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
                  <MDBBtn color="info" size="sm" onClick={this.handleSearch}>
                    <MDBIcon icon="search" />
                  </MDBBtn>
                </MDBCol>
              </MDBRow>

              <MDBCardBody>
                {!dataLoaded ? (
                  <MDBAlert color="danger">User data not found</MDBAlert>
                ) : null}
                <UserTable
                  dateData={dateData}
                  validToken={validToken}
                  userData={userData}
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBContainer>
      </div>
    );
  }
}
export { UserPage };
