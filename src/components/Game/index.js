import React from 'react';
import Phaser from 'phaser';
import BootScene from './Scenes/BootScene';
import PreloadScene from './Scenes/PreloadScene';
import MenuScene from './Scenes/MenuScene';
import TrackScene from './Scenes/TrackScene';

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      game: null,
      map: null
    };
      
  }
  
  render() {
    return <div id="game-container"></div>;
  }

  componentDidUpdate(){

  }

  componentDidMount() {
    if (!this.state.game) {
      let width = window.innerWidth;
      let height = window.innerHeight;
      let config = {
        type: Phaser.AUTO,
        parent: 'game-container',
        width: width,
        height: height,
        backgroundColor: 0,
        transparent: true,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: {
            },
            debug: true
          }
        },
        scene:[
          BootScene,
          PreloadScene,
          MenuScene,
          TrackScene
        ]
      }
      
      this.setState({
        game: new Phaser.Game(config)
      });
    }
  }

  

}
