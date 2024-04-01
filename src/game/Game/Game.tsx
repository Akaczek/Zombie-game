import { FC, useEffect } from 'react';
import Phaser from 'phaser';

import { config } from '../config';

const Game: FC = () => {
  useEffect(() => {
    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
      <div id='phaser-container'/>
  );
}

export default Game;