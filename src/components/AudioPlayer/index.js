import React from 'react';
import { connect } from 'react-redux';
import { getTrackState } from '../../helpers/selectors';
import { audioPlayerActions } from '../../actions/audioPlayer.actions';

import { MouthPlayer } from './MouthPlayer';
import { Queue } from './Queue';

const apiUrl = process.env.NODE_ENV === 'production' ? 
               process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL;

const mapStateToProps = state => {
  return {
    audioTrack: getTrackState(state),
    isPlaying: state.audioPlayer.isPlaying,
    controllerView: state.audioPlayer.controllerView,
    queue: state.audioPlayer.queue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveTrack: track => dispatch(audioPlayerActions.setActiveTrack(track)),
  };
};


class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidUpdate() {
    if (this.props.audioTrack) {
      console.log(this.props.audioTrack);
      if (this.props.isPlaying) {
        this.props.audioTrack.play();
      }

      else {
        this.props.audioTrack.pause();
      }
    }
  }


  render() {
    return (
      <div>
        <MouthPlayer />
      </div>
    );
  }
}

const connectedAudioPlayer = connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);

export {connectedAudioPlayer as AudioPlayer};
