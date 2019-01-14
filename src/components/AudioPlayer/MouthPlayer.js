import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import ReactTimeout from 'react-timeout'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import FitText from '@kennethormandy/react-fittext';


import { audioPlayerActions } from '../../actions/audioPlayer.actions';
import { MouthController }  from './MouthController';
import { MouthAnimation }  from './MouthAnimation';
import { TrackInfo } from './TrackInfo';



const apiUrl = process.env.NODE_ENV === 'production' ? 
               process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL;

const mapDispatchToProps = dispatch => {
  return {
    playTrack: () => dispatch(audioPlayerActions.playTrack()),
    pauseTrack: () => dispatch(audioPlayerActions.pauseTrack())
  };
};

const mapStateToProps = state => {
  return {
    audioTrack: state.audioPlayer.audioTrack,
    activeTrack: state.audioPlayer.activeTrack,
    isPlaying: state.audioPlayer.isPlaying,
    controllerView: state.audioPlayer.controllerView,
    animated: state.audioPlayer.animated,
    queue: state.audioPlayer.queue
  };
};


class ConnectedMouthPlayer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      audioTrack: props.audioTrack,
      controllerView: props.controllerView,
      activeTrack: props.activeTrack
    };
  }

  componentDidUpdate() {
  }

  componentDidMount() {

  }
  mouth() {
    if (!this.props.controllerView) {
      return null;
    }

    let mouth = null;

    if (this.props.animated) {
      return (
        <div className="mouth">
          <MouthAnimation />;
        </div>
      );
    }

    else {
      if (this.props.isPlaying) {
        return (
          <div className="mouth">
            <MouthController/>
            <TrackInfo />
          </div>
        );
      }

      else {
        return (
          <div className="mouth">
            <MouthController />
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="animation-container">
	<ReactCSSTransitionGroup transitionName="mouth"
                                 transitionLeaveTimeout={700}
                                 transitionEnterTimeout={700}>
          { this.mouth() }
	</ReactCSSTransitionGroup>
      </div>
    );
  }
}
const MouthPlayer = connect(mapStateToProps, mapDispatchToProps)(ConnectedMouthPlayer);
export {MouthPlayer};
