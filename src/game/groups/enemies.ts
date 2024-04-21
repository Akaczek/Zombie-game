import Phaser from 'phaser';

class EnemyGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);
  }

  addEnemy(x: number, y: number) {
    // Create a new enemy
    const enemy = new Enemy(this.scene, x, y);

    // Add the enemy to the group
    this.add(enemy);
  }
}

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'zombie');
    scene.physics.world.enable(this);
    scene.add.existing(this);
  }

  preUpdate() {
    this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, 200);
  }
}

export default EnemyGroup;