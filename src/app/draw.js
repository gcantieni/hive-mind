export function draw(context, canvas, organizers) {
  drawCanvas(context, canvas);
  for (let org of organizers) org.draw();
}

function drawCanvas(context, canvas) {
  context.fillStyle = '#A1FFD9';
  context.fillRect(0, 0, canvas.width, canvas.height);
}