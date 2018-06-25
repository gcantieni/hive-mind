import * as constants from './constants.js';
import { HiveOrganizer } from './hive.js';
import { FlowerOrganizer } from './flower.js';
import { BeeOrganizer } from './bee.js';
import { draw } from './draw.js';
import { Listener } from './listener.js';
import { Menu } from './menu.js';

function main() {
  const canvas = document.getElementById('board');
  canvas.width = constants.BOARD_WIDTH;
  canvas.height = constants.BOARD_HEIGHT;
  const context = board.getContext('2d');

  //TODO make off-screen clickCanvas for logical click detection
  // const clickCanvas =

  let organizers = new Map([
    ['hive', new HiveOrganizer()],
    ['flower', new FlowerOrganizer()],
    ['bee', new BeeOrganizer()]
  ]);

  let menu = new Menu();

  let listener = new Listener(menu, organizers);
  listener.setType('flower');
  listener.listen(canvas);

  let start = null;
  update(0);

  function update(time = 0) {
    let progress = time - start;
    if (!start) start = time;
    draw(context, organizers, menu);
    window.requestAnimationFrame(update)
  }
}

main();



