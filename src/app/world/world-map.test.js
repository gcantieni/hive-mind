

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

test("shouldDraw should take index and return whether tile should be drawn", () => {
  var cam = { x: 1, y: 1, width: 2, height: 2 };
  expect(shouldDraw(cam, { x: 1, y: 1 })).toBe(true);
  expect(shouldDraw(cam, { x: 0, y: 0 })).toBe(false);
  expect(shouldDraw(cam, { x: 2, y: 2 })).toBe(true);
  expect(shouldDraw(cam, { x: 3, y: 1 })).toBe(false);
  expect(shouldDraw(cam, { x: 1, y: 3 })).toBe(false);
 
  cam = { x: 0.5, y: 0.5, width: 2, height: 2, maxX: 3, maxY: 3 };
  expect(shouldDraw(cam, { x: 0, y: 0 })).toBe(true);
  expect(shouldDraw(cam, { x: 1, y: 1 })).toBe(true);
  expect(shouldDraw(cam, { x: 3, y: 3 })).toBe(false);
  expect(shouldDraw(cam, { x: 4, y: 0 })).toBe(false);
});
