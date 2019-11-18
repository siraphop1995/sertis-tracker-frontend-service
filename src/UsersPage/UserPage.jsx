import React, { Fragment, useState } from 'react';
import HelperMethods from '../Helpers/HelperMethods';
// import withAuth from '../components/withAuth';
import UserTable from './UserTable';
import moment from 'moment-timezone';

import { findUserDate } from '../Helpers/dbHandler';
import { DatePicker } from '@material-ui/pickers';

import { MDBContainer, MDBRow, MDBCol, MDBAlert, MDBIcon } from 'mdbreact';
import { MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { thisExpression } from '@babel/types';
class UserPage extends React.Component {
  Helper = new HelperMethods();
  constructor(props) {
    super(props);

    this.state = {
      dateData: [],
      selectedMonth: this.loadSelectedMonth(),
      search: '',
      dataLoaded: true,
      alertMessage: '',
      userId: '',
      userData: {},
      token: '12346',
      validToken: true
    };
  }

  async componentDidMount() {
    const { userId, dateQuery } = this.props.match.params;
    if (dateQuery) {
      const [dd, mm, yy] = this.praseDate(dateQuery);
      this.setState({ selectedMonth: moment([yy, mm - 1, dd]) });
    }
    if (userId) {
      try {
        const { selectedMonth } = this.state;
        await this.axiosUserData(userId, selectedMonth);
        this.setState({ dataLoaded: true });
      } catch (err) {
        this.setState({ dataLoaded: false });
      }
    }
  }

  praseDate = date => {
    return date.split('-').map(d => parseInt(d, 10));
  };

  loadSelectedMonth = () => {
    let selectedMonth = sessionStorage.getItem('selectedMonth');
    console.log(selectedMonth);
    return selectedMonth ? moment(selectedMonth) : moment();
  };

  axiosUserData = async (userId, selectedMonth) => {
    console.log(selectedMonth);
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
      const { search } = this.state;
      await this.axiosUserData(search);
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
                      name="search"
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
