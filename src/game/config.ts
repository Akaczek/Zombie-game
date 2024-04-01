import Phaser from 'phaser';
import { Example } from './scene';

export const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: Example,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200, x: 0 },
    },
  },
};