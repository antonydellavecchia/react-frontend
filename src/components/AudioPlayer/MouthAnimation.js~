import React, { Component } from 'react';
import { render } from 'react-dom';
import Spritesheet from 'react-responsive-spritesheet';
import { connect } from 'react-redux';

import { audioPlayerActions } from '../../actions/audioPlayer.actions';
import mouthSpriteSheet  from './images/mouth-spritesheet.png';

const mapDispatchToProps = dispatch => {
  return {
    playTrack: () => dispatch(audioPlayerActions.playTrack()),
    pauseTrack: () => dispatch(audioPlayerActions.pauseTrack())
  };
};

const mapStateToProps = state => {
  return {
    audioTrack: state.audioPlayer.audioTrack,
    isPlaying: state.audioPlayer.isPlaying,
  };
};


class MouthAnimation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endFrame: this.props.isPlaying ? 1 : 14,
      startFrame: this.props.isPlaying ? 14 : 1,
      animationDirection: this.props.isPlaying ? 'rewind' : 'forward'      
    }
  }

  render () {
    return (
      <div className="mouth-background">
        <Spritesheet
          style={{
            position: 'absolute',
            zIndex: '1',
            width: '100%'
          }}
          image={ mouthSpriteSheet }
          widthFrame={640}
          heightFrame={826}
          steps={15}
          fps={20}
          direction={`${this.state.animationDirection}`}
          autoplay={true}
          loop={false}
          startAt= { parseInt(`${this.state.startFrame}`)}
          onEnterFrame={[
            {
              frame: parseInt(`${this.state.endFrame}`),
              callback: ((e) => {
                if (this.props.isPlaying) this.props.pauseTrack();
                else this.props.playTrack();

              })
            }
          ]}
          onInit={() => {}}
        />
      </div>
    );
  }
}

const ConnectedMouthAnimation = connect(mapStateToProps, mapDispatchToProps)(MouthAnimation);
export {ConnectedMouthAnimation as MouthAnimation};
