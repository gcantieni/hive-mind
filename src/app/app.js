import * as constants from './constants.js';
import { HiveOrganizer } from './hive.js';
import { FlowerOrganizer } from './flower.js';
import { BeeOrganizer } from './bee.js';
import { draw } from './draw.js';
import { Listener } from './listener.js';


function main() {
  const canvas = document.getElementById('board');
  const context = board.getContext('2d');

  let organizers = new Map();
  organizers.set('hive', new HiveOrganizer(context));
  organizers.set('flower', new FlowerOrganizer(context));
  organizers.set('bee', new BeeOrganizer(context));

  let listener = new Listener(organizers);
  listener.setType('hive');
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



