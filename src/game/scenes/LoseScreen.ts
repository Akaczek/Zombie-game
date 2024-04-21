export class LoseScreen extends Phaser.Scene {
  constructor() {
    super('lose-screen');
  }

  create() {
    this.add.text(100, 100, 'You lost! Click to restart the game', {
      fontSize: '48px',
      color: '#ffffff',
    });

    this.input.on('pointerup', () => {
      this.scene.start('game');
    });
  }
}