import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene'
    });
  }

  create() {
    console.log('Boot Scene');
    this.load.image('preloadbar', 'assets/images/fridge.png');
    
    const progress = this.add.graphics();
    
    // Register a load progress event to show a load bar
    this.load.on('progress', (value) => {
      progress.clear();
      //progress.fillStyle(0xffffff, 1);
      progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
    });

    this.scene.start('PreloadScene');
  }
}



export default BootScene;


