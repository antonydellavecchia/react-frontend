import Phaser from 'phaser';

class MenuScene extends Phaser.Scene {
  constructor(){
    super({
      key: 'MenuScene'
    });
  }

  create() {
    let worldWidth = 1000000;
    let worldHeight = 1000000
    // Create Menu and put fridge , and define start key
    this.cameras.main.setBounds(0, 0, 1000000, 1000000);
    this.physics.world.setBounds(0, 0, 1000000, 1000000);

    //let x = this.sys.canvas.width / 2;
    //let y = this.sys.canvas.height / 2;

    let x = 1000000 / 2;
    let y = 1000000 / 2;
    // Add sprites
    this.firstLevelStove = this.physics.add.sprite( x + 500, y + 500, 'stove');

    //for(let i = 0; i < worldWidth / 1000; i++){
    //  this.physics.add.sprite(200 * Math.random() * i * Math.pow(-1, i) + x, 200 * Math.random() * i * Math.pow(-1, Math.floor(i / 2)) + y, 'stove');
    //}
    
    this.dryer = this.physics.add.sprite(2000, 600, 'dryer');
    this.fridge = this.physics.add.sprite(x, y, 'fridge');

    this.cameras.main.startFollow(this.fridge, true, 0.008, 0.02);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  }

  update() {
    let xPull = this.firstLevelStove.x - this.fridge.x;
    let yPull = this.firstLevelStove.y - this.fridge.y;
    let velocityX =  5 * xPull / Math.abs(xPull);
    let velocityY =  5 * yPull / Math.abs(yPull);
    
    this.fridge.setVelocityX(velocityX);
    this.fridge.setVelocityY(velocityY);

    if (Math.max(xPull, yPull) < 20) {
      this.scene.start('TrackScene');
    }
    
    if (this.startKey.isDown) {
      let sceneName = 'TheSpaceKitchenScene';
      
      let speed =  160;
      let angle = 2 * Math.PI * (this.fridge.angle - 90) / 360;
      let velocityX = speed * Math.cos(angle);
      let velocityY = speed * Math.sin(angle);
      
      this.fridge.setVelocityX(velocityX);
      this.fridge.setVelocityY(velocityY);
    }

    if (this.cursors.left.isDown) {
        let angle = this.fridge.angle - 2.5;
        this.fridge.setAngle(angle);

    }

    else if (this.cursors.right.isDown) {
        let angle = this.fridge.angle + 2.50;
        this.fridge.setAngle(angle);
    }
  }
}

export default MenuScene;
