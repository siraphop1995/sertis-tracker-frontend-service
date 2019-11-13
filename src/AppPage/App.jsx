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
import { CreateAccPage } from '../CreateAccPage';
import { DashboardPage } from '../AdminPage';
import { UserPage } from '../UsersPage';
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
    console.log('App - constructor');
  }

  componentDidMount() {
    console.log('App - Mounted');
  }

  render() {
    const DefaultContainer = () => (
      <div>
        {/* <NavBar /> */}
        <Route path="/" component={DashboardPage} />

        <Route
          path="/logout"
          render={() => {
            this.Auth.logout();
            return <Redirect to="/login" />;
          }}
        />
      </div>
    );
    console.log('App - Rendered');
    // console.log(this.Auth.getConfirm())
    return (
      <div>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <NavBar />
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={CreateAccPage} />
            <Route path="/users" component={UserPage} />
            <Route path="/*" component={DefaultContainer} />
          </Switch>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

export { App };
