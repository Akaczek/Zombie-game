import { background, bullet, player, zombie, heart } from '../assets';
import { EnemyGroup, LaserGroup } from '../groups';

export class Game extends Phaser.Scene {
  cursors!: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };
  player!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  laserGroup!: LaserGroup;
  enemyGroup!: EnemyGroup;
  hasCollidedwithEnemy: boolean = false;
  hearts!: Phaser.GameObjects.Group;

  constructor() {
    super('game');
  }

  shootLaser(mouseX: number, mouseY: number) {
    const angle = Phaser.Math.Angle.Between(
      this.player.x,
      this.player.y,
      mouseX,
      mouseY
    );
    this.laserGroup.fireLaser(
      this.player.x,
      this.player.y,
      angle * Phaser.Math.RAD_TO_DEG
    );
  }

  onCollide(
    enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
    laser: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    enemy.destroy();
    laser.destroy();
  }

  onCollideEnemy(
    player: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
    enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    if (this.hasCollidedwithEnemy) return;
    this.hasCollidedwithEnemy = true;
    enemy.destroy();
    this.hearts.children.each((heart, index) => {
      if (index === 0) {
        heart.destroy();
        this.hasCollidedwithEnemy = false;
      }
      return false;
    });
    this.hasCollidedwithEnemy = false;
  }

  spawnEnemy() {
    this.enemyGroup.addEnemy(Phaser.Math.Between(-1024, 1024), Phaser.Math.Between(-1024, 1024));
  }

  preload() {
    this.load.image('bg', background);
    this.load.image('zombie', zombie);
    this.load.image('player', player);
    this.load.image('laser', bullet);
    this.load.image('heart', heart);
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
    this.enemyGroup = new EnemyGroup(this);

    this.hearts = this.add.group({
      key: 'heart',
      repeat: 2,
      setXY: {
        x: 1130,
        y: 40,
        stepX: 60,
      },
      setScale: {
        x: 2,
        y: 2,
      },
    });

    this.hearts.getChildren().forEach(heart => {
      heart.setScrollFactor(0);
    });

    this.events.on('lose', () => {
      this.scene.start('lose-screen');
    });

    if (this.input.keyboard) {
      this.cursors = {
        ...this.input.keyboard.createCursorKeys(),
        ...{
          up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
          down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
          left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
          right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        },
      };
    }

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

    this.player = this.physics.add.image(0, 0, 'player');
    this.player.scale = 0.5;
    this.player.setCollideWorldBounds(true);

    this.cameras.main.startFollow(this.player, true);

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.shootLaser(pointer.worldX, pointer.worldY);
    });

    this.time.addEvent({
      delay: 2000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    
    })
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

    this.physics.overlap(this.laserGroup, this.enemyGroup, this.onCollide, undefined, this);
    this.physics.overlap(this.player, this.enemyGroup, this.onCollideEnemy, undefined, this);

    if(this.hearts.countActive() === 0) {
      this.events.emit('lose');
    }
  }
}