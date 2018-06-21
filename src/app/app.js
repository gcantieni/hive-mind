import * as constants from './constants.js';
import { HiveOrganizer } from './hive.js';
import { FlowerOrganizer } from './flower.js';
import { BeeOrganizer } from './bee.js';
import { draw } from './draw.js';
import { Listener } from './listener.js';

function main() {
  const canvas = document.getElementById('board');
  canvas.width = constants.BOARD_WIDTH;
  canvas.height = constants.BOARD_HEIGHT;
  const context = board.getContext('2d');

  let organizers = new Map([
    ['hive', new HiveOrganizer()],
    ['flower', new FlowerOrganizer()],
    ['bee', new BeeOrganizer()]
  ]);

  let listener = new Listener(organizers);
  listener.setType('flower');
  listener.listen(canvas);

  let start = null;
  update(0);

  function update(time = 0) {
    let progress = time - start;
    if (!start) start = time;
    draw(context, canvas, organizers);
    window.requestAnimationFrame(update)
  }
}

main();



