import { curry } from './util/functional.js';

export function arraysEqual2D(array1, array2) {
  for (var i = 0; i < array1.length; i++) {
    for (var j = 0; j < array1[0].length; j++) {
      if (array1[i][j] !== array2[i][j]) return false;
    }
  }
  return true;
}
export function forEach2D(array, fn) {
  array.forEach(subArray => subArray.forEach(fn));
}
export function map2D(fn, array) {
  return array.map(subArray => subArray.map(fn));
}

export function initializeArray2D(rows, cols) {
  var newArray = new Array(rows);
  for (let i = 0; i < newArray.length; i++) {
      newArray[i] = new Array(cols);
  }
  return newArray;
}
export function copyArray2D(array) {
  var newArray = new Array(array.length);
  array.forEach((subArray, i) => newArray[i] = subArray.slice());
  return newArray;
}

export function make2D(arr, cols) {
  var copy = arr.slice();
  var res = []; 
  while (copy.length) 
    res.push(copy.splice(0, cols));
  return res; 
}
