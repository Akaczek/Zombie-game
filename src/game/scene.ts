import block from './assets/block.png';
import background from './assets/background.png';
import player from './assets/player.png';
import { LaserGroup } from './groups/lasers';

export class Example extends Phaser.Scene {
  moveCam: boolean;
  cursors!: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };
  player!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  laserGroup!: LaserGroup;
  enemy!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  constructor() {
    super();
    this.moveCam = false;
  }

  shootLaser(mouseX: number, mouseY: number) {
    const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, mouseX, mouseY);
    this.laserGroup.fireLaser(this.player.x, this.player.y, angle * Phaser.Math.RAD_TO_DEG);
  }

  onCollide() {
    console.log('collide');
  }

  preload() {
    this.load.image('bg', background);
    this.load.image('block', block);
    this.load.image('player', player);
  }

  create() {
    //  Set the camera and physics bounds to be the size of 4x4 bg images
    this.cameras.main.setBounds(-1024, -1024, 1024 * 2, 1024 * 2);
    this.physics.world.setBounds(-1024, -1024, 1024 * 2, 1024 * 2);

    this.add.image(-1024, -1024, 'bg').setOrigin(0);
    this.add.image(0, -1024, 'bg').setOrigin(0);
    this.add.image(-1024, 0, 'bg').setOrigin(0);
    this.add.image(0, 0, 'bg').setOrigin(0);

    this.laserGroup = new LaserGroup(this);

    if (this.input.keyboard) {
      this.cursors = {
        ...this.input.keyboard.createCursorKeys(),
        ...{
          up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
          down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
          left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
          right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        }
      };
    }

    this.player = this.physics.add.image(0, 0, 'player');
    this.player.scale = 0.5;
    this.player.setCollideWorldBounds(true);

    this.enemy = this.physics.add.image(400, 400, 'block');
    this.enemy.setCollideWorldBounds(true);

    this.cameras.main.startFollow(this.player, true);

    // this.cameras.main.setDeadzone(400, 200);
    // this.cameras.main.setZoom(0.5);

    if (this.cameras.main.deadzone) {
      const graphics = this.add.graphics().setScrollFactor(0);
      graphics.lineStyle(2, 0x00ff00, 1);
      graphics.strokeRect(
        200,
        200,
        this.cameras.main.deadzone.width,
        this.cameras.main.deadzone.height
      );
    }

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.shootLaser(pointer.worldX, pointer.worldY);
    });

    this.physics.add.overlap(this.laserGroup, this.enemy, (obj1, obj2) => {
      obj1.destroy();
      obj2.destroy();
      console.log(obj1, obj2);
    }, undefined, this);
  }

  update() {
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-300);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(300);
    }
  }
}
