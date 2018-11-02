import React from 'react';
import { connect } from 'react-redux';

import { userService } from '../services';
import { userActions } from '../actions';
import { TrackDisplay, ContentListContainer } from '../components';

class Tracks extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tracks: [],
      content: null,
      activeTrack: null
    };
  }

  componentDidMount() {
    let { match } = this.props;

    userService.authGet(`${match.url}`).then(data => {
      let tracks = data.tracks;
      let items = tracks.map(track => {
        let url = `${ match.url }/${track.id}`;
        
        let div = (
          <div>
            <TrackDisplay track={track}/>
          </div>
        );

        return { url: url, div: div };
          
      });

      let content = <ContentListContainer items={ items }/>;
        
      this.setState({
        tracks: tracks,
        content: content
      });
    });
  }

  render() {
    return (
      <div>
        { this.state.content }
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

const connectedTracks = connect(mapStateToProps)(Tracks);
export { connectedTracks as Tracks };
