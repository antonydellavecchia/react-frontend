import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class HomePage extends React.Component {
  componentDidMount() {
    console.log('mounted');
  }

  render() {
    const { user, users } = this.props;
    return (
      <div className="track-display">
        <div className="stove-background">
          <img src="assets/images/stove.png"/>
        </div>

        <div className="cover">
          <img src="assets/images/jonny.jpg"/>
        </div>

        <div className="track-info">
          <div className="track-title">
            <h5>Happy Birthday</h5>
          </div>

          <div className="track-artist">
            hope it's a good one
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
