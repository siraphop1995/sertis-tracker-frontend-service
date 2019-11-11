import React from 'react';
// import axios from 'axios';
import HelperMethods from '../Helpers/HelperMethods';

class UserPage extends React.Component {
  Helper = new HelperMethods();
  constructor(props) {
    super(props);

    this.state = {
      token: ''
    };
  }

  // componentDidMount() {
  //   console.log('Mount');
  //   let token = localStorage.getItem('token');
  //   // console.log(token);
  //   axios.defaults.headers.common = {
  //     Authorization: 'Bearer ' + token
  //   };
  //   axios
  //     .get(`/users`)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       this.Helper.errorHandler(err);
  //     });
  // }

  render() {
    return (
      <div>
        <h1>Users</h1>
      </div>
    );
  }
}
// export { UserPage };
export { UserPage };
