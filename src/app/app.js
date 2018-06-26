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
  const context = canvas.getContext('2d');

  const clickCanvas = document.createElement('canvas');
  clickCanvas.width = constants.BOARD_WIDTH;
  clickCanvas.height = constants.BOARD_HEIGHT;
  const clickContext = clickCanvas.getContext('2d');

  let clickables = new Map();

  canvas.addEventListener('click', e => {
    const mousePos = {
      x: e.clientX - canvas.offsetLeft,
      y: e.clientY - canvas.offsetTop
    };
    const pixelColor = clickContext.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    const color = `rgb(${pixelColor[0]},${pixelColor[1]},${pixelColor[2]})`;
    if (clickables.get(color)) {
      console.log("clicked on a clickable!");
    }
  })


  let organizers = new Map([
    ['hive', new HiveOrganizer()],
    ['flower', new FlowerOrganizer(clickables)],
    ['bee', new BeeOrganizer()]
  ]);

  let menu = new Menu();

  let listener = new Listener(menu, organizers);
  listener.setType('flower');
  listener.listen(canvas);
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



