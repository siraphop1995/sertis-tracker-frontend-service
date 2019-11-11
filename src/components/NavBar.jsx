import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthHelperMethods from '../Helpers/AuthHelperMethods';

class NavBar extends Component {
  Auth = new AuthHelperMethods();

  state = {};
  handleLogout = e => {
    e.preventDefault();
    console.log(this);
    this.Auth.logout();
  };
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <h5 className="navbar-brand">Navbar</h5>
        <Link to="/">Home</Link>
        <Link to="/tictactoe">TicTacToe</Link>
        <Link to="/counters">Counters</Link>
        <Link to="/users/st011">Users</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/logout">Logout</Link>
        {/* <a href="/sigin" onClick={this.handleLogout}>Logout</a> */}
      </nav>
    );
  }
}

export default withRouter(NavBar);
