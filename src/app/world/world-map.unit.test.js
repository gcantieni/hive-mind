import { validTile, initializeWorld, getPos } from './world-map.js';
import { forEach2D } from '../array2D.js';
import { curry } from '../util/functional.js';

test('valid tile value should return false if not valid tile', () => {
  expect(validTile('bee')).toBe(true);
  expect(validTile('gusFish')).toBe(false);
});


test('getPos should take in row col and output correct x & y to render img', () => {
  var world = [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ];
  var width = 3;
  var getPosFromIdx = curry(getPos)(width);
  expect(getPosFromIdx(2)).toEqual({x: 2, y: 0});
  expect(getPosFromIdx(4)).toEqual({x: 1, y: 1});
  // TODO: add the statefull element "camera" to set scrolling

  /*
   * idx:
   * 0 1 2 3 4 
   * 5 6 7 8 9
   * 
   * x-y:
   * 0-0 1-0 2-0 3-0 4-0
   * 0-1 1-1 2-1 3-1 4-1
   */
  expect(getPos(5, 0)).toEqual({x: 0, y: 0});
  expect(getPos(5, 5)).toEqual({x: 0, y: 1});
  expect(getPos(5, 7)).toEqual({x: 2, y: 1});
});