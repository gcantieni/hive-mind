import * as constants from './constants.js';

export var hiveOrganizer = (function() {
  let hives = [];

  function addHive(x, y) {
    hives.push({
      pos: {x: x, y: y}
    });
  }

  function removeHive(oldHive) {
    var index = hives.indexOf(oldHive);
    if (index > -1) {
      oldHive.splice(index, 1);
    }
  }

  function drawHives(context) {
    context.fillStyle = '#DAA520';
    hives.map((h) => {
      context.fillRect(h.pos.x, h.pos.y,
        constants.HIVE_WIDTH, constants.HIVE_WIDTH);
    });
  }

  return {
    add: addHive,
    remove: removeHive,
    draw: drawHives
  }
})()

export function drawHives(context, hives) {
  console.log(hives);
  context.fillStyle = '#DAA520';
  for (let i = 0; i < hives.length; i += 1) {
    context.fillRect(
      hives[i].pos.x,
      hives[i].pos.y,
      constants.HIVE_WIDTH,
      constants.HIVE_WIDTH);
  }
}