import React, { Component } from 'react'; 
import ReactDOM from 'react-dom'; 
import Particles from 'react-particles-js';
import data from './particles.json';
import Game from './Game';

 
export class SpaceBackground extends Component {
  render(){
    let particles = (
      <div id="particle">
        <Particles 
          params={data}
          className="particles"
        />
      </div>
    );
    
    return (
      <div id="app-background">
        { particles }
      </div>
    );
  }
}
