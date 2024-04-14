class LaserGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Laser,
      frameQuantity: 30,
      active: false,
      visible: false,
      key: 'laser',
      setScale: { x: 0.5, y: 0.5 }
    });
  }

  fireLaser(x: number, y: number, angle: number) {
    const laser = this.getFirstDead(false);

    if (laser) {
      laser.fire(x, y, angle);
    }
  }

  getGroup() {
    return this;
  }
}

class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'laser');
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);

    if (this.y <= -1024 || this.y >= 1024 || this.x <= -1024 || this.x >= 1024) {
      this.setActive(false);
      this.setVisible(false);
    }
  }

  fire(x: number, y: number, angle: number) {
    if (this.body) {
      this.body.reset(x, y);
      this.setActive(true);
      this.setVisible(true);
      this.setAngle(angle);
      this.setRotation(angle * Phaser.Math.DEG_TO_RAD + Math.PI / 2);
      this.scene.physics.velocityFromAngle(angle, 1000, this.body.velocity);
    }
  }
}

export default LaserGroup;
