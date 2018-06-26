import * as constants from './constants.js';
// import { HiveOrganizer } from './hive.js';
// import { FlowerOrganizer } from './flower.js';
// import { BeeOrganizer } from './bee.js';
import { Organizer } from './organizer.js';
import { draw } from './draw.js';
import { Listener } from './listener.js';
import { Menu } from './menu.js';

function main() {
  const canvas = document.getElementById('board');
  canvas.width = constants.BOARD_WIDTH;
  canvas.height = constants.BOARD_HEIGHT;
  const context = canvas.getContext('2d');

  const clickCanvas = document.createElement('canvas');
  clickCanvas.width = constants.BOARD_WIDTH;
  clickCanvas.height = constants.BOARD_HEIGHT;
  const clickContext = clickCanvas.getContext('2d');

  let clickables = new Map();
  // let hiveOrganizer = new Organizer('hive', clickables);
  // hiveOrganizer.add(20, 20);
  // hiveOrganizer.draw(context);
  let organizers = new Map([
    ['hive', new Organizer('hive', clickables)],
    ['flower', new Organizer('flower', clickables)],
    ['bee', new Organizer('bee', clickables)]
  ]);

  organizers.get('flower').add(20, 20);
  organizers.get('flower').draw(context, clickContext);

  let menu = new Menu();

  let listener = new Listener(menu, organizers, clickables);
  listener.listen(canvas, clickContext);
  organizers.get('flower').add(20, 20);

  let start = null;
  update(0);

  function update(time = 0) {
    let progress = time - start;
    if (!start) start = time;
    // draw(context, organizers, menu);
    organizers.get('flower').draw(context, clickContext);
    window.requestAnimationFrame(update)
  }
}

main();



