import { forEach2D, arraysEqual2D, initializeArray2D, copyArray2D, map2D, make2D } from './array2D.js';

test('forEach2D', () => {
    var sample2D = [
      [1, 2, 3],
      [4, 5, 6]
    ];
    
    forEach2D(sample2D, (el, i, array) => array[i] = el * el);
    expect(sample2D).toEqual([[1, 4, 9], [16, 25, 36]]);
  });

test('map2D should return a new array with callback function applied to each subarray', () => {
  var sample2D = [
    [1, 2, 3],
    [4, 5, 6]
  ]
  expect(map2D(el => el * el, sample2D)).toEqual([[1, 4, 9], [16, 25, 36]]);
  expect(sample2D).toEqual([[1, 2, 3], [4, 5, 6]]);
});

test('map2D should auto-curry', () => {
  var sample2D = [
    [1, 2, 3],
    [4, 5, 6]
  ];
  expect(map2D(el => el * el, sample2D)).toEqual([[1, 4, 9], [16, 25, 36]]);
});

test('arraysEqual2D should return true when arrays have same elements', () => {
  var sample2D = [
    [1, 2, 3],
    [4, 5, 6]
  ]
  var equal2D = [
    [1, 2, 3],
    [4, 5, 6]
  ]
  expect(sample2D === equal2D).toBe(false);
  expect(arraysEqual2D(sample2D, equal2D)).toBe(true);
  equal2D[0][0] = 2;
  expect(arraysEqual2D(sample2D, equal2D)).toBe(false);
  sample2D[0][0] = 2;
  expect(arraysEqual2D(sample2D, equal2D)).toBe(true);
});

test('initializeArray2D should return 2d array of dimensions specified', () => {
  var sample2By2 = [
    new Array(2),
    new Array(2) 
  ];
  var sample3By9 = [
    new Array(9),
    new Array(9),
    new Array(9),
  ];

  expect(arraysEqual2D(sample2By2, initializeArray2D(2, 2))).toBe(true);
  expect(arraysEqual2D(sample3By9, initializeArray2D(3, 9))).toBe(true);
});

test('copyArray2D should return a 2-deep array copy', () => {
  var sample2D = [[1, 2, 3], [4, 5, 6]];
  var shallowCopy = sample2D.slice();
  var deepCopy = copyArray2D(sample2D);

  expect(sample2D).toEqual(shallowCopy);
  expect(sample2D).toEqual(deepCopy);
  sample2D[0][0] = 2;
  expect(sample2D).toEqual(shallowCopy);
  expect(sample2D).not.toEqual(deepCopy);
});

test('make2D should convert 1 dimentional array to 2 dimentional array', () => {
  expect(make2D([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
});