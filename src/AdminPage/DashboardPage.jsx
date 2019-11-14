// import React from 'react';
// import axios from 'axios';
// import HelperMethods from '../Helpers/HelperMethods';
// import withAuth from '../components/withAuth';
// import { findUserDate } from '../Helpers/dbHandler';

// import {
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBTable,
//   MDBTableBody,
//   MDBTableHead
// } from 'mdbreact';
// import {
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBCardTitle,
//   MDBCardText
// } from 'mdbreact';
// class DashboardPage extends React.Component {
//   Helper = new HelperMethods();
//   constructor(props) {
//     super(props);

//     this.state = {
//       dateData: [],
//       search: ''
//     };
//   }

//   async componentDidMount() {
//     const userId = 'st011';
//     await this.axiosUserData(userId);
//   }

//   axiosUserData = async userId => {
//     const userDate = await findUserDate(userId);
//     console.log(userDate);
//     const { dateData } = userDate;
//     this.setState({ dateData });
//   };

//   handleChange = e => {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value
//     });
//   };

//   handleSearch = async () => {
//     await this.axiosUserData(this.state.search);
//   };

//   render() {
//     const { match } = this.props;
//     return (
//       <div>
//         <MDBContainer fluid>
//           <MDBCol>
//             <MDBCard style={{ marginTop: '20px' }}>
//               <MDBRow className="mx-3 mt-4">
//                 <MDBCol size="4">
//                   <h2>User Detail: {match.params.userId} </h2>
//                 </MDBCol>
//                 <MDBCol size="4"></MDBCol>
//                 <MDBCol size="4">
//                   <div className="md-form my-0">
//                     <input
//                       className="form-control mr-sm-2"
//                       name="search"
//                       onChange={this.handleChange}
//                       type="text"
//                       placeholder="Search"
//                       aria-label="Search"
//                     />
//                   </div>
//                   <MDBBtn color="info" onClick={this.handleSearch}>
//                     Info
//                   </MDBBtn>
//                 </MDBCol>
//               </MDBRow>

//               <MDBCardBody>
//                 <MDBTable hover small>
//                   <MDBTableHead>
//                     <tr>
//                       <th scope="col">date</th>
//                       <th scope="col">inTime</th>
//                       <th scope="col">outTime</th>
//                       <th scope="col">expectWork</th>
//                       <th scope="col">actualWork</th>
//                       <th scope="col">status</th>
//                     </tr>
//                   </MDBTableHead>
//                   <MDBTableBody>
//                     {this.state.dateData.map(data => {
//                       let color =
//                         data.data.status === 'incomplete'
//                           ? 'table-warning'
//                           : 'table-light';
//                       return (
//                         <tr key={data.date} className={color}>
//                           <th scope="row">{data.date}</th>
//                           <td>{data.data.inTime}</td>
//                           <td>{data.data.outTime}</td>
//                           <td>{data.data.expectedWorkTime}</td>
//                           <td>{data.data.actualWorkTime}</td>
//                           <td>{data.data.status}</td>
//                         </tr>
//                       );
//                     })}
//                   </MDBTableBody>
//                 </MDBTable>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//         </MDBContainer>
//       </div>
//     );
//   }
// }
// export { DashboardPage };
// // export const AuthDashboardPage = withAuth(DashboardPage);
