import React, { Fragment, useState } from 'react';
import HelperMethods from '../Helpers/HelperMethods';
// import withAuth from '../components/withAuth';
import DateTable from './DateTable';
import moment from 'moment-timezone';

import { findDate } from '../Helpers/dbHandler';
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
class DatePage extends React.Component {
  Helper = new HelperMethods();
  constructor(props) {
    super(props);

    this.state = {
      dateData: {},
      selectedDate: this.loadSelectedDate(),
      userSearch: '',
      dataLoaded: true,
      alertMessage: '',
      userData: [],
      token: '12346',
      validToken: true
    };
  }

  async componentDidMount() {
    try {
      await this.axiosUserData(this.state.selectedDate);
      this.setState({ dataLoaded: true });
    } catch (err) {
      this.setState({ dataLoaded: false });
    }
  }

  loadSelectedDate = () => {
    const selectedDate = sessionStorage.getItem('selectedDate');
    if (selectedDate) {
      return moment(selectedDate);
    }
    let date = moment().subtract(1, 'day');
    if (date.format('ddd') == 'Sat') return date.subtract(1, 'day');
    if (date.format('ddd') == 'Sun') return date.subtract(2, 'day');
    return date;
  };

  axiosUserData = async selectedDate => {
    selectedDate = selectedDate.format('DD/MM/YYYY');
    let dateData = await findDate(selectedDate);
    const userData = dateData.users;
    dateData.users = undefined;
    this.setState({ userData, dateData });
  };

  handleSearchChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSearch = async () => {
    const { userSearch, userData } = this.state;
    console.log(userSearch);
    console.log(userData);
  };

  handleDateChange = async event => {
    try {
      this.setState({ selectedDate: event });
      await this.axiosUserData(event);
      sessionStorage.setItem(
        'selectedDate',
        moment(event)
          .tz('Asia/Bangkok')
          .format()
      );
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
      selectedDate,
      validToken,
      userSearch
    } = this.state;

    return (
      <div>
        <MDBContainer fluid>
          <MDBCol>
            <MDBCard style={{ marginTop: '20px' }}>
              <MDBRow className="mx-3 mt-4">
                <MDBCol size="5">
                  <h2>{selectedDate.format('DD MMM YYYY')}</h2>
                </MDBCol>
                <MDBCol size="3">
                  <DatePicker
                    label="Date"
                    minDate={new Date('2017-01-01')}
                    maxDate={new Date()}
                    value={selectedDate}
                    onChange={this.handleDateChange}
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
                  <MDBAlert color="danger">No date data</MDBAlert>
                ) : null}
                <DateTable
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
export { DatePage };
