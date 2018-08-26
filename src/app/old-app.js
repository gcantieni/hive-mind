import * as constants from './constants.js';
import { Organizer } from './organizer.js';
import { draw } from './draw.js';
import { Listener } from './listener.js';
import { Menu } from './menu.js';
import { ClickableSprite } from './clickable-sprite.js';

async function main() {
  const canvas = document.getElementById('board');
  canvas.width = constants.BOARD_WIDTH;
  canvas.height = constants.BOARD_HEIGHT;
  const context = canvas.getContext('2d');

  const clickCanvas = document.createElement('canvas');
  clickCanvas.width = constants.BOARD_WIDTH;
  clickCanvas.height = constants.BOARD_HEIGHT;
  const clickContext = clickCanvas.getContext('2d');

  let clickables = new Map();

  let organizers = new Map([
    ['hive', new Organizer('hive', clickables)],
    ['flower', new Organizer('flower', clickables)],
    ['bee', new Organizer('bee', clickables)]
  ]);

  const menu = new Menu(clickables);
  const menuImages = await menu.load();

  let listener = new Listener(menu.resources, organizers, clickables);
  listener.listen(canvas, clickContext);

  const loadMap = await fetch('/app/map.json');
  const map = await loadMap.json();

  for (let piece of map.pieces) {
    for (let i = 0; i < piece.positions.length; i += 2) {
      organizers.get(piece.type).add(piece.positions[i], piece.positions[i + 1]);
    }
  }

  let start = null;
  update(0);


  function update(time = 0) {
    let progress = time - start;
    if (!start) start = time;
    draw(context, clickContext, organizers, menu);
    organizers.get('bee').elements.forEach(bee => bee.update());
    window.requestAnimationFrame(update)
  }
}

main();