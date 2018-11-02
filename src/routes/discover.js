import React from 'react';
import { connect } from 'react-redux';

import { userService } from '../services';

import { userActions } from '../actions';
import { TrackDisplay } from '../components';


class Discover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: []
    };
    
    
  }

  componentDidMount() {
    const requestOptions = {
      method: 'GET'
    };

    fetch('https://127.0.0.1:5000/tracks', requestOptions)
      .then(result => {
        return result.json();
      }).then(data =>{
        let tracks = data.tracks.map((track) => {
          console.log(track);
          return <TrackDisplay track={ track } />;
        });

        this.setState({tracks: tracks});
      });


  }

  render() {
    return (
      <div>
        { this.state.tracks }
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

const connectedDiscover = connect(mapStateToProps)(Discover);
export { connectedDiscover as Discover };
