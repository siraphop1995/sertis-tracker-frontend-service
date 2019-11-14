import React, { Fragment, useState } from 'react';
import HelperMethods from '../Helpers/HelperMethods';
// import withAuth from '../components/withAuth';
import UserTable from './UserTable';

import { findUserDate } from '../Helpers/dbHandler';
import { DatePicker } from '@material-ui/pickers';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBAlert,
  MDBIcon,
  MDBInput
} from 'mdbreact';
import { MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { thisExpression } from '@babel/types';
class UserPage extends React.Component {
  Helper = new HelperMethods();
  constructor(props) {
    super(props);

    this.state = {
      dateData: [],
      selectedMonth: new Date(),
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
    const userId = 'st011';
    await this.axiosUserData(userId);
  }

  axiosUserData = async (userId, selectedMonth) => {
    const userDateData = await findUserDate(userId, selectedMonth);

    const { dateData } = userDateData;
    userDateData.dateData = undefined;
    console.log('lodeDateData');
    console.log(userDateData);
    console.log(dateData);
    this.setState({ dateData, userData: userDateData });
  };

  handleChange = e => {
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
      this.setState({ dataLoaded: false });
    }
  };

  handleMonthChange = async event => {
    try {
      this.setState({ selectedMonth: event });
      console.log(this.state.selectedMonth);
      const { uid } = this.state.userData;
      await this.axiosUserData(uid, event);
      this.setState({ dataLoaded: true });
    } catch (err) {
      this.setState({ dataLoaded: false });
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
                  {userData ? (
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
                      onChange={this.handleChange}
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
                  <MDBAlert color="danger">User not found</MDBAlert>
                ) : null}
                <UserTable dateData={this.state.dateData} validToken={validToken} />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBContainer>
      </div>
    );
  }
}
export { UserPage };
