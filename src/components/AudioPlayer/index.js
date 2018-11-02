import React from 'react';
import { connect } from 'react-redux';
import { getTrackState } from '../../helpers/selectors';

import { MouthPlayer } from './MouthPlayer';

const apiUrl = process.env.NODE_ENV === 'production' ? 
               process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL;

const mapStateToProps = state => {
  return {
    audioTrack: getTrackState(state),
    activeTrack: state.audioPlayer.activeTrack,
    isPlaying: state.audioPlayer.isPlaying,
    controllerView: state.audioPlayer.controllerView
  };
};

class connectedAudioPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.audioTrack) {
      const audioTrack = this.props.audioTrack;

      console.log(audioTrack);
      
      if (this.props.isPlaying) {
        audioTrack.play();
      }
    }
  }

  render() {
    return <MouthPlayer />;
  }
}

const AudioPlayer = connect(mapStateToProps)(connectedAudioPlayer);

export default AudioPlayer;
