import Phaser from 'phaser';
import { Example } from './scene';

export const config = {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  width: 1280,
  height: 900,
  physics: {
      default: 'arcade',
  },
  scene: Example
};
