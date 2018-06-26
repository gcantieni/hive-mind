import * as constants from './constants.js';

export class Listener {
  constructor(menu, organizers, clickables) {
    this.menu = menu;
    this.organizers = organizers;
    this.clickables = clickables;

    this.type = null;
  }

  setType(newType) {
    if (this.organizers[newType] === null) {
      throw "Non-recognized type";
    } else {
      this.type = newType;
    }
  }

  listen(canvas, clickContext) {
    canvas.addEventListener('mousedown', evt => {


    });

    canvas.addEventListener('click', e => {

      const mousePos = {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
      };

      this.organizers.get(this.type).add(mousePos.x, mousePos.y);

      const pixelColor = clickContext.getImageData(mousePos.x, mousePos.y, 1, 1).data;
      const color = `rgb(${pixelColor[0]},${pixelColor[1]},${pixelColor[2]})`;
      if (this.clickables.get(color)) {
        console.log("clicked on a clickable!");
      }
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