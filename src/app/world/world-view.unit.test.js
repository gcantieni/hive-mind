import { loadImage, loadWorld } from './world-view.js';
import { WorldMap } from './world-map.js';

test('loadWorldView should return an array of image promises', () => {
  var canvas = {};
  var worldMap = [
    ['bee', 'bee', 'bee'],
    ['bee', 'bee', 'bee']
  ];
  var beeUrl = '/img/bee-sprite.png';
  var expected = Array(6);
  expected = expected.map(el => el = loadImage('/img/bee-sprite.png'));
  console.log(expected);

  expect(loadWorld(worldMap, canvas)).toEqual(expected);
});

test('loadImage should return a promise that on completion will load image', () => {
  jest.setTimeout(500000);
  expect.assertions(1);
  return loadImage('img/beep-sprite.png')
    .then(img => expect(img.complete).toBe(true));
});

test('drawWorld should draw a list of images to a canvas', () => {
  var mockContext = {
    drawImage: function drawImage (img, x, y) {
      var http = new XMLHttpRequest();

      http.open('HEAD', image_url, false);
      http.send();
      expect(http.status).not.toBe(404);
    }
  }
  drawWorld(mockContext);
});