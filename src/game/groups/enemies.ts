import Phaser from 'phaser';

class EnemyGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);
  }

  addEnemy(x: number, y: number, hp: number) {
    const angle = Phaser.Math.Between(0, 360);
    const distance = Phaser.Math.Between(500, 900);
    x += distance * Math.cos(angle);
    y += distance * Math.sin(angle);
    // Create a new enemy
    const enemy = new Enemy(this.scene, x, y, hp);

    // Add the enemy to the group
    this.add(enemy);
  }
}

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  enemyHP: number = 3;
  speed: number = 200;

  constructor(scene: Phaser.Scene, x: number, y: number, hp: number) {
    super(scene, x, y, 'zombie');
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.enemyHP = hp;
  }

  enemyHit(damage: number) {
    this.enemyHP -= damage;
    if (this.enemyHP <= 0) {
      this.scene.events.emit('enemy-killed');
      this.destroy();
    }
  }

  preUpdate() {
    this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, this.speed);
  }
}

export default EnemyGroup;