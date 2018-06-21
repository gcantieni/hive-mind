export class Listener {
  constructor(organizers) {
    this.organizers = organizers;
    this.outputType = null;
  }

  changeOutputType(newOutputType) {

  }
}

export function getMousePos(canvas, evt) {
  let bound = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - bound.left,
    y: evt.clientY - bound.top
  }
}