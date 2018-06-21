export function draw(context, canvas, organizers) {
  drawCanvas(context, canvas);
  // for (let key of organizers) {
  //   console.log(key);
  //   console.log("hi");
  //   organizers[key].draw();
  // }
  // console.log(Array.from(organizers));
  // console.log(organizers.forEach((o) => console.log(o)));
  organizers.forEach(organizer => organizer.draw());
}

function drawCanvas(context, canvas) {
  context.fillStyle = '#A1FFD9';
  context.fillRect(0, 0, canvas.width, canvas.height);
}