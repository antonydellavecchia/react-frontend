import React from 'react';
import { connect } from 'react-redux';

import { userService } from '../services';
import { userActions } from '../actions';
import { ReleaseDisplay } from '../components';

class Releases extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      releases: []
    };
    
    
  }

  componentDidMount() {
    let { match } = this.props;
    userService.authGet(`${match.url}`).then(data => {
      let releases = data.releases.map((release) => {
        return <ReleaseDisplay {...release } />;
      });
      
      this.setState({releases: releases});
    });
  }

  render() {
    return (
      <div>
        { this.state.releases }
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

const connectedReleases = connect(mapStateToProps)(Releases);
export { connectedReleases as Releases };
