export class StartScreen extends Phaser.Scene {
  constructor() {
    super('start-screen');
  }

  create() {
    this.add.text(100, 100, 'Welcome to the game!', {
      fontSize: '48px',
      color: '#ffffff',
    });

    this.add.text(100, 200, 'Click to start the game', {
      fontSize: '24px',
      color: '#ffffff',
    });

    this.input.on('pointerup', () => {
      this.scene.start('game');
    });
  }
}