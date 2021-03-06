import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { NavItem } from 'react-bootstrap';
import { history } from '../helpers';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
}

export const Protected = () => <h3>Protected</h3>;

export class Login extends React.Component {
  render() {
    return (
      <div>
        Login
      </div>
    )
  }
}

export function GetRoutes() {
  return (
    <Router history={history}>
      <div>

      </div>
    </Router>
  );
}



