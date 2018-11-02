import React, { Component } from 'react';
import { render } from 'react-dom';
import imageMapResize from 'image-map-resizer';
import Spritesheet from 'react-responsive-spritesheet';
import { connect } from 'react-redux';
import ReactTimeout from 'react-timeout'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TransitionGroup, CSSTransition } from "react-transition-group";


import { audioPlayerActions } from '../../actions/audioPlayer.actions';



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
    isPlaying: state.audioPlayer.isPlaying,
    controllerView: state.audioPlayer.controllerView
  };
};


class ConnectedMouthPlayer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      mouthImage:'/assets/images/mouth1.png',
      animated: false,
      audioTrack: props.audioTrack,
      controllerView: props.controllerView
    };
  }

  clicked(area) {
    console.log(this.state.audioTrack, 'hello');
    this.setState({
      animated: true
    });

    this.props.playTrack();
  }
  
  hover(area) {
    if (area == 'play') {
      let frame = this.props.isPlaying ? 15 : 16;

      this.setState({
        mouthImage: `/assets/images/mouth${frame}.png`
      });
    }

    if (area == 'next') {
      let frame = this.props.isPlaying ? 18 : 17;

      this.setState({
        mouthImage: `/assets/images/mouth${frame}.png`
      });
    }

    if (area == 'previous') {
      let frame = this.props.isPlaying ? 20 : 19;

      this.setState({
        mouthImage: `/assets/images/mouth${frame}.png`
      });
    }
  }

  hoverOff() {
    let frame = this.props.isPlaying ? 14 : 1;

    this.setState({
      mouthImage: `/assets/images/mouth${frame}.png`
    });
  }

  mouth() {
    if (!this.props.controllerView) {
      console.log('hello');
      return null;
    }

    if (this.state.animated) {
      return this.mouthAnimation();
    }

    else {
      return this.mouthController();
    }
  }
  
  //returns a sprite
  mouthAnimation() {
    let endFrame = this.props.isPlaying ? 1 : 14;
    let startFrame = this.props.isPlaying ? 14 : 1;
    let animationDirection = this.props.isPlaying ? 'rewind' : 'forward';


    return (
      <div className="mouth-background">
        <img className="mouth" src={ this.state.mouthImage } />
        <Spritesheet
          style={{
            position: 'absolute',
            zIndex: '1',
            width: '100%'
          }}
          image={`/assets/images/mouth-spritesheet.png`}
          widthFrame={640}
          heightFrame={826}
          steps={15}
          fps={20}
          direction={`${animationDirection}`}
          autoplay={true}
          loop={false}
          startAt= { parseInt(`${startFrame}`)}
          onEnterFrame={[
            {
              frame: parseInt(`${endFrame}`),
              callback: ((e) => {
                this.animationComplete(parseInt(`${endFrame}`));

              })
            }
          ]}
          onInit={() => {
              if (this.props.isPlaying) {
                this.setState({
                  mouthImage: `assets/images/mouth1.png`
                });
              }
          }}
        />
      </div>
    );
  }

  animationComplete (endFrame) {
    this.setState({
      animated: false,
      mouthImage: `/assets/images/mouth${endFrame}`,
      isPlaying: !this.props.isPlaying
    });
    this.render();
    this.componentDidMount();
  }

  // returns controls when mouth isnt being animated
  mouthController() {
    return(
      <div className="mouth-background">
        <img className="mouth" src={ this.state.mouthImage } useMap="#controls"/>
        <map name="controls">
	  <area shape="poly"
	        coords="246,89,226,135,224,174,264,188,404,196,419,165,421,123,396,87,325,117,326,115,326,116,250,92,248,88,248,91"
                onMouseEnter={ () => this.hover('play') }
                onMouseLeave={ () => this.hoverOff() }
                onClick={ () => this.clicked('play') }
          />
	  
	  <area shape="poly"
	        coords="241,86,220,136,225,174,186,185,139,166,145,125,170,93,181,92"
                onMouseEnter={ () => this.hover('previous') }
                onMouseLeave={ () => this.hoverOff() }

          />
          
	  <area shape="poly"
	        coords="400,87,409,82,479,103,499,145,493,188,435,198,426,193,429,148,420,120"
                onMouseEnter={ () => this.hover('next') }
                onMouseLeave={ () => this.hoverOff() }
          />
        </map>
      </div>
    );
  }

  componentDidMount() {
    imageMapResize();
  }

  componentDidUpdate() {
    
    imageMapResize();
    this.render();
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
