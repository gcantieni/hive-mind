import * as constants from './constants.js';

export function draw(context, canvas, organizers) {
  drawCanvas(context, canvas);

  organizers.forEach(organizer => organizer.draw(context));
}

function drawCanvas(context, canvas) {
  context.fillStyle = constants.BACKGROUND_COLOR;
  context.fillRect(0, 0, constants.BOARD_WIDTH, constants.BOARD_HEIGHT);
}