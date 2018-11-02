import React from 'react';
import { withRouter, Router, Route, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {Grid, Row, Col, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { history } from '../helpers';
import { alertActions } from '../actions';
import { PrivateRoute, Navigation, SpaceBackground } from '../components';
import AudioPlayer from '../components/AudioPlayer';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { Login,
         Releases,
         Discover,
         Submit,
         Artists,
         Tracks,
         TrackContent,
         ArtistContent} from '../routes';



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
    //alert(this.prop.authenticated);
    
    if (localStorage.getItem('user')) {
      return [
        <li key="discover"> <Link  to="/discover">Discover</Link></li>,
        <li key="releases"> <Link to="/releases">Releases</Link></li>,
        <li key="artists"> <Link to="/artists">Artists</Link></li>,
        <li key="tracks"> <Link to="/tracks">Tracks</Link></li>,
        <li key="submit"> <Link to="/submit">Submit</Link></li>,
        <li key="login"> <Link to="/login">Logout</Link></li>
      ];
    }
    return [
      <li key="login"> <Link to="/login">Login</Link></li>
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
                <Col sm={3} xs={11} >
                </Col>
                <Col sm={6} xs={11} >
                  <div className="middle">
                    <Route path="/login" component={LoginPage}/>
                    <PrivateRoute path='/discover' component={Discover} />

                    <PrivateRoute exact path='/tracks' component={ Tracks }/>
                    <Route path='/tracks/:id' component={ TrackContent }/>

                    <PrivateRoute path='/releases' component={ Releases }/>

                    <PrivateRoute exact path='/artists' component={ Artists }/>
                    <Route path='/artists/:id' component={ ArtistContent}/>

                    <PrivateRoute path='/submit' component={ Submit }/>
                  </div>

                </Col>
                <Col sm={3}>
                  
                </Col>
              </Row>
            </Grid>

            <Grid fluid>
              <Row>
                <Col sm={3} xs={11} className="left">
                  <AudioPlayer />
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
