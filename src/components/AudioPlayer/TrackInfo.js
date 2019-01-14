import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import ReactTimeout from 'react-timeout'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import FitText from '@kennethormandy/react-fittext';

import { audioPlayerActions } from '../../actions/audioPlayer.actions';

const apiUrl = process.env.NODE_ENV === 'production' ? 
               process.env.REACT_APP_API_URL : process.env.REACT_APP_DEV_API_URL;
const mapStateToProps = state => {
  return {
    activeTrack: state.audioPlayer.activeTrack
  };
};

class TrackInfo extends Component {
  constructor (props) {
    super(props);

  }

  componentDidUpdate() {
    console.log(this.props.activeTrack);
  }

  render() {
    let track = this.props.activeTrack;
    if (track) {
      return (
        <div>
          <div className="current-track-title">
            <FitText>
              { track.title }
            </FitText>
          </div>
          <div className="current-track-artist">
            <FitText>
              { track.artist }
            </FitText>
          </div>
          <div className="album-art">
            <FitText>
              <img src={`${apiUrl}/static/covers/${track.cover}` }/>
            </FitText>
          </div>
        </div>
      );
    }

    return null;
  }
}

const connectedTrackInfo = connect(mapStateToProps)(TrackInfo);
export {connectedTrackInfo as TrackInfo};
