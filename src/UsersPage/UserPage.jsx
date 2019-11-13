import React from 'react';
import HelperMethods from '../Helpers/HelperMethods';
// import withAuth from '../components/withAuth';
import { findUserDate } from '../Helpers/dbHandler';

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
class UserPage extends React.Component {
  Helper = new HelperMethods();
  constructor(props) {
    super(props);

    this.state = {
      dateData: [],
      search: '',
      dataLoaded: true,
      alertMessage: '',
      userId: '',
      userData: {}
    };
  }

  async componentDidMount() {
    const userId = 'st011';
    await this.axiosUserData(userId);
  }

  axiosUserData = async userId => {
    const userDateData = await findUserDate(userId);
    console.log(userDateData);
    const { dateData } = userDateData;
    userDateData.dateData = undefined;

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
    } finally {
    }
  };

  render() {
    const { userData, dateData, dataLoaded, userId } = this.state;
    let pickerLang = {
        months: [
          'Jan',
          'Feb',
          'Mar',
          'Spr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        from: 'From',
        to: 'To'
      },
      mvalue = { year: 2015, month: 11 },
      mrange = { from: { year: 2014, month: 8 }, to: { year: 2015, month: 5 } };

    let makeText = m => {
      if (m && m.year && m.month)
        return pickerLang.months[m.month - 1] + '. ' + m.year;
      return '?';
    };
    return (
      <div>
        <MDBContainer fluid>

          <MDBCol>
            <MDBCard style={{ marginTop: '20px' }}>
              <MDBRow className="mx-3 mt-4">
                <MDBCol size="6">
                  {userData ? (
                    <h2>
                      {userData.uid}: {userData.firstName} {userData.lastName}
                    </h2>
                  ) : null}
                </MDBCol>
                <MDBCol size="2"></MDBCol>
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

                <MDBTable hover small responsive>
                  <MDBTableHead>
                    <tr>
                      <th scope="col">date</th>
                      <th scope="col">inTime</th>
                      <th scope="col">outTime</th>
                      <th scope="col">expectWork</th>
                      <th scope="col">actualWork</th>
                      <th scope="col">status</th>
                      <th scope="col">action</th>
                    </tr>
                  </MDBTableHead>

                  <MDBTableBody>
                    {dateData.map(data => {
                      let color =
                        data.data.status === 'incomplete'
                          ? 'table-warning'
                          : 'table-light';
                      return (
                        <tr key={data.date} className={color}>
                          <th>{data.date}</th>
                          <td>{data.data.inTime}</td>
                          <td>{data.data.outTime}</td>
                          <td>{data.data.expectedWorkTime}</td>
                          <td>{data.data.actualWorkTime}</td>
                          <td>{data.data.status}</td>
                          <td>
                            <span>
                              <button
                                type="button"
                                className="btn btn-danger btn-rounded btn-sm my-0"
                              >
                                Remove
                              </button>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBContainer>
      </div>
    );
  }
}
export { UserPage };
