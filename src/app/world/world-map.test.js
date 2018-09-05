import { 
    validTile, 
    idxToCoord,
    screenToWorld, 
    worldToScreen, 
    sliceColsLeft, 
    sliceWorldCols,
    sliceWorldToSize,
    shouldDraw
  } from './world-map.js';
import { forEach2D } from '../array2D.js';
import { curry } from '../util/functional.js';

test('valid tile value should return false if not valid tile', () => {
  expect(validTile('bee')).toBe(true);
  expect(validTile('gusFish')).toBe(false);
});


test('idxToCoord should take in row col and output correct x & y to render img', () => {
  var world = [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8
    ];
  var width = 3;
  expect(idxToCoord(width, 2)).toEqual({x: 2, y: 0});
  expect(idxToCoord(width, 4)).toEqual({x: 1, y: 1});

  /*
   * idx:
   * 0 1 2 3 4 
   * 5 6 7 8 9
   * 
   * x-y:
   * 0-0 1-0 2-0 3-0 4-0
   * 0-1 1-1 2-1 3-1 4-1
   */
  expect(idxToCoord(5, 0)).toEqual({x: 0, y: 0});
  expect(idxToCoord(5, 5)).toEqual({x: 0, y: 1});
  expect(idxToCoord(5, 7)).toEqual({x: 2, y: 1});
});

test("worldToScreen should get screen x, y from x, y within canvas", () => {
  expect(worldToScreen({x: 0, y: 1}, {x: 0, y: 1})).toEqual({x: 0, y: 0});
  expect(worldToScreen({x: 3, y: 2}, {x: 1, y: 1})).toEqual({x: 2, y: 1});
});

test("screenToWorld should take screen x, y and return x, y within canvas",  () => {
  expect(screenToWorld({x: 0, y: 0}, {x: 1, y: 1})).toEqual({x: 1, y: 1});
  expect(screenToWorld({x: 3, y: 2}, {x: 1, y: 1})).toEqual({x: 4, y: 3});
});

test("sliceColsLeft should return array with first n cols removed", () => {
  expect(sliceColsLeft(1, 2, [0, 1, 2, 3])).toEqual([1, 3]);
  var shouldBeUnchanged = [
      0, 1, 2, 3,
      4, 5, 6, 7
    ];
  expect(sliceColsLeft(2, 4, shouldBeUnchanged)).toEqual([2, 3, 6, 7]);
  expect(shouldBeUnchanged).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
});

// test("sliceRowsTop should return array with first n rows removed", () => {
//   expect.assertions(1);
// });

// test("sliceWorldRows should delete the first n rows of theh world and adjust rows var", () => {
//   expect.assertions(1);
// });

test("sliceWorldCols should delete first n cols of world and change its cols var", () => {
  expect(sliceWorldCols(1, { map: [0, 1, 2, 3, 4], rows: 2, cols: 2}))
    .toEqual({ map: [1, 3], rows: 2, cols: 1});
});

test("shouldDraw should take index and return whether tile should be drawn", () => {
  var cam = { x: 1, y: 1, width: 2, height: 2 };
  expect(shouldDraw(cam, { x: 1, y: 1 })).toBe(true);
  expect(shouldDraw(cam, { x: 0, y: 0 })).toBe(false);
  expect(shouldDraw(cam, { x: 2, y: 2 })).toBe(true);
  expect(shouldDraw(cam, { x: 3, y: 1 })).toBe(false);
  expect(shouldDraw(cam, { x: 1, y: 3 })).toBe(false);
});

test("sliceWorldToSize should reduce the world to specified size starting from specific pt", () => {
  expect(sliceWorldToSize( 
    { x: 1, y: 1 }, 
    { x: 2, y: 2 }, 
    { map: [ 0, 1, 2, 3, 4, 5 ], rows: 2, cols: 3 }))
    .toEqual( { map: [ 1, 2, 4, 5 ], rows: 2, cols: 2 } );
});