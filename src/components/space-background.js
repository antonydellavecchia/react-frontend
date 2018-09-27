import React, { Component } from 'react'; 
import ReactDOM from 'react-dom'; 
import Particles from 'react-particles-js';
import data from './particles.json';

 
export class SpaceBackground extends Component {
  render(){
    return (
      <div id="app-background">
        <div id="particle">
          <Particles 
            params={data}
            className="particles"
          />
        </div>
      </div>
    );
  }
}
