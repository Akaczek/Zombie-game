export class PauseScene extends Phaser.Scene {
  dmg: number = 0;

  constructor() {
    super('pause');
  }

  init (data: { damage: number }) {
    this.dmg = data.damage;
  }

  create() {
    const { width, height } = this.scale;
    const x = width * 0.5;
    const y = height * 0.5;

    this.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0);

    this.add.text(x, y, 'Game Paused', {
      fontSize: '48px',
      color: '#fff',
    }).setOrigin(0.5);

    this.input.keyboard.once('keydown-ESC', () => {
      this.scene.stop();
      this.scene.resume('game', { damage: 2 });
    });
  }
}