import Phaser from 'phaser';

class TrackScene extends Phaser.Scene {
  constructor(){
    super({
      key: 'TrackScene'
    });
  }

  preload() {
    console.log('space plat former preload');
    this.load.image('tiles', 'assets/images/space_platform_tiles.png');
    this.load.tilemapTiledJSON('map','assets/tilemaps/space_platformer.json');
    this.load.spritesheet('eldridge', 'assets/images/eldridge_spritesheet.png', {
      frameWidth: 100,
      frameHeight: 150,
      startFrame: 2,
      endFrame: 4
    });

    //this.load.image("tiles", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/tilesets/catastrophi_tiles_16_blue.png");
    //this.load.tilemapCSV("map", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/tilemaps/catastrophi_level3.csv");
  }

  create() {
    console.log('the space kitchen');

    //this.cameras.main.setBounds(0, 0, 1000000, 1000000);
    //this.physics.world.setBounds(0, 0, 1000000, 1000000);

    //const map = this.make.tilemap({key:'spacekitchen', tileWidth: 100, tileHeight: 100});
    //const tileset = map.addTilesetImage('space_platforms', 'spaceTiles');

    
    //this.backgroundLayer = map.createStaticLayer('background', tileset);
    //const blockedLayer = map.createStaticLayer('blockedLayer', tileset, 0, 0);

    // create objects behind player
    //let layer = this.physics.add.group();
    //layer.enableBody = true;	
    
    //let objArr = findObjectsByType('fridge', 'backObjects', map);
    //objArr.forEach((element) => this.physics.add.tileSprite(element, layer));
    //this.backObjects = layer;

    // Creat player

    //this.cameras.main.startFollow(this.player, true, 0.008, 0.02);
    
    // Set tiles for collisions
    //map.setCollisionByExclusion([0], true, blockedLayer);

    // When loading a CSV map, make sure to specify the tileWidth and tileHeight!
    const map = this.make.tilemap({ key: "map", tileWidth: 100, tileHeight: 100 });
    const tileset = map.addTilesetImage("space_platforms", "tiles");
    this.layer = map.createStaticLayer('blockedLayer', tileset, 0, 0); // layer index, tileset, x, y

    this.layer.setCollisionByProperty({ collides: true});
    console.log(this.layer);
    
    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;

    // Set up the arrows to control the camera
    this.cursors = this.input.keyboard.createCursorKeys();

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // add player
    this.player = this.physics.add.sprite(map.widthInPixels / 2, map.heightInPixels / 2, 'eldridge');

    // collide with platforms
    this.physics.add.collider(this.player, this.layer);

    // add gravity
    this.player.setGravity(0, 1000);

    camera.startFollow(this.player);
    
  }

  update() {
    const speed = 500;
    
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-1 * speed);
    }

    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    }

    else if (this.player.body.onFloor()) {
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.onFloor()){
      this.player.setVelocityY(-500);
    }
  }
}


function findObjectsByType(type, layerName, map) {
  console.log(map);
  // Returns array of objects of given type from layer
  let objArr = [];

  map.objects.forEach(function(element) {
    if( element.type === type) {
      //Phaser uses top left, Tiled bottom left so we have to adjust
      //also keep in mind that some images could be of different size as the tile size
      //so they might not be placed in the exact position as in Tiled

      element.y -= map.tileHeight;
      objArr.push(element);
    }
  });

  return objArr;
}

export default TrackScene;
