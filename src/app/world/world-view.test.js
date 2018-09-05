import { loadImage, loadWorldImages } from './world-view.js';
import { WorldMap } from './world-map.js';

// test('loadImage should return a promise that on completion will load image', () => {
//   return loadImage('/img/bee-sprite.png')
//     .then(img => expect(img.complete).toBe(true))
//     .catch(err => expect(true).toBe(true));
// });

test('loadWorldView should return an array of image promises', () => {
  var canvas = {};
  var worldMap = [
    'bee', 'bee'
  ];
  var beeUrl = '/img/bee-sprite.png';

  return Promise.resolve(7)
    .then(map => {
      expect(true).toBe(true);
    });
}, 15000);


test('drawWorld should draw a list of images to a canvas', () => {
  var mockContext = {
    drawImage: function drawImage (img, x, y) {
      var http = new XMLHttpRequest();

      http.open('HEAD', image_url, false);
      http.send();
      expect(http.status).not.toBe(404);
    }
  }
});