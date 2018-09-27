import React from 'react';
import { Router, Route, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {Grid, Row, Col, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { history } from '../helpers';
import { alertActions } from '../actions';
import { PrivateRoute, Navigation, SpaceBackground, MouthPlayer } from '../components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { Login, Protected, Discover } from '../routes';



class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  navbarLinks() {
    if (this.props.authenticated) {
      return [
        <LinkContainer  to="/"><NavItem key={1}> Discover</NavItem></LinkContainer>,
        <LinkContainer to="/login"> <NavItem key={2} > Login</NavItem></LinkContainer>,
        <LinkContainer to="/protected"> <NavItem key={3} >protected</NavItem></LinkContainer>
      ];
    }
    return [
      <LinkContainer to="/"><NavItem> Discover</NavItem></LinkContainer>,
      <LinkContainer to="/login" ><NavItem> Login</NavItem></LinkContainer>
    ];
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        <SpaceBackground />
        <Router history={history}>
          <div>
            <Navigation>
              { this.navbarLinks() }
            </Navigation>
            
            <Grid fluid>
              <Row>
                <Col sm={4} xs={11} >
                  <MouthPlayer />
                </Col>
                <Col sm={4} xs={11}>
                  <Route path="/login" component={LoginPage}/>
                  <Route path='/' component={Discover}/>
                  <PrivateRoute path='/protected' component={HomePage} />
                </Col>
                <Col sm={4}>
                </Col>
              </Row>
            </Grid>
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
