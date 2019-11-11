import React from 'react';
// import axios from 'axios';
import HelperMethods from '../Helpers/HelperMethods';

class UserDetailPage extends React.Component {
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
    const { match } = this.props;
    return (
      <div>
        <div className="container">
          <h3>{match.params.userId}</h3>
          <h1>User Detail</h1>
          <h1>Bootstrap grid examples</h1>
          <p className="lead">
            Basic grid layouts to get you familiar with building within the
            Bootstrap grid system.
          </p>

          <h2 className="mt-4">Three equal columns</h2>
          <p>
            Get three equal-width columns
            <strong>starting at desktops and scaling to large desktops</strong>.
            On mobile devices, tablets and below, the columns will automatically
            stack.
          </p>
          <div className="row mb-3">
            <div className="col-md-4">.col-md-4</div>
            <div className="col-md-4">.col-md-4</div>
            <div className="col-md-4">.col-md-4</div>
          </div>
        </div>
      </div>
    );
  }
}
// export { UserPage };
export { UserDetailPage };
