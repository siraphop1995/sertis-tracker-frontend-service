import React from 'react';
import HelperMethods from '../Helpers/HelperMethods';
import withAuth from '../components/withAuth';
import DateTable from './DateTable';
import moment from 'moment-timezone';

import { findDate } from '../Helpers/dbHandler';
import { DatePicker } from '@material-ui/pickers';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBAlert,
  MDBCard,
  MDBCardBody
} from 'mdbreact';

class DatePage extends React.Component {
  Helper = new HelperMethods();
  constructor(props) {
    super(props);

    this.state = {
      dateData: {},
      selectedDate: this.loadSelectedDate(),
      userSearch: '',
      dataLoaded: true,
      userData: [],
      loading: false
    };
  }

  async componentDidMount() {
    await this.axiosUserData(this.state.selectedDate);
  }

  loadSelectedDate = () => {
    const selectedDate = sessionStorage.getItem('selectedDate');
    if (selectedDate) {
      return moment(selectedDate);
    }
    let date = moment().subtract(1, 'day');
    if (date.format('ddd') === 'Sat') return date.subtract(1, 'day');
    if (date.format('ddd') === 'Sun') return date.subtract(2, 'day');
    return date;
  };

  axiosUserData = async selectedDate => {
    try {
      this.setState({ loading: true });
      selectedDate = selectedDate.format('DD/MM/YYYY');
      let dateData = await findDate(selectedDate);
      const userData = dateData.users;
      dateData.users = undefined;
      this.setState({ loading: false });
      this.setState({ userData, dateData, dataLoaded: true });
    } catch (err) {
      this.setState({ loading: false, dataLoaded: false, userData: [] });
    }
  };

  handleSearchChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleDateChange = async event => {
    this.setState({ selectedDate: event });
    await this.axiosUserData(event);
    sessionStorage.setItem(
      'selectedDate',
      moment(event)
        .tz('Asia/Bangkok')
        .format()
    );
  };

  render() {
    const {
      userData,
      dateData,
      dataLoaded,
      selectedDate,
      userSearch,
      loading
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
                      <MDBAlert color="danger">No date data</MDBAlert>
                    ) : null}
                    <DateTable
                      dateData={dateData}
                      userData={userData.filter(u =>
                        userSearch ? u.uid.includes(userSearch) : u
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
export const AuthDatePage = withAuth(DatePage);
