export class PauseScene extends Phaser.Scene {
  dmg: number = 0;
  speed: number = 0;
  score: number = 0;
  dmgText!: Phaser.GameObjects.Text;
  speedText!: Phaser.GameObjects.Text;
  scoreText!: Phaser.GameObjects.Text;
  upgradeDamageButton!: Phaser.GameObjects.Text;
  upgradeSpeedButton!: Phaser.GameObjects.Text;

  constructor() {
    super('pause');
  }

  init (data: { damage: number, score: number, speed: number}) {
    this.dmg = data.damage;
    this.speed = data.speed;
    this.score = data.score;
  }

  create() {
    const { width, height } = this.scale;
    const x = width * 0.5;

    this.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0);

    this.add.text(x, 100, 'Game Paused', {
      fontSize: '48px',
      color: '#fff',
    }).setOrigin(0.5);

    this.add.rectangle(x, 300, 400, 300, 0x000000).setOrigin(0.5);

    this.scoreText = this.add.text(x, 180, `Score: ${this.score}`, {
      fontSize: '30px',
      color: '#fff',
    }).setOrigin(0.5, 0)

    this.upgradeDamageButton = this.add.text(x, 230, 'Upgrade Damage (cost: 5)', {
      fontSize: '24px',
      color: '#fff',
    }).setOrigin(0.5, 0)
    this.upgradeDamageButton.setInteractive();

    this.dmgText = this.add.text(x, 260, `Damage: ${this.dmg}`, {
      fontSize: '24px',
      color: '#fff',
    }).setOrigin(0.5, 0)

    this.upgradeSpeedButton = this.add.text(x, 310, 'Upgrade Speed (cost: 3)', {
      fontSize: '24px',
      color: '#fff',
    }).setOrigin(0.5, 0)
    this.upgradeSpeedButton.setInteractive();

    this.speedText = this.add.text(x, 340, `Speed: ${this.dmg}`, {
      fontSize: '24px',
      color: '#fff',
    }).setOrigin(0.5, 0)

    this.upgradeDamageButton.on('pointerdown', () => {
      if (this.score >= 5) {
        this.score -= 5;
        this.dmg += 1;
        this.scoreText.setText(`Score: ${this.score}`);
        this.dmgText.setText(`Damage: ${this.dmg}`);
      }
    });

    this.upgradeDamageButton.on('pointerover', () => {
      this.upgradeDamageButton.setColor('#ff0');
    });

    this.upgradeDamageButton.on('pointerout', () => {
      this.upgradeDamageButton.setColor('#fff');
    });

    this.upgradeSpeedButton.on('pointerdown', () => {
      if (this.score >= 3) {
        this.score -= 3;
        this.speed += 1;
        this.scoreText.setText(`Score: ${this.score}`);
        this.speedText.setText(`Speed: ${this.speed}`);
      }
    });

    this.upgradeSpeedButton.on('pointerover', () => {
      this.upgradeSpeedButton.setColor('#ff0');
    });

    this.upgradeSpeedButton.on('pointerout', () => {
      this.upgradeSpeedButton.setColor('#fff');
    });

    if (this.input.keyboard) {
      this.input.keyboard.once('keydown-ESC', () => {
        this.scene.stop();
        this.scene.resume('game', { damage: this.dmg, score: this.score, speed: this.speed});
      });
    }
  }
}