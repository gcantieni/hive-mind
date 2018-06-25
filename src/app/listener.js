import * as constants from './constants.js';

export class Listener {
  constructor(menu, organizers) {
    this.menu = menu;
    this.organizers = organizers;

    this.type = null;
  }

  setType(newType) {
    if (this.organizers[newType] === null) {
      throw "Non-recognized type";
    } else {
      this.type = newType;
    }
  }

  listen(canvas) {
    canvas.addEventListener('mousedown', evt => {
      let pos = getMousePos(canvas, evt);
      this.organizers.get(this.type).add(pos.x, pos.y);
    });
  }
}

export function getMousePos(canvas, evt) {
  let bound = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - bound.left,
    y: evt.clientY - bound.top
  }
}