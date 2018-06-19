import { Game } from './game.js';

function launch() {
  const canvas = document.getElementById('board');
  const context = board.getContext('2d');
  let game = new Game(canvas, context);

  game.show();
}

launch();