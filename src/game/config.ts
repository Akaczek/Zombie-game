import Phaser from 'phaser';
import { Game } from './scenes/GameScene';
import { StartScreen } from './scenes/StartScreen';
import { LoseScreen } from './scenes/LoseScreen';

export const config = {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  width: 1280,
  height: 900,
  physics: {
      default: 'arcade',
  },
  scene: [StartScreen, Game, LoseScreen]
};
