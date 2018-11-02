import React from 'react';
import { connect } from 'react-redux';

import { userService } from '../services';

import { userActions } from '../actions';
import { ReleaseUpload } from '../components';


class Submit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: []
    };
    
    
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="general-text">
        <ReleaseUpload />
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

const connectedSubmit = connect(mapStateToProps)(Submit);
export { connectedSubmit as Submit };
