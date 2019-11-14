// import React from 'react';
// // import axios from 'axios';
// import HelperMethods from '../Helpers/HelperMethods';
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

// class UserDetailPage extends React.Component {
//   Helper = new HelperMethods();

//   constructor(props) {
//     super(props);

//     this.state = {
//       dateData: []
//     };
//   }

//   async componentDidMount() {
//     const { match } = this.props;
//     const { userId } = match.params;

//     const userDate = await findUserDate(userId);
//     console.log(userDate);
//     const { dateData } = userDate;
//     this.setState({ dateData });
//   }

//   render() {
//     const { match } = this.props;
//     return (
//       <div>
//         <MDBContainer fluid>
//           <MDBCol>
//             <MDBCard style={{ 'margin-top': '20px' }}>
//               <MDBRow className="mx-3 mt-4">
//                 <MDBCol size="4">
//                   <h2>User Detail: {match.params.userId} </h2>
//                 </MDBCol>
//                 <MDBCol size="4"></MDBCol>
//                 <MDBCol size="4">
//                   <div className="md-form my-0">
//                     <input
//                       className="form-control mr-sm-2"
//                       type="text"
//                       placeholder="Search"
//                       aria-label="Search"
//                     />
//                   </div>
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

// export { UserDetailPage };
