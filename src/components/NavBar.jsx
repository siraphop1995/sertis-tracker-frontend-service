import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AuthHelperMethods from '../Helpers/AuthHelperMethods';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdbreact';
class NavBar extends Component {
  Auth = new AuthHelperMethods();

  state = { isOpen: false };
  handleLogout = e => {
    e.preventDefault();
    this.Auth.logout();
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Navbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="/date">Date</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/users">User</MDBNavLink>
            </MDBNavItem>
            {/* <MDBNavItem>
              <MDBNavLink to="/adminlist">AdminList</MDBNavLink>
            </MDBNavItem> */}
            <MDBNavItem>
              <MDBNavLink to="/userlist">UserList</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Info</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="mr-5">
                  <MDBNavLink to="/login">
                    <MDBDropdownItem>Login</MDBDropdownItem>
                  </MDBNavLink>
                  {/* <MDBNavLink to="/signup">
                    <MDBDropdownItem>Add admin</MDBDropdownItem>
                  </MDBNavLink> */}
                  <MDBNavLink to="/logout">
                    <MDBDropdownItem>logout</MDBDropdownItem>
                  </MDBNavLink>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default withRouter(NavBar);
