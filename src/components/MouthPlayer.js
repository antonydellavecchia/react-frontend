import React, { Component } from 'react';
import { render } from 'react-dom';
import imageMapResize from 'image-map-resizer';
import Spritesheet from 'react-responsive-spritesheet';

export class MouthPlayer extends Component {
  constructor () {
    super();
    this.state = {
      mouthImage:'assets/images/mouth1.png',
      animated: false,
      playing: false
    };
  }

  clicked(area) {
    this.setState({
      animated: true
    });
  }
  
  hover(area) {
    if (area == 'play') {
      let frame = this.state.playing ? 15 : 16;

      this.setState({
        mouthImage: `assets/images/mouth${frame}.png`
      });
    }

    if (area == 'next') {
      let frame = this.state.playing ? 18 : 17;

      this.setState({
        mouthImage: `assets/images/mouth${frame}.png`
      });
    }

    if (area == 'previous') {
      let frame = this.state.playing ? 20 : 19;

      this.setState({
        mouthImage: `assets/images/mouth${frame}.png`
      });
    }
  }

  hoverOff() {
    let frame = this.state.playing ? 14 : 1;

    this.setState({
      mouthImage: `assets/images/mouth${frame}.png`
    });
  }

  mouth() {
    if (this.state.animated) {
      

      return this.mouthAnimation();
    }

    else {
      return this.mouthController();
    }
  }
  //returns a sprite
  mouthAnimation() {
    let endFrame = this.state.playing ? 1 : 14;
    let startFrame = this.state.playing ? 14 : 1;
    let animationDirection = this.state.playing ? 'rewind' : 'forward';


    return (
      <div className="mouth-background">
        <img className="mouth" src={ this.state.mouthImage } />
        <Spritesheet
          style={{
            position: 'absolute',
            zIndex: '1',
            width: '100%'
          }}
          image={`assets/images/mouth-spritesheet.png`}
          widthFrame={640}
          heightFrame={826}
          steps={15}
          fps={25}
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
              if (this.state.playing) {
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
      mouthImage: `assets/images/mouth${endFrame}.png`,
      playing: !this.state.playing
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
  
  render() {
    return (
      <div className="mouth-player">
        { this.mouth() }
        
      </div>
    );
  }
}
