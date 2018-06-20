import * as constants from './constants.js';
import { HiveOrganizer } from './hive.js';
import { FlowerOrganizer } from './flower.js';
import { BeeOrganizer } from './bee.js';
import { draw } from './draw.js';


function main() {
  const canvas = document.getElementById('board');
  const context = board.getContext('2d');

  const two = 2;
  let hives = new HiveOrganizer(context);
  let flowers = new FlowerOrganizer(context);
  let bees = new BeeOrganizer(context, canvas);
  let start = null;
  update(0);
  bees.listen();

  function update(time = 0) {
    let progress = time - start;
    if (!start) start = time;
    draw(context, canvas, hives, flowers, bees);
    window.requestAnimationFrame(update)
  }
}

main();



