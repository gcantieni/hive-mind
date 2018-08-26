import { compose, curry, composeAsync, pipeAsync, flatten, map, maybe } from './functional.js';

test("compose should string functions from right to left", () => {
  var addOne = n => n + 1;
  var timesTwo = n => 2 * n;
  var addOneTimesTwo = compose(timesTwo, addOne);
  var timesTwoAddOne = compose(addOne, timesTwo);
  expect(addOneTimesTwo(3)).toBe(8);
  expect(timesTwoAddOne(3)).toBe(7);
});

// test("pipeAsync should pipe asynchronous requests", (done) => {
//   expect.assertions(1)
//   jest.setTimeout(10000);
//   var func1 = function(arg) {
//     arg++;
//     return arg;
//   }
//   var asyncFunc = function(arg) {
//     return new Promise(resolve => {
//       arg++;
//       resolve(arg);
//     });
//   }
//   return expect(composeAsync(asyncFunc, asyncFunc)(3)).resolves.toBe(5);
// });

test("curry should succesively partially apply args to func", () => {
  var addThreeNums = function (num1, num2, num3) {
    return num1 + num2 + num3;
  }
  var addSeven = curry(addThreeNums)(3)(4);
  expect(addSeven(6)).toBe(13);
});

test("curried function should execute once it gets all args", () => {
  var addThreeNums = (num1, num2, num3) => num1 + num2 + num3;
  expect(curry(addThreeNums)(3)(4)(6)).toBe(13);

});

test("flatten should return a one dimensional \
  array from multi-demensional array", () => {
  expect(flatten([1, 2, 3, [4, 5, [6]]])).toEqual([1, 2, 3, 4, 5, 6]);
});

test("map should return array with function applied to elements", () => {
  expect(map(x => x*2, [1, 2, 3])).toEqual([2, 4, 6]);
})

test("maybe should return input if truthy and otherwise return 0", () => {
  expect(maybe(1)).toBe(1);
  expect(maybe(false)).toBe(0);
  expect(maybe(NaN)).toBe(0);
})