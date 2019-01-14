import React from 'react';
import { connect } from 'react-redux';
import { getTrackState } from '../../helpers/selectors';
import { audioPlayerActions } from '../../actions/audioPlayer.actions';

const mapStateToProps = state => {
  return {
    queue: state.audioPlayer.queue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveTrack: track => dispatch(audioPlayerActions.setActiveTrack(track)),
    playAnimation: () => dispatch(audioPlayerActions.playAnimation())
  };
};

class Queue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      queue: props.queue
    }
  }

  componentDidUpdate() {
    let track = this.props.queue.list[this.props.queue.index];

    this.props.setActiveTrack(track);
  }

  render() {
    return null;
  }
}

const connectedQueue = connect(mapStateToProps, mapDispatchToProps)(Queue);

export { connectedQueue as Queue};
