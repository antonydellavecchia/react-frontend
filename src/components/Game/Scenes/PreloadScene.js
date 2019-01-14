import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
  constructor(){
    super({
      key: 'PreloadScene'
    });
  }

  preload() {
    //  console.log('preload');
    //  //show loading screen

    let x = this.world ? this.world.centerX : 0;
    let y = this.world ? this.world.centerY : 0;

    this.preloadBar = this.physics.add.sprite(x, y, 'preloadbar');
    //this.preloadBar.anchor.setTo(0.5);
    //this.preloadBar.scale.setTo(3);
    
    //load this assets
    // this.load.tilemap('heavyroom','assets/tilemaps/heavyroom.json', null, Phaser.Tilemap.TILED_JSON);

    //this.load.spritesheet('eldridge', 'assets/images/eldridge_spritesheet.png', 100, 150);
    
    this.load.image('counter', 'assets/images/counter.png');
    this.load.image('fridge', 'assets/images/fridge.png');
    this.load.image('dryer', 'assets/images/dryer.png');
    this.load.image('drums', 'assets/images/drums.png');
    this.load.image('stove', 'assets/images/stove.png');

  }
  
  create() {
    this.scene.start('MenuScene');
  }
}

export default PreloadScene;
