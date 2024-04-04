import Phaser from 'phaser';
import { Example } from './scene';

export const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1600,
  height: 900,
  physics: {
      default: 'arcade',
  },
  scene: Example
};
