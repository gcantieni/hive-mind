import * as constants from './constants.js';

export function draw(context, clickContext, organizers, menu) {
  // load menu first so it appears on top
  menu.load().then(resolve => {
    drawCanvas(context);
    organizers.forEach(organizer => organizer.draw(context, clickContext));
    menu.draw(context, clickContext);
  });
}

function drawCanvas(context) {
  context.fillStyle = constants.BACKGROUND_COLOR;
  context.fillRect(0, 0, constants.BOARD_WIDTH, constants.BOARD_HEIGHT);
}

// function drawImage(url, context, x, y) {
//   // let image = await loadImage(url);
//   return loadImage(url).then(image => {
//     context.drawImage(image, x, y);
//   });
// }
export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    // image.addEventListener('load', () => {
    //   resolve(image);
    // });
    image.onload = () => {
      resolve(image);
      // console.log("no error");
    }
    image.onerror = () => {
      resolve(image);
      console.log("error!");
    }
    image.src = url;
  });
}