import React from 'react';
import { connect } from 'react-redux';

import { audioPlayerActions} from '../actions/audioPlayer.actions';

const apiUrl = process.env.NODE_ENV === 'production' ?
               process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL;

const mapDispatchToProps = dispatch => {
  return {
    setActiveTrack: track => dispatch(audioPlayerActions.setActiveTrack(track)),
    playAnimation: () => dispatch(audioPlayerActions.playAnimation())
  };
};


class ConnectedTrackDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      track: props.track
//      coverUrl: `${apiUrl}/static/covers/${props.track.cover}`,
//      title: props.track.title,
//      artist: props.track.artist
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const track = this.state.track;

    this.props.playAnimation();
    this.props.setActiveTrack(track);
  }

  render() {
    let { track } = this.state
    return(
      <div className="stove-display" onClick={this.handleClick}>
	<div className="stove-background">
	  <img src="assets/images/stove.png"/>
	</div>

	<div className="cover">
	  <a href="#">
	    <img src={ `${apiUrl}/static/covers/${track.cover}` }/>
	  </a>
	</div>
	
	<div className="track-info">
	  <div className="track-title">
	    { track.title }
	  </div>
	  
	  <div className="track-artist">
	    { track.artist }
	  </div>
	</div>
      </div>
    );
  }
}

const TrackDisplay = connect(null, mapDispatchToProps)(ConnectedTrackDisplay);
export {TrackDisplay};
