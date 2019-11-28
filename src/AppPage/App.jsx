/* eslint-disable */
import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import NavBar from '../components/NavBar';
import { LoginPage } from '../LoginPage';
// import { CreateAccPage } from '../CreateAccPage';
import { AuthDatePage } from '../DatePage';
import { UserPage } from '../UsersPage';
import { AuthUserListPage } from '../UserListPage';
import { AuthAddUserPage } from '../AddUserPage';
import { NotFoundPage } from '../NotFoundPage';

import AuthHelperMethods from '../Helpers/AuthHelperMethods';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

class App extends React.Component {
  Auth = new AuthHelperMethods();
  constructor(props) {
    super(props);
    this.state = {
      isLogin: this.Auth.loggedIn()
    };
  }

  render() {
    const DefaultContainer = () => (
      <div>
        <Switch>
          <Route path="/date" component={AuthDatePage} />
          <Route path="/userlist" component={AuthUserListPage} />
          <Route path="/adduser" component={AuthAddUserPage} />
          <Route
            path="/logout"
            render={() => {
              this.Auth.logout();
              return <Redirect to="/login" />;
            }}
          />
          <Redirect exact from="/*" to="/users" />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
    return (
      <div>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <NavBar />
          <Switch>
            <Redirect exact from="/" to="/users" />
            <Route path="/login" component={LoginPage} />
            {/* <Route path="/signup" component={CreateAccPage} /> */}
            <Route path="/users/:userId/:dateQuery" component={UserPage} />
            <Route path="/users/:userId" component={UserPage} />
            <Route path="/users" component={UserPage} />
            <Route path="/*" component={DefaultContainer} />
          </Switch>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

export { App };
