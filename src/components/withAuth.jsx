import React, { Component } from 'react';
import AuthHelperMethods from '../Helpers/AuthHelperMethods';

export default function withAuth(AuthComponent) {
  const Auth = new AuthHelperMethods();

  return class AuthWrapped extends Component {
    state = {
      confirm: null,
      loaded: false
    };

    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace('/login');
      } else {
        try {
          const confirm = Auth.getConfirm();
          // console.log("confirmation is:", confirm);
          this.setState({
            confirm: confirm,
            loaded: true
          });
        } catch (err) {
          console.error(err);
          Auth.logout();
          this.props.history.replace('/login');
        }
      }
    }

    render() {
      if (this.state.loaded === true) {
        if (this.state.confirm) {
          return (
            <AuthComponent
              history={this.props.history}
              confirm={this.state.confirm}
              match={this.props.match}
            />
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  };
}
