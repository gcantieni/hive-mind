(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var always = /*#__PURE__*/require('./always');

/**
 * A function that always returns `false`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.always, R.T
 * @example
 *
 *      R.F(); //=> false
 */


var F = /*#__PURE__*/always(false);
module.exports = F;
},{"./always":9}],2:[function(require,module,exports){
var always = /*#__PURE__*/require('./always');

/**
 * A function that always returns `true`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.always, R.F
 * @example
 *
 *      R.T(); //=> true
 */


var T = /*#__PURE__*/always(true);
module.exports = T;
},{"./always":9}],3:[function(require,module,exports){
/**
 * A special placeholder value used to specify "gaps" within curried functions,
 * allowing partial application of any combination of arguments, regardless of
 * their positions.
 *
 * If `g` is a curried ternary function and `_` is `R.__`, the following are
 * equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2, _)(1, 3)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @constant
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @example
 *
 *      var greet = R.replace('{name}', R.__, 'Hello, {name}!');
 *      greet('Alice'); //=> 'Hello, Alice!'
 */
module.exports = { '@@functional/placeholder': true };
},{}],4:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Adds two values.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @see R.subtract
 * @example
 *
 *      R.add(2, 3);       //=>  5
 *      R.add(7)(10);      //=> 17
 */


var add = /*#__PURE__*/_curry2(function add(a, b) {
  return Number(a) + Number(b);
});
module.exports = add;
},{"./internal/_curry2":106}],5:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Creates a new list iteration function from an existing one by adding two new
 * parameters to its callback function: the current index, and the entire list.
 *
 * This would turn, for instance, [`R.map`](#map) function into one that
 * more closely resembles `Array.prototype.map`. Note that this will only work
 * for functions in which the iteration callback function is the first
 * parameter, and where the list is the last parameter. (This latter might be
 * unimportant if the list parameter is not used.)
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Function
 * @category List
 * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int, [a] -> b) ... -> [a] -> *)
 * @param {Function} fn A list iteration function that does not pass index or list to its callback
 * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
 * @example
 *
 *      var mapIndexed = R.addIndex(R.map);
 *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 */


var addIndex = /*#__PURE__*/_curry1(function addIndex(fn) {
  return curryN(fn.length, function () {
    var idx = 0;
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = function () {
      var result = origFn.apply(this, _concat(arguments, [idx, list]));
      idx += 1;
      return result;
    };
    return fn.apply(this, args);
  });
});
module.exports = addIndex;
},{"./curryN":42,"./internal/_concat":101,"./internal/_curry1":105}],6:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig (a -> a) -> Number -> [a] -> [a]
 * @param {Function} fn The function to apply.
 * @param {Number} idx The index.
 * @param {Array|Arguments} list An array-like object whose value
 *        at the supplied index will be replaced.
 * @return {Array} A copy of the supplied array-like object with
 *         the element at index `idx` replaced with the value
 *         returned by applying `fn` to the existing element.
 * @see R.update
 * @example
 *
 *      R.adjust(R.add(10), 1, [1, 2, 3]);     //=> [1, 12, 3]
 *      R.adjust(R.add(10))(1)([1, 2, 3]);     //=> [1, 12, 3]
 * @symb R.adjust(f, -1, [a, b]) = [a, f(b)]
 * @symb R.adjust(f, 0, [a, b]) = [f(a), b]
 */


var adjust = /*#__PURE__*/_curry3(function adjust(fn, idx, list) {
  if (idx >= list.length || idx < -list.length) {
    return list;
  }
  var start = idx < 0 ? list.length : 0;
  var _idx = start + idx;
  var _list = _concat(list);
  _list[_idx] = fn(list[_idx]);
  return _list;
});
module.exports = adjust;
},{"./internal/_concat":101,"./internal/_curry3":107}],7:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xall = /*#__PURE__*/require('./internal/_xall');

/**
 * Returns `true` if all elements of the list match the predicate, `false` if
 * there are any that don't.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
 *         otherwise.
 * @see R.any, R.none, R.transduce
 * @example
 *
 *      var equals3 = R.equals(3);
 *      R.all(equals3)([3, 3, 3, 3]); //=> true
 *      R.all(equals3)([3, 3, 1, 3]); //=> false
 */


var all = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['all'], _xall, function all(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (!fn(list[idx])) {
      return false;
    }
    idx += 1;
  }
  return true;
}));
module.exports = all;
},{"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_xall":143}],8:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

var max = /*#__PURE__*/require('./max');

var pluck = /*#__PURE__*/require('./pluck');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.anyPass
 * @example
 *
 *      var isQueen = R.propEq('rank', 'Q');
 *      var isSpade = R.propEq('suit', '♠︎');
 *      var isQueenOfSpades = R.allPass([isQueen, isSpade]);
 *
 *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
 *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
 */


var allPass = /*#__PURE__*/_curry1(function allPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function () {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (!preds[idx].apply(this, arguments)) {
        return false;
      }
      idx += 1;
    }
    return true;
  });
});
module.exports = allPass;
},{"./curryN":42,"./internal/_curry1":105,"./max":194,"./pluck":239,"./reduce":250}],9:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 *
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> (* -> a)
 * @param {*} val The value to wrap in a function
 * @return {Function} A Function :: * -> val.
 * @example
 *
 *      var t = R.always('Tee');
 *      t(); //=> 'Tee'
 */


var always = /*#__PURE__*/_curry1(function always(val) {
  return function () {
    return val;
  };
});
module.exports = always;
},{"./internal/_curry1":105}],10:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if both arguments are `true`; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if it is falsy, otherwise the second argument.
 * @see R.both
 * @example
 *
 *      R.and(true, true); //=> true
 *      R.and(true, false); //=> false
 *      R.and(false, true); //=> false
 *      R.and(false, false); //=> false
 */


var and = /*#__PURE__*/_curry2(function and(a, b) {
  return a && b;
});
module.exports = and;
},{"./internal/_curry2":106}],11:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xany = /*#__PURE__*/require('./internal/_xany');

/**
 * Returns `true` if at least one of elements of the list match the predicate,
 * `false` otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
 *         otherwise.
 * @see R.all, R.none, R.transduce
 * @example
 *
 *      var lessThan0 = R.flip(R.lt)(0);
 *      var lessThan2 = R.flip(R.lt)(2);
 *      R.any(lessThan0)([1, 2]); //=> false
 *      R.any(lessThan2)([1, 2]); //=> true
 */


var any = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['any'], _xany, function any(fn, list) {
  var idx = 0;
  while (idx < list.length) {
    if (fn(list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}));
module.exports = any;
},{"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_xany":144}],12:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

var max = /*#__PURE__*/require('./max');

var pluck = /*#__PURE__*/require('./pluck');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if at least one of the provided predicates is
 * satisfied by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.allPass
 * @example
 *
 *      var isClub = R.propEq('suit', '♣');
 *      var isSpade = R.propEq('suit', '♠');
 *      var isBlackCard = R.anyPass([isClub, isSpade]);
 *
 *      isBlackCard({rank: '10', suit: '♣'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♠'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♦'}); //=> false
 */


var anyPass = /*#__PURE__*/_curry1(function anyPass(preds) {
  return curryN(reduce(max, 0, pluck('length', preds)), function () {
    var idx = 0;
    var len = preds.length;
    while (idx < len) {
      if (preds[idx].apply(this, arguments)) {
        return true;
      }
      idx += 1;
    }
    return false;
  });
});
module.exports = anyPass;
},{"./curryN":42,"./internal/_curry1":105,"./max":194,"./pluck":239,"./reduce":250}],13:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var map = /*#__PURE__*/require('./map');

/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @sig (a -> b -> c) -> (a -> b) -> (a -> c)
 * @param {*} applyF
 * @param {*} applyX
 * @return {*}
 * @example
 *
 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
 *
 *      // R.ap can also be used as S combinator
 *      // when only two functions are passed
 *      R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'
 * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
 */


var ap = /*#__PURE__*/_curry2(function ap(applyF, applyX) {
  return typeof applyX['fantasy-land/ap'] === 'function' ? applyX['fantasy-land/ap'](applyF) : typeof applyF.ap === 'function' ? applyF.ap(applyX) : typeof applyF === 'function' ? function (x) {
    return applyF(x)(applyX(x));
  } :
  // else
  _reduce(function (acc, f) {
    return _concat(acc, map(f, applyX));
  }, [], applyF);
});
module.exports = ap;
},{"./internal/_concat":101,"./internal/_curry2":106,"./internal/_reduce":138,"./map":188}],14:[function(require,module,exports){
var _aperture = /*#__PURE__*/require('./internal/_aperture');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xaperture = /*#__PURE__*/require('./internal/_xaperture');

/**
 * Returns a new list, composed of n-tuples of consecutive elements. If `n` is
 * greater than the length of the list, an empty list is returned.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @param {Number} n The size of the tuples to create
 * @param {Array} list The list to split into `n`-length tuples
 * @return {Array} The resulting list of `n`-length tuples
 * @see R.transduce
 * @example
 *
 *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
 *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
 */


var aperture = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xaperture, _aperture));
module.exports = aperture;
},{"./internal/_aperture":93,"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_xaperture":145}],15:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The element to add to the end of the new list.
 * @param {Array} list The list of elements to add a new item to.
 *        list.
 * @return {Array} A new list containing the elements of the old list followed by `el`.
 * @see R.prepend
 * @example
 *
 *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      R.append('tests', []); //=> ['tests']
 *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */


var append = /*#__PURE__*/_curry2(function append(el, list) {
  return _concat(list, [el]);
});
module.exports = append;
},{"./internal/_concat":101,"./internal/_curry2":106}],16:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should be a
 * bound function if context is significant.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> a) -> [*] -> a
 * @param {Function} fn The function which will be called with `args`
 * @param {Array} args The arguments to call `fn` with
 * @return {*} result The result, equivalent to `fn(...args)`
 * @see R.call, R.unapply
 * @example
 *
 *      var nums = [1, 2, 3, -99, 42, 6, 7];
 *      R.apply(Math.max, nums); //=> 42
 * @symb R.apply(f, [a, b, c]) = f(a, b, c)
 */


var apply = /*#__PURE__*/_curry2(function apply(fn, args) {
  return fn.apply(this, args);
});
module.exports = apply;
},{"./internal/_curry2":106}],17:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var apply = /*#__PURE__*/require('./apply');

var curryN = /*#__PURE__*/require('./curryN');

var map = /*#__PURE__*/require('./map');

var max = /*#__PURE__*/require('./max');

var pluck = /*#__PURE__*/require('./pluck');

var reduce = /*#__PURE__*/require('./reduce');

var values = /*#__PURE__*/require('./values');

/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
 * @param {Object} spec an object recursively mapping properties to functions for
 *        producing the values for these properties.
 * @return {Function} A function that returns an object of the same structure
 * as `spec', with each property set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.converge, R.juxt
 * @example
 *
 *      var getMetrics = R.applySpec({
 *        sum: R.add,
 *        nested: { mul: R.multiply }
 *      });
 *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
 * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }
 */


var applySpec = /*#__PURE__*/_curry1(function applySpec(spec) {
  spec = map(function (v) {
    return typeof v == 'function' ? v : applySpec(v);
  }, spec);
  return curryN(reduce(max, 0, pluck('length', values(spec))), function () {
    var args = arguments;
    return map(function (f) {
      return apply(f, args);
    }, spec);
  });
});
module.exports = applySpec;
},{"./apply":16,"./curryN":42,"./internal/_curry1":105,"./map":188,"./max":194,"./pluck":239,"./reduce":250,"./values":309}],18:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
* Takes a value and applies a function to it.
*
* This function is also known as the `thrush` combinator.
*
* @func
* @memberOf R
 * @since v0.25.0
* @category Function
* @sig a -> (a -> b) -> b
* @param {*} x The value
* @param {Function} f The function to apply
* @return {*} The result of applying `f` to `x`
* @example
*
*      var t42 = R.applyTo(42);
*      t42(R.identity); //=> 42
*      t42(R.add(1)); //=> 43
*/


var applyTo = /*#__PURE__*/_curry2(function applyTo(x, f) {
  return f(x);
});
module.exports = applyTo;
},{"./internal/_curry2":106}],19:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Makes an ascending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) < fn(b), `1` if fn(b) < fn(a), otherwise `0`
 * @see R.descend
 * @example
 *
 *      var byAge = R.ascend(R.prop('age'));
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByYoungestFirst = R.sort(byAge, people);
 */


var ascend = /*#__PURE__*/_curry3(function ascend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});
module.exports = ascend;
},{"./internal/_curry3":107}],20:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {String} prop The property name to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except for the changed property.
 * @see R.dissoc
 * @example
 *
 *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */


var assoc = /*#__PURE__*/_curry3(function assoc(prop, val, obj) {
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  result[prop] = val;
  return result;
});
module.exports = assoc;
},{"./internal/_curry3":107}],21:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _has = /*#__PURE__*/require('./internal/_has');

var _isArray = /*#__PURE__*/require('./internal/_isArray');

var _isInteger = /*#__PURE__*/require('./internal/_isInteger');

var assoc = /*#__PURE__*/require('./assoc');

var isNil = /*#__PURE__*/require('./isNil');

/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> {a}
 * @param {Array} path the path to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except along the specified path.
 * @see R.dissocPath
 * @example
 *
 *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 *      // Any missing or non-object keys in path will be overridden
 *      R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 */


var assocPath = /*#__PURE__*/_curry3(function assocPath(path, val, obj) {
  if (path.length === 0) {
    return val;
  }
  var idx = path[0];
  if (path.length > 1) {
    var nextObj = !isNil(obj) && _has(idx, obj) ? obj[idx] : _isInteger(path[1]) ? [] : {};
    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
  }
  if (_isInteger(idx) && _isArray(obj)) {
    var arr = [].concat(obj);
    arr[idx] = val;
    return arr;
  } else {
    return assoc(idx, val, obj);
  }
});
module.exports = assocPath;
},{"./assoc":20,"./internal/_curry3":107,"./internal/_has":117,"./internal/_isArray":121,"./internal/_isInteger":124,"./isNil":172}],22:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var nAry = /*#__PURE__*/require('./nAry');

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 2 parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> c) -> (a, b -> c)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 2.
 * @see R.nAry, R.unary
 * @example
 *
 *      var takesThreeArgs = function(a, b, c) {
 *        return [a, b, c];
 *      };
 *      takesThreeArgs.length; //=> 3
 *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
 *
 *      var takesTwoArgs = R.binary(takesThreeArgs);
 *      takesTwoArgs.length; //=> 2
 *      // Only 2 arguments are passed to the wrapped function
 *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
 * @symb R.binary(f)(a, b, c) = f(a, b)
 */


var binary = /*#__PURE__*/_curry1(function binary(fn) {
  return nAry(2, fn);
});
module.exports = binary;
},{"./internal/_curry1":105,"./nAry":212}],23:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      var log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */


var bind = /*#__PURE__*/_curry2(function bind(fn, thisObj) {
  return _arity(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});
module.exports = bind;
},{"./internal/_arity":94,"./internal/_curry2":106}],24:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isFunction = /*#__PURE__*/require('./internal/_isFunction');

var and = /*#__PURE__*/require('./and');

var lift = /*#__PURE__*/require('./lift');

/**
 * A function which calls the two provided functions and returns the `&&`
 * of the results.
 * It returns the result of the first function if it is false-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * false-y value.
 *
 * In addition to functions, `R.both` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f A predicate
 * @param {Function} g Another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
 * @see R.and
 * @example
 *
 *      var gt10 = R.gt(R.__, 10)
 *      var lt20 = R.lt(R.__, 20)
 *      var f = R.both(gt10, lt20);
 *      f(15); //=> true
 *      f(30); //=> false
 */


var both = /*#__PURE__*/_curry2(function both(f, g) {
  return _isFunction(f) ? function _both() {
    return f.apply(this, arguments) && g.apply(this, arguments);
  } : lift(and)(f, g);
});
module.exports = both;
},{"./and":10,"./internal/_curry2":106,"./internal/_isFunction":123,"./lift":184}],25:[function(require,module,exports){
var curry = /*#__PURE__*/require('./curry');

/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * [`R.converge`](#converge): the first branch can produce a function while the
 * remaining branches produce values to be passed to that function as its
 * arguments.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig (*... -> a),*... -> a
 * @param {Function} fn The function to apply to the remaining arguments.
 * @param {...*} args Any number of positional arguments.
 * @return {*}
 * @see R.apply
 * @example
 *
 *      R.call(R.add, 1, 2); //=> 3
 *
 *      var indentN = R.pipe(R.repeat(' '),
 *                           R.join(''),
 *                           R.replace(/^(?!$)/gm));
 *
 *      var format = R.converge(R.call, [
 *                                  R.pipe(R.prop('indent'), indentN),
 *                                  R.prop('value')
 *                              ]);
 *
 *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
 * @symb R.call(f, a, b) = f(a, b)
 */


var call = /*#__PURE__*/curry(function call(fn) {
  return fn.apply(this, Array.prototype.slice.call(arguments, 1));
});
module.exports = call;
},{"./curry":41}],26:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _makeFlat = /*#__PURE__*/require('./internal/_makeFlat');

var _xchain = /*#__PURE__*/require('./internal/_xchain');

var map = /*#__PURE__*/require('./map');

/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain m => (a -> m b) -> m a -> m b
 * @param {Function} fn The function to map with
 * @param {Array} list The list to map over
 * @return {Array} The result of flat-mapping `list` with `fn`
 * @example
 *
 *      var duplicate = n => [n, n];
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 *
 *      R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
 */


var chain = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['fantasy-land/chain', 'chain'], _xchain, function chain(fn, monad) {
  if (typeof monad === 'function') {
    return function (x) {
      return fn(monad(x))(x);
    };
  }
  return _makeFlat(false)(map(fn, monad));
}));
module.exports = chain;
},{"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_makeFlat":131,"./internal/_xchain":146,"./map":188}],27:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Restricts a number to be within a range.
 *
 * Also works for other ordered types such as Strings and Dates.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Relation
 * @sig Ord a => a -> a -> a -> a
 * @param {Number} minimum The lower limit of the clamp (inclusive)
 * @param {Number} maximum The upper limit of the clamp (inclusive)
 * @param {Number} value Value to be clamped
 * @return {Number} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise
 * @example
 *
 *      R.clamp(1, 10, -5) // => 1
 *      R.clamp(1, 10, 15) // => 10
 *      R.clamp(1, 10, 4)  // => 4
 */


var clamp = /*#__PURE__*/_curry3(function clamp(min, max, value) {
  if (min > max) {
    throw new Error('min must not be greater than max in clamp(min, max, value)');
  }
  return value < min ? min : value > max ? max : value;
});
module.exports = clamp;
},{"./internal/_curry3":107}],28:[function(require,module,exports){
var _clone = /*#__PURE__*/require('./internal/_clone');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Creates a deep copy of the value which may contain (nested) `Array`s and
 * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
 * assigned by reference rather than copied
 *
 * Dispatches to a `clone` method if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {*} -> {*}
 * @param {*} value The object or array to clone
 * @return {*} A deeply cloned copy of `val`
 * @example
 *
 *      var objects = [{}, {}, {}];
 *      var objectsClone = R.clone(objects);
 *      objects === objectsClone; //=> false
 *      objects[0] === objectsClone[0]; //=> false
 */


var clone = /*#__PURE__*/_curry1(function clone(value) {
  return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, [], [], true);
});
module.exports = clone;
},{"./internal/_clone":98,"./internal/_curry1":105}],29:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Makes a comparator function out of a function that reports whether the first
 * element is less than the second.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b) -> Boolean) -> ((a, b) -> Number)
 * @param {Function} pred A predicate function of arity two which will return `true` if the first argument
 * is less than the second, `false` otherwise
 * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`
 * @example
 *
 *      var byAge = R.comparator((a, b) => a.age < b.age);
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByIncreasingAge = R.sort(byAge, people);
 */


var comparator = /*#__PURE__*/_curry1(function comparator(pred) {
  return function (a, b) {
    return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
  };
});
module.exports = comparator;
},{"./internal/_curry1":105}],30:[function(require,module,exports){
var lift = /*#__PURE__*/require('./lift');

var not = /*#__PURE__*/require('./not');

/**
 * Takes a function `f` and returns a function `g` such that if called with the same arguments
 * when `f` returns a "truthy" value, `g` returns `false` and when `f` returns a "falsy" value `g` returns `true`.
 *
 * `R.complement` may be applied to any functor
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> *) -> (*... -> Boolean)
 * @param {Function} f
 * @return {Function}
 * @see R.not
 * @example
 *
 *      var isNotNil = R.complement(R.isNil);
 *      isNil(null); //=> true
 *      isNotNil(null); //=> false
 *      isNil(7); //=> false
 *      isNotNil(7); //=> true
 */


var complement = /*#__PURE__*/lift(not);
module.exports = complement;
},{"./lift":184,"./not":215}],31:[function(require,module,exports){
var pipe = /*#__PURE__*/require('./pipe');

var reverse = /*#__PURE__*/require('./reverse');

/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      var yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */


function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }
  return pipe.apply(this, reverse(arguments));
}
module.exports = compose;
},{"./pipe":236,"./reverse":259}],32:[function(require,module,exports){
var chain = /*#__PURE__*/require('./chain');

var compose = /*#__PURE__*/require('./compose');

var map = /*#__PURE__*/require('./map');

/**
 * Returns the right-to-left Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.composeK(h, g, f)` is equivalent to `R.compose(R.chain(h), R.chain(g), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((y -> m z), (x -> m y), ..., (a -> m b)) -> (a -> m z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipeK
 * @example
 *
 *       //  get :: String -> Object -> Maybe *
 *       var get = R.curry((propName, obj) => Maybe(obj[propName]))
 *
 *       //  getStateCode :: Maybe String -> Maybe String
 *       var getStateCode = R.composeK(
 *         R.compose(Maybe.of, R.toUpper),
 *         get('state'),
 *         get('address'),
 *         get('user'),
 *       );
 *       getStateCode({"user":{"address":{"state":"ny"}}}); //=> Maybe.Just("NY")
 *       getStateCode({}); //=> Maybe.Nothing()
 * @symb R.composeK(f, g, h)(a) = R.chain(f, R.chain(g, h(a)))
 */


function composeK() {
  if (arguments.length === 0) {
    throw new Error('composeK requires at least one argument');
  }
  var init = Array.prototype.slice.call(arguments);
  var last = init.pop();
  return compose(compose.apply(this, map(chain, init)), last);
}
module.exports = composeK;
},{"./chain":26,"./compose":31,"./map":188}],33:[function(require,module,exports){
var pipeP = /*#__PURE__*/require('./pipeP');

var reverse = /*#__PURE__*/require('./reverse');

/**
 * Performs right-to-left composition of one or more Promise-returning
 * functions. The rightmost function may have any arity; the remaining
 * functions must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)
 * @param {...Function} functions The functions to compose
 * @return {Function}
 * @see R.pipeP
 * @example
 *
 *      var db = {
 *        users: {
 *          JOE: {
 *            name: 'Joe',
 *            followers: ['STEVE', 'SUZY']
 *          }
 *        }
 *      }
 *
 *      // We'll pretend to do a db lookup which returns a promise
 *      var lookupUser = (userId) => Promise.resolve(db.users[userId])
 *      var lookupFollowers = (user) => Promise.resolve(user.followers)
 *      lookupUser('JOE').then(lookupFollowers)
 *
 *      //  followersForUser :: String -> Promise [UserId]
 *      var followersForUser = R.composeP(lookupFollowers, lookupUser);
 *      followersForUser('JOE').then(followers => console.log('Followers:', followers))
 *      // Followers: ["STEVE","SUZY"]
 */


function composeP() {
  if (arguments.length === 0) {
    throw new Error('composeP requires at least one argument');
  }
  return pipeP.apply(this, reverse(arguments));
}
module.exports = composeP;
},{"./pipeP":238,"./reverse":259}],34:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isArray = /*#__PURE__*/require('./internal/_isArray');

var _isFunction = /*#__PURE__*/require('./internal/_isFunction');

var _isString = /*#__PURE__*/require('./internal/_isString');

var toString = /*#__PURE__*/require('./toString');

/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 * Can also concatenate two members of a [fantasy-land
 * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} firstList The first list
 * @param {Array|String} secondList The second list
 * @return {Array|String} A list consisting of the elements of `firstList` followed by the elements of
 * `secondList`.
 *
 * @example
 *
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat([], []); //=> []
 */


var concat = /*#__PURE__*/_curry2(function concat(a, b) {
  if (_isArray(a)) {
    if (_isArray(b)) {
      return a.concat(b);
    }
    throw new TypeError(toString(b) + ' is not an array');
  }
  if (_isString(a)) {
    if (_isString(b)) {
      return a + b;
    }
    throw new TypeError(toString(b) + ' is not a string');
  }
  if (a != null && _isFunction(a['fantasy-land/concat'])) {
    return a['fantasy-land/concat'](b);
  }
  if (a != null && _isFunction(a.concat)) {
    return a.concat(b);
  }
  throw new TypeError(toString(a) + ' does not have a method named "concat" or "fantasy-land/concat"');
});
module.exports = concat;
},{"./internal/_curry2":106,"./internal/_isArray":121,"./internal/_isFunction":123,"./internal/_isString":129,"./toString":287}],35:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var map = /*#__PURE__*/require('./map');

var max = /*#__PURE__*/require('./max');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
 * to `fn` are applied to each of the predicates in turn until one returns a
 * "truthy" value, at which point `fn` returns the result of applying its
 * arguments to the corresponding transformer. If none of the predicates
 * matches, `fn` returns undefined.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Logic
 * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
 * @param {Array} pairs A list of [predicate, transformer]
 * @return {Function}
 * @example
 *
 *      var fn = R.cond([
 *        [R.equals(0),   R.always('water freezes at 0°C')],
 *        [R.equals(100), R.always('water boils at 100°C')],
 *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
 *      ]);
 *      fn(0); //=> 'water freezes at 0°C'
 *      fn(50); //=> 'nothing special happens at 50°C'
 *      fn(100); //=> 'water boils at 100°C'
 */


var cond = /*#__PURE__*/_curry1(function cond(pairs) {
  var arity = reduce(max, 0, map(function (pair) {
    return pair[0].length;
  }, pairs));
  return _arity(arity, function () {
    var idx = 0;
    while (idx < pairs.length) {
      if (pairs[idx][0].apply(this, arguments)) {
        return pairs[idx][1].apply(this, arguments);
      }
      idx += 1;
    }
  });
});
module.exports = cond;
},{"./internal/_arity":94,"./internal/_curry1":105,"./map":188,"./max":194,"./reduce":250}],36:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var constructN = /*#__PURE__*/require('./constructN');

/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> {*}) -> (* -> {*})
 * @param {Function} fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @see R.invoker
 * @example
 *
 *      // Constructor function
 *      function Animal(kind) {
 *        this.kind = kind;
 *      };
 *      Animal.prototype.sighting = function() {
 *        return "It's a " + this.kind + "!";
 *      }
 *
 *      var AnimalConstructor = R.construct(Animal)
 *
 *      // Notice we no longer need the 'new' keyword:
 *      AnimalConstructor('Pig'); //=> {"kind": "Pig", "sighting": function (){...}};
 *
 *      var animalTypes = ["Lion", "Tiger", "Bear"];
 *      var animalSighting = R.invoker(0, 'sighting');
 *      var sightNewAnimal = R.compose(animalSighting, AnimalConstructor);
 *      R.map(sightNewAnimal, animalTypes); //=> ["It's a Lion!", "It's a Tiger!", "It's a Bear!"]
 */


var construct = /*#__PURE__*/_curry1(function construct(Fn) {
  return constructN(Fn.length, Fn);
});
module.exports = construct;
},{"./constructN":37,"./internal/_curry1":105}],37:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var curry = /*#__PURE__*/require('./curry');

var nAry = /*#__PURE__*/require('./nAry');

/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type. The arity of the function
 * returned is specified to allow using variadic constructor functions.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Function
 * @sig Number -> (* -> {*}) -> (* -> {*})
 * @param {Number} n The arity of the constructor function.
 * @param {Function} Fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @example
 *
 *      // Variadic Constructor function
 *      function Salad() {
 *        this.ingredients = arguments;
 *      }
 *
 *      Salad.prototype.recipe = function() {
 *        var instructions = R.map(ingredient => 'Add a dollop of ' + ingredient, this.ingredients);
 *        return R.join('\n', instructions);
 *      };
 *
 *      var ThreeLayerSalad = R.constructN(3, Salad);
 *
 *      // Notice we no longer need the 'new' keyword, and the constructor is curried for 3 arguments.
 *      var salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup');
 *
 *      console.log(salad.recipe());
 *      // Add a dollop of Mayonnaise
 *      // Add a dollop of Potato Chips
 *      // Add a dollop of Ketchup
 */


var constructN = /*#__PURE__*/_curry2(function constructN(n, Fn) {
  if (n > 10) {
    throw new Error('Constructor with greater than ten arguments');
  }
  if (n === 0) {
    return function () {
      return new Fn();
    };
  }
  return curry(nAry(n, function ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
    switch (arguments.length) {
      case 1:
        return new Fn($0);
      case 2:
        return new Fn($0, $1);
      case 3:
        return new Fn($0, $1, $2);
      case 4:
        return new Fn($0, $1, $2, $3);
      case 5:
        return new Fn($0, $1, $2, $3, $4);
      case 6:
        return new Fn($0, $1, $2, $3, $4, $5);
      case 7:
        return new Fn($0, $1, $2, $3, $4, $5, $6);
      case 8:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7);
      case 9:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);
      case 10:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
    }
  }));
});
module.exports = constructN;
},{"./curry":41,"./internal/_curry2":106,"./nAry":212}],38:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./internal/_contains');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @see R.any
 * @example
 *
 *      R.contains(3, [1, 2, 3]); //=> true
 *      R.contains(4, [1, 2, 3]); //=> false
 *      R.contains({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 *      R.contains([42], [[42]]); //=> true
 */


var contains = /*#__PURE__*/_curry2(_contains);
module.exports = contains;
},{"./internal/_contains":102,"./internal/_curry2":106}],39:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _map = /*#__PURE__*/require('./internal/_map');

var curryN = /*#__PURE__*/require('./curryN');

var max = /*#__PURE__*/require('./max');

var pluck = /*#__PURE__*/require('./pluck');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. When invoked, this new function is applied to some
 * arguments, each branching function is applied to those same arguments. The
 * results of each branching function are passed as arguments to the converging
 * function to produce the return value.
 *
 * @func
 * @memberOf R
 * @since v0.4.2
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [((a, b, ...) -> x1), ((a, b, ...) -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} after A function. `after` will be invoked with the return values of
 *        `fn1` and `fn2` as its arguments.
 * @param {Array} functions A list of functions.
 * @return {Function} A new function.
 * @see R.useWith
 * @example
 *
 *      var average = R.converge(R.divide, [R.sum, R.length])
 *      average([1, 2, 3, 4, 5, 6, 7]) //=> 4
 *
 *      var strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 *      strangeConcat("Yodel") //=> "YODELyodel"
 *
 * @symb R.converge(f, [g, h])(a, b) = f(g(a, b), h(a, b))
 */


var converge = /*#__PURE__*/_curry2(function converge(after, fns) {
  return curryN(reduce(max, 0, pluck('length', fns)), function () {
    var args = arguments;
    var context = this;
    return after.apply(context, _map(function (fn) {
      return fn.apply(context, args);
    }, fns));
  });
});
module.exports = converge;
},{"./curryN":42,"./internal/_curry2":106,"./internal/_map":132,"./max":194,"./pluck":239,"./reduce":250}],40:[function(require,module,exports){
var reduceBy = /*#__PURE__*/require('./reduceBy');

/**
 * Counts the elements of a list according to how many match each value of a
 * key generated by the supplied function. Returns an object mapping the keys
 * produced by `fn` to the number of occurrences in the list. Note that all
 * keys are coerced to strings because of how JavaScript objects work.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig (a -> String) -> [a] -> {*}
 * @param {Function} fn The function used to map values to keys.
 * @param {Array} list The list to count elements from.
 * @return {Object} An object mapping keys to number of occurrences in the list.
 * @example
 *
 *      var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
 *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
 *
 *      var letters = ['a', 'b', 'A', 'a', 'B', 'c'];
 *      R.countBy(R.toLower)(letters);   //=> {'a': 3, 'b': 2, 'c': 1}
 */


var countBy = /*#__PURE__*/reduceBy(function (acc, elem) {
  return acc + 1;
}, 0);
module.exports = countBy;
},{"./reduceBy":251}],41:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN
 * @example
 *
 *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      var curriedAddFourNumbers = R.curry(addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */


var curry = /*#__PURE__*/_curry1(function curry(fn) {
  return curryN(fn.length, fn);
});
module.exports = curry;
},{"./curryN":42,"./internal/_curry1":105}],42:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _curryN = /*#__PURE__*/require('./internal/_curryN');

/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */


var curryN = /*#__PURE__*/_curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }
  return _arity(length, _curryN(length, [], fn));
});
module.exports = curryN;
},{"./internal/_arity":94,"./internal/_curry1":105,"./internal/_curry2":106,"./internal/_curryN":108}],43:[function(require,module,exports){
var add = /*#__PURE__*/require('./add');

/**
 * Decrements its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n - 1
 * @see R.inc
 * @example
 *
 *      R.dec(42); //=> 41
 */


var dec = /*#__PURE__*/add(-1);
module.exports = dec;
},{"./add":4}],44:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`;
 * otherwise the first argument is returned.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {a} default The default value.
 * @param {b} val `val` will be returned instead of `default` unless `val` is `null`, `undefined` or `NaN`.
 * @return {*} The second value if it is not `null`, `undefined` or `NaN`, otherwise the default value
 * @example
 *
 *      var defaultTo42 = R.defaultTo(42);
 *
 *      defaultTo42(null);  //=> 42
 *      defaultTo42(undefined);  //=> 42
 *      defaultTo42('Ramda');  //=> 'Ramda'
 *      // parseInt('string') results in NaN
 *      defaultTo42(parseInt('string')); //=> 42
 */


var defaultTo = /*#__PURE__*/_curry2(function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
});
module.exports = defaultTo;
},{"./internal/_curry2":106}],45:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Makes a descending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) > fn(b), `1` if fn(b) > fn(a), otherwise `0`
 * @see R.ascend
 * @example
 *
 *      var byAge = R.descend(R.prop('age'));
 *      var people = [
 *        // ...
 *      ];
 *      var peopleByOldestFirst = R.sort(byAge, people);
 */


var descend = /*#__PURE__*/_curry3(function descend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa > bb ? -1 : aa < bb ? 1 : 0;
});
module.exports = descend;
},{"./internal/_curry3":107}],46:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./internal/_contains');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared in terms of
 * value equality, not reference equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.differenceWith, R.symmetricDifference, R.symmetricDifferenceWith, R.without
 * @example
 *
 *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 *      R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
 */


var difference = /*#__PURE__*/_curry2(function difference(first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  while (idx < firstLen) {
    if (!_contains(first[idx], second) && !_contains(first[idx], out)) {
      out[out.length] = first[idx];
    }
    idx += 1;
  }
  return out;
});
module.exports = difference;
},{"./internal/_contains":102,"./internal/_curry2":106}],47:[function(require,module,exports){
var _containsWith = /*#__PURE__*/require('./internal/_containsWith');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.difference, R.symmetricDifference, R.symmetricDifferenceWith
 * @example
 *
 *      var cmp = (x, y) => x.a === y.a;
 *      var l1 = [{a: 1}, {a: 2}, {a: 3}];
 *      var l2 = [{a: 3}, {a: 4}];
 *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
 */


var differenceWith = /*#__PURE__*/_curry3(function differenceWith(pred, first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  while (idx < firstLen) {
    if (!_containsWith(pred, first[idx], second) && !_containsWith(pred, first[idx], out)) {
      out.push(first[idx]);
    }
    idx += 1;
  }
  return out;
});
module.exports = differenceWith;
},{"./internal/_containsWith":103,"./internal/_curry3":107}],48:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a new object that does not contain a `prop` property.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Object
 * @sig String -> {k: v} -> {k: v}
 * @param {String} prop The name of the property to dissociate
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original but without the specified property
 * @see R.assoc
 * @example
 *
 *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 */


var dissoc = /*#__PURE__*/_curry2(function dissoc(prop, obj) {
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  delete result[prop];
  return result;
});
module.exports = dissoc;
},{"./internal/_curry2":106}],49:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isInteger = /*#__PURE__*/require('./internal/_isInteger');

var assoc = /*#__PURE__*/require('./assoc');

var dissoc = /*#__PURE__*/require('./dissoc');

var remove = /*#__PURE__*/require('./remove');

var update = /*#__PURE__*/require('./update');

/**
 * Makes a shallow clone of an object, omitting the property at the given path.
 * Note that this copies and flattens prototype properties onto the new object
 * as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.11.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {Array} path The path to the value to omit
 * @param {Object} obj The object to clone
 * @return {Object} A new object without the property at path
 * @see R.assocPath
 * @example
 *
 *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
 */


var dissocPath = /*#__PURE__*/_curry2(function dissocPath(path, obj) {
  switch (path.length) {
    case 0:
      return obj;
    case 1:
      return _isInteger(path[0]) ? remove(path[0], 1, obj) : dissoc(path[0], obj);
    default:
      var head = path[0];
      var tail = Array.prototype.slice.call(path, 1);
      if (obj[head] == null) {
        return obj;
      } else if (_isInteger(path[0])) {
        return update(head, dissocPath(tail, obj[head]), obj);
      } else {
        return assoc(head, dissocPath(tail, obj[head]), obj);
      }
  }
});
module.exports = dissocPath;
},{"./assoc":20,"./dissoc":48,"./internal/_curry2":106,"./internal/_isInteger":124,"./remove":256,"./update":307}],50:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Divides two numbers. Equivalent to `a / b`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a / b`.
 * @see R.multiply
 * @example
 *
 *      R.divide(71, 100); //=> 0.71
 *
 *      var half = R.divide(R.__, 2);
 *      half(42); //=> 21
 *
 *      var reciprocal = R.divide(1);
 *      reciprocal(4);   //=> 0.25
 */


var divide = /*#__PURE__*/_curry2(function divide(a, b) {
  return a / b;
});
module.exports = divide;
},{"./internal/_curry2":106}],51:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xdrop = /*#__PURE__*/require('./internal/_xdrop');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 *
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*} A copy of list without the first `n` elements
 * @see R.take, R.transduce, R.dropLast, R.dropWhile
 * @example
 *
 *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(3, 'ramda');               //=> 'da'
 */


var drop = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['drop'], _xdrop, function drop(n, xs) {
  return slice(Math.max(0, n), Infinity, xs);
}));
module.exports = drop;
},{"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_xdrop":147,"./slice":263}],52:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _dropLast = /*#__PURE__*/require('./internal/_dropLast');

var _xdropLast = /*#__PURE__*/require('./internal/_xdropLast');

/**
 * Returns a list containing all but the last `n` elements of the given `list`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements of `list` to skip.
 * @param {Array} list The list of elements to consider.
 * @return {Array} A copy of the list with only the first `list.length - n` elements
 * @see R.takeLast, R.drop, R.dropWhile, R.dropLastWhile
 * @example
 *
 *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(3, 'ramda');               //=> 'ra'
 */


var dropLast = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xdropLast, _dropLast));
module.exports = dropLast;
},{"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_dropLast":110,"./internal/_xdropLast":148}],53:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _dropLastWhile = /*#__PURE__*/require('./internal/_dropLastWhile');

var _xdropLastWhile = /*#__PURE__*/require('./internal/_xdropLastWhile');

/**
 * Returns a new list excluding all the tailing elements of a given list which
 * satisfy the supplied predicate function. It passes each value from the right
 * to the supplied predicate function, skipping elements until the predicate
 * function returns a `falsy` value. The predicate function is applied to one argument:
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} predicate The function to be called on each element
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array without any trailing elements that return `falsy` values from the `predicate`.
 * @see R.takeLastWhile, R.addIndex, R.drop, R.dropWhile
 * @example
 *
 *      var lteThree = x => x <= 3;
 *
 *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
 *
 *      R.dropLastWhile(x => x !== 'd' , 'Ramda'); //=> 'Ramd'
 */


var dropLastWhile = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xdropLastWhile, _dropLastWhile));
module.exports = dropLastWhile;
},{"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_dropLastWhile":111,"./internal/_xdropLastWhile":149}],54:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xdropRepeatsWith = /*#__PURE__*/require('./internal/_xdropRepeatsWith');

var dropRepeatsWith = /*#__PURE__*/require('./dropRepeatsWith');

var equals = /*#__PURE__*/require('./equals');

/**
 * Returns a new list without any consecutively repeating elements.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
 */


var dropRepeats = /*#__PURE__*/_curry1( /*#__PURE__*/_dispatchable([], /*#__PURE__*/_xdropRepeatsWith(equals), /*#__PURE__*/dropRepeatsWith(equals)));
module.exports = dropRepeats;
},{"./dropRepeatsWith":55,"./equals":62,"./internal/_curry1":105,"./internal/_dispatchable":109,"./internal/_xdropRepeatsWith":150}],55:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xdropRepeatsWith = /*#__PURE__*/require('./internal/_xdropRepeatsWith');

var last = /*#__PURE__*/require('./last');

/**
 * Returns a new list without any consecutively repeating elements. Equality is
 * determined by applying the supplied predicate to each pair of consecutive elements. The
 * first element in a series of equal elements will be preserved.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *      var l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
 *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
 */


var dropRepeatsWith = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xdropRepeatsWith, function dropRepeatsWith(pred, list) {
  var result = [];
  var idx = 1;
  var len = list.length;
  if (len !== 0) {
    result[0] = list[0];
    while (idx < len) {
      if (!pred(last(result), list[idx])) {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
  }
  return result;
}));
module.exports = dropRepeatsWith;
},{"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_xdropRepeatsWith":150,"./last":177}],56:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xdropWhile = /*#__PURE__*/require('./internal/_xdropWhile');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns a new list excluding the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * `true`. The predicate function is applied to one argument: *(value)*.
 *
 * Dispatches to the `dropWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.takeWhile, R.transduce, R.addIndex
 * @example
 *
 *      var lteTwo = x => x <= 2;
 *
 *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
 *
 *      R.dropWhile(x => x !== 'd' , 'Ramda'); //=> 'da'
 */


var dropWhile = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['dropWhile'], _xdropWhile, function dropWhile(pred, xs) {
  var idx = 0;
  var len = xs.length;
  while (idx < len && pred(xs[idx])) {
    idx += 1;
  }
  return slice(idx, Infinity, xs);
}));
module.exports = dropWhile;
},{"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_xdropWhile":151,"./slice":263}],57:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isFunction = /*#__PURE__*/require('./internal/_isFunction');

var lift = /*#__PURE__*/require('./lift');

var or = /*#__PURE__*/require('./or');

/**
 * A function wrapping calls to the two functions in an `||` operation,
 * returning the result of the first function if it is truth-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * truth-y value.
 *
 * In addition to functions, `R.either` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f a predicate
 * @param {Function} g another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
 * @see R.or
 * @example
 *
 *      var gt10 = x => x > 10;
 *      var even = x => x % 2 === 0;
 *      var f = R.either(gt10, even);
 *      f(101); //=> true
 *      f(8); //=> true
 */


var either = /*#__PURE__*/_curry2(function either(f, g) {
  return _isFunction(f) ? function _either() {
    return f.apply(this, arguments) || g.apply(this, arguments);
  } : lift(or)(f, g);
});
module.exports = either;
},{"./internal/_curry2":106,"./internal/_isFunction":123,"./lift":184,"./or":223}],58:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _isArguments = /*#__PURE__*/require('./internal/_isArguments');

var _isArray = /*#__PURE__*/require('./internal/_isArray');

var _isObject = /*#__PURE__*/require('./internal/_isObject');

var _isString = /*#__PURE__*/require('./internal/_isString');

/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other
 * types are supported if they define `<Type>.empty`,
 * `<Type>.prototype.empty` or implement the
 * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
 *
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> a
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R.empty(Just(42));      //=> Nothing()
 *      R.empty([1, 2, 3]);     //=> []
 *      R.empty('unicorns');    //=> ''
 *      R.empty({x: 1, y: 2});  //=> {}
 */


var empty = /*#__PURE__*/_curry1(function empty(x) {
  return x != null && typeof x['fantasy-land/empty'] === 'function' ? x['fantasy-land/empty']() : x != null && x.constructor != null && typeof x.constructor['fantasy-land/empty'] === 'function' ? x.constructor['fantasy-land/empty']() : x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : _isArray(x) ? [] : _isString(x) ? '' : _isObject(x) ? {} : _isArguments(x) ? function () {
    return arguments;
  }() :
  // else
  void 0;
});
module.exports = empty;
},{"./internal/_curry1":105,"./internal/_isArguments":120,"./internal/_isArray":121,"./internal/_isObject":126,"./internal/_isString":129}],59:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var equals = /*#__PURE__*/require('./equals');

var takeLast = /*#__PURE__*/require('./takeLast');

/**
 * Checks if a list ends with the provided values
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> Boolean
 * @sig String -> Boolean
 * @param {*} suffix
 * @param {*} list
 * @return {Boolean}
 * @example
 *
 *      R.endsWith('c', 'abc')                //=> true
 *      R.endsWith('b', 'abc')                //=> false
 *      R.endsWith(['c'], ['a', 'b', 'c'])    //=> true
 *      R.endsWith(['b'], ['a', 'b', 'c'])    //=> false
 */


var endsWith = /*#__PURE__*/_curry2(function (suffix, list) {
  return equals(takeLast(suffix.length, list), suffix);
});
module.exports = endsWith;
},{"./equals":62,"./internal/_curry2":106,"./takeLast":278}],60:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var equals = /*#__PURE__*/require('./equals');

/**
 * Takes a function and two values in its domain and returns `true` if the
 * values map to the same value in the codomain; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Relation
 * @sig (a -> b) -> a -> a -> Boolean
 * @param {Function} f
 * @param {*} x
 * @param {*} y
 * @return {Boolean}
 * @example
 *
 *      R.eqBy(Math.abs, 5, -5); //=> true
 */


var eqBy = /*#__PURE__*/_curry3(function eqBy(f, x, y) {
  return equals(f(x), f(y));
});
module.exports = eqBy;
},{"./equals":62,"./internal/_curry3":107}],61:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var equals = /*#__PURE__*/require('./equals');

/**
 * Reports whether two objects have the same value, in [`R.equals`](#equals)
 * terms, for the specified property. Useful as a curried predicate.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig k -> {k: v} -> {k: v} -> Boolean
 * @param {String} prop The name of the property to compare
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {Boolean}
 *
 * @example
 *
 *      var o1 = { a: 1, b: 2, c: 3, d: 4 };
 *      var o2 = { a: 10, b: 20, c: 3, d: 40 };
 *      R.eqProps('a', o1, o2); //=> false
 *      R.eqProps('c', o1, o2); //=> true
 */


var eqProps = /*#__PURE__*/_curry3(function eqProps(prop, obj1, obj2) {
  return equals(obj1[prop], obj2[prop]);
});
module.exports = eqProps;
},{"./equals":62,"./internal/_curry3":107}],62:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _equals = /*#__PURE__*/require('./internal/_equals');

/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */


var equals = /*#__PURE__*/_curry2(function equals(a, b) {
  return _equals(a, b, [], []);
});
module.exports = equals;
},{"./internal/_curry2":106,"./internal/_equals":112}],63:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a new object by recursively evolving a shallow copy of `object`,
 * according to the `transformation` functions. All non-primitive properties
 * are copied by reference.
 *
 * A `transformation` function will not be invoked if its corresponding key
 * does not exist in the evolved object.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {k: (v -> v)} -> {k: v} -> {k: v}
 * @param {Object} transformations The object specifying transformation functions to apply
 *        to the object.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      var tomato  = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
 *      var transformations = {
 *        firstName: R.trim,
 *        lastName: R.trim, // Will not get invoked.
 *        data: {elapsed: R.add(1), remaining: R.add(-1)}
 *      };
 *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
 */


var evolve = /*#__PURE__*/_curry2(function evolve(transformations, object) {
  var result = {};
  var transformation, key, type;
  for (key in object) {
    transformation = transformations[key];
    type = typeof transformation;
    result[key] = type === 'function' ? transformation(object[key]) : transformation && type === 'object' ? evolve(transformation, object[key]) : object[key];
  }
  return result;
});
module.exports = evolve;
},{"./internal/_curry2":106}],64:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _filter = /*#__PURE__*/require('./internal/_filter');

var _isObject = /*#__PURE__*/require('./internal/_isObject');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _xfilter = /*#__PURE__*/require('./internal/_xfilter');

var keys = /*#__PURE__*/require('./keys');

/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */


var filter = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['filter'], _xfilter, function (pred, filterable) {
  return _isObject(filterable) ? _reduce(function (acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }
    return acc;
  }, {}, keys(filterable)) :
  // else
  _filter(pred, filterable);
}));
module.exports = filter;
},{"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_filter":113,"./internal/_isObject":126,"./internal/_reduce":138,"./internal/_xfilter":153,"./keys":175}],65:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xfind = /*#__PURE__*/require('./internal/_xfind');

/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */


var find = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['find'], _xfind, function find(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx += 1;
  }
}));
module.exports = find;
},{"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_xfind":154}],66:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xfindIndex = /*#__PURE__*/require('./internal/_xfindIndex');

/**
 * Returns the index of the first element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
 *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
 */


var findIndex = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xfindIndex, function findIndex(fn, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    if (fn(list[idx])) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}));
module.exports = findIndex;
},{"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_xfindIndex":155}],67:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xfindLast = /*#__PURE__*/require('./internal/_xfindLast');

/**
 * Returns the last element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
 *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
 */


var findLast = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xfindLast, function findLast(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    if (fn(list[idx])) {
      return list[idx];
    }
    idx -= 1;
  }
}));
module.exports = findLast;
},{"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_xfindLast":156}],68:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xfindLastIndex = /*#__PURE__*/require('./internal/_xfindLastIndex');

/**
 * Returns the index of the last element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
 *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
 */


var findLastIndex = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xfindLastIndex, function findLastIndex(fn, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    if (fn(list[idx])) {
      return idx;
    }
    idx -= 1;
  }
  return -1;
}));
module.exports = findLastIndex;
},{"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_xfindLastIndex":157}],69:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _makeFlat = /*#__PURE__*/require('./internal/_makeFlat');

/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b]
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @see R.unnest
 * @example
 *
 *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */


var flatten = /*#__PURE__*/_curry1( /*#__PURE__*/_makeFlat(true));
module.exports = flatten;
},{"./internal/_curry1":105,"./internal/_makeFlat":131}],70:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b, c, ...) -> z) -> (b -> a -> c -> ... -> z)
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      var mergeThree = (a, b, c) => [].concat(a, b, c);
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * @symb R.flip(f)(a, b, c) = f(b, a, c)
 */


var flip = /*#__PURE__*/_curry1(function flip(fn) {
  return curryN(fn.length, function (a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});
module.exports = flip;
},{"./curryN":42,"./internal/_curry1":105}],71:[function(require,module,exports){
var _checkForMethod = /*#__PURE__*/require('./internal/_checkForMethod');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Iterate over an input `list`, calling a provided function `fn` for each
 * element in the list.
 *
 * `fn` receives one argument: *(value)*.
 *
 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 *
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> *) -> [a] -> [a]
 * @param {Function} fn The function to invoke. Receives one argument, `value`.
 * @param {Array} list The list to iterate over.
 * @return {Array} The original list.
 * @see R.addIndex
 * @example
 *
 *      var printXPlusFive = x => console.log(x + 5);
 *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 *      // logs 6
 *      // logs 7
 *      // logs 8
 * @symb R.forEach(f, [a, b, c]) = [a, b, c]
 */


var forEach = /*#__PURE__*/_curry2( /*#__PURE__*/_checkForMethod('forEach', function forEach(fn, list) {
  var len = list.length;
  var idx = 0;
  while (idx < len) {
    fn(list[idx]);
    idx += 1;
  }
  return list;
}));
module.exports = forEach;
},{"./internal/_checkForMethod":97,"./internal/_curry2":106}],72:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var keys = /*#__PURE__*/require('./keys');

/**
 * Iterate over an input `object`, calling a provided function `fn` for each
 * key and value in the object.
 *
 * `fn` receives three argument: *(value, key, obj)*.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Object
 * @sig ((a, String, StrMap a) -> Any) -> StrMap a -> StrMap a
 * @param {Function} fn The function to invoke. Receives three argument, `value`, `key`, `obj`.
 * @param {Object} obj The object to iterate over.
 * @return {Object} The original object.
 * @example
 *
 *      var printKeyConcatValue = (value, key) => console.log(key + ':' + value);
 *      R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}
 *      // logs x:1
 *      // logs y:2
 * @symb R.forEachObjIndexed(f, {x: a, y: b}) = {x: a, y: b}
 */


var forEachObjIndexed = /*#__PURE__*/_curry2(function forEachObjIndexed(fn, obj) {
  var keyList = keys(obj);
  var idx = 0;
  while (idx < keyList.length) {
    var key = keyList[idx];
    fn(obj[key], key, obj);
    idx += 1;
  }
  return obj;
});
module.exports = forEachObjIndexed;
},{"./internal/_curry2":106,"./keys":175}],73:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [[k,v]] -> {k: v}
 * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
 * @return {Object} The object made by pairing up `keys` and `values`.
 * @see R.toPairs, R.pair
 * @example
 *
 *      R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 */


var fromPairs = /*#__PURE__*/_curry1(function fromPairs(pairs) {
  var result = {};
  var idx = 0;
  while (idx < pairs.length) {
    result[pairs[idx][0]] = pairs[idx][1];
    idx += 1;
  }
  return result;
});
module.exports = fromPairs;
},{"./internal/_curry1":105}],74:[function(require,module,exports){
var _checkForMethod = /*#__PURE__*/require('./internal/_checkForMethod');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var reduceBy = /*#__PURE__*/require('./reduceBy');

/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a String-returning function on each element, and grouping the
 * results according to values returned.
 *
 * Dispatches to the `groupBy` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> String) -> [a] -> {String: [a]}
 * @param {Function} fn Function :: a -> String
 * @param {Array} list The array to group
 * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
 *         that produced that key when passed to `fn`.
 * @see R.transduce
 * @example
 *
 *      var byGrade = R.groupBy(function(student) {
 *        var score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      var students = [{name: 'Abby', score: 84},
 *                      {name: 'Eddy', score: 58},
 *                      // ...
 *                      {name: 'Jack', score: 69}];
 *      byGrade(students);
 *      // {
 *      //   'A': [{name: 'Dianne', score: 99}],
 *      //   'B': [{name: 'Abby', score: 84}]
 *      //   // ...,
 *      //   'F': [{name: 'Eddy', score: 58}]
 *      // }
 */


var groupBy = /*#__PURE__*/_curry2( /*#__PURE__*/_checkForMethod('groupBy', /*#__PURE__*/reduceBy(function (acc, item) {
  if (acc == null) {
    acc = [];
  }
  acc.push(item);
  return acc;
}, null)));
module.exports = groupBy;
},{"./internal/_checkForMethod":97,"./internal/_curry2":106,"./reduceBy":251}],75:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Takes a list and returns a list of lists where each sublist's elements are
 * all satisfied pairwise comparison according to the provided function.
 * Only adjacent elements are passed to the comparison function.
 *
 * @func
 * @memberOf R
 * @since v0.21.0
 * @category List
 * @sig ((a, a) → Boolean) → [a] → [[a]]
 * @param {Function} fn Function for determining whether two given (adjacent)
 *        elements should be in the same group
 * @param {Array} list The array to group. Also accepts a string, which will be
 *        treated as a list of characters.
 * @return {List} A list that contains sublists of elements,
 *         whose concatenations are equal to the original list.
 * @example
 *
 * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a + 1 === b, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0, 1], [1, 2, 3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
 *
 * R.groupWith(R.eqBy(isVowel), 'aestiou')
 * //=> ['ae', 'st', 'iou']
 */


var groupWith = /*#__PURE__*/_curry2(function (fn, list) {
  var res = [];
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    var nextidx = idx + 1;
    while (nextidx < len && fn(list[nextidx - 1], list[nextidx])) {
      nextidx += 1;
    }
    res.push(list.slice(idx, nextidx));
    idx = nextidx;
  }
  return res;
});
module.exports = groupWith;
},{"./internal/_curry2":106}],76:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if the first argument is greater than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.lt
 * @example
 *
 *      R.gt(2, 1); //=> true
 *      R.gt(2, 2); //=> false
 *      R.gt(2, 3); //=> false
 *      R.gt('a', 'z'); //=> false
 *      R.gt('z', 'a'); //=> true
 */


var gt = /*#__PURE__*/_curry2(function gt(a, b) {
  return a > b;
});
module.exports = gt;
},{"./internal/_curry2":106}],77:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if the first argument is greater than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.lte
 * @example
 *
 *      R.gte(2, 1); //=> true
 *      R.gte(2, 2); //=> true
 *      R.gte(2, 3); //=> false
 *      R.gte('a', 'z'); //=> false
 *      R.gte('z', 'a'); //=> true
 */


var gte = /*#__PURE__*/_curry2(function gte(a, b) {
  return a >= b;
});
module.exports = gte;
},{"./internal/_curry2":106}],78:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      var hasName = R.has('name');
 *      hasName({name: 'alice'});   //=> true
 *      hasName({name: 'bob'});     //=> true
 *      hasName({});                //=> false
 *
 *      var point = {x: 0, y: 0};
 *      var pointHas = R.has(R.__, point);
 *      pointHas('x');  //=> true
 *      pointHas('y');  //=> true
 *      pointHas('z');  //=> false
 */


var has = /*#__PURE__*/_curry2(_has);
module.exports = has;
},{"./internal/_curry2":106,"./internal/_has":117}],79:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns whether or not an object or its prototype chain has a property with
 * the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      function Rectangle(width, height) {
 *        this.width = width;
 *        this.height = height;
 *      }
 *      Rectangle.prototype.area = function() {
 *        return this.width * this.height;
 *      };
 *
 *      var square = new Rectangle(2, 2);
 *      R.hasIn('width', square);  //=> true
 *      R.hasIn('area', square);  //=> true
 */


var hasIn = /*#__PURE__*/_curry2(function hasIn(prop, obj) {
  return prop in obj;
});
module.exports = hasIn;
},{"./internal/_curry2":106}],80:[function(require,module,exports){
var nth = /*#__PURE__*/require('./nth');

/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {Array|String} list
 * @return {*}
 * @see R.tail, R.init, R.last
 * @example
 *
 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      R.head([]); //=> undefined
 *
 *      R.head('abc'); //=> 'a'
 *      R.head(''); //=> ''
 */


var head = /*#__PURE__*/nth(0);
module.exports = head;
},{"./nth":216}],81:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      var o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */


var identical = /*#__PURE__*/_curry2(function identical(a, b) {
  // SameValue algorithm
  if (a === b) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
});
module.exports = identical;
},{"./internal/_curry2":106}],82:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _identity = /*#__PURE__*/require('./internal/_identity');

/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      R.identity(1); //=> 1
 *
 *      var obj = {};
 *      R.identity(obj) === obj; //=> true
 * @symb R.identity(a) = a
 */


var identity = /*#__PURE__*/_curry1(_identity);
module.exports = identity;
},{"./internal/_curry1":105,"./internal/_identity":118}],83:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
 * @param {Function} condition A predicate function
 * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
 * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
 * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`
 *                    function depending upon the result of the `condition` predicate.
 * @see R.unless, R.when
 * @example
 *
 *      var incCount = R.ifElse(
 *        R.has('count'),
 *        R.over(R.lensProp('count'), R.inc),
 *        R.assoc('count', 1)
 *      );
 *      incCount({});           //=> { count: 1 }
 *      incCount({ count: 1 }); //=> { count: 2 }
 */


var ifElse = /*#__PURE__*/_curry3(function ifElse(condition, onTrue, onFalse) {
  return curryN(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
    return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
  });
});
module.exports = ifElse;
},{"./curryN":42,"./internal/_curry3":107}],84:[function(require,module,exports){
var add = /*#__PURE__*/require('./add');

/**
 * Increments its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n + 1
 * @see R.dec
 * @example
 *
 *      R.inc(42); //=> 43
 */


var inc = /*#__PURE__*/add(1);
module.exports = inc;
},{"./add":4}],85:[function(require,module,exports){
module.exports = {};
module.exports.F = /*#__PURE__*/require('./F');
module.exports.T = /*#__PURE__*/require('./T');
module.exports.__ = /*#__PURE__*/require('./__');
module.exports.add = /*#__PURE__*/require('./add');
module.exports.addIndex = /*#__PURE__*/require('./addIndex');
module.exports.adjust = /*#__PURE__*/require('./adjust');
module.exports.all = /*#__PURE__*/require('./all');
module.exports.allPass = /*#__PURE__*/require('./allPass');
module.exports.always = /*#__PURE__*/require('./always');
module.exports.and = /*#__PURE__*/require('./and');
module.exports.any = /*#__PURE__*/require('./any');
module.exports.anyPass = /*#__PURE__*/require('./anyPass');
module.exports.ap = /*#__PURE__*/require('./ap');
module.exports.aperture = /*#__PURE__*/require('./aperture');
module.exports.append = /*#__PURE__*/require('./append');
module.exports.apply = /*#__PURE__*/require('./apply');
module.exports.applySpec = /*#__PURE__*/require('./applySpec');
module.exports.applyTo = /*#__PURE__*/require('./applyTo');
module.exports.ascend = /*#__PURE__*/require('./ascend');
module.exports.assoc = /*#__PURE__*/require('./assoc');
module.exports.assocPath = /*#__PURE__*/require('./assocPath');
module.exports.binary = /*#__PURE__*/require('./binary');
module.exports.bind = /*#__PURE__*/require('./bind');
module.exports.both = /*#__PURE__*/require('./both');
module.exports.call = /*#__PURE__*/require('./call');
module.exports.chain = /*#__PURE__*/require('./chain');
module.exports.clamp = /*#__PURE__*/require('./clamp');
module.exports.clone = /*#__PURE__*/require('./clone');
module.exports.comparator = /*#__PURE__*/require('./comparator');
module.exports.complement = /*#__PURE__*/require('./complement');
module.exports.compose = /*#__PURE__*/require('./compose');
module.exports.composeK = /*#__PURE__*/require('./composeK');
module.exports.composeP = /*#__PURE__*/require('./composeP');
module.exports.concat = /*#__PURE__*/require('./concat');
module.exports.cond = /*#__PURE__*/require('./cond');
module.exports.construct = /*#__PURE__*/require('./construct');
module.exports.constructN = /*#__PURE__*/require('./constructN');
module.exports.contains = /*#__PURE__*/require('./contains');
module.exports.converge = /*#__PURE__*/require('./converge');
module.exports.countBy = /*#__PURE__*/require('./countBy');
module.exports.curry = /*#__PURE__*/require('./curry');
module.exports.curryN = /*#__PURE__*/require('./curryN');
module.exports.dec = /*#__PURE__*/require('./dec');
module.exports.defaultTo = /*#__PURE__*/require('./defaultTo');
module.exports.descend = /*#__PURE__*/require('./descend');
module.exports.difference = /*#__PURE__*/require('./difference');
module.exports.differenceWith = /*#__PURE__*/require('./differenceWith');
module.exports.dissoc = /*#__PURE__*/require('./dissoc');
module.exports.dissocPath = /*#__PURE__*/require('./dissocPath');
module.exports.divide = /*#__PURE__*/require('./divide');
module.exports.drop = /*#__PURE__*/require('./drop');
module.exports.dropLast = /*#__PURE__*/require('./dropLast');
module.exports.dropLastWhile = /*#__PURE__*/require('./dropLastWhile');
module.exports.dropRepeats = /*#__PURE__*/require('./dropRepeats');
module.exports.dropRepeatsWith = /*#__PURE__*/require('./dropRepeatsWith');
module.exports.dropWhile = /*#__PURE__*/require('./dropWhile');
module.exports.either = /*#__PURE__*/require('./either');
module.exports.empty = /*#__PURE__*/require('./empty');
module.exports.endsWith = /*#__PURE__*/require('./endsWith');
module.exports.eqBy = /*#__PURE__*/require('./eqBy');
module.exports.eqProps = /*#__PURE__*/require('./eqProps');
module.exports.equals = /*#__PURE__*/require('./equals');
module.exports.evolve = /*#__PURE__*/require('./evolve');
module.exports.filter = /*#__PURE__*/require('./filter');
module.exports.find = /*#__PURE__*/require('./find');
module.exports.findIndex = /*#__PURE__*/require('./findIndex');
module.exports.findLast = /*#__PURE__*/require('./findLast');
module.exports.findLastIndex = /*#__PURE__*/require('./findLastIndex');
module.exports.flatten = /*#__PURE__*/require('./flatten');
module.exports.flip = /*#__PURE__*/require('./flip');
module.exports.forEach = /*#__PURE__*/require('./forEach');
module.exports.forEachObjIndexed = /*#__PURE__*/require('./forEachObjIndexed');
module.exports.fromPairs = /*#__PURE__*/require('./fromPairs');
module.exports.groupBy = /*#__PURE__*/require('./groupBy');
module.exports.groupWith = /*#__PURE__*/require('./groupWith');
module.exports.gt = /*#__PURE__*/require('./gt');
module.exports.gte = /*#__PURE__*/require('./gte');
module.exports.has = /*#__PURE__*/require('./has');
module.exports.hasIn = /*#__PURE__*/require('./hasIn');
module.exports.head = /*#__PURE__*/require('./head');
module.exports.identical = /*#__PURE__*/require('./identical');
module.exports.identity = /*#__PURE__*/require('./identity');
module.exports.ifElse = /*#__PURE__*/require('./ifElse');
module.exports.inc = /*#__PURE__*/require('./inc');
module.exports.indexBy = /*#__PURE__*/require('./indexBy');
module.exports.indexOf = /*#__PURE__*/require('./indexOf');
module.exports.init = /*#__PURE__*/require('./init');
module.exports.innerJoin = /*#__PURE__*/require('./innerJoin');
module.exports.insert = /*#__PURE__*/require('./insert');
module.exports.insertAll = /*#__PURE__*/require('./insertAll');
module.exports.intersection = /*#__PURE__*/require('./intersection');
module.exports.intersperse = /*#__PURE__*/require('./intersperse');
module.exports.into = /*#__PURE__*/require('./into');
module.exports.invert = /*#__PURE__*/require('./invert');
module.exports.invertObj = /*#__PURE__*/require('./invertObj');
module.exports.invoker = /*#__PURE__*/require('./invoker');
module.exports.is = /*#__PURE__*/require('./is');
module.exports.isEmpty = /*#__PURE__*/require('./isEmpty');
module.exports.isNil = /*#__PURE__*/require('./isNil');
module.exports.join = /*#__PURE__*/require('./join');
module.exports.juxt = /*#__PURE__*/require('./juxt');
module.exports.keys = /*#__PURE__*/require('./keys');
module.exports.keysIn = /*#__PURE__*/require('./keysIn');
module.exports.last = /*#__PURE__*/require('./last');
module.exports.lastIndexOf = /*#__PURE__*/require('./lastIndexOf');
module.exports.length = /*#__PURE__*/require('./length');
module.exports.lens = /*#__PURE__*/require('./lens');
module.exports.lensIndex = /*#__PURE__*/require('./lensIndex');
module.exports.lensPath = /*#__PURE__*/require('./lensPath');
module.exports.lensProp = /*#__PURE__*/require('./lensProp');
module.exports.lift = /*#__PURE__*/require('./lift');
module.exports.liftN = /*#__PURE__*/require('./liftN');
module.exports.lt = /*#__PURE__*/require('./lt');
module.exports.lte = /*#__PURE__*/require('./lte');
module.exports.map = /*#__PURE__*/require('./map');
module.exports.mapAccum = /*#__PURE__*/require('./mapAccum');
module.exports.mapAccumRight = /*#__PURE__*/require('./mapAccumRight');
module.exports.mapObjIndexed = /*#__PURE__*/require('./mapObjIndexed');
module.exports.match = /*#__PURE__*/require('./match');
module.exports.mathMod = /*#__PURE__*/require('./mathMod');
module.exports.max = /*#__PURE__*/require('./max');
module.exports.maxBy = /*#__PURE__*/require('./maxBy');
module.exports.mean = /*#__PURE__*/require('./mean');
module.exports.median = /*#__PURE__*/require('./median');
module.exports.memoize = /*#__PURE__*/require('./memoize');
module.exports.memoizeWith = /*#__PURE__*/require('./memoizeWith');
module.exports.merge = /*#__PURE__*/require('./merge');
module.exports.mergeAll = /*#__PURE__*/require('./mergeAll');
module.exports.mergeDeepLeft = /*#__PURE__*/require('./mergeDeepLeft');
module.exports.mergeDeepRight = /*#__PURE__*/require('./mergeDeepRight');
module.exports.mergeDeepWith = /*#__PURE__*/require('./mergeDeepWith');
module.exports.mergeDeepWithKey = /*#__PURE__*/require('./mergeDeepWithKey');
module.exports.mergeWith = /*#__PURE__*/require('./mergeWith');
module.exports.mergeWithKey = /*#__PURE__*/require('./mergeWithKey');
module.exports.min = /*#__PURE__*/require('./min');
module.exports.minBy = /*#__PURE__*/require('./minBy');
module.exports.modulo = /*#__PURE__*/require('./modulo');
module.exports.multiply = /*#__PURE__*/require('./multiply');
module.exports.nAry = /*#__PURE__*/require('./nAry');
module.exports.negate = /*#__PURE__*/require('./negate');
module.exports.none = /*#__PURE__*/require('./none');
module.exports.not = /*#__PURE__*/require('./not');
module.exports.nth = /*#__PURE__*/require('./nth');
module.exports.nthArg = /*#__PURE__*/require('./nthArg');
module.exports.o = /*#__PURE__*/require('./o');
module.exports.objOf = /*#__PURE__*/require('./objOf');
module.exports.of = /*#__PURE__*/require('./of');
module.exports.omit = /*#__PURE__*/require('./omit');
module.exports.once = /*#__PURE__*/require('./once');
module.exports.or = /*#__PURE__*/require('./or');
module.exports.over = /*#__PURE__*/require('./over');
module.exports.pair = /*#__PURE__*/require('./pair');
module.exports.partial = /*#__PURE__*/require('./partial');
module.exports.partialRight = /*#__PURE__*/require('./partialRight');
module.exports.partition = /*#__PURE__*/require('./partition');
module.exports.path = /*#__PURE__*/require('./path');
module.exports.pathEq = /*#__PURE__*/require('./pathEq');
module.exports.pathOr = /*#__PURE__*/require('./pathOr');
module.exports.pathSatisfies = /*#__PURE__*/require('./pathSatisfies');
module.exports.pick = /*#__PURE__*/require('./pick');
module.exports.pickAll = /*#__PURE__*/require('./pickAll');
module.exports.pickBy = /*#__PURE__*/require('./pickBy');
module.exports.pipe = /*#__PURE__*/require('./pipe');
module.exports.pipeK = /*#__PURE__*/require('./pipeK');
module.exports.pipeP = /*#__PURE__*/require('./pipeP');
module.exports.pluck = /*#__PURE__*/require('./pluck');
module.exports.prepend = /*#__PURE__*/require('./prepend');
module.exports.product = /*#__PURE__*/require('./product');
module.exports.project = /*#__PURE__*/require('./project');
module.exports.prop = /*#__PURE__*/require('./prop');
module.exports.propEq = /*#__PURE__*/require('./propEq');
module.exports.propIs = /*#__PURE__*/require('./propIs');
module.exports.propOr = /*#__PURE__*/require('./propOr');
module.exports.propSatisfies = /*#__PURE__*/require('./propSatisfies');
module.exports.props = /*#__PURE__*/require('./props');
module.exports.range = /*#__PURE__*/require('./range');
module.exports.reduce = /*#__PURE__*/require('./reduce');
module.exports.reduceBy = /*#__PURE__*/require('./reduceBy');
module.exports.reduceRight = /*#__PURE__*/require('./reduceRight');
module.exports.reduceWhile = /*#__PURE__*/require('./reduceWhile');
module.exports.reduced = /*#__PURE__*/require('./reduced');
module.exports.reject = /*#__PURE__*/require('./reject');
module.exports.remove = /*#__PURE__*/require('./remove');
module.exports.repeat = /*#__PURE__*/require('./repeat');
module.exports.replace = /*#__PURE__*/require('./replace');
module.exports.reverse = /*#__PURE__*/require('./reverse');
module.exports.scan = /*#__PURE__*/require('./scan');
module.exports.sequence = /*#__PURE__*/require('./sequence');
module.exports.set = /*#__PURE__*/require('./set');
module.exports.slice = /*#__PURE__*/require('./slice');
module.exports.sort = /*#__PURE__*/require('./sort');
module.exports.sortBy = /*#__PURE__*/require('./sortBy');
module.exports.sortWith = /*#__PURE__*/require('./sortWith');
module.exports.split = /*#__PURE__*/require('./split');
module.exports.splitAt = /*#__PURE__*/require('./splitAt');
module.exports.splitEvery = /*#__PURE__*/require('./splitEvery');
module.exports.splitWhen = /*#__PURE__*/require('./splitWhen');
module.exports.startsWith = /*#__PURE__*/require('./startsWith');
module.exports.subtract = /*#__PURE__*/require('./subtract');
module.exports.sum = /*#__PURE__*/require('./sum');
module.exports.symmetricDifference = /*#__PURE__*/require('./symmetricDifference');
module.exports.symmetricDifferenceWith = /*#__PURE__*/require('./symmetricDifferenceWith');
module.exports.tail = /*#__PURE__*/require('./tail');
module.exports.take = /*#__PURE__*/require('./take');
module.exports.takeLast = /*#__PURE__*/require('./takeLast');
module.exports.takeLastWhile = /*#__PURE__*/require('./takeLastWhile');
module.exports.takeWhile = /*#__PURE__*/require('./takeWhile');
module.exports.tap = /*#__PURE__*/require('./tap');
module.exports.test = /*#__PURE__*/require('./test');
module.exports.times = /*#__PURE__*/require('./times');
module.exports.toLower = /*#__PURE__*/require('./toLower');
module.exports.toPairs = /*#__PURE__*/require('./toPairs');
module.exports.toPairsIn = /*#__PURE__*/require('./toPairsIn');
module.exports.toString = /*#__PURE__*/require('./toString');
module.exports.toUpper = /*#__PURE__*/require('./toUpper');
module.exports.transduce = /*#__PURE__*/require('./transduce');
module.exports.transpose = /*#__PURE__*/require('./transpose');
module.exports.traverse = /*#__PURE__*/require('./traverse');
module.exports.trim = /*#__PURE__*/require('./trim');
module.exports.tryCatch = /*#__PURE__*/require('./tryCatch');
module.exports.type = /*#__PURE__*/require('./type');
module.exports.unapply = /*#__PURE__*/require('./unapply');
module.exports.unary = /*#__PURE__*/require('./unary');
module.exports.uncurryN = /*#__PURE__*/require('./uncurryN');
module.exports.unfold = /*#__PURE__*/require('./unfold');
module.exports.union = /*#__PURE__*/require('./union');
module.exports.unionWith = /*#__PURE__*/require('./unionWith');
module.exports.uniq = /*#__PURE__*/require('./uniq');
module.exports.uniqBy = /*#__PURE__*/require('./uniqBy');
module.exports.uniqWith = /*#__PURE__*/require('./uniqWith');
module.exports.unless = /*#__PURE__*/require('./unless');
module.exports.unnest = /*#__PURE__*/require('./unnest');
module.exports.until = /*#__PURE__*/require('./until');
module.exports.update = /*#__PURE__*/require('./update');
module.exports.useWith = /*#__PURE__*/require('./useWith');
module.exports.values = /*#__PURE__*/require('./values');
module.exports.valuesIn = /*#__PURE__*/require('./valuesIn');
module.exports.view = /*#__PURE__*/require('./view');
module.exports.when = /*#__PURE__*/require('./when');
module.exports.where = /*#__PURE__*/require('./where');
module.exports.whereEq = /*#__PURE__*/require('./whereEq');
module.exports.without = /*#__PURE__*/require('./without');
module.exports.xprod = /*#__PURE__*/require('./xprod');
module.exports.zip = /*#__PURE__*/require('./zip');
module.exports.zipObj = /*#__PURE__*/require('./zipObj');
module.exports.zipWith = /*#__PURE__*/require('./zipWith');
},{"./F":1,"./T":2,"./__":3,"./add":4,"./addIndex":5,"./adjust":6,"./all":7,"./allPass":8,"./always":9,"./and":10,"./any":11,"./anyPass":12,"./ap":13,"./aperture":14,"./append":15,"./apply":16,"./applySpec":17,"./applyTo":18,"./ascend":19,"./assoc":20,"./assocPath":21,"./binary":22,"./bind":23,"./both":24,"./call":25,"./chain":26,"./clamp":27,"./clone":28,"./comparator":29,"./complement":30,"./compose":31,"./composeK":32,"./composeP":33,"./concat":34,"./cond":35,"./construct":36,"./constructN":37,"./contains":38,"./converge":39,"./countBy":40,"./curry":41,"./curryN":42,"./dec":43,"./defaultTo":44,"./descend":45,"./difference":46,"./differenceWith":47,"./dissoc":48,"./dissocPath":49,"./divide":50,"./drop":51,"./dropLast":52,"./dropLastWhile":53,"./dropRepeats":54,"./dropRepeatsWith":55,"./dropWhile":56,"./either":57,"./empty":58,"./endsWith":59,"./eqBy":60,"./eqProps":61,"./equals":62,"./evolve":63,"./filter":64,"./find":65,"./findIndex":66,"./findLast":67,"./findLastIndex":68,"./flatten":69,"./flip":70,"./forEach":71,"./forEachObjIndexed":72,"./fromPairs":73,"./groupBy":74,"./groupWith":75,"./gt":76,"./gte":77,"./has":78,"./hasIn":79,"./head":80,"./identical":81,"./identity":82,"./ifElse":83,"./inc":84,"./indexBy":86,"./indexOf":87,"./init":88,"./innerJoin":89,"./insert":90,"./insertAll":91,"./intersection":164,"./intersperse":165,"./into":166,"./invert":167,"./invertObj":168,"./invoker":169,"./is":170,"./isEmpty":171,"./isNil":172,"./join":173,"./juxt":174,"./keys":175,"./keysIn":176,"./last":177,"./lastIndexOf":178,"./length":179,"./lens":180,"./lensIndex":181,"./lensPath":182,"./lensProp":183,"./lift":184,"./liftN":185,"./lt":186,"./lte":187,"./map":188,"./mapAccum":189,"./mapAccumRight":190,"./mapObjIndexed":191,"./match":192,"./mathMod":193,"./max":194,"./maxBy":195,"./mean":196,"./median":197,"./memoize":198,"./memoizeWith":199,"./merge":200,"./mergeAll":201,"./mergeDeepLeft":202,"./mergeDeepRight":203,"./mergeDeepWith":204,"./mergeDeepWithKey":205,"./mergeWith":206,"./mergeWithKey":207,"./min":208,"./minBy":209,"./modulo":210,"./multiply":211,"./nAry":212,"./negate":213,"./none":214,"./not":215,"./nth":216,"./nthArg":217,"./o":218,"./objOf":219,"./of":220,"./omit":221,"./once":222,"./or":223,"./over":224,"./pair":225,"./partial":226,"./partialRight":227,"./partition":228,"./path":229,"./pathEq":230,"./pathOr":231,"./pathSatisfies":232,"./pick":233,"./pickAll":234,"./pickBy":235,"./pipe":236,"./pipeK":237,"./pipeP":238,"./pluck":239,"./prepend":240,"./product":241,"./project":242,"./prop":243,"./propEq":244,"./propIs":245,"./propOr":246,"./propSatisfies":247,"./props":248,"./range":249,"./reduce":250,"./reduceBy":251,"./reduceRight":252,"./reduceWhile":253,"./reduced":254,"./reject":255,"./remove":256,"./repeat":257,"./replace":258,"./reverse":259,"./scan":260,"./sequence":261,"./set":262,"./slice":263,"./sort":264,"./sortBy":265,"./sortWith":266,"./split":267,"./splitAt":268,"./splitEvery":269,"./splitWhen":270,"./startsWith":271,"./subtract":272,"./sum":273,"./symmetricDifference":274,"./symmetricDifferenceWith":275,"./tail":276,"./take":277,"./takeLast":278,"./takeLastWhile":279,"./takeWhile":280,"./tap":281,"./test":282,"./times":283,"./toLower":284,"./toPairs":285,"./toPairsIn":286,"./toString":287,"./toUpper":288,"./transduce":289,"./transpose":290,"./traverse":291,"./trim":292,"./tryCatch":293,"./type":294,"./unapply":295,"./unary":296,"./uncurryN":297,"./unfold":298,"./union":299,"./unionWith":300,"./uniq":301,"./uniqBy":302,"./uniqWith":303,"./unless":304,"./unnest":305,"./until":306,"./update":307,"./useWith":308,"./values":309,"./valuesIn":310,"./view":311,"./when":312,"./where":313,"./whereEq":314,"./without":315,"./xprod":316,"./zip":317,"./zipObj":318,"./zipWith":319}],86:[function(require,module,exports){
var reduceBy = /*#__PURE__*/require('./reduceBy');

/**
 * Given a function that generates a key, turns a list of objects into an
 * object indexing the objects by the given key. Note that if multiple
 * objects generate the same value for the indexing key only the last value
 * will be included in the generated object.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> String) -> [{k: v}] -> {k: {k: v}}
 * @param {Function} fn Function :: a -> String
 * @param {Array} array The array of objects to index
 * @return {Object} An object indexing each array element by the given property.
 * @example
 *
 *      var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
 *      R.indexBy(R.prop('id'), list);
 *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
 */


var indexBy = /*#__PURE__*/reduceBy(function (acc, elem) {
  return elem;
}, null);
module.exports = indexBy;
},{"./reduceBy":251}],87:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _indexOf = /*#__PURE__*/require('./internal/_indexOf');

var _isArray = /*#__PURE__*/require('./internal/_isArray');

/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.lastIndexOf
 * @example
 *
 *      R.indexOf(3, [1,2,3,4]); //=> 2
 *      R.indexOf(10, [1,2,3,4]); //=> -1
 */


var indexOf = /*#__PURE__*/_curry2(function indexOf(target, xs) {
  return typeof xs.indexOf === 'function' && !_isArray(xs) ? xs.indexOf(target) : _indexOf(xs, target, 0);
});
module.exports = indexOf;
},{"./internal/_curry2":106,"./internal/_indexOf":119,"./internal/_isArray":121}],88:[function(require,module,exports){
var slice = /*#__PURE__*/require('./slice');

/**
 * Returns all but the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.last, R.head, R.tail
 * @example
 *
 *      R.init([1, 2, 3]);  //=> [1, 2]
 *      R.init([1, 2]);     //=> [1]
 *      R.init([1]);        //=> []
 *      R.init([]);         //=> []
 *
 *      R.init('abc');  //=> 'ab'
 *      R.init('ab');   //=> 'a'
 *      R.init('a');    //=> ''
 *      R.init('');     //=> ''
 */


var init = /*#__PURE__*/slice(0, -1);
module.exports = init;
},{"./slice":263}],89:[function(require,module,exports){
var _containsWith = /*#__PURE__*/require('./internal/_containsWith');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _filter = /*#__PURE__*/require('./internal/_filter');

/**
 * Takes a predicate `pred`, a list `xs`, and a list `ys`, and returns a list
 * `xs'` comprising each of the elements of `xs` which is equal to one or more
 * elements of `ys` according to `pred`.
 *
 * `pred` must be a binary function expecting an element from each list.
 *
 * `xs`, `ys`, and `xs'` are treated as sets, semantically, so ordering should
 * not be significant, but since `xs'` is ordered the implementation guarantees
 * that its values are in the same order as they appear in `xs`. Duplicates are
 * not removed, so `xs'` may contain duplicates if `xs` contains duplicates.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Relation
 * @sig ((a, b) -> Boolean) -> [a] -> [b] -> [a]
 * @param {Function} pred
 * @param {Array} xs
 * @param {Array} ys
 * @return {Array}
 * @see R.intersection
 * @example
 *
 *      R.innerJoin(
 *        (record, id) => record.id === id,
 *        [{id: 824, name: 'Richie Furay'},
 *         {id: 956, name: 'Dewey Martin'},
 *         {id: 313, name: 'Bruce Palmer'},
 *         {id: 456, name: 'Stephen Stills'},
 *         {id: 177, name: 'Neil Young'}],
 *        [177, 456, 999]
 *      );
 *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
 */


var innerJoin = /*#__PURE__*/_curry3(function innerJoin(pred, xs, ys) {
  return _filter(function (x) {
    return _containsWith(pred, x, ys);
  }, xs);
});
module.exports = innerJoin;
},{"./internal/_containsWith":103,"./internal/_curry3":107,"./internal/_filter":113}],90:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Inserts the supplied element into the list, at the specified `index`. _Note that

 * this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} index The position to insert the element
 * @param {*} elt The element to insert into the Array
 * @param {Array} list The list to insert into
 * @return {Array} A new Array with `elt` inserted at `index`.
 * @example
 *
 *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
 */


var insert = /*#__PURE__*/_curry3(function insert(idx, elt, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  var result = Array.prototype.slice.call(list, 0);
  result.splice(idx, 0, elt);
  return result;
});
module.exports = insert;
},{"./internal/_curry3":107}],91:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Inserts the sub-list into the list, at the specified `index`. _Note that this is not
 * destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig Number -> [a] -> [a] -> [a]
 * @param {Number} index The position to insert the sub-list
 * @param {Array} elts The sub-list to insert into the Array
 * @param {Array} list The list to insert the sub-list into
 * @return {Array} A new Array with `elts` inserted starting at `index`.
 * @example
 *
 *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
 */


var insertAll = /*#__PURE__*/_curry3(function insertAll(idx, elts, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  return [].concat(Array.prototype.slice.call(list, 0, idx), elts, Array.prototype.slice.call(list, idx));
});
module.exports = insertAll;
},{"./internal/_curry3":107}],92:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./_contains');

var _Set = /*#__PURE__*/function () {

  function _Set() {
    /* globals Set */
    this._nativeSet = typeof Set === 'function' ? new Set() : null;
    this._items = {};
  }

  // until we figure out why jsdoc chokes on this
  // @param item The item to add to the Set
  // @returns {boolean} true if the item did not exist prior, otherwise false
  //
  _Set.prototype.add = function (item) {
    return !hasOrAdd(item, true, this);
  };

  //
  // @param item The item to check for existence in the Set
  // @returns {boolean} true if the item exists in the Set, otherwise false
  //
  _Set.prototype.has = function (item) {
    return hasOrAdd(item, false, this);
  };

  //
  // Combines the logic for checking whether an item is a member of the set and
  // for adding a new item to the set.
  //
  // @param item       The item to check or add to the Set instance.
  // @param shouldAdd  If true, the item will be added to the set if it doesn't
  //                   already exist.
  // @param set        The set instance to check or add to.
  // @return {boolean} true if the item already existed, otherwise false.
  //
  return _Set;
}();

function hasOrAdd(item, shouldAdd, set) {
  var type = typeof item;
  var prevSize, newSize;
  switch (type) {
    case 'string':
    case 'number':
      // distinguish between +0 and -0
      if (item === 0 && 1 / item === -Infinity) {
        if (set._items['-0']) {
          return true;
        } else {
          if (shouldAdd) {
            set._items['-0'] = true;
          }
          return false;
        }
      }
      // these types can all utilise the native Set
      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;
          set._nativeSet.add(item);
          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = {};
            set._items[type][item] = true;
          }
          return false;
        } else if (item in set._items[type]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][item] = true;
          }
          return false;
        }
      }

    case 'boolean':
      // set._items['boolean'] holds a two element array
      // representing [ falseExists, trueExists ]
      if (type in set._items) {
        var bIdx = item ? 1 : 0;
        if (set._items[type][bIdx]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][bIdx] = true;
          }
          return false;
        }
      } else {
        if (shouldAdd) {
          set._items[type] = item ? [false, true] : [true, false];
        }
        return false;
      }

    case 'function':
      // compare functions for reference equality
      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;
          set._nativeSet.add(item);
          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = [item];
          }
          return false;
        }
        if (!_contains(item, set._items[type])) {
          if (shouldAdd) {
            set._items[type].push(item);
          }
          return false;
        }
        return true;
      }

    case 'undefined':
      if (set._items[type]) {
        return true;
      } else {
        if (shouldAdd) {
          set._items[type] = true;
        }
        return false;
      }

    case 'object':
      if (item === null) {
        if (!set._items['null']) {
          if (shouldAdd) {
            set._items['null'] = true;
          }
          return false;
        }
        return true;
      }
    /* falls through */
    default:
      // reduce the search size of heterogeneous sets by creating buckets
      // for each type.
      type = Object.prototype.toString.call(item);
      if (!(type in set._items)) {
        if (shouldAdd) {
          set._items[type] = [item];
        }
        return false;
      }
      // scan through all previously applied items
      if (!_contains(item, set._items[type])) {
        if (shouldAdd) {
          set._items[type].push(item);
        }
        return false;
      }
      return true;
  }
}

// A simple Set type that honours R.equals semantics
module.exports = _Set;
},{"./_contains":102}],93:[function(require,module,exports){
function _aperture(n, list) {
  var idx = 0;
  var limit = list.length - (n - 1);
  var acc = new Array(limit >= 0 ? limit : 0);
  while (idx < limit) {
    acc[idx] = Array.prototype.slice.call(list, idx, idx + n);
    idx += 1;
  }
  return acc;
}
module.exports = _aperture;
},{}],94:[function(require,module,exports){
function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };
    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };
    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}
module.exports = _arity;
},{}],95:[function(require,module,exports){
function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}
module.exports = _arrayFromIterator;
},{}],96:[function(require,module,exports){
var _objectAssign = /*#__PURE__*/require('./_objectAssign');

module.exports = typeof Object.assign === 'function' ? Object.assign : _objectAssign;
},{"./_objectAssign":133}],97:[function(require,module,exports){
var _isArray = /*#__PURE__*/require('./_isArray');

/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */


function _checkForMethod(methodname, fn) {
  return function () {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}
module.exports = _checkForMethod;
},{"./_isArray":121}],98:[function(require,module,exports){
var _cloneRegExp = /*#__PURE__*/require('./_cloneRegExp');

var type = /*#__PURE__*/require('../type');

/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */


function _clone(value, refFrom, refTo, deep) {
  var copy = function copy(copiedValue) {
    var len = refFrom.length;
    var idx = 0;
    while (idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }
      idx += 1;
    }
    refFrom[idx + 1] = value;
    refTo[idx + 1] = copiedValue;
    for (var key in value) {
      copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
    }
    return copiedValue;
  };
  switch (type(value)) {
    case 'Object':
      return copy({});
    case 'Array':
      return copy([]);
    case 'Date':
      return new Date(value.valueOf());
    case 'RegExp':
      return _cloneRegExp(value);
    default:
      return value;
  }
}
module.exports = _clone;
},{"../type":294,"./_cloneRegExp":99}],99:[function(require,module,exports){
function _cloneRegExp(pattern) {
                                  return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
}
module.exports = _cloneRegExp;
},{}],100:[function(require,module,exports){
function _complement(f) {
  return function () {
    return !f.apply(this, arguments);
  };
}
module.exports = _complement;
},{}],101:[function(require,module,exports){
/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];

  idx = 0;
  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }
  idx = 0;
  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }
  return result;
}
module.exports = _concat;
},{}],102:[function(require,module,exports){
var _indexOf = /*#__PURE__*/require('./_indexOf');

function _contains(a, list) {
  return _indexOf(list, a, 0) >= 0;
}
module.exports = _contains;
},{"./_indexOf":119}],103:[function(require,module,exports){
function _containsWith(pred, x, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }
    idx += 1;
  }
  return false;
}
module.exports = _containsWith;
},{}],104:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./_arity');

var _curry2 = /*#__PURE__*/require('./_curry2');

function _createPartialApplicator(concat) {
  return _curry2(function (fn, args) {
    return _arity(Math.max(0, fn.length - args.length), function () {
      return fn.apply(this, concat(args, arguments));
    });
  });
}
module.exports = _createPartialApplicator;
},{"./_arity":94,"./_curry2":106}],105:[function(require,module,exports){
var _isPlaceholder = /*#__PURE__*/require('./_isPlaceholder');

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}
module.exports = _curry1;
},{"./_isPlaceholder":127}],106:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./_curry1');

var _isPlaceholder = /*#__PURE__*/require('./_isPlaceholder');

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}
module.exports = _curry2;
},{"./_curry1":105,"./_isPlaceholder":127}],107:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./_curry1');

var _curry2 = /*#__PURE__*/require('./_curry2');

var _isPlaceholder = /*#__PURE__*/require('./_isPlaceholder');

/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1(function (_c) {
          return fn(a, b, _c);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}
module.exports = _curry3;
},{"./_curry1":105,"./_curry2":106,"./_isPlaceholder":127}],108:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./_arity');

var _isPlaceholder = /*#__PURE__*/require('./_isPlaceholder');

/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curryN(length, received, fn) {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;
      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }
      combined[combinedIdx] = result;
      if (!_isPlaceholder(result)) {
        left -= 1;
      }
      combinedIdx += 1;
    }
    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
  };
}
module.exports = _curryN;
},{"./_arity":94,"./_isPlaceholder":127}],109:[function(require,module,exports){
var _isArray = /*#__PURE__*/require('./_isArray');

var _isTransformer = /*#__PURE__*/require('./_isTransformer');

/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */


function _dispatchable(methodNames, xf, fn) {
  return function () {
    if (arguments.length === 0) {
      return fn();
    }
    var args = Array.prototype.slice.call(arguments, 0);
    var obj = args.pop();
    if (!_isArray(obj)) {
      var idx = 0;
      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, args);
        }
        idx += 1;
      }
      if (_isTransformer(obj)) {
        var transducer = xf.apply(null, args);
        return transducer(obj);
      }
    }
    return fn.apply(this, arguments);
  };
}
module.exports = _dispatchable;
},{"./_isArray":121,"./_isTransformer":130}],110:[function(require,module,exports){
var take = /*#__PURE__*/require('../take');

function dropLast(n, xs) {
  return take(n < xs.length ? xs.length - n : 0, xs);
}
module.exports = dropLast;
},{"../take":277}],111:[function(require,module,exports){
var slice = /*#__PURE__*/require('../slice');

function dropLastWhile(pred, xs) {
  var idx = xs.length - 1;
  while (idx >= 0 && pred(xs[idx])) {
    idx -= 1;
  }
  return slice(0, idx + 1, xs);
}
module.exports = dropLastWhile;
},{"../slice":263}],112:[function(require,module,exports){
var _arrayFromIterator = /*#__PURE__*/require('./_arrayFromIterator');

var _containsWith = /*#__PURE__*/require('./_containsWith');

var _functionName = /*#__PURE__*/require('./_functionName');

var _has = /*#__PURE__*/require('./_has');

var identical = /*#__PURE__*/require('../identical');

var keys = /*#__PURE__*/require('../keys');

var type = /*#__PURE__*/require('../type');

/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparision of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 * */

function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = _arrayFromIterator(aIterator);
  var b = _arrayFromIterator(bIterator);

  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  }

  // if *a* array contains any element that is not included in *b*
  return !_containsWith(function (b, aItem) {
    return !_containsWith(eq, aItem, b);
  }, b, a);
}

function _equals(a, b, stackA, stackB) {
  if (identical(a, b)) {
    return true;
  }

  var typeA = type(a);

  if (typeA !== type(b)) {
    return false;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
  }

  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
        return a === b;
      }
      break;
    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
        return false;
      }
      break;
    case 'Date':
      if (!identical(a.valueOf(), b.valueOf())) {
        return false;
      }
      break;
    case 'Error':
      return a.name === b.name && a.message === b.message;
    case 'RegExp':
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }
      break;
  }

  var idx = stackA.length - 1;
  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }
    idx -= 1;
  }

  switch (typeA) {
    case 'Map':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
    case 'Set':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Boolean':
    case 'Number':
    case 'String':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break;
    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = keys(a);
  if (keysA.length !== keys(b).length) {
    return false;
  }

  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);

  idx = keysA.length - 1;
  while (idx >= 0) {
    var key = keysA[idx];
    if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }
    idx -= 1;
  }
  return true;
}
module.exports = _equals;
},{"../identical":81,"../keys":175,"../type":294,"./_arrayFromIterator":95,"./_containsWith":103,"./_functionName":116,"./_has":117}],113:[function(require,module,exports){
function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }
    idx += 1;
  }
  return result;
}
module.exports = _filter;
},{}],114:[function(require,module,exports){
var _forceReduced = /*#__PURE__*/require('./_forceReduced');

var _isArrayLike = /*#__PURE__*/require('./_isArrayLike');

var _reduce = /*#__PURE__*/require('./_reduce');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var preservingReduced = function (xf) {
  return {
    '@@transducer/init': _xfBase.init,
    '@@transducer/result': function (result) {
      return xf['@@transducer/result'](result);
    },
    '@@transducer/step': function (result, input) {
      var ret = xf['@@transducer/step'](result, input);
      return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
    }
  };
};

var _flatCat = function _xcat(xf) {
  var rxf = preservingReduced(xf);
  return {
    '@@transducer/init': _xfBase.init,
    '@@transducer/result': function (result) {
      return rxf['@@transducer/result'](result);
    },
    '@@transducer/step': function (result, input) {
      return !_isArrayLike(input) ? _reduce(rxf, result, [input]) : _reduce(rxf, result, input);
    }
  };
};

module.exports = _flatCat;
},{"./_forceReduced":115,"./_isArrayLike":122,"./_reduce":138,"./_xfBase":152}],115:[function(require,module,exports){
function _forceReduced(x) {
  return {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}
module.exports = _forceReduced;
},{}],116:[function(require,module,exports){
function _functionName(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
}
module.exports = _functionName;
},{}],117:[function(require,module,exports){
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
module.exports = _has;
},{}],118:[function(require,module,exports){
function _identity(x) {
  return x;
}
module.exports = _identity;
},{}],119:[function(require,module,exports){
var equals = /*#__PURE__*/require('../equals');

function _indexOf(list, a, idx) {
  var inf, item;
  // Array.prototype.indexOf doesn't exist below IE9
  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a;
          while (idx < list.length) {
            item = list[idx];
            if (item === 0 && 1 / item === inf) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        } else if (a !== a) {
          // NaN
          while (idx < list.length) {
            item = list[idx];
            if (typeof item === 'number' && item !== item) {
              return idx;
            }
            idx += 1;
          }
          return -1;
        }
        // non-zero numbers can utilise Set
        return list.indexOf(a, idx);

      // all these types can utilise Set
      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx);
        }
    }
  }
  // anything else not covered above, defer to R.equals
  while (idx < list.length) {
    if (equals(list[idx], a)) {
      return idx;
    }
    idx += 1;
  }
  return -1;
}
module.exports = _indexOf;
},{"../equals":62}],120:[function(require,module,exports){
var _has = /*#__PURE__*/require('./_has');

var toString = Object.prototype.toString;
var _isArguments = function () {
  return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
    return toString.call(x) === '[object Arguments]';
  } : function _isArguments(x) {
    return _has('callee', x);
  };
};

module.exports = _isArguments;
},{"./_has":117}],121:[function(require,module,exports){
/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
module.exports = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
};
},{}],122:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./_curry1');

var _isArray = /*#__PURE__*/require('./_isArray');

var _isString = /*#__PURE__*/require('./_isString');

/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */


var _isArrayLike = /*#__PURE__*/_curry1(function isArrayLike(x) {
  if (_isArray(x)) {
    return true;
  }
  if (!x) {
    return false;
  }
  if (typeof x !== 'object') {
    return false;
  }
  if (_isString(x)) {
    return false;
  }
  if (x.nodeType === 1) {
    return !!x.length;
  }
  if (x.length === 0) {
    return true;
  }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});
module.exports = _isArrayLike;
},{"./_curry1":105,"./_isArray":121,"./_isString":129}],123:[function(require,module,exports){
function _isFunction(x) {
  return Object.prototype.toString.call(x) === '[object Function]';
}
module.exports = _isFunction;
},{}],124:[function(require,module,exports){
/**
 * Determine if the passed argument is an integer.
 *
 * @private
 * @param {*} n
 * @category Type
 * @return {Boolean}
 */
module.exports = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};
},{}],125:[function(require,module,exports){
function _isNumber(x) {
  return Object.prototype.toString.call(x) === '[object Number]';
}
module.exports = _isNumber;
},{}],126:[function(require,module,exports){
function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}
module.exports = _isObject;
},{}],127:[function(require,module,exports){
function _isPlaceholder(a) {
       return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}
module.exports = _isPlaceholder;
},{}],128:[function(require,module,exports){
function _isRegExp(x) {
  return Object.prototype.toString.call(x) === '[object RegExp]';
}
module.exports = _isRegExp;
},{}],129:[function(require,module,exports){
function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}
module.exports = _isString;
},{}],130:[function(require,module,exports){
function _isTransformer(obj) {
  return typeof obj['@@transducer/step'] === 'function';
}
module.exports = _isTransformer;
},{}],131:[function(require,module,exports){
var _isArrayLike = /*#__PURE__*/require('./_isArrayLike');

/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @private
 */


function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while (idx < ilen) {
      if (_isArrayLike(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;
        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  };
}
module.exports = _makeFlat;
},{"./_isArrayLike":122}],132:[function(require,module,exports){
function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);
  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }
  return result;
}
module.exports = _map;
},{}],133:[function(require,module,exports){
var _has = /*#__PURE__*/require('./_has');

// Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign


function _objectAssign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  var idx = 1;
  var length = arguments.length;
  while (idx < length) {
    var source = arguments[idx];
    if (source != null) {
      for (var nextKey in source) {
        if (_has(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }
    idx += 1;
  }
  return output;
}
module.exports = _objectAssign;
},{"./_has":117}],134:[function(require,module,exports){
function _of(x) {
  return [x];
}
module.exports = _of;
},{}],135:[function(require,module,exports){
function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}
module.exports = _pipe;
},{}],136:[function(require,module,exports){
function _pipeP(f, g) {
  return function () {
    var ctx = this;
    return f.apply(ctx, arguments).then(function (x) {
      return g.call(ctx, x);
    });
  };
}
module.exports = _pipeP;
},{}],137:[function(require,module,exports){
function _quote(s) {
  var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b') // \b matches word boundary; [\b] matches backspace
  .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');

  return '"' + escaped.replace(/"/g, '\\"') + '"';
}
module.exports = _quote;
},{}],138:[function(require,module,exports){
var _isArrayLike = /*#__PURE__*/require('./_isArrayLike');

var _xwrap = /*#__PURE__*/require('./_xwrap');

var bind = /*#__PURE__*/require('../bind');

function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    idx += 1;
  }
  return xf['@@transducer/result'](acc);
}

function _iterableReduce(xf, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    step = iter.next();
  }
  return xf['@@transducer/result'](acc);
}

function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
}

var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';

function _reduce(fn, acc, list) {
  if (typeof fn === 'function') {
    fn = _xwrap(fn);
  }
  if (_isArrayLike(list)) {
    return _arrayReduce(fn, acc, list);
  }
  if (typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }
  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }
  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }
  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }

  throw new TypeError('reduce: list must be array or iterable');
}
module.exports = _reduce;
},{"../bind":23,"./_isArrayLike":122,"./_xwrap":163}],139:[function(require,module,exports){
function _reduced(x) {
  return x && x['@@transducer/reduced'] ? x : {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}
module.exports = _reduced;
},{}],140:[function(require,module,exports){
var _assign = /*#__PURE__*/require('./_assign');

var _identity = /*#__PURE__*/require('./_identity');

var _isArrayLike = /*#__PURE__*/require('./_isArrayLike');

var _isTransformer = /*#__PURE__*/require('./_isTransformer');

var objOf = /*#__PURE__*/require('../objOf');

var _stepCatArray = {
  '@@transducer/init': Array,
  '@@transducer/step': function (xs, x) {
    xs.push(x);
    return xs;
  },
  '@@transducer/result': _identity
};
var _stepCatString = {
  '@@transducer/init': String,
  '@@transducer/step': function (a, b) {
    return a + b;
  },
  '@@transducer/result': _identity
};
var _stepCatObject = {
  '@@transducer/init': Object,
  '@@transducer/step': function (result, input) {
    return _assign(result, _isArrayLike(input) ? objOf(input[0], input[1]) : input);
  },
  '@@transducer/result': _identity
};

function _stepCat(obj) {
  if (_isTransformer(obj)) {
    return obj;
  }
  if (_isArrayLike(obj)) {
    return _stepCatArray;
  }
  if (typeof obj === 'string') {
    return _stepCatString;
  }
  if (typeof obj === 'object') {
    return _stepCatObject;
  }
  throw new Error('Cannot create transformer for ' + obj);
}
module.exports = _stepCat;
},{"../objOf":219,"./_assign":96,"./_identity":118,"./_isArrayLike":122,"./_isTransformer":130}],141:[function(require,module,exports){
/**
 * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
 */
var pad = function pad(n) {
  return (n < 10 ? '0' : '') + n;
};

var _toISOString = typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
  return d.toISOString();
} : function _toISOString(d) {
  return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
};

module.exports = _toISOString;
},{}],142:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./_contains');

var _map = /*#__PURE__*/require('./_map');

var _quote = /*#__PURE__*/require('./_quote');

var _toISOString = /*#__PURE__*/require('./_toISOString');

var keys = /*#__PURE__*/require('../keys');

var reject = /*#__PURE__*/require('../reject');

function _toString(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    return _contains(y, xs) ? '<Circular>' : _toString(y, xs);
  };

  //  mapPairs :: (Object, [String]) -> [String]
  var mapPairs = function (obj, keys) {
    return _map(function (k) {
      return _quote(k) + ': ' + recur(obj[k]);
    }, keys.slice().sort());
  };

  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
    case '[object Array]':
      return '[' + _map(recur, x).concat(mapPairs(x, reject(function (k) {
        return (/^\d+$/.test(k)
        );
      }, keys(x)))).join(', ') + ']';
    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
    case '[object Date]':
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ')';
    case '[object Null]':
      return 'null';
    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
    case '[object Undefined]':
      return 'undefined';
    default:
      if (typeof x.toString === 'function') {
        var repr = x.toString();
        if (repr !== '[object Object]') {
          return repr;
        }
      }
      return '{' + mapPairs(x, keys(x)).join(', ') + '}';
  }
}
module.exports = _toString;
},{"../keys":175,"../reject":255,"./_contains":102,"./_map":132,"./_quote":137,"./_toISOString":141}],143:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XAll = /*#__PURE__*/function () {

  function XAll(f, xf) {
    this.xf = xf;
    this.f = f;
    this.all = true;
  }
  XAll.prototype['@@transducer/init'] = _xfBase.init;
  XAll.prototype['@@transducer/result'] = function (result) {
    if (this.all) {
      result = this.xf['@@transducer/step'](result, true);
    }
    return this.xf['@@transducer/result'](result);
  };
  XAll.prototype['@@transducer/step'] = function (result, input) {
    if (!this.f(input)) {
      this.all = false;
      result = _reduced(this.xf['@@transducer/step'](result, false));
    }
    return result;
  };

  return XAll;
}();

var _xall = /*#__PURE__*/_curry2(function _xall(f, xf) {
  return new XAll(f, xf);
});
module.exports = _xall;
},{"./_curry2":106,"./_reduced":139,"./_xfBase":152}],144:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XAny = /*#__PURE__*/function () {

  function XAny(f, xf) {
    this.xf = xf;
    this.f = f;
    this.any = false;
  }
  XAny.prototype['@@transducer/init'] = _xfBase.init;
  XAny.prototype['@@transducer/result'] = function (result) {
    if (!this.any) {
      result = this.xf['@@transducer/step'](result, false);
    }
    return this.xf['@@transducer/result'](result);
  };
  XAny.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.any = true;
      result = _reduced(this.xf['@@transducer/step'](result, true));
    }
    return result;
  };

  return XAny;
}();

var _xany = /*#__PURE__*/_curry2(function _xany(f, xf) {
  return new XAny(f, xf);
});
module.exports = _xany;
},{"./_curry2":106,"./_reduced":139,"./_xfBase":152}],145:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./_concat');

var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XAperture = /*#__PURE__*/function () {

  function XAperture(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }
  XAperture.prototype['@@transducer/init'] = _xfBase.init;
  XAperture.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };
  XAperture.prototype['@@transducer/step'] = function (result, input) {
    this.store(input);
    return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
  };
  XAperture.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;
    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };
  XAperture.prototype.getCopy = function () {
    return _concat(Array.prototype.slice.call(this.acc, this.pos), Array.prototype.slice.call(this.acc, 0, this.pos));
  };

  return XAperture;
}();

var _xaperture = /*#__PURE__*/_curry2(function _xaperture(n, xf) {
  return new XAperture(n, xf);
});
module.exports = _xaperture;
},{"./_concat":101,"./_curry2":106,"./_xfBase":152}],146:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _flatCat = /*#__PURE__*/require('./_flatCat');

var map = /*#__PURE__*/require('../map');

var _xchain = /*#__PURE__*/_curry2(function _xchain(f, xf) {
  return map(f, _flatCat(xf));
});
module.exports = _xchain;
},{"../map":188,"./_curry2":106,"./_flatCat":114}],147:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XDrop = /*#__PURE__*/function () {

  function XDrop(n, xf) {
    this.xf = xf;
    this.n = n;
  }
  XDrop.prototype['@@transducer/init'] = _xfBase.init;
  XDrop.prototype['@@transducer/result'] = _xfBase.result;
  XDrop.prototype['@@transducer/step'] = function (result, input) {
    if (this.n > 0) {
      this.n -= 1;
      return result;
    }
    return this.xf['@@transducer/step'](result, input);
  };

  return XDrop;
}();

var _xdrop = /*#__PURE__*/_curry2(function _xdrop(n, xf) {
  return new XDrop(n, xf);
});
module.exports = _xdrop;
},{"./_curry2":106,"./_xfBase":152}],148:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XDropLast = /*#__PURE__*/function () {

  function XDropLast(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }
  XDropLast.prototype['@@transducer/init'] = _xfBase.init;
  XDropLast.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };
  XDropLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.full) {
      result = this.xf['@@transducer/step'](result, this.acc[this.pos]);
    }
    this.store(input);
    return result;
  };
  XDropLast.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;
    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };

  return XDropLast;
}();

var _xdropLast = /*#__PURE__*/_curry2(function _xdropLast(n, xf) {
  return new XDropLast(n, xf);
});
module.exports = _xdropLast;
},{"./_curry2":106,"./_xfBase":152}],149:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduce = /*#__PURE__*/require('./_reduce');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XDropLastWhile = /*#__PURE__*/function () {

  function XDropLastWhile(fn, xf) {
    this.f = fn;
    this.retained = [];
    this.xf = xf;
  }
  XDropLastWhile.prototype['@@transducer/init'] = _xfBase.init;
  XDropLastWhile.prototype['@@transducer/result'] = function (result) {
    this.retained = null;
    return this.xf['@@transducer/result'](result);
  };
  XDropLastWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.retain(result, input) : this.flush(result, input);
  };
  XDropLastWhile.prototype.flush = function (result, input) {
    result = _reduce(this.xf['@@transducer/step'], result, this.retained);
    this.retained = [];
    return this.xf['@@transducer/step'](result, input);
  };
  XDropLastWhile.prototype.retain = function (result, input) {
    this.retained.push(input);
    return result;
  };

  return XDropLastWhile;
}();

var _xdropLastWhile = /*#__PURE__*/_curry2(function _xdropLastWhile(fn, xf) {
  return new XDropLastWhile(fn, xf);
});
module.exports = _xdropLastWhile;
},{"./_curry2":106,"./_reduce":138,"./_xfBase":152}],150:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XDropRepeatsWith = /*#__PURE__*/function () {

  function XDropRepeatsWith(pred, xf) {
    this.xf = xf;
    this.pred = pred;
    this.lastValue = undefined;
    this.seenFirstValue = false;
  }

  XDropRepeatsWith.prototype['@@transducer/init'] = _xfBase.init;
  XDropRepeatsWith.prototype['@@transducer/result'] = _xfBase.result;
  XDropRepeatsWith.prototype['@@transducer/step'] = function (result, input) {
    var sameAsLast = false;
    if (!this.seenFirstValue) {
      this.seenFirstValue = true;
    } else if (this.pred(this.lastValue, input)) {
      sameAsLast = true;
    }
    this.lastValue = input;
    return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
  };

  return XDropRepeatsWith;
}();

var _xdropRepeatsWith = /*#__PURE__*/_curry2(function _xdropRepeatsWith(pred, xf) {
  return new XDropRepeatsWith(pred, xf);
});
module.exports = _xdropRepeatsWith;
},{"./_curry2":106,"./_xfBase":152}],151:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XDropWhile = /*#__PURE__*/function () {

  function XDropWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XDropWhile.prototype['@@transducer/init'] = _xfBase.init;
  XDropWhile.prototype['@@transducer/result'] = _xfBase.result;
  XDropWhile.prototype['@@transducer/step'] = function (result, input) {
    if (this.f) {
      if (this.f(input)) {
        return result;
      }
      this.f = null;
    }
    return this.xf['@@transducer/step'](result, input);
  };

  return XDropWhile;
}();

var _xdropWhile = /*#__PURE__*/_curry2(function _xdropWhile(f, xf) {
  return new XDropWhile(f, xf);
});
module.exports = _xdropWhile;
},{"./_curry2":106,"./_xfBase":152}],152:[function(require,module,exports){
module.exports = {
  init: function () {
    return this.xf['@@transducer/init']();
  },
  result: function (result) {
    return this.xf['@@transducer/result'](result);
  }
};
},{}],153:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XFilter = /*#__PURE__*/function () {

  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter.prototype['@@transducer/init'] = _xfBase.init;
  XFilter.prototype['@@transducer/result'] = _xfBase.result;
  XFilter.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return XFilter;
}();

var _xfilter = /*#__PURE__*/_curry2(function _xfilter(f, xf) {
  return new XFilter(f, xf);
});
module.exports = _xfilter;
},{"./_curry2":106,"./_xfBase":152}],154:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XFind = /*#__PURE__*/function () {

  function XFind(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }
  XFind.prototype['@@transducer/init'] = _xfBase.init;
  XFind.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, void 0);
    }
    return this.xf['@@transducer/result'](result);
  };
  XFind.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, input));
    }
    return result;
  };

  return XFind;
}();

var _xfind = /*#__PURE__*/_curry2(function _xfind(f, xf) {
  return new XFind(f, xf);
});
module.exports = _xfind;
},{"./_curry2":106,"./_reduced":139,"./_xfBase":152}],155:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XFindIndex = /*#__PURE__*/function () {

  function XFindIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.found = false;
  }
  XFindIndex.prototype['@@transducer/init'] = _xfBase.init;
  XFindIndex.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, -1);
    }
    return this.xf['@@transducer/result'](result);
  };
  XFindIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf['@@transducer/step'](result, this.idx));
    }
    return result;
  };

  return XFindIndex;
}();

var _xfindIndex = /*#__PURE__*/_curry2(function _xfindIndex(f, xf) {
  return new XFindIndex(f, xf);
});
module.exports = _xfindIndex;
},{"./_curry2":106,"./_reduced":139,"./_xfBase":152}],156:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XFindLast = /*#__PURE__*/function () {

  function XFindLast(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFindLast.prototype['@@transducer/init'] = _xfBase.init;
  XFindLast.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
  };
  XFindLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.last = input;
    }
    return result;
  };

  return XFindLast;
}();

var _xfindLast = /*#__PURE__*/_curry2(function _xfindLast(f, xf) {
  return new XFindLast(f, xf);
});
module.exports = _xfindLast;
},{"./_curry2":106,"./_xfBase":152}],157:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XFindLastIndex = /*#__PURE__*/function () {

  function XFindLastIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.lastIdx = -1;
  }
  XFindLastIndex.prototype['@@transducer/init'] = _xfBase.init;
  XFindLastIndex.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
  };
  XFindLastIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;
    if (this.f(input)) {
      this.lastIdx = this.idx;
    }
    return result;
  };

  return XFindLastIndex;
}();

var _xfindLastIndex = /*#__PURE__*/_curry2(function _xfindLastIndex(f, xf) {
  return new XFindLastIndex(f, xf);
});
module.exports = _xfindLastIndex;
},{"./_curry2":106,"./_xfBase":152}],158:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XMap = /*#__PURE__*/function () {

  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XMap.prototype['@@transducer/init'] = _xfBase.init;
  XMap.prototype['@@transducer/result'] = _xfBase.result;
  XMap.prototype['@@transducer/step'] = function (result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
  };

  return XMap;
}();

var _xmap = /*#__PURE__*/_curry2(function _xmap(f, xf) {
  return new XMap(f, xf);
});
module.exports = _xmap;
},{"./_curry2":106,"./_xfBase":152}],159:[function(require,module,exports){
var _curryN = /*#__PURE__*/require('./_curryN');

var _has = /*#__PURE__*/require('./_has');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XReduceBy = /*#__PURE__*/function () {

  function XReduceBy(valueFn, valueAcc, keyFn, xf) {
    this.valueFn = valueFn;
    this.valueAcc = valueAcc;
    this.keyFn = keyFn;
    this.xf = xf;
    this.inputs = {};
  }
  XReduceBy.prototype['@@transducer/init'] = _xfBase.init;
  XReduceBy.prototype['@@transducer/result'] = function (result) {
    var key;
    for (key in this.inputs) {
      if (_has(key, this.inputs)) {
        result = this.xf['@@transducer/step'](result, this.inputs[key]);
        if (result['@@transducer/reduced']) {
          result = result['@@transducer/value'];
          break;
        }
      }
    }
    this.inputs = null;
    return this.xf['@@transducer/result'](result);
  };
  XReduceBy.prototype['@@transducer/step'] = function (result, input) {
    var key = this.keyFn(input);
    this.inputs[key] = this.inputs[key] || [key, this.valueAcc];
    this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
    return result;
  };

  return XReduceBy;
}();

var _xreduceBy = /*#__PURE__*/_curryN(4, [], function _xreduceBy(valueFn, valueAcc, keyFn, xf) {
  return new XReduceBy(valueFn, valueAcc, keyFn, xf);
});
module.exports = _xreduceBy;
},{"./_curryN":108,"./_has":117,"./_xfBase":152}],160:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XTake = /*#__PURE__*/function () {

  function XTake(n, xf) {
    this.xf = xf;
    this.n = n;
    this.i = 0;
  }
  XTake.prototype['@@transducer/init'] = _xfBase.init;
  XTake.prototype['@@transducer/result'] = _xfBase.result;
  XTake.prototype['@@transducer/step'] = function (result, input) {
    this.i += 1;
    var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);
    return this.n >= 0 && this.i >= this.n ? _reduced(ret) : ret;
  };

  return XTake;
}();

var _xtake = /*#__PURE__*/_curry2(function _xtake(n, xf) {
  return new XTake(n, xf);
});
module.exports = _xtake;
},{"./_curry2":106,"./_reduced":139,"./_xfBase":152}],161:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _reduced = /*#__PURE__*/require('./_reduced');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XTakeWhile = /*#__PURE__*/function () {

  function XTakeWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XTakeWhile.prototype['@@transducer/init'] = _xfBase.init;
  XTakeWhile.prototype['@@transducer/result'] = _xfBase.result;
  XTakeWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : _reduced(result);
  };

  return XTakeWhile;
}();

var _xtakeWhile = /*#__PURE__*/_curry2(function _xtakeWhile(f, xf) {
  return new XTakeWhile(f, xf);
});
module.exports = _xtakeWhile;
},{"./_curry2":106,"./_reduced":139,"./_xfBase":152}],162:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./_curry2');

var _xfBase = /*#__PURE__*/require('./_xfBase');

var XTap = /*#__PURE__*/function () {

  function XTap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XTap.prototype['@@transducer/init'] = _xfBase.init;
  XTap.prototype['@@transducer/result'] = _xfBase.result;
  XTap.prototype['@@transducer/step'] = function (result, input) {
    this.f(input);
    return this.xf['@@transducer/step'](result, input);
  };

  return XTap;
}();

var _xtap = /*#__PURE__*/_curry2(function _xtap(f, xf) {
  return new XTap(f, xf);
});
module.exports = _xtap;
},{"./_curry2":106,"./_xfBase":152}],163:[function(require,module,exports){
var XWrap = /*#__PURE__*/function () {
  function XWrap(fn) {
    this.f = fn;
  }
  XWrap.prototype['@@transducer/init'] = function () {
    throw new Error('init not implemented on XWrap');
  };
  XWrap.prototype['@@transducer/result'] = function (acc) {
    return acc;
  };
  XWrap.prototype['@@transducer/step'] = function (acc, x) {
    return this.f(acc, x);
  };

  return XWrap;
}();

function _xwrap(fn) {
  return new XWrap(fn);
}
module.exports = _xwrap;
},{}],164:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./internal/_contains');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _filter = /*#__PURE__*/require('./internal/_filter');

var flip = /*#__PURE__*/require('./flip');

var uniq = /*#__PURE__*/require('./uniq');

/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The list of elements found in both `list1` and `list2`.
 * @see R.innerJoin
 * @example
 *
 *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 */


var intersection = /*#__PURE__*/_curry2(function intersection(list1, list2) {
  var lookupList, filteredList;
  if (list1.length > list2.length) {
    lookupList = list1;
    filteredList = list2;
  } else {
    lookupList = list2;
    filteredList = list1;
  }
  return uniq(_filter(flip(_contains)(lookupList), filteredList));
});
module.exports = intersection;
},{"./flip":70,"./internal/_contains":102,"./internal/_curry2":106,"./internal/_filter":113,"./uniq":301}],165:[function(require,module,exports){
var _checkForMethod = /*#__PURE__*/require('./internal/_checkForMethod');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a new list with the separator interposed between elements.
 *
 * Dispatches to the `intersperse` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} separator The element to add to the list.
 * @param {Array} list The list to be interposed.
 * @return {Array} The new list.
 * @example
 *
 *      R.intersperse('n', ['ba', 'a', 'a']); //=> ['ba', 'n', 'a', 'n', 'a']
 */


var intersperse = /*#__PURE__*/_curry2( /*#__PURE__*/_checkForMethod('intersperse', function intersperse(separator, list) {
  var out = [];
  var idx = 0;
  var length = list.length;
  while (idx < length) {
    if (idx === length - 1) {
      out.push(list[idx]);
    } else {
      out.push(list[idx], separator);
    }
    idx += 1;
  }
  return out;
}));
module.exports = intersperse;
},{"./internal/_checkForMethod":97,"./internal/_curry2":106}],166:[function(require,module,exports){
var _clone = /*#__PURE__*/require('./internal/_clone');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _isTransformer = /*#__PURE__*/require('./internal/_isTransformer');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _stepCat = /*#__PURE__*/require('./internal/_stepCat');

/**
 * Transforms the items of the list with the transducer and appends the
 * transformed items to the accumulator using an appropriate iterator function
 * based on the accumulator type.
 *
 * The accumulator can be an array, string, object or a transformer. Iterated
 * items will be appended to arrays and concatenated to strings. Objects will
 * be merged directly or 2-item arrays will be merged as key, value pairs.
 *
 * The accumulator can also be a transformer object that provides a 2-arity
 * reducing iterator function, step, 0-arity initial value function, init, and
 * 1-arity result extraction function result. The step function is used as the
 * iterator function in reduce. The result function is used to convert the
 * final accumulator into the return type and in most cases is R.identity. The
 * init function is used to provide the initial accumulator.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the
 * transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig a -> (b -> b) -> [c] -> a
 * @param {*} acc The initial accumulator value.
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
 *
 *      R.into([], transducer, numbers); //=> [2, 3]
 *
 *      var intoArray = R.into([]);
 *      intoArray(transducer, numbers); //=> [2, 3]
 */


var into = /*#__PURE__*/_curry3(function into(acc, xf, list) {
  return _isTransformer(acc) ? _reduce(xf(acc), acc['@@transducer/init'](), list) : _reduce(xf(_stepCat(acc)), _clone(acc, [], [], false), list);
});
module.exports = into;
},{"./internal/_clone":98,"./internal/_curry3":107,"./internal/_isTransformer":130,"./internal/_reduce":138,"./internal/_stepCat":140}],167:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _has = /*#__PURE__*/require('./internal/_has');

var keys = /*#__PURE__*/require('./keys');

/**
 * Same as [`R.invertObj`](#invertObj), however this accounts for objects with
 * duplicate values by putting the values into an array.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: [ s, ... ]}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object with keys in an array.
 * @see R.invertObj
 * @example
 *
 *      var raceResultsByFirstName = {
 *        first: 'alice',
 *        second: 'jake',
 *        third: 'alice',
 *      };
 *      R.invert(raceResultsByFirstName);
 *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
 */


var invert = /*#__PURE__*/_curry1(function invert(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    var val = obj[key];
    var list = _has(val, out) ? out[val] : out[val] = [];
    list[list.length] = key;
    idx += 1;
  }
  return out;
});
module.exports = invert;
},{"./internal/_curry1":105,"./internal/_has":117,"./keys":175}],168:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var keys = /*#__PURE__*/require('./keys');

/**
 * Returns a new object with the keys of the given object as values, and the
 * values of the given object, which are coerced to strings, as keys. Note
 * that the last key found is preferred when handling the same value.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: s}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object
 * @see R.invert
 * @example
 *
 *      var raceResults = {
 *        first: 'alice',
 *        second: 'jake'
 *      };
 *      R.invertObj(raceResults);
 *      //=> { 'alice': 'first', 'jake':'second' }
 *
 *      // Alternatively:
 *      var raceResults = ['alice', 'jake'];
 *      R.invertObj(raceResults);
 *      //=> { 'alice': '0', 'jake':'1' }
 */


var invertObj = /*#__PURE__*/_curry1(function invertObj(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    out[obj[key]] = key;
    idx += 1;
  }
  return out;
});
module.exports = invertObj;
},{"./internal/_curry1":105,"./keys":175}],169:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isFunction = /*#__PURE__*/require('./internal/_isFunction');

var curryN = /*#__PURE__*/require('./curryN');

var toString = /*#__PURE__*/require('./toString');

/**
 * Turns a named method with a specified arity into a function that can be
 * called directly supplied with arguments and a target object.
 *
 * The returned function is curried and accepts `arity + 1` parameters where
 * the final parameter is the target object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
 * @param {Number} arity Number of arguments the returned function should take
 *        before the target object.
 * @param {String} method Name of the method to call.
 * @return {Function} A new curried function.
 * @see R.construct
 * @example
 *
 *      var sliceFrom = R.invoker(1, 'slice');
 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *      var sliceFrom6 = R.invoker(2, 'slice')(6);
 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 * @symb R.invoker(0, 'method')(o) = o['method']()
 * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
 * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
 */


var invoker = /*#__PURE__*/_curry2(function invoker(arity, method) {
  return curryN(arity + 1, function () {
    var target = arguments[arity];
    if (target != null && _isFunction(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }
    throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
  });
});
module.exports = invoker;
},{"./curryN":42,"./internal/_curry2":106,"./internal/_isFunction":123,"./toString":287}],170:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * See if an object (`val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Type
 * @sig (* -> {*}) -> a -> Boolean
 * @param {Object} ctor A constructor
 * @param {*} val The value to test
 * @return {Boolean}
 * @example
 *
 *      R.is(Object, {}); //=> true
 *      R.is(Number, 1); //=> true
 *      R.is(Object, 1); //=> false
 *      R.is(String, 's'); //=> true
 *      R.is(String, new String('')); //=> true
 *      R.is(Object, new String('')); //=> true
 *      R.is(Object, 's'); //=> false
 *      R.is(Number, {}); //=> false
 */


var is = /*#__PURE__*/_curry2(function is(Ctor, val) {
  return val != null && val.constructor === Ctor || val instanceof Ctor;
});
module.exports = is;
},{"./internal/_curry2":106}],171:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var empty = /*#__PURE__*/require('./empty');

var equals = /*#__PURE__*/require('./equals');

/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> Boolean
 * @param {*} x
 * @return {Boolean}
 * @see R.empty
 * @example
 *
 *      R.isEmpty([1, 2, 3]);   //=> false
 *      R.isEmpty([]);          //=> true
 *      R.isEmpty('');          //=> true
 *      R.isEmpty(null);        //=> false
 *      R.isEmpty({});          //=> true
 *      R.isEmpty({length: 0}); //=> false
 */


var isEmpty = /*#__PURE__*/_curry1(function isEmpty(x) {
  return x != null && equals(x, empty(x));
});
module.exports = isEmpty;
},{"./empty":58,"./equals":62,"./internal/_curry1":105}],172:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
 * @example
 *
 *      R.isNil(null); //=> true
 *      R.isNil(undefined); //=> true
 *      R.isNil(0); //=> false
 *      R.isNil([]); //=> false
 */


var isNil = /*#__PURE__*/_curry1(function isNil(x) {
  return x == null;
});
module.exports = isNil;
},{"./internal/_curry1":105}],173:[function(require,module,exports){
var invoker = /*#__PURE__*/require('./invoker');

/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig String -> [a] -> String
 * @param {Number|String} separator The string used to separate the elements.
 * @param {Array} xs The elements to join into a string.
 * @return {String} str The string made by concatenating `xs` with `separator`.
 * @see R.split
 * @example
 *
 *      var spacer = R.join(' ');
 *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
 *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
 */


var join = /*#__PURE__*/invoker(1, 'join');
module.exports = join;
},{"./invoker":169}],174:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var converge = /*#__PURE__*/require('./converge');

/**
 * juxt applies a list of functions to a list of values.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Function
 * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
 * @param {Array} fns An array of functions
 * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
 * @see R.applySpec
 * @example
 *
 *      var getRange = R.juxt([Math.min, Math.max]);
 *      getRange(3, 4, 9, -3); //=> [-3, 9]
 * @symb R.juxt([f, g, h])(a, b) = [f(a, b), g(a, b), h(a, b)]
 */


var juxt = /*#__PURE__*/_curry1(function juxt(fns) {
  return converge(function () {
    return Array.prototype.slice.call(arguments, 0);
  }, fns);
});
module.exports = juxt;
},{"./converge":39,"./internal/_curry1":105}],175:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _has = /*#__PURE__*/require('./internal/_has');

var _isArguments = /*#__PURE__*/require('./internal/_isArguments');

// cover IE < 9 keys issues


var hasEnumBug = ! /*#__PURE__*/{ toString: null }.propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
// Safari bug
var hasArgsEnumBug = /*#__PURE__*/function () {
  'use strict';

  return arguments.propertyIsEnumerable('length');
}();

var contains = function contains(list, item) {
  var idx = 0;
  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }
    idx += 1;
  }
  return false;
};

/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see R.keysIn, R.values
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */
var _keys = typeof Object.keys === 'function' && !hasArgsEnumBug ? function keys(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
} : function keys(obj) {
  if (Object(obj) !== obj) {
    return [];
  }
  var prop, nIdx;
  var ks = [];
  var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
  for (prop in obj) {
    if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
      ks[ks.length] = prop;
    }
  }
  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;
    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];
      if (_has(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }
      nIdx -= 1;
    }
  }
  return ks;
};
var keys = /*#__PURE__*/_curry1(_keys);
module.exports = keys;
},{"./internal/_curry1":105,"./internal/_has":117,"./internal/_isArguments":120}],176:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Returns a list containing the names of all the properties of the supplied
 * object, including prototype properties.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own and prototype properties.
 * @see R.keys, R.valuesIn
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.keysIn(f); //=> ['x', 'y']
 */


var keysIn = /*#__PURE__*/_curry1(function keysIn(obj) {
  var prop;
  var ks = [];
  for (prop in obj) {
    ks[ks.length] = prop;
  }
  return ks;
});
module.exports = keysIn;
},{"./internal/_curry1":105}],177:[function(require,module,exports){
var nth = /*#__PURE__*/require('./nth');

/**
 * Returns the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.init, R.head, R.tail
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 *      R.last([]); //=> undefined
 *
 *      R.last('abc'); //=> 'c'
 *      R.last(''); //=> ''
 */


var last = /*#__PURE__*/nth(-1);
module.exports = last;
},{"./nth":216}],178:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isArray = /*#__PURE__*/require('./internal/_isArray');

var equals = /*#__PURE__*/require('./equals');

/**
 * Returns the position of the last occurrence of an item in an array, or -1 if
 * the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.indexOf
 * @example
 *
 *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
 *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
 */


var lastIndexOf = /*#__PURE__*/_curry2(function lastIndexOf(target, xs) {
  if (typeof xs.lastIndexOf === 'function' && !_isArray(xs)) {
    return xs.lastIndexOf(target);
  } else {
    var idx = xs.length - 1;
    while (idx >= 0) {
      if (equals(xs[idx], target)) {
        return idx;
      }
      idx -= 1;
    }
    return -1;
  }
});
module.exports = lastIndexOf;
},{"./equals":62,"./internal/_curry2":106,"./internal/_isArray":121}],179:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _isNumber = /*#__PURE__*/require('./internal/_isNumber');

/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [a] -> Number
 * @param {Array} list The array to inspect.
 * @return {Number} The length of the array.
 * @example
 *
 *      R.length([]); //=> 0
 *      R.length([1, 2, 3]); //=> 3
 */


var length = /*#__PURE__*/_curry1(function length(list) {
  return list != null && _isNumber(list.length) ? list.length : NaN;
});
module.exports = length;
},{"./internal/_curry1":105,"./internal/_isNumber":125}],180:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var map = /*#__PURE__*/require('./map');

/**
 * Returns a lens for the given getter and setter functions. The getter "gets"
 * the value of the focus; the setter "sets" the value of the focus. The setter
 * should not mutate the data structure.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
 * @param {Function} getter
 * @param {Function} setter
 * @return {Lens}
 * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lens(R.prop('x'), R.assoc('x'));
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */


var lens = /*#__PURE__*/_curry2(function lens(getter, setter) {
  return function (toFunctorFn) {
    return function (target) {
      return map(function (focus) {
        return setter(focus, target);
      }, toFunctorFn(getter(target)));
    };
  };
});
module.exports = lens;
},{"./internal/_curry2":106,"./map":188}],181:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var lens = /*#__PURE__*/require('./lens');

var nth = /*#__PURE__*/require('./nth');

var update = /*#__PURE__*/require('./update');

/**
 * Returns a lens whose focus is the specified index.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Number -> Lens s a
 * @param {Number} n
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *
 *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
 *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
 *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
 */


var lensIndex = /*#__PURE__*/_curry1(function lensIndex(n) {
  return lens(nth(n), update(n));
});
module.exports = lensIndex;
},{"./internal/_curry1":105,"./lens":180,"./nth":216,"./update":307}],182:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var assocPath = /*#__PURE__*/require('./assocPath');

var lens = /*#__PURE__*/require('./lens');

var path = /*#__PURE__*/require('./path');

/**
 * Returns a lens whose focus is the specified path.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @typedefn Idx = String | Int
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig [Idx] -> Lens s a
 * @param {Array} path The path to use.
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var xHeadYLens = R.lensPath(['x', 0, 'y']);
 *
 *      R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> 2
 *      R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
 *      R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
 */


var lensPath = /*#__PURE__*/_curry1(function lensPath(p) {
  return lens(path(p), assocPath(p));
});
module.exports = lensPath;
},{"./assocPath":21,"./internal/_curry1":105,"./lens":180,"./path":229}],183:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var assoc = /*#__PURE__*/require('./assoc');

var lens = /*#__PURE__*/require('./lens');

var prop = /*#__PURE__*/require('./prop');

/**
 * Returns a lens whose focus is the specified property.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig String -> Lens s a
 * @param {String} k
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */


var lensProp = /*#__PURE__*/_curry1(function lensProp(k) {
  return lens(prop(k), assoc(k));
});
module.exports = lensProp;
},{"./assoc":20,"./internal/_curry1":105,"./lens":180,"./prop":243}],184:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var liftN = /*#__PURE__*/require('./liftN');

/**
 * "lifts" a function of arity > 1 so that it may "map over" a list, Function or other
 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.liftN
 * @example
 *
 *      var madd3 = R.lift((a, b, c) => a + b + c);
 *
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 *
 *      var madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
 *
 *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
 */


var lift = /*#__PURE__*/_curry1(function lift(fn) {
  return liftN(fn.length, fn);
});
module.exports = lift;
},{"./internal/_curry1":105,"./liftN":185}],185:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var ap = /*#__PURE__*/require('./ap');

var curryN = /*#__PURE__*/require('./curryN');

var map = /*#__PURE__*/require('./map');

/**
 * "lifts" a function to be the specified arity, so that it may "map over" that
 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig Number -> (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.lift, R.ap
 * @example
 *
 *      var madd3 = R.liftN(3, (...args) => R.sum(args));
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 */


var liftN = /*#__PURE__*/_curry2(function liftN(arity, fn) {
  var lifted = curryN(arity, fn);
  return curryN(arity, function () {
    return _reduce(ap, map(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
  });
});
module.exports = liftN;
},{"./ap":13,"./curryN":42,"./internal/_curry2":106,"./internal/_reduce":138,"./map":188}],186:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.gt
 * @example
 *
 *      R.lt(2, 1); //=> false
 *      R.lt(2, 2); //=> false
 *      R.lt(2, 3); //=> true
 *      R.lt('a', 'z'); //=> true
 *      R.lt('z', 'a'); //=> false
 */


var lt = /*#__PURE__*/_curry2(function lt(a, b) {
  return a < b;
});
module.exports = lt;
},{"./internal/_curry2":106}],187:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if the first argument is less than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.gte
 * @example
 *
 *      R.lte(2, 1); //=> false
 *      R.lte(2, 2); //=> true
 *      R.lte(2, 3); //=> true
 *      R.lte('a', 'z'); //=> true
 *      R.lte('z', 'a'); //=> false
 */


var lte = /*#__PURE__*/_curry2(function lte(a, b) {
  return a <= b;
});
module.exports = lte;
},{"./internal/_curry2":106}],188:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _map = /*#__PURE__*/require('./internal/_map');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _xmap = /*#__PURE__*/require('./internal/_xmap');

var curryN = /*#__PURE__*/require('./curryN');

var keys = /*#__PURE__*/require('./keys');

/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex
 * @example
 *
 *      var double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */


var map = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['fantasy-land/map', 'map'], _xmap, function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return curryN(functor.length, function () {
        return fn.call(this, functor.apply(this, arguments));
      });
    case '[object Object]':
      return _reduce(function (acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, keys(functor));
    default:
      return _map(fn, functor);
  }
}));
module.exports = map;
},{"./curryN":42,"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_map":132,"./internal/_reduce":138,"./internal/_xmap":158,"./keys":175}],189:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * The `mapAccum` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from left to right, and returning a final value of this
 * accumulator together with the new list.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((acc, x) -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex, R.mapAccumRight
 * @example
 *
 *      var digits = ['1', '2', '3', '4'];
 *      var appender = (a, b) => [a + b, a + b];
 *
 *      R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
 * @symb R.mapAccum(f, a, [b, c, d]) = [
 *   f(f(f(a, b)[0], c)[0], d)[0],
 *   [
 *     f(a, b)[1],
 *     f(f(a, b)[0], c)[1],
 *     f(f(f(a, b)[0], c)[0], d)[1]
 *   ]
 * ]
 */


var mapAccum = /*#__PURE__*/_curry3(function mapAccum(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var tuple = [acc];
  while (idx < len) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx += 1;
  }
  return [tuple[0], result];
});
module.exports = mapAccum;
},{"./internal/_curry3":107}],190:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * The `mapAccumRight` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from right to left, and returning a final value of this
 * accumulator together with the new list.
 *
 * Similar to [`mapAccum`](#mapAccum), except moves through the input list from
 * the right to the left.
 *
 * The iterator function receives two arguments, *value* and *acc*, and should
 * return a tuple *[value, acc]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((x, acc) -> (y, acc)) -> acc -> [x] -> ([y], acc)
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex, R.mapAccum
 * @example
 *
 *      var digits = ['1', '2', '3', '4'];
 *      var append = (a, b) => [a + b, a + b];
 *
 *      R.mapAccumRight(append, 5, digits); //=> [['12345', '2345', '345', '45'], '12345']
 * @symb R.mapAccumRight(f, a, [b, c, d]) = [
 *   [
 *     f(b, f(c, f(d, a)[0])[0])[1],
 *     f(c, f(d, a)[0])[1],
 *     f(d, a)[1],
 *   ]
 *   f(b, f(c, f(d, a)[0])[0])[0],
 * ]
 */


var mapAccumRight = /*#__PURE__*/_curry3(function mapAccumRight(fn, acc, list) {
  var idx = list.length - 1;
  var result = [];
  var tuple = [acc];
  while (idx >= 0) {
    tuple = fn(list[idx], tuple[0]);
    result[idx] = tuple[1];
    idx -= 1;
  }
  return [result, tuple[0]];
});
module.exports = mapAccumRight;
},{"./internal/_curry3":107}],191:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var keys = /*#__PURE__*/require('./keys');

/**
 * An Object-specific version of [`map`](#map). The function is applied to three
 * arguments: *(value, key, obj)*. If only the value is significant, use
 * [`map`](#map) instead.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig ((*, String, Object) -> *) -> Object -> Object
 * @param {Function} fn
 * @param {Object} obj
 * @return {Object}
 * @see R.map
 * @example
 *
 *      var values = { x: 1, y: 2, z: 3 };
 *      var prependKeyAndDouble = (num, key, obj) => key + (num * 2);
 *
 *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
 */


var mapObjIndexed = /*#__PURE__*/_curry2(function mapObjIndexed(fn, obj) {
  return _reduce(function (acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, keys(obj));
});
module.exports = mapObjIndexed;
},{"./internal/_curry2":106,"./internal/_reduce":138,"./keys":175}],192:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Tests a regular expression against a String. Note that this function will
 * return an empty array when there are no matches. This differs from
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig RegExp -> String -> [String | Undefined]
 * @param {RegExp} rx A regular expression.
 * @param {String} str The string to match against
 * @return {Array} The list of matches or empty array.
 * @see R.test
 * @example
 *
 *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 *      R.match(/a/, 'b'); //=> []
 *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
 */


var match = /*#__PURE__*/_curry2(function match(rx, str) {
  return str.match(rx) || [];
});
module.exports = match;
},{"./internal/_curry2":106}],193:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isInteger = /*#__PURE__*/require('./internal/_isInteger');

/**
 * `mathMod` behaves like the modulo operator should mathematically, unlike the
 * `%` operator (and by extension, [`R.modulo`](#modulo)). So while
 * `-17 % 5` is `-2`, `mathMod(-17, 5)` is `3`. `mathMod` requires Integer
 * arguments, and returns NaN when the modulus is zero or negative.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} m The dividend.
 * @param {Number} p the modulus.
 * @return {Number} The result of `b mod a`.
 * @see R.modulo
 * @example
 *
 *      R.mathMod(-17, 5);  //=> 3
 *      R.mathMod(17, 5);   //=> 2
 *      R.mathMod(17, -5);  //=> NaN
 *      R.mathMod(17, 0);   //=> NaN
 *      R.mathMod(17.2, 5); //=> NaN
 *      R.mathMod(17, 5.3); //=> NaN
 *
 *      var clock = R.mathMod(R.__, 12);
 *      clock(15); //=> 3
 *      clock(24); //=> 0
 *
 *      var seventeenMod = R.mathMod(17);
 *      seventeenMod(3);  //=> 2
 *      seventeenMod(4);  //=> 1
 *      seventeenMod(10); //=> 7
 */


var mathMod = /*#__PURE__*/_curry2(function mathMod(m, p) {
  if (!_isInteger(m)) {
    return NaN;
  }
  if (!_isInteger(p) || p < 1) {
    return NaN;
  }
  return (m % p + p) % p;
});
module.exports = mathMod;
},{"./internal/_curry2":106,"./internal/_isInteger":124}],194:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns the larger of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.maxBy, R.min
 * @example
 *
 *      R.max(789, 123); //=> 789
 *      R.max('a', 'b'); //=> 'b'
 */


var max = /*#__PURE__*/_curry2(function max(a, b) {
  return b > a ? b : a;
});
module.exports = max;
},{"./internal/_curry2":106}],195:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Takes a function and two values, and returns whichever value produces the
 * larger result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.max, R.minBy
 * @example
 *
 *      //  square :: Number -> Number
 *      var square = n => n * n;
 *
 *      R.maxBy(square, -3, 2); //=> -3
 *
 *      R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
 *      R.reduce(R.maxBy(square), 0, []); //=> 0
 */


var maxBy = /*#__PURE__*/_curry3(function maxBy(f, a, b) {
  return f(b) > f(a) ? b : a;
});
module.exports = maxBy;
},{"./internal/_curry3":107}],196:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var sum = /*#__PURE__*/require('./sum');

/**
 * Returns the mean of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.median
 * @example
 *
 *      R.mean([2, 7, 9]); //=> 6
 *      R.mean([]); //=> NaN
 */


var mean = /*#__PURE__*/_curry1(function mean(list) {
  return sum(list) / list.length;
});
module.exports = mean;
},{"./internal/_curry1":105,"./sum":273}],197:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var mean = /*#__PURE__*/require('./mean');

/**
 * Returns the median of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.mean
 * @example
 *
 *      R.median([2, 9, 7]); //=> 7
 *      R.median([7, 2, 10, 9]); //=> 8
 *      R.median([]); //=> NaN
 */


var median = /*#__PURE__*/_curry1(function median(list) {
  var len = list.length;
  if (len === 0) {
    return NaN;
  }
  var width = 2 - len % 2;
  var idx = (len - width) / 2;
  return mean(Array.prototype.slice.call(list, 0).sort(function (a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }).slice(idx, idx + width));
});
module.exports = median;
},{"./internal/_curry1":105,"./mean":196}],198:[function(require,module,exports){
var memoizeWith = /*#__PURE__*/require('./memoizeWith');

var toString = /*#__PURE__*/require('./toString');

/**
 * Creates a new function that, when invoked, caches the result of calling `fn`
 * for a given argument set and returns the result. Subsequent calls to the
 * memoized `fn` with the same argument set will not result in an additional
 * call to `fn`; instead, the cached result for that set of arguments will be
 * returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (*... -> a) -> (*... -> a)
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @see R.memoizeWith
 * @deprecated since v0.25.0
 * @example
 *
 *      let count = 0;
 *      const factorial = R.memoize(n => {
 *        count += 1;
 *        return R.product(R.range(1, n + 1));
 *      });
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      count; //=> 1
 */


var memoize = /*#__PURE__*/memoizeWith(function () {
  return toString(arguments);
});
module.exports = memoize;
},{"./memoizeWith":199,"./toString":287}],199:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * A customisable version of [`R.memoize`](#memoize). `memoizeWith` takes an
 * additional function that will be applied to a given argument set and used to
 * create the cache key under which the results of the function to be memoized
 * will be stored. Care must be taken when implementing key generation to avoid
 * clashes that may overwrite previous entries erroneously.
 *
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (*... -> String) -> (*... -> a) -> (*... -> a)
 * @param {Function} fn The function to generate the cache key.
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @see R.memoize
 * @example
 *
 *      let count = 0;
 *      const factorial = R.memoizeWith(R.identity, n => {
 *        count += 1;
 *        return R.product(R.range(1, n + 1));
 *      });
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      count; //=> 1
 */


var memoizeWith = /*#__PURE__*/_curry2(function memoizeWith(mFn, fn) {
  var cache = {};
  return _arity(fn.length, function () {
    var key = mFn.apply(this, arguments);
    if (!_has(key, cache)) {
      cache[key] = fn.apply(this, arguments);
    }
    return cache[key];
  });
});
module.exports = memoizeWith;
},{"./internal/_arity":94,"./internal/_curry2":106,"./internal/_has":117}],200:[function(require,module,exports){
var _assign = /*#__PURE__*/require('./internal/_assign');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepRight, R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      var resetToDefault = R.merge(R.__, {x: 0});
 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 * @symb R.merge({ x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: 5, z: 3 }
 */


var merge = /*#__PURE__*/_curry2(function merge(l, r) {
  return _assign({}, l, r);
});
module.exports = merge;
},{"./internal/_assign":96,"./internal/_curry2":106}],201:[function(require,module,exports){
var _assign = /*#__PURE__*/require('./internal/_assign');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Merges a list of objects together into one object.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig [{k: v}] -> {k: v}
 * @param {Array} list An array of objects
 * @return {Object} A merged object.
 * @see R.reduce
 * @example
 *
 *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
 *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
 * @symb R.mergeAll([{ x: 1 }, { y: 2 }, { z: 3 }]) = { x: 1, y: 2, z: 3 }
 */


var mergeAll = /*#__PURE__*/_curry1(function mergeAll(list) {
  return _assign.apply(null, [{}].concat(list));
});
module.exports = mergeAll;
},{"./internal/_assign":96,"./internal/_curry1":105}],202:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var mergeDeepWithKey = /*#__PURE__*/require('./mergeDeepWithKey');

/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the first object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepRight, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepLeft({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                      { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}
 */


var mergeDeepLeft = /*#__PURE__*/_curry2(function mergeDeepLeft(lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return lVal;
  }, lObj, rObj);
});
module.exports = mergeDeepLeft;
},{"./internal/_curry2":106,"./mergeDeepWithKey":205}],203:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var mergeDeepWithKey = /*#__PURE__*/require('./mergeDeepWithKey');

/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepLeft, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepRight({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                       { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}
 */


var mergeDeepRight = /*#__PURE__*/_curry2(function mergeDeepRight(lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return rVal;
  }, lObj, rObj);
});
module.exports = mergeDeepRight;
},{"./internal/_curry2":106,"./mergeDeepWithKey":205}],204:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var mergeDeepWithKey = /*#__PURE__*/require('./mergeDeepWithKey');

/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to associated values using the
 *   resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWith, R.mergeDeep, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepWith(R.concat,
 *                      { a: true, c: { values: [10, 20] }},
 *                      { b: true, c: { values: [15, 35] }});
 *      //=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}
 */


var mergeDeepWith = /*#__PURE__*/_curry3(function mergeDeepWith(fn, lObj, rObj) {
  return mergeDeepWithKey(function (k, lVal, rVal) {
    return fn(lVal, rVal);
  }, lObj, rObj);
});
module.exports = mergeDeepWith;
},{"./internal/_curry3":107,"./mergeDeepWithKey":205}],205:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _isObject = /*#__PURE__*/require('./internal/_isObject');

var mergeWithKey = /*#__PURE__*/require('./mergeWithKey');

/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to the key and associated values
 *   using the resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWithKey, R.mergeDeep, R.mergeDeepWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeDeepWithKey(concatValues,
 *                         { a: true, c: { thing: 'foo', values: [10, 20] }},
 *                         { b: true, c: { thing: 'bar', values: [15, 35] }});
 *      //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
 */


var mergeDeepWithKey = /*#__PURE__*/_curry3(function mergeDeepWithKey(fn, lObj, rObj) {
  return mergeWithKey(function (k, lVal, rVal) {
    if (_isObject(lVal) && _isObject(rVal)) {
      return mergeDeepWithKey(fn, lVal, rVal);
    } else {
      return fn(k, lVal, rVal);
    }
  }, lObj, rObj);
});
module.exports = mergeDeepWithKey;
},{"./internal/_curry3":107,"./internal/_isObject":126,"./mergeWithKey":207}],206:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var mergeWithKey = /*#__PURE__*/require('./mergeWithKey');

/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the values
 * associated with the key in each object, with the result being used as the
 * value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWith, R.merge, R.mergeWithKey
 * @example
 *
 *      R.mergeWith(R.concat,
 *                  { a: true, values: [10, 20] },
 *                  { b: true, values: [15, 35] });
 *      //=> { a: true, b: true, values: [10, 20, 15, 35] }
 */


var mergeWith = /*#__PURE__*/_curry3(function mergeWith(fn, l, r) {
  return mergeWithKey(function (_, _l, _r) {
    return fn(_l, _r);
  }, l, r);
});
module.exports = mergeWith;
},{"./internal/_curry3":107,"./mergeWithKey":207}],207:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWithKey, R.merge, R.mergeWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeWithKey(concatValues,
 *                     { a: true, thing: 'foo', values: [10, 20] },
 *                     { b: true, thing: 'bar', values: [15, 35] });
 *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
 * @symb R.mergeWithKey(f, { x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: f('y', 2, 5), z: 3 }
 */


var mergeWithKey = /*#__PURE__*/_curry3(function mergeWithKey(fn, l, r) {
  var result = {};
  var k;

  for (k in l) {
    if (_has(k, l)) {
      result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }

  for (k in r) {
    if (_has(k, r) && !_has(k, result)) {
      result[k] = r[k];
    }
  }

  return result;
});
module.exports = mergeWithKey;
},{"./internal/_curry3":107,"./internal/_has":117}],208:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns the smaller of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.minBy, R.max
 * @example
 *
 *      R.min(789, 123); //=> 123
 *      R.min('a', 'b'); //=> 'a'
 */


var min = /*#__PURE__*/_curry2(function min(a, b) {
  return b < a ? b : a;
});
module.exports = min;
},{"./internal/_curry2":106}],209:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Takes a function and two values, and returns whichever value produces the
 * smaller result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.min, R.maxBy
 * @example
 *
 *      //  square :: Number -> Number
 *      var square = n => n * n;
 *
 *      R.minBy(square, -3, 2); //=> 2
 *
 *      R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
 *      R.reduce(R.minBy(square), Infinity, []); //=> Infinity
 */


var minBy = /*#__PURE__*/_curry3(function minBy(f, a, b) {
  return f(b) < f(a) ? b : a;
});
module.exports = minBy;
},{"./internal/_curry3":107}],210:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Divides the first parameter by the second and returns the remainder. Note
 * that this function preserves the JavaScript-style behavior for modulo. For
 * mathematical modulo see [`mathMod`](#mathMod).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The value to the divide.
 * @param {Number} b The pseudo-modulus
 * @return {Number} The result of `b % a`.
 * @see R.mathMod
 * @example
 *
 *      R.modulo(17, 3); //=> 2
 *      // JS behavior:
 *      R.modulo(-17, 3); //=> -2
 *      R.modulo(17, -3); //=> 2
 *
 *      var isOdd = R.modulo(R.__, 2);
 *      isOdd(42); //=> 0
 *      isOdd(21); //=> 1
 */


var modulo = /*#__PURE__*/_curry2(function modulo(a, b) {
  return a % b;
});
module.exports = modulo;
},{"./internal/_curry2":106}],211:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a * b`.
 * @see R.divide
 * @example
 *
 *      var double = R.multiply(2);
 *      var triple = R.multiply(3);
 *      double(3);       //=>  6
 *      triple(4);       //=> 12
 *      R.multiply(2, 5);  //=> 10
 */


var multiply = /*#__PURE__*/_curry2(function multiply(a, b) {
  return a * b;
});
module.exports = multiply;
},{"./internal/_curry2":106}],212:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} n The desired arity of the new function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity `n`.
 * @see R.binary, R.unary
 * @example
 *
 *      var takesTwoArgs = (a, b) => [a, b];
 *
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      var takesOneArg = R.nAry(1, takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only `n` arguments are passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.nAry(0, f)(a, b) = f()
 * @symb R.nAry(1, f)(a, b) = f(a)
 * @symb R.nAry(2, f)(a, b) = f(a, b)
 */


var nAry = /*#__PURE__*/_curry2(function nAry(n, fn) {
  switch (n) {
    case 0:
      return function () {
        return fn.call(this);
      };
    case 1:
      return function (a0) {
        return fn.call(this, a0);
      };
    case 2:
      return function (a0, a1) {
        return fn.call(this, a0, a1);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.call(this, a0, a1, a2);
      };
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.call(this, a0, a1, a2, a3);
      };
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.call(this, a0, a1, a2, a3, a4);
      };
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.call(this, a0, a1, a2, a3, a4, a5);
      };
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
      };
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
      };
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
      };
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
      };
    default:
      throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
  }
});
module.exports = nAry;
},{"./internal/_curry2":106}],213:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Negates its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number}
 * @example
 *
 *      R.negate(42); //=> -42
 */


var negate = /*#__PURE__*/_curry1(function negate(n) {
  return -n;
});
module.exports = negate;
},{"./internal/_curry1":105}],214:[function(require,module,exports){
var _complement = /*#__PURE__*/require('./internal/_complement');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xany = /*#__PURE__*/require('./internal/_xany');

var any = /*#__PURE__*/require('./any');

/**
 * Returns `true` if no elements of the list match the predicate, `false`
 * otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
 * @see R.all, R.any
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *      var isOdd = n => n % 2 === 1;
 *
 *      R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
 *      R.none(isOdd, [1, 3, 5, 7, 8, 11]); //=> false
 */


var none = /*#__PURE__*/_curry2( /*#__PURE__*/_complement( /*#__PURE__*/_dispatchable(['any'], _xany, any)));
module.exports = none;
},{"./any":11,"./internal/_complement":100,"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_xany":144}],215:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig * -> Boolean
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @see R.complement
 * @example
 *
 *      R.not(true); //=> false
 *      R.not(false); //=> true
 *      R.not(0); //=> true
 *      R.not(1); //=> false
 */


var not = /*#__PURE__*/_curry1(function not(a) {
  return !a;
});
module.exports = not;
},{"./internal/_curry1":105}],216:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isString = /*#__PURE__*/require('./internal/_isString');

/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      var list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth(2, 'abc'); //=> 'c'
 *      R.nth(3, 'abc'); //=> ''
 * @symb R.nth(-1, [a, b, c]) = c
 * @symb R.nth(0, [a, b, c]) = a
 * @symb R.nth(1, [a, b, c]) = b
 */


var nth = /*#__PURE__*/_curry2(function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString(list) ? list.charAt(idx) : list[idx];
});
module.exports = nth;
},{"./internal/_curry2":106,"./internal/_isString":129}],217:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var curryN = /*#__PURE__*/require('./curryN');

var nth = /*#__PURE__*/require('./nth');

/**
 * Returns a function which returns its nth argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig Number -> *... -> *
 * @param {Number} n
 * @return {Function}
 * @example
 *
 *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
 *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
 * @symb R.nthArg(-1)(a, b, c) = c
 * @symb R.nthArg(0)(a, b, c) = a
 * @symb R.nthArg(1)(a, b, c) = b
 */


var nthArg = /*#__PURE__*/_curry1(function nthArg(n) {
  var arity = n < 0 ? 1 : n + 1;
  return curryN(arity, function () {
    return nth(n, arguments);
  });
});
module.exports = nthArg;
},{"./curryN":42,"./internal/_curry1":105,"./nth":216}],218:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * `o` is a curried composition function that returns a unary function.
 * Like [`compose`](#compose), `o` performs right-to-left function composition.
 * Unlike [`compose`](#compose), the rightmost function passed to `o` will be
 * invoked with only one argument.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (b -> c) -> (a -> b) -> a -> c
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 * @see R.compose, R.pipe
 * @example
 *
 *      var classyGreeting = name => "The name's " + name.last + ", " + name.first + " " + name.last
 *      var yellGreeting = R.o(R.toUpper, classyGreeting);
 *      yellGreeting({first: 'James', last: 'Bond'}); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.o(R.multiply(10), R.add(10))(-4) //=> 60
 *
 * @symb R.o(f, g, x) = f(g(x))
 */


var o = /*#__PURE__*/_curry3(function o(f, g, x) {
  return f(g(x));
});
module.exports = o;
},{"./internal/_curry3":107}],219:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates an object containing a single key:value pair.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @sig String -> a -> {String:a}
 * @param {String} key
 * @param {*} val
 * @return {Object}
 * @see R.pair
 * @example
 *
 *      var matchPhrases = R.compose(
 *        R.objOf('must'),
 *        R.map(R.objOf('match_phrase'))
 *      );
 *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 */


var objOf = /*#__PURE__*/_curry2(function objOf(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
});
module.exports = objOf;
},{"./internal/_curry2":106}],220:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _of = /*#__PURE__*/require('./internal/_of');

/**
 * Returns a singleton array containing the value provided.
 *
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> [a]
 * @param {*} x any value
 * @return {Array} An array wrapping `x`.
 * @example
 *
 *      R.of(null); //=> [null]
 *      R.of([42]); //=> [[42]]
 */


var of = /*#__PURE__*/_curry1(_of);
module.exports = of;
},{"./internal/_curry1":105,"./internal/_of":134}],221:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [String] -> {String: *} -> {String: *}
 * @param {Array} names an array of String property names to omit from the new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with properties from `names` not on it.
 * @see R.pick
 * @example
 *
 *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
 */


var omit = /*#__PURE__*/_curry2(function omit(names, obj) {
  var result = {};
  var index = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    index[names[idx]] = 1;
    idx += 1;
  }

  for (var prop in obj) {
    if (!index.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
  }
  return result;
});
module.exports = omit;
},{"./internal/_curry2":106}],222:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a... -> b) -> (a... -> b)
 * @param {Function} fn The function to wrap in a call-only-once wrapper.
 * @return {Function} The wrapped function.
 * @example
 *
 *      var addOneOnce = R.once(x => x + 1);
 *      addOneOnce(10); //=> 11
 *      addOneOnce(addOneOnce(50)); //=> 11
 */


var once = /*#__PURE__*/_curry1(function once(fn) {
  var called = false;
  var result;
  return _arity(fn.length, function () {
    if (called) {
      return result;
    }
    called = true;
    result = fn.apply(this, arguments);
    return result;
  });
});
module.exports = once;
},{"./internal/_arity":94,"./internal/_curry1":105}],223:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns `true` if one or both of its arguments are `true`. Returns `false`
 * if both arguments are `false`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if truthy, otherwise the second argument.
 * @see R.either
 * @example
 *
 *      R.or(true, true); //=> true
 *      R.or(true, false); //=> true
 *      R.or(false, true); //=> true
 *      R.or(false, false); //=> false
 */


var or = /*#__PURE__*/_curry2(function or(a, b) {
  return a || b;
});
module.exports = or;
},{"./internal/_curry2":106}],224:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

// `Identity` is a functor that holds a single value, where `map` simply
// transforms the held value with the provided function.


var Identity = function (x) {
  return { value: x, map: function (f) {
      return Identity(f(x));
    } };
};

/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the result of applying the given function to
 * the focused value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> (a -> a) -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var headLens = R.lensIndex(0);
 *
 *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
 */
var over = /*#__PURE__*/_curry3(function over(lens, f, x) {
  // The value returned by the getter function is first transformed with `f`,
  // then set as the value of an `Identity`. This is then mapped over with the
  // setter function of the lens.
  return lens(function (y) {
    return Identity(f(y));
  })(x).value;
});
module.exports = over;
},{"./internal/_curry3":107}],225:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category List
 * @sig a -> b -> (a,b)
 * @param {*} fst
 * @param {*} snd
 * @return {Array}
 * @see R.objOf, R.of
 * @example
 *
 *      R.pair('foo', 'bar'); //=> ['foo', 'bar']
 */


var pair = /*#__PURE__*/_curry2(function pair(fst, snd) {
  return [fst, snd];
});
module.exports = pair;
},{"./internal/_curry2":106}],226:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _createPartialApplicator = /*#__PURE__*/require('./internal/_createPartialApplicator');

/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided initially followed by the arguments provided to `g`.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partialRight
 * @example
 *
 *      var multiply2 = (a, b) => a * b;
 *      var double = R.partial(multiply2, [2]);
 *      double(2); //=> 4
 *
 *      var greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      var sayHello = R.partial(greet, ['Hello']);
 *      var sayHelloToMs = R.partial(sayHello, ['Ms.']);
 *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partial(f, [a, b])(c, d) = f(a, b, c, d)
 */


var partial = /*#__PURE__*/_createPartialApplicator(_concat);
module.exports = partial;
},{"./internal/_concat":101,"./internal/_createPartialApplicator":104}],227:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _createPartialApplicator = /*#__PURE__*/require('./internal/_createPartialApplicator');

var flip = /*#__PURE__*/require('./flip');

/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partial
 * @example
 *
 *      var greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
 *
 *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partialRight(f, [a, b])(c, d) = f(c, d, a, b)
 */


var partialRight = /*#__PURE__*/_createPartialApplicator( /*#__PURE__*/flip(_concat));
module.exports = partialRight;
},{"./flip":70,"./internal/_concat":101,"./internal/_createPartialApplicator":104}],228:[function(require,module,exports){
var filter = /*#__PURE__*/require('./filter');

var juxt = /*#__PURE__*/require('./juxt');

var reject = /*#__PURE__*/require('./reject');

/**
 * Takes a predicate and a list or other `Filterable` object and returns the
 * pair of filterable objects of the same type of elements which do and do not
 * satisfy, the predicate, respectively. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]
 * @param {Function} pred A predicate to determine which side the element belongs to.
 * @param {Array} filterable the list (or other filterable) to partition.
 * @return {Array} An array, containing first the subset of elements that satisfy the
 *         predicate, and second the subset of elements that do not satisfy.
 * @see R.filter, R.reject
 * @example
 *
 *      R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);
 *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
 *
 *      R.partition(R.contains('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
 *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
 */


var partition = /*#__PURE__*/juxt([filter, reject]);
module.exports = partition;
},{"./filter":64,"./juxt":174,"./reject":255}],229:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 */


var path = /*#__PURE__*/_curry2(function path(paths, obj) {
  var val = obj;
  var idx = 0;
  while (idx < paths.length) {
    if (val == null) {
      return;
    }
    val = val[paths[idx]];
    idx += 1;
  }
  return val;
});
module.exports = path;
},{"./internal/_curry2":106}],230:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var equals = /*#__PURE__*/require('./equals');

var path = /*#__PURE__*/require('./path');

/**
 * Determines whether a nested path on an object has a specific value, in
 * [`R.equals`](#equals) terms. Most likely used to filter a list.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Relation
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> Boolean
 * @param {Array} path The path of the nested property to use
 * @param {*} val The value to compare the nested property with
 * @param {Object} obj The object to check the nested property in
 * @return {Boolean} `true` if the value equals the nested object property,
 *         `false` otherwise.
 * @example
 *
 *      var user1 = { address: { zipCode: 90210 } };
 *      var user2 = { address: { zipCode: 55555 } };
 *      var user3 = { name: 'Bob' };
 *      var users = [ user1, user2, user3 ];
 *      var isFamous = R.pathEq(['address', 'zipCode'], 90210);
 *      R.filter(isFamous, users); //=> [ user1 ]
 */


var pathEq = /*#__PURE__*/_curry3(function pathEq(_path, val, obj) {
  return equals(path(_path, obj), val);
});
module.exports = pathEq;
},{"./equals":62,"./internal/_curry3":107,"./path":229}],231:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var defaultTo = /*#__PURE__*/require('./defaultTo');

var path = /*#__PURE__*/require('./path');

/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig a -> [Idx] -> {a} -> a
 * @param {*} d The default value.
 * @param {Array} p The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path` of the supplied object or the default value.
 * @example
 *
 *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */


var pathOr = /*#__PURE__*/_curry3(function pathOr(d, p, obj) {
  return defaultTo(d, path(p, obj));
});
module.exports = pathOr;
},{"./defaultTo":44,"./internal/_curry3":107,"./path":229}],232:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var path = /*#__PURE__*/require('./path');

/**
 * Returns `true` if the specified object property at given path satisfies the
 * given predicate; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Logic
 * @typedefn Idx = String | Int
 * @sig (a -> Boolean) -> [Idx] -> {a} -> Boolean
 * @param {Function} pred
 * @param {Array} propPath
 * @param {*} obj
 * @return {Boolean}
 * @see R.propSatisfies, R.path
 * @example
 *
 *      R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
 */


var pathSatisfies = /*#__PURE__*/_curry3(function pathSatisfies(pred, propPath, obj) {
  return propPath.length > 0 && pred(path(propPath, obj));
});
module.exports = pathSatisfies;
},{"./internal/_curry3":107,"./path":229}],233:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.omit, R.props
 * @example
 *
 *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 */


var pick = /*#__PURE__*/_curry2(function pick(names, obj) {
  var result = {};
  var idx = 0;
  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]];
    }
    idx += 1;
  }
  return result;
});
module.exports = pick;
},{"./internal/_curry2":106}],234:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Similar to `pick` except that this one includes a `key: undefined` pair for
 * properties that don't exist.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.pick
 * @example
 *
 *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
 */


var pickAll = /*#__PURE__*/_curry2(function pickAll(names, obj) {
  var result = {};
  var idx = 0;
  var len = names.length;
  while (idx < len) {
    var name = names[idx];
    result[name] = obj[name];
    idx += 1;
  }
  return result;
});
module.exports = pickAll;
},{"./internal/_curry2":106}],235:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a partial copy of an object containing only the keys that satisfy
 * the supplied predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig ((v, k) -> Boolean) -> {k: v} -> {k: v}
 * @param {Function} pred A predicate to determine whether or not a key
 *        should be included on the output object.
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties that satisfy `pred`
 *         on it.
 * @see R.pick, R.filter
 * @example
 *
 *      var isUpperCase = (val, key) => key.toUpperCase() === key;
 *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
 */


var pickBy = /*#__PURE__*/_curry2(function pickBy(test, obj) {
  var result = {};
  for (var prop in obj) {
    if (test(obj[prop], prop, obj)) {
      result[prop] = obj[prop];
    }
  }
  return result;
});
module.exports = pickBy;
},{"./internal/_curry2":106}],236:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _pipe = /*#__PURE__*/require('./internal/_pipe');

var reduce = /*#__PURE__*/require('./reduce');

var tail = /*#__PURE__*/require('./tail');

/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      var f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */


function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }
  return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
}
module.exports = pipe;
},{"./internal/_arity":94,"./internal/_pipe":135,"./reduce":250,"./tail":276}],237:[function(require,module,exports){
var composeK = /*#__PURE__*/require('./composeK');

var reverse = /*#__PURE__*/require('./reverse');

/**
 * Returns the left-to-right Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.pipeK(f, g, h)` is equivalent to `R.pipe(f, R.chain(g), R.chain(h))`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((a -> m b), (b -> m c), ..., (y -> m z)) -> (a -> m z)
 * @param {...Function}
 * @return {Function}
 * @see R.composeK
 * @example
 *
 *      //  parseJson :: String -> Maybe *
 *      //  get :: String -> Object -> Maybe *
 *
 *      //  getStateCode :: Maybe String -> Maybe String
 *      var getStateCode = R.pipeK(
 *        parseJson,
 *        get('user'),
 *        get('address'),
 *        get('state'),
 *        R.compose(Maybe.of, R.toUpper)
 *      );
 *
 *      getStateCode('{"user":{"address":{"state":"ny"}}}');
 *      //=> Just('NY')
 *      getStateCode('[Invalid JSON]');
 *      //=> Nothing()
 * @symb R.pipeK(f, g, h)(a) = R.chain(h, R.chain(g, f(a)))
 */


function pipeK() {
  if (arguments.length === 0) {
    throw new Error('pipeK requires at least one argument');
  }
  return composeK.apply(this, reverse(arguments));
}
module.exports = pipeK;
},{"./composeK":32,"./reverse":259}],238:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _pipeP = /*#__PURE__*/require('./internal/_pipeP');

var reduce = /*#__PURE__*/require('./reduce');

var tail = /*#__PURE__*/require('./tail');

/**
 * Performs left-to-right composition of one or more Promise-returning
 * functions. The leftmost function may have any arity; the remaining functions
 * must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a -> Promise b), (b -> Promise c), ..., (y -> Promise z)) -> (a -> Promise z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.composeP
 * @example
 *
 *      //  followersForUser :: String -> Promise [User]
 *      var followersForUser = R.pipeP(db.getUserById, db.getFollowers);
 */


function pipeP() {
  if (arguments.length === 0) {
    throw new Error('pipeP requires at least one argument');
  }
  return _arity(arguments[0].length, reduce(_pipeP, arguments[0], tail(arguments)));
}
module.exports = pipeP;
},{"./internal/_arity":94,"./internal/_pipeP":136,"./reduce":250,"./tail":276}],239:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var map = /*#__PURE__*/require('./map');

var prop = /*#__PURE__*/require('./prop');

/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 *
 * `pluck` will work on
 * any [functor](https://github.com/fantasyland/fantasy-land#functor) in
 * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => k -> f {k: v} -> f v
 * @param {Number|String} key The key name to pluck off of each object.
 * @param {Array} f The array or functor to consider.
 * @return {Array} The list of values for the given key.
 * @see R.props
 * @example
 *
 *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
 *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]
 *      R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
 * @symb R.pluck('x', [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}]) = [1, 3, 5]
 * @symb R.pluck(0, [[1, 2], [3, 4], [5, 6]]) = [1, 3, 5]
 */


var pluck = /*#__PURE__*/_curry2(function pluck(p, list) {
  return map(prop(p), list);
});
module.exports = pluck;
},{"./internal/_curry2":106,"./map":188,"./prop":243}],240:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The item to add to the head of the output list.
 * @param {Array} list The array to add to the tail of the output list.
 * @return {Array} A new array.
 * @see R.append
 * @example
 *
 *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 */


var prepend = /*#__PURE__*/_curry2(function prepend(el, list) {
  return _concat([el], list);
});
module.exports = prepend;
},{"./internal/_concat":101,"./internal/_curry2":106}],241:[function(require,module,exports){
var multiply = /*#__PURE__*/require('./multiply');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Multiplies together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The product of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.product([2,4,6,8,100,1]); //=> 38400
 */


var product = /*#__PURE__*/reduce(multiply, 1);
module.exports = product;
},{"./multiply":211,"./reduce":250}],242:[function(require,module,exports){
var _map = /*#__PURE__*/require('./internal/_map');

var identity = /*#__PURE__*/require('./identity');

var pickAll = /*#__PURE__*/require('./pickAll');

var useWith = /*#__PURE__*/require('./useWith');

/**
 * Reasonable analog to SQL `select` statement.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @category Relation
 * @sig [k] -> [{k: v}] -> [{k: v}]
 * @param {Array} props The property names to project
 * @param {Array} objs The objects to query
 * @return {Array} An array of objects with just the `props` properties.
 * @example
 *
 *      var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
 *      var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
 *      var kids = [abby, fred];
 *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
 */


var project = /*#__PURE__*/useWith(_map, [pickAll, identity]); // passing `identity` gives correct arity
module.exports = project;
},{"./identity":82,"./internal/_map":132,"./pickAll":234,"./useWith":308}],243:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var path = /*#__PURE__*/require('./path');

/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig s -> {s: a} -> a | Undefined
 * @param {String} p The property name
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 */

var prop = /*#__PURE__*/_curry2(function prop(p, obj) {
  return path([p], obj);
});
module.exports = prop;
},{"./internal/_curry2":106,"./path":229}],244:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var equals = /*#__PURE__*/require('./equals');

/**
 * Returns `true` if the specified object property is equal, in
 * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
 * You can test multiple properties with [`R.where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig String -> a -> Object -> Boolean
 * @param {String} name
 * @param {*} val
 * @param {*} obj
 * @return {Boolean}
 * @see R.whereEq, R.propSatisfies, R.equals
 * @example
 *
 *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
 *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
 *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
 *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
 *      var kids = [abby, fred, rusty, alois];
 *      var hasBrownHair = R.propEq('hair', 'brown');
 *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
 */


var propEq = /*#__PURE__*/_curry3(function propEq(name, val, obj) {
  return equals(val, obj[name]);
});
module.exports = propEq;
},{"./equals":62,"./internal/_curry3":107}],245:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var is = /*#__PURE__*/require('./is');

/**
 * Returns `true` if the specified object property is of the given type;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Type
 * @sig Type -> String -> Object -> Boolean
 * @param {Function} type
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.is, R.propSatisfies
 * @example
 *
 *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
 *      R.propIs(Number, 'x', {x: 'foo'});    //=> false
 *      R.propIs(Number, 'x', {});            //=> false
 */


var propIs = /*#__PURE__*/_curry3(function propIs(type, name, obj) {
  return is(type, obj[name]);
});
module.exports = propIs;
},{"./internal/_curry3":107,"./is":170}],246:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * If the given, non-null object has an own property with the specified name,
 * returns the value of that property. Otherwise returns the provided default
 * value.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Object
 * @sig a -> String -> Object -> a
 * @param {*} val The default value.
 * @param {String} p The name of the property to return.
 * @param {Object} obj The object to query.
 * @return {*} The value of given property of the supplied object or the default value.
 * @example
 *
 *      var alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      var favorite = R.prop('favoriteLibrary');
 *      var favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
 *
 *      favorite(alice);  //=> undefined
 *      favoriteWithDefault(alice);  //=> 'Ramda'
 */


var propOr = /*#__PURE__*/_curry3(function propOr(val, p, obj) {
  return obj != null && _has(p, obj) ? obj[p] : val;
});
module.exports = propOr;
},{"./internal/_curry3":107,"./internal/_has":117}],247:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise. You can test multiple properties with
 * [`R.where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Logic
 * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
 * @param {Function} pred
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.where, R.propEq, R.propIs
 * @example
 *
 *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 */


var propSatisfies = /*#__PURE__*/_curry3(function propSatisfies(pred, name, obj) {
  return pred(obj[name]);
});
module.exports = propSatisfies;
},{"./internal/_curry3":107}],248:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Acts as multiple `prop`: array of keys in, array of values out. Preserves
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> [v]
 * @param {Array} ps The property names to fetch
 * @param {Object} obj The object to query
 * @return {Array} The corresponding values or partially applied function.
 * @example
 *
 *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
 *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
 *
 *      var fullName = R.compose(R.join(' '), R.props(['first', 'last']));
 *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
 */


var props = /*#__PURE__*/_curry2(function props(ps, obj) {
  var len = ps.length;
  var out = [];
  var idx = 0;

  while (idx < len) {
    out[idx] = obj[ps[idx]];
    idx += 1;
  }

  return out;
});
module.exports = props;
},{"./internal/_curry2":106}],249:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isNumber = /*#__PURE__*/require('./internal/_isNumber');

/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> Number -> [Number]
 * @param {Number} from The first number in the list.
 * @param {Number} to One more than the last number in the list.
 * @return {Array} The list of numbers in tthe set `[a, b)`.
 * @example
 *
 *      R.range(1, 5);    //=> [1, 2, 3, 4]
 *      R.range(50, 53);  //=> [50, 51, 52]
 */


var range = /*#__PURE__*/_curry2(function range(from, to) {
  if (!(_isNumber(from) && _isNumber(to))) {
    throw new TypeError('Both arguments to range must be numbers');
  }
  var result = [];
  var n = from;
  while (n < to) {
    result.push(n);
    n += 1;
  }
  return result;
});
module.exports = range;
},{"./internal/_curry2":106,"./internal/_isNumber":125}],250:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */


var reduce = /*#__PURE__*/_curry3(_reduce);
module.exports = reduce;
},{"./internal/_curry3":107,"./internal/_reduce":138}],251:[function(require,module,exports){
var _curryN = /*#__PURE__*/require('./internal/_curryN');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _has = /*#__PURE__*/require('./internal/_has');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _xreduceBy = /*#__PURE__*/require('./internal/_xreduceBy');

/**
 * Groups the elements of the list according to the result of calling
 * the String-returning function `keyFn` on each element and reduces the elements
 * of each group to a single value via the reducer function `valueFn`.
 *
 * This function is basically a more general [`groupBy`](#groupBy) function.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category List
 * @sig ((a, b) -> a) -> a -> (b -> String) -> [b] -> {String: a}
 * @param {Function} valueFn The function that reduces the elements of each group to a single
 *        value. Receives two values, accumulator for a particular group and the current element.
 * @param {*} acc The (initial) accumulator value for each group.
 * @param {Function} keyFn The function that maps the list's element into a key.
 * @param {Array} list The array to group.
 * @return {Object} An object with the output of `keyFn` for keys, mapped to the output of
 *         `valueFn` for elements which produced that key when passed to `keyFn`.
 * @see R.groupBy, R.reduce
 * @example
 *
 *      var reduceToNamesBy = R.reduceBy((acc, student) => acc.concat(student.name), []);
 *      var namesByGrade = reduceToNamesBy(function(student) {
 *        var score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      var students = [{name: 'Lucy', score: 92},
 *                      {name: 'Drew', score: 85},
 *                      // ...
 *                      {name: 'Bart', score: 62}];
 *      namesByGrade(students);
 *      // {
 *      //   'A': ['Lucy'],
 *      //   'B': ['Drew']
 *      //   // ...,
 *      //   'F': ['Bart']
 *      // }
 */


var reduceBy = /*#__PURE__*/_curryN(4, [], /*#__PURE__*/_dispatchable([], _xreduceBy, function reduceBy(valueFn, valueAcc, keyFn, list) {
  return _reduce(function (acc, elt) {
    var key = keyFn(elt);
    acc[key] = valueFn(_has(key, acc) ? acc[key] : valueAcc, elt);
    return acc;
  }, {}, list);
}));
module.exports = reduceBy;
},{"./internal/_curryN":108,"./internal/_dispatchable":109,"./internal/_has":117,"./internal/_reduce":138,"./internal/_xreduceBy":159}],252:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * Similar to [`reduce`](#reduce), except moves through the input list from the
 * right to the left.
 *
 * The iterator function receives two values: *(value, acc)*, while the arguments'
 * order of `reduce`'s iterator function is *(acc, value)*.
 *
 * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduceRight` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> b) -> b -> [a] -> b
 * @param {Function} fn The iterator function. Receives two values, the current element from the array
 *        and the accumulator.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.addIndex
 * @example
 *
 *      R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
 *      //    -               -2
 *      //   / \              / \
 *      //  1   -            1   3
 *      //     / \              / \
 *      //    2   -     ==>    2  -1
 *      //       / \              / \
 *      //      3   -            3   4
 *      //         / \              / \
 *      //        4   0            4   0
 *
 * @symb R.reduceRight(f, a, [b, c, d]) = f(b, f(c, f(d, a)))
 */


var reduceRight = /*#__PURE__*/_curry3(function reduceRight(fn, acc, list) {
  var idx = list.length - 1;
  while (idx >= 0) {
    acc = fn(list[idx], acc);
    idx -= 1;
  }
  return acc;
});
module.exports = reduceRight;
},{"./internal/_curry3":107}],253:[function(require,module,exports){
var _curryN = /*#__PURE__*/require('./internal/_curryN');

var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _reduced = /*#__PURE__*/require('./internal/_reduced');

/**
 * Like [`reduce`](#reduce), `reduceWhile` returns a single item by iterating
 * through the list, successively calling the iterator function. `reduceWhile`
 * also takes a predicate that is evaluated before each step. If the predicate
 * returns `false`, it "short-circuits" the iteration and returns the current
 * value of the accumulator.
 *
 * @func
 * @memberOf R
 * @since v0.22.0
 * @category List
 * @sig ((a, b) -> Boolean) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} pred The predicate. It is passed the accumulator and the
 *        current element.
 * @param {Function} fn The iterator function. Receives two values, the
 *        accumulator and the current element.
 * @param {*} a The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced
 * @example
 *
 *      var isOdd = (acc, x) => x % 2 === 1;
 *      var xs = [1, 3, 5, 60, 777, 800];
 *      R.reduceWhile(isOdd, R.add, 0, xs); //=> 9
 *
 *      var ys = [2, 4, 6]
 *      R.reduceWhile(isOdd, R.add, 111, ys); //=> 111
 */


var reduceWhile = /*#__PURE__*/_curryN(4, [], function _reduceWhile(pred, fn, a, list) {
  return _reduce(function (acc, x) {
    return pred(acc, x) ? fn(acc, x) : _reduced(acc);
  }, a, list);
});
module.exports = reduceWhile;
},{"./internal/_curryN":108,"./internal/_reduce":138,"./internal/_reduced":139}],254:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _reduced = /*#__PURE__*/require('./internal/_reduced');

/**
 * Returns a value wrapped to indicate that it is the final value of the reduce
 * and transduce functions. The returned value should be considered a black
 * box: the internal structure is not guaranteed to be stable.
 *
 * Note: this optimization is unavailable to functions not explicitly listed
 * above. For instance, it is not currently supported by
 * [`reduceRight`](#reduceRight).
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category List
 * @sig a -> *
 * @param {*} x The final value of the reduce.
 * @return {*} The wrapped value.
 * @see R.reduce, R.transduce
 * @example
 *
 *     R.reduce(
 *       (acc, item) => item > 3 ? R.reduced(acc) : acc.concat(item),
 *       [],
 *       [1, 2, 3, 4, 5]) // [1, 2, 3]
 */


var reduced = /*#__PURE__*/_curry1(_reduced);
module.exports = reduced;
},{"./internal/_curry1":105,"./internal/_reduced":139}],255:[function(require,module,exports){
var _complement = /*#__PURE__*/require('./internal/_complement');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var filter = /*#__PURE__*/require('./filter');

/**
 * The complement of [`filter`](#filter).
 *
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      var isOdd = (n) => n % 2 === 1;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */


var reject = /*#__PURE__*/_curry2(function reject(pred, filterable) {
  return filter(_complement(pred), filterable);
});
module.exports = reject;
},{"./filter":64,"./internal/_complement":100,"./internal/_curry2":106}],256:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements. _Note that this is not destructive_: it returns a copy of
 * the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} start The position to start removing elements
 * @param {Number} count The number of elements to remove
 * @param {Array} list The list to remove from
 * @return {Array} A new Array with `count` elements from `start` removed.
 * @example
 *
 *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
 */


var remove = /*#__PURE__*/_curry3(function remove(start, count, list) {
  var result = Array.prototype.slice.call(list, 0);
  result.splice(start, count);
  return result;
});
module.exports = remove;
},{"./internal/_curry3":107}],257:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var always = /*#__PURE__*/require('./always');

var times = /*#__PURE__*/require('./times');

/**
 * Returns a fixed list of size `n` containing a specified identical value.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig a -> n -> [a]
 * @param {*} value The value to repeat.
 * @param {Number} n The desired size of the output list.
 * @return {Array} A new array containing `n` `value`s.
 * @see R.times
 * @example
 *
 *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
 *
 *      var obj = {};
 *      var repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
 *      repeatedObjs[0] === repeatedObjs[1]; //=> true
 * @symb R.repeat(a, 0) = []
 * @symb R.repeat(a, 1) = [a]
 * @symb R.repeat(a, 2) = [a, a]
 */


var repeat = /*#__PURE__*/_curry2(function repeat(value, n) {
  return times(always(value), n);
});
module.exports = repeat;
},{"./always":9,"./internal/_curry2":106,"./times":283}],258:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Replace a substring or regex match in a string with a replacement.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category String
 * @sig RegExp|String -> String -> String -> String
 * @param {RegExp|String} pattern A regular expression or a substring to match.
 * @param {String} replacement The string to replace the matches with.
 * @param {String} str The String to do the search and replacement in.
 * @return {String} The result.
 * @example
 *
 *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *
 *      // Use the "g" (global) flag to replace all occurrences:
 *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
 */


var replace = /*#__PURE__*/_curry3(function replace(regex, replacement, str) {
  return str.replace(regex, replacement);
});
module.exports = replace;
},{"./internal/_curry3":107}],259:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _isString = /*#__PURE__*/require('./internal/_isString');

/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */


var reverse = /*#__PURE__*/_curry1(function reverse(list) {
  return _isString(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});
module.exports = reverse;
},{"./internal/_curry1":105,"./internal/_isString":129}],260:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Scan is similar to [`reduce`](#reduce), but returns a list of successively
 * reduced values from the left
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> [a]
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {Array} A list of all intermediately reduced values.
 * @see R.reduce
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
 * @symb R.scan(f, a, [b, c]) = [a, f(a, b), f(f(a, b), c)]
 */


var scan = /*#__PURE__*/_curry3(function scan(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [acc];
  while (idx < len) {
    acc = fn(acc, list[idx]);
    result[idx + 1] = acc;
    idx += 1;
  }
  return result;
});
module.exports = scan;
},{"./internal/_curry3":107}],261:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var ap = /*#__PURE__*/require('./ap');

var map = /*#__PURE__*/require('./map');

var prepend = /*#__PURE__*/require('./prepend');

var reduceRight = /*#__PURE__*/require('./reduceRight');

/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 *
 * Dispatches to the `sequence` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
 * @param {Function} of
 * @param {*} traversable
 * @return {*}
 * @see R.traverse
 * @example
 *
 *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
 *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
 *      R.sequence(R.of, Nothing());       //=> [Nothing()]
 */


var sequence = /*#__PURE__*/_curry2(function sequence(of, traversable) {
  return typeof traversable.sequence === 'function' ? traversable.sequence(of) : reduceRight(function (x, acc) {
    return ap(map(prepend, x), acc);
  }, of([]), traversable);
});
module.exports = sequence;
},{"./ap":13,"./internal/_curry2":106,"./map":188,"./prepend":240,"./reduceRight":252}],262:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var always = /*#__PURE__*/require('./always');

var over = /*#__PURE__*/require('./over');

/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> a -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
 *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
 */


var set = /*#__PURE__*/_curry3(function set(lens, v, x) {
  return over(lens, always(v), x);
});
module.exports = set;
},{"./always":9,"./internal/_curry3":107,"./over":224}],263:[function(require,module,exports){
var _checkForMethod = /*#__PURE__*/require('./internal/_checkForMethod');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */


var slice = /*#__PURE__*/_curry3( /*#__PURE__*/_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));
module.exports = slice;
},{"./internal/_checkForMethod":97,"./internal/_curry3":107}],264:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal. Please note that this is a **copy** of the list. It does not
 * modify the original.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, a) -> Number) -> [a] -> [a]
 * @param {Function} comparator A sorting function :: a -> b -> Int
 * @param {Array} list The list to sort
 * @return {Array} a new array with its elements sorted by the comparator function.
 * @example
 *
 *      var diff = function(a, b) { return a - b; };
 *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
 */


var sort = /*#__PURE__*/_curry2(function sort(comparator, list) {
  return Array.prototype.slice.call(list, 0).sort(comparator);
});
module.exports = sort;
},{"./internal/_curry2":106}],265:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Sorts the list according to the supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord b => (a -> b) -> [a] -> [a]
 * @param {Function} fn
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted by the keys generated by `fn`.
 * @example
 *
 *      var sortByFirstItem = R.sortBy(R.prop(0));
 *      var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
 *      var pairs = [[-1, 1], [-2, 2], [-3, 3]];
 *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
 *      var alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      var bob = {
 *        name: 'Bob',
 *        age: -10
 *      };
 *      var clara = {
 *        name: 'clara',
 *        age: 314.159
 *      };
 *      var people = [clara, bob, alice];
 *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
 */


var sortBy = /*#__PURE__*/_curry2(function sortBy(fn, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});
module.exports = sortBy;
},{"./internal/_curry2":106}],266:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Sorts a list according to a list of comparators.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Relation
 * @sig [(a, a) -> Number] -> [a] -> [a]
 * @param {Array} functions A list of comparator functions.
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted according to the comarator functions.
 * @example
 *
 *      var alice = {
 *        name: 'alice',
 *        age: 40
 *      };
 *      var bob = {
 *        name: 'bob',
 *        age: 30
 *      };
 *      var clara = {
 *        name: 'clara',
 *        age: 40
 *      };
 *      var people = [clara, bob, alice];
 *      var ageNameSort = R.sortWith([
 *        R.descend(R.prop('age')),
 *        R.ascend(R.prop('name'))
 *      ]);
 *      ageNameSort(people); //=> [alice, clara, bob]
 */


var sortWith = /*#__PURE__*/_curry2(function sortWith(fns, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var result = 0;
    var i = 0;
    while (result === 0 && i < fns.length) {
      result = fns[i](a, b);
      i += 1;
    }
    return result;
  });
});
module.exports = sortWith;
},{"./internal/_curry2":106}],267:[function(require,module,exports){
var invoker = /*#__PURE__*/require('./invoker');

/**
 * Splits a string into an array of strings based on the given
 * separator.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig (String | RegExp) -> String -> [String]
 * @param {String|RegExp} sep The pattern.
 * @param {String} str The string to separate into an array.
 * @return {Array} The array of strings from `str` separated by `str`.
 * @see R.join
 * @example
 *
 *      var pathComponents = R.split('/');
 *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
 *
 *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
 */


var split = /*#__PURE__*/invoker(1, 'split');
module.exports = split;
},{"./invoker":169}],268:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var length = /*#__PURE__*/require('./length');

var slice = /*#__PURE__*/require('./slice');

/**
 * Splits a given list or string at a given index.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig Number -> [a] -> [[a], [a]]
 * @sig Number -> String -> [String, String]
 * @param {Number} index The index where the array/string is split.
 * @param {Array|String} array The array/string to be split.
 * @return {Array}
 * @example
 *
 *      R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
 *      R.splitAt(5, 'hello world');      //=> ['hello', ' world']
 *      R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']
 */


var splitAt = /*#__PURE__*/_curry2(function splitAt(index, array) {
  return [slice(0, index, array), slice(index, length(array), array)];
});
module.exports = splitAt;
},{"./internal/_curry2":106,"./length":179,"./slice":263}],269:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var slice = /*#__PURE__*/require('./slice');

/**
 * Splits a collection into slices of the specified length.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @sig Number -> String -> [String]
 * @param {Number} n
 * @param {Array} list
 * @return {Array}
 * @example
 *
 *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
 *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
 */


var splitEvery = /*#__PURE__*/_curry2(function splitEvery(n, list) {
  if (n <= 0) {
    throw new Error('First argument to splitEvery must be a positive integer');
  }
  var result = [];
  var idx = 0;
  while (idx < list.length) {
    result.push(slice(idx, idx += n, list));
  }
  return result;
});
module.exports = splitEvery;
},{"./internal/_curry2":106,"./slice":263}],270:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Takes a list and a predicate and returns a pair of lists with the following properties:
 *
 *  - the result of concatenating the two output lists is equivalent to the input list;
 *  - none of the elements of the first output list satisfies the predicate; and
 *  - if the second output list is non-empty, its first element satisfies the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [[a], [a]]
 * @param {Function} pred The predicate that determines where the array is split.
 * @param {Array} list The array to be split.
 * @return {Array}
 * @example
 *
 *      R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
 */


var splitWhen = /*#__PURE__*/_curry2(function splitWhen(pred, list) {
  var idx = 0;
  var len = list.length;
  var prefix = [];

  while (idx < len && !pred(list[idx])) {
    prefix.push(list[idx]);
    idx += 1;
  }

  return [prefix, Array.prototype.slice.call(list, idx)];
});
module.exports = splitWhen;
},{"./internal/_curry2":106}],271:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var equals = /*#__PURE__*/require('./equals');

var take = /*#__PURE__*/require('./take');

/**
 * Checks if a list starts with the provided values
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> Boolean
 * @sig String -> Boolean
 * @param {*} prefix
 * @param {*} list
 * @return {Boolean}
 * @example
 *
 *      R.startsWith('a', 'abc')                //=> true
 *      R.startsWith('b', 'abc')                //=> false
 *      R.startsWith(['a'], ['a', 'b', 'c'])    //=> true
 *      R.startsWith(['b'], ['a', 'b', 'c'])    //=> false
 */


var startsWith = /*#__PURE__*/_curry2(function (prefix, list) {
  return equals(take(prefix.length, list), prefix);
});
module.exports = startsWith;
},{"./equals":62,"./internal/_curry2":106,"./take":277}],272:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Subtracts its second argument from its first argument.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a - b`.
 * @see R.add
 * @example
 *
 *      R.subtract(10, 8); //=> 2
 *
 *      var minus5 = R.subtract(R.__, 5);
 *      minus5(17); //=> 12
 *
 *      var complementaryAngle = R.subtract(90);
 *      complementaryAngle(30); //=> 60
 *      complementaryAngle(72); //=> 18
 */


var subtract = /*#__PURE__*/_curry2(function subtract(a, b) {
  return Number(a) - Number(b);
});
module.exports = subtract;
},{"./internal/_curry2":106}],273:[function(require,module,exports){
var add = /*#__PURE__*/require('./add');

var reduce = /*#__PURE__*/require('./reduce');

/**
 * Adds together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The sum of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.sum([2,4,6,8,100,1]); //=> 121
 */


var sum = /*#__PURE__*/reduce(add, 0);
module.exports = sum;
},{"./add":4,"./reduce":250}],274:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var concat = /*#__PURE__*/require('./concat');

var difference = /*#__PURE__*/require('./difference');

/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifferenceWith, R.difference, R.differenceWith
 * @example
 *
 *      R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
 *      R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
 */


var symmetricDifference = /*#__PURE__*/_curry2(function symmetricDifference(list1, list2) {
  return concat(difference(list1, list2), difference(list2, list1));
});
module.exports = symmetricDifference;
},{"./concat":34,"./difference":46,"./internal/_curry2":106}],275:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var concat = /*#__PURE__*/require('./concat');

var differenceWith = /*#__PURE__*/require('./differenceWith');

/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both. Duplication is determined according to the value
 * returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifference, R.difference, R.differenceWith
 * @example
 *
 *      var eqA = R.eqBy(R.prop('a'));
 *      var l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
 *      var l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
 *      R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
 */


var symmetricDifferenceWith = /*#__PURE__*/_curry3(function symmetricDifferenceWith(pred, list1, list2) {
  return concat(differenceWith(pred, list1, list2), differenceWith(pred, list2, list1));
});
module.exports = symmetricDifferenceWith;
},{"./concat":34,"./differenceWith":47,"./internal/_curry3":107}],276:[function(require,module,exports){
var _checkForMethod = /*#__PURE__*/require('./internal/_checkForMethod');

var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */


var tail = /*#__PURE__*/_curry1( /*#__PURE__*/_checkForMethod('tail', /*#__PURE__*/slice(1, Infinity)));
module.exports = tail;
},{"./internal/_checkForMethod":97,"./internal/_curry1":105,"./slice":263}],277:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xtake = /*#__PURE__*/require('./internal/_xtake');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `take` method).
 *
 * Dispatches to the `take` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*}
 * @see R.drop
 * @example
 *
 *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(3, 'ramda');               //=> 'ram'
 *
 *      var personnel = [
 *        'Dave Brubeck',
 *        'Paul Desmond',
 *        'Eugene Wright',
 *        'Joe Morello',
 *        'Gerry Mulligan',
 *        'Bob Bates',
 *        'Joe Dodge',
 *        'Ron Crotty'
 *      ];
 *
 *      var takeFive = R.take(5);
 *      takeFive(personnel);
 *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
 * @symb R.take(-1, [a, b]) = [a, b]
 * @symb R.take(0, [a, b]) = []
 * @symb R.take(1, [a, b]) = [a]
 * @symb R.take(2, [a, b]) = [a, b]
 */


var take = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['take'], _xtake, function take(n, xs) {
  return slice(0, n < 0 ? Infinity : n, xs);
}));
module.exports = take;
},{"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_xtake":160,"./slice":263}],278:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var drop = /*#__PURE__*/require('./drop');

/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements to return.
 * @param {Array} xs The collection to consider.
 * @return {Array}
 * @see R.dropLast
 * @example
 *
 *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(3, 'ramda');               //=> 'mda'
 */


var takeLast = /*#__PURE__*/_curry2(function takeLast(n, xs) {
  return drop(n >= 0 ? xs.length - n : 0, xs);
});
module.exports = takeLast;
},{"./drop":51,"./internal/_curry2":106}],279:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns a new list containing the last `n` elements of a given list, passing
 * each value to the supplied predicate function, and terminating when the
 * predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropLastWhile, R.addIndex
 * @example
 *
 *      var isNotOne = x => x !== 1;
 *
 *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
 *
 *      R.takeLastWhile(x => x !== 'R' , 'Ramda'); //=> 'amda'
 */


var takeLastWhile = /*#__PURE__*/_curry2(function takeLastWhile(fn, xs) {
  var idx = xs.length - 1;
  while (idx >= 0 && fn(xs[idx])) {
    idx -= 1;
  }
  return slice(idx + 1, Infinity, xs);
});
module.exports = takeLastWhile;
},{"./internal/_curry2":106,"./slice":263}],280:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xtakeWhile = /*#__PURE__*/require('./internal/_xtakeWhile');

var slice = /*#__PURE__*/require('./slice');

/**
 * Returns a new list containing the first `n` elements of a given list,
 * passing each value to the supplied predicate function, and terminating when
 * the predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * Dispatches to the `takeWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropWhile, R.transduce, R.addIndex
 * @example
 *
 *      var isNotFour = x => x !== 4;
 *
 *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
 *
 *      R.takeWhile(x => x !== 'd' , 'Ramda'); //=> 'Ram'
 */


var takeWhile = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable(['takeWhile'], _xtakeWhile, function takeWhile(fn, xs) {
  var idx = 0;
  var len = xs.length;
  while (idx < len && fn(xs[idx])) {
    idx += 1;
  }
  return slice(0, idx, xs);
}));
module.exports = takeWhile;
},{"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_xtakeWhile":161,"./slice":263}],281:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _dispatchable = /*#__PURE__*/require('./internal/_dispatchable');

var _xtap = /*#__PURE__*/require('./internal/_xtap');

/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a -> *) -> a -> a
 * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
 * @param {*} x
 * @return {*} `x`.
 * @example
 *
 *      var sayX = x => console.log('x is ' + x);
 *      R.tap(sayX, 100); //=> 100
 *      // logs 'x is 100'
 * @symb R.tap(f, a) = a
 */


var tap = /*#__PURE__*/_curry2( /*#__PURE__*/_dispatchable([], _xtap, function tap(fn, x) {
  fn(x);
  return x;
}));
module.exports = tap;
},{"./internal/_curry2":106,"./internal/_dispatchable":109,"./internal/_xtap":162}],282:[function(require,module,exports){
var _cloneRegExp = /*#__PURE__*/require('./internal/_cloneRegExp');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _isRegExp = /*#__PURE__*/require('./internal/_isRegExp');

var toString = /*#__PURE__*/require('./toString');

/**
 * Determines whether a given string matches a given regular expression.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category String
 * @sig RegExp -> String -> Boolean
 * @param {RegExp} pattern
 * @param {String} str
 * @return {Boolean}
 * @see R.match
 * @example
 *
 *      R.test(/^x/, 'xyz'); //=> true
 *      R.test(/^y/, 'xyz'); //=> false
 */


var test = /*#__PURE__*/_curry2(function test(pattern, str) {
  if (!_isRegExp(pattern)) {
    throw new TypeError('‘test’ requires a value of type RegExp as its first argument; received ' + toString(pattern));
  }
  return _cloneRegExp(pattern).test(str);
});
module.exports = test;
},{"./internal/_cloneRegExp":99,"./internal/_curry2":106,"./internal/_isRegExp":128,"./toString":287}],283:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 *
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * @func
 * @memberOf R
 * @since v0.2.3
 * @category List
 * @sig (Number -> a) -> Number -> [a]
 * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
 * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
 * @return {Array} An array containing the return values of all calls to `fn`.
 * @see R.repeat
 * @example
 *
 *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 * @symb R.times(f, 0) = []
 * @symb R.times(f, 1) = [f(0)]
 * @symb R.times(f, 2) = [f(0), f(1)]
 */


var times = /*#__PURE__*/_curry2(function times(fn, n) {
  var len = Number(n);
  var idx = 0;
  var list;

  if (len < 0 || isNaN(len)) {
    throw new RangeError('n must be a non-negative number');
  }
  list = new Array(len);
  while (idx < len) {
    list[idx] = fn(idx);
    idx += 1;
  }
  return list;
});
module.exports = times;
},{"./internal/_curry2":106}],284:[function(require,module,exports){
var invoker = /*#__PURE__*/require('./invoker');

/**
 * The lower case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to lower case.
 * @return {String} The lower case version of `str`.
 * @see R.toUpper
 * @example
 *
 *      R.toLower('XYZ'); //=> 'xyz'
 */


var toLower = /*#__PURE__*/invoker(0, 'toLowerCase');
module.exports = toLower;
},{"./invoker":169}],285:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * Converts an object into an array of key, value arrays. Only the object's
 * own properties are used.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own properties.
 * @see R.fromPairs
 * @example
 *
 *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
 */


var toPairs = /*#__PURE__*/_curry1(function toPairs(obj) {
  var pairs = [];
  for (var prop in obj) {
    if (_has(prop, obj)) {
      pairs[pairs.length] = [prop, obj[prop]];
    }
  }
  return pairs;
});
module.exports = toPairs;
},{"./internal/_curry1":105,"./internal/_has":117}],286:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Converts an object into an array of key, value arrays. The object's own
 * properties and prototype properties are used. Note that the order of the
 * output array is not guaranteed to be consistent across different JS
 * platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own
 *         and prototype properties.
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
 */


var toPairsIn = /*#__PURE__*/_curry1(function toPairsIn(obj) {
  var pairs = [];
  for (var prop in obj) {
    pairs[pairs.length] = [prop, obj[prop]];
  }
  return pairs;
});
module.exports = toPairsIn;
},{"./internal/_curry1":105}],287:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var _toString = /*#__PURE__*/require('./internal/_toString');

/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.toString(42); //=> '42'
 *      R.toString('abc'); //=> '"abc"'
 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 */


var toString = /*#__PURE__*/_curry1(function toString(val) {
  return _toString(val, []);
});
module.exports = toString;
},{"./internal/_curry1":105,"./internal/_toString":142}],288:[function(require,module,exports){
var invoker = /*#__PURE__*/require('./invoker');

/**
 * The upper case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to upper case.
 * @return {String} The upper case version of `str`.
 * @see R.toLower
 * @example
 *
 *      R.toUpper('abc'); //=> 'ABC'
 */


var toUpper = /*#__PURE__*/invoker(0, 'toUpperCase');
module.exports = toUpper;
},{"./invoker":169}],289:[function(require,module,exports){
var _reduce = /*#__PURE__*/require('./internal/_reduce');

var _xwrap = /*#__PURE__*/require('./internal/_xwrap');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Initializes a transducer using supplied iterator function. Returns a single
 * item by iterating through the list, successively calling the transformed
 * iterator function and passing it an accumulator value and the current value
 * from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It will be
 * wrapped as a transformer to initialize the transducer. A transformer can be
 * passed directly in place of an iterator function. In both cases, iteration
 * may be stopped early with the [`R.reduced`](#reduced) function.
 *
 * A transducer is a function that accepts a transformer and returns a
 * transformer and can be composed directly.
 *
 * A transformer is an an object that provides a 2-arity reducing iterator
 * function, step, 0-arity initial value function, init, and 1-arity result
 * extraction function, result. The step function is used as the iterator
 * function in reduce. The result function is used to convert the final
 * accumulator into the return type and in most cases is
 * [`R.identity`](#identity). The init function can be used to provide an
 * initial accumulator, but is ignored by transduce.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (c -> c) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array. Wrapped as transformer, if necessary, and used to
 *        initialize the transducer
 * @param {*} acc The initial accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced, R.into
 * @example
 *
 *      var numbers = [1, 2, 3, 4];
 *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
 *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
 *
 *      var isOdd = (x) => x % 2 === 1;
 *      var firstOddTransducer = R.compose(R.filter(isOdd), R.take(1));
 *      R.transduce(firstOddTransducer, R.flip(R.append), [], R.range(0, 100)); //=> [1]
 */


var transduce = /*#__PURE__*/curryN(4, function transduce(xf, fn, acc, list) {
  return _reduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list);
});
module.exports = transduce;
},{"./curryN":42,"./internal/_reduce":138,"./internal/_xwrap":163}],290:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Transposes the rows and columns of a 2D list.
 * When passed a list of `n` lists of length `x`,
 * returns a list of `x` lists of length `n`.
 *
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [[a]] -> [[a]]
 * @param {Array} list A 2D list
 * @return {Array} A 2D list
 * @example
 *
 *      R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]
 *      R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 *      // If some of the rows are shorter than the following rows, their elements are skipped:
 *      R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]
 * @symb R.transpose([[a], [b], [c]]) = [a, b, c]
 * @symb R.transpose([[a, b], [c, d]]) = [[a, c], [b, d]]
 * @symb R.transpose([[a, b], [c]]) = [[a, c], [b]]
 */


var transpose = /*#__PURE__*/_curry1(function transpose(outerlist) {
  var i = 0;
  var result = [];
  while (i < outerlist.length) {
    var innerlist = outerlist[i];
    var j = 0;
    while (j < innerlist.length) {
      if (typeof result[j] === 'undefined') {
        result[j] = [];
      }
      result[j].push(innerlist[j]);
      j += 1;
    }
    i += 1;
  }
  return result;
});
module.exports = transpose;
},{"./internal/_curry1":105}],291:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var map = /*#__PURE__*/require('./map');

var sequence = /*#__PURE__*/require('./sequence');

/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `traverse` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
 * @param {Function} of
 * @param {Function} f
 * @param {*} traversable
 * @return {*}
 * @see R.sequence
 * @example
 *
 *      // Returns `Nothing` if the given divisor is `0`
 *      safeDiv = n => d => d === 0 ? Nothing() : Just(n / d)
 *
 *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Just([5, 2.5, 2])
 *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Nothing
 */


var traverse = /*#__PURE__*/_curry3(function traverse(of, f, traversable) {
  return typeof traversable['fantasy-land/traverse'] === 'function' ? traversable['fantasy-land/traverse'](f, of) : sequence(of, map(f, traversable));
});
module.exports = traverse;
},{"./internal/_curry3":107,"./map":188,"./sequence":261}],292:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
var zeroWidth = '\u200b';
var hasProtoTrim = typeof String.prototype.trim === 'function';
/**
 * Removes (strips) whitespace from both ends of the string.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to trim.
 * @return {String} Trimmed version of `str`.
 * @example
 *
 *      R.trim('   xyz  '); //=> 'xyz'
 *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
 */
var _trim = !hasProtoTrim || /*#__PURE__*/ws.trim() || ! /*#__PURE__*/zeroWidth.trim() ? function trim(str) {
  var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
  var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
  return str.replace(beginRx, '').replace(endRx, '');
} : function trim(str) {
  return str.trim();
};
var trim = /*#__PURE__*/_curry1(_trim);
module.exports = trim;
},{"./internal/_curry1":105}],293:[function(require,module,exports){
var _arity = /*#__PURE__*/require('./internal/_arity');

var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
 * function evaluates the `tryer`; if it does not throw, it simply returns the
 * result. If the `tryer` *does* throw, the returned function evaluates the
 * `catcher` function and returns its result. Note that for effective
 * composition with this function, both the `tryer` and `catcher` functions
 * must return the same type of results.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig (...x -> a) -> ((e, ...x) -> a) -> (...x -> a)
 * @param {Function} tryer The function that may throw.
 * @param {Function} catcher The function that will be evaluated if `tryer` throws.
 * @return {Function} A new function that will catch exceptions and send then to the catcher.
 * @example
 *
 *      R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true
 *      R.tryCatch(R.prop('x'), R.F)(null);      //=> false
 */


var tryCatch = /*#__PURE__*/_curry2(function _tryCatch(tryer, catcher) {
  return _arity(tryer.length, function () {
    try {
      return tryer.apply(this, arguments);
    } catch (e) {
      return catcher.apply(this, _concat([e], arguments));
    }
  });
});
module.exports = tryCatch;
},{"./internal/_arity":94,"./internal/_concat":101,"./internal/_curry2":106}],294:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 *      R.type(() => {}); //=> "Function"
 *      R.type(undefined); //=> "Undefined"
 */


var type = /*#__PURE__*/_curry1(function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
});
module.exports = type;
},{"./internal/_curry1":105}],295:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Takes a function `fn`, which takes a single array argument, and returns a
 * function which:
 *
 *   - takes any number of positional arguments;
 *   - passes these arguments to `fn` as an array; and
 *   - returns the result.
 *
 * In other words, `R.unapply` derives a variadic function from a function which
 * takes an array. `R.unapply` is the inverse of [`R.apply`](#apply).
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Function
 * @sig ([*...] -> a) -> (*... -> a)
 * @param {Function} fn
 * @return {Function}
 * @see R.apply
 * @example
 *
 *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
 * @symb R.unapply(f)(a, b) = f([a, b])
 */


var unapply = /*#__PURE__*/_curry1(function unapply(fn) {
  return function () {
    return fn(Array.prototype.slice.call(arguments, 0));
  };
});
module.exports = unapply;
},{"./internal/_curry1":105}],296:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var nAry = /*#__PURE__*/require('./nAry');

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 1 parameter. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> b) -> (a -> b)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 1.
 * @see R.binary, R.nAry
 * @example
 *
 *      var takesTwoArgs = function(a, b) {
 *        return [a, b];
 *      };
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      var takesOneArg = R.unary(takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only 1 argument is passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.unary(f)(a, b, c) = f(a)
 */


var unary = /*#__PURE__*/_curry1(function unary(fn) {
  return nAry(1, fn);
});
module.exports = unary;
},{"./internal/_curry1":105,"./nAry":212}],297:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Returns a function of arity `n` from a (manually) curried function.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Function
 * @sig Number -> (a -> b) -> (a -> c)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to uncurry.
 * @return {Function} A new function.
 * @see R.curry
 * @example
 *
 *      var addFour = a => b => c => d => a + b + c + d;
 *
 *      var uncurriedAddFour = R.uncurryN(4, addFour);
 *      uncurriedAddFour(1, 2, 3, 4); //=> 10
 */


var uncurryN = /*#__PURE__*/_curry2(function uncurryN(depth, fn) {
  return curryN(depth, function () {
    var currentDepth = 1;
    var value = fn;
    var idx = 0;
    var endIdx;
    while (currentDepth <= depth && typeof value === 'function') {
      endIdx = currentDepth === depth ? arguments.length : idx + value.length;
      value = value.apply(this, Array.prototype.slice.call(arguments, idx, endIdx));
      currentDepth += 1;
      idx = endIdx;
    }
    return value;
  });
});
module.exports = uncurryN;
},{"./curryN":42,"./internal/_curry2":106}],298:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Builds a list from a seed value. Accepts an iterator function, which returns
 * either false to stop iteration or an array of length 2 containing the value
 * to add to the resulting list and the seed to be used in the next call to the
 * iterator function.
 *
 * The iterator function receives one argument: *(seed)*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (a -> [b]) -> * -> [b]
 * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
 *        either false to quit iteration or an array of length two to proceed. The element
 *        at index 0 of this array will be added to the resulting array, and the element
 *        at index 1 will be passed to the next call to `fn`.
 * @param {*} seed The seed value.
 * @return {Array} The final list.
 * @example
 *
 *      var f = n => n > 50 ? false : [-n, n + 10];
 *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
 * @symb R.unfold(f, x) = [f(x)[0], f(f(x)[1])[0], f(f(f(x)[1])[1])[0], ...]
 */


var unfold = /*#__PURE__*/_curry2(function unfold(fn, seed) {
  var pair = fn(seed);
  var result = [];
  while (pair && pair.length) {
    result[result.length] = pair[0];
    pair = fn(pair[1]);
  }
  return result;
});
module.exports = unfold;
},{"./internal/_curry2":106}],299:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var compose = /*#__PURE__*/require('./compose');

var uniq = /*#__PURE__*/require('./uniq');

/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @example
 *
 *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
 */


var union = /*#__PURE__*/_curry2( /*#__PURE__*/compose(uniq, _concat));
module.exports = union;
},{"./compose":31,"./internal/_concat":101,"./internal/_curry2":106,"./uniq":301}],300:[function(require,module,exports){
var _concat = /*#__PURE__*/require('./internal/_concat');

var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var uniqWith = /*#__PURE__*/require('./uniqWith');

/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list. Duplication is determined according to the value returned by
 * applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [*] -> [*] -> [*]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @see R.union
 * @example
 *
 *      var l1 = [{a: 1}, {a: 2}];
 *      var l2 = [{a: 1}, {a: 4}];
 *      R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
 */


var unionWith = /*#__PURE__*/_curry3(function unionWith(pred, list1, list2) {
  return uniqWith(pred, _concat(list1, list2));
});
module.exports = unionWith;
},{"./internal/_concat":101,"./internal/_curry3":107,"./uniqWith":303}],301:[function(require,module,exports){
var identity = /*#__PURE__*/require('./identity');

var uniqBy = /*#__PURE__*/require('./uniqBy');

/**
 * Returns a new list containing only one copy of each element in the original
 * list. [`R.equals`](#equals) is used to determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
 *      R.uniq([1, '1']);     //=> [1, '1']
 *      R.uniq([[42], [42]]); //=> [[42]]
 */


var uniq = /*#__PURE__*/uniqBy(identity);
module.exports = uniq;
},{"./identity":82,"./uniqBy":302}],302:[function(require,module,exports){
var _Set = /*#__PURE__*/require('./internal/_Set');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. [`R.equals`](#equals) is used for comparison.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 */


var uniqBy = /*#__PURE__*/_curry2(function uniqBy(fn, list) {
  var set = new _Set();
  var result = [];
  var idx = 0;
  var appliedItem, item;

  while (idx < list.length) {
    item = list[idx];
    appliedItem = fn(item);
    if (set.add(appliedItem)) {
      result.push(item);
    }
    idx += 1;
  }
  return result;
});
module.exports = uniqBy;
},{"./internal/_Set":92,"./internal/_curry2":106}],303:[function(require,module,exports){
var _containsWith = /*#__PURE__*/require('./internal/_containsWith');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied predicate to
 * two list elements. Prefers the first item if two items compare equal based
 * on the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      var strEq = R.eqBy(String);
 *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
 *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
 *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
 *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
 */


var uniqWith = /*#__PURE__*/_curry2(function uniqWith(pred, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var item;
  while (idx < len) {
    item = list[idx];
    if (!_containsWith(pred, item, result)) {
      result[result.length] = item;
    }
    idx += 1;
  }
  return result;
});
module.exports = uniqWith;
},{"./internal/_containsWith":103,"./internal/_curry2":106}],304:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is not satisfied, the function will return the result of
 * calling the `whenFalseFn` function with the same argument. If the predicate
 * is satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred        A predicate function
 * @param {Function} whenFalseFn A function to invoke when the `pred` evaluates
 *                               to a falsy value.
 * @param {*}        x           An object to test with the `pred` function and
 *                               pass to `whenFalseFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenFalseFn`.
 * @see R.ifElse, R.when
 * @example
 *
 *      let safeInc = R.unless(R.isNil, R.inc);
 *      safeInc(null); //=> null
 *      safeInc(1); //=> 2
 */


var unless = /*#__PURE__*/_curry3(function unless(pred, whenFalseFn, x) {
  return pred(x) ? x : whenFalseFn(x);
});
module.exports = unless;
},{"./internal/_curry3":107}],305:[function(require,module,exports){
var _identity = /*#__PURE__*/require('./internal/_identity');

var chain = /*#__PURE__*/require('./chain');

/**
 * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
 * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain c => c (c a) -> c a
 * @param {*} list
 * @return {*}
 * @see R.flatten, R.chain
 * @example
 *
 *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
 *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
 */


var unnest = /*#__PURE__*/chain(_identity);
module.exports = unnest;
},{"./chain":26,"./internal/_identity":118}],306:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 * It does so by applying the transformation until the predicate is satisfied,
 * at which point it returns the satisfactory value.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred A predicate function
 * @param {Function} fn The iterator function
 * @param {*} init Initial value
 * @return {*} Final value that satisfies predicate
 * @example
 *
 *      R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
 */


var until = /*#__PURE__*/_curry3(function until(pred, fn, init) {
  var val = init;
  while (!pred(val)) {
    val = fn(val);
  }
  return val;
});
module.exports = until;
},{"./internal/_curry3":107}],307:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

var adjust = /*#__PURE__*/require('./adjust');

var always = /*#__PURE__*/require('./always');

/**
 * Returns a new copy of the array with the element at the provided index
 * replaced with the given value.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} idx The index to update.
 * @param {*} x The value to exist at the given index of the returned array.
 * @param {Array|Arguments} list The source array-like object to be updated.
 * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
 * @see R.adjust
 * @example
 *
 *      R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]
 *      R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]
 * @symb R.update(-1, a, [b, c]) = [b, a]
 * @symb R.update(0, a, [b, c]) = [a, c]
 * @symb R.update(1, a, [b, c]) = [b, a]
 */


var update = /*#__PURE__*/_curry3(function update(idx, x, list) {
  return adjust(always(x), idx, list);
});
module.exports = update;
},{"./adjust":6,"./always":9,"./internal/_curry3":107}],308:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var curryN = /*#__PURE__*/require('./curryN');

/**
 * Accepts a function `fn` and a list of transformer functions and returns a
 * new curried function. When the new function is invoked, it calls the
 * function `fn` with parameters consisting of the result of calling each
 * supplied handler on successive arguments to the new function.
 *
 * If more arguments are passed to the returned function than transformer
 * functions, those arguments are passed directly to `fn` as additional
 * parameters. If you expect additional arguments that don't need to be
 * transformed, although you can ignore them, it's best to pass an identity
 * function so that the new function reports the correct arity.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} fn The function to wrap.
 * @param {Array} transformers A list of transformer functions
 * @return {Function} The wrapped function.
 * @see R.converge
 * @example
 *
 *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
 *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
 *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
 *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
 * @symb R.useWith(f, [g, h])(a, b) = f(g(a), h(b))
 */


var useWith = /*#__PURE__*/_curry2(function useWith(fn, transformers) {
  return curryN(transformers.length, function () {
    var args = [];
    var idx = 0;
    while (idx < transformers.length) {
      args.push(transformers[idx].call(this, arguments[idx]));
      idx += 1;
    }
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
  });
});
module.exports = useWith;
},{"./curryN":42,"./internal/_curry2":106}],309:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

var keys = /*#__PURE__*/require('./keys');

/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @see R.valuesIn, R.keys
 * @example
 *
 *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */


var values = /*#__PURE__*/_curry1(function values(obj) {
  var props = keys(obj);
  var len = props.length;
  var vals = [];
  var idx = 0;
  while (idx < len) {
    vals[idx] = obj[props[idx]];
    idx += 1;
  }
  return vals;
});
module.exports = values;
},{"./internal/_curry1":105,"./keys":175}],310:[function(require,module,exports){
var _curry1 = /*#__PURE__*/require('./internal/_curry1');

/**
 * Returns a list of all the properties, including prototype properties, of the
 * supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own and prototype properties.
 * @see R.values, R.keysIn
 * @example
 *
 *      var F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      var f = new F();
 *      R.valuesIn(f); //=> ['X', 'Y']
 */


var valuesIn = /*#__PURE__*/_curry1(function valuesIn(obj) {
  var prop;
  var vs = [];
  for (prop in obj) {
    vs[vs.length] = obj[prop];
  }
  return vs;
});
module.exports = valuesIn;
},{"./internal/_curry1":105}],311:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

// `Const` is a functor that effectively ignores the function given to `map`.


var Const = function (x) {
  return { value: x, 'fantasy-land/map': function () {
      return this;
    } };
};

/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> s -> a
 * @param {Lens} lens
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      var xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});  //=> 1
 *      R.view(xLens, {x: 4, y: 2});  //=> 4
 */
var view = /*#__PURE__*/_curry2(function view(lens, x) {
  // Using `Const` effectively ignores the setter function of the `lens`,
  // leaving the value returned by the getter function unmodified.
  return lens(Const)(x).value;
});
module.exports = view;
},{"./internal/_curry2":106}],312:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is satisfied, the function will return the result of calling
 * the `whenTrueFn` function with the same argument. If the predicate is not
 * satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred       A predicate function
 * @param {Function} whenTrueFn A function to invoke when the `condition`
 *                              evaluates to a truthy value.
 * @param {*}        x          An object to test with the `pred` function and
 *                              pass to `whenTrueFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenTrueFn`.
 * @see R.ifElse, R.unless
 * @example
 *
 *      // truncate :: String -> String
 *      var truncate = R.when(
 *        R.propSatisfies(R.gt(R.__, 10), 'length'),
 *        R.pipe(R.take(10), R.append('…'), R.join(''))
 *      );
 *      truncate('12345');         //=> '12345'
 *      truncate('0123456789ABC'); //=> '0123456789…'
 */


var when = /*#__PURE__*/_curry3(function when(pred, whenTrueFn, x) {
  return pred(x) ? whenTrueFn(x) : x;
});
module.exports = when;
},{"./internal/_curry3":107}],313:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var _has = /*#__PURE__*/require('./internal/_has');

/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `where` returns true if all the predicates return true, false
 * otherwise.
 *
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Object
 * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propSatisfies, R.whereEq
 * @example
 *
 *      // pred :: Object -> Boolean
 *      var pred = R.where({
 *        a: R.equals('foo'),
 *        b: R.complement(R.equals('bar')),
 *        x: R.gt(R.__, 10),
 *        y: R.lt(R.__, 20)
 *      });
 *
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
 *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
 */


var where = /*#__PURE__*/_curry2(function where(spec, testObj) {
  for (var prop in spec) {
    if (_has(prop, spec) && !spec[prop](testObj[prop])) {
      return false;
    }
  }
  return true;
});
module.exports = where;
},{"./internal/_curry2":106,"./internal/_has":117}],314:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var equals = /*#__PURE__*/require('./equals');

var map = /*#__PURE__*/require('./map');

var where = /*#__PURE__*/require('./where');

/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec, false otherwise. An object satisfies the spec if, for each of the
 * spec's own properties, accessing that property of the object gives the same
 * value (in [`R.equals`](#equals) terms) as accessing that property of the
 * spec.
 *
 * `whereEq` is a specialization of [`where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @sig {String: *} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propEq, R.where
 * @example
 *
 *      // pred :: Object -> Boolean
 *      var pred = R.whereEq({a: 1, b: 2});
 *
 *      pred({a: 1});              //=> false
 *      pred({a: 1, b: 2});        //=> true
 *      pred({a: 1, b: 2, c: 3});  //=> true
 *      pred({a: 1, b: 1});        //=> false
 */


var whereEq = /*#__PURE__*/_curry2(function whereEq(spec, testObj) {
  return where(map(equals, spec), testObj);
});
module.exports = whereEq;
},{"./equals":62,"./internal/_curry2":106,"./map":188,"./where":313}],315:[function(require,module,exports){
var _contains = /*#__PURE__*/require('./internal/_contains');

var _curry2 = /*#__PURE__*/require('./internal/_curry2');

var flip = /*#__PURE__*/require('./flip');

var reject = /*#__PURE__*/require('./reject');

/**
 * Returns a new list without values in the first argument.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The values to be removed from `list2`.
 * @param {Array} list2 The array to remove values from.
 * @return {Array} The new array without values in `list1`.
 * @see R.transduce, R.difference
 * @example
 *
 *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 */


var without = /*#__PURE__*/_curry2(function (xs, list) {
  return reject(flip(_contains)(xs), list);
});
module.exports = without;
},{"./flip":70,"./internal/_contains":102,"./internal/_curry2":106,"./reject":255}],316:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The list made by combining each possible pair from
 *         `as` and `bs` into pairs (`[a, b]`).
 * @example
 *
 *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * @symb R.xprod([a, b], [c, d]) = [[a, c], [a, d], [b, c], [b, d]]
 */


var xprod = /*#__PURE__*/_curry2(function xprod(a, b) {
  // = xprodWith(prepend); (takes about 3 times as long...)
  var idx = 0;
  var ilen = a.length;
  var j;
  var jlen = b.length;
  var result = [];
  while (idx < ilen) {
    j = 0;
    while (j < jlen) {
      result[result.length] = [a[idx], b[j]];
      j += 1;
    }
    idx += 1;
  }
  return result;
});
module.exports = xprod;
},{"./internal/_curry2":106}],317:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a new list out of the two supplied by pairing up equally-positioned
 * items from both lists. The returned list is truncated to the length of the
 * shorter of the two input lists.
 * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
 * @example
 *
 *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 * @symb R.zip([a, b, c], [d, e, f]) = [[a, d], [b, e], [c, f]]
 */


var zip = /*#__PURE__*/_curry2(function zip(a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);
  while (idx < len) {
    rv[idx] = [a[idx], b[idx]];
    idx += 1;
  }
  return rv;
});
module.exports = zip;
},{"./internal/_curry2":106}],318:[function(require,module,exports){
var _curry2 = /*#__PURE__*/require('./internal/_curry2');

/**
 * Creates a new object out of a list of keys and a list of values.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 * Note: `zipObj` is equivalent to `pipe(zip, fromPairs)`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [String] -> [*] -> {String: *}
 * @param {Array} keys The array that will be properties on the output object.
 * @param {Array} values The list of values on the output object.
 * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
 * @example
 *
 *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
 */


var zipObj = /*#__PURE__*/_curry2(function zipObj(keys, values) {
  var idx = 0;
  var len = Math.min(keys.length, values.length);
  var out = {};
  while (idx < len) {
    out[keys[idx]] = values[idx];
    idx += 1;
  }
  return out;
});
module.exports = zipObj;
},{"./internal/_curry2":106}],319:[function(require,module,exports){
var _curry3 = /*#__PURE__*/require('./internal/_curry3');

/**
 * Creates a new list out of the two supplied by applying the function to each
 * equally-positioned pair in the lists. The returned list is truncated to the
 * length of the shorter of the two input lists.
 *
 * @function
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> c) -> [a] -> [b] -> [c]
 * @param {Function} fn The function used to combine the two elements into one value.
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
 *         using `fn`.
 * @example
 *
 *      var f = (x, y) => {
 *        // ...
 *      };
 *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
 *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
 * @symb R.zipWith(fn, [a, b, c], [d, e, f]) = [fn(a, d), fn(b, e), fn(c, f)]
 */


var zipWith = /*#__PURE__*/_curry3(function zipWith(fn, a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);
  while (idx < len) {
    rv[idx] = fn(a[idx], b[idx]);
    idx += 1;
  }
  return rv;
});
module.exports = zipWith;
},{"./internal/_curry3":107}],320:[function(require,module,exports){
//const { List, Map, Record } = require('immutable'); 
const R = require('ramda'); 

(async function main() {
	const BOARD_WIDTH = 100;
	const BOARD_HEIGHT = 100;
	const TILE_SIZE = 10;

	const canvas = document.getElementById('board');
	canvas.width = BOARD_WIDTH;
	canvas.height = BOARD_HEIGHT;

	const context = canvas.getContext('2d');

	var worldMap = {
		rows: 10, 
		cols: 10,
		layers:	[
			0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
			0, 2, 1, 0, 2, 1, 0, 2, 1, 0,
			0, 1, 2, 0, 1, 2, 0, 1, 2, 0,
			0, 2, 1, 0, 2, 1, 0, 2, 1, 0,
			0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
			0, 2, 2, 0, 2, 2, 0, 2, 2, 0,
			0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
			0, 2, 1, 0, 2, 1, 0, 2, 1, 0,
			0, 1, 2, 0, 1, 2, 0, 1, 2, 0,
			0, 2, 2, 0, 2, 2, 0, 2, 2, 0,
		]
	}
	var camera = {
		x: 0,
		y: 0,
		width: 50,
		height: 50,
		maxX: 90,
		maxY: 90
	}
	var tileAtlas = new Map()
	tileAtlas.set(0, 'green')
	tileAtlas.set(1, 'purple')
	tileAtlas.set(2, 'blue')


	var getTileIndex = (row, col, cols) => row*cols + col
	// val is not used but needed for 
	var getRowCol = (cols, val, idx) => {
		return { row: Math.floor(idx / cols), col: idx % cols, val: val} 
	}
	getRowCol = R.curry(getRowCol)(worldMap.cols)

	var visibleRange = (camStart, camSize, tsize) => {
		return { 
			start: Math.floor(camStart / tsize),
			end: Math.floor(camStart / tsize) + camSize / tsize
		}
	}

	var colRange = visibleRange(camera.x, camera.width, TILE_SIZE)
	var rowRange = visibleRange(camera.y, camera.height, TILE_SIZE)
	var filterVisible = R.compose(
		R.filter(
			R.where({
				row: R.both(R.gt(R.__, rowRange.start - 1), R.lt(R.__, rowRange.end)),
				col: R.both(R.gt(R.__, colRange.start - 1), R.lt(R.__, colRange.end))
			})),
		R.addIndex(R.map)(getRowCol))

	var offset= R.curry((tsize, camPos) => -camPos + Math.floor(camPos / tsize) * tsize)(TILE_SIZE)
	var rowColValToXYVal = R.curry((tsize, cam, rowColVal) => {
		return {
			x: rowColVal.col * tsize + offset(cam.x), 
			y: rowColVal.row * tsize + offset(cam.y), 
			val: rowColVal.val
		}
	})(TILE_SIZE, camera) 
	var renderImage = R.curry((tsize, ctx, tatlas, XYVal) => {
		ctx.fillStyle = tatlas.get(XYVal.val)
		ctx.fillRect(XYVal.x, XYVal.y, tsize, tsize) 
	})(TILE_SIZE, context, tileAtlas)
	renderImage({x: 40, y: 30, val:1})
	var renderMap = R.compose(R.map(renderImage), R.map(rowColValToXYVal), filterVisible)

	renderMap(worldMap.layers)
})()

},{"ramda":85}]},{},[320])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92MTAuMi4xL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvRi5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvVC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvX18uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FkZC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYWRkSW5kZXguanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FkanVzdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYWxsLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9hbGxQYXNzLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9hbHdheXMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FuZC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYW55LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9hbnlQYXNzLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9hcC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYXBlcnR1cmUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FwcGVuZC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYXBwbHkuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2FwcGx5U3BlYy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYXBwbHlUby5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYXNjZW5kLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9hc3NvYy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvYXNzb2NQYXRoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9iaW5hcnkuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2JpbmQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2JvdGguanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2NhbGwuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2NoYWluLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jbGFtcC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY2xvbmUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2NvbXBhcmF0b3IuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2NvbXBsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2NvbXBvc2UuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2NvbXBvc2VLLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jb21wb3NlUC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY29uY2F0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jb25kLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jb25zdHJ1Y3QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2NvbnN0cnVjdE4uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2NvbnRhaW5zLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9jb252ZXJnZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY291bnRCeS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvY3VycnkuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2N1cnJ5Ti5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZGVjLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kZWZhdWx0VG8uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2Rlc2NlbmQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2RpZmZlcmVuY2UuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2RpZmZlcmVuY2VXaXRoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kaXNzb2MuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2Rpc3NvY1BhdGguanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2RpdmlkZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZHJvcC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZHJvcExhc3QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2Ryb3BMYXN0V2hpbGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2Ryb3BSZXBlYXRzLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9kcm9wUmVwZWF0c1dpdGguanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2Ryb3BXaGlsZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZWl0aGVyLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZW5kc1dpdGguanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2VxQnkuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2VxUHJvcHMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2VxdWFscy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZXZvbHZlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9maWx0ZXIuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ZpbmQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ZpbmRJbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZmluZExhc3QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ZpbmRMYXN0SW5kZXguanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ZsYXR0ZW4uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ZsaXAuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ZvckVhY2guanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ZvckVhY2hPYmpJbmRleGVkLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9mcm9tUGFpcnMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2dyb3VwQnkuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2dyb3VwV2l0aC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvZ3QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2d0ZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaGFzLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9oYXNJbi5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaGVhZC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaWRlbnRpY2FsLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pZGVudGl0eS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaWZFbHNlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbmMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbmRleEJ5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbmRleE9mLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbml0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbm5lckpvaW4uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2luc2VydC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW5zZXJ0QWxsLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fU2V0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fYXBlcnR1cmUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19hcml0eS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2FycmF5RnJvbUl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY2hlY2tGb3JNZXRob2QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jbG9uZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2Nsb25lUmVnRXhwLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY29tcGxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2NvbmNhdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2NvbnRhaW5zLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY29udGFpbnNXaXRoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fY3JlYXRlUGFydGlhbEFwcGxpY2F0b3IuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeTEuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeTIuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeTMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19jdXJyeU4uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19kaXNwYXRjaGFibGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19kcm9wTGFzdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2Ryb3BMYXN0V2hpbGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19lcXVhbHMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19maWx0ZXIuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19mbGF0Q2F0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fZm9yY2VSZWR1Y2VkLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fZnVuY3Rpb25OYW1lLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faGFzLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faWRlbnRpdHkuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pbmRleE9mLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNBcmd1bWVudHMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pc0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNBcnJheUxpa2UuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pc0Z1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNJbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNOdW1iZXIuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzUGxhY2Vob2xkZXIuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19pc1JlZ0V4cC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX2lzU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9faXNUcmFuc2Zvcm1lci5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX21ha2VGbGF0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fbWFwLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fb2JqZWN0QXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fb2YuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19waXBlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fcGlwZVAuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19xdW90ZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3JlZHVjZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3JlZHVjZWQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL19zdGVwQ2F0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9fdG9JU09TdHJpbmcuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL190b1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hhbGwuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194YW55LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feGFwZXJ0dXJlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feGNoYWluLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feGRyb3AuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194ZHJvcExhc3QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194ZHJvcExhc3RXaGlsZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hkcm9wUmVwZWF0c1dpdGguanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194ZHJvcFdoaWxlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feGZCYXNlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feGZpbHRlci5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hmaW5kLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feGZpbmRJbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hmaW5kTGFzdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hmaW5kTGFzdEluZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feG1hcC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3hyZWR1Y2VCeS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3h0YWtlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcm5hbC9feHRha2VXaGlsZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJuYWwvX3h0YXAuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludGVybmFsL194d3JhcC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50ZXJzZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnRlcnNwZXJzZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW50by5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvaW52ZXJ0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pbnZlcnRPYmouanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2ludm9rZXIuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2lzLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pc0VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9pc05pbC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvam9pbi5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvanV4dC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMva2V5c0luLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9sYXN0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9sYXN0SW5kZXhPZi5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbGVuZ3RoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9sZW5zLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9sZW5zSW5kZXguanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2xlbnNQYXRoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9sZW5zUHJvcC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbGlmdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbGlmdE4uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL2x0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9sdGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL21hcC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWFwQWNjdW0uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL21hcEFjY3VtUmlnaHQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL21hcE9iakluZGV4ZWQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL21hdGNoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tYXRoTW9kLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tYXguanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL21heEJ5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tZWFuLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tZWRpYW4uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL21lbW9pemUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL21lbW9pemVXaXRoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tZXJnZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWVyZ2VBbGwuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL21lcmdlRGVlcExlZnQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL21lcmdlRGVlcFJpZ2h0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tZXJnZURlZXBXaXRoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tZXJnZURlZXBXaXRoS2V5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tZXJnZVdpdGguanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL21lcmdlV2l0aEtleS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbWluLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9taW5CeS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbW9kdWxvLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9tdWx0aXBseS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbkFyeS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbmVnYXRlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9ub25lLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9ub3QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL250aC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvbnRoQXJnLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9vLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9vYmpPZi5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvb2YuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL29taXQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL29uY2UuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL29yLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9vdmVyLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wYWlyLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wYXJ0aWFsLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wYXJ0aWFsUmlnaHQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BhcnRpdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcGF0aC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcGF0aEVxLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wYXRoT3IuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BhdGhTYXRpc2ZpZXMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BpY2suanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BpY2tBbGwuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BpY2tCeS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcGlwZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcGlwZUsuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3BpcGVQLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wbHVjay5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcHJlcGVuZC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcHJvZHVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcHJvamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcHJvcC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcHJvcEVxLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9wcm9wSXMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3Byb3BPci5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcHJvcFNhdGlzZmllcy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcHJvcHMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3JhbmdlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9yZWR1Y2UuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3JlZHVjZUJ5LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9yZWR1Y2VSaWdodC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcmVkdWNlV2hpbGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3JlZHVjZWQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3JlamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvcmVtb3ZlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9yZXBlYXQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3JlcGxhY2UuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3JldmVyc2UuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3NjYW4uanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3NlcXVlbmNlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9zZXQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3NsaWNlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9zb3J0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9zb3J0QnkuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3NvcnRXaXRoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9zcGxpdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc3BsaXRBdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc3BsaXRFdmVyeS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc3BsaXRXaGVuLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9zdGFydHNXaXRoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9zdWJ0cmFjdC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvc3VtLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9zeW1tZXRyaWNEaWZmZXJlbmNlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy9zeW1tZXRyaWNEaWZmZXJlbmNlV2l0aC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdGFpbC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdGFrZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdGFrZUxhc3QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3Rha2VMYXN0V2hpbGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3Rha2VXaGlsZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdGFwLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90ZXN0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90aW1lcy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdG9Mb3dlci5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdG9QYWlycy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdG9QYWlyc0luLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90b1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdG9VcHBlci5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdHJhbnNkdWNlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90cmFuc3Bvc2UuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3RyYXZlcnNlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90cmltLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy90cnlDYXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdHlwZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdW5hcHBseS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdW5hcnkuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3VuY3VycnlOLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy91bmZvbGQuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3VuaW9uLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy91bmlvbldpdGguanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3VuaXEuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3VuaXFCeS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdW5pcVdpdGguanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3VubGVzcy5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdW5uZXN0LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy91bnRpbC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvdXBkYXRlLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy91c2VXaXRoLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy92YWx1ZXMuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3ZhbHVlc0luLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy92aWV3LmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy93aGVuLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy93aGVyZS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvd2hlcmVFcS5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvd2l0aG91dC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMveHByb2QuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvc3JjL3ppcC5qcyIsIm5vZGVfbW9kdWxlcy9yYW1kYS9zcmMvemlwT2JqLmpzIiwibm9kZV9tb2R1bGVzL3JhbWRhL3NyYy96aXBXaXRoLmpzIiwic3JjL2FwcC9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciBhbHdheXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hbHdheXMnKTtcblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgYWx3YXlzIHJldHVybnMgYGZhbHNlYC4gQW55IHBhc3NlZCBpbiBwYXJhbWV0ZXJzIGFyZSBpZ25vcmVkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjkuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICogLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBzZWUgUi5hbHdheXMsIFIuVFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuRigpOyAvLz0+IGZhbHNlXG4gKi9cblxuXG52YXIgRiA9IC8qI19fUFVSRV9fKi9hbHdheXMoZmFsc2UpO1xubW9kdWxlLmV4cG9ydHMgPSBGOyIsInZhciBhbHdheXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hbHdheXMnKTtcblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgYWx3YXlzIHJldHVybnMgYHRydWVgLiBBbnkgcGFzc2VkIGluIHBhcmFtZXRlcnMgYXJlIGlnbm9yZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKiAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHNlZSBSLmFsd2F5cywgUi5GXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5UKCk7IC8vPT4gdHJ1ZVxuICovXG5cblxudmFyIFQgPSAvKiNfX1BVUkVfXyovYWx3YXlzKHRydWUpO1xubW9kdWxlLmV4cG9ydHMgPSBUOyIsIi8qKlxuICogQSBzcGVjaWFsIHBsYWNlaG9sZGVyIHZhbHVlIHVzZWQgdG8gc3BlY2lmeSBcImdhcHNcIiB3aXRoaW4gY3VycmllZCBmdW5jdGlvbnMsXG4gKiBhbGxvd2luZyBwYXJ0aWFsIGFwcGxpY2F0aW9uIG9mIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMsIHJlZ2FyZGxlc3Mgb2ZcbiAqIHRoZWlyIHBvc2l0aW9ucy5cbiAqXG4gKiBJZiBgZ2AgaXMgYSBjdXJyaWVkIHRlcm5hcnkgZnVuY3Rpb24gYW5kIGBfYCBpcyBgUi5fX2AsIHRoZSBmb2xsb3dpbmcgYXJlXG4gKiBlcXVpdmFsZW50OlxuICpcbiAqICAgLSBgZygxLCAyLCAzKWBcbiAqICAgLSBgZyhfLCAyLCAzKSgxKWBcbiAqICAgLSBgZyhfLCBfLCAzKSgxKSgyKWBcbiAqICAgLSBgZyhfLCBfLCAzKSgxLCAyKWBcbiAqICAgLSBgZyhfLCAyLCBfKSgxLCAzKWBcbiAqICAgLSBgZyhfLCAyKSgxKSgzKWBcbiAqICAgLSBgZyhfLCAyKSgxLCAzKWBcbiAqICAgLSBgZyhfLCAyKShfLCAzKSgxKWBcbiAqXG4gKiBAY29uc3RhbnRcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNi4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZ3JlZXQgPSBSLnJlcGxhY2UoJ3tuYW1lfScsIFIuX18sICdIZWxsbywge25hbWV9IScpO1xuICogICAgICBncmVldCgnQWxpY2UnKTsgLy89PiAnSGVsbG8sIEFsaWNlISdcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7ICdAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInOiB0cnVlIH07IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogQWRkcyB0d28gdmFsdWVzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IE1hdGhcbiAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBOdW1iZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gKiBAcGFyYW0ge051bWJlcn0gYlxuICogQHJldHVybiB7TnVtYmVyfVxuICogQHNlZSBSLnN1YnRyYWN0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5hZGQoMiwgMyk7ICAgICAgIC8vPT4gIDVcbiAqICAgICAgUi5hZGQoNykoMTApOyAgICAgIC8vPT4gMTdcbiAqL1xuXG5cbnZhciBhZGQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBhZGQoYSwgYikge1xuICByZXR1cm4gTnVtYmVyKGEpICsgTnVtYmVyKGIpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGFkZDsiLCJ2YXIgX2NvbmNhdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jb25jYXQnKTtcblxudmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBjdXJyeU4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jdXJyeU4nKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGxpc3QgaXRlcmF0aW9uIGZ1bmN0aW9uIGZyb20gYW4gZXhpc3Rpbmcgb25lIGJ5IGFkZGluZyB0d28gbmV3XG4gKiBwYXJhbWV0ZXJzIHRvIGl0cyBjYWxsYmFjayBmdW5jdGlvbjogdGhlIGN1cnJlbnQgaW5kZXgsIGFuZCB0aGUgZW50aXJlIGxpc3QuXG4gKlxuICogVGhpcyB3b3VsZCB0dXJuLCBmb3IgaW5zdGFuY2UsIFtgUi5tYXBgXSgjbWFwKSBmdW5jdGlvbiBpbnRvIG9uZSB0aGF0XG4gKiBtb3JlIGNsb3NlbHkgcmVzZW1ibGVzIGBBcnJheS5wcm90b3R5cGUubWFwYC4gTm90ZSB0aGF0IHRoaXMgd2lsbCBvbmx5IHdvcmtcbiAqIGZvciBmdW5jdGlvbnMgaW4gd2hpY2ggdGhlIGl0ZXJhdGlvbiBjYWxsYmFjayBmdW5jdGlvbiBpcyB0aGUgZmlyc3RcbiAqIHBhcmFtZXRlciwgYW5kIHdoZXJlIHRoZSBsaXN0IGlzIHRoZSBsYXN0IHBhcmFtZXRlci4gKFRoaXMgbGF0dGVyIG1pZ2h0IGJlXG4gKiB1bmltcG9ydGFudCBpZiB0aGUgbGlzdCBwYXJhbWV0ZXIgaXMgbm90IHVzZWQuKVxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE1LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKChhIC4uLiAtPiBiKSAuLi4gLT4gW2FdIC0+ICopIC0+IChhIC4uLiwgSW50LCBbYV0gLT4gYikgLi4uIC0+IFthXSAtPiAqKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gQSBsaXN0IGl0ZXJhdGlvbiBmdW5jdGlvbiB0aGF0IGRvZXMgbm90IHBhc3MgaW5kZXggb3IgbGlzdCB0byBpdHMgY2FsbGJhY2tcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBbiBhbHRlcmVkIGxpc3QgaXRlcmF0aW9uIGZ1bmN0aW9uIHRoYXQgcGFzc2VzIChpdGVtLCBpbmRleCwgbGlzdCkgdG8gaXRzIGNhbGxiYWNrXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIG1hcEluZGV4ZWQgPSBSLmFkZEluZGV4KFIubWFwKTtcbiAqICAgICAgbWFwSW5kZXhlZCgodmFsLCBpZHgpID0+IGlkeCArICctJyArIHZhbCwgWydmJywgJ28nLCAnbycsICdiJywgJ2EnLCAnciddKTtcbiAqICAgICAgLy89PiBbJzAtZicsICcxLW8nLCAnMi1vJywgJzMtYicsICc0LWEnLCAnNS1yJ11cbiAqL1xuXG5cbnZhciBhZGRJbmRleCA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGFkZEluZGV4KGZuKSB7XG4gIHJldHVybiBjdXJyeU4oZm4ubGVuZ3RoLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlkeCA9IDA7XG4gICAgdmFyIG9yaWdGbiA9IGFyZ3VtZW50c1swXTtcbiAgICB2YXIgbGlzdCA9IGFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoIC0gMV07XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIGFyZ3NbMF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gb3JpZ0ZuLmFwcGx5KHRoaXMsIF9jb25jYXQoYXJndW1lbnRzLCBbaWR4LCBsaXN0XSkpO1xuICAgICAgaWR4ICs9IDE7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBhZGRJbmRleDsiLCJ2YXIgX2NvbmNhdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jb25jYXQnKTtcblxudmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8qKlxuICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIHRoZSB2YWx1ZSBhdCB0aGUgZ2l2ZW4gaW5kZXggb2YgYW4gYXJyYXksIHJldHVybmluZyBhXG4gKiBuZXcgY29weSBvZiB0aGUgYXJyYXkgd2l0aCB0aGUgZWxlbWVudCBhdCB0aGUgZ2l2ZW4gaW5kZXggcmVwbGFjZWQgd2l0aCB0aGVcbiAqIHJlc3VsdCBvZiB0aGUgZnVuY3Rpb24gYXBwbGljYXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTQuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gYSkgLT4gTnVtYmVyIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBhcHBseS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBpZHggVGhlIGluZGV4LlxuICogQHBhcmFtIHtBcnJheXxBcmd1bWVudHN9IGxpc3QgQW4gYXJyYXktbGlrZSBvYmplY3Qgd2hvc2UgdmFsdWVcbiAqICAgICAgICBhdCB0aGUgc3VwcGxpZWQgaW5kZXggd2lsbCBiZSByZXBsYWNlZC5cbiAqIEByZXR1cm4ge0FycmF5fSBBIGNvcHkgb2YgdGhlIHN1cHBsaWVkIGFycmF5LWxpa2Ugb2JqZWN0IHdpdGhcbiAqICAgICAgICAgdGhlIGVsZW1lbnQgYXQgaW5kZXggYGlkeGAgcmVwbGFjZWQgd2l0aCB0aGUgdmFsdWVcbiAqICAgICAgICAgcmV0dXJuZWQgYnkgYXBwbHlpbmcgYGZuYCB0byB0aGUgZXhpc3RpbmcgZWxlbWVudC5cbiAqIEBzZWUgUi51cGRhdGVcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmFkanVzdChSLmFkZCgxMCksIDEsIFsxLCAyLCAzXSk7ICAgICAvLz0+IFsxLCAxMiwgM11cbiAqICAgICAgUi5hZGp1c3QoUi5hZGQoMTApKSgxKShbMSwgMiwgM10pOyAgICAgLy89PiBbMSwgMTIsIDNdXG4gKiBAc3ltYiBSLmFkanVzdChmLCAtMSwgW2EsIGJdKSA9IFthLCBmKGIpXVxuICogQHN5bWIgUi5hZGp1c3QoZiwgMCwgW2EsIGJdKSA9IFtmKGEpLCBiXVxuICovXG5cblxudmFyIGFkanVzdCA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIGFkanVzdChmbiwgaWR4LCBsaXN0KSB7XG4gIGlmIChpZHggPj0gbGlzdC5sZW5ndGggfHwgaWR4IDwgLWxpc3QubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGxpc3Q7XG4gIH1cbiAgdmFyIHN0YXJ0ID0gaWR4IDwgMCA/IGxpc3QubGVuZ3RoIDogMDtcbiAgdmFyIF9pZHggPSBzdGFydCArIGlkeDtcbiAgdmFyIF9saXN0ID0gX2NvbmNhdChsaXN0KTtcbiAgX2xpc3RbX2lkeF0gPSBmbihsaXN0W19pZHhdKTtcbiAgcmV0dXJuIF9saXN0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGFkanVzdDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9kaXNwYXRjaGFibGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG5cbnZhciBfeGFsbCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL194YWxsJyk7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgYWxsIGVsZW1lbnRzIG9mIHRoZSBsaXN0IG1hdGNoIHRoZSBwcmVkaWNhdGUsIGBmYWxzZWAgaWZcbiAqIHRoZXJlIGFyZSBhbnkgdGhhdCBkb24ndC5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgYWxsYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBwcmVkaWNhdGUgaXMgc2F0aXNmaWVkIGJ5IGV2ZXJ5IGVsZW1lbnQsIGBmYWxzZWBcbiAqICAgICAgICAgb3RoZXJ3aXNlLlxuICogQHNlZSBSLmFueSwgUi5ub25lLCBSLnRyYW5zZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBlcXVhbHMzID0gUi5lcXVhbHMoMyk7XG4gKiAgICAgIFIuYWxsKGVxdWFsczMpKFszLCAzLCAzLCAzXSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmFsbChlcXVhbHMzKShbMywgMywgMSwgM10pOyAvLz0+IGZhbHNlXG4gKi9cblxuXG52YXIgYWxsID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFsnYWxsJ10sIF94YWxsLCBmdW5jdGlvbiBhbGwoZm4sIGxpc3QpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgIGlmICghZm4obGlzdFtpZHhdKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gYWxsOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgY3VycnlOID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY3VycnlOJyk7XG5cbnZhciBtYXggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tYXgnKTtcblxudmFyIHBsdWNrID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcGx1Y2snKTtcblxudmFyIHJlZHVjZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JlZHVjZScpO1xuXG4vKipcbiAqIFRha2VzIGEgbGlzdCBvZiBwcmVkaWNhdGVzIGFuZCByZXR1cm5zIGEgcHJlZGljYXRlIHRoYXQgcmV0dXJucyB0cnVlIGZvciBhXG4gKiBnaXZlbiBsaXN0IG9mIGFyZ3VtZW50cyBpZiBldmVyeSBvbmUgb2YgdGhlIHByb3ZpZGVkIHByZWRpY2F0ZXMgaXMgc2F0aXNmaWVkXG4gKiBieSB0aG9zZSBhcmd1bWVudHMuXG4gKlxuICogVGhlIGZ1bmN0aW9uIHJldHVybmVkIGlzIGEgY3VycmllZCBmdW5jdGlvbiB3aG9zZSBhcml0eSBtYXRjaGVzIHRoYXQgb2YgdGhlXG4gKiBoaWdoZXN0LWFyaXR5IHByZWRpY2F0ZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC45LjBcbiAqIEBjYXRlZ29yeSBMb2dpY1xuICogQHNpZyBbKCouLi4gLT4gQm9vbGVhbildIC0+ICgqLi4uIC0+IEJvb2xlYW4pXG4gKiBAcGFyYW0ge0FycmF5fSBwcmVkaWNhdGVzIEFuIGFycmF5IG9mIHByZWRpY2F0ZXMgdG8gY2hlY2tcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY29tYmluZWQgcHJlZGljYXRlXG4gKiBAc2VlIFIuYW55UGFzc1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBpc1F1ZWVuID0gUi5wcm9wRXEoJ3JhbmsnLCAnUScpO1xuICogICAgICB2YXIgaXNTcGFkZSA9IFIucHJvcEVxKCdzdWl0JywgJ+KZoO+4jicpO1xuICogICAgICB2YXIgaXNRdWVlbk9mU3BhZGVzID0gUi5hbGxQYXNzKFtpc1F1ZWVuLCBpc1NwYWRlXSk7XG4gKlxuICogICAgICBpc1F1ZWVuT2ZTcGFkZXMoe3Jhbms6ICdRJywgc3VpdDogJ+KZo++4jid9KTsgLy89PiBmYWxzZVxuICogICAgICBpc1F1ZWVuT2ZTcGFkZXMoe3Jhbms6ICdRJywgc3VpdDogJ+KZoO+4jid9KTsgLy89PiB0cnVlXG4gKi9cblxuXG52YXIgYWxsUGFzcyA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGFsbFBhc3MocHJlZHMpIHtcbiAgcmV0dXJuIGN1cnJ5TihyZWR1Y2UobWF4LCAwLCBwbHVjaygnbGVuZ3RoJywgcHJlZHMpKSwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBpZHggPSAwO1xuICAgIHZhciBsZW4gPSBwcmVkcy5sZW5ndGg7XG4gICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgaWYgKCFwcmVkc1tpZHhdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWR4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBhbGxQYXNzOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGFsd2F5cyByZXR1cm5zIHRoZSBnaXZlbiB2YWx1ZS4gTm90ZSB0aGF0IGZvclxuICogbm9uLXByaW1pdGl2ZXMgdGhlIHZhbHVlIHJldHVybmVkIGlzIGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbCB2YWx1ZS5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGtub3duIGFzIGBjb25zdGAsIGBjb25zdGFudGAsIG9yIGBLYCAoZm9yIEsgY29tYmluYXRvcikgaW5cbiAqIG90aGVyIGxhbmd1YWdlcyBhbmQgbGlicmFyaWVzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIGEgLT4gKCogLT4gYSlcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB3cmFwIGluIGEgZnVuY3Rpb25cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIEZ1bmN0aW9uIDo6ICogLT4gdmFsLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciB0ID0gUi5hbHdheXMoJ1RlZScpO1xuICogICAgICB0KCk7IC8vPT4gJ1RlZSdcbiAqL1xuXG5cbnZhciBhbHdheXMgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBhbHdheXModmFsKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBhbHdheXM7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgYm90aCBhcmd1bWVudHMgYXJlIGB0cnVlYDsgYGZhbHNlYCBvdGhlcndpc2UuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgYSAtPiBiIC0+IGEgfCBiXG4gKiBAcGFyYW0ge0FueX0gYVxuICogQHBhcmFtIHtBbnl9IGJcbiAqIEByZXR1cm4ge0FueX0gdGhlIGZpcnN0IGFyZ3VtZW50IGlmIGl0IGlzIGZhbHN5LCBvdGhlcndpc2UgdGhlIHNlY29uZCBhcmd1bWVudC5cbiAqIEBzZWUgUi5ib3RoXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5hbmQodHJ1ZSwgdHJ1ZSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmFuZCh0cnVlLCBmYWxzZSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5hbmQoZmFsc2UsIHRydWUpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuYW5kKGZhbHNlLCBmYWxzZSk7IC8vPT4gZmFsc2VcbiAqL1xuXG5cbnZhciBhbmQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBhbmQoYSwgYikge1xuICByZXR1cm4gYSAmJiBiO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGFuZDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9kaXNwYXRjaGFibGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG5cbnZhciBfeGFueSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL194YW55Jyk7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgYXQgbGVhc3Qgb25lIG9mIGVsZW1lbnRzIG9mIHRoZSBsaXN0IG1hdGNoIHRoZSBwcmVkaWNhdGUsXG4gKiBgZmFsc2VgIG90aGVyd2lzZS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgYW55YCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBwcmVkaWNhdGUgaXMgc2F0aXNmaWVkIGJ5IGF0IGxlYXN0IG9uZSBlbGVtZW50LCBgZmFsc2VgXG4gKiAgICAgICAgIG90aGVyd2lzZS5cbiAqIEBzZWUgUi5hbGwsIFIubm9uZSwgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbGVzc1RoYW4wID0gUi5mbGlwKFIubHQpKDApO1xuICogICAgICB2YXIgbGVzc1RoYW4yID0gUi5mbGlwKFIubHQpKDIpO1xuICogICAgICBSLmFueShsZXNzVGhhbjApKFsxLCAyXSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5hbnkobGVzc1RoYW4yKShbMSwgMl0pOyAvLz0+IHRydWVcbiAqL1xuXG5cbnZhciBhbnkgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MiggLyojX19QVVJFX18qL19kaXNwYXRjaGFibGUoWydhbnknXSwgX3hhbnksIGZ1bmN0aW9uIGFueShmbiwgbGlzdCkge1xuICB2YXIgaWR4ID0gMDtcbiAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgaWYgKGZuKGxpc3RbaWR4XSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IGFueTsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIGN1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2N1cnJ5TicpO1xuXG52YXIgbWF4ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWF4Jyk7XG5cbnZhciBwbHVjayA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3BsdWNrJyk7XG5cbnZhciByZWR1Y2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZWR1Y2UnKTtcblxuLyoqXG4gKiBUYWtlcyBhIGxpc3Qgb2YgcHJlZGljYXRlcyBhbmQgcmV0dXJucyBhIHByZWRpY2F0ZSB0aGF0IHJldHVybnMgdHJ1ZSBmb3IgYVxuICogZ2l2ZW4gbGlzdCBvZiBhcmd1bWVudHMgaWYgYXQgbGVhc3Qgb25lIG9mIHRoZSBwcm92aWRlZCBwcmVkaWNhdGVzIGlzXG4gKiBzYXRpc2ZpZWQgYnkgdGhvc2UgYXJndW1lbnRzLlxuICpcbiAqIFRoZSBmdW5jdGlvbiByZXR1cm5lZCBpcyBhIGN1cnJpZWQgZnVuY3Rpb24gd2hvc2UgYXJpdHkgbWF0Y2hlcyB0aGF0IG9mIHRoZVxuICogaGlnaGVzdC1hcml0eSBwcmVkaWNhdGUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgWygqLi4uIC0+IEJvb2xlYW4pXSAtPiAoKi4uLiAtPiBCb29sZWFuKVxuICogQHBhcmFtIHtBcnJheX0gcHJlZGljYXRlcyBBbiBhcnJheSBvZiBwcmVkaWNhdGVzIHRvIGNoZWNrXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGNvbWJpbmVkIHByZWRpY2F0ZVxuICogQHNlZSBSLmFsbFBhc3NcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgaXNDbHViID0gUi5wcm9wRXEoJ3N1aXQnLCAn4pmjJyk7XG4gKiAgICAgIHZhciBpc1NwYWRlID0gUi5wcm9wRXEoJ3N1aXQnLCAn4pmgJyk7XG4gKiAgICAgIHZhciBpc0JsYWNrQ2FyZCA9IFIuYW55UGFzcyhbaXNDbHViLCBpc1NwYWRlXSk7XG4gKlxuICogICAgICBpc0JsYWNrQ2FyZCh7cmFuazogJzEwJywgc3VpdDogJ+KZoyd9KTsgLy89PiB0cnVlXG4gKiAgICAgIGlzQmxhY2tDYXJkKHtyYW5rOiAnUScsIHN1aXQ6ICfimaAnfSk7IC8vPT4gdHJ1ZVxuICogICAgICBpc0JsYWNrQ2FyZCh7cmFuazogJ1EnLCBzdWl0OiAn4pmmJ30pOyAvLz0+IGZhbHNlXG4gKi9cblxuXG52YXIgYW55UGFzcyA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGFueVBhc3MocHJlZHMpIHtcbiAgcmV0dXJuIGN1cnJ5TihyZWR1Y2UobWF4LCAwLCBwbHVjaygnbGVuZ3RoJywgcHJlZHMpKSwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBpZHggPSAwO1xuICAgIHZhciBsZW4gPSBwcmVkcy5sZW5ndGg7XG4gICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgaWYgKHByZWRzW2lkeF0uYXBwbHkodGhpcywgYXJndW1lbnRzKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlkeCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGFueVBhc3M7IiwidmFyIF9jb25jYXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29uY2F0Jyk7XG5cbnZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX3JlZHVjZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19yZWR1Y2UnKTtcblxudmFyIG1hcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21hcCcpO1xuXG4vKipcbiAqIGFwIGFwcGxpZXMgYSBsaXN0IG9mIGZ1bmN0aW9ucyB0byBhIGxpc3Qgb2YgdmFsdWVzLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBhcGAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuIEFsc29cbiAqIHRyZWF0cyBjdXJyaWVkIGZ1bmN0aW9ucyBhcyBhcHBsaWNhdGl2ZXMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMy4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgW2EgLT4gYl0gLT4gW2FdIC0+IFtiXVxuICogQHNpZyBBcHBseSBmID0+IGYgKGEgLT4gYikgLT4gZiBhIC0+IGYgYlxuICogQHNpZyAoYSAtPiBiIC0+IGMpIC0+IChhIC0+IGIpIC0+IChhIC0+IGMpXG4gKiBAcGFyYW0geyp9IGFwcGx5RlxuICogQHBhcmFtIHsqfSBhcHBseVhcbiAqIEByZXR1cm4geyp9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5hcChbUi5tdWx0aXBseSgyKSwgUi5hZGQoMyldLCBbMSwyLDNdKTsgLy89PiBbMiwgNCwgNiwgNCwgNSwgNl1cbiAqICAgICAgUi5hcChbUi5jb25jYXQoJ3Rhc3R5ICcpLCBSLnRvVXBwZXJdLCBbJ3BpenphJywgJ3NhbGFkJ10pOyAvLz0+IFtcInRhc3R5IHBpenphXCIsIFwidGFzdHkgc2FsYWRcIiwgXCJQSVpaQVwiLCBcIlNBTEFEXCJdXG4gKlxuICogICAgICAvLyBSLmFwIGNhbiBhbHNvIGJlIHVzZWQgYXMgUyBjb21iaW5hdG9yXG4gKiAgICAgIC8vIHdoZW4gb25seSB0d28gZnVuY3Rpb25zIGFyZSBwYXNzZWRcbiAqICAgICAgUi5hcChSLmNvbmNhdCwgUi50b1VwcGVyKSgnUmFtZGEnKSAvLz0+ICdSYW1kYVJBTURBJ1xuICogQHN5bWIgUi5hcChbZiwgZ10sIFthLCBiXSkgPSBbZihhKSwgZihiKSwgZyhhKSwgZyhiKV1cbiAqL1xuXG5cbnZhciBhcCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGFwKGFwcGx5RiwgYXBwbHlYKSB7XG4gIHJldHVybiB0eXBlb2YgYXBwbHlYWydmYW50YXN5LWxhbmQvYXAnXSA9PT0gJ2Z1bmN0aW9uJyA/IGFwcGx5WFsnZmFudGFzeS1sYW5kL2FwJ10oYXBwbHlGKSA6IHR5cGVvZiBhcHBseUYuYXAgPT09ICdmdW5jdGlvbicgPyBhcHBseUYuYXAoYXBwbHlYKSA6IHR5cGVvZiBhcHBseUYgPT09ICdmdW5jdGlvbicgPyBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBhcHBseUYoeCkoYXBwbHlYKHgpKTtcbiAgfSA6XG4gIC8vIGVsc2VcbiAgX3JlZHVjZShmdW5jdGlvbiAoYWNjLCBmKSB7XG4gICAgcmV0dXJuIF9jb25jYXQoYWNjLCBtYXAoZiwgYXBwbHlYKSk7XG4gIH0sIFtdLCBhcHBseUYpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGFwOyIsInZhciBfYXBlcnR1cmUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fYXBlcnR1cmUnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfZGlzcGF0Y2hhYmxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xuXG52YXIgX3hhcGVydHVyZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL194YXBlcnR1cmUnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGxpc3QsIGNvbXBvc2VkIG9mIG4tdHVwbGVzIG9mIGNvbnNlY3V0aXZlIGVsZW1lbnRzLiBJZiBgbmAgaXNcbiAqIGdyZWF0ZXIgdGhhbiB0aGUgbGVuZ3RoIG9mIHRoZSBsaXN0LCBhbiBlbXB0eSBsaXN0IGlzIHJldHVybmVkLlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMi4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gW2FdIC0+IFtbYV1dXG4gKiBAcGFyYW0ge051bWJlcn0gbiBUaGUgc2l6ZSBvZiB0aGUgdHVwbGVzIHRvIGNyZWF0ZVxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBzcGxpdCBpbnRvIGBuYC1sZW5ndGggdHVwbGVzXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIHJlc3VsdGluZyBsaXN0IG9mIGBuYC1sZW5ndGggdHVwbGVzXG4gKiBAc2VlIFIudHJhbnNkdWNlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5hcGVydHVyZSgyLCBbMSwgMiwgMywgNCwgNV0pOyAvLz0+IFtbMSwgMl0sIFsyLCAzXSwgWzMsIDRdLCBbNCwgNV1dXG4gKiAgICAgIFIuYXBlcnR1cmUoMywgWzEsIDIsIDMsIDQsIDVdKTsgLy89PiBbWzEsIDIsIDNdLCBbMiwgMywgNF0sIFszLCA0LCA1XV1cbiAqICAgICAgUi5hcGVydHVyZSg3LCBbMSwgMiwgMywgNCwgNV0pOyAvLz0+IFtdXG4gKi9cblxuXG52YXIgYXBlcnR1cmUgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MiggLyojX19QVVJFX18qL19kaXNwYXRjaGFibGUoW10sIF94YXBlcnR1cmUsIF9hcGVydHVyZSkpO1xubW9kdWxlLmV4cG9ydHMgPSBhcGVydHVyZTsiLCJ2YXIgX2NvbmNhdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jb25jYXQnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IGNvbnRhaW5pbmcgdGhlIGNvbnRlbnRzIG9mIHRoZSBnaXZlbiBsaXN0LCBmb2xsb3dlZCBieVxuICogdGhlIGdpdmVuIGVsZW1lbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBhIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7Kn0gZWwgVGhlIGVsZW1lbnQgdG8gYWRkIHRvIHRoZSBlbmQgb2YgdGhlIG5ldyBsaXN0LlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCBvZiBlbGVtZW50cyB0byBhZGQgYSBuZXcgaXRlbSB0by5cbiAqICAgICAgICBsaXN0LlxuICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGxpc3QgY29udGFpbmluZyB0aGUgZWxlbWVudHMgb2YgdGhlIG9sZCBsaXN0IGZvbGxvd2VkIGJ5IGBlbGAuXG4gKiBAc2VlIFIucHJlcGVuZFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuYXBwZW5kKCd0ZXN0cycsIFsnd3JpdGUnLCAnbW9yZSddKTsgLy89PiBbJ3dyaXRlJywgJ21vcmUnLCAndGVzdHMnXVxuICogICAgICBSLmFwcGVuZCgndGVzdHMnLCBbXSk7IC8vPT4gWyd0ZXN0cyddXG4gKiAgICAgIFIuYXBwZW5kKFsndGVzdHMnXSwgWyd3cml0ZScsICdtb3JlJ10pOyAvLz0+IFsnd3JpdGUnLCAnbW9yZScsIFsndGVzdHMnXV1cbiAqL1xuXG5cbnZhciBhcHBlbmQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBhcHBlbmQoZWwsIGxpc3QpIHtcbiAgcmV0dXJuIF9jb25jYXQobGlzdCwgW2VsXSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gYXBwZW5kOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIEFwcGxpZXMgZnVuY3Rpb24gYGZuYCB0byB0aGUgYXJndW1lbnQgbGlzdCBgYXJnc2AuIFRoaXMgaXMgdXNlZnVsIGZvclxuICogY3JlYXRpbmcgYSBmaXhlZC1hcml0eSBmdW5jdGlvbiBmcm9tIGEgdmFyaWFkaWMgZnVuY3Rpb24uIGBmbmAgc2hvdWxkIGJlIGFcbiAqIGJvdW5kIGZ1bmN0aW9uIGlmIGNvbnRleHQgaXMgc2lnbmlmaWNhbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNy4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCouLi4gLT4gYSkgLT4gWypdIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIGNhbGxlZCB3aXRoIGBhcmdzYFxuICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGNhbGwgYGZuYCB3aXRoXG4gKiBAcmV0dXJuIHsqfSByZXN1bHQgVGhlIHJlc3VsdCwgZXF1aXZhbGVudCB0byBgZm4oLi4uYXJncylgXG4gKiBAc2VlIFIuY2FsbCwgUi51bmFwcGx5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIG51bXMgPSBbMSwgMiwgMywgLTk5LCA0MiwgNiwgN107XG4gKiAgICAgIFIuYXBwbHkoTWF0aC5tYXgsIG51bXMpOyAvLz0+IDQyXG4gKiBAc3ltYiBSLmFwcGx5KGYsIFthLCBiLCBjXSkgPSBmKGEsIGIsIGMpXG4gKi9cblxuXG52YXIgYXBwbHkgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBhcHBseShmbiwgYXJncykge1xuICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncyk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gYXBwbHk7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBhcHBseSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2FwcGx5Jyk7XG5cbnZhciBjdXJyeU4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jdXJyeU4nKTtcblxudmFyIG1hcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21hcCcpO1xuXG52YXIgbWF4ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWF4Jyk7XG5cbnZhciBwbHVjayA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3BsdWNrJyk7XG5cbnZhciByZWR1Y2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZWR1Y2UnKTtcblxudmFyIHZhbHVlcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3ZhbHVlcycpO1xuXG4vKipcbiAqIEdpdmVuIGEgc3BlYyBvYmplY3QgcmVjdXJzaXZlbHkgbWFwcGluZyBwcm9wZXJ0aWVzIHRvIGZ1bmN0aW9ucywgY3JlYXRlcyBhXG4gKiBmdW5jdGlvbiBwcm9kdWNpbmcgYW4gb2JqZWN0IG9mIHRoZSBzYW1lIHN0cnVjdHVyZSwgYnkgbWFwcGluZyBlYWNoIHByb3BlcnR5XG4gKiB0byB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgaXRzIGFzc29jaWF0ZWQgZnVuY3Rpb24gd2l0aCB0aGUgc3VwcGxpZWQgYXJndW1lbnRzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIwLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyB7azogKChhLCBiLCAuLi4sIG0pIC0+IHYpfSAtPiAoKGEsIGIsIC4uLiwgbSkgLT4ge2s6IHZ9KVxuICogQHBhcmFtIHtPYmplY3R9IHNwZWMgYW4gb2JqZWN0IHJlY3Vyc2l2ZWx5IG1hcHBpbmcgcHJvcGVydGllcyB0byBmdW5jdGlvbnMgZm9yXG4gKiAgICAgICAgcHJvZHVjaW5nIHRoZSB2YWx1ZXMgZm9yIHRoZXNlIHByb3BlcnRpZXMuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gb2JqZWN0IG9mIHRoZSBzYW1lIHN0cnVjdHVyZVxuICogYXMgYHNwZWMnLCB3aXRoIGVhY2ggcHJvcGVydHkgc2V0IHRvIHRoZSB2YWx1ZSByZXR1cm5lZCBieSBjYWxsaW5nIGl0c1xuICogYXNzb2NpYXRlZCBmdW5jdGlvbiB3aXRoIHRoZSBzdXBwbGllZCBhcmd1bWVudHMuXG4gKiBAc2VlIFIuY29udmVyZ2UsIFIuanV4dFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBnZXRNZXRyaWNzID0gUi5hcHBseVNwZWMoe1xuICogICAgICAgIHN1bTogUi5hZGQsXG4gKiAgICAgICAgbmVzdGVkOiB7IG11bDogUi5tdWx0aXBseSB9XG4gKiAgICAgIH0pO1xuICogICAgICBnZXRNZXRyaWNzKDIsIDQpOyAvLyA9PiB7IHN1bTogNiwgbmVzdGVkOiB7IG11bDogOCB9IH1cbiAqIEBzeW1iIFIuYXBwbHlTcGVjKHsgeDogZiwgeTogeyB6OiBnIH0gfSkoYSwgYikgPSB7IHg6IGYoYSwgYiksIHk6IHsgejogZyhhLCBiKSB9IH1cbiAqL1xuXG5cbnZhciBhcHBseVNwZWMgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBhcHBseVNwZWMoc3BlYykge1xuICBzcGVjID0gbWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2ID09ICdmdW5jdGlvbicgPyB2IDogYXBwbHlTcGVjKHYpO1xuICB9LCBzcGVjKTtcbiAgcmV0dXJuIGN1cnJ5TihyZWR1Y2UobWF4LCAwLCBwbHVjaygnbGVuZ3RoJywgdmFsdWVzKHNwZWMpKSksIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbWFwKGZ1bmN0aW9uIChmKSB7XG4gICAgICByZXR1cm4gYXBwbHkoZiwgYXJncyk7XG4gICAgfSwgc3BlYyk7XG4gIH0pO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGFwcGx5U3BlYzsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4qIFRha2VzIGEgdmFsdWUgYW5kIGFwcGxpZXMgYSBmdW5jdGlvbiB0byBpdC5cbipcbiogVGhpcyBmdW5jdGlvbiBpcyBhbHNvIGtub3duIGFzIHRoZSBgdGhydXNoYCBjb21iaW5hdG9yLlxuKlxuKiBAZnVuY1xuKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjI1LjBcbiogQGNhdGVnb3J5IEZ1bmN0aW9uXG4qIEBzaWcgYSAtPiAoYSAtPiBiKSAtPiBiXG4qIEBwYXJhbSB7Kn0geCBUaGUgdmFsdWVcbiogQHBhcmFtIHtGdW5jdGlvbn0gZiBUaGUgZnVuY3Rpb24gdG8gYXBwbHlcbiogQHJldHVybiB7Kn0gVGhlIHJlc3VsdCBvZiBhcHBseWluZyBgZmAgdG8gYHhgXG4qIEBleGFtcGxlXG4qXG4qICAgICAgdmFyIHQ0MiA9IFIuYXBwbHlUbyg0Mik7XG4qICAgICAgdDQyKFIuaWRlbnRpdHkpOyAvLz0+IDQyXG4qICAgICAgdDQyKFIuYWRkKDEpKTsgLy89PiA0M1xuKi9cblxuXG52YXIgYXBwbHlUbyA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGFwcGx5VG8oeCwgZikge1xuICByZXR1cm4gZih4KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBhcHBseVRvOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG4vKipcbiAqIE1ha2VzIGFuIGFzY2VuZGluZyBjb21wYXJhdG9yIGZ1bmN0aW9uIG91dCBvZiBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHZhbHVlXG4gKiB0aGF0IGNhbiBiZSBjb21wYXJlZCB3aXRoIGA8YCBhbmQgYD5gLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIzLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBPcmQgYiA9PiAoYSAtPiBiKSAtPiBhIC0+IGEgLT4gTnVtYmVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBBIGZ1bmN0aW9uIG9mIGFyaXR5IG9uZSB0aGF0IHJldHVybnMgYSB2YWx1ZSB0aGF0IGNhbiBiZSBjb21wYXJlZFxuICogQHBhcmFtIHsqfSBhIFRoZSBmaXJzdCBpdGVtIHRvIGJlIGNvbXBhcmVkLlxuICogQHBhcmFtIHsqfSBiIFRoZSBzZWNvbmQgaXRlbSB0byBiZSBjb21wYXJlZC5cbiAqIEByZXR1cm4ge051bWJlcn0gYC0xYCBpZiBmbihhKSA8IGZuKGIpLCBgMWAgaWYgZm4oYikgPCBmbihhKSwgb3RoZXJ3aXNlIGAwYFxuICogQHNlZSBSLmRlc2NlbmRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgYnlBZ2UgPSBSLmFzY2VuZChSLnByb3AoJ2FnZScpKTtcbiAqICAgICAgdmFyIHBlb3BsZSA9IFtcbiAqICAgICAgICAvLyAuLi5cbiAqICAgICAgXTtcbiAqICAgICAgdmFyIHBlb3BsZUJ5WW91bmdlc3RGaXJzdCA9IFIuc29ydChieUFnZSwgcGVvcGxlKTtcbiAqL1xuXG5cbnZhciBhc2NlbmQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBhc2NlbmQoZm4sIGEsIGIpIHtcbiAgdmFyIGFhID0gZm4oYSk7XG4gIHZhciBiYiA9IGZuKGIpO1xuICByZXR1cm4gYWEgPCBiYiA/IC0xIDogYWEgPiBiYiA/IDEgOiAwO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGFzY2VuZDsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBNYWtlcyBhIHNoYWxsb3cgY2xvbmUgb2YgYW4gb2JqZWN0LCBzZXR0aW5nIG9yIG92ZXJyaWRpbmcgdGhlIHNwZWNpZmllZFxuICogcHJvcGVydHkgd2l0aCB0aGUgZ2l2ZW4gdmFsdWUuIE5vdGUgdGhhdCB0aGlzIGNvcGllcyBhbmQgZmxhdHRlbnMgcHJvdG90eXBlXG4gKiBwcm9wZXJ0aWVzIG9udG8gdGhlIG5ldyBvYmplY3QgYXMgd2VsbC4gQWxsIG5vbi1wcmltaXRpdmUgcHJvcGVydGllcyBhcmVcbiAqIGNvcGllZCBieSByZWZlcmVuY2UuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIFN0cmluZyAtPiBhIC0+IHtrOiB2fSAtPiB7azogdn1cbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIFRoZSBwcm9wZXJ0eSBuYW1lIHRvIHNldFxuICogQHBhcmFtIHsqfSB2YWwgVGhlIG5ldyB2YWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgbmV3IG9iamVjdCBlcXVpdmFsZW50IHRvIHRoZSBvcmlnaW5hbCBleGNlcHQgZm9yIHRoZSBjaGFuZ2VkIHByb3BlcnR5LlxuICogQHNlZSBSLmRpc3NvY1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuYXNzb2MoJ2MnLCAzLCB7YTogMSwgYjogMn0pOyAvLz0+IHthOiAxLCBiOiAyLCBjOiAzfVxuICovXG5cblxudmFyIGFzc29jID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gYXNzb2MocHJvcCwgdmFsLCBvYmopIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmb3IgKHZhciBwIGluIG9iaikge1xuICAgIHJlc3VsdFtwXSA9IG9ialtwXTtcbiAgfVxuICByZXN1bHRbcHJvcF0gPSB2YWw7XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gYXNzb2M7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbnZhciBfaGFzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2hhcycpO1xuXG52YXIgX2lzQXJyYXkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNBcnJheScpO1xuXG52YXIgX2lzSW50ZWdlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19pc0ludGVnZXInKTtcblxudmFyIGFzc29jID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYXNzb2MnKTtcblxudmFyIGlzTmlsID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaXNOaWwnKTtcblxuLyoqXG4gKiBNYWtlcyBhIHNoYWxsb3cgY2xvbmUgb2YgYW4gb2JqZWN0LCBzZXR0aW5nIG9yIG92ZXJyaWRpbmcgdGhlIG5vZGVzIHJlcXVpcmVkXG4gKiB0byBjcmVhdGUgdGhlIGdpdmVuIHBhdGgsIGFuZCBwbGFjaW5nIHRoZSBzcGVjaWZpYyB2YWx1ZSBhdCB0aGUgdGFpbCBlbmQgb2ZcbiAqIHRoYXQgcGF0aC4gTm90ZSB0aGF0IHRoaXMgY29waWVzIGFuZCBmbGF0dGVucyBwcm90b3R5cGUgcHJvcGVydGllcyBvbnRvIHRoZVxuICogbmV3IG9iamVjdCBhcyB3ZWxsLiBBbGwgbm9uLXByaW1pdGl2ZSBwcm9wZXJ0aWVzIGFyZSBjb3BpZWQgYnkgcmVmZXJlbmNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjguMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHR5cGVkZWZuIElkeCA9IFN0cmluZyB8IEludFxuICogQHNpZyBbSWR4XSAtPiBhIC0+IHthfSAtPiB7YX1cbiAqIEBwYXJhbSB7QXJyYXl9IHBhdGggdGhlIHBhdGggdG8gc2V0XG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgbmV3IHZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmVcbiAqIEByZXR1cm4ge09iamVjdH0gQSBuZXcgb2JqZWN0IGVxdWl2YWxlbnQgdG8gdGhlIG9yaWdpbmFsIGV4Y2VwdCBhbG9uZyB0aGUgc3BlY2lmaWVkIHBhdGguXG4gKiBAc2VlIFIuZGlzc29jUGF0aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuYXNzb2NQYXRoKFsnYScsICdiJywgJ2MnXSwgNDIsIHthOiB7Yjoge2M6IDB9fX0pOyAvLz0+IHthOiB7Yjoge2M6IDQyfX19XG4gKlxuICogICAgICAvLyBBbnkgbWlzc2luZyBvciBub24tb2JqZWN0IGtleXMgaW4gcGF0aCB3aWxsIGJlIG92ZXJyaWRkZW5cbiAqICAgICAgUi5hc3NvY1BhdGgoWydhJywgJ2InLCAnYyddLCA0Miwge2E6IDV9KTsgLy89PiB7YToge2I6IHtjOiA0Mn19fVxuICovXG5cblxudmFyIGFzc29jUGF0aCA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIGFzc29jUGF0aChwYXRoLCB2YWwsIG9iaikge1xuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG4gIHZhciBpZHggPSBwYXRoWzBdO1xuICBpZiAocGF0aC5sZW5ndGggPiAxKSB7XG4gICAgdmFyIG5leHRPYmogPSAhaXNOaWwob2JqKSAmJiBfaGFzKGlkeCwgb2JqKSA/IG9ialtpZHhdIDogX2lzSW50ZWdlcihwYXRoWzFdKSA/IFtdIDoge307XG4gICAgdmFsID0gYXNzb2NQYXRoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHBhdGgsIDEpLCB2YWwsIG5leHRPYmopO1xuICB9XG4gIGlmIChfaXNJbnRlZ2VyKGlkeCkgJiYgX2lzQXJyYXkob2JqKSkge1xuICAgIHZhciBhcnIgPSBbXS5jb25jYXQob2JqKTtcbiAgICBhcnJbaWR4XSA9IHZhbDtcbiAgICByZXR1cm4gYXJyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhc3NvYyhpZHgsIHZhbCwgb2JqKTtcbiAgfVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGFzc29jUGF0aDsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIG5BcnkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9uQXJ5Jyk7XG5cbi8qKlxuICogV3JhcHMgYSBmdW5jdGlvbiBvZiBhbnkgYXJpdHkgKGluY2x1ZGluZyBudWxsYXJ5KSBpbiBhIGZ1bmN0aW9uIHRoYXQgYWNjZXB0c1xuICogZXhhY3RseSAyIHBhcmFtZXRlcnMuIEFueSBleHRyYW5lb3VzIHBhcmFtZXRlcnMgd2lsbCBub3QgYmUgcGFzc2VkIHRvIHRoZVxuICogc3VwcGxpZWQgZnVuY3Rpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMi4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCogLT4gYykgLT4gKGEsIGIgLT4gYylcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHdyYXBwaW5nIGBmbmAuIFRoZSBuZXcgZnVuY3Rpb24gaXMgZ3VhcmFudGVlZCB0byBiZSBvZlxuICogICAgICAgICBhcml0eSAyLlxuICogQHNlZSBSLm5BcnksIFIudW5hcnlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgdGFrZXNUaHJlZUFyZ3MgPSBmdW5jdGlvbihhLCBiLCBjKSB7XG4gKiAgICAgICAgcmV0dXJuIFthLCBiLCBjXTtcbiAqICAgICAgfTtcbiAqICAgICAgdGFrZXNUaHJlZUFyZ3MubGVuZ3RoOyAvLz0+IDNcbiAqICAgICAgdGFrZXNUaHJlZUFyZ3MoMSwgMiwgMyk7IC8vPT4gWzEsIDIsIDNdXG4gKlxuICogICAgICB2YXIgdGFrZXNUd29BcmdzID0gUi5iaW5hcnkodGFrZXNUaHJlZUFyZ3MpO1xuICogICAgICB0YWtlc1R3b0FyZ3MubGVuZ3RoOyAvLz0+IDJcbiAqICAgICAgLy8gT25seSAyIGFyZ3VtZW50cyBhcmUgcGFzc2VkIHRvIHRoZSB3cmFwcGVkIGZ1bmN0aW9uXG4gKiAgICAgIHRha2VzVHdvQXJncygxLCAyLCAzKTsgLy89PiBbMSwgMiwgdW5kZWZpbmVkXVxuICogQHN5bWIgUi5iaW5hcnkoZikoYSwgYiwgYykgPSBmKGEsIGIpXG4gKi9cblxuXG52YXIgYmluYXJ5ID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gYmluYXJ5KGZuKSB7XG4gIHJldHVybiBuQXJ5KDIsIGZuKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBiaW5hcnk7IiwidmFyIF9hcml0eSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19hcml0eScpO1xuXG52YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpcyBib3VuZCB0byBhIGNvbnRleHQuXG4gKiBOb3RlOiBgUi5iaW5kYCBkb2VzIG5vdCBwcm92aWRlIHRoZSBhZGRpdGlvbmFsIGFyZ3VtZW50LWJpbmRpbmcgY2FwYWJpbGl0aWVzIG9mXG4gKiBbRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0Z1bmN0aW9uL2JpbmQpLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjYuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnICgqIC0+ICopIC0+IHsqfSAtPiAoKiAtPiAqKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGJpbmQgdG8gY29udGV4dFxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNPYmogVGhlIGNvbnRleHQgdG8gYmluZCBgZm5gIHRvXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHdpbGwgZXhlY3V0ZSBpbiB0aGUgY29udGV4dCBvZiBgdGhpc09iamAuXG4gKiBAc2VlIFIucGFydGlhbFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBsb2cgPSBSLmJpbmQoY29uc29sZS5sb2csIGNvbnNvbGUpO1xuICogICAgICBSLnBpcGUoUi5hc3NvYygnYScsIDIpLCBSLnRhcChsb2cpLCBSLmFzc29jKCdhJywgMykpKHthOiAxfSk7IC8vPT4ge2E6IDN9XG4gKiAgICAgIC8vIGxvZ3Mge2E6IDJ9XG4gKiBAc3ltYiBSLmJpbmQoZiwgbykoYSwgYikgPSBmLmNhbGwobywgYSwgYilcbiAqL1xuXG5cbnZhciBiaW5kID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gYmluZChmbiwgdGhpc09iaikge1xuICByZXR1cm4gX2FyaXR5KGZuLmxlbmd0aCwgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzT2JqLCBhcmd1bWVudHMpO1xuICB9KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBiaW5kOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2lzRnVuY3Rpb24gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNGdW5jdGlvbicpO1xuXG52YXIgYW5kID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYW5kJyk7XG5cbnZhciBsaWZ0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbGlmdCcpO1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gd2hpY2ggY2FsbHMgdGhlIHR3byBwcm92aWRlZCBmdW5jdGlvbnMgYW5kIHJldHVybnMgdGhlIGAmJmBcbiAqIG9mIHRoZSByZXN1bHRzLlxuICogSXQgcmV0dXJucyB0aGUgcmVzdWx0IG9mIHRoZSBmaXJzdCBmdW5jdGlvbiBpZiBpdCBpcyBmYWxzZS15IGFuZCB0aGUgcmVzdWx0XG4gKiBvZiB0aGUgc2Vjb25kIGZ1bmN0aW9uIG90aGVyd2lzZS4gTm90ZSB0aGF0IHRoaXMgaXMgc2hvcnQtY2lyY3VpdGVkLFxuICogbWVhbmluZyB0aGF0IHRoZSBzZWNvbmQgZnVuY3Rpb24gd2lsbCBub3QgYmUgaW52b2tlZCBpZiB0aGUgZmlyc3QgcmV0dXJucyBhXG4gKiBmYWxzZS15IHZhbHVlLlxuICpcbiAqIEluIGFkZGl0aW9uIHRvIGZ1bmN0aW9ucywgYFIuYm90aGAgYWxzbyBhY2NlcHRzIGFueSBmYW50YXN5LWxhbmQgY29tcGF0aWJsZVxuICogYXBwbGljYXRpdmUgZnVuY3Rvci5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMi4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgKCouLi4gLT4gQm9vbGVhbikgLT4gKCouLi4gLT4gQm9vbGVhbikgLT4gKCouLi4gLT4gQm9vbGVhbilcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGYgQSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGcgQW5vdGhlciBwcmVkaWNhdGVcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBhIGZ1bmN0aW9uIHRoYXQgYXBwbGllcyBpdHMgYXJndW1lbnRzIHRvIGBmYCBhbmQgYGdgIGFuZCBgJiZgcyB0aGVpciBvdXRwdXRzIHRvZ2V0aGVyLlxuICogQHNlZSBSLmFuZFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBndDEwID0gUi5ndChSLl9fLCAxMClcbiAqICAgICAgdmFyIGx0MjAgPSBSLmx0KFIuX18sIDIwKVxuICogICAgICB2YXIgZiA9IFIuYm90aChndDEwLCBsdDIwKTtcbiAqICAgICAgZigxNSk7IC8vPT4gdHJ1ZVxuICogICAgICBmKDMwKTsgLy89PiBmYWxzZVxuICovXG5cblxudmFyIGJvdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBib3RoKGYsIGcpIHtcbiAgcmV0dXJuIF9pc0Z1bmN0aW9uKGYpID8gZnVuY3Rpb24gX2JvdGgoKSB7XG4gICAgcmV0dXJuIGYuYXBwbHkodGhpcywgYXJndW1lbnRzKSAmJiBnLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH0gOiBsaWZ0KGFuZCkoZiwgZyk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gYm90aDsiLCJ2YXIgY3VycnkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jdXJyeScpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIGl0cyBmaXJzdCBhcmd1bWVudCB3aXRoIHRoZSByZW1haW5pbmdcbiAqIGFyZ3VtZW50cy4gVGhpcyBpcyBvY2Nhc2lvbmFsbHkgdXNlZnVsIGFzIGEgY29udmVyZ2luZyBmdW5jdGlvbiBmb3JcbiAqIFtgUi5jb252ZXJnZWBdKCNjb252ZXJnZSk6IHRoZSBmaXJzdCBicmFuY2ggY2FuIHByb2R1Y2UgYSBmdW5jdGlvbiB3aGlsZSB0aGVcbiAqIHJlbWFpbmluZyBicmFuY2hlcyBwcm9kdWNlIHZhbHVlcyB0byBiZSBwYXNzZWQgdG8gdGhhdCBmdW5jdGlvbiBhcyBpdHNcbiAqIGFyZ3VtZW50cy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC45LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKi4uLiAtPiBhKSwqLi4uIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBhcHBseSB0byB0aGUgcmVtYWluaW5nIGFyZ3VtZW50cy5cbiAqIEBwYXJhbSB7Li4uKn0gYXJncyBBbnkgbnVtYmVyIG9mIHBvc2l0aW9uYWwgYXJndW1lbnRzLlxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi5hcHBseVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuY2FsbChSLmFkZCwgMSwgMik7IC8vPT4gM1xuICpcbiAqICAgICAgdmFyIGluZGVudE4gPSBSLnBpcGUoUi5yZXBlYXQoJyAnKSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgUi5qb2luKCcnKSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgUi5yZXBsYWNlKC9eKD8hJCkvZ20pKTtcbiAqXG4gKiAgICAgIHZhciBmb3JtYXQgPSBSLmNvbnZlcmdlKFIuY2FsbCwgW1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUi5waXBlKFIucHJvcCgnaW5kZW50JyksIGluZGVudE4pLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUi5wcm9wKCd2YWx1ZScpXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xuICpcbiAqICAgICAgZm9ybWF0KHtpbmRlbnQ6IDIsIHZhbHVlOiAnZm9vXFxuYmFyXFxuYmF6XFxuJ30pOyAvLz0+ICcgIGZvb1xcbiAgYmFyXFxuICBiYXpcXG4nXG4gKiBAc3ltYiBSLmNhbGwoZiwgYSwgYikgPSBmKGEsIGIpXG4gKi9cblxuXG52YXIgY2FsbCA9IC8qI19fUFVSRV9fKi9jdXJyeShmdW5jdGlvbiBjYWxsKGZuKSB7XG4gIHJldHVybiBmbi5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBjYWxsOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2Rpc3BhdGNoYWJsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcblxudmFyIF9tYWtlRmxhdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19tYWtlRmxhdCcpO1xuXG52YXIgX3hjaGFpbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL194Y2hhaW4nKTtcblxudmFyIG1hcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21hcCcpO1xuXG4vKipcbiAqIGBjaGFpbmAgbWFwcyBhIGZ1bmN0aW9uIG92ZXIgYSBsaXN0IGFuZCBjb25jYXRlbmF0ZXMgdGhlIHJlc3VsdHMuIGBjaGFpbmBcbiAqIGlzIGFsc28ga25vd24gYXMgYGZsYXRNYXBgIGluIHNvbWUgbGlicmFyaWVzXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYGNoYWluYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudCxcbiAqIGFjY29yZGluZyB0byB0aGUgW0ZhbnRhc3lMYW5kIENoYWluIHNwZWNdKGh0dHBzOi8vZ2l0aHViLmNvbS9mYW50YXN5bGFuZC9mYW50YXN5LWxhbmQjY2hhaW4pLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjMuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgQ2hhaW4gbSA9PiAoYSAtPiBtIGIpIC0+IG0gYSAtPiBtIGJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBtYXAgd2l0aFxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBtYXAgb3ZlclxuICogQHJldHVybiB7QXJyYXl9IFRoZSByZXN1bHQgb2YgZmxhdC1tYXBwaW5nIGBsaXN0YCB3aXRoIGBmbmBcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZHVwbGljYXRlID0gbiA9PiBbbiwgbl07XG4gKiAgICAgIFIuY2hhaW4oZHVwbGljYXRlLCBbMSwgMiwgM10pOyAvLz0+IFsxLCAxLCAyLCAyLCAzLCAzXVxuICpcbiAqICAgICAgUi5jaGFpbihSLmFwcGVuZCwgUi5oZWFkKShbMSwgMiwgM10pOyAvLz0+IFsxLCAyLCAzLCAxXVxuICovXG5cblxudmFyIGNoYWluID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFsnZmFudGFzeS1sYW5kL2NoYWluJywgJ2NoYWluJ10sIF94Y2hhaW4sIGZ1bmN0aW9uIGNoYWluKGZuLCBtb25hZCkge1xuICBpZiAodHlwZW9mIG1vbmFkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gZm4obW9uYWQoeCkpKHgpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIF9tYWtlRmxhdChmYWxzZSkobWFwKGZuLCBtb25hZCkpO1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBjaGFpbjsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBSZXN0cmljdHMgYSBudW1iZXIgdG8gYmUgd2l0aGluIGEgcmFuZ2UuXG4gKlxuICogQWxzbyB3b3JrcyBmb3Igb3RoZXIgb3JkZXJlZCB0eXBlcyBzdWNoIGFzIFN0cmluZ3MgYW5kIERhdGVzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIwLjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBPcmQgYSA9PiBhIC0+IGEgLT4gYSAtPiBhXG4gKiBAcGFyYW0ge051bWJlcn0gbWluaW11bSBUaGUgbG93ZXIgbGltaXQgb2YgdGhlIGNsYW1wIChpbmNsdXNpdmUpXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4aW11bSBUaGUgdXBwZXIgbGltaXQgb2YgdGhlIGNsYW1wIChpbmNsdXNpdmUpXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgVmFsdWUgdG8gYmUgY2xhbXBlZFxuICogQHJldHVybiB7TnVtYmVyfSBSZXR1cm5zIGBtaW5pbXVtYCB3aGVuIGB2YWwgPCBtaW5pbXVtYCwgYG1heGltdW1gIHdoZW4gYHZhbCA+IG1heGltdW1gLCByZXR1cm5zIGB2YWxgIG90aGVyd2lzZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuY2xhbXAoMSwgMTAsIC01KSAvLyA9PiAxXG4gKiAgICAgIFIuY2xhbXAoMSwgMTAsIDE1KSAvLyA9PiAxMFxuICogICAgICBSLmNsYW1wKDEsIDEwLCA0KSAgLy8gPT4gNFxuICovXG5cblxudmFyIGNsYW1wID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gY2xhbXAobWluLCBtYXgsIHZhbHVlKSB7XG4gIGlmIChtaW4gPiBtYXgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ21pbiBtdXN0IG5vdCBiZSBncmVhdGVyIHRoYW4gbWF4IGluIGNsYW1wKG1pbiwgbWF4LCB2YWx1ZSknKTtcbiAgfVxuICByZXR1cm4gdmFsdWUgPCBtaW4gPyBtaW4gOiB2YWx1ZSA+IG1heCA/IG1heCA6IHZhbHVlO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGNsYW1wOyIsInZhciBfY2xvbmUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY2xvbmUnKTtcblxudmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlZXAgY29weSBvZiB0aGUgdmFsdWUgd2hpY2ggbWF5IGNvbnRhaW4gKG5lc3RlZCkgYEFycmF5YHMgYW5kXG4gKiBgT2JqZWN0YHMsIGBOdW1iZXJgcywgYFN0cmluZ2BzLCBgQm9vbGVhbmBzIGFuZCBgRGF0ZWBzLiBgRnVuY3Rpb25gcyBhcmVcbiAqIGFzc2lnbmVkIGJ5IHJlZmVyZW5jZSByYXRoZXIgdGhhbiBjb3BpZWRcbiAqXG4gKiBEaXNwYXRjaGVzIHRvIGEgYGNsb25lYCBtZXRob2QgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgeyp9IC0+IHsqfVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgb2JqZWN0IG9yIGFycmF5IHRvIGNsb25lXG4gKiBAcmV0dXJuIHsqfSBBIGRlZXBseSBjbG9uZWQgY29weSBvZiBgdmFsYFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBvYmplY3RzID0gW3t9LCB7fSwge31dO1xuICogICAgICB2YXIgb2JqZWN0c0Nsb25lID0gUi5jbG9uZShvYmplY3RzKTtcbiAqICAgICAgb2JqZWN0cyA9PT0gb2JqZWN0c0Nsb25lOyAvLz0+IGZhbHNlXG4gKiAgICAgIG9iamVjdHNbMF0gPT09IG9iamVjdHNDbG9uZVswXTsgLy89PiBmYWxzZVxuICovXG5cblxudmFyIGNsb25lID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gY2xvbmUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLmNsb25lID09PSAnZnVuY3Rpb24nID8gdmFsdWUuY2xvbmUoKSA6IF9jbG9uZSh2YWx1ZSwgW10sIFtdLCB0cnVlKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBjbG9uZTsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuLyoqXG4gKiBNYWtlcyBhIGNvbXBhcmF0b3IgZnVuY3Rpb24gb3V0IG9mIGEgZnVuY3Rpb24gdGhhdCByZXBvcnRzIHdoZXRoZXIgdGhlIGZpcnN0XG4gKiBlbGVtZW50IGlzIGxlc3MgdGhhbiB0aGUgc2Vjb25kLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgoYSwgYikgLT4gQm9vbGVhbikgLT4gKChhLCBiKSAtPiBOdW1iZXIpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkIEEgcHJlZGljYXRlIGZ1bmN0aW9uIG9mIGFyaXR5IHR3byB3aGljaCB3aWxsIHJldHVybiBgdHJ1ZWAgaWYgdGhlIGZpcnN0IGFyZ3VtZW50XG4gKiBpcyBsZXNzIHRoYW4gdGhlIHNlY29uZCwgYGZhbHNlYCBvdGhlcndpc2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIEZ1bmN0aW9uIDo6IGEgLT4gYiAtPiBJbnQgdGhhdCByZXR1cm5zIGAtMWAgaWYgYSA8IGIsIGAxYCBpZiBiIDwgYSwgb3RoZXJ3aXNlIGAwYFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBieUFnZSA9IFIuY29tcGFyYXRvcigoYSwgYikgPT4gYS5hZ2UgPCBiLmFnZSk7XG4gKiAgICAgIHZhciBwZW9wbGUgPSBbXG4gKiAgICAgICAgLy8gLi4uXG4gKiAgICAgIF07XG4gKiAgICAgIHZhciBwZW9wbGVCeUluY3JlYXNpbmdBZ2UgPSBSLnNvcnQoYnlBZ2UsIHBlb3BsZSk7XG4gKi9cblxuXG52YXIgY29tcGFyYXRvciA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGNvbXBhcmF0b3IocHJlZCkge1xuICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gcHJlZChhLCBiKSA/IC0xIDogcHJlZChiLCBhKSA/IDEgOiAwO1xuICB9O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBhcmF0b3I7IiwidmFyIGxpZnQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9saWZ0Jyk7XG5cbnZhciBub3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9ub3QnKTtcblxuLyoqXG4gKiBUYWtlcyBhIGZ1bmN0aW9uIGBmYCBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIGBnYCBzdWNoIHRoYXQgaWYgY2FsbGVkIHdpdGggdGhlIHNhbWUgYXJndW1lbnRzXG4gKiB3aGVuIGBmYCByZXR1cm5zIGEgXCJ0cnV0aHlcIiB2YWx1ZSwgYGdgIHJldHVybnMgYGZhbHNlYCBhbmQgd2hlbiBgZmAgcmV0dXJucyBhIFwiZmFsc3lcIiB2YWx1ZSBgZ2AgcmV0dXJucyBgdHJ1ZWAuXG4gKlxuICogYFIuY29tcGxlbWVudGAgbWF5IGJlIGFwcGxpZWQgdG8gYW55IGZ1bmN0b3JcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMi4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgKCouLi4gLT4gKikgLT4gKCouLi4gLT4gQm9vbGVhbilcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQHNlZSBSLm5vdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBpc05vdE5pbCA9IFIuY29tcGxlbWVudChSLmlzTmlsKTtcbiAqICAgICAgaXNOaWwobnVsbCk7IC8vPT4gdHJ1ZVxuICogICAgICBpc05vdE5pbChudWxsKTsgLy89PiBmYWxzZVxuICogICAgICBpc05pbCg3KTsgLy89PiBmYWxzZVxuICogICAgICBpc05vdE5pbCg3KTsgLy89PiB0cnVlXG4gKi9cblxuXG52YXIgY29tcGxlbWVudCA9IC8qI19fUFVSRV9fKi9saWZ0KG5vdCk7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBsZW1lbnQ7IiwidmFyIHBpcGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9waXBlJyk7XG5cbnZhciByZXZlcnNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmV2ZXJzZScpO1xuXG4vKipcbiAqIFBlcmZvcm1zIHJpZ2h0LXRvLWxlZnQgZnVuY3Rpb24gY29tcG9zaXRpb24uIFRoZSByaWdodG1vc3QgZnVuY3Rpb24gbWF5IGhhdmVcbiAqIGFueSBhcml0eTsgdGhlIHJlbWFpbmluZyBmdW5jdGlvbnMgbXVzdCBiZSB1bmFyeS5cbiAqXG4gKiAqKk5vdGU6KiogVGhlIHJlc3VsdCBvZiBjb21wb3NlIGlzIG5vdCBhdXRvbWF0aWNhbGx5IGN1cnJpZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCh5IC0+IHopLCAoeCAtPiB5KSwgLi4uLCAobyAtPiBwKSwgKChhLCBiLCAuLi4sIG4pIC0+IG8pKSAtPiAoKGEsIGIsIC4uLiwgbikgLT4geilcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IC4uLmZ1bmN0aW9ucyBUaGUgZnVuY3Rpb25zIHRvIGNvbXBvc2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQHNlZSBSLnBpcGVcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgY2xhc3N5R3JlZXRpbmcgPSAoZmlyc3ROYW1lLCBsYXN0TmFtZSkgPT4gXCJUaGUgbmFtZSdzIFwiICsgbGFzdE5hbWUgKyBcIiwgXCIgKyBmaXJzdE5hbWUgKyBcIiBcIiArIGxhc3ROYW1lXG4gKiAgICAgIHZhciB5ZWxsR3JlZXRpbmcgPSBSLmNvbXBvc2UoUi50b1VwcGVyLCBjbGFzc3lHcmVldGluZyk7XG4gKiAgICAgIHllbGxHcmVldGluZygnSmFtZXMnLCAnQm9uZCcpOyAvLz0+IFwiVEhFIE5BTUUnUyBCT05ELCBKQU1FUyBCT05EXCJcbiAqXG4gKiAgICAgIFIuY29tcG9zZShNYXRoLmFicywgUi5hZGQoMSksIFIubXVsdGlwbHkoMikpKC00KSAvLz0+IDdcbiAqXG4gKiBAc3ltYiBSLmNvbXBvc2UoZiwgZywgaCkoYSwgYikgPSBmKGcoaChhLCBiKSkpXG4gKi9cblxuXG5mdW5jdGlvbiBjb21wb3NlKCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY29tcG9zZSByZXF1aXJlcyBhdCBsZWFzdCBvbmUgYXJndW1lbnQnKTtcbiAgfVxuICByZXR1cm4gcGlwZS5hcHBseSh0aGlzLCByZXZlcnNlKGFyZ3VtZW50cykpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBjb21wb3NlOyIsInZhciBjaGFpbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2NoYWluJyk7XG5cbnZhciBjb21wb3NlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY29tcG9zZScpO1xuXG52YXIgbWFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWFwJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcmlnaHQtdG8tbGVmdCBLbGVpc2xpIGNvbXBvc2l0aW9uIG9mIHRoZSBwcm92aWRlZCBmdW5jdGlvbnMsXG4gKiBlYWNoIG9mIHdoaWNoIG11c3QgcmV0dXJuIGEgdmFsdWUgb2YgYSB0eXBlIHN1cHBvcnRlZCBieSBbYGNoYWluYF0oI2NoYWluKS5cbiAqXG4gKiBgUi5jb21wb3NlSyhoLCBnLCBmKWAgaXMgZXF1aXZhbGVudCB0byBgUi5jb21wb3NlKFIuY2hhaW4oaCksIFIuY2hhaW4oZyksIGYpYC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNi4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgQ2hhaW4gbSA9PiAoKHkgLT4gbSB6KSwgKHggLT4gbSB5KSwgLi4uLCAoYSAtPiBtIGIpKSAtPiAoYSAtPiBtIHopXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSAuLi5mdW5jdGlvbnMgVGhlIGZ1bmN0aW9ucyB0byBjb21wb3NlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5waXBlS1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgICAvLyAgZ2V0IDo6IFN0cmluZyAtPiBPYmplY3QgLT4gTWF5YmUgKlxuICogICAgICAgdmFyIGdldCA9IFIuY3VycnkoKHByb3BOYW1lLCBvYmopID0+IE1heWJlKG9ialtwcm9wTmFtZV0pKVxuICpcbiAqICAgICAgIC8vICBnZXRTdGF0ZUNvZGUgOjogTWF5YmUgU3RyaW5nIC0+IE1heWJlIFN0cmluZ1xuICogICAgICAgdmFyIGdldFN0YXRlQ29kZSA9IFIuY29tcG9zZUsoXG4gKiAgICAgICAgIFIuY29tcG9zZShNYXliZS5vZiwgUi50b1VwcGVyKSxcbiAqICAgICAgICAgZ2V0KCdzdGF0ZScpLFxuICogICAgICAgICBnZXQoJ2FkZHJlc3MnKSxcbiAqICAgICAgICAgZ2V0KCd1c2VyJyksXG4gKiAgICAgICApO1xuICogICAgICAgZ2V0U3RhdGVDb2RlKHtcInVzZXJcIjp7XCJhZGRyZXNzXCI6e1wic3RhdGVcIjpcIm55XCJ9fX0pOyAvLz0+IE1heWJlLkp1c3QoXCJOWVwiKVxuICogICAgICAgZ2V0U3RhdGVDb2RlKHt9KTsgLy89PiBNYXliZS5Ob3RoaW5nKClcbiAqIEBzeW1iIFIuY29tcG9zZUsoZiwgZywgaCkoYSkgPSBSLmNoYWluKGYsIFIuY2hhaW4oZywgaChhKSkpXG4gKi9cblxuXG5mdW5jdGlvbiBjb21wb3NlSygpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvbXBvc2VLIHJlcXVpcmVzIGF0IGxlYXN0IG9uZSBhcmd1bWVudCcpO1xuICB9XG4gIHZhciBpbml0ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgdmFyIGxhc3QgPSBpbml0LnBvcCgpO1xuICByZXR1cm4gY29tcG9zZShjb21wb3NlLmFwcGx5KHRoaXMsIG1hcChjaGFpbiwgaW5pdCkpLCBsYXN0KTtcbn1cbm1vZHVsZS5leHBvcnRzID0gY29tcG9zZUs7IiwidmFyIHBpcGVQID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcGlwZVAnKTtcblxudmFyIHJldmVyc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZXZlcnNlJyk7XG5cbi8qKlxuICogUGVyZm9ybXMgcmlnaHQtdG8tbGVmdCBjb21wb3NpdGlvbiBvZiBvbmUgb3IgbW9yZSBQcm9taXNlLXJldHVybmluZ1xuICogZnVuY3Rpb25zLiBUaGUgcmlnaHRtb3N0IGZ1bmN0aW9uIG1heSBoYXZlIGFueSBhcml0eTsgdGhlIHJlbWFpbmluZ1xuICogZnVuY3Rpb25zIG11c3QgYmUgdW5hcnkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTAuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgoeSAtPiBQcm9taXNlIHopLCAoeCAtPiBQcm9taXNlIHkpLCAuLi4sIChhIC0+IFByb21pc2UgYikpIC0+IChhIC0+IFByb21pc2UgeilcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmN0aW9ucyBUaGUgZnVuY3Rpb25zIHRvIGNvbXBvc2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQHNlZSBSLnBpcGVQXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGRiID0ge1xuICogICAgICAgIHVzZXJzOiB7XG4gKiAgICAgICAgICBKT0U6IHtcbiAqICAgICAgICAgICAgbmFtZTogJ0pvZScsXG4gKiAgICAgICAgICAgIGZvbGxvd2VyczogWydTVEVWRScsICdTVVpZJ11cbiAqICAgICAgICAgIH1cbiAqICAgICAgICB9XG4gKiAgICAgIH1cbiAqXG4gKiAgICAgIC8vIFdlJ2xsIHByZXRlbmQgdG8gZG8gYSBkYiBsb29rdXAgd2hpY2ggcmV0dXJucyBhIHByb21pc2VcbiAqICAgICAgdmFyIGxvb2t1cFVzZXIgPSAodXNlcklkKSA9PiBQcm9taXNlLnJlc29sdmUoZGIudXNlcnNbdXNlcklkXSlcbiAqICAgICAgdmFyIGxvb2t1cEZvbGxvd2VycyA9ICh1c2VyKSA9PiBQcm9taXNlLnJlc29sdmUodXNlci5mb2xsb3dlcnMpXG4gKiAgICAgIGxvb2t1cFVzZXIoJ0pPRScpLnRoZW4obG9va3VwRm9sbG93ZXJzKVxuICpcbiAqICAgICAgLy8gIGZvbGxvd2Vyc0ZvclVzZXIgOjogU3RyaW5nIC0+IFByb21pc2UgW1VzZXJJZF1cbiAqICAgICAgdmFyIGZvbGxvd2Vyc0ZvclVzZXIgPSBSLmNvbXBvc2VQKGxvb2t1cEZvbGxvd2VycywgbG9va3VwVXNlcik7XG4gKiAgICAgIGZvbGxvd2Vyc0ZvclVzZXIoJ0pPRScpLnRoZW4oZm9sbG93ZXJzID0+IGNvbnNvbGUubG9nKCdGb2xsb3dlcnM6JywgZm9sbG93ZXJzKSlcbiAqICAgICAgLy8gRm9sbG93ZXJzOiBbXCJTVEVWRVwiLFwiU1VaWVwiXVxuICovXG5cblxuZnVuY3Rpb24gY29tcG9zZVAoKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjb21wb3NlUCByZXF1aXJlcyBhdCBsZWFzdCBvbmUgYXJndW1lbnQnKTtcbiAgfVxuICByZXR1cm4gcGlwZVAuYXBwbHkodGhpcywgcmV2ZXJzZShhcmd1bWVudHMpKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gY29tcG9zZVA7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfaXNBcnJheSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19pc0FycmF5Jyk7XG5cbnZhciBfaXNGdW5jdGlvbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19pc0Z1bmN0aW9uJyk7XG5cbnZhciBfaXNTdHJpbmcgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNTdHJpbmcnKTtcblxudmFyIHRvU3RyaW5nID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgY29uY2F0ZW5hdGluZyB0aGUgZ2l2ZW4gbGlzdHMgb3Igc3RyaW5ncy5cbiAqXG4gKiBOb3RlOiBgUi5jb25jYXRgIGV4cGVjdHMgYm90aCBhcmd1bWVudHMgdG8gYmUgb2YgdGhlIHNhbWUgdHlwZSxcbiAqIHVubGlrZSB0aGUgbmF0aXZlIGBBcnJheS5wcm90b3R5cGUuY29uY2F0YCBtZXRob2QuIEl0IHdpbGwgdGhyb3dcbiAqIGFuIGVycm9yIGlmIHlvdSBgY29uY2F0YCBhbiBBcnJheSB3aXRoIGEgbm9uLUFycmF5IHZhbHVlLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBjb25jYXRgIG1ldGhvZCBvZiB0aGUgZmlyc3QgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKiBDYW4gYWxzbyBjb25jYXRlbmF0ZSB0d28gbWVtYmVycyBvZiBhIFtmYW50YXN5LWxhbmRcbiAqIGNvbXBhdGlibGUgc2VtaWdyb3VwXShodHRwczovL2dpdGh1Yi5jb20vZmFudGFzeWxhbmQvZmFudGFzeS1sYW5kI3NlbWlncm91cCkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbYV0gLT4gW2FdIC0+IFthXVxuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGZpcnN0TGlzdCBUaGUgZmlyc3QgbGlzdFxuICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IHNlY29uZExpc3QgVGhlIHNlY29uZCBsaXN0XG4gKiBAcmV0dXJuIHtBcnJheXxTdHJpbmd9IEEgbGlzdCBjb25zaXN0aW5nIG9mIHRoZSBlbGVtZW50cyBvZiBgZmlyc3RMaXN0YCBmb2xsb3dlZCBieSB0aGUgZWxlbWVudHMgb2ZcbiAqIGBzZWNvbmRMaXN0YC5cbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5jb25jYXQoJ0FCQycsICdERUYnKTsgLy8gJ0FCQ0RFRidcbiAqICAgICAgUi5jb25jYXQoWzQsIDUsIDZdLCBbMSwgMiwgM10pOyAvLz0+IFs0LCA1LCA2LCAxLCAyLCAzXVxuICogICAgICBSLmNvbmNhdChbXSwgW10pOyAvLz0+IFtdXG4gKi9cblxuXG52YXIgY29uY2F0ID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gY29uY2F0KGEsIGIpIHtcbiAgaWYgKF9pc0FycmF5KGEpKSB7XG4gICAgaWYgKF9pc0FycmF5KGIpKSB7XG4gICAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gICAgfVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IodG9TdHJpbmcoYikgKyAnIGlzIG5vdCBhbiBhcnJheScpO1xuICB9XG4gIGlmIChfaXNTdHJpbmcoYSkpIHtcbiAgICBpZiAoX2lzU3RyaW5nKGIpKSB7XG4gICAgICByZXR1cm4gYSArIGI7XG4gICAgfVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IodG9TdHJpbmcoYikgKyAnIGlzIG5vdCBhIHN0cmluZycpO1xuICB9XG4gIGlmIChhICE9IG51bGwgJiYgX2lzRnVuY3Rpb24oYVsnZmFudGFzeS1sYW5kL2NvbmNhdCddKSkge1xuICAgIHJldHVybiBhWydmYW50YXN5LWxhbmQvY29uY2F0J10oYik7XG4gIH1cbiAgaWYgKGEgIT0gbnVsbCAmJiBfaXNGdW5jdGlvbihhLmNvbmNhdCkpIHtcbiAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gIH1cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcih0b1N0cmluZyhhKSArICcgZG9lcyBub3QgaGF2ZSBhIG1ldGhvZCBuYW1lZCBcImNvbmNhdFwiIG9yIFwiZmFudGFzeS1sYW5kL2NvbmNhdFwiJyk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gY29uY2F0OyIsInZhciBfYXJpdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fYXJpdHknKTtcblxudmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBtYXAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tYXAnKTtcblxudmFyIG1heCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21heCcpO1xuXG52YXIgcmVkdWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmVkdWNlJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uLCBgZm5gLCB3aGljaCBlbmNhcHN1bGF0ZXMgYGlmL2Vsc2UsIGlmL2Vsc2UsIC4uLmAgbG9naWMuXG4gKiBgUi5jb25kYCB0YWtlcyBhIGxpc3Qgb2YgW3ByZWRpY2F0ZSwgdHJhbnNmb3JtZXJdIHBhaXJzLiBBbGwgb2YgdGhlIGFyZ3VtZW50c1xuICogdG8gYGZuYCBhcmUgYXBwbGllZCB0byBlYWNoIG9mIHRoZSBwcmVkaWNhdGVzIGluIHR1cm4gdW50aWwgb25lIHJldHVybnMgYVxuICogXCJ0cnV0aHlcIiB2YWx1ZSwgYXQgd2hpY2ggcG9pbnQgYGZuYCByZXR1cm5zIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgaXRzXG4gKiBhcmd1bWVudHMgdG8gdGhlIGNvcnJlc3BvbmRpbmcgdHJhbnNmb3JtZXIuIElmIG5vbmUgb2YgdGhlIHByZWRpY2F0ZXNcbiAqIG1hdGNoZXMsIGBmbmAgcmV0dXJucyB1bmRlZmluZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNi4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgW1soKi4uLiAtPiBCb29sZWFuKSwoKi4uLiAtPiAqKV1dIC0+ICgqLi4uIC0+ICopXG4gKiBAcGFyYW0ge0FycmF5fSBwYWlycyBBIGxpc3Qgb2YgW3ByZWRpY2F0ZSwgdHJhbnNmb3JtZXJdXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZm4gPSBSLmNvbmQoW1xuICogICAgICAgIFtSLmVxdWFscygwKSwgICBSLmFsd2F5cygnd2F0ZXIgZnJlZXplcyBhdCAwwrBDJyldLFxuICogICAgICAgIFtSLmVxdWFscygxMDApLCBSLmFsd2F5cygnd2F0ZXIgYm9pbHMgYXQgMTAwwrBDJyldLFxuICogICAgICAgIFtSLlQsICAgICAgICAgICB0ZW1wID0+ICdub3RoaW5nIHNwZWNpYWwgaGFwcGVucyBhdCAnICsgdGVtcCArICfCsEMnXVxuICogICAgICBdKTtcbiAqICAgICAgZm4oMCk7IC8vPT4gJ3dhdGVyIGZyZWV6ZXMgYXQgMMKwQydcbiAqICAgICAgZm4oNTApOyAvLz0+ICdub3RoaW5nIHNwZWNpYWwgaGFwcGVucyBhdCA1MMKwQydcbiAqICAgICAgZm4oMTAwKTsgLy89PiAnd2F0ZXIgYm9pbHMgYXQgMTAwwrBDJ1xuICovXG5cblxudmFyIGNvbmQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBjb25kKHBhaXJzKSB7XG4gIHZhciBhcml0eSA9IHJlZHVjZShtYXgsIDAsIG1hcChmdW5jdGlvbiAocGFpcikge1xuICAgIHJldHVybiBwYWlyWzBdLmxlbmd0aDtcbiAgfSwgcGFpcnMpKTtcbiAgcmV0dXJuIF9hcml0eShhcml0eSwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBpZHggPSAwO1xuICAgIHdoaWxlIChpZHggPCBwYWlycy5sZW5ndGgpIHtcbiAgICAgIGlmIChwYWlyc1tpZHhdWzBdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpIHtcbiAgICAgICAgcmV0dXJuIHBhaXJzW2lkeF1bMV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICAgIGlkeCArPSAxO1xuICAgIH1cbiAgfSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gY29uZDsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIGNvbnN0cnVjdE4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jb25zdHJ1Y3ROJyk7XG5cbi8qKlxuICogV3JhcHMgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBpbnNpZGUgYSBjdXJyaWVkIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZFxuICogd2l0aCB0aGUgc2FtZSBhcmd1bWVudHMgYW5kIHJldHVybnMgdGhlIHNhbWUgdHlwZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKiAtPiB7Kn0pIC0+ICgqIC0+IHsqfSlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byB3cmFwLlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgd3JhcHBlZCwgY3VycmllZCBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqIEBzZWUgUi5pbnZva2VyXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgLy8gQ29uc3RydWN0b3IgZnVuY3Rpb25cbiAqICAgICAgZnVuY3Rpb24gQW5pbWFsKGtpbmQpIHtcbiAqICAgICAgICB0aGlzLmtpbmQgPSBraW5kO1xuICogICAgICB9O1xuICogICAgICBBbmltYWwucHJvdG90eXBlLnNpZ2h0aW5nID0gZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgcmV0dXJuIFwiSXQncyBhIFwiICsgdGhpcy5raW5kICsgXCIhXCI7XG4gKiAgICAgIH1cbiAqXG4gKiAgICAgIHZhciBBbmltYWxDb25zdHJ1Y3RvciA9IFIuY29uc3RydWN0KEFuaW1hbClcbiAqXG4gKiAgICAgIC8vIE5vdGljZSB3ZSBubyBsb25nZXIgbmVlZCB0aGUgJ25ldycga2V5d29yZDpcbiAqICAgICAgQW5pbWFsQ29uc3RydWN0b3IoJ1BpZycpOyAvLz0+IHtcImtpbmRcIjogXCJQaWdcIiwgXCJzaWdodGluZ1wiOiBmdW5jdGlvbiAoKXsuLi59fTtcbiAqXG4gKiAgICAgIHZhciBhbmltYWxUeXBlcyA9IFtcIkxpb25cIiwgXCJUaWdlclwiLCBcIkJlYXJcIl07XG4gKiAgICAgIHZhciBhbmltYWxTaWdodGluZyA9IFIuaW52b2tlcigwLCAnc2lnaHRpbmcnKTtcbiAqICAgICAgdmFyIHNpZ2h0TmV3QW5pbWFsID0gUi5jb21wb3NlKGFuaW1hbFNpZ2h0aW5nLCBBbmltYWxDb25zdHJ1Y3Rvcik7XG4gKiAgICAgIFIubWFwKHNpZ2h0TmV3QW5pbWFsLCBhbmltYWxUeXBlcyk7IC8vPT4gW1wiSXQncyBhIExpb24hXCIsIFwiSXQncyBhIFRpZ2VyIVwiLCBcIkl0J3MgYSBCZWFyIVwiXVxuICovXG5cblxudmFyIGNvbnN0cnVjdCA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGNvbnN0cnVjdChGbikge1xuICByZXR1cm4gY29uc3RydWN0TihGbi5sZW5ndGgsIEZuKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBjb25zdHJ1Y3Q7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBjdXJyeSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2N1cnJ5Jyk7XG5cbnZhciBuQXJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbkFyeScpO1xuXG4vKipcbiAqIFdyYXBzIGEgY29uc3RydWN0b3IgZnVuY3Rpb24gaW5zaWRlIGEgY3VycmllZCBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWRcbiAqIHdpdGggdGhlIHNhbWUgYXJndW1lbnRzIGFuZCByZXR1cm5zIHRoZSBzYW1lIHR5cGUuIFRoZSBhcml0eSBvZiB0aGUgZnVuY3Rpb25cbiAqIHJldHVybmVkIGlzIHNwZWNpZmllZCB0byBhbGxvdyB1c2luZyB2YXJpYWRpYyBjb25zdHJ1Y3RvciBmdW5jdGlvbnMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNC4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgTnVtYmVyIC0+ICgqIC0+IHsqfSkgLT4gKCogLT4geyp9KVxuICogQHBhcmFtIHtOdW1iZXJ9IG4gVGhlIGFyaXR5IG9mIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IEZuIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byB3cmFwLlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgd3JhcHBlZCwgY3VycmllZCBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICAvLyBWYXJpYWRpYyBDb25zdHJ1Y3RvciBmdW5jdGlvblxuICogICAgICBmdW5jdGlvbiBTYWxhZCgpIHtcbiAqICAgICAgICB0aGlzLmluZ3JlZGllbnRzID0gYXJndW1lbnRzO1xuICogICAgICB9XG4gKlxuICogICAgICBTYWxhZC5wcm90b3R5cGUucmVjaXBlID0gZnVuY3Rpb24oKSB7XG4gKiAgICAgICAgdmFyIGluc3RydWN0aW9ucyA9IFIubWFwKGluZ3JlZGllbnQgPT4gJ0FkZCBhIGRvbGxvcCBvZiAnICsgaW5ncmVkaWVudCwgdGhpcy5pbmdyZWRpZW50cyk7XG4gKiAgICAgICAgcmV0dXJuIFIuam9pbignXFxuJywgaW5zdHJ1Y3Rpb25zKTtcbiAqICAgICAgfTtcbiAqXG4gKiAgICAgIHZhciBUaHJlZUxheWVyU2FsYWQgPSBSLmNvbnN0cnVjdE4oMywgU2FsYWQpO1xuICpcbiAqICAgICAgLy8gTm90aWNlIHdlIG5vIGxvbmdlciBuZWVkIHRoZSAnbmV3JyBrZXl3b3JkLCBhbmQgdGhlIGNvbnN0cnVjdG9yIGlzIGN1cnJpZWQgZm9yIDMgYXJndW1lbnRzLlxuICogICAgICB2YXIgc2FsYWQgPSBUaHJlZUxheWVyU2FsYWQoJ01heW9ubmFpc2UnKSgnUG90YXRvIENoaXBzJykoJ0tldGNodXAnKTtcbiAqXG4gKiAgICAgIGNvbnNvbGUubG9nKHNhbGFkLnJlY2lwZSgpKTtcbiAqICAgICAgLy8gQWRkIGEgZG9sbG9wIG9mIE1heW9ubmFpc2VcbiAqICAgICAgLy8gQWRkIGEgZG9sbG9wIG9mIFBvdGF0byBDaGlwc1xuICogICAgICAvLyBBZGQgYSBkb2xsb3Agb2YgS2V0Y2h1cFxuICovXG5cblxudmFyIGNvbnN0cnVjdE4gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBjb25zdHJ1Y3ROKG4sIEZuKSB7XG4gIGlmIChuID4gMTApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbnN0cnVjdG9yIHdpdGggZ3JlYXRlciB0aGFuIHRlbiBhcmd1bWVudHMnKTtcbiAgfVxuICBpZiAobiA9PT0gMCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IEZuKCk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gY3VycnkobkFyeShuLCBmdW5jdGlvbiAoJDAsICQxLCAkMiwgJDMsICQ0LCAkNSwgJDYsICQ3LCAkOCwgJDkpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIG5ldyBGbigkMCk7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBuZXcgRm4oJDAsICQxKTtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIG5ldyBGbigkMCwgJDEsICQyKTtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgcmV0dXJuIG5ldyBGbigkMCwgJDEsICQyLCAkMyk7XG4gICAgICBjYXNlIDU6XG4gICAgICAgIHJldHVybiBuZXcgRm4oJDAsICQxLCAkMiwgJDMsICQ0KTtcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgcmV0dXJuIG5ldyBGbigkMCwgJDEsICQyLCAkMywgJDQsICQ1KTtcbiAgICAgIGNhc2UgNzpcbiAgICAgICAgcmV0dXJuIG5ldyBGbigkMCwgJDEsICQyLCAkMywgJDQsICQ1LCAkNik7XG4gICAgICBjYXNlIDg6XG4gICAgICAgIHJldHVybiBuZXcgRm4oJDAsICQxLCAkMiwgJDMsICQ0LCAkNSwgJDYsICQ3KTtcbiAgICAgIGNhc2UgOTpcbiAgICAgICAgcmV0dXJuIG5ldyBGbigkMCwgJDEsICQyLCAkMywgJDQsICQ1LCAkNiwgJDcsICQ4KTtcbiAgICAgIGNhc2UgMTA6XG4gICAgICAgIHJldHVybiBuZXcgRm4oJDAsICQxLCAkMiwgJDMsICQ0LCAkNSwgJDYsICQ3LCAkOCwgJDkpO1xuICAgIH1cbiAgfSkpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbnN0cnVjdE47IiwidmFyIF9jb250YWlucyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jb250YWlucycpO1xuXG52YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGVxdWFsLCBpbiBbYFIuZXF1YWxzYF0oI2VxdWFscylcbiAqIHRlcm1zLCB0byBhdCBsZWFzdCBvbmUgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gbGlzdDsgYGZhbHNlYCBvdGhlcndpc2UuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBhIC0+IFthXSAtPiBCb29sZWFuXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgaXRlbSB0byBjb21wYXJlIGFnYWluc3QuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBhbiBlcXVpdmFsZW50IGl0ZW0gaXMgaW4gdGhlIGxpc3QsIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICogQHNlZSBSLmFueVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuY29udGFpbnMoMywgWzEsIDIsIDNdKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuY29udGFpbnMoNCwgWzEsIDIsIDNdKTsgLy89PiBmYWxzZVxuICogICAgICBSLmNvbnRhaW5zKHsgbmFtZTogJ0ZyZWQnIH0sIFt7IG5hbWU6ICdGcmVkJyB9XSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmNvbnRhaW5zKFs0Ml0sIFtbNDJdXSk7IC8vPT4gdHJ1ZVxuICovXG5cblxudmFyIGNvbnRhaW5zID0gLyojX19QVVJFX18qL19jdXJyeTIoX2NvbnRhaW5zKTtcbm1vZHVsZS5leHBvcnRzID0gY29udGFpbnM7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfbWFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX21hcCcpO1xuXG52YXIgY3VycnlOID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY3VycnlOJyk7XG5cbnZhciBtYXggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tYXgnKTtcblxudmFyIHBsdWNrID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcGx1Y2snKTtcblxudmFyIHJlZHVjZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JlZHVjZScpO1xuXG4vKipcbiAqIEFjY2VwdHMgYSBjb252ZXJnaW5nIGZ1bmN0aW9uIGFuZCBhIGxpc3Qgb2YgYnJhbmNoaW5nIGZ1bmN0aW9ucyBhbmQgcmV0dXJuc1xuICogYSBuZXcgZnVuY3Rpb24uIFdoZW4gaW52b2tlZCwgdGhpcyBuZXcgZnVuY3Rpb24gaXMgYXBwbGllZCB0byBzb21lXG4gKiBhcmd1bWVudHMsIGVhY2ggYnJhbmNoaW5nIGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG8gdGhvc2Ugc2FtZSBhcmd1bWVudHMuIFRoZVxuICogcmVzdWx0cyBvZiBlYWNoIGJyYW5jaGluZyBmdW5jdGlvbiBhcmUgcGFzc2VkIGFzIGFyZ3VtZW50cyB0byB0aGUgY29udmVyZ2luZ1xuICogZnVuY3Rpb24gdG8gcHJvZHVjZSB0aGUgcmV0dXJuIHZhbHVlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjQuMlxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgoeDEsIHgyLCAuLi4pIC0+IHopIC0+IFsoKGEsIGIsIC4uLikgLT4geDEpLCAoKGEsIGIsIC4uLikgLT4geDIpLCAuLi5dIC0+IChhIC0+IGIgLT4gLi4uIC0+IHopXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhZnRlciBBIGZ1bmN0aW9uLiBgYWZ0ZXJgIHdpbGwgYmUgaW52b2tlZCB3aXRoIHRoZSByZXR1cm4gdmFsdWVzIG9mXG4gKiAgICAgICAgYGZuMWAgYW5kIGBmbjJgIGFzIGl0cyBhcmd1bWVudHMuXG4gKiBAcGFyYW0ge0FycmF5fSBmdW5jdGlvbnMgQSBsaXN0IG9mIGZ1bmN0aW9ucy5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbi5cbiAqIEBzZWUgUi51c2VXaXRoXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGF2ZXJhZ2UgPSBSLmNvbnZlcmdlKFIuZGl2aWRlLCBbUi5zdW0sIFIubGVuZ3RoXSlcbiAqICAgICAgYXZlcmFnZShbMSwgMiwgMywgNCwgNSwgNiwgN10pIC8vPT4gNFxuICpcbiAqICAgICAgdmFyIHN0cmFuZ2VDb25jYXQgPSBSLmNvbnZlcmdlKFIuY29uY2F0LCBbUi50b1VwcGVyLCBSLnRvTG93ZXJdKVxuICogICAgICBzdHJhbmdlQ29uY2F0KFwiWW9kZWxcIikgLy89PiBcIllPREVMeW9kZWxcIlxuICpcbiAqIEBzeW1iIFIuY29udmVyZ2UoZiwgW2csIGhdKShhLCBiKSA9IGYoZyhhLCBiKSwgaChhLCBiKSlcbiAqL1xuXG5cbnZhciBjb252ZXJnZSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGNvbnZlcmdlKGFmdGVyLCBmbnMpIHtcbiAgcmV0dXJuIGN1cnJ5TihyZWR1Y2UobWF4LCAwLCBwbHVjaygnbGVuZ3RoJywgZm5zKSksIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgcmV0dXJuIGFmdGVyLmFwcGx5KGNvbnRleHQsIF9tYXAoZnVuY3Rpb24gKGZuKSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgfSwgZm5zKSk7XG4gIH0pO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGNvbnZlcmdlOyIsInZhciByZWR1Y2VCeSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JlZHVjZUJ5Jyk7XG5cbi8qKlxuICogQ291bnRzIHRoZSBlbGVtZW50cyBvZiBhIGxpc3QgYWNjb3JkaW5nIHRvIGhvdyBtYW55IG1hdGNoIGVhY2ggdmFsdWUgb2YgYVxuICoga2V5IGdlbmVyYXRlZCBieSB0aGUgc3VwcGxpZWQgZnVuY3Rpb24uIFJldHVybnMgYW4gb2JqZWN0IG1hcHBpbmcgdGhlIGtleXNcbiAqIHByb2R1Y2VkIGJ5IGBmbmAgdG8gdGhlIG51bWJlciBvZiBvY2N1cnJlbmNlcyBpbiB0aGUgbGlzdC4gTm90ZSB0aGF0IGFsbFxuICoga2V5cyBhcmUgY29lcmNlZCB0byBzdHJpbmdzIGJlY2F1c2Ugb2YgaG93IEphdmFTY3JpcHQgb2JqZWN0cyB3b3JrLlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyAoYSAtPiBTdHJpbmcpIC0+IFthXSAtPiB7Kn1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB1c2VkIHRvIG1hcCB2YWx1ZXMgdG8ga2V5cy5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gY291bnQgZWxlbWVudHMgZnJvbS5cbiAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IG1hcHBpbmcga2V5cyB0byBudW1iZXIgb2Ygb2NjdXJyZW5jZXMgaW4gdGhlIGxpc3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIG51bWJlcnMgPSBbMS4wLCAxLjEsIDEuMiwgMi4wLCAzLjAsIDIuMl07XG4gKiAgICAgIFIuY291bnRCeShNYXRoLmZsb29yKShudW1iZXJzKTsgICAgLy89PiB7JzEnOiAzLCAnMic6IDIsICczJzogMX1cbiAqXG4gKiAgICAgIHZhciBsZXR0ZXJzID0gWydhJywgJ2InLCAnQScsICdhJywgJ0InLCAnYyddO1xuICogICAgICBSLmNvdW50QnkoUi50b0xvd2VyKShsZXR0ZXJzKTsgICAvLz0+IHsnYSc6IDMsICdiJzogMiwgJ2MnOiAxfVxuICovXG5cblxudmFyIGNvdW50QnkgPSAvKiNfX1BVUkVfXyovcmVkdWNlQnkoZnVuY3Rpb24gKGFjYywgZWxlbSkge1xuICByZXR1cm4gYWNjICsgMTtcbn0sIDApO1xubW9kdWxlLmV4cG9ydHMgPSBjb3VudEJ5OyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgY3VycnlOID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY3VycnlOJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgZXF1aXZhbGVudCBvZiB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uIFRoZSBjdXJyaWVkIGZ1bmN0aW9uXG4gKiBoYXMgdHdvIHVudXN1YWwgY2FwYWJpbGl0aWVzLiBGaXJzdCwgaXRzIGFyZ3VtZW50cyBuZWVkbid0IGJlIHByb3ZpZGVkIG9uZVxuICogYXQgYSB0aW1lLiBJZiBgZmAgaXMgYSB0ZXJuYXJ5IGZ1bmN0aW9uIGFuZCBgZ2AgaXMgYFIuY3VycnkoZilgLCB0aGVcbiAqIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSkoMikoMylgXG4gKiAgIC0gYGcoMSkoMiwgMylgXG4gKiAgIC0gYGcoMSwgMikoMylgXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKlxuICogU2Vjb25kbHksIHRoZSBzcGVjaWFsIHBsYWNlaG9sZGVyIHZhbHVlIFtgUi5fX2BdKCNfXykgbWF5IGJlIHVzZWQgdG8gc3BlY2lmeVxuICogXCJnYXBzXCIsIGFsbG93aW5nIHBhcnRpYWwgYXBwbGljYXRpb24gb2YgYW55IGNvbWJpbmF0aW9uIG9mIGFyZ3VtZW50cyxcbiAqIHJlZ2FyZGxlc3Mgb2YgdGhlaXIgcG9zaXRpb25zLiBJZiBgZ2AgaXMgYXMgYWJvdmUgYW5kIGBfYCBpcyBbYFIuX19gXSgjX18pLFxuICogdGhlIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKiAgIC0gYGcoXywgMiwgMykoMSlgXG4gKiAgIC0gYGcoXywgXywgMykoMSkoMilgXG4gKiAgIC0gYGcoXywgXywgMykoMSwgMilgXG4gKiAgIC0gYGcoXywgMikoMSkoMylgXG4gKiAgIC0gYGcoXywgMikoMSwgMylgXG4gKiAgIC0gYGcoXywgMikoXywgMykoMSlgXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCogLT4gYSkgLT4gKCogLT4gYSlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldywgY3VycmllZCBmdW5jdGlvbi5cbiAqIEBzZWUgUi5jdXJyeU5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgYWRkRm91ck51bWJlcnMgPSAoYSwgYiwgYywgZCkgPT4gYSArIGIgKyBjICsgZDtcbiAqXG4gKiAgICAgIHZhciBjdXJyaWVkQWRkRm91ck51bWJlcnMgPSBSLmN1cnJ5KGFkZEZvdXJOdW1iZXJzKTtcbiAqICAgICAgdmFyIGYgPSBjdXJyaWVkQWRkRm91ck51bWJlcnMoMSwgMik7XG4gKiAgICAgIHZhciBnID0gZigzKTtcbiAqICAgICAgZyg0KTsgLy89PiAxMFxuICovXG5cblxudmFyIGN1cnJ5ID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gY3VycnkoZm4pIHtcbiAgcmV0dXJuIGN1cnJ5Tihmbi5sZW5ndGgsIGZuKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBjdXJyeTsiLCJ2YXIgX2FyaXR5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2FyaXR5Jyk7XG5cbnZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9jdXJyeU4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnlOJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIGN1cnJpZWQgZXF1aXZhbGVudCBvZiB0aGUgcHJvdmlkZWQgZnVuY3Rpb24sIHdpdGggdGhlIHNwZWNpZmllZFxuICogYXJpdHkuIFRoZSBjdXJyaWVkIGZ1bmN0aW9uIGhhcyB0d28gdW51c3VhbCBjYXBhYmlsaXRpZXMuIEZpcnN0LCBpdHNcbiAqIGFyZ3VtZW50cyBuZWVkbid0IGJlIHByb3ZpZGVkIG9uZSBhdCBhIHRpbWUuIElmIGBnYCBpcyBgUi5jdXJyeU4oMywgZilgLCB0aGVcbiAqIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSkoMikoMylgXG4gKiAgIC0gYGcoMSkoMiwgMylgXG4gKiAgIC0gYGcoMSwgMikoMylgXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKlxuICogU2Vjb25kbHksIHRoZSBzcGVjaWFsIHBsYWNlaG9sZGVyIHZhbHVlIFtgUi5fX2BdKCNfXykgbWF5IGJlIHVzZWQgdG8gc3BlY2lmeVxuICogXCJnYXBzXCIsIGFsbG93aW5nIHBhcnRpYWwgYXBwbGljYXRpb24gb2YgYW55IGNvbWJpbmF0aW9uIG9mIGFyZ3VtZW50cyxcbiAqIHJlZ2FyZGxlc3Mgb2YgdGhlaXIgcG9zaXRpb25zLiBJZiBgZ2AgaXMgYXMgYWJvdmUgYW5kIGBfYCBpcyBbYFIuX19gXSgjX18pLFxuICogdGhlIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgIC0gYGcoMSwgMiwgMylgXG4gKiAgIC0gYGcoXywgMiwgMykoMSlgXG4gKiAgIC0gYGcoXywgXywgMykoMSkoMilgXG4gKiAgIC0gYGcoXywgXywgMykoMSwgMilgXG4gKiAgIC0gYGcoXywgMikoMSkoMylgXG4gKiAgIC0gYGcoXywgMikoMSwgMylgXG4gKiAgIC0gYGcoXywgMikoXywgMykoMSlgXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgTnVtYmVyIC0+ICgqIC0+IGEpIC0+ICgqIC0+IGEpXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIFRoZSBhcml0eSBmb3IgdGhlIHJldHVybmVkIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3LCBjdXJyaWVkIGZ1bmN0aW9uLlxuICogQHNlZSBSLmN1cnJ5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHN1bUFyZ3MgPSAoLi4uYXJncykgPT4gUi5zdW0oYXJncyk7XG4gKlxuICogICAgICB2YXIgY3VycmllZEFkZEZvdXJOdW1iZXJzID0gUi5jdXJyeU4oNCwgc3VtQXJncyk7XG4gKiAgICAgIHZhciBmID0gY3VycmllZEFkZEZvdXJOdW1iZXJzKDEsIDIpO1xuICogICAgICB2YXIgZyA9IGYoMyk7XG4gKiAgICAgIGcoNCk7IC8vPT4gMTBcbiAqL1xuXG5cbnZhciBjdXJyeU4gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBjdXJyeU4obGVuZ3RoLCBmbikge1xuICBpZiAobGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIF9jdXJyeTEoZm4pO1xuICB9XG4gIHJldHVybiBfYXJpdHkobGVuZ3RoLCBfY3VycnlOKGxlbmd0aCwgW10sIGZuKSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gY3VycnlOOyIsInZhciBhZGQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hZGQnKTtcblxuLyoqXG4gKiBEZWNyZW1lbnRzIGl0cyBhcmd1bWVudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC45LjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IG4gLSAxXG4gKiBAc2VlIFIuaW5jXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5kZWMoNDIpOyAvLz0+IDQxXG4gKi9cblxuXG52YXIgZGVjID0gLyojX19QVVJFX18qL2FkZCgtMSk7XG5tb2R1bGUuZXhwb3J0cyA9IGRlYzsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzZWNvbmQgYXJndW1lbnQgaWYgaXQgaXMgbm90IGBudWxsYCwgYHVuZGVmaW5lZGAgb3IgYE5hTmA7XG4gKiBvdGhlcndpc2UgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIHJldHVybmVkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEwLjBcbiAqIEBjYXRlZ29yeSBMb2dpY1xuICogQHNpZyBhIC0+IGIgLT4gYSB8IGJcbiAqIEBwYXJhbSB7YX0gZGVmYXVsdCBUaGUgZGVmYXVsdCB2YWx1ZS5cbiAqIEBwYXJhbSB7Yn0gdmFsIGB2YWxgIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZiBgZGVmYXVsdGAgdW5sZXNzIGB2YWxgIGlzIGBudWxsYCwgYHVuZGVmaW5lZGAgb3IgYE5hTmAuXG4gKiBAcmV0dXJuIHsqfSBUaGUgc2Vjb25kIHZhbHVlIGlmIGl0IGlzIG5vdCBgbnVsbGAsIGB1bmRlZmluZWRgIG9yIGBOYU5gLCBvdGhlcndpc2UgdGhlIGRlZmF1bHQgdmFsdWVcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZGVmYXVsdFRvNDIgPSBSLmRlZmF1bHRUbyg0Mik7XG4gKlxuICogICAgICBkZWZhdWx0VG80MihudWxsKTsgIC8vPT4gNDJcbiAqICAgICAgZGVmYXVsdFRvNDIodW5kZWZpbmVkKTsgIC8vPT4gNDJcbiAqICAgICAgZGVmYXVsdFRvNDIoJ1JhbWRhJyk7ICAvLz0+ICdSYW1kYSdcbiAqICAgICAgLy8gcGFyc2VJbnQoJ3N0cmluZycpIHJlc3VsdHMgaW4gTmFOXG4gKiAgICAgIGRlZmF1bHRUbzQyKHBhcnNlSW50KCdzdHJpbmcnKSk7IC8vPT4gNDJcbiAqL1xuXG5cbnZhciBkZWZhdWx0VG8gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBkZWZhdWx0VG8oZCwgdikge1xuICByZXR1cm4gdiA9PSBudWxsIHx8IHYgIT09IHYgPyBkIDogdjtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0VG87IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8qKlxuICogTWFrZXMgYSBkZXNjZW5kaW5nIGNvbXBhcmF0b3IgZnVuY3Rpb24gb3V0IG9mIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgdmFsdWVcbiAqIHRoYXQgY2FuIGJlIGNvbXBhcmVkIHdpdGggYDxgIGFuZCBgPmAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMjMuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIE9yZCBiID0+IChhIC0+IGIpIC0+IGEgLT4gYSAtPiBOdW1iZXJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEEgZnVuY3Rpb24gb2YgYXJpdHkgb25lIHRoYXQgcmV0dXJucyBhIHZhbHVlIHRoYXQgY2FuIGJlIGNvbXBhcmVkXG4gKiBAcGFyYW0geyp9IGEgVGhlIGZpcnN0IGl0ZW0gdG8gYmUgY29tcGFyZWQuXG4gKiBAcGFyYW0geyp9IGIgVGhlIHNlY29uZCBpdGVtIHRvIGJlIGNvbXBhcmVkLlxuICogQHJldHVybiB7TnVtYmVyfSBgLTFgIGlmIGZuKGEpID4gZm4oYiksIGAxYCBpZiBmbihiKSA+IGZuKGEpLCBvdGhlcndpc2UgYDBgXG4gKiBAc2VlIFIuYXNjZW5kXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGJ5QWdlID0gUi5kZXNjZW5kKFIucHJvcCgnYWdlJykpO1xuICogICAgICB2YXIgcGVvcGxlID0gW1xuICogICAgICAgIC8vIC4uLlxuICogICAgICBdO1xuICogICAgICB2YXIgcGVvcGxlQnlPbGRlc3RGaXJzdCA9IFIuc29ydChieUFnZSwgcGVvcGxlKTtcbiAqL1xuXG5cbnZhciBkZXNjZW5kID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gZGVzY2VuZChmbiwgYSwgYikge1xuICB2YXIgYWEgPSBmbihhKTtcbiAgdmFyIGJiID0gZm4oYik7XG4gIHJldHVybiBhYSA+IGJiID8gLTEgOiBhYSA8IGJiID8gMSA6IDA7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZGVzY2VuZDsiLCJ2YXIgX2NvbnRhaW5zID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbnRhaW5zJyk7XG5cbnZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIEZpbmRzIHRoZSBzZXQgKGkuZS4gbm8gZHVwbGljYXRlcykgb2YgYWxsIGVsZW1lbnRzIGluIHRoZSBmaXJzdCBsaXN0IG5vdFxuICogY29udGFpbmVkIGluIHRoZSBzZWNvbmQgbGlzdC4gT2JqZWN0cyBhbmQgQXJyYXlzIGFyZSBjb21wYXJlZCBpbiB0ZXJtcyBvZlxuICogdmFsdWUgZXF1YWxpdHksIG5vdCByZWZlcmVuY2UgZXF1YWxpdHkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgWypdIC0+IFsqXSAtPiBbKl1cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QxIFRoZSBmaXJzdCBsaXN0LlxuICogQHBhcmFtIHtBcnJheX0gbGlzdDIgVGhlIHNlY29uZCBsaXN0LlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBlbGVtZW50cyBpbiBgbGlzdDFgIHRoYXQgYXJlIG5vdCBpbiBgbGlzdDJgLlxuICogQHNlZSBSLmRpZmZlcmVuY2VXaXRoLCBSLnN5bW1ldHJpY0RpZmZlcmVuY2UsIFIuc3ltbWV0cmljRGlmZmVyZW5jZVdpdGgsIFIud2l0aG91dFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZGlmZmVyZW5jZShbMSwyLDMsNF0sIFs3LDYsNSw0LDNdKTsgLy89PiBbMSwyXVxuICogICAgICBSLmRpZmZlcmVuY2UoWzcsNiw1LDQsM10sIFsxLDIsMyw0XSk7IC8vPT4gWzcsNiw1XVxuICogICAgICBSLmRpZmZlcmVuY2UoW3thOiAxfSwge2I6IDJ9XSwgW3thOiAxfSwge2M6IDN9XSkgLy89PiBbe2I6IDJ9XVxuICovXG5cblxudmFyIGRpZmZlcmVuY2UgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBkaWZmZXJlbmNlKGZpcnN0LCBzZWNvbmQpIHtcbiAgdmFyIG91dCA9IFtdO1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGZpcnN0TGVuID0gZmlyc3QubGVuZ3RoO1xuICB3aGlsZSAoaWR4IDwgZmlyc3RMZW4pIHtcbiAgICBpZiAoIV9jb250YWlucyhmaXJzdFtpZHhdLCBzZWNvbmQpICYmICFfY29udGFpbnMoZmlyc3RbaWR4XSwgb3V0KSkge1xuICAgICAgb3V0W291dC5sZW5ndGhdID0gZmlyc3RbaWR4XTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIG91dDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlOyIsInZhciBfY29udGFpbnNXaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbnRhaW5zV2l0aCcpO1xuXG52YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBGaW5kcyB0aGUgc2V0IChpLmUuIG5vIGR1cGxpY2F0ZXMpIG9mIGFsbCBlbGVtZW50cyBpbiB0aGUgZmlyc3QgbGlzdCBub3RcbiAqIGNvbnRhaW5lZCBpbiB0aGUgc2Vjb25kIGxpc3QuIER1cGxpY2F0aW9uIGlzIGRldGVybWluZWQgYWNjb3JkaW5nIHRvIHRoZVxuICogdmFsdWUgcmV0dXJuZWQgYnkgYXBwbHlpbmcgdGhlIHN1cHBsaWVkIHByZWRpY2F0ZSB0byB0d28gbGlzdCBlbGVtZW50cy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyAoKGEsIGEpIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkIEEgcHJlZGljYXRlIHVzZWQgdG8gdGVzdCB3aGV0aGVyIHR3byBpdGVtcyBhcmUgZXF1YWwuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0MSBUaGUgZmlyc3QgbGlzdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QyIFRoZSBzZWNvbmQgbGlzdC5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgZWxlbWVudHMgaW4gYGxpc3QxYCB0aGF0IGFyZSBub3QgaW4gYGxpc3QyYC5cbiAqIEBzZWUgUi5kaWZmZXJlbmNlLCBSLnN5bW1ldHJpY0RpZmZlcmVuY2UsIFIuc3ltbWV0cmljRGlmZmVyZW5jZVdpdGhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgY21wID0gKHgsIHkpID0+IHguYSA9PT0geS5hO1xuICogICAgICB2YXIgbDEgPSBbe2E6IDF9LCB7YTogMn0sIHthOiAzfV07XG4gKiAgICAgIHZhciBsMiA9IFt7YTogM30sIHthOiA0fV07XG4gKiAgICAgIFIuZGlmZmVyZW5jZVdpdGgoY21wLCBsMSwgbDIpOyAvLz0+IFt7YTogMX0sIHthOiAyfV1cbiAqL1xuXG5cbnZhciBkaWZmZXJlbmNlV2l0aCA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIGRpZmZlcmVuY2VXaXRoKHByZWQsIGZpcnN0LCBzZWNvbmQpIHtcbiAgdmFyIG91dCA9IFtdO1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGZpcnN0TGVuID0gZmlyc3QubGVuZ3RoO1xuICB3aGlsZSAoaWR4IDwgZmlyc3RMZW4pIHtcbiAgICBpZiAoIV9jb250YWluc1dpdGgocHJlZCwgZmlyc3RbaWR4XSwgc2Vjb25kKSAmJiAhX2NvbnRhaW5zV2l0aChwcmVkLCBmaXJzdFtpZHhdLCBvdXQpKSB7XG4gICAgICBvdXQucHVzaChmaXJzdFtpZHhdKTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIG91dDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBkaWZmZXJlbmNlV2l0aDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IG9iamVjdCB0aGF0IGRvZXMgbm90IGNvbnRhaW4gYSBgcHJvcGAgcHJvcGVydHkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyBTdHJpbmcgLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICogQHBhcmFtIHtTdHJpbmd9IHByb3AgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGRpc3NvY2lhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBjbG9uZVxuICogQHJldHVybiB7T2JqZWN0fSBBIG5ldyBvYmplY3QgZXF1aXZhbGVudCB0byB0aGUgb3JpZ2luYWwgYnV0IHdpdGhvdXQgdGhlIHNwZWNpZmllZCBwcm9wZXJ0eVxuICogQHNlZSBSLmFzc29jXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5kaXNzb2MoJ2InLCB7YTogMSwgYjogMiwgYzogM30pOyAvLz0+IHthOiAxLCBjOiAzfVxuICovXG5cblxudmFyIGRpc3NvYyA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGRpc3NvYyhwcm9wLCBvYmopIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmb3IgKHZhciBwIGluIG9iaikge1xuICAgIHJlc3VsdFtwXSA9IG9ialtwXTtcbiAgfVxuICBkZWxldGUgcmVzdWx0W3Byb3BdO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGRpc3NvYzsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9pc0ludGVnZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNJbnRlZ2VyJyk7XG5cbnZhciBhc3NvYyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2Fzc29jJyk7XG5cbnZhciBkaXNzb2MgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9kaXNzb2MnKTtcblxudmFyIHJlbW92ZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JlbW92ZScpO1xuXG52YXIgdXBkYXRlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdXBkYXRlJyk7XG5cbi8qKlxuICogTWFrZXMgYSBzaGFsbG93IGNsb25lIG9mIGFuIG9iamVjdCwgb21pdHRpbmcgdGhlIHByb3BlcnR5IGF0IHRoZSBnaXZlbiBwYXRoLlxuICogTm90ZSB0aGF0IHRoaXMgY29waWVzIGFuZCBmbGF0dGVucyBwcm90b3R5cGUgcHJvcGVydGllcyBvbnRvIHRoZSBuZXcgb2JqZWN0XG4gKiBhcyB3ZWxsLiBBbGwgbm9uLXByaW1pdGl2ZSBwcm9wZXJ0aWVzIGFyZSBjb3BpZWQgYnkgcmVmZXJlbmNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjExLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEB0eXBlZGVmbiBJZHggPSBTdHJpbmcgfCBJbnRcbiAqIEBzaWcgW0lkeF0gLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICogQHBhcmFtIHtBcnJheX0gcGF0aCBUaGUgcGF0aCB0byB0aGUgdmFsdWUgdG8gb21pdFxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGNsb25lXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgbmV3IG9iamVjdCB3aXRob3V0IHRoZSBwcm9wZXJ0eSBhdCBwYXRoXG4gKiBAc2VlIFIuYXNzb2NQYXRoXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5kaXNzb2NQYXRoKFsnYScsICdiJywgJ2MnXSwge2E6IHtiOiB7YzogNDJ9fX0pOyAvLz0+IHthOiB7Yjoge319fVxuICovXG5cblxudmFyIGRpc3NvY1BhdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBkaXNzb2NQYXRoKHBhdGgsIG9iaikge1xuICBzd2l0Y2ggKHBhdGgubGVuZ3RoKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIG9iajtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gX2lzSW50ZWdlcihwYXRoWzBdKSA/IHJlbW92ZShwYXRoWzBdLCAxLCBvYmopIDogZGlzc29jKHBhdGhbMF0sIG9iaik7XG4gICAgZGVmYXVsdDpcbiAgICAgIHZhciBoZWFkID0gcGF0aFswXTtcbiAgICAgIHZhciB0YWlsID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocGF0aCwgMSk7XG4gICAgICBpZiAob2JqW2hlYWRdID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH0gZWxzZSBpZiAoX2lzSW50ZWdlcihwYXRoWzBdKSkge1xuICAgICAgICByZXR1cm4gdXBkYXRlKGhlYWQsIGRpc3NvY1BhdGgodGFpbCwgb2JqW2hlYWRdKSwgb2JqKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhc3NvYyhoZWFkLCBkaXNzb2NQYXRoKHRhaWwsIG9ialtoZWFkXSksIG9iaik7XG4gICAgICB9XG4gIH1cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBkaXNzb2NQYXRoOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIERpdmlkZXMgdHdvIG51bWJlcnMuIEVxdWl2YWxlbnQgdG8gYGEgLyBiYC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gTnVtYmVyXG4gKiBAcGFyYW0ge051bWJlcn0gYSBUaGUgZmlyc3QgdmFsdWUuXG4gKiBAcGFyYW0ge051bWJlcn0gYiBUaGUgc2Vjb25kIHZhbHVlLlxuICogQHJldHVybiB7TnVtYmVyfSBUaGUgcmVzdWx0IG9mIGBhIC8gYmAuXG4gKiBAc2VlIFIubXVsdGlwbHlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmRpdmlkZSg3MSwgMTAwKTsgLy89PiAwLjcxXG4gKlxuICogICAgICB2YXIgaGFsZiA9IFIuZGl2aWRlKFIuX18sIDIpO1xuICogICAgICBoYWxmKDQyKTsgLy89PiAyMVxuICpcbiAqICAgICAgdmFyIHJlY2lwcm9jYWwgPSBSLmRpdmlkZSgxKTtcbiAqICAgICAgcmVjaXByb2NhbCg0KTsgICAvLz0+IDAuMjVcbiAqL1xuXG5cbnZhciBkaXZpZGUgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBkaXZpZGUoYSwgYikge1xuICByZXR1cm4gYSAvIGI7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZGl2aWRlOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2Rpc3BhdGNoYWJsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcblxudmFyIF94ZHJvcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL194ZHJvcCcpO1xuXG52YXIgc2xpY2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zbGljZScpO1xuXG4vKipcbiAqIFJldHVybnMgYWxsIGJ1dCB0aGUgZmlyc3QgYG5gIGVsZW1lbnRzIG9mIHRoZSBnaXZlbiBsaXN0LCBzdHJpbmcsIG9yXG4gKiB0cmFuc2R1Y2VyL3RyYW5zZm9ybWVyIChvciBvYmplY3Qgd2l0aCBhIGBkcm9wYCBtZXRob2QpLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBkcm9wYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIE51bWJlciAtPiBbYV0gLT4gW2FdXG4gKiBAc2lnIE51bWJlciAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gblxuICogQHBhcmFtIHsqfSBsaXN0XG4gKiBAcmV0dXJuIHsqfSBBIGNvcHkgb2YgbGlzdCB3aXRob3V0IHRoZSBmaXJzdCBgbmAgZWxlbWVudHNcbiAqIEBzZWUgUi50YWtlLCBSLnRyYW5zZHVjZSwgUi5kcm9wTGFzdCwgUi5kcm9wV2hpbGVcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmRyb3AoMSwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2JhcicsICdiYXonXVxuICogICAgICBSLmRyb3AoMiwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2JheiddXG4gKiAgICAgIFIuZHJvcCgzLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFtdXG4gKiAgICAgIFIuZHJvcCg0LCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFtdXG4gKiAgICAgIFIuZHJvcCgzLCAncmFtZGEnKTsgICAgICAgICAgICAgICAvLz0+ICdkYSdcbiAqL1xuXG5cbnZhciBkcm9wID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFsnZHJvcCddLCBfeGRyb3AsIGZ1bmN0aW9uIGRyb3AobiwgeHMpIHtcbiAgcmV0dXJuIHNsaWNlKE1hdGgubWF4KDAsIG4pLCBJbmZpbml0eSwgeHMpO1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBkcm9wOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2Rpc3BhdGNoYWJsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcblxudmFyIF9kcm9wTGFzdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kcm9wTGFzdCcpO1xuXG52YXIgX3hkcm9wTGFzdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL194ZHJvcExhc3QnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBjb250YWluaW5nIGFsbCBidXQgdGhlIGxhc3QgYG5gIGVsZW1lbnRzIG9mIHRoZSBnaXZlbiBgbGlzdGAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTYuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgTnVtYmVyIC0+IFthXSAtPiBbYV1cbiAqIEBzaWcgTnVtYmVyIC0+IFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgZWxlbWVudHMgb2YgYGxpc3RgIHRvIHNraXAuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IG9mIGVsZW1lbnRzIHRvIGNvbnNpZGVyLlxuICogQHJldHVybiB7QXJyYXl9IEEgY29weSBvZiB0aGUgbGlzdCB3aXRoIG9ubHkgdGhlIGZpcnN0IGBsaXN0Lmxlbmd0aCAtIG5gIGVsZW1lbnRzXG4gKiBAc2VlIFIudGFrZUxhc3QsIFIuZHJvcCwgUi5kcm9wV2hpbGUsIFIuZHJvcExhc3RXaGlsZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZHJvcExhc3QoMSwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2ZvbycsICdiYXInXVxuICogICAgICBSLmRyb3BMYXN0KDIsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydmb28nXVxuICogICAgICBSLmRyb3BMYXN0KDMsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gW11cbiAqICAgICAgUi5kcm9wTGFzdCg0LCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFtdXG4gKiAgICAgIFIuZHJvcExhc3QoMywgJ3JhbWRhJyk7ICAgICAgICAgICAgICAgLy89PiAncmEnXG4gKi9cblxuXG52YXIgZHJvcExhc3QgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MiggLyojX19QVVJFX18qL19kaXNwYXRjaGFibGUoW10sIF94ZHJvcExhc3QsIF9kcm9wTGFzdCkpO1xubW9kdWxlLmV4cG9ydHMgPSBkcm9wTGFzdDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9kaXNwYXRjaGFibGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG5cbnZhciBfZHJvcExhc3RXaGlsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kcm9wTGFzdFdoaWxlJyk7XG5cbnZhciBfeGRyb3BMYXN0V2hpbGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9feGRyb3BMYXN0V2hpbGUnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGxpc3QgZXhjbHVkaW5nIGFsbCB0aGUgdGFpbGluZyBlbGVtZW50cyBvZiBhIGdpdmVuIGxpc3Qgd2hpY2hcbiAqIHNhdGlzZnkgdGhlIHN1cHBsaWVkIHByZWRpY2F0ZSBmdW5jdGlvbi4gSXQgcGFzc2VzIGVhY2ggdmFsdWUgZnJvbSB0aGUgcmlnaHRcbiAqIHRvIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgZnVuY3Rpb24sIHNraXBwaW5nIGVsZW1lbnRzIHVudGlsIHRoZSBwcmVkaWNhdGVcbiAqIGZ1bmN0aW9uIHJldHVybnMgYSBgZmFsc3lgIHZhbHVlLiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG8gb25lIGFyZ3VtZW50OlxuICogKih2YWx1ZSkqLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE2LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBbYV1cbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gZWFjaCBlbGVtZW50XG4gKiBAcGFyYW0ge0FycmF5fSB4cyBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgYXJyYXkgd2l0aG91dCBhbnkgdHJhaWxpbmcgZWxlbWVudHMgdGhhdCByZXR1cm4gYGZhbHN5YCB2YWx1ZXMgZnJvbSB0aGUgYHByZWRpY2F0ZWAuXG4gKiBAc2VlIFIudGFrZUxhc3RXaGlsZSwgUi5hZGRJbmRleCwgUi5kcm9wLCBSLmRyb3BXaGlsZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBsdGVUaHJlZSA9IHggPT4geCA8PSAzO1xuICpcbiAqICAgICAgUi5kcm9wTGFzdFdoaWxlKGx0ZVRocmVlLCBbMSwgMiwgMywgNCwgMywgMiwgMV0pOyAvLz0+IFsxLCAyLCAzLCA0XVxuICpcbiAqICAgICAgUi5kcm9wTGFzdFdoaWxlKHggPT4geCAhPT0gJ2QnICwgJ1JhbWRhJyk7IC8vPT4gJ1JhbWQnXG4gKi9cblxuXG52YXIgZHJvcExhc3RXaGlsZSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKCAvKiNfX1BVUkVfXyovX2Rpc3BhdGNoYWJsZShbXSwgX3hkcm9wTGFzdFdoaWxlLCBfZHJvcExhc3RXaGlsZSkpO1xubW9kdWxlLmV4cG9ydHMgPSBkcm9wTGFzdFdoaWxlOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgX2Rpc3BhdGNoYWJsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcblxudmFyIF94ZHJvcFJlcGVhdHNXaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3hkcm9wUmVwZWF0c1dpdGgnKTtcblxudmFyIGRyb3BSZXBlYXRzV2l0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2Ryb3BSZXBlYXRzV2l0aCcpO1xuXG52YXIgZXF1YWxzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZXF1YWxzJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IHdpdGhvdXQgYW55IGNvbnNlY3V0aXZlbHkgcmVwZWF0aW5nIGVsZW1lbnRzLlxuICogW2BSLmVxdWFsc2BdKCNlcXVhbHMpIGlzIHVzZWQgdG8gZGV0ZXJtaW5lIGVxdWFsaXR5LlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNC4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbYV0gLT4gW2FdXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0FycmF5fSBgbGlzdGAgd2l0aG91dCByZXBlYXRpbmcgZWxlbWVudHMuXG4gKiBAc2VlIFIudHJhbnNkdWNlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICBSLmRyb3BSZXBlYXRzKFsxLCAxLCAxLCAyLCAzLCA0LCA0LCAyLCAyXSk7IC8vPT4gWzEsIDIsIDMsIDQsIDJdXG4gKi9cblxuXG52YXIgZHJvcFJlcGVhdHMgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MSggLyojX19QVVJFX18qL19kaXNwYXRjaGFibGUoW10sIC8qI19fUFVSRV9fKi9feGRyb3BSZXBlYXRzV2l0aChlcXVhbHMpLCAvKiNfX1BVUkVfXyovZHJvcFJlcGVhdHNXaXRoKGVxdWFscykpKTtcbm1vZHVsZS5leHBvcnRzID0gZHJvcFJlcGVhdHM7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfZGlzcGF0Y2hhYmxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xuXG52YXIgX3hkcm9wUmVwZWF0c1dpdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9feGRyb3BSZXBlYXRzV2l0aCcpO1xuXG52YXIgbGFzdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2xhc3QnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGxpc3Qgd2l0aG91dCBhbnkgY29uc2VjdXRpdmVseSByZXBlYXRpbmcgZWxlbWVudHMuIEVxdWFsaXR5IGlzXG4gKiBkZXRlcm1pbmVkIGJ5IGFwcGx5aW5nIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgdG8gZWFjaCBwYWlyIG9mIGNvbnNlY3V0aXZlIGVsZW1lbnRzLiBUaGVcbiAqIGZpcnN0IGVsZW1lbnQgaW4gYSBzZXJpZXMgb2YgZXF1YWwgZWxlbWVudHMgd2lsbCBiZSBwcmVzZXJ2ZWQuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE0LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICgoYSwgYSkgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSB1c2VkIHRvIHRlc3Qgd2hldGhlciB0d28gaXRlbXMgYXJlIGVxdWFsLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gYGxpc3RgIHdpdGhvdXQgcmVwZWF0aW5nIGVsZW1lbnRzLlxuICogQHNlZSBSLnRyYW5zZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBsID0gWzEsIC0xLCAxLCAzLCA0LCAtNCwgLTQsIC01LCA1LCAzLCAzXTtcbiAqICAgICAgUi5kcm9wUmVwZWF0c1dpdGgoUi5lcUJ5KE1hdGguYWJzKSwgbCk7IC8vPT4gWzEsIDMsIDQsIC01LCAzXVxuICovXG5cblxudmFyIGRyb3BSZXBlYXRzV2l0aCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKCAvKiNfX1BVUkVfXyovX2Rpc3BhdGNoYWJsZShbXSwgX3hkcm9wUmVwZWF0c1dpdGgsIGZ1bmN0aW9uIGRyb3BSZXBlYXRzV2l0aChwcmVkLCBsaXN0KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGlkeCA9IDE7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgaWYgKGxlbiAhPT0gMCkge1xuICAgIHJlc3VsdFswXSA9IGxpc3RbMF07XG4gICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgaWYgKCFwcmVkKGxhc3QocmVzdWx0KSwgbGlzdFtpZHhdKSkge1xuICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBsaXN0W2lkeF07XG4gICAgICB9XG4gICAgICBpZHggKz0gMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gZHJvcFJlcGVhdHNXaXRoOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2Rpc3BhdGNoYWJsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcblxudmFyIF94ZHJvcFdoaWxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3hkcm9wV2hpbGUnKTtcblxudmFyIHNsaWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc2xpY2UnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGxpc3QgZXhjbHVkaW5nIHRoZSBsZWFkaW5nIGVsZW1lbnRzIG9mIGEgZ2l2ZW4gbGlzdCB3aGljaFxuICogc2F0aXNmeSB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIGZ1bmN0aW9uLiBJdCBwYXNzZXMgZWFjaCB2YWx1ZSB0byB0aGUgc3VwcGxpZWRcbiAqIHByZWRpY2F0ZSBmdW5jdGlvbiwgc2tpcHBpbmcgZWxlbWVudHMgd2hpbGUgdGhlIHByZWRpY2F0ZSBmdW5jdGlvbiByZXR1cm5zXG4gKiBgdHJ1ZWAuIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gaXMgYXBwbGllZCB0byBvbmUgYXJndW1lbnQ6ICoodmFsdWUpKi5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgZHJvcFdoaWxlYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW2FdXG4gKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IHhzIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBhcnJheS5cbiAqIEBzZWUgUi50YWtlV2hpbGUsIFIudHJhbnNkdWNlLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGx0ZVR3byA9IHggPT4geCA8PSAyO1xuICpcbiAqICAgICAgUi5kcm9wV2hpbGUobHRlVHdvLCBbMSwgMiwgMywgNCwgMywgMiwgMV0pOyAvLz0+IFszLCA0LCAzLCAyLCAxXVxuICpcbiAqICAgICAgUi5kcm9wV2hpbGUoeCA9PiB4ICE9PSAnZCcgLCAnUmFtZGEnKTsgLy89PiAnZGEnXG4gKi9cblxuXG52YXIgZHJvcFdoaWxlID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFsnZHJvcFdoaWxlJ10sIF94ZHJvcFdoaWxlLCBmdW5jdGlvbiBkcm9wV2hpbGUocHJlZCwgeHMpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSB4cy5sZW5ndGg7XG4gIHdoaWxlIChpZHggPCBsZW4gJiYgcHJlZCh4c1tpZHhdKSkge1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBzbGljZShpZHgsIEluZmluaXR5LCB4cyk7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IGRyb3BXaGlsZTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9pc0Z1bmN0aW9uID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lzRnVuY3Rpb24nKTtcblxudmFyIGxpZnQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9saWZ0Jyk7XG5cbnZhciBvciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL29yJyk7XG5cbi8qKlxuICogQSBmdW5jdGlvbiB3cmFwcGluZyBjYWxscyB0byB0aGUgdHdvIGZ1bmN0aW9ucyBpbiBhbiBgfHxgIG9wZXJhdGlvbixcbiAqIHJldHVybmluZyB0aGUgcmVzdWx0IG9mIHRoZSBmaXJzdCBmdW5jdGlvbiBpZiBpdCBpcyB0cnV0aC15IGFuZCB0aGUgcmVzdWx0XG4gKiBvZiB0aGUgc2Vjb25kIGZ1bmN0aW9uIG90aGVyd2lzZS4gTm90ZSB0aGF0IHRoaXMgaXMgc2hvcnQtY2lyY3VpdGVkLFxuICogbWVhbmluZyB0aGF0IHRoZSBzZWNvbmQgZnVuY3Rpb24gd2lsbCBub3QgYmUgaW52b2tlZCBpZiB0aGUgZmlyc3QgcmV0dXJucyBhXG4gKiB0cnV0aC15IHZhbHVlLlxuICpcbiAqIEluIGFkZGl0aW9uIHRvIGZ1bmN0aW9ucywgYFIuZWl0aGVyYCBhbHNvIGFjY2VwdHMgYW55IGZhbnRhc3ktbGFuZCBjb21wYXRpYmxlXG4gKiBhcHBsaWNhdGl2ZSBmdW5jdG9yLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEyLjBcbiAqIEBjYXRlZ29yeSBMb2dpY1xuICogQHNpZyAoKi4uLiAtPiBCb29sZWFuKSAtPiAoKi4uLiAtPiBCb29sZWFuKSAtPiAoKi4uLiAtPiBCb29sZWFuKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZiBhIHByZWRpY2F0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZyBhbm90aGVyIHByZWRpY2F0ZVxuICogQHJldHVybiB7RnVuY3Rpb259IGEgZnVuY3Rpb24gdGhhdCBhcHBsaWVzIGl0cyBhcmd1bWVudHMgdG8gYGZgIGFuZCBgZ2AgYW5kIGB8fGBzIHRoZWlyIG91dHB1dHMgdG9nZXRoZXIuXG4gKiBAc2VlIFIub3JcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZ3QxMCA9IHggPT4geCA+IDEwO1xuICogICAgICB2YXIgZXZlbiA9IHggPT4geCAlIDIgPT09IDA7XG4gKiAgICAgIHZhciBmID0gUi5laXRoZXIoZ3QxMCwgZXZlbik7XG4gKiAgICAgIGYoMTAxKTsgLy89PiB0cnVlXG4gKiAgICAgIGYoOCk7IC8vPT4gdHJ1ZVxuICovXG5cblxudmFyIGVpdGhlciA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGVpdGhlcihmLCBnKSB7XG4gIHJldHVybiBfaXNGdW5jdGlvbihmKSA/IGZ1bmN0aW9uIF9laXRoZXIoKSB7XG4gICAgcmV0dXJuIGYuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCBnLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH0gOiBsaWZ0KG9yKShmLCBnKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBlaXRoZXI7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBfaXNBcmd1bWVudHMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNBcmd1bWVudHMnKTtcblxudmFyIF9pc0FycmF5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lzQXJyYXknKTtcblxudmFyIF9pc09iamVjdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19pc09iamVjdCcpO1xuXG52YXIgX2lzU3RyaW5nID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lzU3RyaW5nJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZW1wdHkgdmFsdWUgb2YgaXRzIGFyZ3VtZW50J3MgdHlwZS4gUmFtZGEgZGVmaW5lcyB0aGUgZW1wdHlcbiAqIHZhbHVlIG9mIEFycmF5IChgW11gKSwgT2JqZWN0IChge31gKSwgU3RyaW5nIChgJydgKSwgYW5kIEFyZ3VtZW50cy4gT3RoZXJcbiAqIHR5cGVzIGFyZSBzdXBwb3J0ZWQgaWYgdGhleSBkZWZpbmUgYDxUeXBlPi5lbXB0eWAsXG4gKiBgPFR5cGU+LnByb3RvdHlwZS5lbXB0eWAgb3IgaW1wbGVtZW50IHRoZVxuICogW0ZhbnRhc3lMYW5kIE1vbm9pZCBzcGVjXShodHRwczovL2dpdGh1Yi5jb20vZmFudGFzeWxhbmQvZmFudGFzeS1sYW5kI21vbm9pZCkuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYGVtcHR5YCBtZXRob2Qgb2YgdGhlIGZpcnN0IGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjMuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIGEgLT4gYVxuICogQHBhcmFtIHsqfSB4XG4gKiBAcmV0dXJuIHsqfVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZW1wdHkoSnVzdCg0MikpOyAgICAgIC8vPT4gTm90aGluZygpXG4gKiAgICAgIFIuZW1wdHkoWzEsIDIsIDNdKTsgICAgIC8vPT4gW11cbiAqICAgICAgUi5lbXB0eSgndW5pY29ybnMnKTsgICAgLy89PiAnJ1xuICogICAgICBSLmVtcHR5KHt4OiAxLCB5OiAyfSk7ICAvLz0+IHt9XG4gKi9cblxuXG52YXIgZW1wdHkgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBlbXB0eSh4KSB7XG4gIHJldHVybiB4ICE9IG51bGwgJiYgdHlwZW9mIHhbJ2ZhbnRhc3ktbGFuZC9lbXB0eSddID09PSAnZnVuY3Rpb24nID8geFsnZmFudGFzeS1sYW5kL2VtcHR5J10oKSA6IHggIT0gbnVsbCAmJiB4LmNvbnN0cnVjdG9yICE9IG51bGwgJiYgdHlwZW9mIHguY29uc3RydWN0b3JbJ2ZhbnRhc3ktbGFuZC9lbXB0eSddID09PSAnZnVuY3Rpb24nID8geC5jb25zdHJ1Y3RvclsnZmFudGFzeS1sYW5kL2VtcHR5J10oKSA6IHggIT0gbnVsbCAmJiB0eXBlb2YgeC5lbXB0eSA9PT0gJ2Z1bmN0aW9uJyA/IHguZW1wdHkoKSA6IHggIT0gbnVsbCAmJiB4LmNvbnN0cnVjdG9yICE9IG51bGwgJiYgdHlwZW9mIHguY29uc3RydWN0b3IuZW1wdHkgPT09ICdmdW5jdGlvbicgPyB4LmNvbnN0cnVjdG9yLmVtcHR5KCkgOiBfaXNBcnJheSh4KSA/IFtdIDogX2lzU3RyaW5nKHgpID8gJycgOiBfaXNPYmplY3QoeCkgPyB7fSA6IF9pc0FyZ3VtZW50cyh4KSA/IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzO1xuICB9KCkgOlxuICAvLyBlbHNlXG4gIHZvaWQgMDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBlbXB0eTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIGVxdWFscyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2VxdWFscycpO1xuXG52YXIgdGFrZUxhc3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi90YWtlTGFzdCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgZW5kcyB3aXRoIHRoZSBwcm92aWRlZCB2YWx1ZXNcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yNC4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbYV0gLT4gQm9vbGVhblxuICogQHNpZyBTdHJpbmcgLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfSBzdWZmaXhcbiAqIEBwYXJhbSB7Kn0gbGlzdFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmVuZHNXaXRoKCdjJywgJ2FiYycpICAgICAgICAgICAgICAgIC8vPT4gdHJ1ZVxuICogICAgICBSLmVuZHNXaXRoKCdiJywgJ2FiYycpICAgICAgICAgICAgICAgIC8vPT4gZmFsc2VcbiAqICAgICAgUi5lbmRzV2l0aChbJ2MnXSwgWydhJywgJ2InLCAnYyddKSAgICAvLz0+IHRydWVcbiAqICAgICAgUi5lbmRzV2l0aChbJ2InXSwgWydhJywgJ2InLCAnYyddKSAgICAvLz0+IGZhbHNlXG4gKi9cblxuXG52YXIgZW5kc1dpdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiAoc3VmZml4LCBsaXN0KSB7XG4gIHJldHVybiBlcXVhbHModGFrZUxhc3Qoc3VmZml4Lmxlbmd0aCwgbGlzdCksIHN1ZmZpeCk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZW5kc1dpdGg7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbnZhciBlcXVhbHMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9lcXVhbHMnKTtcblxuLyoqXG4gKiBUYWtlcyBhIGZ1bmN0aW9uIGFuZCB0d28gdmFsdWVzIGluIGl0cyBkb21haW4gYW5kIHJldHVybnMgYHRydWVgIGlmIHRoZVxuICogdmFsdWVzIG1hcCB0byB0aGUgc2FtZSB2YWx1ZSBpbiB0aGUgY29kb21haW47IGBmYWxzZWAgb3RoZXJ3aXNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE4LjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyAoYSAtPiBiKSAtPiBhIC0+IGEgLT4gQm9vbGVhblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZlxuICogQHBhcmFtIHsqfSB4XG4gKiBAcGFyYW0geyp9IHlcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5lcUJ5KE1hdGguYWJzLCA1LCAtNSk7IC8vPT4gdHJ1ZVxuICovXG5cblxudmFyIGVxQnkgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBlcUJ5KGYsIHgsIHkpIHtcbiAgcmV0dXJuIGVxdWFscyhmKHgpLCBmKHkpKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBlcUJ5OyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG52YXIgZXF1YWxzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZXF1YWxzJyk7XG5cbi8qKlxuICogUmVwb3J0cyB3aGV0aGVyIHR3byBvYmplY3RzIGhhdmUgdGhlIHNhbWUgdmFsdWUsIGluIFtgUi5lcXVhbHNgXSgjZXF1YWxzKVxuICogdGVybXMsIGZvciB0aGUgc3BlY2lmaWVkIHByb3BlcnR5LiBVc2VmdWwgYXMgYSBjdXJyaWVkIHByZWRpY2F0ZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgayAtPiB7azogdn0gLT4ge2s6IHZ9IC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBjb21wYXJlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMVxuICogQHBhcmFtIHtPYmplY3R9IG9iajJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBvMSA9IHsgYTogMSwgYjogMiwgYzogMywgZDogNCB9O1xuICogICAgICB2YXIgbzIgPSB7IGE6IDEwLCBiOiAyMCwgYzogMywgZDogNDAgfTtcbiAqICAgICAgUi5lcVByb3BzKCdhJywgbzEsIG8yKTsgLy89PiBmYWxzZVxuICogICAgICBSLmVxUHJvcHMoJ2MnLCBvMSwgbzIpOyAvLz0+IHRydWVcbiAqL1xuXG5cbnZhciBlcVByb3BzID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gZXFQcm9wcyhwcm9wLCBvYmoxLCBvYmoyKSB7XG4gIHJldHVybiBlcXVhbHMob2JqMVtwcm9wXSwgb2JqMltwcm9wXSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZXFQcm9wczsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9lcXVhbHMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZXF1YWxzJyk7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgaXRzIGFyZ3VtZW50cyBhcmUgZXF1aXZhbGVudCwgYGZhbHNlYCBvdGhlcndpc2UuIEhhbmRsZXNcbiAqIGN5Y2xpY2FsIGRhdGEgc3RydWN0dXJlcy5cbiAqXG4gKiBEaXNwYXRjaGVzIHN5bW1ldHJpY2FsbHkgdG8gdGhlIGBlcXVhbHNgIG1ldGhvZHMgb2YgYm90aCBhcmd1bWVudHMsIGlmXG4gKiBwcmVzZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE1LjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBhIC0+IGIgLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfSBhXG4gKiBAcGFyYW0geyp9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5lcXVhbHMoMSwgMSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmVxdWFscygxLCAnMScpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuZXF1YWxzKFsxLCAyLCAzXSwgWzEsIDIsIDNdKTsgLy89PiB0cnVlXG4gKlxuICogICAgICB2YXIgYSA9IHt9OyBhLnYgPSBhO1xuICogICAgICB2YXIgYiA9IHt9OyBiLnYgPSBiO1xuICogICAgICBSLmVxdWFscyhhLCBiKTsgLy89PiB0cnVlXG4gKi9cblxuXG52YXIgZXF1YWxzID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgcmV0dXJuIF9lcXVhbHMoYSwgYiwgW10sIFtdKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBlcXVhbHM7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBvYmplY3QgYnkgcmVjdXJzaXZlbHkgZXZvbHZpbmcgYSBzaGFsbG93IGNvcHkgb2YgYG9iamVjdGAsXG4gKiBhY2NvcmRpbmcgdG8gdGhlIGB0cmFuc2Zvcm1hdGlvbmAgZnVuY3Rpb25zLiBBbGwgbm9uLXByaW1pdGl2ZSBwcm9wZXJ0aWVzXG4gKiBhcmUgY29waWVkIGJ5IHJlZmVyZW5jZS5cbiAqXG4gKiBBIGB0cmFuc2Zvcm1hdGlvbmAgZnVuY3Rpb24gd2lsbCBub3QgYmUgaW52b2tlZCBpZiBpdHMgY29ycmVzcG9uZGluZyBrZXlcbiAqIGRvZXMgbm90IGV4aXN0IGluIHRoZSBldm9sdmVkIG9iamVjdC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC45LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcge2s6ICh2IC0+IHYpfSAtPiB7azogdn0gLT4ge2s6IHZ9XG4gKiBAcGFyYW0ge09iamVjdH0gdHJhbnNmb3JtYXRpb25zIFRoZSBvYmplY3Qgc3BlY2lmeWluZyB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbnMgdG8gYXBwbHlcbiAqICAgICAgICB0byB0aGUgb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJlIHRyYW5zZm9ybWVkLlxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgdHJhbnNmb3JtZWQgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciB0b21hdG8gID0ge2ZpcnN0TmFtZTogJyAgVG9tYXRvICcsIGRhdGE6IHtlbGFwc2VkOiAxMDAsIHJlbWFpbmluZzogMTQwMH0sIGlkOjEyM307XG4gKiAgICAgIHZhciB0cmFuc2Zvcm1hdGlvbnMgPSB7XG4gKiAgICAgICAgZmlyc3ROYW1lOiBSLnRyaW0sXG4gKiAgICAgICAgbGFzdE5hbWU6IFIudHJpbSwgLy8gV2lsbCBub3QgZ2V0IGludm9rZWQuXG4gKiAgICAgICAgZGF0YToge2VsYXBzZWQ6IFIuYWRkKDEpLCByZW1haW5pbmc6IFIuYWRkKC0xKX1cbiAqICAgICAgfTtcbiAqICAgICAgUi5ldm9sdmUodHJhbnNmb3JtYXRpb25zLCB0b21hdG8pOyAvLz0+IHtmaXJzdE5hbWU6ICdUb21hdG8nLCBkYXRhOiB7ZWxhcHNlZDogMTAxLCByZW1haW5pbmc6IDEzOTl9LCBpZDoxMjN9XG4gKi9cblxuXG52YXIgZXZvbHZlID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gZXZvbHZlKHRyYW5zZm9ybWF0aW9ucywgb2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgdmFyIHRyYW5zZm9ybWF0aW9uLCBrZXksIHR5cGU7XG4gIGZvciAoa2V5IGluIG9iamVjdCkge1xuICAgIHRyYW5zZm9ybWF0aW9uID0gdHJhbnNmb3JtYXRpb25zW2tleV07XG4gICAgdHlwZSA9IHR5cGVvZiB0cmFuc2Zvcm1hdGlvbjtcbiAgICByZXN1bHRba2V5XSA9IHR5cGUgPT09ICdmdW5jdGlvbicgPyB0cmFuc2Zvcm1hdGlvbihvYmplY3Rba2V5XSkgOiB0cmFuc2Zvcm1hdGlvbiAmJiB0eXBlID09PSAnb2JqZWN0JyA/IGV2b2x2ZSh0cmFuc2Zvcm1hdGlvbiwgb2JqZWN0W2tleV0pIDogb2JqZWN0W2tleV07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBldm9sdmU7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfZGlzcGF0Y2hhYmxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xuXG52YXIgX2ZpbHRlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19maWx0ZXInKTtcblxudmFyIF9pc09iamVjdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19pc09iamVjdCcpO1xuXG52YXIgX3JlZHVjZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19yZWR1Y2UnKTtcblxudmFyIF94ZmlsdGVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3hmaWx0ZXInKTtcblxudmFyIGtleXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9rZXlzJyk7XG5cbi8qKlxuICogVGFrZXMgYSBwcmVkaWNhdGUgYW5kIGEgYEZpbHRlcmFibGVgLCBhbmQgcmV0dXJucyBhIG5ldyBmaWx0ZXJhYmxlIG9mIHRoZVxuICogc2FtZSB0eXBlIGNvbnRhaW5pbmcgdGhlIG1lbWJlcnMgb2YgdGhlIGdpdmVuIGZpbHRlcmFibGUgd2hpY2ggc2F0aXNmeSB0aGVcbiAqIGdpdmVuIHByZWRpY2F0ZS4gRmlsdGVyYWJsZSBvYmplY3RzIGluY2x1ZGUgcGxhaW4gb2JqZWN0cyBvciBhbnkgb2JqZWN0XG4gKiB0aGF0IGhhcyBhIGZpbHRlciBtZXRob2Qgc3VjaCBhcyBgQXJyYXlgLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBmaWx0ZXJgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIEZpbHRlcmFibGUgZiA9PiAoYSAtPiBCb29sZWFuKSAtPiBmIGEgLT4gZiBhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkXG4gKiBAcGFyYW0ge0FycmF5fSBmaWx0ZXJhYmxlXG4gKiBAcmV0dXJuIHtBcnJheX0gRmlsdGVyYWJsZVxuICogQHNlZSBSLnJlamVjdCwgUi50cmFuc2R1Y2UsIFIuYWRkSW5kZXhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgaXNFdmVuID0gbiA9PiBuICUgMiA9PT0gMDtcbiAqXG4gKiAgICAgIFIuZmlsdGVyKGlzRXZlbiwgWzEsIDIsIDMsIDRdKTsgLy89PiBbMiwgNF1cbiAqXG4gKiAgICAgIFIuZmlsdGVyKGlzRXZlbiwge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9KTsgLy89PiB7YjogMiwgZDogNH1cbiAqL1xuXG5cbnZhciBmaWx0ZXIgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MiggLyojX19QVVJFX18qL19kaXNwYXRjaGFibGUoWydmaWx0ZXInXSwgX3hmaWx0ZXIsIGZ1bmN0aW9uIChwcmVkLCBmaWx0ZXJhYmxlKSB7XG4gIHJldHVybiBfaXNPYmplY3QoZmlsdGVyYWJsZSkgPyBfcmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgIGlmIChwcmVkKGZpbHRlcmFibGVba2V5XSkpIHtcbiAgICAgIGFjY1trZXldID0gZmlsdGVyYWJsZVtrZXldO1xuICAgIH1cbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSwga2V5cyhmaWx0ZXJhYmxlKSkgOlxuICAvLyBlbHNlXG4gIF9maWx0ZXIocHJlZCwgZmlsdGVyYWJsZSk7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZpbHRlcjsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9kaXNwYXRjaGFibGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG5cbnZhciBfeGZpbmQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9feGZpbmQnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBsaXN0IHdoaWNoIG1hdGNoZXMgdGhlIHByZWRpY2F0ZSwgb3JcbiAqIGB1bmRlZmluZWRgIGlmIG5vIGVsZW1lbnQgbWF0Y2hlcy5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgZmluZGAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IGEgfCB1bmRlZmluZWRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gdXNlZCB0byBkZXRlcm1pbmUgaWYgdGhlIGVsZW1lbnQgaXMgdGhlXG4gKiAgICAgICAgZGVzaXJlZCBvbmUuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIGVsZW1lbnQgZm91bmQsIG9yIGB1bmRlZmluZWRgLlxuICogQHNlZSBSLnRyYW5zZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciB4cyA9IFt7YTogMX0sIHthOiAyfSwge2E6IDN9XTtcbiAqICAgICAgUi5maW5kKFIucHJvcEVxKCdhJywgMikpKHhzKTsgLy89PiB7YTogMn1cbiAqICAgICAgUi5maW5kKFIucHJvcEVxKCdhJywgNCkpKHhzKTsgLy89PiB1bmRlZmluZWRcbiAqL1xuXG5cbnZhciBmaW5kID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFsnZmluZCddLCBfeGZpbmQsIGZ1bmN0aW9uIGZpbmQoZm4sIGxpc3QpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGlmIChmbihsaXN0W2lkeF0pKSB7XG4gICAgICByZXR1cm4gbGlzdFtpZHhdO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBmaW5kOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2Rpc3BhdGNoYWJsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcblxudmFyIF94ZmluZEluZGV4ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3hmaW5kSW5kZXgnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgbGlzdCB3aGljaCBtYXRjaGVzIHRoZVxuICogcHJlZGljYXRlLCBvciBgLTFgIGlmIG5vIGVsZW1lbnQgbWF0Y2hlcy5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4xXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gTnVtYmVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHRoZSBlbGVtZW50IGlzIHRoZVxuICogZGVzaXJlZCBvbmUuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IGZvdW5kLCBvciBgLTFgLlxuICogQHNlZSBSLnRyYW5zZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciB4cyA9IFt7YTogMX0sIHthOiAyfSwge2E6IDN9XTtcbiAqICAgICAgUi5maW5kSW5kZXgoUi5wcm9wRXEoJ2EnLCAyKSkoeHMpOyAvLz0+IDFcbiAqICAgICAgUi5maW5kSW5kZXgoUi5wcm9wRXEoJ2EnLCA0KSkoeHMpOyAvLz0+IC0xXG4gKi9cblxuXG52YXIgZmluZEluZGV4ID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFtdLCBfeGZpbmRJbmRleCwgZnVuY3Rpb24gZmluZEluZGV4KGZuLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBpZiAoZm4obGlzdFtpZHhdKSkge1xuICAgICAgcmV0dXJuIGlkeDtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIC0xO1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBmaW5kSW5kZXg7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfZGlzcGF0Y2hhYmxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xuXG52YXIgX3hmaW5kTGFzdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL194ZmluZExhc3QnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBsYXN0IGVsZW1lbnQgb2YgdGhlIGxpc3Qgd2hpY2ggbWF0Y2hlcyB0aGUgcHJlZGljYXRlLCBvclxuICogYHVuZGVmaW5lZGAgaWYgbm8gZWxlbWVudCBtYXRjaGVzLlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjFcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBhIHwgdW5kZWZpbmVkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHRoZSBlbGVtZW50IGlzIHRoZVxuICogZGVzaXJlZCBvbmUuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIGVsZW1lbnQgZm91bmQsIG9yIGB1bmRlZmluZWRgLlxuICogQHNlZSBSLnRyYW5zZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciB4cyA9IFt7YTogMSwgYjogMH0sIHthOjEsIGI6IDF9XTtcbiAqICAgICAgUi5maW5kTGFzdChSLnByb3BFcSgnYScsIDEpKSh4cyk7IC8vPT4ge2E6IDEsIGI6IDF9XG4gKiAgICAgIFIuZmluZExhc3QoUi5wcm9wRXEoJ2EnLCA0KSkoeHMpOyAvLz0+IHVuZGVmaW5lZFxuICovXG5cblxudmFyIGZpbmRMYXN0ID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFtdLCBfeGZpbmRMYXN0LCBmdW5jdGlvbiBmaW5kTGFzdChmbiwgbGlzdCkge1xuICB2YXIgaWR4ID0gbGlzdC5sZW5ndGggLSAxO1xuICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICBpZiAoZm4obGlzdFtpZHhdKSkge1xuICAgICAgcmV0dXJuIGxpc3RbaWR4XTtcbiAgICB9XG4gICAgaWR4IC09IDE7XG4gIH1cbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gZmluZExhc3Q7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfZGlzcGF0Y2hhYmxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xuXG52YXIgX3hmaW5kTGFzdEluZGV4ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3hmaW5kTGFzdEluZGV4Jyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGxhc3QgZWxlbWVudCBvZiB0aGUgbGlzdCB3aGljaCBtYXRjaGVzIHRoZVxuICogcHJlZGljYXRlLCBvciBgLTFgIGlmIG5vIGVsZW1lbnQgbWF0Y2hlcy5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4xXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gTnVtYmVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHRoZSBlbGVtZW50IGlzIHRoZVxuICogZGVzaXJlZCBvbmUuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IGZvdW5kLCBvciBgLTFgLlxuICogQHNlZSBSLnRyYW5zZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciB4cyA9IFt7YTogMSwgYjogMH0sIHthOjEsIGI6IDF9XTtcbiAqICAgICAgUi5maW5kTGFzdEluZGV4KFIucHJvcEVxKCdhJywgMSkpKHhzKTsgLy89PiAxXG4gKiAgICAgIFIuZmluZExhc3RJbmRleChSLnByb3BFcSgnYScsIDQpKSh4cyk7IC8vPT4gLTFcbiAqL1xuXG5cbnZhciBmaW5kTGFzdEluZGV4ID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFtdLCBfeGZpbmRMYXN0SW5kZXgsIGZ1bmN0aW9uIGZpbmRMYXN0SW5kZXgoZm4sIGxpc3QpIHtcbiAgdmFyIGlkeCA9IGxpc3QubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKGlkeCA+PSAwKSB7XG4gICAgaWYgKGZuKGxpc3RbaWR4XSkpIHtcbiAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuICAgIGlkeCAtPSAxO1xuICB9XG4gIHJldHVybiAtMTtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gZmluZExhc3RJbmRleDsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIF9tYWtlRmxhdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19tYWtlRmxhdCcpO1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCBieSBwdWxsaW5nIGV2ZXJ5IGl0ZW0gb3V0IG9mIGl0IChhbmQgYWxsIGl0cyBzdWItYXJyYXlzKVxuICogYW5kIHB1dHRpbmcgdGhlbSBpbiBhIG5ldyBhcnJheSwgZGVwdGgtZmlyc3QuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbYV0gLT4gW2JdXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgZmxhdHRlbmVkIGxpc3QuXG4gKiBAc2VlIFIudW5uZXN0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5mbGF0dGVuKFsxLCAyLCBbMywgNF0sIDUsIFs2LCBbNywgOCwgWzksIFsxMCwgMTFdLCAxMl1dXV0pO1xuICogICAgICAvLz0+IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXVxuICovXG5cblxudmFyIGZsYXR0ZW4gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MSggLyojX19QVVJFX18qL19tYWtlRmxhdCh0cnVlKSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZsYXR0ZW47IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBjdXJyeU4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jdXJyeU4nKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGZ1bmN0aW9uIG11Y2ggbGlrZSB0aGUgc3VwcGxpZWQgb25lLCBleGNlcHQgdGhhdCB0aGUgZmlyc3QgdHdvXG4gKiBhcmd1bWVudHMnIG9yZGVyIGlzIHJldmVyc2VkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgoYSwgYiwgYywgLi4uKSAtPiB6KSAtPiAoYiAtPiBhIC0+IGMgLT4gLi4uIC0+IHopXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gaW52b2tlIHdpdGggaXRzIGZpcnN0IHR3byBwYXJhbWV0ZXJzIHJldmVyc2VkLlxuICogQHJldHVybiB7Kn0gVGhlIHJlc3VsdCBvZiBpbnZva2luZyBgZm5gIHdpdGggaXRzIGZpcnN0IHR3byBwYXJhbWV0ZXJzJyBvcmRlciByZXZlcnNlZC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbWVyZ2VUaHJlZSA9IChhLCBiLCBjKSA9PiBbXS5jb25jYXQoYSwgYiwgYyk7XG4gKlxuICogICAgICBtZXJnZVRocmVlKDEsIDIsIDMpOyAvLz0+IFsxLCAyLCAzXVxuICpcbiAqICAgICAgUi5mbGlwKG1lcmdlVGhyZWUpKDEsIDIsIDMpOyAvLz0+IFsyLCAxLCAzXVxuICogQHN5bWIgUi5mbGlwKGYpKGEsIGIsIGMpID0gZihiLCBhLCBjKVxuICovXG5cblxudmFyIGZsaXAgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBmbGlwKGZuKSB7XG4gIHJldHVybiBjdXJyeU4oZm4ubGVuZ3RoLCBmdW5jdGlvbiAoYSwgYikge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICBhcmdzWzBdID0gYjtcbiAgICBhcmdzWzFdID0gYTtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncyk7XG4gIH0pO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZsaXA7IiwidmFyIF9jaGVja0Zvck1ldGhvZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jaGVja0Zvck1ldGhvZCcpO1xuXG52YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gaW5wdXQgYGxpc3RgLCBjYWxsaW5nIGEgcHJvdmlkZWQgZnVuY3Rpb24gYGZuYCBmb3IgZWFjaFxuICogZWxlbWVudCBpbiB0aGUgbGlzdC5cbiAqXG4gKiBgZm5gIHJlY2VpdmVzIG9uZSBhcmd1bWVudDogKih2YWx1ZSkqLlxuICpcbiAqIE5vdGU6IGBSLmZvckVhY2hgIGRvZXMgbm90IHNraXAgZGVsZXRlZCBvciB1bmFzc2lnbmVkIGluZGljZXMgKHNwYXJzZVxuICogYXJyYXlzKSwgdW5saWtlIHRoZSBuYXRpdmUgYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2QuIEZvciBtb3JlXG4gKiBkZXRhaWxzIG9uIHRoaXMgYmVoYXZpb3IsIHNlZTpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZvckVhY2gjRGVzY3JpcHRpb25cbiAqXG4gKiBBbHNvIG5vdGUgdGhhdCwgdW5saWtlIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAsIFJhbWRhJ3MgYGZvckVhY2hgIHJldHVybnNcbiAqIHRoZSBvcmlnaW5hbCBhcnJheS4gSW4gc29tZSBsaWJyYXJpZXMgdGhpcyBmdW5jdGlvbiBpcyBuYW1lZCBgZWFjaGAuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYGZvckVhY2hgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMVxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gKikgLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGludm9rZS4gUmVjZWl2ZXMgb25lIGFyZ3VtZW50LCBgdmFsdWVgLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIG9yaWdpbmFsIGxpc3QuXG4gKiBAc2VlIFIuYWRkSW5kZXhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgcHJpbnRYUGx1c0ZpdmUgPSB4ID0+IGNvbnNvbGUubG9nKHggKyA1KTtcbiAqICAgICAgUi5mb3JFYWNoKHByaW50WFBsdXNGaXZlLCBbMSwgMiwgM10pOyAvLz0+IFsxLCAyLCAzXVxuICogICAgICAvLyBsb2dzIDZcbiAqICAgICAgLy8gbG9ncyA3XG4gKiAgICAgIC8vIGxvZ3MgOFxuICogQHN5bWIgUi5mb3JFYWNoKGYsIFthLCBiLCBjXSkgPSBbYSwgYiwgY11cbiAqL1xuXG5cbnZhciBmb3JFYWNoID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fY2hlY2tGb3JNZXRob2QoJ2ZvckVhY2gnLCBmdW5jdGlvbiBmb3JFYWNoKGZuLCBsaXN0KSB7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgdmFyIGlkeCA9IDA7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBmbihsaXN0W2lkeF0pO1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBsaXN0O1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBmb3JFYWNoOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIga2V5cyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gaW5wdXQgYG9iamVjdGAsIGNhbGxpbmcgYSBwcm92aWRlZCBmdW5jdGlvbiBgZm5gIGZvciBlYWNoXG4gKiBrZXkgYW5kIHZhbHVlIGluIHRoZSBvYmplY3QuXG4gKlxuICogYGZuYCByZWNlaXZlcyB0aHJlZSBhcmd1bWVudDogKih2YWx1ZSwga2V5LCBvYmopKi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yMy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnICgoYSwgU3RyaW5nLCBTdHJNYXAgYSkgLT4gQW55KSAtPiBTdHJNYXAgYSAtPiBTdHJNYXAgYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGludm9rZS4gUmVjZWl2ZXMgdGhyZWUgYXJndW1lbnQsIGB2YWx1ZWAsIGBrZXlgLCBgb2JqYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBvcmlnaW5hbCBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHByaW50S2V5Q29uY2F0VmFsdWUgPSAodmFsdWUsIGtleSkgPT4gY29uc29sZS5sb2coa2V5ICsgJzonICsgdmFsdWUpO1xuICogICAgICBSLmZvckVhY2hPYmpJbmRleGVkKHByaW50S2V5Q29uY2F0VmFsdWUsIHt4OiAxLCB5OiAyfSk7IC8vPT4ge3g6IDEsIHk6IDJ9XG4gKiAgICAgIC8vIGxvZ3MgeDoxXG4gKiAgICAgIC8vIGxvZ3MgeToyXG4gKiBAc3ltYiBSLmZvckVhY2hPYmpJbmRleGVkKGYsIHt4OiBhLCB5OiBifSkgPSB7eDogYSwgeTogYn1cbiAqL1xuXG5cbnZhciBmb3JFYWNoT2JqSW5kZXhlZCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGZvckVhY2hPYmpJbmRleGVkKGZuLCBvYmopIHtcbiAgdmFyIGtleUxpc3QgPSBrZXlzKG9iaik7XG4gIHZhciBpZHggPSAwO1xuICB3aGlsZSAoaWR4IDwga2V5TGlzdC5sZW5ndGgpIHtcbiAgICB2YXIga2V5ID0ga2V5TGlzdFtpZHhdO1xuICAgIGZuKG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBmb3JFYWNoT2JqSW5kZXhlZDsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG9iamVjdCBmcm9tIGEgbGlzdCBrZXktdmFsdWUgcGFpcnMuIElmIGEga2V5IGFwcGVhcnMgaW5cbiAqIG11bHRpcGxlIHBhaXJzLCB0aGUgcmlnaHRtb3N0IHBhaXIgaXMgaW5jbHVkZWQgaW4gdGhlIG9iamVjdC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4zLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFtbayx2XV0gLT4ge2s6IHZ9XG4gKiBAcGFyYW0ge0FycmF5fSBwYWlycyBBbiBhcnJheSBvZiB0d28tZWxlbWVudCBhcnJheXMgdGhhdCB3aWxsIGJlIHRoZSBrZXlzIGFuZCB2YWx1ZXMgb2YgdGhlIG91dHB1dCBvYmplY3QuXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBvYmplY3QgbWFkZSBieSBwYWlyaW5nIHVwIGBrZXlzYCBhbmQgYHZhbHVlc2AuXG4gKiBAc2VlIFIudG9QYWlycywgUi5wYWlyXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5mcm9tUGFpcnMoW1snYScsIDFdLCBbJ2InLCAyXSwgWydjJywgM11dKTsgLy89PiB7YTogMSwgYjogMiwgYzogM31cbiAqL1xuXG5cbnZhciBmcm9tUGFpcnMgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBmcm9tUGFpcnMocGFpcnMpIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICB2YXIgaWR4ID0gMDtcbiAgd2hpbGUgKGlkeCA8IHBhaXJzLmxlbmd0aCkge1xuICAgIHJlc3VsdFtwYWlyc1tpZHhdWzBdXSA9IHBhaXJzW2lkeF1bMV07XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBmcm9tUGFpcnM7IiwidmFyIF9jaGVja0Zvck1ldGhvZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jaGVja0Zvck1ldGhvZCcpO1xuXG52YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIHJlZHVjZUJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmVkdWNlQnknKTtcblxuLyoqXG4gKiBTcGxpdHMgYSBsaXN0IGludG8gc3ViLWxpc3RzIHN0b3JlZCBpbiBhbiBvYmplY3QsIGJhc2VkIG9uIHRoZSByZXN1bHQgb2ZcbiAqIGNhbGxpbmcgYSBTdHJpbmctcmV0dXJuaW5nIGZ1bmN0aW9uIG9uIGVhY2ggZWxlbWVudCwgYW5kIGdyb3VwaW5nIHRoZVxuICogcmVzdWx0cyBhY2NvcmRpbmcgdG8gdmFsdWVzIHJldHVybmVkLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBncm91cEJ5YCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBTdHJpbmcpIC0+IFthXSAtPiB7U3RyaW5nOiBbYV19XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiA6OiBhIC0+IFN0cmluZ1xuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gZ3JvdXBcbiAqIEByZXR1cm4ge09iamVjdH0gQW4gb2JqZWN0IHdpdGggdGhlIG91dHB1dCBvZiBgZm5gIGZvciBrZXlzLCBtYXBwZWQgdG8gYXJyYXlzIG9mIGVsZW1lbnRzXG4gKiAgICAgICAgIHRoYXQgcHJvZHVjZWQgdGhhdCBrZXkgd2hlbiBwYXNzZWQgdG8gYGZuYC5cbiAqIEBzZWUgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgYnlHcmFkZSA9IFIuZ3JvdXBCeShmdW5jdGlvbihzdHVkZW50KSB7XG4gKiAgICAgICAgdmFyIHNjb3JlID0gc3R1ZGVudC5zY29yZTtcbiAqICAgICAgICByZXR1cm4gc2NvcmUgPCA2NSA/ICdGJyA6XG4gKiAgICAgICAgICAgICAgIHNjb3JlIDwgNzAgPyAnRCcgOlxuICogICAgICAgICAgICAgICBzY29yZSA8IDgwID8gJ0MnIDpcbiAqICAgICAgICAgICAgICAgc2NvcmUgPCA5MCA/ICdCJyA6ICdBJztcbiAqICAgICAgfSk7XG4gKiAgICAgIHZhciBzdHVkZW50cyA9IFt7bmFtZTogJ0FiYnknLCBzY29yZTogODR9LFxuICogICAgICAgICAgICAgICAgICAgICAge25hbWU6ICdFZGR5Jywgc2NvcmU6IDU4fSxcbiAqICAgICAgICAgICAgICAgICAgICAgIC8vIC4uLlxuICogICAgICAgICAgICAgICAgICAgICAge25hbWU6ICdKYWNrJywgc2NvcmU6IDY5fV07XG4gKiAgICAgIGJ5R3JhZGUoc3R1ZGVudHMpO1xuICogICAgICAvLyB7XG4gKiAgICAgIC8vICAgJ0EnOiBbe25hbWU6ICdEaWFubmUnLCBzY29yZTogOTl9XSxcbiAqICAgICAgLy8gICAnQic6IFt7bmFtZTogJ0FiYnknLCBzY29yZTogODR9XVxuICogICAgICAvLyAgIC8vIC4uLixcbiAqICAgICAgLy8gICAnRic6IFt7bmFtZTogJ0VkZHknLCBzY29yZTogNTh9XVxuICogICAgICAvLyB9XG4gKi9cblxuXG52YXIgZ3JvdXBCeSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKCAvKiNfX1BVUkVfXyovX2NoZWNrRm9yTWV0aG9kKCdncm91cEJ5JywgLyojX19QVVJFX18qL3JlZHVjZUJ5KGZ1bmN0aW9uIChhY2MsIGl0ZW0pIHtcbiAgaWYgKGFjYyA9PSBudWxsKSB7XG4gICAgYWNjID0gW107XG4gIH1cbiAgYWNjLnB1c2goaXRlbSk7XG4gIHJldHVybiBhY2M7XG59LCBudWxsKSkpO1xubW9kdWxlLmV4cG9ydHMgPSBncm91cEJ5OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFRha2VzIGEgbGlzdCBhbmQgcmV0dXJucyBhIGxpc3Qgb2YgbGlzdHMgd2hlcmUgZWFjaCBzdWJsaXN0J3MgZWxlbWVudHMgYXJlXG4gKiBhbGwgc2F0aXNmaWVkIHBhaXJ3aXNlIGNvbXBhcmlzb24gYWNjb3JkaW5nIHRvIHRoZSBwcm92aWRlZCBmdW5jdGlvbi5cbiAqIE9ubHkgYWRqYWNlbnQgZWxlbWVudHMgYXJlIHBhc3NlZCB0byB0aGUgY29tcGFyaXNvbiBmdW5jdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoKGEsIGEpIOKGkiBCb29sZWFuKSDihpIgW2FdIOKGkiBbW2FdXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gZm9yIGRldGVybWluaW5nIHdoZXRoZXIgdHdvIGdpdmVuIChhZGphY2VudClcbiAqICAgICAgICBlbGVtZW50cyBzaG91bGQgYmUgaW4gdGhlIHNhbWUgZ3JvdXBcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGdyb3VwLiBBbHNvIGFjY2VwdHMgYSBzdHJpbmcsIHdoaWNoIHdpbGwgYmVcbiAqICAgICAgICB0cmVhdGVkIGFzIGEgbGlzdCBvZiBjaGFyYWN0ZXJzLlxuICogQHJldHVybiB7TGlzdH0gQSBsaXN0IHRoYXQgY29udGFpbnMgc3VibGlzdHMgb2YgZWxlbWVudHMsXG4gKiAgICAgICAgIHdob3NlIGNvbmNhdGVuYXRpb25zIGFyZSBlcXVhbCB0byB0aGUgb3JpZ2luYWwgbGlzdC5cbiAqIEBleGFtcGxlXG4gKlxuICogUi5ncm91cFdpdGgoUi5lcXVhbHMsIFswLCAxLCAxLCAyLCAzLCA1LCA4LCAxMywgMjFdKVxuICogLy89PiBbWzBdLCBbMSwgMV0sIFsyXSwgWzNdLCBbNV0sIFs4XSwgWzEzXSwgWzIxXV1cbiAqXG4gKiBSLmdyb3VwV2l0aCgoYSwgYikgPT4gYSArIDEgPT09IGIsIFswLCAxLCAxLCAyLCAzLCA1LCA4LCAxMywgMjFdKVxuICogLy89PiBbWzAsIDFdLCBbMSwgMiwgM10sIFs1XSwgWzhdLCBbMTNdLCBbMjFdXVxuICpcbiAqIFIuZ3JvdXBXaXRoKChhLCBiKSA9PiBhICUgMiA9PT0gYiAlIDIsIFswLCAxLCAxLCAyLCAzLCA1LCA4LCAxMywgMjFdKVxuICogLy89PiBbWzBdLCBbMSwgMV0sIFsyXSwgWzMsIDVdLCBbOF0sIFsxMywgMjFdXVxuICpcbiAqIFIuZ3JvdXBXaXRoKFIuZXFCeShpc1Zvd2VsKSwgJ2Flc3Rpb3UnKVxuICogLy89PiBbJ2FlJywgJ3N0JywgJ2lvdSddXG4gKi9cblxuXG52YXIgZ3JvdXBXaXRoID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gKGZuLCBsaXN0KSB7XG4gIHZhciByZXMgPSBbXTtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIHZhciBuZXh0aWR4ID0gaWR4ICsgMTtcbiAgICB3aGlsZSAobmV4dGlkeCA8IGxlbiAmJiBmbihsaXN0W25leHRpZHggLSAxXSwgbGlzdFtuZXh0aWR4XSkpIHtcbiAgICAgIG5leHRpZHggKz0gMTtcbiAgICB9XG4gICAgcmVzLnB1c2gobGlzdC5zbGljZShpZHgsIG5leHRpZHgpKTtcbiAgICBpZHggPSBuZXh0aWR4O1xuICB9XG4gIHJldHVybiByZXM7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZ3JvdXBXaXRoOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBncmVhdGVyIHRoYW4gdGhlIHNlY29uZDsgYGZhbHNlYFxuICogb3RoZXJ3aXNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIE9yZCBhID0+IGEgLT4gYSAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9IGFcbiAqIEBwYXJhbSB7Kn0gYlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBzZWUgUi5sdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuZ3QoMiwgMSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmd0KDIsIDIpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuZ3QoMiwgMyk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5ndCgnYScsICd6Jyk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5ndCgneicsICdhJyk7IC8vPT4gdHJ1ZVxuICovXG5cblxudmFyIGd0ID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gZ3QoYSwgYikge1xuICByZXR1cm4gYSA+IGI7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZ3Q7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGZpcnN0IGFyZ3VtZW50IGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byB0aGUgc2Vjb25kO1xuICogYGZhbHNlYCBvdGhlcndpc2UuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgT3JkIGEgPT4gYSAtPiBhIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gKiBAcGFyYW0ge051bWJlcn0gYlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBzZWUgUi5sdGVcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmd0ZSgyLCAxKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuZ3RlKDIsIDIpOyAvLz0+IHRydWVcbiAqICAgICAgUi5ndGUoMiwgMyk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5ndGUoJ2EnLCAneicpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuZ3RlKCd6JywgJ2EnKTsgLy89PiB0cnVlXG4gKi9cblxuXG52YXIgZ3RlID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gZ3RlKGEsIGIpIHtcbiAgcmV0dXJuIGEgPj0gYjtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBndGU7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfaGFzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2hhcycpO1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBvciBub3QgYW4gb2JqZWN0IGhhcyBhbiBvd24gcHJvcGVydHkgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWVcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC43LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgcyAtPiB7czogeH0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtTdHJpbmd9IHByb3AgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGNoZWNrIGZvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IFdoZXRoZXIgdGhlIHByb3BlcnR5IGV4aXN0cy5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgaGFzTmFtZSA9IFIuaGFzKCduYW1lJyk7XG4gKiAgICAgIGhhc05hbWUoe25hbWU6ICdhbGljZSd9KTsgICAvLz0+IHRydWVcbiAqICAgICAgaGFzTmFtZSh7bmFtZTogJ2JvYid9KTsgICAgIC8vPT4gdHJ1ZVxuICogICAgICBoYXNOYW1lKHt9KTsgICAgICAgICAgICAgICAgLy89PiBmYWxzZVxuICpcbiAqICAgICAgdmFyIHBvaW50ID0ge3g6IDAsIHk6IDB9O1xuICogICAgICB2YXIgcG9pbnRIYXMgPSBSLmhhcyhSLl9fLCBwb2ludCk7XG4gKiAgICAgIHBvaW50SGFzKCd4Jyk7ICAvLz0+IHRydWVcbiAqICAgICAgcG9pbnRIYXMoJ3knKTsgIC8vPT4gdHJ1ZVxuICogICAgICBwb2ludEhhcygneicpOyAgLy89PiBmYWxzZVxuICovXG5cblxudmFyIGhhcyA9IC8qI19fUFVSRV9fKi9fY3VycnkyKF9oYXMpO1xubW9kdWxlLmV4cG9ydHMgPSBoYXM7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3Qgb3IgaXRzIHByb3RvdHlwZSBjaGFpbiBoYXMgYSBwcm9wZXJ0eSB3aXRoXG4gKiB0aGUgc3BlY2lmaWVkIG5hbWVcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC43LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgcyAtPiB7czogeH0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtTdHJpbmd9IHByb3AgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGNoZWNrIGZvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IFdoZXRoZXIgdGhlIHByb3BlcnR5IGV4aXN0cy5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBmdW5jdGlvbiBSZWN0YW5nbGUod2lkdGgsIGhlaWdodCkge1xuICogICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAqICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAqICAgICAgfVxuICogICAgICBSZWN0YW5nbGUucHJvdG90eXBlLmFyZWEgPSBmdW5jdGlvbigpIHtcbiAqICAgICAgICByZXR1cm4gdGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0O1xuICogICAgICB9O1xuICpcbiAqICAgICAgdmFyIHNxdWFyZSA9IG5ldyBSZWN0YW5nbGUoMiwgMik7XG4gKiAgICAgIFIuaGFzSW4oJ3dpZHRoJywgc3F1YXJlKTsgIC8vPT4gdHJ1ZVxuICogICAgICBSLmhhc0luKCdhcmVhJywgc3F1YXJlKTsgIC8vPT4gdHJ1ZVxuICovXG5cblxudmFyIGhhc0luID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gaGFzSW4ocHJvcCwgb2JqKSB7XG4gIHJldHVybiBwcm9wIGluIG9iajtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBoYXNJbjsiLCJ2YXIgbnRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbnRoJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcuIEluIHNvbWUgbGlicmFyaWVzXG4gKiB0aGlzIGZ1bmN0aW9uIGlzIG5hbWVkIGBmaXJzdGAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbYV0gLT4gYSB8IFVuZGVmaW5lZFxuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gbGlzdFxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi50YWlsLCBSLmluaXQsIFIubGFzdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuaGVhZChbJ2ZpJywgJ2ZvJywgJ2Z1bSddKTsgLy89PiAnZmknXG4gKiAgICAgIFIuaGVhZChbXSk7IC8vPT4gdW5kZWZpbmVkXG4gKlxuICogICAgICBSLmhlYWQoJ2FiYycpOyAvLz0+ICdhJ1xuICogICAgICBSLmhlYWQoJycpOyAvLz0+ICcnXG4gKi9cblxuXG52YXIgaGVhZCA9IC8qI19fUFVSRV9fKi9udGgoMCk7XG5tb2R1bGUuZXhwb3J0cyA9IGhlYWQ7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGl0cyBhcmd1bWVudHMgYXJlIGlkZW50aWNhbCwgZmFsc2Ugb3RoZXJ3aXNlLiBWYWx1ZXMgYXJlXG4gKiBpZGVudGljYWwgaWYgdGhleSByZWZlcmVuY2UgdGhlIHNhbWUgbWVtb3J5LiBgTmFOYCBpcyBpZGVudGljYWwgdG8gYE5hTmA7XG4gKiBgMGAgYW5kIGAtMGAgYXJlIG5vdCBpZGVudGljYWwuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTUuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIGEgLT4gYSAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9IGFcbiAqIEBwYXJhbSB7Kn0gYlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbyA9IHt9O1xuICogICAgICBSLmlkZW50aWNhbChvLCBvKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuaWRlbnRpY2FsKDEsIDEpOyAvLz0+IHRydWVcbiAqICAgICAgUi5pZGVudGljYWwoMSwgJzEnKTsgLy89PiBmYWxzZVxuICogICAgICBSLmlkZW50aWNhbChbXSwgW10pOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIuaWRlbnRpY2FsKDAsIC0wKTsgLy89PiBmYWxzZVxuICogICAgICBSLmlkZW50aWNhbChOYU4sIE5hTik7IC8vPT4gdHJ1ZVxuICovXG5cblxudmFyIGlkZW50aWNhbCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGlkZW50aWNhbChhLCBiKSB7XG4gIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgaWYgKGEgPT09IGIpIHtcbiAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgIHJldHVybiBhICE9PSAwIHx8IDEgLyBhID09PSAxIC8gYjtcbiAgfSBlbHNlIHtcbiAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgIHJldHVybiBhICE9PSBhICYmIGIgIT09IGI7XG4gIH1cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBpZGVudGljYWw7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBfaWRlbnRpdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faWRlbnRpdHknKTtcblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgZG9lcyBub3RoaW5nIGJ1dCByZXR1cm4gdGhlIHBhcmFtZXRlciBzdXBwbGllZCB0byBpdC4gR29vZFxuICogYXMgYSBkZWZhdWx0IG9yIHBsYWNlaG9sZGVyIGZ1bmN0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIGEgLT4gYVxuICogQHBhcmFtIHsqfSB4IFRoZSB2YWx1ZSB0byByZXR1cm4uXG4gKiBAcmV0dXJuIHsqfSBUaGUgaW5wdXQgdmFsdWUsIGB4YC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmlkZW50aXR5KDEpOyAvLz0+IDFcbiAqXG4gKiAgICAgIHZhciBvYmogPSB7fTtcbiAqICAgICAgUi5pZGVudGl0eShvYmopID09PSBvYmo7IC8vPT4gdHJ1ZVxuICogQHN5bWIgUi5pZGVudGl0eShhKSA9IGFcbiAqL1xuXG5cbnZhciBpZGVudGl0eSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKF9pZGVudGl0eSk7XG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5OyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG52YXIgY3VycnlOID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY3VycnlOJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBwcm9jZXNzIGVpdGhlciB0aGUgYG9uVHJ1ZWAgb3IgdGhlIGBvbkZhbHNlYFxuICogZnVuY3Rpb24gZGVwZW5kaW5nIHVwb24gdGhlIHJlc3VsdCBvZiB0aGUgYGNvbmRpdGlvbmAgcHJlZGljYXRlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjguMFxuICogQGNhdGVnb3J5IExvZ2ljXG4gKiBAc2lnICgqLi4uIC0+IEJvb2xlYW4pIC0+ICgqLi4uIC0+ICopIC0+ICgqLi4uIC0+ICopIC0+ICgqLi4uIC0+ICopXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb25kaXRpb24gQSBwcmVkaWNhdGUgZnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uVHJ1ZSBBIGZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBgY29uZGl0aW9uYCBldmFsdWF0ZXMgdG8gYSB0cnV0aHkgdmFsdWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkZhbHNlIEEgZnVuY3Rpb24gdG8gaW52b2tlIHdoZW4gdGhlIGBjb25kaXRpb25gIGV2YWx1YXRlcyB0byBhIGZhbHN5IHZhbHVlLlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3IHVuYXJ5IGZ1bmN0aW9uIHRoYXQgd2lsbCBwcm9jZXNzIGVpdGhlciB0aGUgYG9uVHJ1ZWAgb3IgdGhlIGBvbkZhbHNlYFxuICogICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRlcGVuZGluZyB1cG9uIHRoZSByZXN1bHQgb2YgdGhlIGBjb25kaXRpb25gIHByZWRpY2F0ZS5cbiAqIEBzZWUgUi51bmxlc3MsIFIud2hlblxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBpbmNDb3VudCA9IFIuaWZFbHNlKFxuICogICAgICAgIFIuaGFzKCdjb3VudCcpLFxuICogICAgICAgIFIub3ZlcihSLmxlbnNQcm9wKCdjb3VudCcpLCBSLmluYyksXG4gKiAgICAgICAgUi5hc3NvYygnY291bnQnLCAxKVxuICogICAgICApO1xuICogICAgICBpbmNDb3VudCh7fSk7ICAgICAgICAgICAvLz0+IHsgY291bnQ6IDEgfVxuICogICAgICBpbmNDb3VudCh7IGNvdW50OiAxIH0pOyAvLz0+IHsgY291bnQ6IDIgfVxuICovXG5cblxudmFyIGlmRWxzZSA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIGlmRWxzZShjb25kaXRpb24sIG9uVHJ1ZSwgb25GYWxzZSkge1xuICByZXR1cm4gY3VycnlOKE1hdGgubWF4KGNvbmRpdGlvbi5sZW5ndGgsIG9uVHJ1ZS5sZW5ndGgsIG9uRmFsc2UubGVuZ3RoKSwgZnVuY3Rpb24gX2lmRWxzZSgpIHtcbiAgICByZXR1cm4gY29uZGl0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgPyBvblRydWUuYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IG9uRmFsc2UuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gaWZFbHNlOyIsInZhciBhZGQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hZGQnKTtcblxuLyoqXG4gKiBJbmNyZW1lbnRzIGl0cyBhcmd1bWVudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC45LjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IG4gKyAxXG4gKiBAc2VlIFIuZGVjXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5pbmMoNDIpOyAvLz0+IDQzXG4gKi9cblxuXG52YXIgaW5jID0gLyojX19QVVJFX18qL2FkZCgxKTtcbm1vZHVsZS5leHBvcnRzID0gaW5jOyIsIm1vZHVsZS5leHBvcnRzID0ge307XG5tb2R1bGUuZXhwb3J0cy5GID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vRicpO1xubW9kdWxlLmV4cG9ydHMuVCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL1QnKTtcbm1vZHVsZS5leHBvcnRzLl9fID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX18nKTtcbm1vZHVsZS5leHBvcnRzLmFkZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2FkZCcpO1xubW9kdWxlLmV4cG9ydHMuYWRkSW5kZXggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hZGRJbmRleCcpO1xubW9kdWxlLmV4cG9ydHMuYWRqdXN0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYWRqdXN0Jyk7XG5tb2R1bGUuZXhwb3J0cy5hbGwgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hbGwnKTtcbm1vZHVsZS5leHBvcnRzLmFsbFBhc3MgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hbGxQYXNzJyk7XG5tb2R1bGUuZXhwb3J0cy5hbHdheXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hbHdheXMnKTtcbm1vZHVsZS5leHBvcnRzLmFuZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2FuZCcpO1xubW9kdWxlLmV4cG9ydHMuYW55ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYW55Jyk7XG5tb2R1bGUuZXhwb3J0cy5hbnlQYXNzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYW55UGFzcycpO1xubW9kdWxlLmV4cG9ydHMuYXAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hcCcpO1xubW9kdWxlLmV4cG9ydHMuYXBlcnR1cmUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hcGVydHVyZScpO1xubW9kdWxlLmV4cG9ydHMuYXBwZW5kID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYXBwZW5kJyk7XG5tb2R1bGUuZXhwb3J0cy5hcHBseSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2FwcGx5Jyk7XG5tb2R1bGUuZXhwb3J0cy5hcHBseVNwZWMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hcHBseVNwZWMnKTtcbm1vZHVsZS5leHBvcnRzLmFwcGx5VG8gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hcHBseVRvJyk7XG5tb2R1bGUuZXhwb3J0cy5hc2NlbmQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hc2NlbmQnKTtcbm1vZHVsZS5leHBvcnRzLmFzc29jID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYXNzb2MnKTtcbm1vZHVsZS5leHBvcnRzLmFzc29jUGF0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2Fzc29jUGF0aCcpO1xubW9kdWxlLmV4cG9ydHMuYmluYXJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYmluYXJ5Jyk7XG5tb2R1bGUuZXhwb3J0cy5iaW5kID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYmluZCcpO1xubW9kdWxlLmV4cG9ydHMuYm90aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2JvdGgnKTtcbm1vZHVsZS5leHBvcnRzLmNhbGwgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jYWxsJyk7XG5tb2R1bGUuZXhwb3J0cy5jaGFpbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2NoYWluJyk7XG5tb2R1bGUuZXhwb3J0cy5jbGFtcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2NsYW1wJyk7XG5tb2R1bGUuZXhwb3J0cy5jbG9uZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2Nsb25lJyk7XG5tb2R1bGUuZXhwb3J0cy5jb21wYXJhdG9yID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY29tcGFyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMuY29tcGxlbWVudCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2NvbXBsZW1lbnQnKTtcbm1vZHVsZS5leHBvcnRzLmNvbXBvc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jb21wb3NlJyk7XG5tb2R1bGUuZXhwb3J0cy5jb21wb3NlSyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2NvbXBvc2VLJyk7XG5tb2R1bGUuZXhwb3J0cy5jb21wb3NlUCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2NvbXBvc2VQJyk7XG5tb2R1bGUuZXhwb3J0cy5jb25jYXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jb25jYXQnKTtcbm1vZHVsZS5leHBvcnRzLmNvbmQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jb25kJyk7XG5tb2R1bGUuZXhwb3J0cy5jb25zdHJ1Y3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jb25zdHJ1Y3QnKTtcbm1vZHVsZS5leHBvcnRzLmNvbnN0cnVjdE4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jb25zdHJ1Y3ROJyk7XG5tb2R1bGUuZXhwb3J0cy5jb250YWlucyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2NvbnRhaW5zJyk7XG5tb2R1bGUuZXhwb3J0cy5jb252ZXJnZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2NvbnZlcmdlJyk7XG5tb2R1bGUuZXhwb3J0cy5jb3VudEJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY291bnRCeScpO1xubW9kdWxlLmV4cG9ydHMuY3VycnkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jdXJyeScpO1xubW9kdWxlLmV4cG9ydHMuY3VycnlOID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY3VycnlOJyk7XG5tb2R1bGUuZXhwb3J0cy5kZWMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9kZWMnKTtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHRUbyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2RlZmF1bHRUbycpO1xubW9kdWxlLmV4cG9ydHMuZGVzY2VuZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2Rlc2NlbmQnKTtcbm1vZHVsZS5leHBvcnRzLmRpZmZlcmVuY2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9kaWZmZXJlbmNlJyk7XG5tb2R1bGUuZXhwb3J0cy5kaWZmZXJlbmNlV2l0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2RpZmZlcmVuY2VXaXRoJyk7XG5tb2R1bGUuZXhwb3J0cy5kaXNzb2MgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9kaXNzb2MnKTtcbm1vZHVsZS5leHBvcnRzLmRpc3NvY1BhdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9kaXNzb2NQYXRoJyk7XG5tb2R1bGUuZXhwb3J0cy5kaXZpZGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9kaXZpZGUnKTtcbm1vZHVsZS5leHBvcnRzLmRyb3AgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9kcm9wJyk7XG5tb2R1bGUuZXhwb3J0cy5kcm9wTGFzdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2Ryb3BMYXN0Jyk7XG5tb2R1bGUuZXhwb3J0cy5kcm9wTGFzdFdoaWxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZHJvcExhc3RXaGlsZScpO1xubW9kdWxlLmV4cG9ydHMuZHJvcFJlcGVhdHMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9kcm9wUmVwZWF0cycpO1xubW9kdWxlLmV4cG9ydHMuZHJvcFJlcGVhdHNXaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZHJvcFJlcGVhdHNXaXRoJyk7XG5tb2R1bGUuZXhwb3J0cy5kcm9wV2hpbGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9kcm9wV2hpbGUnKTtcbm1vZHVsZS5leHBvcnRzLmVpdGhlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2VpdGhlcicpO1xubW9kdWxlLmV4cG9ydHMuZW1wdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9lbXB0eScpO1xubW9kdWxlLmV4cG9ydHMuZW5kc1dpdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9lbmRzV2l0aCcpO1xubW9kdWxlLmV4cG9ydHMuZXFCeSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2VxQnknKTtcbm1vZHVsZS5leHBvcnRzLmVxUHJvcHMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9lcVByb3BzJyk7XG5tb2R1bGUuZXhwb3J0cy5lcXVhbHMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9lcXVhbHMnKTtcbm1vZHVsZS5leHBvcnRzLmV2b2x2ZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2V2b2x2ZScpO1xubW9kdWxlLmV4cG9ydHMuZmlsdGVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZmlsdGVyJyk7XG5tb2R1bGUuZXhwb3J0cy5maW5kID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZmluZCcpO1xubW9kdWxlLmV4cG9ydHMuZmluZEluZGV4ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZmluZEluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cy5maW5kTGFzdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ZpbmRMYXN0Jyk7XG5tb2R1bGUuZXhwb3J0cy5maW5kTGFzdEluZGV4ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZmluZExhc3RJbmRleCcpO1xubW9kdWxlLmV4cG9ydHMuZmxhdHRlbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ZsYXR0ZW4nKTtcbm1vZHVsZS5leHBvcnRzLmZsaXAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9mbGlwJyk7XG5tb2R1bGUuZXhwb3J0cy5mb3JFYWNoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZm9yRWFjaCcpO1xubW9kdWxlLmV4cG9ydHMuZm9yRWFjaE9iakluZGV4ZWQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9mb3JFYWNoT2JqSW5kZXhlZCcpO1xubW9kdWxlLmV4cG9ydHMuZnJvbVBhaXJzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZnJvbVBhaXJzJyk7XG5tb2R1bGUuZXhwb3J0cy5ncm91cEJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZ3JvdXBCeScpO1xubW9kdWxlLmV4cG9ydHMuZ3JvdXBXaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZ3JvdXBXaXRoJyk7XG5tb2R1bGUuZXhwb3J0cy5ndCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2d0Jyk7XG5tb2R1bGUuZXhwb3J0cy5ndGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9ndGUnKTtcbm1vZHVsZS5leHBvcnRzLmhhcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2hhcycpO1xubW9kdWxlLmV4cG9ydHMuaGFzSW4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9oYXNJbicpO1xubW9kdWxlLmV4cG9ydHMuaGVhZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2hlYWQnKTtcbm1vZHVsZS5leHBvcnRzLmlkZW50aWNhbCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2lkZW50aWNhbCcpO1xubW9kdWxlLmV4cG9ydHMuaWRlbnRpdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pZGVudGl0eScpO1xubW9kdWxlLmV4cG9ydHMuaWZFbHNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaWZFbHNlJyk7XG5tb2R1bGUuZXhwb3J0cy5pbmMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbmMnKTtcbm1vZHVsZS5leHBvcnRzLmluZGV4QnkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbmRleEJ5Jyk7XG5tb2R1bGUuZXhwb3J0cy5pbmRleE9mID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW5kZXhPZicpO1xubW9kdWxlLmV4cG9ydHMuaW5pdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2luaXQnKTtcbm1vZHVsZS5leHBvcnRzLmlubmVySm9pbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2lubmVySm9pbicpO1xubW9kdWxlLmV4cG9ydHMuaW5zZXJ0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW5zZXJ0Jyk7XG5tb2R1bGUuZXhwb3J0cy5pbnNlcnRBbGwgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnNlcnRBbGwnKTtcbm1vZHVsZS5leHBvcnRzLmludGVyc2VjdGlvbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVyc2VjdGlvbicpO1xubW9kdWxlLmV4cG9ydHMuaW50ZXJzcGVyc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcnNwZXJzZScpO1xubW9kdWxlLmV4cG9ydHMuaW50byA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludG8nKTtcbm1vZHVsZS5leHBvcnRzLmludmVydCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludmVydCcpO1xubW9kdWxlLmV4cG9ydHMuaW52ZXJ0T2JqID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW52ZXJ0T2JqJyk7XG5tb2R1bGUuZXhwb3J0cy5pbnZva2VyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW52b2tlcicpO1xubW9kdWxlLmV4cG9ydHMuaXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pcycpO1xubW9kdWxlLmV4cG9ydHMuaXNFbXB0eSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2lzRW1wdHknKTtcbm1vZHVsZS5leHBvcnRzLmlzTmlsID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaXNOaWwnKTtcbm1vZHVsZS5leHBvcnRzLmpvaW4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9qb2luJyk7XG5tb2R1bGUuZXhwb3J0cy5qdXh0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vanV4dCcpO1xubW9kdWxlLmV4cG9ydHMua2V5cyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2tleXMnKTtcbm1vZHVsZS5leHBvcnRzLmtleXNJbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2tleXNJbicpO1xubW9kdWxlLmV4cG9ydHMubGFzdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2xhc3QnKTtcbm1vZHVsZS5leHBvcnRzLmxhc3RJbmRleE9mID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbGFzdEluZGV4T2YnKTtcbm1vZHVsZS5leHBvcnRzLmxlbmd0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2xlbmd0aCcpO1xubW9kdWxlLmV4cG9ydHMubGVucyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2xlbnMnKTtcbm1vZHVsZS5leHBvcnRzLmxlbnNJbmRleCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2xlbnNJbmRleCcpO1xubW9kdWxlLmV4cG9ydHMubGVuc1BhdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9sZW5zUGF0aCcpO1xubW9kdWxlLmV4cG9ydHMubGVuc1Byb3AgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9sZW5zUHJvcCcpO1xubW9kdWxlLmV4cG9ydHMubGlmdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2xpZnQnKTtcbm1vZHVsZS5leHBvcnRzLmxpZnROID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbGlmdE4nKTtcbm1vZHVsZS5leHBvcnRzLmx0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbHQnKTtcbm1vZHVsZS5leHBvcnRzLmx0ZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2x0ZScpO1xubW9kdWxlLmV4cG9ydHMubWFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWFwJyk7XG5tb2R1bGUuZXhwb3J0cy5tYXBBY2N1bSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21hcEFjY3VtJyk7XG5tb2R1bGUuZXhwb3J0cy5tYXBBY2N1bVJpZ2h0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWFwQWNjdW1SaWdodCcpO1xubW9kdWxlLmV4cG9ydHMubWFwT2JqSW5kZXhlZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21hcE9iakluZGV4ZWQnKTtcbm1vZHVsZS5leHBvcnRzLm1hdGNoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWF0Y2gnKTtcbm1vZHVsZS5leHBvcnRzLm1hdGhNb2QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tYXRoTW9kJyk7XG5tb2R1bGUuZXhwb3J0cy5tYXggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tYXgnKTtcbm1vZHVsZS5leHBvcnRzLm1heEJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWF4QnknKTtcbm1vZHVsZS5leHBvcnRzLm1lYW4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tZWFuJyk7XG5tb2R1bGUuZXhwb3J0cy5tZWRpYW4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tZWRpYW4nKTtcbm1vZHVsZS5leHBvcnRzLm1lbW9pemUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tZW1vaXplJyk7XG5tb2R1bGUuZXhwb3J0cy5tZW1vaXplV2l0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21lbW9pemVXaXRoJyk7XG5tb2R1bGUuZXhwb3J0cy5tZXJnZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21lcmdlJyk7XG5tb2R1bGUuZXhwb3J0cy5tZXJnZUFsbCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21lcmdlQWxsJyk7XG5tb2R1bGUuZXhwb3J0cy5tZXJnZURlZXBMZWZ0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWVyZ2VEZWVwTGVmdCcpO1xubW9kdWxlLmV4cG9ydHMubWVyZ2VEZWVwUmlnaHQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tZXJnZURlZXBSaWdodCcpO1xubW9kdWxlLmV4cG9ydHMubWVyZ2VEZWVwV2l0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21lcmdlRGVlcFdpdGgnKTtcbm1vZHVsZS5leHBvcnRzLm1lcmdlRGVlcFdpdGhLZXkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tZXJnZURlZXBXaXRoS2V5Jyk7XG5tb2R1bGUuZXhwb3J0cy5tZXJnZVdpdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tZXJnZVdpdGgnKTtcbm1vZHVsZS5leHBvcnRzLm1lcmdlV2l0aEtleSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21lcmdlV2l0aEtleScpO1xubW9kdWxlLmV4cG9ydHMubWluID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWluJyk7XG5tb2R1bGUuZXhwb3J0cy5taW5CeSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21pbkJ5Jyk7XG5tb2R1bGUuZXhwb3J0cy5tb2R1bG8gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tb2R1bG8nKTtcbm1vZHVsZS5leHBvcnRzLm11bHRpcGx5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbXVsdGlwbHknKTtcbm1vZHVsZS5leHBvcnRzLm5BcnkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9uQXJ5Jyk7XG5tb2R1bGUuZXhwb3J0cy5uZWdhdGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9uZWdhdGUnKTtcbm1vZHVsZS5leHBvcnRzLm5vbmUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9ub25lJyk7XG5tb2R1bGUuZXhwb3J0cy5ub3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9ub3QnKTtcbm1vZHVsZS5leHBvcnRzLm50aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL250aCcpO1xubW9kdWxlLmV4cG9ydHMubnRoQXJnID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbnRoQXJnJyk7XG5tb2R1bGUuZXhwb3J0cy5vID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbycpO1xubW9kdWxlLmV4cG9ydHMub2JqT2YgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9vYmpPZicpO1xubW9kdWxlLmV4cG9ydHMub2YgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9vZicpO1xubW9kdWxlLmV4cG9ydHMub21pdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL29taXQnKTtcbm1vZHVsZS5leHBvcnRzLm9uY2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9vbmNlJyk7XG5tb2R1bGUuZXhwb3J0cy5vciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL29yJyk7XG5tb2R1bGUuZXhwb3J0cy5vdmVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vb3ZlcicpO1xubW9kdWxlLmV4cG9ydHMucGFpciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3BhaXInKTtcbm1vZHVsZS5leHBvcnRzLnBhcnRpYWwgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wYXJ0aWFsJyk7XG5tb2R1bGUuZXhwb3J0cy5wYXJ0aWFsUmlnaHQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wYXJ0aWFsUmlnaHQnKTtcbm1vZHVsZS5leHBvcnRzLnBhcnRpdGlvbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3BhcnRpdGlvbicpO1xubW9kdWxlLmV4cG9ydHMucGF0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3BhdGgnKTtcbm1vZHVsZS5leHBvcnRzLnBhdGhFcSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3BhdGhFcScpO1xubW9kdWxlLmV4cG9ydHMucGF0aE9yID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcGF0aE9yJyk7XG5tb2R1bGUuZXhwb3J0cy5wYXRoU2F0aXNmaWVzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcGF0aFNhdGlzZmllcycpO1xubW9kdWxlLmV4cG9ydHMucGljayA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3BpY2snKTtcbm1vZHVsZS5leHBvcnRzLnBpY2tBbGwgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9waWNrQWxsJyk7XG5tb2R1bGUuZXhwb3J0cy5waWNrQnkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9waWNrQnknKTtcbm1vZHVsZS5leHBvcnRzLnBpcGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9waXBlJyk7XG5tb2R1bGUuZXhwb3J0cy5waXBlSyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3BpcGVLJyk7XG5tb2R1bGUuZXhwb3J0cy5waXBlUCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3BpcGVQJyk7XG5tb2R1bGUuZXhwb3J0cy5wbHVjayA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3BsdWNrJyk7XG5tb2R1bGUuZXhwb3J0cy5wcmVwZW5kID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcHJlcGVuZCcpO1xubW9kdWxlLmV4cG9ydHMucHJvZHVjdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3Byb2R1Y3QnKTtcbm1vZHVsZS5leHBvcnRzLnByb2plY3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wcm9qZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cy5wcm9wID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcHJvcCcpO1xubW9kdWxlLmV4cG9ydHMucHJvcEVxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcHJvcEVxJyk7XG5tb2R1bGUuZXhwb3J0cy5wcm9wSXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wcm9wSXMnKTtcbm1vZHVsZS5leHBvcnRzLnByb3BPciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3Byb3BPcicpO1xubW9kdWxlLmV4cG9ydHMucHJvcFNhdGlzZmllcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3Byb3BTYXRpc2ZpZXMnKTtcbm1vZHVsZS5leHBvcnRzLnByb3BzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcHJvcHMnKTtcbm1vZHVsZS5leHBvcnRzLnJhbmdlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmFuZ2UnKTtcbm1vZHVsZS5leHBvcnRzLnJlZHVjZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JlZHVjZScpO1xubW9kdWxlLmV4cG9ydHMucmVkdWNlQnkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZWR1Y2VCeScpO1xubW9kdWxlLmV4cG9ydHMucmVkdWNlUmlnaHQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZWR1Y2VSaWdodCcpO1xubW9kdWxlLmV4cG9ydHMucmVkdWNlV2hpbGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZWR1Y2VXaGlsZScpO1xubW9kdWxlLmV4cG9ydHMucmVkdWNlZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JlZHVjZWQnKTtcbm1vZHVsZS5leHBvcnRzLnJlamVjdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JlamVjdCcpO1xubW9kdWxlLmV4cG9ydHMucmVtb3ZlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmVtb3ZlJyk7XG5tb2R1bGUuZXhwb3J0cy5yZXBlYXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZXBlYXQnKTtcbm1vZHVsZS5leHBvcnRzLnJlcGxhY2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZXBsYWNlJyk7XG5tb2R1bGUuZXhwb3J0cy5yZXZlcnNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmV2ZXJzZScpO1xubW9kdWxlLmV4cG9ydHMuc2NhbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3NjYW4nKTtcbm1vZHVsZS5leHBvcnRzLnNlcXVlbmNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc2VxdWVuY2UnKTtcbm1vZHVsZS5leHBvcnRzLnNldCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3NldCcpO1xubW9kdWxlLmV4cG9ydHMuc2xpY2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zbGljZScpO1xubW9kdWxlLmV4cG9ydHMuc29ydCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3NvcnQnKTtcbm1vZHVsZS5leHBvcnRzLnNvcnRCeSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3NvcnRCeScpO1xubW9kdWxlLmV4cG9ydHMuc29ydFdpdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zb3J0V2l0aCcpO1xubW9kdWxlLmV4cG9ydHMuc3BsaXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zcGxpdCcpO1xubW9kdWxlLmV4cG9ydHMuc3BsaXRBdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3NwbGl0QXQnKTtcbm1vZHVsZS5leHBvcnRzLnNwbGl0RXZlcnkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zcGxpdEV2ZXJ5Jyk7XG5tb2R1bGUuZXhwb3J0cy5zcGxpdFdoZW4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zcGxpdFdoZW4nKTtcbm1vZHVsZS5leHBvcnRzLnN0YXJ0c1dpdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zdGFydHNXaXRoJyk7XG5tb2R1bGUuZXhwb3J0cy5zdWJ0cmFjdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3N1YnRyYWN0Jyk7XG5tb2R1bGUuZXhwb3J0cy5zdW0gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zdW0nKTtcbm1vZHVsZS5leHBvcnRzLnN5bW1ldHJpY0RpZmZlcmVuY2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zeW1tZXRyaWNEaWZmZXJlbmNlJyk7XG5tb2R1bGUuZXhwb3J0cy5zeW1tZXRyaWNEaWZmZXJlbmNlV2l0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3N5bW1ldHJpY0RpZmZlcmVuY2VXaXRoJyk7XG5tb2R1bGUuZXhwb3J0cy50YWlsID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdGFpbCcpO1xubW9kdWxlLmV4cG9ydHMudGFrZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3Rha2UnKTtcbm1vZHVsZS5leHBvcnRzLnRha2VMYXN0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdGFrZUxhc3QnKTtcbm1vZHVsZS5leHBvcnRzLnRha2VMYXN0V2hpbGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi90YWtlTGFzdFdoaWxlJyk7XG5tb2R1bGUuZXhwb3J0cy50YWtlV2hpbGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi90YWtlV2hpbGUnKTtcbm1vZHVsZS5leHBvcnRzLnRhcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3RhcCcpO1xubW9kdWxlLmV4cG9ydHMudGVzdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3Rlc3QnKTtcbm1vZHVsZS5leHBvcnRzLnRpbWVzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdGltZXMnKTtcbm1vZHVsZS5leHBvcnRzLnRvTG93ZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi90b0xvd2VyJyk7XG5tb2R1bGUuZXhwb3J0cy50b1BhaXJzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdG9QYWlycycpO1xubW9kdWxlLmV4cG9ydHMudG9QYWlyc0luID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdG9QYWlyc0luJyk7XG5tb2R1bGUuZXhwb3J0cy50b1N0cmluZyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3RvU3RyaW5nJyk7XG5tb2R1bGUuZXhwb3J0cy50b1VwcGVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdG9VcHBlcicpO1xubW9kdWxlLmV4cG9ydHMudHJhbnNkdWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdHJhbnNkdWNlJyk7XG5tb2R1bGUuZXhwb3J0cy50cmFuc3Bvc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi90cmFuc3Bvc2UnKTtcbm1vZHVsZS5leHBvcnRzLnRyYXZlcnNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdHJhdmVyc2UnKTtcbm1vZHVsZS5leHBvcnRzLnRyaW0gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi90cmltJyk7XG5tb2R1bGUuZXhwb3J0cy50cnlDYXRjaCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3RyeUNhdGNoJyk7XG5tb2R1bGUuZXhwb3J0cy50eXBlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdHlwZScpO1xubW9kdWxlLmV4cG9ydHMudW5hcHBseSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3VuYXBwbHknKTtcbm1vZHVsZS5leHBvcnRzLnVuYXJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdW5hcnknKTtcbm1vZHVsZS5leHBvcnRzLnVuY3VycnlOID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdW5jdXJyeU4nKTtcbm1vZHVsZS5leHBvcnRzLnVuZm9sZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3VuZm9sZCcpO1xubW9kdWxlLmV4cG9ydHMudW5pb24gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi91bmlvbicpO1xubW9kdWxlLmV4cG9ydHMudW5pb25XaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdW5pb25XaXRoJyk7XG5tb2R1bGUuZXhwb3J0cy51bmlxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdW5pcScpO1xubW9kdWxlLmV4cG9ydHMudW5pcUJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdW5pcUJ5Jyk7XG5tb2R1bGUuZXhwb3J0cy51bmlxV2l0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3VuaXFXaXRoJyk7XG5tb2R1bGUuZXhwb3J0cy51bmxlc3MgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi91bmxlc3MnKTtcbm1vZHVsZS5leHBvcnRzLnVubmVzdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3VubmVzdCcpO1xubW9kdWxlLmV4cG9ydHMudW50aWwgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi91bnRpbCcpO1xubW9kdWxlLmV4cG9ydHMudXBkYXRlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdXBkYXRlJyk7XG5tb2R1bGUuZXhwb3J0cy51c2VXaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdXNlV2l0aCcpO1xubW9kdWxlLmV4cG9ydHMudmFsdWVzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdmFsdWVzJyk7XG5tb2R1bGUuZXhwb3J0cy52YWx1ZXNJbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3ZhbHVlc0luJyk7XG5tb2R1bGUuZXhwb3J0cy52aWV3ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdmlldycpO1xubW9kdWxlLmV4cG9ydHMud2hlbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3doZW4nKTtcbm1vZHVsZS5leHBvcnRzLndoZXJlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vd2hlcmUnKTtcbm1vZHVsZS5leHBvcnRzLndoZXJlRXEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi93aGVyZUVxJyk7XG5tb2R1bGUuZXhwb3J0cy53aXRob3V0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vd2l0aG91dCcpO1xubW9kdWxlLmV4cG9ydHMueHByb2QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi94cHJvZCcpO1xubW9kdWxlLmV4cG9ydHMuemlwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vemlwJyk7XG5tb2R1bGUuZXhwb3J0cy56aXBPYmogPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi96aXBPYmonKTtcbm1vZHVsZS5leHBvcnRzLnppcFdpdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi96aXBXaXRoJyk7IiwidmFyIHJlZHVjZUJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmVkdWNlQnknKTtcblxuLyoqXG4gKiBHaXZlbiBhIGZ1bmN0aW9uIHRoYXQgZ2VuZXJhdGVzIGEga2V5LCB0dXJucyBhIGxpc3Qgb2Ygb2JqZWN0cyBpbnRvIGFuXG4gKiBvYmplY3QgaW5kZXhpbmcgdGhlIG9iamVjdHMgYnkgdGhlIGdpdmVuIGtleS4gTm90ZSB0aGF0IGlmIG11bHRpcGxlXG4gKiBvYmplY3RzIGdlbmVyYXRlIHRoZSBzYW1lIHZhbHVlIGZvciB0aGUgaW5kZXhpbmcga2V5IG9ubHkgdGhlIGxhc3QgdmFsdWVcbiAqIHdpbGwgYmUgaW5jbHVkZWQgaW4gdGhlIGdlbmVyYXRlZCBvYmplY3QuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE5LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhIC0+IFN0cmluZykgLT4gW3trOiB2fV0gLT4ge2s6IHtrOiB2fX1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIDo6IGEgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgb2Ygb2JqZWN0cyB0byBpbmRleFxuICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3QgaW5kZXhpbmcgZWFjaCBhcnJheSBlbGVtZW50IGJ5IHRoZSBnaXZlbiBwcm9wZXJ0eS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbGlzdCA9IFt7aWQ6ICd4eXonLCB0aXRsZTogJ0EnfSwge2lkOiAnYWJjJywgdGl0bGU6ICdCJ31dO1xuICogICAgICBSLmluZGV4QnkoUi5wcm9wKCdpZCcpLCBsaXN0KTtcbiAqICAgICAgLy89PiB7YWJjOiB7aWQ6ICdhYmMnLCB0aXRsZTogJ0InfSwgeHl6OiB7aWQ6ICd4eXonLCB0aXRsZTogJ0EnfX1cbiAqL1xuXG5cbnZhciBpbmRleEJ5ID0gLyojX19QVVJFX18qL3JlZHVjZUJ5KGZ1bmN0aW9uIChhY2MsIGVsZW0pIHtcbiAgcmV0dXJuIGVsZW07XG59LCBudWxsKTtcbm1vZHVsZS5leHBvcnRzID0gaW5kZXhCeTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9pbmRleE9mID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2luZGV4T2YnKTtcblxudmFyIF9pc0FycmF5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2lzQXJyYXknKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBhbiBpdGVtIGluIGFuIGFycmF5LCBvciAtMVxuICogaWYgdGhlIGl0ZW0gaXMgbm90IGluY2x1ZGVkIGluIHRoZSBhcnJheS4gW2BSLmVxdWFsc2BdKCNlcXVhbHMpIGlzIHVzZWQgdG9cbiAqIGRldGVybWluZSBlcXVhbGl0eS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIGEgLT4gW2FdIC0+IE51bWJlclxuICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIGl0ZW0gdG8gZmluZC5cbiAqIEBwYXJhbSB7QXJyYXl9IHhzIFRoZSBhcnJheSB0byBzZWFyY2ggaW4uXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IHRoZSBpbmRleCBvZiB0aGUgdGFyZ2V0LCBvciAtMSBpZiB0aGUgdGFyZ2V0IGlzIG5vdCBmb3VuZC5cbiAqIEBzZWUgUi5sYXN0SW5kZXhPZlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuaW5kZXhPZigzLCBbMSwyLDMsNF0pOyAvLz0+IDJcbiAqICAgICAgUi5pbmRleE9mKDEwLCBbMSwyLDMsNF0pOyAvLz0+IC0xXG4gKi9cblxuXG52YXIgaW5kZXhPZiA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGluZGV4T2YodGFyZ2V0LCB4cykge1xuICByZXR1cm4gdHlwZW9mIHhzLmluZGV4T2YgPT09ICdmdW5jdGlvbicgJiYgIV9pc0FycmF5KHhzKSA/IHhzLmluZGV4T2YodGFyZ2V0KSA6IF9pbmRleE9mKHhzLCB0YXJnZXQsIDApO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGluZGV4T2Y7IiwidmFyIHNsaWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc2xpY2UnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGFsbCBidXQgdGhlIGxhc3QgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbYV0gLT4gW2FdXG4gKiBAc2lnIFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7Kn0gbGlzdFxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi5sYXN0LCBSLmhlYWQsIFIudGFpbFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuaW5pdChbMSwgMiwgM10pOyAgLy89PiBbMSwgMl1cbiAqICAgICAgUi5pbml0KFsxLCAyXSk7ICAgICAvLz0+IFsxXVxuICogICAgICBSLmluaXQoWzFdKTsgICAgICAgIC8vPT4gW11cbiAqICAgICAgUi5pbml0KFtdKTsgICAgICAgICAvLz0+IFtdXG4gKlxuICogICAgICBSLmluaXQoJ2FiYycpOyAgLy89PiAnYWInXG4gKiAgICAgIFIuaW5pdCgnYWInKTsgICAvLz0+ICdhJ1xuICogICAgICBSLmluaXQoJ2EnKTsgICAgLy89PiAnJ1xuICogICAgICBSLmluaXQoJycpOyAgICAgLy89PiAnJ1xuICovXG5cblxudmFyIGluaXQgPSAvKiNfX1BVUkVfXyovc2xpY2UoMCwgLTEpO1xubW9kdWxlLmV4cG9ydHMgPSBpbml0OyIsInZhciBfY29udGFpbnNXaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbnRhaW5zV2l0aCcpO1xuXG52YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxudmFyIF9maWx0ZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZmlsdGVyJyk7XG5cbi8qKlxuICogVGFrZXMgYSBwcmVkaWNhdGUgYHByZWRgLCBhIGxpc3QgYHhzYCwgYW5kIGEgbGlzdCBgeXNgLCBhbmQgcmV0dXJucyBhIGxpc3RcbiAqIGB4cydgIGNvbXByaXNpbmcgZWFjaCBvZiB0aGUgZWxlbWVudHMgb2YgYHhzYCB3aGljaCBpcyBlcXVhbCB0byBvbmUgb3IgbW9yZVxuICogZWxlbWVudHMgb2YgYHlzYCBhY2NvcmRpbmcgdG8gYHByZWRgLlxuICpcbiAqIGBwcmVkYCBtdXN0IGJlIGEgYmluYXJ5IGZ1bmN0aW9uIGV4cGVjdGluZyBhbiBlbGVtZW50IGZyb20gZWFjaCBsaXN0LlxuICpcbiAqIGB4c2AsIGB5c2AsIGFuZCBgeHMnYCBhcmUgdHJlYXRlZCBhcyBzZXRzLCBzZW1hbnRpY2FsbHksIHNvIG9yZGVyaW5nIHNob3VsZFxuICogbm90IGJlIHNpZ25pZmljYW50LCBidXQgc2luY2UgYHhzJ2AgaXMgb3JkZXJlZCB0aGUgaW1wbGVtZW50YXRpb24gZ3VhcmFudGVlc1xuICogdGhhdCBpdHMgdmFsdWVzIGFyZSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGV5IGFwcGVhciBpbiBgeHNgLiBEdXBsaWNhdGVzIGFyZVxuICogbm90IHJlbW92ZWQsIHNvIGB4cydgIG1heSBjb250YWluIGR1cGxpY2F0ZXMgaWYgYHhzYCBjb250YWlucyBkdXBsaWNhdGVzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjI0LjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyAoKGEsIGIpIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBbYl0gLT4gW2FdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkXG4gKiBAcGFyYW0ge0FycmF5fSB4c1xuICogQHBhcmFtIHtBcnJheX0geXNcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQHNlZSBSLmludGVyc2VjdGlvblxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuaW5uZXJKb2luKFxuICogICAgICAgIChyZWNvcmQsIGlkKSA9PiByZWNvcmQuaWQgPT09IGlkLFxuICogICAgICAgIFt7aWQ6IDgyNCwgbmFtZTogJ1JpY2hpZSBGdXJheSd9LFxuICogICAgICAgICB7aWQ6IDk1NiwgbmFtZTogJ0Rld2V5IE1hcnRpbid9LFxuICogICAgICAgICB7aWQ6IDMxMywgbmFtZTogJ0JydWNlIFBhbG1lcid9LFxuICogICAgICAgICB7aWQ6IDQ1NiwgbmFtZTogJ1N0ZXBoZW4gU3RpbGxzJ30sXG4gKiAgICAgICAgIHtpZDogMTc3LCBuYW1lOiAnTmVpbCBZb3VuZyd9XSxcbiAqICAgICAgICBbMTc3LCA0NTYsIDk5OV1cbiAqICAgICAgKTtcbiAqICAgICAgLy89PiBbe2lkOiA0NTYsIG5hbWU6ICdTdGVwaGVuIFN0aWxscyd9LCB7aWQ6IDE3NywgbmFtZTogJ05laWwgWW91bmcnfV1cbiAqL1xuXG5cbnZhciBpbm5lckpvaW4gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBpbm5lckpvaW4ocHJlZCwgeHMsIHlzKSB7XG4gIHJldHVybiBfZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIF9jb250YWluc1dpdGgocHJlZCwgeCwgeXMpO1xuICB9LCB4cyk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gaW5uZXJKb2luOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG4vKipcbiAqIEluc2VydHMgdGhlIHN1cHBsaWVkIGVsZW1lbnQgaW50byB0aGUgbGlzdCwgYXQgdGhlIHNwZWNpZmllZCBgaW5kZXhgLiBfTm90ZSB0aGF0XG5cbiAqIHRoaXMgaXMgbm90IGRlc3RydWN0aXZlXzogaXQgcmV0dXJucyBhIGNvcHkgb2YgdGhlIGxpc3Qgd2l0aCB0aGUgY2hhbmdlcy5cbiAqIDxzbWFsbD5ObyBsaXN0cyBoYXZlIGJlZW4gaGFybWVkIGluIHRoZSBhcHBsaWNhdGlvbiBvZiB0aGlzIGZ1bmN0aW9uLjwvc21hbGw+XG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMi4yXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gYSAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIHBvc2l0aW9uIHRvIGluc2VydCB0aGUgZWxlbWVudFxuICogQHBhcmFtIHsqfSBlbHQgVGhlIGVsZW1lbnQgdG8gaW5zZXJ0IGludG8gdGhlIEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGluc2VydCBpbnRvXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgQXJyYXkgd2l0aCBgZWx0YCBpbnNlcnRlZCBhdCBgaW5kZXhgLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuaW5zZXJ0KDIsICd4JywgWzEsMiwzLDRdKTsgLy89PiBbMSwyLCd4JywzLDRdXG4gKi9cblxuXG52YXIgaW5zZXJ0ID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gaW5zZXJ0KGlkeCwgZWx0LCBsaXN0KSB7XG4gIGlkeCA9IGlkeCA8IGxpc3QubGVuZ3RoICYmIGlkeCA+PSAwID8gaWR4IDogbGlzdC5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCAwKTtcbiAgcmVzdWx0LnNwbGljZShpZHgsIDAsIGVsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0OyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG4vKipcbiAqIEluc2VydHMgdGhlIHN1Yi1saXN0IGludG8gdGhlIGxpc3QsIGF0IHRoZSBzcGVjaWZpZWQgYGluZGV4YC4gX05vdGUgdGhhdCB0aGlzIGlzIG5vdFxuICogZGVzdHJ1Y3RpdmVfOiBpdCByZXR1cm5zIGEgY29weSBvZiB0aGUgbGlzdCB3aXRoIHRoZSBjaGFuZ2VzLlxuICogPHNtYWxsPk5vIGxpc3RzIGhhdmUgYmVlbiBoYXJtZWQgaW4gdGhlIGFwcGxpY2F0aW9uIG9mIHRoaXMgZnVuY3Rpb24uPC9zbWFsbD5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC45LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIE51bWJlciAtPiBbYV0gLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBwb3NpdGlvbiB0byBpbnNlcnQgdGhlIHN1Yi1saXN0XG4gKiBAcGFyYW0ge0FycmF5fSBlbHRzIFRoZSBzdWItbGlzdCB0byBpbnNlcnQgaW50byB0aGUgQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaW5zZXJ0IHRoZSBzdWItbGlzdCBpbnRvXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgQXJyYXkgd2l0aCBgZWx0c2AgaW5zZXJ0ZWQgc3RhcnRpbmcgYXQgYGluZGV4YC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmluc2VydEFsbCgyLCBbJ3gnLCd5JywneiddLCBbMSwyLDMsNF0pOyAvLz0+IFsxLDIsJ3gnLCd5JywneicsMyw0XVxuICovXG5cblxudmFyIGluc2VydEFsbCA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIGluc2VydEFsbChpZHgsIGVsdHMsIGxpc3QpIHtcbiAgaWR4ID0gaWR4IDwgbGlzdC5sZW5ndGggJiYgaWR4ID49IDAgPyBpZHggOiBsaXN0Lmxlbmd0aDtcbiAgcmV0dXJuIFtdLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCAwLCBpZHgpLCBlbHRzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCBpZHgpKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRBbGw7IiwidmFyIF9jb250YWlucyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jb250YWlucycpO1xuXG52YXIgX1NldCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gX1NldCgpIHtcbiAgICAvKiBnbG9iYWxzIFNldCAqL1xuICAgIHRoaXMuX25hdGl2ZVNldCA9IHR5cGVvZiBTZXQgPT09ICdmdW5jdGlvbicgPyBuZXcgU2V0KCkgOiBudWxsO1xuICAgIHRoaXMuX2l0ZW1zID0ge307XG4gIH1cblxuICAvLyB1bnRpbCB3ZSBmaWd1cmUgb3V0IHdoeSBqc2RvYyBjaG9rZXMgb24gdGhpc1xuICAvLyBAcGFyYW0gaXRlbSBUaGUgaXRlbSB0byBhZGQgdG8gdGhlIFNldFxuICAvLyBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgaXRlbSBkaWQgbm90IGV4aXN0IHByaW9yLCBvdGhlcndpc2UgZmFsc2VcbiAgLy9cbiAgX1NldC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICByZXR1cm4gIWhhc09yQWRkKGl0ZW0sIHRydWUsIHRoaXMpO1xuICB9O1xuXG4gIC8vXG4gIC8vIEBwYXJhbSBpdGVtIFRoZSBpdGVtIHRvIGNoZWNrIGZvciBleGlzdGVuY2UgaW4gdGhlIFNldFxuICAvLyBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiB0aGUgaXRlbSBleGlzdHMgaW4gdGhlIFNldCwgb3RoZXJ3aXNlIGZhbHNlXG4gIC8vXG4gIF9TZXQucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgcmV0dXJuIGhhc09yQWRkKGl0ZW0sIGZhbHNlLCB0aGlzKTtcbiAgfTtcblxuICAvL1xuICAvLyBDb21iaW5lcyB0aGUgbG9naWMgZm9yIGNoZWNraW5nIHdoZXRoZXIgYW4gaXRlbSBpcyBhIG1lbWJlciBvZiB0aGUgc2V0IGFuZFxuICAvLyBmb3IgYWRkaW5nIGEgbmV3IGl0ZW0gdG8gdGhlIHNldC5cbiAgLy9cbiAgLy8gQHBhcmFtIGl0ZW0gICAgICAgVGhlIGl0ZW0gdG8gY2hlY2sgb3IgYWRkIHRvIHRoZSBTZXQgaW5zdGFuY2UuXG4gIC8vIEBwYXJhbSBzaG91bGRBZGQgIElmIHRydWUsIHRoZSBpdGVtIHdpbGwgYmUgYWRkZWQgdG8gdGhlIHNldCBpZiBpdCBkb2Vzbid0XG4gIC8vICAgICAgICAgICAgICAgICAgIGFscmVhZHkgZXhpc3QuXG4gIC8vIEBwYXJhbSBzZXQgICAgICAgIFRoZSBzZXQgaW5zdGFuY2UgdG8gY2hlY2sgb3IgYWRkIHRvLlxuICAvLyBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHRoZSBpdGVtIGFscmVhZHkgZXhpc3RlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAvL1xuICByZXR1cm4gX1NldDtcbn0oKTtcblxuZnVuY3Rpb24gaGFzT3JBZGQoaXRlbSwgc2hvdWxkQWRkLCBzZXQpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgaXRlbTtcbiAgdmFyIHByZXZTaXplLCBuZXdTaXplO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAvLyBkaXN0aW5ndWlzaCBiZXR3ZWVuICswIGFuZCAtMFxuICAgICAgaWYgKGl0ZW0gPT09IDAgJiYgMSAvIGl0ZW0gPT09IC1JbmZpbml0eSkge1xuICAgICAgICBpZiAoc2V0Ll9pdGVtc1snLTAnXSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICAgIHNldC5faXRlbXNbJy0wJ10gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIHRoZXNlIHR5cGVzIGNhbiBhbGwgdXRpbGlzZSB0aGUgbmF0aXZlIFNldFxuICAgICAgaWYgKHNldC5fbmF0aXZlU2V0ICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICBwcmV2U2l6ZSA9IHNldC5fbmF0aXZlU2V0LnNpemU7XG4gICAgICAgICAgc2V0Ll9uYXRpdmVTZXQuYWRkKGl0ZW0pO1xuICAgICAgICAgIG5ld1NpemUgPSBzZXQuX25hdGl2ZVNldC5zaXplO1xuICAgICAgICAgIHJldHVybiBuZXdTaXplID09PSBwcmV2U2l6ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gc2V0Ll9uYXRpdmVTZXQuaGFzKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoISh0eXBlIGluIHNldC5faXRlbXMpKSB7XG4gICAgICAgICAgaWYgKHNob3VsZEFkZCkge1xuICAgICAgICAgICAgc2V0Ll9pdGVtc1t0eXBlXSA9IHt9O1xuICAgICAgICAgICAgc2V0Ll9pdGVtc1t0eXBlXVtpdGVtXSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmIChpdGVtIGluIHNldC5faXRlbXNbdHlwZV0pIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2hvdWxkQWRkKSB7XG4gICAgICAgICAgICBzZXQuX2l0ZW1zW3R5cGVdW2l0ZW1dID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIC8vIHNldC5faXRlbXNbJ2Jvb2xlYW4nXSBob2xkcyBhIHR3byBlbGVtZW50IGFycmF5XG4gICAgICAvLyByZXByZXNlbnRpbmcgWyBmYWxzZUV4aXN0cywgdHJ1ZUV4aXN0cyBdXG4gICAgICBpZiAodHlwZSBpbiBzZXQuX2l0ZW1zKSB7XG4gICAgICAgIHZhciBiSWR4ID0gaXRlbSA/IDEgOiAwO1xuICAgICAgICBpZiAoc2V0Ll9pdGVtc1t0eXBlXVtiSWR4XSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICAgIHNldC5faXRlbXNbdHlwZV1bYklkeF0gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICBzZXQuX2l0ZW1zW3R5cGVdID0gaXRlbSA/IFtmYWxzZSwgdHJ1ZV0gOiBbdHJ1ZSwgZmFsc2VdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgIC8vIGNvbXBhcmUgZnVuY3Rpb25zIGZvciByZWZlcmVuY2UgZXF1YWxpdHlcbiAgICAgIGlmIChzZXQuX25hdGl2ZVNldCAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoc2hvdWxkQWRkKSB7XG4gICAgICAgICAgcHJldlNpemUgPSBzZXQuX25hdGl2ZVNldC5zaXplO1xuICAgICAgICAgIHNldC5fbmF0aXZlU2V0LmFkZChpdGVtKTtcbiAgICAgICAgICBuZXdTaXplID0gc2V0Ll9uYXRpdmVTZXQuc2l6ZTtcbiAgICAgICAgICByZXR1cm4gbmV3U2l6ZSA9PT0gcHJldlNpemU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHNldC5fbmF0aXZlU2V0LmhhcyhpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCEodHlwZSBpbiBzZXQuX2l0ZW1zKSkge1xuICAgICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICAgIHNldC5faXRlbXNbdHlwZV0gPSBbaXRlbV07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIV9jb250YWlucyhpdGVtLCBzZXQuX2l0ZW1zW3R5cGVdKSkge1xuICAgICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICAgIHNldC5faXRlbXNbdHlwZV0ucHVzaChpdGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgIGlmIChzZXQuX2l0ZW1zW3R5cGVdKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNob3VsZEFkZCkge1xuICAgICAgICAgIHNldC5faXRlbXNbdHlwZV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICBpZiAoaXRlbSA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoIXNldC5faXRlbXNbJ251bGwnXSkge1xuICAgICAgICAgIGlmIChzaG91bGRBZGQpIHtcbiAgICAgICAgICAgIHNldC5faXRlbXNbJ251bGwnXSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIHJlZHVjZSB0aGUgc2VhcmNoIHNpemUgb2YgaGV0ZXJvZ2VuZW91cyBzZXRzIGJ5IGNyZWF0aW5nIGJ1Y2tldHNcbiAgICAgIC8vIGZvciBlYWNoIHR5cGUuXG4gICAgICB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZW0pO1xuICAgICAgaWYgKCEodHlwZSBpbiBzZXQuX2l0ZW1zKSkge1xuICAgICAgICBpZiAoc2hvdWxkQWRkKSB7XG4gICAgICAgICAgc2V0Ll9pdGVtc1t0eXBlXSA9IFtpdGVtXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBzY2FuIHRocm91Z2ggYWxsIHByZXZpb3VzbHkgYXBwbGllZCBpdGVtc1xuICAgICAgaWYgKCFfY29udGFpbnMoaXRlbSwgc2V0Ll9pdGVtc1t0eXBlXSkpIHtcbiAgICAgICAgaWYgKHNob3VsZEFkZCkge1xuICAgICAgICAgIHNldC5faXRlbXNbdHlwZV0ucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG4vLyBBIHNpbXBsZSBTZXQgdHlwZSB0aGF0IGhvbm91cnMgUi5lcXVhbHMgc2VtYW50aWNzXG5tb2R1bGUuZXhwb3J0cyA9IF9TZXQ7IiwiZnVuY3Rpb24gX2FwZXJ0dXJlKG4sIGxpc3QpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsaW1pdCA9IGxpc3QubGVuZ3RoIC0gKG4gLSAxKTtcbiAgdmFyIGFjYyA9IG5ldyBBcnJheShsaW1pdCA+PSAwID8gbGltaXQgOiAwKTtcbiAgd2hpbGUgKGlkeCA8IGxpbWl0KSB7XG4gICAgYWNjW2lkeF0gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCBpZHgsIGlkeCArIG4pO1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBhY2M7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9hcGVydHVyZTsiLCJmdW5jdGlvbiBfYXJpdHkobiwgZm4pIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgc3dpdGNoIChuKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTApIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExKSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgNDpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgNTpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDY6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgNzpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgODpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBjYXNlIDk6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIGNhc2UgMTA6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KSB7XG4gICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCB0byBfYXJpdHkgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIG5vIGdyZWF0ZXIgdGhhbiB0ZW4nKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBfYXJpdHk7IiwiZnVuY3Rpb24gX2FycmF5RnJvbUl0ZXJhdG9yKGl0ZXIpIHtcbiAgdmFyIGxpc3QgPSBbXTtcbiAgdmFyIG5leHQ7XG4gIHdoaWxlICghKG5leHQgPSBpdGVyLm5leHQoKSkuZG9uZSkge1xuICAgIGxpc3QucHVzaChuZXh0LnZhbHVlKTtcbiAgfVxuICByZXR1cm4gbGlzdDtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5RnJvbUl0ZXJhdG9yOyIsInZhciBfb2JqZWN0QXNzaWduID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX29iamVjdEFzc2lnbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBPYmplY3QuYXNzaWduID09PSAnZnVuY3Rpb24nID8gT2JqZWN0LmFzc2lnbiA6IF9vYmplY3RBc3NpZ247IiwidmFyIF9pc0FycmF5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2lzQXJyYXknKTtcblxuLyoqXG4gKiBUaGlzIGNoZWNrcyB3aGV0aGVyIGEgZnVuY3Rpb24gaGFzIGEgW21ldGhvZG5hbWVdIGZ1bmN0aW9uLiBJZiBpdCBpc24ndCBhblxuICogYXJyYXkgaXQgd2lsbCBleGVjdXRlIHRoYXQgZnVuY3Rpb24gb3RoZXJ3aXNlIGl0IHdpbGwgZGVmYXVsdCB0byB0aGUgcmFtZGFcbiAqIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiByYW1kYSBpbXBsZW10YXRpb25cbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RuYW1lIHByb3BlcnR5IHRvIGNoZWNrIGZvciBhIGN1c3RvbSBpbXBsZW1lbnRhdGlvblxuICogQHJldHVybiB7T2JqZWN0fSBXaGF0ZXZlciB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBtZXRob2QgaXMuXG4gKi9cblxuXG5mdW5jdGlvbiBfY2hlY2tGb3JNZXRob2QobWV0aG9kbmFtZSwgZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBpZiAobGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZm4oKTtcbiAgICB9XG4gICAgdmFyIG9iaiA9IGFyZ3VtZW50c1tsZW5ndGggLSAxXTtcbiAgICByZXR1cm4gX2lzQXJyYXkob2JqKSB8fCB0eXBlb2Ygb2JqW21ldGhvZG5hbWVdICE9PSAnZnVuY3Rpb24nID8gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IG9ialttZXRob2RuYW1lXS5hcHBseShvYmosIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgbGVuZ3RoIC0gMSkpO1xuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY2hlY2tGb3JNZXRob2Q7IiwidmFyIF9jbG9uZVJlZ0V4cCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jbG9uZVJlZ0V4cCcpO1xuXG52YXIgdHlwZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuLi90eXBlJyk7XG5cbi8qKlxuICogQ29waWVzIGFuIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYmUgY29waWVkXG4gKiBAcGFyYW0ge0FycmF5fSByZWZGcm9tIEFycmF5IGNvbnRhaW5pbmcgdGhlIHNvdXJjZSByZWZlcmVuY2VzXG4gKiBAcGFyYW0ge0FycmF5fSByZWZUbyBBcnJheSBjb250YWluaW5nIHRoZSBjb3BpZWQgc291cmNlIHJlZmVyZW5jZXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZGVlcCBXaGV0aGVyIG9yIG5vdCB0byBwZXJmb3JtIGRlZXAgY2xvbmluZy5cbiAqIEByZXR1cm4geyp9IFRoZSBjb3BpZWQgdmFsdWUuXG4gKi9cblxuXG5mdW5jdGlvbiBfY2xvbmUodmFsdWUsIHJlZkZyb20sIHJlZlRvLCBkZWVwKSB7XG4gIHZhciBjb3B5ID0gZnVuY3Rpb24gY29weShjb3BpZWRWYWx1ZSkge1xuICAgIHZhciBsZW4gPSByZWZGcm9tLmxlbmd0aDtcbiAgICB2YXIgaWR4ID0gMDtcbiAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICBpZiAodmFsdWUgPT09IHJlZkZyb21baWR4XSkge1xuICAgICAgICByZXR1cm4gcmVmVG9baWR4XTtcbiAgICAgIH1cbiAgICAgIGlkeCArPSAxO1xuICAgIH1cbiAgICByZWZGcm9tW2lkeCArIDFdID0gdmFsdWU7XG4gICAgcmVmVG9baWR4ICsgMV0gPSBjb3BpZWRWYWx1ZTtcbiAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICAgIGNvcGllZFZhbHVlW2tleV0gPSBkZWVwID8gX2Nsb25lKHZhbHVlW2tleV0sIHJlZkZyb20sIHJlZlRvLCB0cnVlKSA6IHZhbHVlW2tleV07XG4gICAgfVxuICAgIHJldHVybiBjb3BpZWRWYWx1ZTtcbiAgfTtcbiAgc3dpdGNoICh0eXBlKHZhbHVlKSkge1xuICAgIGNhc2UgJ09iamVjdCc6XG4gICAgICByZXR1cm4gY29weSh7fSk7XG4gICAgY2FzZSAnQXJyYXknOlxuICAgICAgcmV0dXJuIGNvcHkoW10pO1xuICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlLnZhbHVlT2YoKSk7XG4gICAgY2FzZSAnUmVnRXhwJzpcbiAgICAgIHJldHVybiBfY2xvbmVSZWdFeHAodmFsdWUpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gX2Nsb25lOyIsImZ1bmN0aW9uIF9jbG9uZVJlZ0V4cChwYXR0ZXJuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAocGF0dGVybi5zb3VyY2UsIChwYXR0ZXJuLmdsb2JhbCA/ICdnJyA6ICcnKSArIChwYXR0ZXJuLmlnbm9yZUNhc2UgPyAnaScgOiAnJykgKyAocGF0dGVybi5tdWx0aWxpbmUgPyAnbScgOiAnJykgKyAocGF0dGVybi5zdGlja3kgPyAneScgOiAnJykgKyAocGF0dGVybi51bmljb2RlID8gJ3UnIDogJycpKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2Nsb25lUmVnRXhwOyIsImZ1bmN0aW9uIF9jb21wbGVtZW50KGYpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gIWYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2NvbXBsZW1lbnQ7IiwiLyoqXG4gKiBQcml2YXRlIGBjb25jYXRgIGZ1bmN0aW9uIHRvIG1lcmdlIHR3byBhcnJheS1saWtlIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8QXJndW1lbnRzfSBbc2V0MT1bXV0gQW4gYXJyYXktbGlrZSBvYmplY3QuXG4gKiBAcGFyYW0ge0FycmF5fEFyZ3VtZW50c30gW3NldDI9W11dIEFuIGFycmF5LWxpa2Ugb2JqZWN0LlxuICogQHJldHVybiB7QXJyYXl9IEEgbmV3LCBtZXJnZWQgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgX2NvbmNhdChbNCwgNSwgNl0sIFsxLCAyLCAzXSk7IC8vPT4gWzQsIDUsIDYsIDEsIDIsIDNdXG4gKi9cbmZ1bmN0aW9uIF9jb25jYXQoc2V0MSwgc2V0Mikge1xuICBzZXQxID0gc2V0MSB8fCBbXTtcbiAgc2V0MiA9IHNldDIgfHwgW107XG4gIHZhciBpZHg7XG4gIHZhciBsZW4xID0gc2V0MS5sZW5ndGg7XG4gIHZhciBsZW4yID0gc2V0Mi5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSBbXTtcblxuICBpZHggPSAwO1xuICB3aGlsZSAoaWR4IDwgbGVuMSkge1xuICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHNldDFbaWR4XTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICBpZHggPSAwO1xuICB3aGlsZSAoaWR4IDwgbGVuMikge1xuICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHNldDJbaWR4XTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY29uY2F0OyIsInZhciBfaW5kZXhPZiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19pbmRleE9mJyk7XG5cbmZ1bmN0aW9uIF9jb250YWlucyhhLCBsaXN0KSB7XG4gIHJldHVybiBfaW5kZXhPZihsaXN0LCBhLCAwKSA+PSAwO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY29udGFpbnM7IiwiZnVuY3Rpb24gX2NvbnRhaW5zV2l0aChwcmVkLCB4LCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG5cbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGlmIChwcmVkKHgsIGxpc3RbaWR4XSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9jb250YWluc1dpdGg7IiwidmFyIF9hcml0eSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19hcml0eScpO1xuXG52YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jdXJyeTInKTtcblxuZnVuY3Rpb24gX2NyZWF0ZVBhcnRpYWxBcHBsaWNhdG9yKGNvbmNhdCkge1xuICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiAoZm4sIGFyZ3MpIHtcbiAgICByZXR1cm4gX2FyaXR5KE1hdGgubWF4KDAsIGZuLmxlbmd0aCAtIGFyZ3MubGVuZ3RoKSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGNvbmNhdChhcmdzLCBhcmd1bWVudHMpKTtcbiAgICB9KTtcbiAgfSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVQYXJ0aWFsQXBwbGljYXRvcjsiLCJ2YXIgX2lzUGxhY2Vob2xkZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9faXNQbGFjZWhvbGRlcicpO1xuXG4vKipcbiAqIE9wdGltaXplZCBpbnRlcm5hbCBvbmUtYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICovXG5cblxuZnVuY3Rpb24gX2N1cnJ5MShmbikge1xuICByZXR1cm4gZnVuY3Rpb24gZjEoYSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8IF9pc1BsYWNlaG9sZGVyKGEpKSB7XG4gICAgICByZXR1cm4gZjE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MTsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jdXJyeTEnKTtcblxudmFyIF9pc1BsYWNlaG9sZGVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2lzUGxhY2Vob2xkZXInKTtcblxuLyoqXG4gKiBPcHRpbWl6ZWQgaW50ZXJuYWwgdHdvLWFyaXR5IGN1cnJ5IGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xuXG5cbmZ1bmN0aW9uIF9jdXJyeTIoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGYyKGEsIGIpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIGYyO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgPyBmMiA6IF9jdXJyeTEoZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKGEsIF9iKTtcbiAgICAgICAgfSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgJiYgX2lzUGxhY2Vob2xkZXIoYikgPyBmMiA6IF9pc1BsYWNlaG9sZGVyKGEpID8gX2N1cnJ5MShmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICByZXR1cm4gZm4oX2EsIGIpO1xuICAgICAgICB9KSA6IF9pc1BsYWNlaG9sZGVyKGIpID8gX2N1cnJ5MShmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICByZXR1cm4gZm4oYSwgX2IpO1xuICAgICAgICB9KSA6IGZuKGEsIGIpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2N1cnJ5MjsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jdXJyeTEnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY3VycnkyJyk7XG5cbnZhciBfaXNQbGFjZWhvbGRlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19pc1BsYWNlaG9sZGVyJyk7XG5cbi8qKlxuICogT3B0aW1pemVkIGludGVybmFsIHRocmVlLWFyaXR5IGN1cnJ5IGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAqL1xuXG5cbmZ1bmN0aW9uIF9jdXJyeTMoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGYzKGEsIGIsIGMpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIGYzO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gX2lzUGxhY2Vob2xkZXIoYSkgPyBmMyA6IF9jdXJyeTIoZnVuY3Rpb24gKF9iLCBfYykge1xuICAgICAgICAgIHJldHVybiBmbihhLCBfYiwgX2MpO1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIF9pc1BsYWNlaG9sZGVyKGEpICYmIF9pc1BsYWNlaG9sZGVyKGIpID8gZjMgOiBfaXNQbGFjZWhvbGRlcihhKSA/IF9jdXJyeTIoZnVuY3Rpb24gKF9hLCBfYykge1xuICAgICAgICAgIHJldHVybiBmbihfYSwgYiwgX2MpO1xuICAgICAgICB9KSA6IF9pc1BsYWNlaG9sZGVyKGIpID8gX2N1cnJ5MihmdW5jdGlvbiAoX2IsIF9jKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKGEsIF9iLCBfYyk7XG4gICAgICAgIH0pIDogX2N1cnJ5MShmdW5jdGlvbiAoX2MpIHtcbiAgICAgICAgICByZXR1cm4gZm4oYSwgYiwgX2MpO1xuICAgICAgICB9KTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihiKSAmJiBfaXNQbGFjZWhvbGRlcihjKSA/IGYzIDogX2lzUGxhY2Vob2xkZXIoYSkgJiYgX2lzUGxhY2Vob2xkZXIoYikgPyBfY3VycnkyKGZ1bmN0aW9uIChfYSwgX2IpIHtcbiAgICAgICAgICByZXR1cm4gZm4oX2EsIF9iLCBjKTtcbiAgICAgICAgfSkgOiBfaXNQbGFjZWhvbGRlcihhKSAmJiBfaXNQbGFjZWhvbGRlcihjKSA/IF9jdXJyeTIoZnVuY3Rpb24gKF9hLCBfYykge1xuICAgICAgICAgIHJldHVybiBmbihfYSwgYiwgX2MpO1xuICAgICAgICB9KSA6IF9pc1BsYWNlaG9sZGVyKGIpICYmIF9pc1BsYWNlaG9sZGVyKGMpID8gX2N1cnJ5MihmdW5jdGlvbiAoX2IsIF9jKSB7XG4gICAgICAgICAgcmV0dXJuIGZuKGEsIF9iLCBfYyk7XG4gICAgICAgIH0pIDogX2lzUGxhY2Vob2xkZXIoYSkgPyBfY3VycnkxKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgIHJldHVybiBmbihfYSwgYiwgYyk7XG4gICAgICAgIH0pIDogX2lzUGxhY2Vob2xkZXIoYikgPyBfY3VycnkxKGZ1bmN0aW9uIChfYikge1xuICAgICAgICAgIHJldHVybiBmbihhLCBfYiwgYyk7XG4gICAgICAgIH0pIDogX2lzUGxhY2Vob2xkZXIoYykgPyBfY3VycnkxKGZ1bmN0aW9uIChfYykge1xuICAgICAgICAgIHJldHVybiBmbihhLCBiLCBfYyk7XG4gICAgICAgIH0pIDogZm4oYSwgYiwgYyk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY3VycnkzOyIsInZhciBfYXJpdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fYXJpdHknKTtcblxudmFyIF9pc1BsYWNlaG9sZGVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2lzUGxhY2Vob2xkZXInKTtcblxuLyoqXG4gKiBJbnRlcm5hbCBjdXJyeU4gZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgb2YgdGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0FycmF5fSByZWNlaXZlZCBBbiBhcnJheSBvZiBhcmd1bWVudHMgcmVjZWl2ZWQgdGh1cyBmYXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gKi9cblxuXG5mdW5jdGlvbiBfY3VycnlOKGxlbmd0aCwgcmVjZWl2ZWQsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbWJpbmVkID0gW107XG4gICAgdmFyIGFyZ3NJZHggPSAwO1xuICAgIHZhciBsZWZ0ID0gbGVuZ3RoO1xuICAgIHZhciBjb21iaW5lZElkeCA9IDA7XG4gICAgd2hpbGUgKGNvbWJpbmVkSWR4IDwgcmVjZWl2ZWQubGVuZ3RoIHx8IGFyZ3NJZHggPCBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB2YXIgcmVzdWx0O1xuICAgICAgaWYgKGNvbWJpbmVkSWR4IDwgcmVjZWl2ZWQubGVuZ3RoICYmICghX2lzUGxhY2Vob2xkZXIocmVjZWl2ZWRbY29tYmluZWRJZHhdKSB8fCBhcmdzSWR4ID49IGFyZ3VtZW50cy5sZW5ndGgpKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlY2VpdmVkW2NvbWJpbmVkSWR4XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IGFyZ3VtZW50c1thcmdzSWR4XTtcbiAgICAgICAgYXJnc0lkeCArPSAxO1xuICAgICAgfVxuICAgICAgY29tYmluZWRbY29tYmluZWRJZHhdID0gcmVzdWx0O1xuICAgICAgaWYgKCFfaXNQbGFjZWhvbGRlcihyZXN1bHQpKSB7XG4gICAgICAgIGxlZnQgLT0gMTtcbiAgICAgIH1cbiAgICAgIGNvbWJpbmVkSWR4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBsZWZ0IDw9IDAgPyBmbi5hcHBseSh0aGlzLCBjb21iaW5lZCkgOiBfYXJpdHkobGVmdCwgX2N1cnJ5TihsZW5ndGgsIGNvbWJpbmVkLCBmbikpO1xuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfY3VycnlOOyIsInZhciBfaXNBcnJheSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19pc0FycmF5Jyk7XG5cbnZhciBfaXNUcmFuc2Zvcm1lciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19pc1RyYW5zZm9ybWVyJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgZGlzcGF0Y2hlcyB3aXRoIGRpZmZlcmVudCBzdHJhdGVnaWVzIGJhc2VkIG9uIHRoZVxuICogb2JqZWN0IGluIGxpc3QgcG9zaXRpb24gKGxhc3QgYXJndW1lbnQpLiBJZiBpdCBpcyBhbiBhcnJheSwgZXhlY3V0ZXMgW2ZuXS5cbiAqIE90aGVyd2lzZSwgaWYgaXQgaGFzIGEgZnVuY3Rpb24gd2l0aCBvbmUgb2YgdGhlIGdpdmVuIG1ldGhvZCBuYW1lcywgaXQgd2lsbFxuICogZXhlY3V0ZSB0aGF0IGZ1bmN0aW9uIChmdW5jdG9yIGNhc2UpLiBPdGhlcndpc2UsIGlmIGl0IGlzIGEgdHJhbnNmb3JtZXIsXG4gKiB1c2VzIHRyYW5zZHVjZXIgW3hmXSB0byByZXR1cm4gYSBuZXcgdHJhbnNmb3JtZXIgKHRyYW5zZHVjZXIgY2FzZSkuXG4gKiBPdGhlcndpc2UsIGl0IHdpbGwgZGVmYXVsdCB0byBleGVjdXRpbmcgW2ZuXS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gbWV0aG9kTmFtZXMgcHJvcGVydGllcyB0byBjaGVjayBmb3IgYSBjdXN0b20gaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHhmIHRyYW5zZHVjZXIgdG8gaW5pdGlhbGl6ZSBpZiBvYmplY3QgaXMgdHJhbnNmb3JtZXJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIGRlZmF1bHQgcmFtZGEgaW1wbGVtZW50YXRpb25cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgZGlzcGF0Y2hlcyBvbiBvYmplY3QgaW4gbGlzdCBwb3NpdGlvblxuICovXG5cblxuZnVuY3Rpb24gX2Rpc3BhdGNoYWJsZShtZXRob2ROYW1lcywgeGYsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmbigpO1xuICAgIH1cbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgdmFyIG9iaiA9IGFyZ3MucG9wKCk7XG4gICAgaWYgKCFfaXNBcnJheShvYmopKSB7XG4gICAgICB2YXIgaWR4ID0gMDtcbiAgICAgIHdoaWxlIChpZHggPCBtZXRob2ROYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmpbbWV0aG9kTmFtZXNbaWR4XV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gb2JqW21ldGhvZE5hbWVzW2lkeF1dLmFwcGx5KG9iaiwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgaWR4ICs9IDE7XG4gICAgICB9XG4gICAgICBpZiAoX2lzVHJhbnNmb3JtZXIob2JqKSkge1xuICAgICAgICB2YXIgdHJhbnNkdWNlciA9IHhmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICByZXR1cm4gdHJhbnNkdWNlcihvYmopO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2Rpc3BhdGNoYWJsZTsiLCJ2YXIgdGFrZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuLi90YWtlJyk7XG5cbmZ1bmN0aW9uIGRyb3BMYXN0KG4sIHhzKSB7XG4gIHJldHVybiB0YWtlKG4gPCB4cy5sZW5ndGggPyB4cy5sZW5ndGggLSBuIDogMCwgeHMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBkcm9wTGFzdDsiLCJ2YXIgc2xpY2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi4vc2xpY2UnKTtcblxuZnVuY3Rpb24gZHJvcExhc3RXaGlsZShwcmVkLCB4cykge1xuICB2YXIgaWR4ID0geHMubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKGlkeCA+PSAwICYmIHByZWQoeHNbaWR4XSkpIHtcbiAgICBpZHggLT0gMTtcbiAgfVxuICByZXR1cm4gc2xpY2UoMCwgaWR4ICsgMSwgeHMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBkcm9wTGFzdFdoaWxlOyIsInZhciBfYXJyYXlGcm9tSXRlcmF0b3IgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fYXJyYXlGcm9tSXRlcmF0b3InKTtcblxudmFyIF9jb250YWluc1dpdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY29udGFpbnNXaXRoJyk7XG5cbnZhciBfZnVuY3Rpb25OYW1lID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2Z1bmN0aW9uTmFtZScpO1xuXG52YXIgX2hhcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19oYXMnKTtcblxudmFyIGlkZW50aWNhbCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuLi9pZGVudGljYWwnKTtcblxudmFyIGtleXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi4va2V5cycpO1xuXG52YXIgdHlwZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuLi90eXBlJyk7XG5cbi8qKlxuICogcHJpdmF0ZSBfdW5pcUNvbnRlbnRFcXVhbHMgZnVuY3Rpb24uXG4gKiBUaGF0IGZ1bmN0aW9uIGlzIGNoZWNraW5nIGVxdWFsaXR5IG9mIDIgaXRlcmF0b3IgY29udGVudHMgd2l0aCAyIGFzc3VtcHRpb25zXG4gKiAtIGl0ZXJhdG9ycyBsZW5ndGhzIGFyZSB0aGUgc2FtZVxuICogLSBpdGVyYXRvcnMgdmFsdWVzIGFyZSB1bmlxdWVcbiAqXG4gKiBmYWxzZS1wb3NpdGl2ZSByZXN1bHQgd2lsbCBiZSByZXR1cm5lZCBmb3IgY29tcGFyaXNpb24gb2YsIGUuZy5cbiAqIC0gWzEsMiwzXSBhbmQgWzEsMiwzLDRdXG4gKiAtIFsxLDEsMV0gYW5kIFsxLDIsM11cbiAqICovXG5cbmZ1bmN0aW9uIF91bmlxQ29udGVudEVxdWFscyhhSXRlcmF0b3IsIGJJdGVyYXRvciwgc3RhY2tBLCBzdGFja0IpIHtcbiAgdmFyIGEgPSBfYXJyYXlGcm9tSXRlcmF0b3IoYUl0ZXJhdG9yKTtcbiAgdmFyIGIgPSBfYXJyYXlGcm9tSXRlcmF0b3IoYkl0ZXJhdG9yKTtcblxuICBmdW5jdGlvbiBlcShfYSwgX2IpIHtcbiAgICByZXR1cm4gX2VxdWFscyhfYSwgX2IsIHN0YWNrQS5zbGljZSgpLCBzdGFja0Iuc2xpY2UoKSk7XG4gIH1cblxuICAvLyBpZiAqYSogYXJyYXkgY29udGFpbnMgYW55IGVsZW1lbnQgdGhhdCBpcyBub3QgaW5jbHVkZWQgaW4gKmIqXG4gIHJldHVybiAhX2NvbnRhaW5zV2l0aChmdW5jdGlvbiAoYiwgYUl0ZW0pIHtcbiAgICByZXR1cm4gIV9jb250YWluc1dpdGgoZXEsIGFJdGVtLCBiKTtcbiAgfSwgYiwgYSk7XG59XG5cbmZ1bmN0aW9uIF9lcXVhbHMoYSwgYiwgc3RhY2tBLCBzdGFja0IpIHtcbiAgaWYgKGlkZW50aWNhbChhLCBiKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdmFyIHR5cGVBID0gdHlwZShhKTtcblxuICBpZiAodHlwZUEgIT09IHR5cGUoYikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYVsnZmFudGFzeS1sYW5kL2VxdWFscyddID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBiWydmYW50YXN5LWxhbmQvZXF1YWxzJ10gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdHlwZW9mIGFbJ2ZhbnRhc3ktbGFuZC9lcXVhbHMnXSA9PT0gJ2Z1bmN0aW9uJyAmJiBhWydmYW50YXN5LWxhbmQvZXF1YWxzJ10oYikgJiYgdHlwZW9mIGJbJ2ZhbnRhc3ktbGFuZC9lcXVhbHMnXSA9PT0gJ2Z1bmN0aW9uJyAmJiBiWydmYW50YXN5LWxhbmQvZXF1YWxzJ10oYSk7XG4gIH1cblxuICBpZiAodHlwZW9mIGEuZXF1YWxzID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBiLmVxdWFscyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB0eXBlb2YgYS5lcXVhbHMgPT09ICdmdW5jdGlvbicgJiYgYS5lcXVhbHMoYikgJiYgdHlwZW9mIGIuZXF1YWxzID09PSAnZnVuY3Rpb24nICYmIGIuZXF1YWxzKGEpO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlQSkge1xuICAgIGNhc2UgJ0FyZ3VtZW50cyc6XG4gICAgY2FzZSAnQXJyYXknOlxuICAgIGNhc2UgJ09iamVjdCc6XG4gICAgICBpZiAodHlwZW9mIGEuY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicgJiYgX2Z1bmN0aW9uTmFtZShhLmNvbnN0cnVjdG9yKSA9PT0gJ1Byb21pc2UnKSB7XG4gICAgICAgIHJldHVybiBhID09PSBiO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQm9vbGVhbic6XG4gICAgY2FzZSAnTnVtYmVyJzpcbiAgICBjYXNlICdTdHJpbmcnOlxuICAgICAgaWYgKCEodHlwZW9mIGEgPT09IHR5cGVvZiBiICYmIGlkZW50aWNhbChhLnZhbHVlT2YoKSwgYi52YWx1ZU9mKCkpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdEYXRlJzpcbiAgICAgIGlmICghaWRlbnRpY2FsKGEudmFsdWVPZigpLCBiLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnRXJyb3InOlxuICAgICAgcmV0dXJuIGEubmFtZSA9PT0gYi5uYW1lICYmIGEubWVzc2FnZSA9PT0gYi5tZXNzYWdlO1xuICAgIGNhc2UgJ1JlZ0V4cCc6XG4gICAgICBpZiAoIShhLnNvdXJjZSA9PT0gYi5zb3VyY2UgJiYgYS5nbG9iYWwgPT09IGIuZ2xvYmFsICYmIGEuaWdub3JlQ2FzZSA9PT0gYi5pZ25vcmVDYXNlICYmIGEubXVsdGlsaW5lID09PSBiLm11bHRpbGluZSAmJiBhLnN0aWNreSA9PT0gYi5zdGlja3kgJiYgYS51bmljb2RlID09PSBiLnVuaWNvZGUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgdmFyIGlkeCA9IHN0YWNrQS5sZW5ndGggLSAxO1xuICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICBpZiAoc3RhY2tBW2lkeF0gPT09IGEpIHtcbiAgICAgIHJldHVybiBzdGFja0JbaWR4XSA9PT0gYjtcbiAgICB9XG4gICAgaWR4IC09IDE7XG4gIH1cblxuICBzd2l0Y2ggKHR5cGVBKSB7XG4gICAgY2FzZSAnTWFwJzpcbiAgICAgIGlmIChhLnNpemUgIT09IGIuc2l6ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdW5pcUNvbnRlbnRFcXVhbHMoYS5lbnRyaWVzKCksIGIuZW50cmllcygpLCBzdGFja0EuY29uY2F0KFthXSksIHN0YWNrQi5jb25jYXQoW2JdKSk7XG4gICAgY2FzZSAnU2V0JzpcbiAgICAgIGlmIChhLnNpemUgIT09IGIuc2l6ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBfdW5pcUNvbnRlbnRFcXVhbHMoYS52YWx1ZXMoKSwgYi52YWx1ZXMoKSwgc3RhY2tBLmNvbmNhdChbYV0pLCBzdGFja0IuY29uY2F0KFtiXSkpO1xuICAgIGNhc2UgJ0FyZ3VtZW50cyc6XG4gICAgY2FzZSAnQXJyYXknOlxuICAgIGNhc2UgJ09iamVjdCc6XG4gICAgY2FzZSAnQm9vbGVhbic6XG4gICAgY2FzZSAnTnVtYmVyJzpcbiAgICBjYXNlICdTdHJpbmcnOlxuICAgIGNhc2UgJ0RhdGUnOlxuICAgIGNhc2UgJ0Vycm9yJzpcbiAgICBjYXNlICdSZWdFeHAnOlxuICAgIGNhc2UgJ0ludDhBcnJheSc6XG4gICAgY2FzZSAnVWludDhBcnJheSc6XG4gICAgY2FzZSAnVWludDhDbGFtcGVkQXJyYXknOlxuICAgIGNhc2UgJ0ludDE2QXJyYXknOlxuICAgIGNhc2UgJ1VpbnQxNkFycmF5JzpcbiAgICBjYXNlICdJbnQzMkFycmF5JzpcbiAgICBjYXNlICdVaW50MzJBcnJheSc6XG4gICAgY2FzZSAnRmxvYXQzMkFycmF5JzpcbiAgICBjYXNlICdGbG9hdDY0QXJyYXknOlxuICAgIGNhc2UgJ0FycmF5QnVmZmVyJzpcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBWYWx1ZXMgb2Ygb3RoZXIgdHlwZXMgYXJlIG9ubHkgZXF1YWwgaWYgaWRlbnRpY2FsLlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGtleXNBID0ga2V5cyhhKTtcbiAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5cyhiKS5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgZXh0ZW5kZWRTdGFja0EgPSBzdGFja0EuY29uY2F0KFthXSk7XG4gIHZhciBleHRlbmRlZFN0YWNrQiA9IHN0YWNrQi5jb25jYXQoW2JdKTtcblxuICBpZHggPSBrZXlzQS5sZW5ndGggLSAxO1xuICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICB2YXIga2V5ID0ga2V5c0FbaWR4XTtcbiAgICBpZiAoIShfaGFzKGtleSwgYikgJiYgX2VxdWFscyhiW2tleV0sIGFba2V5XSwgZXh0ZW5kZWRTdGFja0EsIGV4dGVuZGVkU3RhY2tCKSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWR4IC09IDE7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9lcXVhbHM7IiwiZnVuY3Rpb24gX2ZpbHRlcihmbiwgbGlzdCkge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gW107XG5cbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGlmIChmbihsaXN0W2lkeF0pKSB7XG4gICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBsaXN0W2lkeF07XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9maWx0ZXI7IiwidmFyIF9mb3JjZVJlZHVjZWQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fZm9yY2VSZWR1Y2VkJyk7XG5cbnZhciBfaXNBcnJheUxpa2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9faXNBcnJheUxpa2UnKTtcblxudmFyIF9yZWR1Y2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fcmVkdWNlJyk7XG5cbnZhciBfeGZCYXNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX3hmQmFzZScpO1xuXG52YXIgcHJlc2VydmluZ1JlZHVjZWQgPSBmdW5jdGlvbiAoeGYpIHtcbiAgcmV0dXJuIHtcbiAgICAnQEB0cmFuc2R1Y2VyL2luaXQnOiBfeGZCYXNlLmluaXQsXG4gICAgJ0BAdHJhbnNkdWNlci9yZXN1bHQnOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4geGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICAgIH0sXG4gICAgJ0BAdHJhbnNkdWNlci9zdGVwJzogZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICAgIHZhciByZXQgPSB4ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KTtcbiAgICAgIHJldHVybiByZXRbJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJ10gPyBfZm9yY2VSZWR1Y2VkKHJldCkgOiByZXQ7XG4gICAgfVxuICB9O1xufTtcblxudmFyIF9mbGF0Q2F0ID0gZnVuY3Rpb24gX3hjYXQoeGYpIHtcbiAgdmFyIHJ4ZiA9IHByZXNlcnZpbmdSZWR1Y2VkKHhmKTtcbiAgcmV0dXJuIHtcbiAgICAnQEB0cmFuc2R1Y2VyL2luaXQnOiBfeGZCYXNlLmluaXQsXG4gICAgJ0BAdHJhbnNkdWNlci9yZXN1bHQnOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgICB9LFxuICAgICdAQHRyYW5zZHVjZXIvc3RlcCc6IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgICByZXR1cm4gIV9pc0FycmF5TGlrZShpbnB1dCkgPyBfcmVkdWNlKHJ4ZiwgcmVzdWx0LCBbaW5wdXRdKSA6IF9yZWR1Y2UocnhmLCByZXN1bHQsIGlucHV0KTtcbiAgICB9XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9mbGF0Q2F0OyIsImZ1bmN0aW9uIF9mb3JjZVJlZHVjZWQoeCkge1xuICByZXR1cm4ge1xuICAgICdAQHRyYW5zZHVjZXIvdmFsdWUnOiB4LFxuICAgICdAQHRyYW5zZHVjZXIvcmVkdWNlZCc6IHRydWVcbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2ZvcmNlUmVkdWNlZDsiLCJmdW5jdGlvbiBfZnVuY3Rpb25OYW1lKGYpIHtcbiAgLy8gU3RyaW5nKHggPT4geCkgZXZhbHVhdGVzIHRvIFwieCA9PiB4XCIsIHNvIHRoZSBwYXR0ZXJuIG1heSBub3QgbWF0Y2guXG4gIHZhciBtYXRjaCA9IFN0cmluZyhmKS5tYXRjaCgvXmZ1bmN0aW9uIChcXHcqKS8pO1xuICByZXR1cm4gbWF0Y2ggPT0gbnVsbCA/ICcnIDogbWF0Y2hbMV07XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9mdW5jdGlvbk5hbWU7IiwiZnVuY3Rpb24gX2hhcyhwcm9wLCBvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfaGFzOyIsImZ1bmN0aW9uIF9pZGVudGl0eSh4KSB7XG4gIHJldHVybiB4O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfaWRlbnRpdHk7IiwidmFyIGVxdWFscyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuLi9lcXVhbHMnKTtcblxuZnVuY3Rpb24gX2luZGV4T2YobGlzdCwgYSwgaWR4KSB7XG4gIHZhciBpbmYsIGl0ZW07XG4gIC8vIEFycmF5LnByb3RvdHlwZS5pbmRleE9mIGRvZXNuJ3QgZXhpc3QgYmVsb3cgSUU5XG4gIGlmICh0eXBlb2YgbGlzdC5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgYSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgaWYgKGEgPT09IDApIHtcbiAgICAgICAgICAvLyBtYW51YWxseSBjcmF3bCB0aGUgbGlzdCB0byBkaXN0aW5ndWlzaCBiZXR3ZWVuICswIGFuZCAtMFxuICAgICAgICAgIGluZiA9IDEgLyBhO1xuICAgICAgICAgIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlbSA9IGxpc3RbaWR4XTtcbiAgICAgICAgICAgIGlmIChpdGVtID09PSAwICYmIDEgLyBpdGVtID09PSBpbmYpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlkeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAoYSAhPT0gYSkge1xuICAgICAgICAgIC8vIE5hTlxuICAgICAgICAgIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgaXRlbSA9IGxpc3RbaWR4XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ251bWJlcicgJiYgaXRlbSAhPT0gaXRlbSkge1xuICAgICAgICAgICAgICByZXR1cm4gaWR4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBub24temVybyBudW1iZXJzIGNhbiB1dGlsaXNlIFNldFxuICAgICAgICByZXR1cm4gbGlzdC5pbmRleE9mKGEsIGlkeCk7XG5cbiAgICAgIC8vIGFsbCB0aGVzZSB0eXBlcyBjYW4gdXRpbGlzZSBTZXRcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiBsaXN0LmluZGV4T2YoYSwgaWR4KTtcblxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKGEgPT09IG51bGwpIHtcbiAgICAgICAgICAvLyBudWxsIGNhbiB1dGlsaXNlIFNldFxuICAgICAgICAgIHJldHVybiBsaXN0LmluZGV4T2YoYSwgaWR4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBhbnl0aGluZyBlbHNlIG5vdCBjb3ZlcmVkIGFib3ZlLCBkZWZlciB0byBSLmVxdWFsc1xuICB3aGlsZSAoaWR4IDwgbGlzdC5sZW5ndGgpIHtcbiAgICBpZiAoZXF1YWxzKGxpc3RbaWR4XSwgYSkpIHtcbiAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiAtMTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX2luZGV4T2Y7IiwidmFyIF9oYXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9faGFzJyk7XG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgX2lzQXJndW1lbnRzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcmd1bWVudHMpID09PSAnW29iamVjdCBBcmd1bWVudHNdJyA/IGZ1bmN0aW9uIF9pc0FyZ3VtZW50cyh4KSB7XG4gICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuICB9IDogZnVuY3Rpb24gX2lzQXJndW1lbnRzKHgpIHtcbiAgICByZXR1cm4gX2hhcygnY2FsbGVlJywgeCk7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9pc0FyZ3VtZW50czsiLCIvKipcbiAqIFRlc3RzIHdoZXRoZXIgb3Igbm90IGFuIG9iamVjdCBpcyBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWwgVGhlIG9iamVjdCB0byB0ZXN0LlxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIGB2YWxgIGlzIGFuIGFycmF5LCBgZmFsc2VgIG90aGVyd2lzZS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBfaXNBcnJheShbXSk7IC8vPT4gdHJ1ZVxuICogICAgICBfaXNBcnJheShudWxsKTsgLy89PiBmYWxzZVxuICogICAgICBfaXNBcnJheSh7fSk7IC8vPT4gZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIF9pc0FycmF5KHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsLmxlbmd0aCA+PSAwICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufTsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jdXJyeTEnKTtcblxudmFyIF9pc0FycmF5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2lzQXJyYXknKTtcblxudmFyIF9pc1N0cmluZyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19pc1N0cmluZycpO1xuXG4vKipcbiAqIFRlc3RzIHdoZXRoZXIgb3Igbm90IGFuIG9iamVjdCBpcyBzaW1pbGFyIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY2F0ZWdvcnkgVHlwZVxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKiAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9IHggVGhlIG9iamVjdCB0byB0ZXN0LlxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIGB4YCBoYXMgYSBudW1lcmljIGxlbmd0aCBwcm9wZXJ0eSBhbmQgZXh0cmVtZSBpbmRpY2VzIGRlZmluZWQ7IGBmYWxzZWAgb3RoZXJ3aXNlLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIF9pc0FycmF5TGlrZShbXSk7IC8vPT4gdHJ1ZVxuICogICAgICBfaXNBcnJheUxpa2UodHJ1ZSk7IC8vPT4gZmFsc2VcbiAqICAgICAgX2lzQXJyYXlMaWtlKHt9KTsgLy89PiBmYWxzZVxuICogICAgICBfaXNBcnJheUxpa2Uoe2xlbmd0aDogMTB9KTsgLy89PiBmYWxzZVxuICogICAgICBfaXNBcnJheUxpa2UoezA6ICd6ZXJvJywgOTogJ25pbmUnLCBsZW5ndGg6IDEwfSk7IC8vPT4gdHJ1ZVxuICovXG5cblxudmFyIF9pc0FycmF5TGlrZSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIGlzQXJyYXlMaWtlKHgpIHtcbiAgaWYgKF9pc0FycmF5KHgpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKCF4KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKF9pc1N0cmluZyh4KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoeC5ub2RlVHlwZSA9PT0gMSkge1xuICAgIHJldHVybiAhIXgubGVuZ3RoO1xuICB9XG4gIGlmICh4Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh4Lmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4geC5oYXNPd25Qcm9wZXJ0eSgwKSAmJiB4Lmhhc093blByb3BlcnR5KHgubGVuZ3RoIC0gMSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF9pc0FycmF5TGlrZTsiLCJmdW5jdGlvbiBfaXNGdW5jdGlvbih4KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9pc0Z1bmN0aW9uOyIsIi8qKlxuICogRGV0ZXJtaW5lIGlmIHRoZSBwYXNzZWQgYXJndW1lbnQgaXMgYW4gaW50ZWdlci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSBuXG4gKiBAY2F0ZWdvcnkgVHlwZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBOdW1iZXIuaXNJbnRlZ2VyIHx8IGZ1bmN0aW9uIF9pc0ludGVnZXIobikge1xuICByZXR1cm4gbiA8PCAwID09PSBuO1xufTsiLCJmdW5jdGlvbiBfaXNOdW1iZXIoeCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBOdW1iZXJdJztcbn1cbm1vZHVsZS5leHBvcnRzID0gX2lzTnVtYmVyOyIsImZ1bmN0aW9uIF9pc09iamVjdCh4KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfaXNPYmplY3Q7IiwiZnVuY3Rpb24gX2lzUGxhY2Vob2xkZXIoYSkge1xuICAgICAgIHJldHVybiBhICE9IG51bGwgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnICYmIGFbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfaXNQbGFjZWhvbGRlcjsiLCJmdW5jdGlvbiBfaXNSZWdFeHAoeCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cbm1vZHVsZS5leHBvcnRzID0gX2lzUmVnRXhwOyIsImZ1bmN0aW9uIF9pc1N0cmluZyh4KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfaXNTdHJpbmc7IiwiZnVuY3Rpb24gX2lzVHJhbnNmb3JtZXIob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqWydAQHRyYW5zZHVjZXIvc3RlcCddID09PSAnZnVuY3Rpb24nO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfaXNUcmFuc2Zvcm1lcjsiLCJ2YXIgX2lzQXJyYXlMaWtlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2lzQXJyYXlMaWtlJyk7XG5cbi8qKlxuICogYF9tYWtlRmxhdGAgaXMgYSBoZWxwZXIgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgb25lLWxldmVsIG9yIGZ1bGx5IHJlY3Vyc2l2ZVxuICogZnVuY3Rpb24gYmFzZWQgb24gdGhlIGZsYWcgcGFzc2VkIGluLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cblxuXG5mdW5jdGlvbiBfbWFrZUZsYXQocmVjdXJzaXZlKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmbGF0dChsaXN0KSB7XG4gICAgdmFyIHZhbHVlLCBqbGVuLCBqO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgaWR4ID0gMDtcbiAgICB2YXIgaWxlbiA9IGxpc3QubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGlkeCA8IGlsZW4pIHtcbiAgICAgIGlmIChfaXNBcnJheUxpa2UobGlzdFtpZHhdKSkge1xuICAgICAgICB2YWx1ZSA9IHJlY3Vyc2l2ZSA/IGZsYXR0KGxpc3RbaWR4XSkgOiBsaXN0W2lkeF07XG4gICAgICAgIGogPSAwO1xuICAgICAgICBqbGVuID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaiA8IGpsZW4pIHtcbiAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSB2YWx1ZVtqXTtcbiAgICAgICAgICBqICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IGxpc3RbaWR4XTtcbiAgICAgIH1cbiAgICAgIGlkeCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfbWFrZUZsYXQ7IiwiZnVuY3Rpb24gX21hcChmbiwgZnVuY3Rvcikge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGZ1bmN0b3IubGVuZ3RoO1xuICB2YXIgcmVzdWx0ID0gQXJyYXkobGVuKTtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIHJlc3VsdFtpZHhdID0gZm4oZnVuY3RvcltpZHhdKTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfbWFwOyIsInZhciBfaGFzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2hhcycpO1xuXG4vLyBCYXNlZCBvbiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduXG5cblxuZnVuY3Rpb24gX29iamVjdEFzc2lnbih0YXJnZXQpIHtcbiAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gIH1cblxuICB2YXIgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG4gIHZhciBpZHggPSAxO1xuICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgd2hpbGUgKGlkeCA8IGxlbmd0aCkge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaWR4XTtcbiAgICBpZiAoc291cmNlICE9IG51bGwpIHtcbiAgICAgIGZvciAodmFyIG5leHRLZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChfaGFzKG5leHRLZXksIHNvdXJjZSkpIHtcbiAgICAgICAgICBvdXRwdXRbbmV4dEtleV0gPSBzb3VyY2VbbmV4dEtleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdEFzc2lnbjsiLCJmdW5jdGlvbiBfb2YoeCkge1xuICByZXR1cm4gW3hdO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfb2Y7IiwiZnVuY3Rpb24gX3BpcGUoZiwgZykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBnLmNhbGwodGhpcywgZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX3BpcGU7IiwiZnVuY3Rpb24gX3BpcGVQKGYsIGcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY3R4ID0gdGhpcztcbiAgICByZXR1cm4gZi5hcHBseShjdHgsIGFyZ3VtZW50cykudGhlbihmdW5jdGlvbiAoeCkge1xuICAgICAgcmV0dXJuIGcuY2FsbChjdHgsIHgpO1xuICAgIH0pO1xuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBfcGlwZVA7IiwiZnVuY3Rpb24gX3F1b3RlKHMpIHtcbiAgdmFyIGVzY2FwZWQgPSBzLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJykucmVwbGFjZSgvW1xcYl0vZywgJ1xcXFxiJykgLy8gXFxiIG1hdGNoZXMgd29yZCBib3VuZGFyeTsgW1xcYl0gbWF0Y2hlcyBiYWNrc3BhY2VcbiAgLnJlcGxhY2UoL1xcZi9nLCAnXFxcXGYnKS5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJykucmVwbGFjZSgvXFxyL2csICdcXFxccicpLnJlcGxhY2UoL1xcdC9nLCAnXFxcXHQnKS5yZXBsYWNlKC9cXHYvZywgJ1xcXFx2JykucmVwbGFjZSgvXFwwL2csICdcXFxcMCcpO1xuXG4gIHJldHVybiAnXCInICsgZXNjYXBlZC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCInO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfcXVvdGU7IiwidmFyIF9pc0FycmF5TGlrZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19pc0FycmF5TGlrZScpO1xuXG52YXIgX3h3cmFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX3h3cmFwJyk7XG5cbnZhciBiaW5kID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4uL2JpbmQnKTtcblxuZnVuY3Rpb24gX2FycmF5UmVkdWNlKHhmLCBhY2MsIGxpc3QpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGFjYyA9IHhmWydAQHRyYW5zZHVjZXIvc3RlcCddKGFjYywgbGlzdFtpZHhdKTtcbiAgICBpZiAoYWNjICYmIGFjY1snQEB0cmFuc2R1Y2VyL3JlZHVjZWQnXSkge1xuICAgICAgYWNjID0gYWNjWydAQHRyYW5zZHVjZXIvdmFsdWUnXTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4geGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShhY2MpO1xufVxuXG5mdW5jdGlvbiBfaXRlcmFibGVSZWR1Y2UoeGYsIGFjYywgaXRlcikge1xuICB2YXIgc3RlcCA9IGl0ZXIubmV4dCgpO1xuICB3aGlsZSAoIXN0ZXAuZG9uZSkge1xuICAgIGFjYyA9IHhmWydAQHRyYW5zZHVjZXIvc3RlcCddKGFjYywgc3RlcC52YWx1ZSk7XG4gICAgaWYgKGFjYyAmJiBhY2NbJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJ10pIHtcbiAgICAgIGFjYyA9IGFjY1snQEB0cmFuc2R1Y2VyL3ZhbHVlJ107XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgc3RlcCA9IGl0ZXIubmV4dCgpO1xuICB9XG4gIHJldHVybiB4ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKGFjYyk7XG59XG5cbmZ1bmN0aW9uIF9tZXRob2RSZWR1Y2UoeGYsIGFjYywgb2JqLCBtZXRob2ROYW1lKSB7XG4gIHJldHVybiB4ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKG9ialttZXRob2ROYW1lXShiaW5kKHhmWydAQHRyYW5zZHVjZXIvc3RlcCddLCB4ZiksIGFjYykpO1xufVxuXG52YXIgc3ltSXRlcmF0b3IgPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyA/IFN5bWJvbC5pdGVyYXRvciA6ICdAQGl0ZXJhdG9yJztcblxuZnVuY3Rpb24gX3JlZHVjZShmbiwgYWNjLCBsaXN0KSB7XG4gIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICBmbiA9IF94d3JhcChmbik7XG4gIH1cbiAgaWYgKF9pc0FycmF5TGlrZShsaXN0KSkge1xuICAgIHJldHVybiBfYXJyYXlSZWR1Y2UoZm4sIGFjYywgbGlzdCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBsaXN0WydmYW50YXN5LWxhbmQvcmVkdWNlJ10gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gX21ldGhvZFJlZHVjZShmbiwgYWNjLCBsaXN0LCAnZmFudGFzeS1sYW5kL3JlZHVjZScpO1xuICB9XG4gIGlmIChsaXN0W3N5bUl0ZXJhdG9yXSAhPSBudWxsKSB7XG4gICAgcmV0dXJuIF9pdGVyYWJsZVJlZHVjZShmbiwgYWNjLCBsaXN0W3N5bUl0ZXJhdG9yXSgpKTtcbiAgfVxuICBpZiAodHlwZW9mIGxpc3QubmV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBfaXRlcmFibGVSZWR1Y2UoZm4sIGFjYywgbGlzdCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBsaXN0LnJlZHVjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBfbWV0aG9kUmVkdWNlKGZuLCBhY2MsIGxpc3QsICdyZWR1Y2UnKTtcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3JlZHVjZTogbGlzdCBtdXN0IGJlIGFycmF5IG9yIGl0ZXJhYmxlJyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9yZWR1Y2U7IiwiZnVuY3Rpb24gX3JlZHVjZWQoeCkge1xuICByZXR1cm4geCAmJiB4WydAQHRyYW5zZHVjZXIvcmVkdWNlZCddID8geCA6IHtcbiAgICAnQEB0cmFuc2R1Y2VyL3ZhbHVlJzogeCxcbiAgICAnQEB0cmFuc2R1Y2VyL3JlZHVjZWQnOiB0cnVlXG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IF9yZWR1Y2VkOyIsInZhciBfYXNzaWduID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2Fzc2lnbicpO1xuXG52YXIgX2lkZW50aXR5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2lkZW50aXR5Jyk7XG5cbnZhciBfaXNBcnJheUxpa2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9faXNBcnJheUxpa2UnKTtcblxudmFyIF9pc1RyYW5zZm9ybWVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2lzVHJhbnNmb3JtZXInKTtcblxudmFyIG9iak9mID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4uL29iak9mJyk7XG5cbnZhciBfc3RlcENhdEFycmF5ID0ge1xuICAnQEB0cmFuc2R1Y2VyL2luaXQnOiBBcnJheSxcbiAgJ0BAdHJhbnNkdWNlci9zdGVwJzogZnVuY3Rpb24gKHhzLCB4KSB7XG4gICAgeHMucHVzaCh4KTtcbiAgICByZXR1cm4geHM7XG4gIH0sXG4gICdAQHRyYW5zZHVjZXIvcmVzdWx0JzogX2lkZW50aXR5XG59O1xudmFyIF9zdGVwQ2F0U3RyaW5nID0ge1xuICAnQEB0cmFuc2R1Y2VyL2luaXQnOiBTdHJpbmcsXG4gICdAQHRyYW5zZHVjZXIvc3RlcCc6IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGEgKyBiO1xuICB9LFxuICAnQEB0cmFuc2R1Y2VyL3Jlc3VsdCc6IF9pZGVudGl0eVxufTtcbnZhciBfc3RlcENhdE9iamVjdCA9IHtcbiAgJ0BAdHJhbnNkdWNlci9pbml0JzogT2JqZWN0LFxuICAnQEB0cmFuc2R1Y2VyL3N0ZXAnOiBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIHJldHVybiBfYXNzaWduKHJlc3VsdCwgX2lzQXJyYXlMaWtlKGlucHV0KSA/IG9iak9mKGlucHV0WzBdLCBpbnB1dFsxXSkgOiBpbnB1dCk7XG4gIH0sXG4gICdAQHRyYW5zZHVjZXIvcmVzdWx0JzogX2lkZW50aXR5XG59O1xuXG5mdW5jdGlvbiBfc3RlcENhdChvYmopIHtcbiAgaWYgKF9pc1RyYW5zZm9ybWVyKG9iaikpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIGlmIChfaXNBcnJheUxpa2Uob2JqKSkge1xuICAgIHJldHVybiBfc3RlcENhdEFycmF5O1xuICB9XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBfc3RlcENhdFN0cmluZztcbiAgfVxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gX3N0ZXBDYXRPYmplY3Q7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY3JlYXRlIHRyYW5zZm9ybWVyIGZvciAnICsgb2JqKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gX3N0ZXBDYXQ7IiwiLyoqXG4gKiBQb2x5ZmlsbCBmcm9tIDxodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9EYXRlL3RvSVNPU3RyaW5nPi5cbiAqL1xudmFyIHBhZCA9IGZ1bmN0aW9uIHBhZChuKSB7XG4gIHJldHVybiAobiA8IDEwID8gJzAnIDogJycpICsgbjtcbn07XG5cbnZhciBfdG9JU09TdHJpbmcgPSB0eXBlb2YgRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicgPyBmdW5jdGlvbiBfdG9JU09TdHJpbmcoZCkge1xuICByZXR1cm4gZC50b0lTT1N0cmluZygpO1xufSA6IGZ1bmN0aW9uIF90b0lTT1N0cmluZyhkKSB7XG4gIHJldHVybiBkLmdldFVUQ0Z1bGxZZWFyKCkgKyAnLScgKyBwYWQoZC5nZXRVVENNb250aCgpICsgMSkgKyAnLScgKyBwYWQoZC5nZXRVVENEYXRlKCkpICsgJ1QnICsgcGFkKGQuZ2V0VVRDSG91cnMoKSkgKyAnOicgKyBwYWQoZC5nZXRVVENNaW51dGVzKCkpICsgJzonICsgcGFkKGQuZ2V0VVRDU2Vjb25kcygpKSArICcuJyArIChkLmdldFVUQ01pbGxpc2Vjb25kcygpIC8gMTAwMCkudG9GaXhlZCgzKS5zbGljZSgyLCA1KSArICdaJztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvSVNPU3RyaW5nOyIsInZhciBfY29udGFpbnMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY29udGFpbnMnKTtcblxudmFyIF9tYXAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fbWFwJyk7XG5cbnZhciBfcXVvdGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fcXVvdGUnKTtcblxudmFyIF90b0lTT1N0cmluZyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL190b0lTT1N0cmluZycpO1xuXG52YXIga2V5cyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuLi9rZXlzJyk7XG5cbnZhciByZWplY3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi4vcmVqZWN0Jyk7XG5cbmZ1bmN0aW9uIF90b1N0cmluZyh4LCBzZWVuKSB7XG4gIHZhciByZWN1ciA9IGZ1bmN0aW9uIHJlY3VyKHkpIHtcbiAgICB2YXIgeHMgPSBzZWVuLmNvbmNhdChbeF0pO1xuICAgIHJldHVybiBfY29udGFpbnMoeSwgeHMpID8gJzxDaXJjdWxhcj4nIDogX3RvU3RyaW5nKHksIHhzKTtcbiAgfTtcblxuICAvLyAgbWFwUGFpcnMgOjogKE9iamVjdCwgW1N0cmluZ10pIC0+IFtTdHJpbmddXG4gIHZhciBtYXBQYWlycyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgICByZXR1cm4gX21hcChmdW5jdGlvbiAoaykge1xuICAgICAgcmV0dXJuIF9xdW90ZShrKSArICc6ICcgKyByZWN1cihvYmpba10pO1xuICAgIH0sIGtleXMuc2xpY2UoKS5zb3J0KCkpO1xuICB9O1xuXG4gIHN3aXRjaCAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpKSB7XG4gICAgY2FzZSAnW29iamVjdCBBcmd1bWVudHNdJzpcbiAgICAgIHJldHVybiAnKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCcgKyBfbWFwKHJlY3VyLCB4KS5qb2luKCcsICcpICsgJykpJztcbiAgICBjYXNlICdbb2JqZWN0IEFycmF5XSc6XG4gICAgICByZXR1cm4gJ1snICsgX21hcChyZWN1ciwgeCkuY29uY2F0KG1hcFBhaXJzKHgsIHJlamVjdChmdW5jdGlvbiAoaykge1xuICAgICAgICByZXR1cm4gKC9eXFxkKyQvLnRlc3QoaylcbiAgICAgICAgKTtcbiAgICAgIH0sIGtleXMoeCkpKSkuam9pbignLCAnKSArICddJztcbiAgICBjYXNlICdbb2JqZWN0IEJvb2xlYW5dJzpcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgPyAnbmV3IEJvb2xlYW4oJyArIHJlY3VyKHgudmFsdWVPZigpKSArICcpJyA6IHgudG9TdHJpbmcoKTtcbiAgICBjYXNlICdbb2JqZWN0IERhdGVdJzpcbiAgICAgIHJldHVybiAnbmV3IERhdGUoJyArIChpc05hTih4LnZhbHVlT2YoKSkgPyByZWN1cihOYU4pIDogX3F1b3RlKF90b0lTT1N0cmluZyh4KSkpICsgJyknO1xuICAgIGNhc2UgJ1tvYmplY3QgTnVsbF0nOlxuICAgICAgcmV0dXJuICdudWxsJztcbiAgICBjYXNlICdbb2JqZWN0IE51bWJlcl0nOlxuICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnb2JqZWN0JyA/ICduZXcgTnVtYmVyKCcgKyByZWN1cih4LnZhbHVlT2YoKSkgKyAnKScgOiAxIC8geCA9PT0gLUluZmluaXR5ID8gJy0wJyA6IHgudG9TdHJpbmcoMTApO1xuICAgIGNhc2UgJ1tvYmplY3QgU3RyaW5nXSc6XG4gICAgICByZXR1cm4gdHlwZW9mIHggPT09ICdvYmplY3QnID8gJ25ldyBTdHJpbmcoJyArIHJlY3VyKHgudmFsdWVPZigpKSArICcpJyA6IF9xdW90ZSh4KTtcbiAgICBjYXNlICdbb2JqZWN0IFVuZGVmaW5lZF0nOlxuICAgICAgcmV0dXJuICd1bmRlZmluZWQnO1xuICAgIGRlZmF1bHQ6XG4gICAgICBpZiAodHlwZW9mIHgudG9TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFyIHJlcHIgPSB4LnRvU3RyaW5nKCk7XG4gICAgICAgIGlmIChyZXByICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICAgIHJldHVybiByZXByO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gJ3snICsgbWFwUGFpcnMoeCwga2V5cyh4KSkuam9pbignLCAnKSArICd9JztcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBfdG9TdHJpbmc7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY3VycnkyJyk7XG5cbnZhciBfcmVkdWNlZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19yZWR1Y2VkJyk7XG5cbnZhciBfeGZCYXNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX3hmQmFzZScpO1xuXG52YXIgWEFsbCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gWEFsbChmLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLmYgPSBmO1xuICAgIHRoaXMuYWxsID0gdHJ1ZTtcbiAgfVxuICBYQWxsLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWEFsbC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICBpZiAodGhpcy5hbGwpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB0cnVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICB9O1xuICBYQWxsLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgaWYgKCF0aGlzLmYoaW5wdXQpKSB7XG4gICAgICB0aGlzLmFsbCA9IGZhbHNlO1xuICAgICAgcmVzdWx0ID0gX3JlZHVjZWQodGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGZhbHNlKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgcmV0dXJuIFhBbGw7XG59KCk7XG5cbnZhciBfeGFsbCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIF94YWxsKGYsIHhmKSB7XG4gIHJldHVybiBuZXcgWEFsbChmLCB4Zik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX3hhbGw7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY3VycnkyJyk7XG5cbnZhciBfcmVkdWNlZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19yZWR1Y2VkJyk7XG5cbnZhciBfeGZCYXNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX3hmQmFzZScpO1xuXG52YXIgWEFueSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gWEFueShmLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLmYgPSBmO1xuICAgIHRoaXMuYW55ID0gZmFsc2U7XG4gIH1cbiAgWEFueS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhBbnkucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgaWYgKCF0aGlzLmFueSkge1xuICAgICAgcmVzdWx0ID0gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGZhbHNlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICB9O1xuICBYQW55LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgaWYgKHRoaXMuZihpbnB1dCkpIHtcbiAgICAgIHRoaXMuYW55ID0gdHJ1ZTtcbiAgICAgIHJlc3VsdCA9IF9yZWR1Y2VkKHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB0cnVlKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgcmV0dXJuIFhBbnk7XG59KCk7XG5cbnZhciBfeGFueSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIF94YW55KGYsIHhmKSB7XG4gIHJldHVybiBuZXcgWEFueShmLCB4Zik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX3hhbnk7IiwidmFyIF9jb25jYXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY29uY2F0Jyk7XG5cbnZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MicpO1xuXG52YXIgX3hmQmFzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194ZkJhc2UnKTtcblxudmFyIFhBcGVydHVyZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gWEFwZXJ0dXJlKG4sIHhmKSB7XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMucG9zID0gMDtcbiAgICB0aGlzLmZ1bGwgPSBmYWxzZTtcbiAgICB0aGlzLmFjYyA9IG5ldyBBcnJheShuKTtcbiAgfVxuICBYQXBlcnR1cmUucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYQXBlcnR1cmUucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgdGhpcy5hY2MgPSBudWxsO1xuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgfTtcbiAgWEFwZXJ0dXJlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgdGhpcy5zdG9yZShpbnB1dCk7XG4gICAgcmV0dXJuIHRoaXMuZnVsbCA/IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB0aGlzLmdldENvcHkoKSkgOiByZXN1bHQ7XG4gIH07XG4gIFhBcGVydHVyZS5wcm90b3R5cGUuc3RvcmUgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICB0aGlzLmFjY1t0aGlzLnBvc10gPSBpbnB1dDtcbiAgICB0aGlzLnBvcyArPSAxO1xuICAgIGlmICh0aGlzLnBvcyA9PT0gdGhpcy5hY2MubGVuZ3RoKSB7XG4gICAgICB0aGlzLnBvcyA9IDA7XG4gICAgICB0aGlzLmZ1bGwgPSB0cnVlO1xuICAgIH1cbiAgfTtcbiAgWEFwZXJ0dXJlLnByb3RvdHlwZS5nZXRDb3B5ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuYWNjLCB0aGlzLnBvcyksIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuYWNjLCAwLCB0aGlzLnBvcykpO1xuICB9O1xuXG4gIHJldHVybiBYQXBlcnR1cmU7XG59KCk7XG5cbnZhciBfeGFwZXJ0dXJlID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gX3hhcGVydHVyZShuLCB4Zikge1xuICByZXR1cm4gbmV3IFhBcGVydHVyZShuLCB4Zik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX3hhcGVydHVyZTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jdXJyeTInKTtcblxudmFyIF9mbGF0Q2F0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2ZsYXRDYXQnKTtcblxudmFyIG1hcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuLi9tYXAnKTtcblxudmFyIF94Y2hhaW4gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfeGNoYWluKGYsIHhmKSB7XG4gIHJldHVybiBtYXAoZiwgX2ZsYXRDYXQoeGYpKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfeGNoYWluOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MicpO1xuXG52YXIgX3hmQmFzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194ZkJhc2UnKTtcblxudmFyIFhEcm9wID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBYRHJvcChuLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLm4gPSBuO1xuICB9XG4gIFhEcm9wLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWERyb3AucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBfeGZCYXNlLnJlc3VsdDtcbiAgWERyb3AucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICBpZiAodGhpcy5uID4gMCkge1xuICAgICAgdGhpcy5uIC09IDE7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KTtcbiAgfTtcblxuICByZXR1cm4gWERyb3A7XG59KCk7XG5cbnZhciBfeGRyb3AgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfeGRyb3AobiwgeGYpIHtcbiAgcmV0dXJuIG5ldyBYRHJvcChuLCB4Zik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX3hkcm9wOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MicpO1xuXG52YXIgX3hmQmFzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194ZkJhc2UnKTtcblxudmFyIFhEcm9wTGFzdCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gWERyb3BMYXN0KG4sIHhmKSB7XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMucG9zID0gMDtcbiAgICB0aGlzLmZ1bGwgPSBmYWxzZTtcbiAgICB0aGlzLmFjYyA9IG5ldyBBcnJheShuKTtcbiAgfVxuICBYRHJvcExhc3QucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYRHJvcExhc3QucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgdGhpcy5hY2MgPSBudWxsO1xuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgfTtcbiAgWERyb3BMYXN0LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgaWYgKHRoaXMuZnVsbCkge1xuICAgICAgcmVzdWx0ID0gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIHRoaXMuYWNjW3RoaXMucG9zXSk7XG4gICAgfVxuICAgIHRoaXMuc3RvcmUoaW5wdXQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIFhEcm9wTGFzdC5wcm90b3R5cGUuc3RvcmUgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICB0aGlzLmFjY1t0aGlzLnBvc10gPSBpbnB1dDtcbiAgICB0aGlzLnBvcyArPSAxO1xuICAgIGlmICh0aGlzLnBvcyA9PT0gdGhpcy5hY2MubGVuZ3RoKSB7XG4gICAgICB0aGlzLnBvcyA9IDA7XG4gICAgICB0aGlzLmZ1bGwgPSB0cnVlO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gWERyb3BMYXN0O1xufSgpO1xuXG52YXIgX3hkcm9wTGFzdCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIF94ZHJvcExhc3QobiwgeGYpIHtcbiAgcmV0dXJuIG5ldyBYRHJvcExhc3QobiwgeGYpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF94ZHJvcExhc3Q7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY3VycnkyJyk7XG5cbnZhciBfcmVkdWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX3JlZHVjZScpO1xuXG52YXIgX3hmQmFzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194ZkJhc2UnKTtcblxudmFyIFhEcm9wTGFzdFdoaWxlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBYRHJvcExhc3RXaGlsZShmbiwgeGYpIHtcbiAgICB0aGlzLmYgPSBmbjtcbiAgICB0aGlzLnJldGFpbmVkID0gW107XG4gICAgdGhpcy54ZiA9IHhmO1xuICB9XG4gIFhEcm9wTGFzdFdoaWxlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWERyb3BMYXN0V2hpbGUucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgdGhpcy5yZXRhaW5lZCA9IG51bGw7XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICB9O1xuICBYRHJvcExhc3RXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmYoaW5wdXQpID8gdGhpcy5yZXRhaW4ocmVzdWx0LCBpbnB1dCkgOiB0aGlzLmZsdXNoKHJlc3VsdCwgaW5wdXQpO1xuICB9O1xuICBYRHJvcExhc3RXaGlsZS5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIHJlc3VsdCA9IF9yZWR1Y2UodGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSwgcmVzdWx0LCB0aGlzLnJldGFpbmVkKTtcbiAgICB0aGlzLnJldGFpbmVkID0gW107XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBpbnB1dCk7XG4gIH07XG4gIFhEcm9wTGFzdFdoaWxlLnByb3RvdHlwZS5yZXRhaW4gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIHRoaXMucmV0YWluZWQucHVzaChpbnB1dCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICByZXR1cm4gWERyb3BMYXN0V2hpbGU7XG59KCk7XG5cbnZhciBfeGRyb3BMYXN0V2hpbGUgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfeGRyb3BMYXN0V2hpbGUoZm4sIHhmKSB7XG4gIHJldHVybiBuZXcgWERyb3BMYXN0V2hpbGUoZm4sIHhmKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfeGRyb3BMYXN0V2hpbGU7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY3VycnkyJyk7XG5cbnZhciBfeGZCYXNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX3hmQmFzZScpO1xuXG52YXIgWERyb3BSZXBlYXRzV2l0aCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gWERyb3BSZXBlYXRzV2l0aChwcmVkLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLnByZWQgPSBwcmVkO1xuICAgIHRoaXMubGFzdFZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc2VlbkZpcnN0VmFsdWUgPSBmYWxzZTtcbiAgfVxuXG4gIFhEcm9wUmVwZWF0c1dpdGgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYRHJvcFJlcGVhdHNXaXRoLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gX3hmQmFzZS5yZXN1bHQ7XG4gIFhEcm9wUmVwZWF0c1dpdGgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICB2YXIgc2FtZUFzTGFzdCA9IGZhbHNlO1xuICAgIGlmICghdGhpcy5zZWVuRmlyc3RWYWx1ZSkge1xuICAgICAgdGhpcy5zZWVuRmlyc3RWYWx1ZSA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnByZWQodGhpcy5sYXN0VmFsdWUsIGlucHV0KSkge1xuICAgICAgc2FtZUFzTGFzdCA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMubGFzdFZhbHVlID0gaW5wdXQ7XG4gICAgcmV0dXJuIHNhbWVBc0xhc3QgPyByZXN1bHQgOiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpO1xuICB9O1xuXG4gIHJldHVybiBYRHJvcFJlcGVhdHNXaXRoO1xufSgpO1xuXG52YXIgX3hkcm9wUmVwZWF0c1dpdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfeGRyb3BSZXBlYXRzV2l0aChwcmVkLCB4Zikge1xuICByZXR1cm4gbmV3IFhEcm9wUmVwZWF0c1dpdGgocHJlZCwgeGYpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF94ZHJvcFJlcGVhdHNXaXRoOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MicpO1xuXG52YXIgX3hmQmFzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194ZkJhc2UnKTtcblxudmFyIFhEcm9wV2hpbGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIFhEcm9wV2hpbGUoZiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5mID0gZjtcbiAgfVxuICBYRHJvcFdoaWxlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWERyb3BXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IF94ZkJhc2UucmVzdWx0O1xuICBYRHJvcFdoaWxlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgaWYgKHRoaXMuZikge1xuICAgICAgaWYgKHRoaXMuZihpbnB1dCkpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHRoaXMuZiA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpO1xuICB9O1xuXG4gIHJldHVybiBYRHJvcFdoaWxlO1xufSgpO1xuXG52YXIgX3hkcm9wV2hpbGUgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfeGRyb3BXaGlsZShmLCB4Zikge1xuICByZXR1cm4gbmV3IFhEcm9wV2hpbGUoZiwgeGYpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF94ZHJvcFdoaWxlOyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9pbml0J10oKTtcbiAgfSxcbiAgcmVzdWx0OiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICB9XG59OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MicpO1xuXG52YXIgX3hmQmFzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194ZkJhc2UnKTtcblxudmFyIFhGaWx0ZXIgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIFhGaWx0ZXIoZiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5mID0gZjtcbiAgfVxuICBYRmlsdGVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWEZpbHRlci5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IF94ZkJhc2UucmVzdWx0O1xuICBYRmlsdGVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZihpbnB1dCkgPyB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpIDogcmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiBYRmlsdGVyO1xufSgpO1xuXG52YXIgX3hmaWx0ZXIgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfeGZpbHRlcihmLCB4Zikge1xuICByZXR1cm4gbmV3IFhGaWx0ZXIoZiwgeGYpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF94ZmlsdGVyOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MicpO1xuXG52YXIgX3JlZHVjZWQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fcmVkdWNlZCcpO1xuXG52YXIgX3hmQmFzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194ZkJhc2UnKTtcblxudmFyIFhGaW5kID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBYRmluZChmLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLmYgPSBmO1xuICAgIHRoaXMuZm91bmQgPSBmYWxzZTtcbiAgfVxuICBYRmluZC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhGaW5kLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIGlmICghdGhpcy5mb3VuZCkge1xuICAgICAgcmVzdWx0ID0gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIHZvaWQgMCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgfTtcbiAgWEZpbmQucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICBpZiAodGhpcy5mKGlucHV0KSkge1xuICAgICAgdGhpcy5mb3VuZCA9IHRydWU7XG4gICAgICByZXN1bHQgPSBfcmVkdWNlZCh0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICByZXR1cm4gWEZpbmQ7XG59KCk7XG5cbnZhciBfeGZpbmQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfeGZpbmQoZiwgeGYpIHtcbiAgcmV0dXJuIG5ldyBYRmluZChmLCB4Zik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX3hmaW5kOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MicpO1xuXG52YXIgX3JlZHVjZWQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fcmVkdWNlZCcpO1xuXG52YXIgX3hmQmFzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194ZkJhc2UnKTtcblxudmFyIFhGaW5kSW5kZXggPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIFhGaW5kSW5kZXgoZiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5mID0gZjtcbiAgICB0aGlzLmlkeCA9IC0xO1xuICAgIHRoaXMuZm91bmQgPSBmYWxzZTtcbiAgfVxuICBYRmluZEluZGV4LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWEZpbmRJbmRleC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICBpZiAoIXRoaXMuZm91bmQpIHtcbiAgICAgIHJlc3VsdCA9IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCAtMSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgfTtcbiAgWEZpbmRJbmRleC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIHRoaXMuaWR4ICs9IDE7XG4gICAgaWYgKHRoaXMuZihpbnB1dCkpIHtcbiAgICAgIHRoaXMuZm91bmQgPSB0cnVlO1xuICAgICAgcmVzdWx0ID0gX3JlZHVjZWQodGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIHRoaXMuaWR4KSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgcmV0dXJuIFhGaW5kSW5kZXg7XG59KCk7XG5cbnZhciBfeGZpbmRJbmRleCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIF94ZmluZEluZGV4KGYsIHhmKSB7XG4gIHJldHVybiBuZXcgWEZpbmRJbmRleChmLCB4Zik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX3hmaW5kSW5kZXg7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY3VycnkyJyk7XG5cbnZhciBfeGZCYXNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX3hmQmFzZScpO1xuXG52YXIgWEZpbmRMYXN0ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBYRmluZExhc3QoZiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5mID0gZjtcbiAgfVxuICBYRmluZExhc3QucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYRmluZExhc3QucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSh0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdGhpcy5sYXN0KSk7XG4gIH07XG4gIFhGaW5kTGFzdC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIGlmICh0aGlzLmYoaW5wdXQpKSB7XG4gICAgICB0aGlzLmxhc3QgPSBpbnB1dDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICByZXR1cm4gWEZpbmRMYXN0O1xufSgpO1xuXG52YXIgX3hmaW5kTGFzdCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIF94ZmluZExhc3QoZiwgeGYpIHtcbiAgcmV0dXJuIG5ldyBYRmluZExhc3QoZiwgeGYpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF94ZmluZExhc3Q7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY3VycnkyJyk7XG5cbnZhciBfeGZCYXNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX3hmQmFzZScpO1xuXG52YXIgWEZpbmRMYXN0SW5kZXggPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIFhGaW5kTGFzdEluZGV4KGYsIHhmKSB7XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMuZiA9IGY7XG4gICAgdGhpcy5pZHggPSAtMTtcbiAgICB0aGlzLmxhc3RJZHggPSAtMTtcbiAgfVxuICBYRmluZExhc3RJbmRleC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhGaW5kTGFzdEluZGV4LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10odGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIHRoaXMubGFzdElkeCkpO1xuICB9O1xuICBYRmluZExhc3RJbmRleC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIHRoaXMuaWR4ICs9IDE7XG4gICAgaWYgKHRoaXMuZihpbnB1dCkpIHtcbiAgICAgIHRoaXMubGFzdElkeCA9IHRoaXMuaWR4O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiBYRmluZExhc3RJbmRleDtcbn0oKTtcblxudmFyIF94ZmluZExhc3RJbmRleCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIF94ZmluZExhc3RJbmRleChmLCB4Zikge1xuICByZXR1cm4gbmV3IFhGaW5kTGFzdEluZGV4KGYsIHhmKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfeGZpbmRMYXN0SW5kZXg7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fY3VycnkyJyk7XG5cbnZhciBfeGZCYXNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX3hmQmFzZScpO1xuXG52YXIgWE1hcCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gWE1hcChmLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLmYgPSBmO1xuICB9XG4gIFhNYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYTWFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gX3hmQmFzZS5yZXN1bHQ7XG4gIFhNYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIHRoaXMuZihpbnB1dCkpO1xuICB9O1xuXG4gIHJldHVybiBYTWFwO1xufSgpO1xuXG52YXIgX3htYXAgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfeG1hcChmLCB4Zikge1xuICByZXR1cm4gbmV3IFhNYXAoZiwgeGYpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IF94bWFwOyIsInZhciBfY3VycnlOID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5TicpO1xuXG52YXIgX2hhcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19oYXMnKTtcblxudmFyIF94ZkJhc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cbnZhciBYUmVkdWNlQnkgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIFhSZWR1Y2VCeSh2YWx1ZUZuLCB2YWx1ZUFjYywga2V5Rm4sIHhmKSB7XG4gICAgdGhpcy52YWx1ZUZuID0gdmFsdWVGbjtcbiAgICB0aGlzLnZhbHVlQWNjID0gdmFsdWVBY2M7XG4gICAgdGhpcy5rZXlGbiA9IGtleUZuO1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLmlucHV0cyA9IHt9O1xuICB9XG4gIFhSZWR1Y2VCeS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhSZWR1Y2VCeS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICB2YXIga2V5O1xuICAgIGZvciAoa2V5IGluIHRoaXMuaW5wdXRzKSB7XG4gICAgICBpZiAoX2hhcyhrZXksIHRoaXMuaW5wdXRzKSkge1xuICAgICAgICByZXN1bHQgPSB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdGhpcy5pbnB1dHNba2V5XSk7XG4gICAgICAgIGlmIChyZXN1bHRbJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJ10pIHtcbiAgICAgICAgICByZXN1bHQgPSByZXN1bHRbJ0BAdHJhbnNkdWNlci92YWx1ZSddO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaW5wdXRzID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gIH07XG4gIFhSZWR1Y2VCeS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIHZhciBrZXkgPSB0aGlzLmtleUZuKGlucHV0KTtcbiAgICB0aGlzLmlucHV0c1trZXldID0gdGhpcy5pbnB1dHNba2V5XSB8fCBba2V5LCB0aGlzLnZhbHVlQWNjXTtcbiAgICB0aGlzLmlucHV0c1trZXldWzFdID0gdGhpcy52YWx1ZUZuKHRoaXMuaW5wdXRzW2tleV1bMV0sIGlucHV0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHJldHVybiBYUmVkdWNlQnk7XG59KCk7XG5cbnZhciBfeHJlZHVjZUJ5ID0gLyojX19QVVJFX18qL19jdXJyeU4oNCwgW10sIGZ1bmN0aW9uIF94cmVkdWNlQnkodmFsdWVGbiwgdmFsdWVBY2MsIGtleUZuLCB4Zikge1xuICByZXR1cm4gbmV3IFhSZWR1Y2VCeSh2YWx1ZUZuLCB2YWx1ZUFjYywga2V5Rm4sIHhmKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfeHJlZHVjZUJ5OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MicpO1xuXG52YXIgX3JlZHVjZWQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fcmVkdWNlZCcpO1xuXG52YXIgX3hmQmFzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194ZkJhc2UnKTtcblxudmFyIFhUYWtlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBYVGFrZShuLCB4Zikge1xuICAgIHRoaXMueGYgPSB4ZjtcbiAgICB0aGlzLm4gPSBuO1xuICAgIHRoaXMuaSA9IDA7XG4gIH1cbiAgWFRha2UucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICBYVGFrZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IF94ZkJhc2UucmVzdWx0O1xuICBYVGFrZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIHRoaXMuaSArPSAxO1xuICAgIHZhciByZXQgPSB0aGlzLm4gPT09IDAgPyByZXN1bHQgOiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpO1xuICAgIHJldHVybiB0aGlzLm4gPj0gMCAmJiB0aGlzLmkgPj0gdGhpcy5uID8gX3JlZHVjZWQocmV0KSA6IHJldDtcbiAgfTtcblxuICByZXR1cm4gWFRha2U7XG59KCk7XG5cbnZhciBfeHRha2UgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBfeHRha2UobiwgeGYpIHtcbiAgcmV0dXJuIG5ldyBYVGFrZShuLCB4Zik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX3h0YWtlOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vX2N1cnJ5MicpO1xuXG52YXIgX3JlZHVjZWQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9fcmVkdWNlZCcpO1xuXG52YXIgX3hmQmFzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL194ZkJhc2UnKTtcblxudmFyIFhUYWtlV2hpbGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuXG4gIGZ1bmN0aW9uIFhUYWtlV2hpbGUoZiwgeGYpIHtcbiAgICB0aGlzLnhmID0geGY7XG4gICAgdGhpcy5mID0gZjtcbiAgfVxuICBYVGFrZVdoaWxlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgWFRha2VXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IF94ZkJhc2UucmVzdWx0O1xuICBYVGFrZVdoaWxlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZihpbnB1dCkgPyB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpIDogX3JlZHVjZWQocmVzdWx0KTtcbiAgfTtcblxuICByZXR1cm4gWFRha2VXaGlsZTtcbn0oKTtcblxudmFyIF94dGFrZVdoaWxlID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gX3h0YWtlV2hpbGUoZiwgeGYpIHtcbiAgcmV0dXJuIG5ldyBYVGFrZVdoaWxlKGYsIHhmKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBfeHRha2VXaGlsZTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL19jdXJyeTInKTtcblxudmFyIF94ZkJhc2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9feGZCYXNlJyk7XG5cbnZhciBYVGFwID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBYVGFwKGYsIHhmKSB7XG4gICAgdGhpcy54ZiA9IHhmO1xuICAgIHRoaXMuZiA9IGY7XG4gIH1cbiAgWFRhcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gIFhUYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBfeGZCYXNlLnJlc3VsdDtcbiAgWFRhcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgIHRoaXMuZihpbnB1dCk7XG4gICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBpbnB1dCk7XG4gIH07XG5cbiAgcmV0dXJuIFhUYXA7XG59KCk7XG5cbnZhciBfeHRhcCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIF94dGFwKGYsIHhmKSB7XG4gIHJldHVybiBuZXcgWFRhcChmLCB4Zik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gX3h0YXA7IiwidmFyIFhXcmFwID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gWFdyYXAoZm4pIHtcbiAgICB0aGlzLmYgPSBmbjtcbiAgfVxuICBYV3JhcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbml0IG5vdCBpbXBsZW1lbnRlZCBvbiBYV3JhcCcpO1xuICB9O1xuICBYV3JhcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uIChhY2MpIHtcbiAgICByZXR1cm4gYWNjO1xuICB9O1xuICBYV3JhcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAoYWNjLCB4KSB7XG4gICAgcmV0dXJuIHRoaXMuZihhY2MsIHgpO1xuICB9O1xuXG4gIHJldHVybiBYV3JhcDtcbn0oKTtcblxuZnVuY3Rpb24gX3h3cmFwKGZuKSB7XG4gIHJldHVybiBuZXcgWFdyYXAoZm4pO1xufVxubW9kdWxlLmV4cG9ydHMgPSBfeHdyYXA7IiwidmFyIF9jb250YWlucyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jb250YWlucycpO1xuXG52YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9maWx0ZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZmlsdGVyJyk7XG5cbnZhciBmbGlwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZmxpcCcpO1xuXG52YXIgdW5pcSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3VuaXEnKTtcblxuLyoqXG4gKiBDb21iaW5lcyB0d28gbGlzdHMgaW50byBhIHNldCAoaS5lLiBubyBkdXBsaWNhdGVzKSBjb21wb3NlZCBvZiB0aG9zZVxuICogZWxlbWVudHMgY29tbW9uIHRvIGJvdGggbGlzdHMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgWypdIC0+IFsqXSAtPiBbKl1cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QxIFRoZSBmaXJzdCBsaXN0LlxuICogQHBhcmFtIHtBcnJheX0gbGlzdDIgVGhlIHNlY29uZCBsaXN0LlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBsaXN0IG9mIGVsZW1lbnRzIGZvdW5kIGluIGJvdGggYGxpc3QxYCBhbmQgYGxpc3QyYC5cbiAqIEBzZWUgUi5pbm5lckpvaW5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmludGVyc2VjdGlvbihbMSwyLDMsNF0sIFs3LDYsNSw0LDNdKTsgLy89PiBbNCwgM11cbiAqL1xuXG5cbnZhciBpbnRlcnNlY3Rpb24gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBpbnRlcnNlY3Rpb24obGlzdDEsIGxpc3QyKSB7XG4gIHZhciBsb29rdXBMaXN0LCBmaWx0ZXJlZExpc3Q7XG4gIGlmIChsaXN0MS5sZW5ndGggPiBsaXN0Mi5sZW5ndGgpIHtcbiAgICBsb29rdXBMaXN0ID0gbGlzdDE7XG4gICAgZmlsdGVyZWRMaXN0ID0gbGlzdDI7XG4gIH0gZWxzZSB7XG4gICAgbG9va3VwTGlzdCA9IGxpc3QyO1xuICAgIGZpbHRlcmVkTGlzdCA9IGxpc3QxO1xuICB9XG4gIHJldHVybiB1bmlxKF9maWx0ZXIoZmxpcChfY29udGFpbnMpKGxvb2t1cExpc3QpLCBmaWx0ZXJlZExpc3QpKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBpbnRlcnNlY3Rpb247IiwidmFyIF9jaGVja0Zvck1ldGhvZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jaGVja0Zvck1ldGhvZCcpO1xuXG52YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGxpc3Qgd2l0aCB0aGUgc2VwYXJhdG9yIGludGVycG9zZWQgYmV0d2VlbiBlbGVtZW50cy5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgaW50ZXJzcGVyc2VgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE0LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIGEgLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHsqfSBzZXBhcmF0b3IgVGhlIGVsZW1lbnQgdG8gYWRkIHRvIHRoZSBsaXN0LlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBiZSBpbnRlcnBvc2VkLlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBuZXcgbGlzdC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmludGVyc3BlcnNlKCduJywgWydiYScsICdhJywgJ2EnXSk7IC8vPT4gWydiYScsICduJywgJ2EnLCAnbicsICdhJ11cbiAqL1xuXG5cbnZhciBpbnRlcnNwZXJzZSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKCAvKiNfX1BVUkVfXyovX2NoZWNrRm9yTWV0aG9kKCdpbnRlcnNwZXJzZScsIGZ1bmN0aW9uIGludGVyc3BlcnNlKHNlcGFyYXRvciwgbGlzdCkge1xuICB2YXIgb3V0ID0gW107XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHdoaWxlIChpZHggPCBsZW5ndGgpIHtcbiAgICBpZiAoaWR4ID09PSBsZW5ndGggLSAxKSB7XG4gICAgICBvdXQucHVzaChsaXN0W2lkeF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQucHVzaChsaXN0W2lkeF0sIHNlcGFyYXRvcik7XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBvdXQ7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IGludGVyc3BlcnNlOyIsInZhciBfY2xvbmUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY2xvbmUnKTtcblxudmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbnZhciBfaXNUcmFuc2Zvcm1lciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19pc1RyYW5zZm9ybWVyJyk7XG5cbnZhciBfcmVkdWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3JlZHVjZScpO1xuXG52YXIgX3N0ZXBDYXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fc3RlcENhdCcpO1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIGl0ZW1zIG9mIHRoZSBsaXN0IHdpdGggdGhlIHRyYW5zZHVjZXIgYW5kIGFwcGVuZHMgdGhlXG4gKiB0cmFuc2Zvcm1lZCBpdGVtcyB0byB0aGUgYWNjdW11bGF0b3IgdXNpbmcgYW4gYXBwcm9wcmlhdGUgaXRlcmF0b3IgZnVuY3Rpb25cbiAqIGJhc2VkIG9uIHRoZSBhY2N1bXVsYXRvciB0eXBlLlxuICpcbiAqIFRoZSBhY2N1bXVsYXRvciBjYW4gYmUgYW4gYXJyYXksIHN0cmluZywgb2JqZWN0IG9yIGEgdHJhbnNmb3JtZXIuIEl0ZXJhdGVkXG4gKiBpdGVtcyB3aWxsIGJlIGFwcGVuZGVkIHRvIGFycmF5cyBhbmQgY29uY2F0ZW5hdGVkIHRvIHN0cmluZ3MuIE9iamVjdHMgd2lsbFxuICogYmUgbWVyZ2VkIGRpcmVjdGx5IG9yIDItaXRlbSBhcnJheXMgd2lsbCBiZSBtZXJnZWQgYXMga2V5LCB2YWx1ZSBwYWlycy5cbiAqXG4gKiBUaGUgYWNjdW11bGF0b3IgY2FuIGFsc28gYmUgYSB0cmFuc2Zvcm1lciBvYmplY3QgdGhhdCBwcm92aWRlcyBhIDItYXJpdHlcbiAqIHJlZHVjaW5nIGl0ZXJhdG9yIGZ1bmN0aW9uLCBzdGVwLCAwLWFyaXR5IGluaXRpYWwgdmFsdWUgZnVuY3Rpb24sIGluaXQsIGFuZFxuICogMS1hcml0eSByZXN1bHQgZXh0cmFjdGlvbiBmdW5jdGlvbiByZXN1bHQuIFRoZSBzdGVwIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlXG4gKiBpdGVyYXRvciBmdW5jdGlvbiBpbiByZWR1Y2UuIFRoZSByZXN1bHQgZnVuY3Rpb24gaXMgdXNlZCB0byBjb252ZXJ0IHRoZVxuICogZmluYWwgYWNjdW11bGF0b3IgaW50byB0aGUgcmV0dXJuIHR5cGUgYW5kIGluIG1vc3QgY2FzZXMgaXMgUi5pZGVudGl0eS4gVGhlXG4gKiBpbml0IGZ1bmN0aW9uIGlzIHVzZWQgdG8gcHJvdmlkZSB0aGUgaW5pdGlhbCBhY2N1bXVsYXRvci5cbiAqXG4gKiBUaGUgaXRlcmF0aW9uIGlzIHBlcmZvcm1lZCB3aXRoIFtgUi5yZWR1Y2VgXSgjcmVkdWNlKSBhZnRlciBpbml0aWFsaXppbmcgdGhlXG4gKiB0cmFuc2R1Y2VyLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEyLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIGEgLT4gKGIgLT4gYikgLT4gW2NdIC0+IGFcbiAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBpbml0aWFsIGFjY3VtdWxhdG9yIHZhbHVlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0geGYgVGhlIHRyYW5zZHVjZXIgZnVuY3Rpb24uIFJlY2VpdmVzIGEgdHJhbnNmb3JtZXIgYW5kIHJldHVybnMgYSB0cmFuc2Zvcm1lci5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7Kn0gVGhlIGZpbmFsLCBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbnVtYmVycyA9IFsxLCAyLCAzLCA0XTtcbiAqICAgICAgdmFyIHRyYW5zZHVjZXIgPSBSLmNvbXBvc2UoUi5tYXAoUi5hZGQoMSkpLCBSLnRha2UoMikpO1xuICpcbiAqICAgICAgUi5pbnRvKFtdLCB0cmFuc2R1Y2VyLCBudW1iZXJzKTsgLy89PiBbMiwgM11cbiAqXG4gKiAgICAgIHZhciBpbnRvQXJyYXkgPSBSLmludG8oW10pO1xuICogICAgICBpbnRvQXJyYXkodHJhbnNkdWNlciwgbnVtYmVycyk7IC8vPT4gWzIsIDNdXG4gKi9cblxuXG52YXIgaW50byA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIGludG8oYWNjLCB4ZiwgbGlzdCkge1xuICByZXR1cm4gX2lzVHJhbnNmb3JtZXIoYWNjKSA/IF9yZWR1Y2UoeGYoYWNjKSwgYWNjWydAQHRyYW5zZHVjZXIvaW5pdCddKCksIGxpc3QpIDogX3JlZHVjZSh4Zihfc3RlcENhdChhY2MpKSwgX2Nsb25lKGFjYywgW10sIFtdLCBmYWxzZSksIGxpc3QpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGludG87IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBfaGFzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2hhcycpO1xuXG52YXIga2V5cyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqXG4gKiBTYW1lIGFzIFtgUi5pbnZlcnRPYmpgXSgjaW52ZXJ0T2JqKSwgaG93ZXZlciB0aGlzIGFjY291bnRzIGZvciBvYmplY3RzIHdpdGhcbiAqIGR1cGxpY2F0ZSB2YWx1ZXMgYnkgcHV0dGluZyB0aGUgdmFsdWVzIGludG8gYW4gYXJyYXkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHtzOiB4fSAtPiB7eDogWyBzLCAuLi4gXX1cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCBvciBhcnJheSB0byBpbnZlcnRcbiAqIEByZXR1cm4ge09iamVjdH0gb3V0IEEgbmV3IG9iamVjdCB3aXRoIGtleXMgaW4gYW4gYXJyYXkuXG4gKiBAc2VlIFIuaW52ZXJ0T2JqXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHJhY2VSZXN1bHRzQnlGaXJzdE5hbWUgPSB7XG4gKiAgICAgICAgZmlyc3Q6ICdhbGljZScsXG4gKiAgICAgICAgc2Vjb25kOiAnamFrZScsXG4gKiAgICAgICAgdGhpcmQ6ICdhbGljZScsXG4gKiAgICAgIH07XG4gKiAgICAgIFIuaW52ZXJ0KHJhY2VSZXN1bHRzQnlGaXJzdE5hbWUpO1xuICogICAgICAvLz0+IHsgJ2FsaWNlJzogWydmaXJzdCcsICd0aGlyZCddLCAnamFrZSc6WydzZWNvbmQnXSB9XG4gKi9cblxuXG52YXIgaW52ZXJ0ID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gaW52ZXJ0KG9iaikge1xuICB2YXIgcHJvcHMgPSBrZXlzKG9iaik7XG4gIHZhciBsZW4gPSBwcm9wcy5sZW5ndGg7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgb3V0ID0ge307XG5cbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpZHhdO1xuICAgIHZhciB2YWwgPSBvYmpba2V5XTtcbiAgICB2YXIgbGlzdCA9IF9oYXModmFsLCBvdXQpID8gb3V0W3ZhbF0gOiBvdXRbdmFsXSA9IFtdO1xuICAgIGxpc3RbbGlzdC5sZW5ndGhdID0ga2V5O1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBvdXQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gaW52ZXJ0OyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIga2V5cyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBrZXlzIG9mIHRoZSBnaXZlbiBvYmplY3QgYXMgdmFsdWVzLCBhbmQgdGhlXG4gKiB2YWx1ZXMgb2YgdGhlIGdpdmVuIG9iamVjdCwgd2hpY2ggYXJlIGNvZXJjZWQgdG8gc3RyaW5ncywgYXMga2V5cy4gTm90ZVxuICogdGhhdCB0aGUgbGFzdCBrZXkgZm91bmQgaXMgcHJlZmVycmVkIHdoZW4gaGFuZGxpbmcgdGhlIHNhbWUgdmFsdWUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHtzOiB4fSAtPiB7eDogc31cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCBvciBhcnJheSB0byBpbnZlcnRcbiAqIEByZXR1cm4ge09iamVjdH0gb3V0IEEgbmV3IG9iamVjdFxuICogQHNlZSBSLmludmVydFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciByYWNlUmVzdWx0cyA9IHtcbiAqICAgICAgICBmaXJzdDogJ2FsaWNlJyxcbiAqICAgICAgICBzZWNvbmQ6ICdqYWtlJ1xuICogICAgICB9O1xuICogICAgICBSLmludmVydE9iaihyYWNlUmVzdWx0cyk7XG4gKiAgICAgIC8vPT4geyAnYWxpY2UnOiAnZmlyc3QnLCAnamFrZSc6J3NlY29uZCcgfVxuICpcbiAqICAgICAgLy8gQWx0ZXJuYXRpdmVseTpcbiAqICAgICAgdmFyIHJhY2VSZXN1bHRzID0gWydhbGljZScsICdqYWtlJ107XG4gKiAgICAgIFIuaW52ZXJ0T2JqKHJhY2VSZXN1bHRzKTtcbiAqICAgICAgLy89PiB7ICdhbGljZSc6ICcwJywgJ2pha2UnOicxJyB9XG4gKi9cblxuXG52YXIgaW52ZXJ0T2JqID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gaW52ZXJ0T2JqKG9iaikge1xuICB2YXIgcHJvcHMgPSBrZXlzKG9iaik7XG4gIHZhciBsZW4gPSBwcm9wcy5sZW5ndGg7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgb3V0ID0ge307XG5cbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpZHhdO1xuICAgIG91dFtvYmpba2V5XV0gPSBrZXk7XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIG91dDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBpbnZlcnRPYmo7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfaXNGdW5jdGlvbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19pc0Z1bmN0aW9uJyk7XG5cbnZhciBjdXJyeU4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jdXJyeU4nKTtcblxudmFyIHRvU3RyaW5nID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqXG4gKiBUdXJucyBhIG5hbWVkIG1ldGhvZCB3aXRoIGEgc3BlY2lmaWVkIGFyaXR5IGludG8gYSBmdW5jdGlvbiB0aGF0IGNhbiBiZVxuICogY2FsbGVkIGRpcmVjdGx5IHN1cHBsaWVkIHdpdGggYXJndW1lbnRzIGFuZCBhIHRhcmdldCBvYmplY3QuXG4gKlxuICogVGhlIHJldHVybmVkIGZ1bmN0aW9uIGlzIGN1cnJpZWQgYW5kIGFjY2VwdHMgYGFyaXR5ICsgMWAgcGFyYW1ldGVycyB3aGVyZVxuICogdGhlIGZpbmFsIHBhcmFtZXRlciBpcyB0aGUgdGFyZ2V0IG9iamVjdC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IChhIC0+IGIgLT4gLi4uIC0+IG4gLT4gT2JqZWN0IC0+ICopXG4gKiBAcGFyYW0ge051bWJlcn0gYXJpdHkgTnVtYmVyIG9mIGFyZ3VtZW50cyB0aGUgcmV0dXJuZWQgZnVuY3Rpb24gc2hvdWxkIHRha2VcbiAqICAgICAgICBiZWZvcmUgdGhlIHRhcmdldCBvYmplY3QuXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kIE5hbWUgb2YgdGhlIG1ldGhvZCB0byBjYWxsLlxuICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3IGN1cnJpZWQgZnVuY3Rpb24uXG4gKiBAc2VlIFIuY29uc3RydWN0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHNsaWNlRnJvbSA9IFIuaW52b2tlcigxLCAnc2xpY2UnKTtcbiAqICAgICAgc2xpY2VGcm9tKDYsICdhYmNkZWZnaGlqa2xtJyk7IC8vPT4gJ2doaWprbG0nXG4gKiAgICAgIHZhciBzbGljZUZyb202ID0gUi5pbnZva2VyKDIsICdzbGljZScpKDYpO1xuICogICAgICBzbGljZUZyb202KDgsICdhYmNkZWZnaGlqa2xtJyk7IC8vPT4gJ2doJ1xuICogQHN5bWIgUi5pbnZva2VyKDAsICdtZXRob2QnKShvKSA9IG9bJ21ldGhvZCddKClcbiAqIEBzeW1iIFIuaW52b2tlcigxLCAnbWV0aG9kJykoYSwgbykgPSBvWydtZXRob2QnXShhKVxuICogQHN5bWIgUi5pbnZva2VyKDIsICdtZXRob2QnKShhLCBiLCBvKSA9IG9bJ21ldGhvZCddKGEsIGIpXG4gKi9cblxuXG52YXIgaW52b2tlciA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGludm9rZXIoYXJpdHksIG1ldGhvZCkge1xuICByZXR1cm4gY3VycnlOKGFyaXR5ICsgMSwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB0YXJnZXQgPSBhcmd1bWVudHNbYXJpdHldO1xuICAgIGlmICh0YXJnZXQgIT0gbnVsbCAmJiBfaXNGdW5jdGlvbih0YXJnZXRbbWV0aG9kXSkpIHtcbiAgICAgIHJldHVybiB0YXJnZXRbbWV0aG9kXS5hcHBseSh0YXJnZXQsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgYXJpdHkpKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcih0b1N0cmluZyh0YXJnZXQpICsgJyBkb2VzIG5vdCBoYXZlIGEgbWV0aG9kIG5hbWVkIFwiJyArIG1ldGhvZCArICdcIicpO1xuICB9KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBpbnZva2VyOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFNlZSBpZiBhbiBvYmplY3QgKGB2YWxgKSBpcyBhbiBpbnN0YW5jZSBvZiB0aGUgc3VwcGxpZWQgY29uc3RydWN0b3IuIFRoaXNcbiAqIGZ1bmN0aW9uIHdpbGwgY2hlY2sgdXAgdGhlIGluaGVyaXRhbmNlIGNoYWluLCBpZiBhbnkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMy4wXG4gKiBAY2F0ZWdvcnkgVHlwZVxuICogQHNpZyAoKiAtPiB7Kn0pIC0+IGEgLT4gQm9vbGVhblxuICogQHBhcmFtIHtPYmplY3R9IGN0b3IgQSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5pcyhPYmplY3QsIHt9KTsgLy89PiB0cnVlXG4gKiAgICAgIFIuaXMoTnVtYmVyLCAxKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuaXMoT2JqZWN0LCAxKTsgLy89PiBmYWxzZVxuICogICAgICBSLmlzKFN0cmluZywgJ3MnKTsgLy89PiB0cnVlXG4gKiAgICAgIFIuaXMoU3RyaW5nLCBuZXcgU3RyaW5nKCcnKSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLmlzKE9iamVjdCwgbmV3IFN0cmluZygnJykpOyAvLz0+IHRydWVcbiAqICAgICAgUi5pcyhPYmplY3QsICdzJyk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5pcyhOdW1iZXIsIHt9KTsgLy89PiBmYWxzZVxuICovXG5cblxudmFyIGlzID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gaXMoQ3RvciwgdmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwuY29uc3RydWN0b3IgPT09IEN0b3IgfHwgdmFsIGluc3RhbmNlb2YgQ3Rvcjtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBpczsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIGVtcHR5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZW1wdHknKTtcblxudmFyIGVxdWFscyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2VxdWFscycpO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBpdHMgdHlwZSdzIGVtcHR5IHZhbHVlOyBgZmFsc2VgXG4gKiBvdGhlcndpc2UuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgYSAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9IHhcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAc2VlIFIuZW1wdHlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmlzRW1wdHkoWzEsIDIsIDNdKTsgICAvLz0+IGZhbHNlXG4gKiAgICAgIFIuaXNFbXB0eShbXSk7ICAgICAgICAgIC8vPT4gdHJ1ZVxuICogICAgICBSLmlzRW1wdHkoJycpOyAgICAgICAgICAvLz0+IHRydWVcbiAqICAgICAgUi5pc0VtcHR5KG51bGwpOyAgICAgICAgLy89PiBmYWxzZVxuICogICAgICBSLmlzRW1wdHkoe30pOyAgICAgICAgICAvLz0+IHRydWVcbiAqICAgICAgUi5pc0VtcHR5KHtsZW5ndGg6IDB9KTsgLy89PiBmYWxzZVxuICovXG5cblxudmFyIGlzRW1wdHkgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBpc0VtcHR5KHgpIHtcbiAgcmV0dXJuIHggIT0gbnVsbCAmJiBlcXVhbHMoeCwgZW1wdHkoeCkpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGlzRW1wdHk7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBpbnB1dCB2YWx1ZSBpcyBgbnVsbGAgb3IgYHVuZGVmaW5lZGAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgVHlwZVxuICogQHNpZyAqIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7Kn0geCBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBgeGAgaXMgYHVuZGVmaW5lZGAgb3IgYG51bGxgLCBvdGhlcndpc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmlzTmlsKG51bGwpOyAvLz0+IHRydWVcbiAqICAgICAgUi5pc05pbCh1bmRlZmluZWQpOyAvLz0+IHRydWVcbiAqICAgICAgUi5pc05pbCgwKTsgLy89PiBmYWxzZVxuICogICAgICBSLmlzTmlsKFtdKTsgLy89PiBmYWxzZVxuICovXG5cblxudmFyIGlzTmlsID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gaXNOaWwoeCkge1xuICByZXR1cm4geCA9PSBudWxsO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGlzTmlsOyIsInZhciBpbnZva2VyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW52b2tlcicpO1xuXG4vKipcbiAqIFJldHVybnMgYSBzdHJpbmcgbWFkZSBieSBpbnNlcnRpbmcgdGhlIGBzZXBhcmF0b3JgIGJldHdlZW4gZWFjaCBlbGVtZW50IGFuZFxuICogY29uY2F0ZW5hdGluZyBhbGwgdGhlIGVsZW1lbnRzIGludG8gYSBzaW5nbGUgc3RyaW5nLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgU3RyaW5nIC0+IFthXSAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gc2VwYXJhdG9yIFRoZSBzdHJpbmcgdXNlZCB0byBzZXBhcmF0ZSB0aGUgZWxlbWVudHMuXG4gKiBAcGFyYW0ge0FycmF5fSB4cyBUaGUgZWxlbWVudHMgdG8gam9pbiBpbnRvIGEgc3RyaW5nLlxuICogQHJldHVybiB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyBtYWRlIGJ5IGNvbmNhdGVuYXRpbmcgYHhzYCB3aXRoIGBzZXBhcmF0b3JgLlxuICogQHNlZSBSLnNwbGl0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHNwYWNlciA9IFIuam9pbignICcpO1xuICogICAgICBzcGFjZXIoWydhJywgMiwgMy40XSk7ICAgLy89PiAnYSAyIDMuNCdcbiAqICAgICAgUi5qb2luKCd8JywgWzEsIDIsIDNdKTsgICAgLy89PiAnMXwyfDMnXG4gKi9cblxuXG52YXIgam9pbiA9IC8qI19fUFVSRV9fKi9pbnZva2VyKDEsICdqb2luJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGpvaW47IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBjb252ZXJnZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2NvbnZlcmdlJyk7XG5cbi8qKlxuICoganV4dCBhcHBsaWVzIGEgbGlzdCBvZiBmdW5jdGlvbnMgdG8gYSBsaXN0IG9mIHZhbHVlcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgWyhhLCBiLCAuLi4sIG0pIC0+IG5dIC0+ICgoYSwgYiwgLi4uLCBtKSAtPiBbbl0pXG4gKiBAcGFyYW0ge0FycmF5fSBmbnMgQW4gYXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBsaXN0IG9mIHZhbHVlcyBhZnRlciBhcHBseWluZyBlYWNoIG9mIHRoZSBvcmlnaW5hbCBgZm5zYCB0byBpdHMgcGFyYW1ldGVycy5cbiAqIEBzZWUgUi5hcHBseVNwZWNcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZ2V0UmFuZ2UgPSBSLmp1eHQoW01hdGgubWluLCBNYXRoLm1heF0pO1xuICogICAgICBnZXRSYW5nZSgzLCA0LCA5LCAtMyk7IC8vPT4gWy0zLCA5XVxuICogQHN5bWIgUi5qdXh0KFtmLCBnLCBoXSkoYSwgYikgPSBbZihhLCBiKSwgZyhhLCBiKSwgaChhLCBiKV1cbiAqL1xuXG5cbnZhciBqdXh0ID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24ganV4dChmbnMpIHtcbiAgcmV0dXJuIGNvbnZlcmdlKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgfSwgZm5zKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBqdXh0OyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgX2hhcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19oYXMnKTtcblxudmFyIF9pc0FyZ3VtZW50cyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19pc0FyZ3VtZW50cycpO1xuXG4vLyBjb3ZlciBJRSA8IDkga2V5cyBpc3N1ZXNcblxuXG52YXIgaGFzRW51bUJ1ZyA9ICEgLyojX19QVVJFX18qL3sgdG9TdHJpbmc6IG51bGwgfS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgndG9TdHJpbmcnKTtcbnZhciBub25FbnVtZXJhYmxlUHJvcHMgPSBbJ2NvbnN0cnVjdG9yJywgJ3ZhbHVlT2YnLCAnaXNQcm90b3R5cGVPZicsICd0b1N0cmluZycsICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICdoYXNPd25Qcm9wZXJ0eScsICd0b0xvY2FsZVN0cmluZyddO1xuLy8gU2FmYXJpIGJ1Z1xudmFyIGhhc0FyZ3NFbnVtQnVnID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHJldHVybiBhcmd1bWVudHMucHJvcGVydHlJc0VudW1lcmFibGUoJ2xlbmd0aCcpO1xufSgpO1xuXG52YXIgY29udGFpbnMgPSBmdW5jdGlvbiBjb250YWlucyhsaXN0LCBpdGVtKSB7XG4gIHZhciBpZHggPSAwO1xuICB3aGlsZSAoaWR4IDwgbGlzdC5sZW5ndGgpIHtcbiAgICBpZiAobGlzdFtpZHhdID09PSBpdGVtKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBjb250YWluaW5nIHRoZSBuYW1lcyBvZiBhbGwgdGhlIGVudW1lcmFibGUgb3duIHByb3BlcnRpZXMgb2ZcbiAqIHRoZSBzdXBwbGllZCBvYmplY3QuXG4gKiBOb3RlIHRoYXQgdGhlIG9yZGVyIG9mIHRoZSBvdXRwdXQgYXJyYXkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgY29uc2lzdGVudFxuICogYWNyb3NzIGRpZmZlcmVudCBKUyBwbGF0Zm9ybXMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHtrOiB2fSAtPiBba11cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBleHRyYWN0IHByb3BlcnRpZXMgZnJvbVxuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIHRoZSBvYmplY3QncyBvd24gcHJvcGVydGllcy5cbiAqIEBzZWUgUi5rZXlzSW4sIFIudmFsdWVzXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5rZXlzKHthOiAxLCBiOiAyLCBjOiAzfSk7IC8vPT4gWydhJywgJ2InLCAnYyddXG4gKi9cbnZhciBfa2V5cyA9IHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiAhaGFzQXJnc0VudW1CdWcgPyBmdW5jdGlvbiBrZXlzKG9iaikge1xuICByZXR1cm4gT2JqZWN0KG9iaikgIT09IG9iaiA/IFtdIDogT2JqZWN0LmtleXMob2JqKTtcbn0gOiBmdW5jdGlvbiBrZXlzKG9iaikge1xuICBpZiAoT2JqZWN0KG9iaikgIT09IG9iaikge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICB2YXIgcHJvcCwgbklkeDtcbiAgdmFyIGtzID0gW107XG4gIHZhciBjaGVja0FyZ3NMZW5ndGggPSBoYXNBcmdzRW51bUJ1ZyAmJiBfaXNBcmd1bWVudHMob2JqKTtcbiAgZm9yIChwcm9wIGluIG9iaikge1xuICAgIGlmIChfaGFzKHByb3AsIG9iaikgJiYgKCFjaGVja0FyZ3NMZW5ndGggfHwgcHJvcCAhPT0gJ2xlbmd0aCcpKSB7XG4gICAgICBrc1trcy5sZW5ndGhdID0gcHJvcDtcbiAgICB9XG4gIH1cbiAgaWYgKGhhc0VudW1CdWcpIHtcbiAgICBuSWR4ID0gbm9uRW51bWVyYWJsZVByb3BzLmxlbmd0aCAtIDE7XG4gICAgd2hpbGUgKG5JZHggPj0gMCkge1xuICAgICAgcHJvcCA9IG5vbkVudW1lcmFibGVQcm9wc1tuSWR4XTtcbiAgICAgIGlmIChfaGFzKHByb3AsIG9iaikgJiYgIWNvbnRhaW5zKGtzLCBwcm9wKSkge1xuICAgICAgICBrc1trcy5sZW5ndGhdID0gcHJvcDtcbiAgICAgIH1cbiAgICAgIG5JZHggLT0gMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGtzO1xufTtcbnZhciBrZXlzID0gLyojX19QVVJFX18qL19jdXJyeTEoX2tleXMpO1xubW9kdWxlLmV4cG9ydHMgPSBrZXlzOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IGNvbnRhaW5pbmcgdGhlIG5hbWVzIG9mIGFsbCB0aGUgcHJvcGVydGllcyBvZiB0aGUgc3VwcGxpZWRcbiAqIG9iamVjdCwgaW5jbHVkaW5nIHByb3RvdHlwZSBwcm9wZXJ0aWVzLlxuICogTm90ZSB0aGF0IHRoZSBvcmRlciBvZiB0aGUgb3V0cHV0IGFycmF5IGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlIGNvbnNpc3RlbnRcbiAqIGFjcm9zcyBkaWZmZXJlbnQgSlMgcGxhdGZvcm1zLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyB7azogdn0gLT4gW2tdXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gZXh0cmFjdCBwcm9wZXJ0aWVzIGZyb21cbiAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSBvZiB0aGUgb2JqZWN0J3Mgb3duIGFuZCBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAqIEBzZWUgUi5rZXlzLCBSLnZhbHVlc0luXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIEYgPSBmdW5jdGlvbigpIHsgdGhpcy54ID0gJ1gnOyB9O1xuICogICAgICBGLnByb3RvdHlwZS55ID0gJ1knO1xuICogICAgICB2YXIgZiA9IG5ldyBGKCk7XG4gKiAgICAgIFIua2V5c0luKGYpOyAvLz0+IFsneCcsICd5J11cbiAqL1xuXG5cbnZhciBrZXlzSW4gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBrZXlzSW4ob2JqKSB7XG4gIHZhciBwcm9wO1xuICB2YXIga3MgPSBbXTtcbiAgZm9yIChwcm9wIGluIG9iaikge1xuICAgIGtzW2tzLmxlbmd0aF0gPSBwcm9wO1xuICB9XG4gIHJldHVybiBrcztcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBrZXlzSW47IiwidmFyIG50aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL250aCcpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGxhc3QgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS40XG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbYV0gLT4gYSB8IFVuZGVmaW5lZFxuICogQHNpZyBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIuaW5pdCwgUi5oZWFkLCBSLnRhaWxcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmxhc3QoWydmaScsICdmbycsICdmdW0nXSk7IC8vPT4gJ2Z1bSdcbiAqICAgICAgUi5sYXN0KFtdKTsgLy89PiB1bmRlZmluZWRcbiAqXG4gKiAgICAgIFIubGFzdCgnYWJjJyk7IC8vPT4gJ2MnXG4gKiAgICAgIFIubGFzdCgnJyk7IC8vPT4gJydcbiAqL1xuXG5cbnZhciBsYXN0ID0gLyojX19QVVJFX18qL250aCgtMSk7XG5tb2R1bGUuZXhwb3J0cyA9IGxhc3Q7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfaXNBcnJheSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19pc0FycmF5Jyk7XG5cbnZhciBlcXVhbHMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9lcXVhbHMnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBvZiB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIGFuIGl0ZW0gaW4gYW4gYXJyYXksIG9yIC0xIGlmXG4gKiB0aGUgaXRlbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhlIGFycmF5LiBbYFIuZXF1YWxzYF0oI2VxdWFscykgaXMgdXNlZCB0b1xuICogZGV0ZXJtaW5lIGVxdWFsaXR5LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgYSAtPiBbYV0gLT4gTnVtYmVyXG4gKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgaXRlbSB0byBmaW5kLlxuICogQHBhcmFtIHtBcnJheX0geHMgVGhlIGFycmF5IHRvIHNlYXJjaCBpbi5cbiAqIEByZXR1cm4ge051bWJlcn0gdGhlIGluZGV4IG9mIHRoZSB0YXJnZXQsIG9yIC0xIGlmIHRoZSB0YXJnZXQgaXMgbm90IGZvdW5kLlxuICogQHNlZSBSLmluZGV4T2ZcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmxhc3RJbmRleE9mKDMsIFstMSwzLDMsMCwxLDIsMyw0XSk7IC8vPT4gNlxuICogICAgICBSLmxhc3RJbmRleE9mKDEwLCBbMSwyLDMsNF0pOyAvLz0+IC0xXG4gKi9cblxuXG52YXIgbGFzdEluZGV4T2YgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBsYXN0SW5kZXhPZih0YXJnZXQsIHhzKSB7XG4gIGlmICh0eXBlb2YgeHMubGFzdEluZGV4T2YgPT09ICdmdW5jdGlvbicgJiYgIV9pc0FycmF5KHhzKSkge1xuICAgIHJldHVybiB4cy5sYXN0SW5kZXhPZih0YXJnZXQpO1xuICB9IGVsc2Uge1xuICAgIHZhciBpZHggPSB4cy5sZW5ndGggLSAxO1xuICAgIHdoaWxlIChpZHggPj0gMCkge1xuICAgICAgaWYgKGVxdWFscyh4c1tpZHhdLCB0YXJnZXQpKSB7XG4gICAgICAgIHJldHVybiBpZHg7XG4gICAgICB9XG4gICAgICBpZHggLT0gMTtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbGFzdEluZGV4T2Y7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBfaXNOdW1iZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNOdW1iZXInKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIGFycmF5IGJ5IHJldHVybmluZyBgbGlzdC5sZW5ndGhgLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjMuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IE51bWJlclxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIGxlbmd0aCBvZiB0aGUgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5sZW5ndGgoW10pOyAvLz0+IDBcbiAqICAgICAgUi5sZW5ndGgoWzEsIDIsIDNdKTsgLy89PiAzXG4gKi9cblxuXG52YXIgbGVuZ3RoID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gbGVuZ3RoKGxpc3QpIHtcbiAgcmV0dXJuIGxpc3QgIT0gbnVsbCAmJiBfaXNOdW1iZXIobGlzdC5sZW5ndGgpID8gbGlzdC5sZW5ndGggOiBOYU47XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbGVuZ3RoOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgbWFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWFwJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIGxlbnMgZm9yIHRoZSBnaXZlbiBnZXR0ZXIgYW5kIHNldHRlciBmdW5jdGlvbnMuIFRoZSBnZXR0ZXIgXCJnZXRzXCJcbiAqIHRoZSB2YWx1ZSBvZiB0aGUgZm9jdXM7IHRoZSBzZXR0ZXIgXCJzZXRzXCIgdGhlIHZhbHVlIG9mIHRoZSBmb2N1cy4gVGhlIHNldHRlclxuICogc2hvdWxkIG5vdCBtdXRhdGUgdGhlIGRhdGEgc3RydWN0dXJlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjguMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHR5cGVkZWZuIExlbnMgcyBhID0gRnVuY3RvciBmID0+IChhIC0+IGYgYSkgLT4gcyAtPiBmIHNcbiAqIEBzaWcgKHMgLT4gYSkgLT4gKChhLCBzKSAtPiBzKSAtPiBMZW5zIHMgYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZ2V0dGVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzZXR0ZXJcbiAqIEByZXR1cm4ge0xlbnN9XG4gKiBAc2VlIFIudmlldywgUi5zZXQsIFIub3ZlciwgUi5sZW5zSW5kZXgsIFIubGVuc1Byb3BcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgeExlbnMgPSBSLmxlbnMoUi5wcm9wKCd4JyksIFIuYXNzb2MoJ3gnKSk7XG4gKlxuICogICAgICBSLnZpZXcoeExlbnMsIHt4OiAxLCB5OiAyfSk7ICAgICAgICAgICAgLy89PiAxXG4gKiAgICAgIFIuc2V0KHhMZW5zLCA0LCB7eDogMSwgeTogMn0pOyAgICAgICAgICAvLz0+IHt4OiA0LCB5OiAyfVxuICogICAgICBSLm92ZXIoeExlbnMsIFIubmVnYXRlLCB7eDogMSwgeTogMn0pOyAgLy89PiB7eDogLTEsIHk6IDJ9XG4gKi9cblxuXG52YXIgbGVucyA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGxlbnMoZ2V0dGVyLCBzZXR0ZXIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0b0Z1bmN0b3JGbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICByZXR1cm4gbWFwKGZ1bmN0aW9uIChmb2N1cykge1xuICAgICAgICByZXR1cm4gc2V0dGVyKGZvY3VzLCB0YXJnZXQpO1xuICAgICAgfSwgdG9GdW5jdG9yRm4oZ2V0dGVyKHRhcmdldCkpKTtcbiAgICB9O1xuICB9O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGxlbnM7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBsZW5zID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbGVucycpO1xuXG52YXIgbnRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbnRoJyk7XG5cbnZhciB1cGRhdGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi91cGRhdGUnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbGVucyB3aG9zZSBmb2N1cyBpcyB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE0LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEB0eXBlZGVmbiBMZW5zIHMgYSA9IEZ1bmN0b3IgZiA9PiAoYSAtPiBmIGEpIC0+IHMgLT4gZiBzXG4gKiBAc2lnIE51bWJlciAtPiBMZW5zIHMgYVxuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEByZXR1cm4ge0xlbnN9XG4gKiBAc2VlIFIudmlldywgUi5zZXQsIFIub3ZlclxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBoZWFkTGVucyA9IFIubGVuc0luZGV4KDApO1xuICpcbiAqICAgICAgUi52aWV3KGhlYWRMZW5zLCBbJ2EnLCAnYicsICdjJ10pOyAgICAgICAgICAgIC8vPT4gJ2EnXG4gKiAgICAgIFIuc2V0KGhlYWRMZW5zLCAneCcsIFsnYScsICdiJywgJ2MnXSk7ICAgICAgICAvLz0+IFsneCcsICdiJywgJ2MnXVxuICogICAgICBSLm92ZXIoaGVhZExlbnMsIFIudG9VcHBlciwgWydhJywgJ2InLCAnYyddKTsgLy89PiBbJ0EnLCAnYicsICdjJ11cbiAqL1xuXG5cbnZhciBsZW5zSW5kZXggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBsZW5zSW5kZXgobikge1xuICByZXR1cm4gbGVucyhudGgobiksIHVwZGF0ZShuKSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbGVuc0luZGV4OyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgYXNzb2NQYXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYXNzb2NQYXRoJyk7XG5cbnZhciBsZW5zID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbGVucycpO1xuXG52YXIgcGF0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3BhdGgnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbGVucyB3aG9zZSBmb2N1cyBpcyB0aGUgc3BlY2lmaWVkIHBhdGguXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTkuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHR5cGVkZWZuIElkeCA9IFN0cmluZyB8IEludFxuICogQHR5cGVkZWZuIExlbnMgcyBhID0gRnVuY3RvciBmID0+IChhIC0+IGYgYSkgLT4gcyAtPiBmIHNcbiAqIEBzaWcgW0lkeF0gLT4gTGVucyBzIGFcbiAqIEBwYXJhbSB7QXJyYXl9IHBhdGggVGhlIHBhdGggdG8gdXNlLlxuICogQHJldHVybiB7TGVuc31cbiAqIEBzZWUgUi52aWV3LCBSLnNldCwgUi5vdmVyXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHhIZWFkWUxlbnMgPSBSLmxlbnNQYXRoKFsneCcsIDAsICd5J10pO1xuICpcbiAqICAgICAgUi52aWV3KHhIZWFkWUxlbnMsIHt4OiBbe3k6IDIsIHo6IDN9LCB7eTogNCwgejogNX1dfSk7XG4gKiAgICAgIC8vPT4gMlxuICogICAgICBSLnNldCh4SGVhZFlMZW5zLCAxLCB7eDogW3t5OiAyLCB6OiAzfSwge3k6IDQsIHo6IDV9XX0pO1xuICogICAgICAvLz0+IHt4OiBbe3k6IDEsIHo6IDN9LCB7eTogNCwgejogNX1dfVxuICogICAgICBSLm92ZXIoeEhlYWRZTGVucywgUi5uZWdhdGUsIHt4OiBbe3k6IDIsIHo6IDN9LCB7eTogNCwgejogNX1dfSk7XG4gKiAgICAgIC8vPT4ge3g6IFt7eTogLTIsIHo6IDN9LCB7eTogNCwgejogNX1dfVxuICovXG5cblxudmFyIGxlbnNQYXRoID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gbGVuc1BhdGgocCkge1xuICByZXR1cm4gbGVucyhwYXRoKHApLCBhc3NvY1BhdGgocCkpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGxlbnNQYXRoOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgYXNzb2MgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hc3NvYycpO1xuXG52YXIgbGVucyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2xlbnMnKTtcblxudmFyIHByb3AgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wcm9wJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIGxlbnMgd2hvc2UgZm9jdXMgaXMgdGhlIHNwZWNpZmllZCBwcm9wZXJ0eS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAdHlwZWRlZm4gTGVucyBzIGEgPSBGdW5jdG9yIGYgPT4gKGEgLT4gZiBhKSAtPiBzIC0+IGYgc1xuICogQHNpZyBTdHJpbmcgLT4gTGVucyBzIGFcbiAqIEBwYXJhbSB7U3RyaW5nfSBrXG4gKiBAcmV0dXJuIHtMZW5zfVxuICogQHNlZSBSLnZpZXcsIFIuc2V0LCBSLm92ZXJcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgeExlbnMgPSBSLmxlbnNQcm9wKCd4Jyk7XG4gKlxuICogICAgICBSLnZpZXcoeExlbnMsIHt4OiAxLCB5OiAyfSk7ICAgICAgICAgICAgLy89PiAxXG4gKiAgICAgIFIuc2V0KHhMZW5zLCA0LCB7eDogMSwgeTogMn0pOyAgICAgICAgICAvLz0+IHt4OiA0LCB5OiAyfVxuICogICAgICBSLm92ZXIoeExlbnMsIFIubmVnYXRlLCB7eDogMSwgeTogMn0pOyAgLy89PiB7eDogLTEsIHk6IDJ9XG4gKi9cblxuXG52YXIgbGVuc1Byb3AgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBsZW5zUHJvcChrKSB7XG4gIHJldHVybiBsZW5zKHByb3AoayksIGFzc29jKGspKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBsZW5zUHJvcDsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIGxpZnROID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbGlmdE4nKTtcblxuLyoqXG4gKiBcImxpZnRzXCIgYSBmdW5jdGlvbiBvZiBhcml0eSA+IDEgc28gdGhhdCBpdCBtYXkgXCJtYXAgb3ZlclwiIGEgbGlzdCwgRnVuY3Rpb24gb3Igb3RoZXJcbiAqIG9iamVjdCB0aGF0IHNhdGlzZmllcyB0aGUgW0ZhbnRhc3lMYW5kIEFwcGx5IHNwZWNdKGh0dHBzOi8vZ2l0aHViLmNvbS9mYW50YXN5bGFuZC9mYW50YXN5LWxhbmQjYXBwbHkpLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjcuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgqLi4uIC0+ICopIC0+IChbKl0uLi4gLT4gWypdKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGxpZnQgaW50byBoaWdoZXIgY29udGV4dFxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBsaWZ0ZWQgZnVuY3Rpb24uXG4gKiBAc2VlIFIubGlmdE5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbWFkZDMgPSBSLmxpZnQoKGEsIGIsIGMpID0+IGEgKyBiICsgYyk7XG4gKlxuICogICAgICBtYWRkMyhbMSwyLDNdLCBbMSwyLDNdLCBbMV0pOyAvLz0+IFszLCA0LCA1LCA0LCA1LCA2LCA1LCA2LCA3XVxuICpcbiAqICAgICAgdmFyIG1hZGQ1ID0gUi5saWZ0KChhLCBiLCBjLCBkLCBlKSA9PiBhICsgYiArIGMgKyBkICsgZSk7XG4gKlxuICogICAgICBtYWRkNShbMSwyXSwgWzNdLCBbNCwgNV0sIFs2XSwgWzcsIDhdKTsgLy89PiBbMjEsIDIyLCAyMiwgMjMsIDIyLCAyMywgMjMsIDI0XVxuICovXG5cblxudmFyIGxpZnQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBsaWZ0KGZuKSB7XG4gIHJldHVybiBsaWZ0Tihmbi5sZW5ndGgsIGZuKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBsaWZ0OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX3JlZHVjZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19yZWR1Y2UnKTtcblxudmFyIGFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYXAnKTtcblxudmFyIGN1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2N1cnJ5TicpO1xuXG52YXIgbWFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWFwJyk7XG5cbi8qKlxuICogXCJsaWZ0c1wiIGEgZnVuY3Rpb24gdG8gYmUgdGhlIHNwZWNpZmllZCBhcml0eSwgc28gdGhhdCBpdCBtYXkgXCJtYXAgb3ZlclwiIHRoYXRcbiAqIG1hbnkgbGlzdHMsIEZ1bmN0aW9ucyBvciBvdGhlciBvYmplY3RzIHRoYXQgc2F0aXNmeSB0aGUgW0ZhbnRhc3lMYW5kIEFwcGx5IHNwZWNdKGh0dHBzOi8vZ2l0aHViLmNvbS9mYW50YXN5bGFuZC9mYW50YXN5LWxhbmQjYXBwbHkpLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjcuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIE51bWJlciAtPiAoKi4uLiAtPiAqKSAtPiAoWypdLi4uIC0+IFsqXSlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBsaWZ0IGludG8gaGlnaGVyIGNvbnRleHRcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgbGlmdGVkIGZ1bmN0aW9uLlxuICogQHNlZSBSLmxpZnQsIFIuYXBcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbWFkZDMgPSBSLmxpZnROKDMsICguLi5hcmdzKSA9PiBSLnN1bShhcmdzKSk7XG4gKiAgICAgIG1hZGQzKFsxLDIsM10sIFsxLDIsM10sIFsxXSk7IC8vPT4gWzMsIDQsIDUsIDQsIDUsIDYsIDUsIDYsIDddXG4gKi9cblxuXG52YXIgbGlmdE4gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBsaWZ0Tihhcml0eSwgZm4pIHtcbiAgdmFyIGxpZnRlZCA9IGN1cnJ5Tihhcml0eSwgZm4pO1xuICByZXR1cm4gY3VycnlOKGFyaXR5LCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF9yZWR1Y2UoYXAsIG1hcChsaWZ0ZWQsIGFyZ3VtZW50c1swXSksIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICB9KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBsaWZ0TjsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgbGVzcyB0aGFuIHRoZSBzZWNvbmQ7IGBmYWxzZWBcbiAqIG90aGVyd2lzZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBPcmQgYSA9PiBhIC0+IGEgLT4gQm9vbGVhblxuICogQHBhcmFtIHsqfSBhXG4gKiBAcGFyYW0geyp9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAc2VlIFIuZ3RcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLmx0KDIsIDEpOyAvLz0+IGZhbHNlXG4gKiAgICAgIFIubHQoMiwgMik7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5sdCgyLCAzKTsgLy89PiB0cnVlXG4gKiAgICAgIFIubHQoJ2EnLCAneicpOyAvLz0+IHRydWVcbiAqICAgICAgUi5sdCgneicsICdhJyk7IC8vPT4gZmFsc2VcbiAqL1xuXG5cbnZhciBsdCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGx0KGEsIGIpIHtcbiAgcmV0dXJuIGEgPCBiO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGx0OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHNlY29uZDtcbiAqIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIE9yZCBhID0+IGEgLT4gYSAtPiBCb29sZWFuXG4gKiBAcGFyYW0ge051bWJlcn0gYVxuICogQHBhcmFtIHtOdW1iZXJ9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAc2VlIFIuZ3RlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5sdGUoMiwgMSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5sdGUoMiwgMik7IC8vPT4gdHJ1ZVxuICogICAgICBSLmx0ZSgyLCAzKTsgLy89PiB0cnVlXG4gKiAgICAgIFIubHRlKCdhJywgJ3onKTsgLy89PiB0cnVlXG4gKiAgICAgIFIubHRlKCd6JywgJ2EnKTsgLy89PiBmYWxzZVxuICovXG5cblxudmFyIGx0ZSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIGx0ZShhLCBiKSB7XG4gIHJldHVybiBhIDw9IGI7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbHRlOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2Rpc3BhdGNoYWJsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcblxudmFyIF9tYXAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fbWFwJyk7XG5cbnZhciBfcmVkdWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3JlZHVjZScpO1xuXG52YXIgX3htYXAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9feG1hcCcpO1xuXG52YXIgY3VycnlOID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY3VycnlOJyk7XG5cbnZhciBrZXlzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIFRha2VzIGEgZnVuY3Rpb24gYW5kXG4gKiBhIFtmdW5jdG9yXShodHRwczovL2dpdGh1Yi5jb20vZmFudGFzeWxhbmQvZmFudGFzeS1sYW5kI2Z1bmN0b3IpLFxuICogYXBwbGllcyB0aGUgZnVuY3Rpb24gdG8gZWFjaCBvZiB0aGUgZnVuY3RvcidzIHZhbHVlcywgYW5kIHJldHVybnNcbiAqIGEgZnVuY3RvciBvZiB0aGUgc2FtZSBzaGFwZS5cbiAqXG4gKiBSYW1kYSBwcm92aWRlcyBzdWl0YWJsZSBgbWFwYCBpbXBsZW1lbnRhdGlvbnMgZm9yIGBBcnJheWAgYW5kIGBPYmplY3RgLFxuICogc28gdGhpcyBmdW5jdGlvbiBtYXkgYmUgYXBwbGllZCB0byBgWzEsIDIsIDNdYCBvciBge3g6IDEsIHk6IDIsIHo6IDN9YC5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgbWFwYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQWxzbyB0cmVhdHMgZnVuY3Rpb25zIGFzIGZ1bmN0b3JzIGFuZCB3aWxsIGNvbXBvc2UgdGhlbSB0b2dldGhlci5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIEZ1bmN0b3IgZiA9PiAoYSAtPiBiKSAtPiBmIGEgLT4gZiBiXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGV2ZXJ5IGVsZW1lbnQgb2YgdGhlIGlucHV0IGBsaXN0YC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gYmUgaXRlcmF0ZWQgb3Zlci5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgbmV3IGxpc3QuXG4gKiBAc2VlIFIudHJhbnNkdWNlLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGRvdWJsZSA9IHggPT4geCAqIDI7XG4gKlxuICogICAgICBSLm1hcChkb3VibGUsIFsxLCAyLCAzXSk7IC8vPT4gWzIsIDQsIDZdXG4gKlxuICogICAgICBSLm1hcChkb3VibGUsIHt4OiAxLCB5OiAyLCB6OiAzfSk7IC8vPT4ge3g6IDIsIHk6IDQsIHo6IDZ9XG4gKiBAc3ltYiBSLm1hcChmLCBbYSwgYl0pID0gW2YoYSksIGYoYildXG4gKiBAc3ltYiBSLm1hcChmLCB7IHg6IGEsIHk6IGIgfSkgPSB7IHg6IGYoYSksIHk6IGYoYikgfVxuICogQHN5bWIgUi5tYXAoZiwgZnVuY3Rvcl9vKSA9IGZ1bmN0b3Jfby5tYXAoZilcbiAqL1xuXG5cbnZhciBtYXAgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MiggLyojX19QVVJFX18qL19kaXNwYXRjaGFibGUoWydmYW50YXN5LWxhbmQvbWFwJywgJ21hcCddLCBfeG1hcCwgZnVuY3Rpb24gbWFwKGZuLCBmdW5jdG9yKSB7XG4gIHN3aXRjaCAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZ1bmN0b3IpKSB7XG4gICAgY2FzZSAnW29iamVjdCBGdW5jdGlvbl0nOlxuICAgICAgcmV0dXJuIGN1cnJ5TihmdW5jdG9yLmxlbmd0aCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBmdW5jdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgICAgfSk7XG4gICAgY2FzZSAnW29iamVjdCBPYmplY3RdJzpcbiAgICAgIHJldHVybiBfcmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICBhY2Nba2V5XSA9IGZuKGZ1bmN0b3Jba2V5XSk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fSwga2V5cyhmdW5jdG9yKSk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBfbWFwKGZuLCBmdW5jdG9yKTtcbiAgfVxufSkpO1xubW9kdWxlLmV4cG9ydHMgPSBtYXA7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8qKlxuICogVGhlIGBtYXBBY2N1bWAgZnVuY3Rpb24gYmVoYXZlcyBsaWtlIGEgY29tYmluYXRpb24gb2YgbWFwIGFuZCByZWR1Y2U7IGl0XG4gKiBhcHBsaWVzIGEgZnVuY3Rpb24gdG8gZWFjaCBlbGVtZW50IG9mIGEgbGlzdCwgcGFzc2luZyBhbiBhY2N1bXVsYXRpbmdcbiAqIHBhcmFtZXRlciBmcm9tIGxlZnQgdG8gcmlnaHQsIGFuZCByZXR1cm5pbmcgYSBmaW5hbCB2YWx1ZSBvZiB0aGlzXG4gKiBhY2N1bXVsYXRvciB0b2dldGhlciB3aXRoIHRoZSBuZXcgbGlzdC5cbiAqXG4gKiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gcmVjZWl2ZXMgdHdvIGFyZ3VtZW50cywgKmFjYyogYW5kICp2YWx1ZSosIGFuZCBzaG91bGRcbiAqIHJldHVybiBhIHR1cGxlICpbYWNjLCB2YWx1ZV0qLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEwLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICgoYWNjLCB4KSAtPiAoYWNjLCB5KSkgLT4gYWNjIC0+IFt4XSAtPiAoYWNjLCBbeV0pXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGV2ZXJ5IGVsZW1lbnQgb2YgdGhlIGlucHV0IGBsaXN0YC5cbiAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBhY2N1bXVsYXRvciB2YWx1ZS5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7Kn0gVGhlIGZpbmFsLCBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqIEBzZWUgUi5hZGRJbmRleCwgUi5tYXBBY2N1bVJpZ2h0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGRpZ2l0cyA9IFsnMScsICcyJywgJzMnLCAnNCddO1xuICogICAgICB2YXIgYXBwZW5kZXIgPSAoYSwgYikgPT4gW2EgKyBiLCBhICsgYl07XG4gKlxuICogICAgICBSLm1hcEFjY3VtKGFwcGVuZGVyLCAwLCBkaWdpdHMpOyAvLz0+IFsnMDEyMzQnLCBbJzAxJywgJzAxMicsICcwMTIzJywgJzAxMjM0J11dXG4gKiBAc3ltYiBSLm1hcEFjY3VtKGYsIGEsIFtiLCBjLCBkXSkgPSBbXG4gKiAgIGYoZihmKGEsIGIpWzBdLCBjKVswXSwgZClbMF0sXG4gKiAgIFtcbiAqICAgICBmKGEsIGIpWzFdLFxuICogICAgIGYoZihhLCBiKVswXSwgYylbMV0sXG4gKiAgICAgZihmKGYoYSwgYilbMF0sIGMpWzBdLCBkKVsxXVxuICogICBdXG4gKiBdXG4gKi9cblxuXG52YXIgbWFwQWNjdW0gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBtYXBBY2N1bShmbiwgYWNjLCBsaXN0KSB7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIHR1cGxlID0gW2FjY107XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICB0dXBsZSA9IGZuKHR1cGxlWzBdLCBsaXN0W2lkeF0pO1xuICAgIHJlc3VsdFtpZHhdID0gdHVwbGVbMV07XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIFt0dXBsZVswXSwgcmVzdWx0XTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBtYXBBY2N1bTsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBUaGUgYG1hcEFjY3VtUmlnaHRgIGZ1bmN0aW9uIGJlaGF2ZXMgbGlrZSBhIGNvbWJpbmF0aW9uIG9mIG1hcCBhbmQgcmVkdWNlOyBpdFxuICogYXBwbGllcyBhIGZ1bmN0aW9uIHRvIGVhY2ggZWxlbWVudCBvZiBhIGxpc3QsIHBhc3NpbmcgYW4gYWNjdW11bGF0aW5nXG4gKiBwYXJhbWV0ZXIgZnJvbSByaWdodCB0byBsZWZ0LCBhbmQgcmV0dXJuaW5nIGEgZmluYWwgdmFsdWUgb2YgdGhpc1xuICogYWNjdW11bGF0b3IgdG9nZXRoZXIgd2l0aCB0aGUgbmV3IGxpc3QuXG4gKlxuICogU2ltaWxhciB0byBbYG1hcEFjY3VtYF0oI21hcEFjY3VtKSwgZXhjZXB0IG1vdmVzIHRocm91Z2ggdGhlIGlucHV0IGxpc3QgZnJvbVxuICogdGhlIHJpZ2h0IHRvIHRoZSBsZWZ0LlxuICpcbiAqIFRoZSBpdGVyYXRvciBmdW5jdGlvbiByZWNlaXZlcyB0d28gYXJndW1lbnRzLCAqdmFsdWUqIGFuZCAqYWNjKiwgYW5kIHNob3VsZFxuICogcmV0dXJuIGEgdHVwbGUgKlt2YWx1ZSwgYWNjXSouXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTAuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKCh4LCBhY2MpIC0+ICh5LCBhY2MpKSAtPiBhY2MgLT4gW3hdIC0+IChbeV0sIGFjYylcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gZXZlcnkgZWxlbWVudCBvZiB0aGUgaW5wdXQgYGxpc3RgLlxuICogQHBhcmFtIHsqfSBhY2MgVGhlIGFjY3VtdWxhdG9yIHZhbHVlLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJuIHsqfSBUaGUgZmluYWwsIGFjY3VtdWxhdGVkIHZhbHVlLlxuICogQHNlZSBSLmFkZEluZGV4LCBSLm1hcEFjY3VtXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGRpZ2l0cyA9IFsnMScsICcyJywgJzMnLCAnNCddO1xuICogICAgICB2YXIgYXBwZW5kID0gKGEsIGIpID0+IFthICsgYiwgYSArIGJdO1xuICpcbiAqICAgICAgUi5tYXBBY2N1bVJpZ2h0KGFwcGVuZCwgNSwgZGlnaXRzKTsgLy89PiBbWycxMjM0NScsICcyMzQ1JywgJzM0NScsICc0NSddLCAnMTIzNDUnXVxuICogQHN5bWIgUi5tYXBBY2N1bVJpZ2h0KGYsIGEsIFtiLCBjLCBkXSkgPSBbXG4gKiAgIFtcbiAqICAgICBmKGIsIGYoYywgZihkLCBhKVswXSlbMF0pWzFdLFxuICogICAgIGYoYywgZihkLCBhKVswXSlbMV0sXG4gKiAgICAgZihkLCBhKVsxXSxcbiAqICAgXVxuICogICBmKGIsIGYoYywgZihkLCBhKVswXSlbMF0pWzBdLFxuICogXVxuICovXG5cblxudmFyIG1hcEFjY3VtUmlnaHQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBtYXBBY2N1bVJpZ2h0KGZuLCBhY2MsIGxpc3QpIHtcbiAgdmFyIGlkeCA9IGxpc3QubGVuZ3RoIC0gMTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgdHVwbGUgPSBbYWNjXTtcbiAgd2hpbGUgKGlkeCA+PSAwKSB7XG4gICAgdHVwbGUgPSBmbihsaXN0W2lkeF0sIHR1cGxlWzBdKTtcbiAgICByZXN1bHRbaWR4XSA9IHR1cGxlWzFdO1xuICAgIGlkeCAtPSAxO1xuICB9XG4gIHJldHVybiBbcmVzdWx0LCB0dXBsZVswXV07XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbWFwQWNjdW1SaWdodDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9yZWR1Y2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fcmVkdWNlJyk7XG5cbnZhciBrZXlzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIEFuIE9iamVjdC1zcGVjaWZpYyB2ZXJzaW9uIG9mIFtgbWFwYF0oI21hcCkuIFRoZSBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvIHRocmVlXG4gKiBhcmd1bWVudHM6ICoodmFsdWUsIGtleSwgb2JqKSouIElmIG9ubHkgdGhlIHZhbHVlIGlzIHNpZ25pZmljYW50LCB1c2VcbiAqIFtgbWFwYF0oI21hcCkgaW5zdGVhZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC45LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgKCgqLCBTdHJpbmcsIE9iamVjdCkgLT4gKikgLT4gT2JqZWN0IC0+IE9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBzZWUgUi5tYXBcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgdmFsdWVzID0geyB4OiAxLCB5OiAyLCB6OiAzIH07XG4gKiAgICAgIHZhciBwcmVwZW5kS2V5QW5kRG91YmxlID0gKG51bSwga2V5LCBvYmopID0+IGtleSArIChudW0gKiAyKTtcbiAqXG4gKiAgICAgIFIubWFwT2JqSW5kZXhlZChwcmVwZW5kS2V5QW5kRG91YmxlLCB2YWx1ZXMpOyAvLz0+IHsgeDogJ3gyJywgeTogJ3k0JywgejogJ3o2JyB9XG4gKi9cblxuXG52YXIgbWFwT2JqSW5kZXhlZCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIG1hcE9iakluZGV4ZWQoZm4sIG9iaikge1xuICByZXR1cm4gX3JlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICBhY2Nba2V5XSA9IGZuKG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30sIGtleXMob2JqKSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbWFwT2JqSW5kZXhlZDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBUZXN0cyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBhZ2FpbnN0IGEgU3RyaW5nLiBOb3RlIHRoYXQgdGhpcyBmdW5jdGlvbiB3aWxsXG4gKiByZXR1cm4gYW4gZW1wdHkgYXJyYXkgd2hlbiB0aGVyZSBhcmUgbm8gbWF0Y2hlcy4gVGhpcyBkaWZmZXJzIGZyb21cbiAqIFtgU3RyaW5nLnByb3RvdHlwZS5tYXRjaGBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N0cmluZy9tYXRjaClcbiAqIHdoaWNoIHJldHVybnMgYG51bGxgIHdoZW4gdGhlcmUgYXJlIG5vIG1hdGNoZXMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAc2lnIFJlZ0V4cCAtPiBTdHJpbmcgLT4gW1N0cmluZyB8IFVuZGVmaW5lZF1cbiAqIEBwYXJhbSB7UmVnRXhwfSByeCBBIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byBtYXRjaCBhZ2FpbnN0XG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3Qgb2YgbWF0Y2hlcyBvciBlbXB0eSBhcnJheS5cbiAqIEBzZWUgUi50ZXN0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5tYXRjaCgvKFthLXpdYSkvZywgJ2JhbmFuYXMnKTsgLy89PiBbJ2JhJywgJ25hJywgJ25hJ11cbiAqICAgICAgUi5tYXRjaCgvYS8sICdiJyk7IC8vPT4gW11cbiAqICAgICAgUi5tYXRjaCgvYS8sIG51bGwpOyAvLz0+IFR5cGVFcnJvcjogbnVsbCBkb2VzIG5vdCBoYXZlIGEgbWV0aG9kIG5hbWVkIFwibWF0Y2hcIlxuICovXG5cblxudmFyIG1hdGNoID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gbWF0Y2gocngsIHN0cikge1xuICByZXR1cm4gc3RyLm1hdGNoKHJ4KSB8fCBbXTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBtYXRjaDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9pc0ludGVnZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNJbnRlZ2VyJyk7XG5cbi8qKlxuICogYG1hdGhNb2RgIGJlaGF2ZXMgbGlrZSB0aGUgbW9kdWxvIG9wZXJhdG9yIHNob3VsZCBtYXRoZW1hdGljYWxseSwgdW5saWtlIHRoZVxuICogYCVgIG9wZXJhdG9yIChhbmQgYnkgZXh0ZW5zaW9uLCBbYFIubW9kdWxvYF0oI21vZHVsbykpLiBTbyB3aGlsZVxuICogYC0xNyAlIDVgIGlzIGAtMmAsIGBtYXRoTW9kKC0xNywgNSlgIGlzIGAzYC4gYG1hdGhNb2RgIHJlcXVpcmVzIEludGVnZXJcbiAqIGFyZ3VtZW50cywgYW5kIHJldHVybnMgTmFOIHdoZW4gdGhlIG1vZHVsdXMgaXMgemVybyBvciBuZWdhdGl2ZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4zLjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gTnVtYmVyXG4gKiBAcGFyYW0ge051bWJlcn0gbSBUaGUgZGl2aWRlbmQuXG4gKiBAcGFyYW0ge051bWJlcn0gcCB0aGUgbW9kdWx1cy5cbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJlc3VsdCBvZiBgYiBtb2QgYWAuXG4gKiBAc2VlIFIubW9kdWxvXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5tYXRoTW9kKC0xNywgNSk7ICAvLz0+IDNcbiAqICAgICAgUi5tYXRoTW9kKDE3LCA1KTsgICAvLz0+IDJcbiAqICAgICAgUi5tYXRoTW9kKDE3LCAtNSk7ICAvLz0+IE5hTlxuICogICAgICBSLm1hdGhNb2QoMTcsIDApOyAgIC8vPT4gTmFOXG4gKiAgICAgIFIubWF0aE1vZCgxNy4yLCA1KTsgLy89PiBOYU5cbiAqICAgICAgUi5tYXRoTW9kKDE3LCA1LjMpOyAvLz0+IE5hTlxuICpcbiAqICAgICAgdmFyIGNsb2NrID0gUi5tYXRoTW9kKFIuX18sIDEyKTtcbiAqICAgICAgY2xvY2soMTUpOyAvLz0+IDNcbiAqICAgICAgY2xvY2soMjQpOyAvLz0+IDBcbiAqXG4gKiAgICAgIHZhciBzZXZlbnRlZW5Nb2QgPSBSLm1hdGhNb2QoMTcpO1xuICogICAgICBzZXZlbnRlZW5Nb2QoMyk7ICAvLz0+IDJcbiAqICAgICAgc2V2ZW50ZWVuTW9kKDQpOyAgLy89PiAxXG4gKiAgICAgIHNldmVudGVlbk1vZCgxMCk7IC8vPT4gN1xuICovXG5cblxudmFyIG1hdGhNb2QgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBtYXRoTW9kKG0sIHApIHtcbiAgaWYgKCFfaXNJbnRlZ2VyKG0pKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuICBpZiAoIV9pc0ludGVnZXIocCkgfHwgcCA8IDEpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG4gIHJldHVybiAobSAlIHAgKyBwKSAlIHA7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbWF0aE1vZDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBsYXJnZXIgb2YgaXRzIHR3byBhcmd1bWVudHMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgT3JkIGEgPT4gYSAtPiBhIC0+IGFcbiAqIEBwYXJhbSB7Kn0gYVxuICogQHBhcmFtIHsqfSBiXG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLm1heEJ5LCBSLm1pblxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubWF4KDc4OSwgMTIzKTsgLy89PiA3ODlcbiAqICAgICAgUi5tYXgoJ2EnLCAnYicpOyAvLz0+ICdiJ1xuICovXG5cblxudmFyIG1heCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIG1heChhLCBiKSB7XG4gIHJldHVybiBiID4gYSA/IGIgOiBhO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG1heDsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBUYWtlcyBhIGZ1bmN0aW9uIGFuZCB0d28gdmFsdWVzLCBhbmQgcmV0dXJucyB3aGljaGV2ZXIgdmFsdWUgcHJvZHVjZXMgdGhlXG4gKiBsYXJnZXIgcmVzdWx0IHdoZW4gcGFzc2VkIHRvIHRoZSBwcm92aWRlZCBmdW5jdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC44LjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBPcmQgYiA9PiAoYSAtPiBiKSAtPiBhIC0+IGEgLT4gYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZlxuICogQHBhcmFtIHsqfSBhXG4gKiBAcGFyYW0geyp9IGJcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIubWF4LCBSLm1pbkJ5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgLy8gIHNxdWFyZSA6OiBOdW1iZXIgLT4gTnVtYmVyXG4gKiAgICAgIHZhciBzcXVhcmUgPSBuID0+IG4gKiBuO1xuICpcbiAqICAgICAgUi5tYXhCeShzcXVhcmUsIC0zLCAyKTsgLy89PiAtM1xuICpcbiAqICAgICAgUi5yZWR1Y2UoUi5tYXhCeShzcXVhcmUpLCAwLCBbMywgLTUsIDQsIDEsIC0yXSk7IC8vPT4gLTVcbiAqICAgICAgUi5yZWR1Y2UoUi5tYXhCeShzcXVhcmUpLCAwLCBbXSk7IC8vPT4gMFxuICovXG5cblxudmFyIG1heEJ5ID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gbWF4QnkoZiwgYSwgYikge1xuICByZXR1cm4gZihiKSA+IGYoYSkgPyBiIDogYTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBtYXhCeTsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIHN1bSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3N1bScpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1lYW4gb2YgdGhlIGdpdmVuIGxpc3Qgb2YgbnVtYmVycy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNC4wXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHNpZyBbTnVtYmVyXSAtPiBOdW1iZXJcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3RcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBzZWUgUi5tZWRpYW5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLm1lYW4oWzIsIDcsIDldKTsgLy89PiA2XG4gKiAgICAgIFIubWVhbihbXSk7IC8vPT4gTmFOXG4gKi9cblxuXG52YXIgbWVhbiA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIG1lYW4obGlzdCkge1xuICByZXR1cm4gc3VtKGxpc3QpIC8gbGlzdC5sZW5ndGg7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbWVhbjsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIG1lYW4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tZWFuJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbWVkaWFuIG9mIHRoZSBnaXZlbiBsaXN0IG9mIG51bWJlcnMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTQuMFxuICogQGNhdGVnb3J5IE1hdGhcbiAqIEBzaWcgW051bWJlcl0gLT4gTnVtYmVyXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0XG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAc2VlIFIubWVhblxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubWVkaWFuKFsyLCA5LCA3XSk7IC8vPT4gN1xuICogICAgICBSLm1lZGlhbihbNywgMiwgMTAsIDldKTsgLy89PiA4XG4gKiAgICAgIFIubWVkaWFuKFtdKTsgLy89PiBOYU5cbiAqL1xuXG5cbnZhciBtZWRpYW4gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBtZWRpYW4obGlzdCkge1xuICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gIGlmIChsZW4gPT09IDApIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG4gIHZhciB3aWR0aCA9IDIgLSBsZW4gJSAyO1xuICB2YXIgaWR4ID0gKGxlbiAtIHdpZHRoKSAvIDI7XG4gIHJldHVybiBtZWFuKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGxpc3QsIDApLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IDA7XG4gIH0pLnNsaWNlKGlkeCwgaWR4ICsgd2lkdGgpKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBtZWRpYW47IiwidmFyIG1lbW9pemVXaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWVtb2l6ZVdpdGgnKTtcblxudmFyIHRvU3RyaW5nID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZ1bmN0aW9uIHRoYXQsIHdoZW4gaW52b2tlZCwgY2FjaGVzIHRoZSByZXN1bHQgb2YgY2FsbGluZyBgZm5gXG4gKiBmb3IgYSBnaXZlbiBhcmd1bWVudCBzZXQgYW5kIHJldHVybnMgdGhlIHJlc3VsdC4gU3Vic2VxdWVudCBjYWxscyB0byB0aGVcbiAqIG1lbW9pemVkIGBmbmAgd2l0aCB0aGUgc2FtZSBhcmd1bWVudCBzZXQgd2lsbCBub3QgcmVzdWx0IGluIGFuIGFkZGl0aW9uYWxcbiAqIGNhbGwgdG8gYGZuYDsgaW5zdGVhZCwgdGhlIGNhY2hlZCByZXN1bHQgZm9yIHRoYXQgc2V0IG9mIGFyZ3VtZW50cyB3aWxsIGJlXG4gKiByZXR1cm5lZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKi4uLiAtPiBhKSAtPiAoKi4uLiAtPiBhKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIG1lbW9pemUuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gTWVtb2l6ZWQgdmVyc2lvbiBvZiBgZm5gLlxuICogQHNlZSBSLm1lbW9pemVXaXRoXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2MC4yNS4wXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgbGV0IGNvdW50ID0gMDtcbiAqICAgICAgY29uc3QgZmFjdG9yaWFsID0gUi5tZW1vaXplKG4gPT4ge1xuICogICAgICAgIGNvdW50ICs9IDE7XG4gKiAgICAgICAgcmV0dXJuIFIucHJvZHVjdChSLnJhbmdlKDEsIG4gKyAxKSk7XG4gKiAgICAgIH0pO1xuICogICAgICBmYWN0b3JpYWwoNSk7IC8vPT4gMTIwXG4gKiAgICAgIGZhY3RvcmlhbCg1KTsgLy89PiAxMjBcbiAqICAgICAgZmFjdG9yaWFsKDUpOyAvLz0+IDEyMFxuICogICAgICBjb3VudDsgLy89PiAxXG4gKi9cblxuXG52YXIgbWVtb2l6ZSA9IC8qI19fUFVSRV9fKi9tZW1vaXplV2l0aChmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0b1N0cmluZyhhcmd1bWVudHMpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG1lbW9pemU7IiwidmFyIF9hcml0eSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19hcml0eScpO1xuXG52YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9oYXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faGFzJyk7XG5cbi8qKlxuICogQSBjdXN0b21pc2FibGUgdmVyc2lvbiBvZiBbYFIubWVtb2l6ZWBdKCNtZW1vaXplKS4gYG1lbW9pemVXaXRoYCB0YWtlcyBhblxuICogYWRkaXRpb25hbCBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgYXBwbGllZCB0byBhIGdpdmVuIGFyZ3VtZW50IHNldCBhbmQgdXNlZCB0b1xuICogY3JlYXRlIHRoZSBjYWNoZSBrZXkgdW5kZXIgd2hpY2ggdGhlIHJlc3VsdHMgb2YgdGhlIGZ1bmN0aW9uIHRvIGJlIG1lbW9pemVkXG4gKiB3aWxsIGJlIHN0b3JlZC4gQ2FyZSBtdXN0IGJlIHRha2VuIHdoZW4gaW1wbGVtZW50aW5nIGtleSBnZW5lcmF0aW9uIHRvIGF2b2lkXG4gKiBjbGFzaGVzIHRoYXQgbWF5IG92ZXJ3cml0ZSBwcmV2aW91cyBlbnRyaWVzIGVycm9uZW91c2x5LlxuICpcbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yNC4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKCouLi4gLT4gU3RyaW5nKSAtPiAoKi4uLiAtPiBhKSAtPiAoKi4uLiAtPiBhKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIHRoZSBjYWNoZSBrZXkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gbWVtb2l6ZS5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBNZW1vaXplZCB2ZXJzaW9uIG9mIGBmbmAuXG4gKiBAc2VlIFIubWVtb2l6ZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIGxldCBjb3VudCA9IDA7XG4gKiAgICAgIGNvbnN0IGZhY3RvcmlhbCA9IFIubWVtb2l6ZVdpdGgoUi5pZGVudGl0eSwgbiA9PiB7XG4gKiAgICAgICAgY291bnQgKz0gMTtcbiAqICAgICAgICByZXR1cm4gUi5wcm9kdWN0KFIucmFuZ2UoMSwgbiArIDEpKTtcbiAqICAgICAgfSk7XG4gKiAgICAgIGZhY3RvcmlhbCg1KTsgLy89PiAxMjBcbiAqICAgICAgZmFjdG9yaWFsKDUpOyAvLz0+IDEyMFxuICogICAgICBmYWN0b3JpYWwoNSk7IC8vPT4gMTIwXG4gKiAgICAgIGNvdW50OyAvLz0+IDFcbiAqL1xuXG5cbnZhciBtZW1vaXplV2l0aCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIG1lbW9pemVXaXRoKG1GbiwgZm4pIHtcbiAgdmFyIGNhY2hlID0ge307XG4gIHJldHVybiBfYXJpdHkoZm4ubGVuZ3RoLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGtleSA9IG1Gbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICghX2hhcyhrZXksIGNhY2hlKSkge1xuICAgICAgY2FjaGVba2V5XSA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZVtrZXldO1xuICB9KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBtZW1vaXplV2l0aDsiLCJ2YXIgX2Fzc2lnbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19hc3NpZ24nKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBvd24gcHJvcGVydGllcyBvZiB0aGUgZmlyc3Qgb2JqZWN0IG1lcmdlZCB3aXRoXG4gKiB0aGUgb3duIHByb3BlcnRpZXMgb2YgdGhlIHNlY29uZCBvYmplY3QuIElmIGEga2V5IGV4aXN0cyBpbiBib3RoIG9iamVjdHMsXG4gKiB0aGUgdmFsdWUgZnJvbSB0aGUgc2Vjb25kIG9iamVjdCB3aWxsIGJlIHVzZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHtrOiB2fSAtPiB7azogdn0gLT4ge2s6IHZ9XG4gKiBAcGFyYW0ge09iamVjdH0gbFxuICogQHBhcmFtIHtPYmplY3R9IHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBzZWUgUi5tZXJnZURlZXBSaWdodCwgUi5tZXJnZVdpdGgsIFIubWVyZ2VXaXRoS2V5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5tZXJnZSh7ICduYW1lJzogJ2ZyZWQnLCAnYWdlJzogMTAgfSwgeyAnYWdlJzogNDAgfSk7XG4gKiAgICAgIC8vPT4geyAnbmFtZSc6ICdmcmVkJywgJ2FnZSc6IDQwIH1cbiAqXG4gKiAgICAgIHZhciByZXNldFRvRGVmYXVsdCA9IFIubWVyZ2UoUi5fXywge3g6IDB9KTtcbiAqICAgICAgcmVzZXRUb0RlZmF1bHQoe3g6IDUsIHk6IDJ9KTsgLy89PiB7eDogMCwgeTogMn1cbiAqIEBzeW1iIFIubWVyZ2UoeyB4OiAxLCB5OiAyIH0sIHsgeTogNSwgejogMyB9KSA9IHsgeDogMSwgeTogNSwgejogMyB9XG4gKi9cblxuXG52YXIgbWVyZ2UgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBtZXJnZShsLCByKSB7XG4gIHJldHVybiBfYXNzaWduKHt9LCBsLCByKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBtZXJnZTsiLCJ2YXIgX2Fzc2lnbiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19hc3NpZ24nKTtcblxudmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbi8qKlxuICogTWVyZ2VzIGEgbGlzdCBvZiBvYmplY3RzIHRvZ2V0aGVyIGludG8gb25lIG9iamVjdC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMC4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbe2s6IHZ9XSAtPiB7azogdn1cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgQW4gYXJyYXkgb2Ygb2JqZWN0c1xuICogQHJldHVybiB7T2JqZWN0fSBBIG1lcmdlZCBvYmplY3QuXG4gKiBAc2VlIFIucmVkdWNlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5tZXJnZUFsbChbe2ZvbzoxfSx7YmFyOjJ9LHtiYXo6M31dKTsgLy89PiB7Zm9vOjEsYmFyOjIsYmF6OjN9XG4gKiAgICAgIFIubWVyZ2VBbGwoW3tmb286MX0se2ZvbzoyfSx7YmFyOjJ9XSk7IC8vPT4ge2ZvbzoyLGJhcjoyfVxuICogQHN5bWIgUi5tZXJnZUFsbChbeyB4OiAxIH0sIHsgeTogMiB9LCB7IHo6IDMgfV0pID0geyB4OiAxLCB5OiAyLCB6OiAzIH1cbiAqL1xuXG5cbnZhciBtZXJnZUFsbCA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIG1lcmdlQWxsKGxpc3QpIHtcbiAgcmV0dXJuIF9hc3NpZ24uYXBwbHkobnVsbCwgW3t9XS5jb25jYXQobGlzdCkpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG1lcmdlQWxsOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgbWVyZ2VEZWVwV2l0aEtleSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21lcmdlRGVlcFdpdGhLZXknKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBvd24gcHJvcGVydGllcyBvZiB0aGUgZmlyc3Qgb2JqZWN0IG1lcmdlZCB3aXRoXG4gKiB0aGUgb3duIHByb3BlcnRpZXMgb2YgdGhlIHNlY29uZCBvYmplY3QuIElmIGEga2V5IGV4aXN0cyBpbiBib3RoIG9iamVjdHM6XG4gKiAtIGFuZCBib3RoIHZhbHVlcyBhcmUgb2JqZWN0cywgdGhlIHR3byB2YWx1ZXMgd2lsbCBiZSByZWN1cnNpdmVseSBtZXJnZWRcbiAqIC0gb3RoZXJ3aXNlIHRoZSB2YWx1ZSBmcm9tIHRoZSBmaXJzdCBvYmplY3Qgd2lsbCBiZSB1c2VkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjI0LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcge2F9IC0+IHthfSAtPiB7YX1cbiAqIEBwYXJhbSB7T2JqZWN0fSBsT2JqXG4gKiBAcGFyYW0ge09iamVjdH0gck9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQHNlZSBSLm1lcmdlLCBSLm1lcmdlRGVlcFJpZ2h0LCBSLm1lcmdlRGVlcFdpdGgsIFIubWVyZ2VEZWVwV2l0aEtleVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubWVyZ2VEZWVwTGVmdCh7IG5hbWU6ICdmcmVkJywgYWdlOiAxMCwgY29udGFjdDogeyBlbWFpbDogJ21vb0BleGFtcGxlLmNvbScgfX0sXG4gKiAgICAgICAgICAgICAgICAgICAgICB7IGFnZTogNDAsIGNvbnRhY3Q6IHsgZW1haWw6ICdiYWFAZXhhbXBsZS5jb20nIH19KTtcbiAqICAgICAgLy89PiB7IG5hbWU6ICdmcmVkJywgYWdlOiAxMCwgY29udGFjdDogeyBlbWFpbDogJ21vb0BleGFtcGxlLmNvbScgfX1cbiAqL1xuXG5cbnZhciBtZXJnZURlZXBMZWZ0ID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gbWVyZ2VEZWVwTGVmdChsT2JqLCByT2JqKSB7XG4gIHJldHVybiBtZXJnZURlZXBXaXRoS2V5KGZ1bmN0aW9uIChrLCBsVmFsLCByVmFsKSB7XG4gICAgcmV0dXJuIGxWYWw7XG4gIH0sIGxPYmosIHJPYmopO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG1lcmdlRGVlcExlZnQ7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBtZXJnZURlZXBXaXRoS2V5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWVyZ2VEZWVwV2l0aEtleScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IHdpdGggdGhlIG93biBwcm9wZXJ0aWVzIG9mIHRoZSBmaXJzdCBvYmplY3QgbWVyZ2VkIHdpdGhcbiAqIHRoZSBvd24gcHJvcGVydGllcyBvZiB0aGUgc2Vjb25kIG9iamVjdC4gSWYgYSBrZXkgZXhpc3RzIGluIGJvdGggb2JqZWN0czpcbiAqIC0gYW5kIGJvdGggdmFsdWVzIGFyZSBvYmplY3RzLCB0aGUgdHdvIHZhbHVlcyB3aWxsIGJlIHJlY3Vyc2l2ZWx5IG1lcmdlZFxuICogLSBvdGhlcndpc2UgdGhlIHZhbHVlIGZyb20gdGhlIHNlY29uZCBvYmplY3Qgd2lsbCBiZSB1c2VkLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjI0LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcge2F9IC0+IHthfSAtPiB7YX1cbiAqIEBwYXJhbSB7T2JqZWN0fSBsT2JqXG4gKiBAcGFyYW0ge09iamVjdH0gck9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQHNlZSBSLm1lcmdlLCBSLm1lcmdlRGVlcExlZnQsIFIubWVyZ2VEZWVwV2l0aCwgUi5tZXJnZURlZXBXaXRoS2V5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5tZXJnZURlZXBSaWdodCh7IG5hbWU6ICdmcmVkJywgYWdlOiAxMCwgY29udGFjdDogeyBlbWFpbDogJ21vb0BleGFtcGxlLmNvbScgfX0sXG4gKiAgICAgICAgICAgICAgICAgICAgICAgeyBhZ2U6IDQwLCBjb250YWN0OiB7IGVtYWlsOiAnYmFhQGV4YW1wbGUuY29tJyB9fSk7XG4gKiAgICAgIC8vPT4geyBuYW1lOiAnZnJlZCcsIGFnZTogNDAsIGNvbnRhY3Q6IHsgZW1haWw6ICdiYWFAZXhhbXBsZS5jb20nIH19XG4gKi9cblxuXG52YXIgbWVyZ2VEZWVwUmlnaHQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBtZXJnZURlZXBSaWdodChsT2JqLCByT2JqKSB7XG4gIHJldHVybiBtZXJnZURlZXBXaXRoS2V5KGZ1bmN0aW9uIChrLCBsVmFsLCByVmFsKSB7XG4gICAgcmV0dXJuIHJWYWw7XG4gIH0sIGxPYmosIHJPYmopO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG1lcmdlRGVlcFJpZ2h0OyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG52YXIgbWVyZ2VEZWVwV2l0aEtleSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21lcmdlRGVlcFdpdGhLZXknKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBvd24gcHJvcGVydGllcyBvZiB0aGUgdHdvIHByb3ZpZGVkIG9iamVjdHMuXG4gKiBJZiBhIGtleSBleGlzdHMgaW4gYm90aCBvYmplY3RzOlxuICogLSBhbmQgYm90aCBhc3NvY2lhdGVkIHZhbHVlcyBhcmUgYWxzbyBvYmplY3RzIHRoZW4gdGhlIHZhbHVlcyB3aWxsIGJlXG4gKiAgIHJlY3Vyc2l2ZWx5IG1lcmdlZC5cbiAqIC0gb3RoZXJ3aXNlIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvIGFzc29jaWF0ZWQgdmFsdWVzIHVzaW5nIHRoZVxuICogICByZXN1bHRpbmcgdmFsdWUgYXMgdGhlIG5ldyB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIGtleS5cbiAqIElmIGEga2V5IG9ubHkgZXhpc3RzIGluIG9uZSBvYmplY3QsIHRoZSB2YWx1ZSB3aWxsIGJlIGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5XG4gKiBvZiB0aGUgcmVzdWx0aW5nIG9iamVjdC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yNC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnICgoYSwgYSkgLT4gYSkgLT4ge2F9IC0+IHthfSAtPiB7YX1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gbE9ialxuICogQHBhcmFtIHtPYmplY3R9IHJPYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBzZWUgUi5tZXJnZVdpdGgsIFIubWVyZ2VEZWVwLCBSLm1lcmdlRGVlcFdpdGhLZXlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLm1lcmdlRGVlcFdpdGgoUi5jb25jYXQsXG4gKiAgICAgICAgICAgICAgICAgICAgICB7IGE6IHRydWUsIGM6IHsgdmFsdWVzOiBbMTAsIDIwXSB9fSxcbiAqICAgICAgICAgICAgICAgICAgICAgIHsgYjogdHJ1ZSwgYzogeyB2YWx1ZXM6IFsxNSwgMzVdIH19KTtcbiAqICAgICAgLy89PiB7IGE6IHRydWUsIGI6IHRydWUsIGM6IHsgdmFsdWVzOiBbMTAsIDIwLCAxNSwgMzVdIH19XG4gKi9cblxuXG52YXIgbWVyZ2VEZWVwV2l0aCA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIG1lcmdlRGVlcFdpdGgoZm4sIGxPYmosIHJPYmopIHtcbiAgcmV0dXJuIG1lcmdlRGVlcFdpdGhLZXkoZnVuY3Rpb24gKGssIGxWYWwsIHJWYWwpIHtcbiAgICByZXR1cm4gZm4obFZhbCwgclZhbCk7XG4gIH0sIGxPYmosIHJPYmopO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG1lcmdlRGVlcFdpdGg7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbnZhciBfaXNPYmplY3QgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNPYmplY3QnKTtcblxudmFyIG1lcmdlV2l0aEtleSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21lcmdlV2l0aEtleScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IHdpdGggdGhlIG93biBwcm9wZXJ0aWVzIG9mIHRoZSB0d28gcHJvdmlkZWQgb2JqZWN0cy5cbiAqIElmIGEga2V5IGV4aXN0cyBpbiBib3RoIG9iamVjdHM6XG4gKiAtIGFuZCBib3RoIGFzc29jaWF0ZWQgdmFsdWVzIGFyZSBhbHNvIG9iamVjdHMgdGhlbiB0aGUgdmFsdWVzIHdpbGwgYmVcbiAqICAgcmVjdXJzaXZlbHkgbWVyZ2VkLlxuICogLSBvdGhlcndpc2UgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG8gdGhlIGtleSBhbmQgYXNzb2NpYXRlZCB2YWx1ZXNcbiAqICAgdXNpbmcgdGhlIHJlc3VsdGluZyB2YWx1ZSBhcyB0aGUgbmV3IHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5LlxuICogSWYgYSBrZXkgb25seSBleGlzdHMgaW4gb25lIG9iamVjdCwgdGhlIHZhbHVlIHdpbGwgYmUgYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXlcbiAqIG9mIHRoZSByZXN1bHRpbmcgb2JqZWN0LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjI0LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgKChTdHJpbmcsIGEsIGEpIC0+IGEpIC0+IHthfSAtPiB7YX0gLT4ge2F9XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3R9IGxPYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSByT2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAc2VlIFIubWVyZ2VXaXRoS2V5LCBSLm1lcmdlRGVlcCwgUi5tZXJnZURlZXBXaXRoXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgbGV0IGNvbmNhdFZhbHVlcyA9IChrLCBsLCByKSA9PiBrID09ICd2YWx1ZXMnID8gUi5jb25jYXQobCwgcikgOiByXG4gKiAgICAgIFIubWVyZ2VEZWVwV2l0aEtleShjb25jYXRWYWx1ZXMsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICB7IGE6IHRydWUsIGM6IHsgdGhpbmc6ICdmb28nLCB2YWx1ZXM6IFsxMCwgMjBdIH19LFxuICogICAgICAgICAgICAgICAgICAgICAgICAgeyBiOiB0cnVlLCBjOiB7IHRoaW5nOiAnYmFyJywgdmFsdWVzOiBbMTUsIDM1XSB9fSk7XG4gKiAgICAgIC8vPT4geyBhOiB0cnVlLCBiOiB0cnVlLCBjOiB7IHRoaW5nOiAnYmFyJywgdmFsdWVzOiBbMTAsIDIwLCAxNSwgMzVdIH19XG4gKi9cblxuXG52YXIgbWVyZ2VEZWVwV2l0aEtleSA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIG1lcmdlRGVlcFdpdGhLZXkoZm4sIGxPYmosIHJPYmopIHtcbiAgcmV0dXJuIG1lcmdlV2l0aEtleShmdW5jdGlvbiAoaywgbFZhbCwgclZhbCkge1xuICAgIGlmIChfaXNPYmplY3QobFZhbCkgJiYgX2lzT2JqZWN0KHJWYWwpKSB7XG4gICAgICByZXR1cm4gbWVyZ2VEZWVwV2l0aEtleShmbiwgbFZhbCwgclZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmbihrLCBsVmFsLCByVmFsKTtcbiAgICB9XG4gIH0sIGxPYmosIHJPYmopO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG1lcmdlRGVlcFdpdGhLZXk7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbnZhciBtZXJnZVdpdGhLZXkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tZXJnZVdpdGhLZXknKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBvd24gcHJvcGVydGllcyBvZiB0aGUgdHdvIHByb3ZpZGVkIG9iamVjdHMuIElmXG4gKiBhIGtleSBleGlzdHMgaW4gYm90aCBvYmplY3RzLCB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gaXMgYXBwbGllZCB0byB0aGUgdmFsdWVzXG4gKiBhc3NvY2lhdGVkIHdpdGggdGhlIGtleSBpbiBlYWNoIG9iamVjdCwgd2l0aCB0aGUgcmVzdWx0IGJlaW5nIHVzZWQgYXMgdGhlXG4gKiB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIGtleSBpbiB0aGUgcmV0dXJuZWQgb2JqZWN0LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE5LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgKChhLCBhKSAtPiBhKSAtPiB7YX0gLT4ge2F9IC0+IHthfVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7T2JqZWN0fSBsXG4gKiBAcGFyYW0ge09iamVjdH0gclxuICogQHJldHVybiB7T2JqZWN0fVxuICogQHNlZSBSLm1lcmdlRGVlcFdpdGgsIFIubWVyZ2UsIFIubWVyZ2VXaXRoS2V5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5tZXJnZVdpdGgoUi5jb25jYXQsXG4gKiAgICAgICAgICAgICAgICAgIHsgYTogdHJ1ZSwgdmFsdWVzOiBbMTAsIDIwXSB9LFxuICogICAgICAgICAgICAgICAgICB7IGI6IHRydWUsIHZhbHVlczogWzE1LCAzNV0gfSk7XG4gKiAgICAgIC8vPT4geyBhOiB0cnVlLCBiOiB0cnVlLCB2YWx1ZXM6IFsxMCwgMjAsIDE1LCAzNV0gfVxuICovXG5cblxudmFyIG1lcmdlV2l0aCA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIG1lcmdlV2l0aChmbiwgbCwgcikge1xuICByZXR1cm4gbWVyZ2VXaXRoS2V5KGZ1bmN0aW9uIChfLCBfbCwgX3IpIHtcbiAgICByZXR1cm4gZm4oX2wsIF9yKTtcbiAgfSwgbCwgcik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbWVyZ2VXaXRoOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG52YXIgX2hhcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19oYXMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBvd24gcHJvcGVydGllcyBvZiB0aGUgdHdvIHByb3ZpZGVkIG9iamVjdHMuIElmXG4gKiBhIGtleSBleGlzdHMgaW4gYm90aCBvYmplY3RzLCB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gaXMgYXBwbGllZCB0byB0aGUga2V5XG4gKiBhbmQgdGhlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggdGhlIGtleSBpbiBlYWNoIG9iamVjdCwgd2l0aCB0aGUgcmVzdWx0IGJlaW5nXG4gKiB1c2VkIGFzIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIGtleSBpbiB0aGUgcmV0dXJuZWQgb2JqZWN0LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE5LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgKChTdHJpbmcsIGEsIGEpIC0+IGEpIC0+IHthfSAtPiB7YX0gLT4ge2F9XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3R9IGxcbiAqIEBwYXJhbSB7T2JqZWN0fSByXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAc2VlIFIubWVyZ2VEZWVwV2l0aEtleSwgUi5tZXJnZSwgUi5tZXJnZVdpdGhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBsZXQgY29uY2F0VmFsdWVzID0gKGssIGwsIHIpID0+IGsgPT0gJ3ZhbHVlcycgPyBSLmNvbmNhdChsLCByKSA6IHJcbiAqICAgICAgUi5tZXJnZVdpdGhLZXkoY29uY2F0VmFsdWVzLFxuICogICAgICAgICAgICAgICAgICAgICB7IGE6IHRydWUsIHRoaW5nOiAnZm9vJywgdmFsdWVzOiBbMTAsIDIwXSB9LFxuICogICAgICAgICAgICAgICAgICAgICB7IGI6IHRydWUsIHRoaW5nOiAnYmFyJywgdmFsdWVzOiBbMTUsIDM1XSB9KTtcbiAqICAgICAgLy89PiB7IGE6IHRydWUsIGI6IHRydWUsIHRoaW5nOiAnYmFyJywgdmFsdWVzOiBbMTAsIDIwLCAxNSwgMzVdIH1cbiAqIEBzeW1iIFIubWVyZ2VXaXRoS2V5KGYsIHsgeDogMSwgeTogMiB9LCB7IHk6IDUsIHo6IDMgfSkgPSB7IHg6IDEsIHk6IGYoJ3knLCAyLCA1KSwgejogMyB9XG4gKi9cblxuXG52YXIgbWVyZ2VXaXRoS2V5ID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gbWVyZ2VXaXRoS2V5KGZuLCBsLCByKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgdmFyIGs7XG5cbiAgZm9yIChrIGluIGwpIHtcbiAgICBpZiAoX2hhcyhrLCBsKSkge1xuICAgICAgcmVzdWx0W2tdID0gX2hhcyhrLCByKSA/IGZuKGssIGxba10sIHJba10pIDogbFtrXTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGsgaW4gcikge1xuICAgIGlmIChfaGFzKGssIHIpICYmICFfaGFzKGssIHJlc3VsdCkpIHtcbiAgICAgIHJlc3VsdFtrXSA9IHJba107XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBtZXJnZVdpdGhLZXk7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc21hbGxlciBvZiBpdHMgdHdvIGFyZ3VtZW50cy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBPcmQgYSA9PiBhIC0+IGEgLT4gYVxuICogQHBhcmFtIHsqfSBhXG4gKiBAcGFyYW0geyp9IGJcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIubWluQnksIFIubWF4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5taW4oNzg5LCAxMjMpOyAvLz0+IDEyM1xuICogICAgICBSLm1pbignYScsICdiJyk7IC8vPT4gJ2EnXG4gKi9cblxuXG52YXIgbWluID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gbWluKGEsIGIpIHtcbiAgcmV0dXJuIGIgPCBhID8gYiA6IGE7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbWluOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG4vKipcbiAqIFRha2VzIGEgZnVuY3Rpb24gYW5kIHR3byB2YWx1ZXMsIGFuZCByZXR1cm5zIHdoaWNoZXZlciB2YWx1ZSBwcm9kdWNlcyB0aGVcbiAqIHNtYWxsZXIgcmVzdWx0IHdoZW4gcGFzc2VkIHRvIHRoZSBwcm92aWRlZCBmdW5jdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC44LjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBPcmQgYiA9PiAoYSAtPiBiKSAtPiBhIC0+IGEgLT4gYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZlxuICogQHBhcmFtIHsqfSBhXG4gKiBAcGFyYW0geyp9IGJcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIubWluLCBSLm1heEJ5XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgLy8gIHNxdWFyZSA6OiBOdW1iZXIgLT4gTnVtYmVyXG4gKiAgICAgIHZhciBzcXVhcmUgPSBuID0+IG4gKiBuO1xuICpcbiAqICAgICAgUi5taW5CeShzcXVhcmUsIC0zLCAyKTsgLy89PiAyXG4gKlxuICogICAgICBSLnJlZHVjZShSLm1pbkJ5KHNxdWFyZSksIEluZmluaXR5LCBbMywgLTUsIDQsIDEsIC0yXSk7IC8vPT4gMVxuICogICAgICBSLnJlZHVjZShSLm1pbkJ5KHNxdWFyZSksIEluZmluaXR5LCBbXSk7IC8vPT4gSW5maW5pdHlcbiAqL1xuXG5cbnZhciBtaW5CeSA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIG1pbkJ5KGYsIGEsIGIpIHtcbiAgcmV0dXJuIGYoYikgPCBmKGEpID8gYiA6IGE7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbWluQnk7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogRGl2aWRlcyB0aGUgZmlyc3QgcGFyYW1ldGVyIGJ5IHRoZSBzZWNvbmQgYW5kIHJldHVybnMgdGhlIHJlbWFpbmRlci4gTm90ZVxuICogdGhhdCB0aGlzIGZ1bmN0aW9uIHByZXNlcnZlcyB0aGUgSmF2YVNjcmlwdC1zdHlsZSBiZWhhdmlvciBmb3IgbW9kdWxvLiBGb3JcbiAqIG1hdGhlbWF0aWNhbCBtb2R1bG8gc2VlIFtgbWF0aE1vZGBdKCNtYXRoTW9kKS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjFcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gTnVtYmVyXG4gKiBAcGFyYW0ge051bWJlcn0gYSBUaGUgdmFsdWUgdG8gdGhlIGRpdmlkZS5cbiAqIEBwYXJhbSB7TnVtYmVyfSBiIFRoZSBwc2V1ZG8tbW9kdWx1c1xuICogQHJldHVybiB7TnVtYmVyfSBUaGUgcmVzdWx0IG9mIGBiICUgYWAuXG4gKiBAc2VlIFIubWF0aE1vZFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIubW9kdWxvKDE3LCAzKTsgLy89PiAyXG4gKiAgICAgIC8vIEpTIGJlaGF2aW9yOlxuICogICAgICBSLm1vZHVsbygtMTcsIDMpOyAvLz0+IC0yXG4gKiAgICAgIFIubW9kdWxvKDE3LCAtMyk7IC8vPT4gMlxuICpcbiAqICAgICAgdmFyIGlzT2RkID0gUi5tb2R1bG8oUi5fXywgMik7XG4gKiAgICAgIGlzT2RkKDQyKTsgLy89PiAwXG4gKiAgICAgIGlzT2RkKDIxKTsgLy89PiAxXG4gKi9cblxuXG52YXIgbW9kdWxvID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gbW9kdWxvKGEsIGIpIHtcbiAgcmV0dXJuIGEgJSBiO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG1vZHVsbzsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byBudW1iZXJzLiBFcXVpdmFsZW50IHRvIGBhICogYmAgYnV0IGN1cnJpZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IE51bWJlclxuICogQHBhcmFtIHtOdW1iZXJ9IGEgVGhlIGZpcnN0IHZhbHVlLlxuICogQHBhcmFtIHtOdW1iZXJ9IGIgVGhlIHNlY29uZCB2YWx1ZS5cbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJlc3VsdCBvZiBgYSAqIGJgLlxuICogQHNlZSBSLmRpdmlkZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBkb3VibGUgPSBSLm11bHRpcGx5KDIpO1xuICogICAgICB2YXIgdHJpcGxlID0gUi5tdWx0aXBseSgzKTtcbiAqICAgICAgZG91YmxlKDMpOyAgICAgICAvLz0+ICA2XG4gKiAgICAgIHRyaXBsZSg0KTsgICAgICAgLy89PiAxMlxuICogICAgICBSLm11bHRpcGx5KDIsIDUpOyAgLy89PiAxMFxuICovXG5cblxudmFyIG11bHRpcGx5ID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gbXVsdGlwbHkoYSwgYikge1xuICByZXR1cm4gYSAqIGI7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbXVsdGlwbHk7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogV3JhcHMgYSBmdW5jdGlvbiBvZiBhbnkgYXJpdHkgKGluY2x1ZGluZyBudWxsYXJ5KSBpbiBhIGZ1bmN0aW9uIHRoYXQgYWNjZXB0c1xuICogZXhhY3RseSBgbmAgcGFyYW1ldGVycy4gQW55IGV4dHJhbmVvdXMgcGFyYW1ldGVycyB3aWxsIG5vdCBiZSBwYXNzZWQgdG8gdGhlXG4gKiBzdXBwbGllZCBmdW5jdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBOdW1iZXIgLT4gKCogLT4gYSkgLT4gKCogLT4gYSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBkZXNpcmVkIGFyaXR5IG9mIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB3cmFwcGluZyBgZm5gLiBUaGUgbmV3IGZ1bmN0aW9uIGlzIGd1YXJhbnRlZWQgdG8gYmUgb2ZcbiAqICAgICAgICAgYXJpdHkgYG5gLlxuICogQHNlZSBSLmJpbmFyeSwgUi51bmFyeVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciB0YWtlc1R3b0FyZ3MgPSAoYSwgYikgPT4gW2EsIGJdO1xuICpcbiAqICAgICAgdGFrZXNUd29BcmdzLmxlbmd0aDsgLy89PiAyXG4gKiAgICAgIHRha2VzVHdvQXJncygxLCAyKTsgLy89PiBbMSwgMl1cbiAqXG4gKiAgICAgIHZhciB0YWtlc09uZUFyZyA9IFIubkFyeSgxLCB0YWtlc1R3b0FyZ3MpO1xuICogICAgICB0YWtlc09uZUFyZy5sZW5ndGg7IC8vPT4gMVxuICogICAgICAvLyBPbmx5IGBuYCBhcmd1bWVudHMgYXJlIHBhc3NlZCB0byB0aGUgd3JhcHBlZCBmdW5jdGlvblxuICogICAgICB0YWtlc09uZUFyZygxLCAyKTsgLy89PiBbMSwgdW5kZWZpbmVkXVxuICogQHN5bWIgUi5uQXJ5KDAsIGYpKGEsIGIpID0gZigpXG4gKiBAc3ltYiBSLm5BcnkoMSwgZikoYSwgYikgPSBmKGEpXG4gKiBAc3ltYiBSLm5BcnkoMiwgZikoYSwgYikgPSBmKGEsIGIpXG4gKi9cblxuXG52YXIgbkFyeSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIG5BcnkobiwgZm4pIHtcbiAgc3dpdGNoIChuKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcyk7XG4gICAgICB9O1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTApIHtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTApO1xuICAgICAgfTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSkge1xuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBhMCwgYTEpO1xuICAgICAgfTtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIpIHtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMik7XG4gICAgICB9O1xuICAgIGNhc2UgNDpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMpIHtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMiwgYTMpO1xuICAgICAgfTtcbiAgICBjYXNlIDU6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCkge1xuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBhMCwgYTEsIGEyLCBhMywgYTQpO1xuICAgICAgfTtcbiAgICBjYXNlIDY6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gICAgICB9O1xuICAgIGNhc2UgNzpcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYpIHtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYpO1xuICAgICAgfTtcbiAgICBjYXNlIDg6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNykge1xuICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpO1xuICAgICAgfTtcbiAgICBjYXNlIDk6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpIHtcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCk7XG4gICAgICB9O1xuICAgIGNhc2UgMTA6XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KSB7XG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KTtcbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgdG8gbkFyeSBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIGludGVnZXIgbm8gZ3JlYXRlciB0aGFuIHRlbicpO1xuICB9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gbkFyeTsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuLyoqXG4gKiBOZWdhdGVzIGl0cyBhcmd1bWVudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC45LjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5uZWdhdGUoNDIpOyAvLz0+IC00MlxuICovXG5cblxudmFyIG5lZ2F0ZSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIG5lZ2F0ZShuKSB7XG4gIHJldHVybiAtbjtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBuZWdhdGU7IiwidmFyIF9jb21wbGVtZW50ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbXBsZW1lbnQnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfZGlzcGF0Y2hhYmxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xuXG52YXIgX3hhbnkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9feGFueScpO1xuXG52YXIgYW55ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYW55Jyk7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgbm8gZWxlbWVudHMgb2YgdGhlIGxpc3QgbWF0Y2ggdGhlIHByZWRpY2F0ZSwgYGZhbHNlYFxuICogb3RoZXJ3aXNlLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBhbnlgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEyLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBCb29sZWFuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIHByZWRpY2F0ZSBpcyBub3Qgc2F0aXNmaWVkIGJ5IGV2ZXJ5IGVsZW1lbnQsIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICogQHNlZSBSLmFsbCwgUi5hbnlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgaXNFdmVuID0gbiA9PiBuICUgMiA9PT0gMDtcbiAqICAgICAgdmFyIGlzT2RkID0gbiA9PiBuICUgMiA9PT0gMTtcbiAqXG4gKiAgICAgIFIubm9uZShpc0V2ZW4sIFsxLCAzLCA1LCA3LCA5LCAxMV0pOyAvLz0+IHRydWVcbiAqICAgICAgUi5ub25lKGlzT2RkLCBbMSwgMywgNSwgNywgOCwgMTFdKTsgLy89PiBmYWxzZVxuICovXG5cblxudmFyIG5vbmUgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MiggLyojX19QVVJFX18qL19jb21wbGVtZW50KCAvKiNfX1BVUkVfXyovX2Rpc3BhdGNoYWJsZShbJ2FueSddLCBfeGFueSwgYW55KSkpO1xubW9kdWxlLmV4cG9ydHMgPSBub25lOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG4vKipcbiAqIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBgIWAgb2YgaXRzIGFyZ3VtZW50LiBJdCB3aWxsIHJldHVybiBgdHJ1ZWAgd2hlblxuICogcGFzc2VkIGZhbHNlLXkgdmFsdWUsIGFuZCBgZmFsc2VgIHdoZW4gcGFzc2VkIGEgdHJ1dGgteSBvbmUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgKiAtPiBCb29sZWFuXG4gKiBAcGFyYW0geyp9IGEgYW55IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufSB0aGUgbG9naWNhbCBpbnZlcnNlIG9mIHBhc3NlZCBhcmd1bWVudC5cbiAqIEBzZWUgUi5jb21wbGVtZW50XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5ub3QodHJ1ZSk7IC8vPT4gZmFsc2VcbiAqICAgICAgUi5ub3QoZmFsc2UpOyAvLz0+IHRydWVcbiAqICAgICAgUi5ub3QoMCk7IC8vPT4gdHJ1ZVxuICogICAgICBSLm5vdCgxKTsgLy89PiBmYWxzZVxuICovXG5cblxudmFyIG5vdCA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIG5vdChhKSB7XG4gIHJldHVybiAhYTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBub3Q7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfaXNTdHJpbmcgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNTdHJpbmcnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBudGggZWxlbWVudCBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcuIElmIG4gaXMgbmVnYXRpdmUgdGhlXG4gKiBlbGVtZW50IGF0IGluZGV4IGxlbmd0aCArIG4gaXMgcmV0dXJuZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gW2FdIC0+IGEgfCBVbmRlZmluZWRcbiAqIEBzaWcgTnVtYmVyIC0+IFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXRcbiAqIEBwYXJhbSB7Kn0gbGlzdFxuICogQHJldHVybiB7Kn1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbGlzdCA9IFsnZm9vJywgJ2JhcicsICdiYXonLCAncXV1eCddO1xuICogICAgICBSLm50aCgxLCBsaXN0KTsgLy89PiAnYmFyJ1xuICogICAgICBSLm50aCgtMSwgbGlzdCk7IC8vPT4gJ3F1dXgnXG4gKiAgICAgIFIubnRoKC05OSwgbGlzdCk7IC8vPT4gdW5kZWZpbmVkXG4gKlxuICogICAgICBSLm50aCgyLCAnYWJjJyk7IC8vPT4gJ2MnXG4gKiAgICAgIFIubnRoKDMsICdhYmMnKTsgLy89PiAnJ1xuICogQHN5bWIgUi5udGgoLTEsIFthLCBiLCBjXSkgPSBjXG4gKiBAc3ltYiBSLm50aCgwLCBbYSwgYiwgY10pID0gYVxuICogQHN5bWIgUi5udGgoMSwgW2EsIGIsIGNdKSA9IGJcbiAqL1xuXG5cbnZhciBudGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBudGgob2Zmc2V0LCBsaXN0KSB7XG4gIHZhciBpZHggPSBvZmZzZXQgPCAwID8gbGlzdC5sZW5ndGggKyBvZmZzZXQgOiBvZmZzZXQ7XG4gIHJldHVybiBfaXNTdHJpbmcobGlzdCkgPyBsaXN0LmNoYXJBdChpZHgpIDogbGlzdFtpZHhdO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG50aDsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIGN1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2N1cnJ5TicpO1xuXG52YXIgbnRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbnRoJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgaXRzIG50aCBhcmd1bWVudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC45LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBOdW1iZXIgLT4gKi4uLiAtPiAqXG4gKiBAcGFyYW0ge051bWJlcn0gblxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5udGhBcmcoMSkoJ2EnLCAnYicsICdjJyk7IC8vPT4gJ2InXG4gKiAgICAgIFIubnRoQXJnKC0xKSgnYScsICdiJywgJ2MnKTsgLy89PiAnYydcbiAqIEBzeW1iIFIubnRoQXJnKC0xKShhLCBiLCBjKSA9IGNcbiAqIEBzeW1iIFIubnRoQXJnKDApKGEsIGIsIGMpID0gYVxuICogQHN5bWIgUi5udGhBcmcoMSkoYSwgYiwgYykgPSBiXG4gKi9cblxuXG52YXIgbnRoQXJnID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gbnRoQXJnKG4pIHtcbiAgdmFyIGFyaXR5ID0gbiA8IDAgPyAxIDogbiArIDE7XG4gIHJldHVybiBjdXJyeU4oYXJpdHksIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbnRoKG4sIGFyZ3VtZW50cyk7XG4gIH0pO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IG50aEFyZzsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBgb2AgaXMgYSBjdXJyaWVkIGNvbXBvc2l0aW9uIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHVuYXJ5IGZ1bmN0aW9uLlxuICogTGlrZSBbYGNvbXBvc2VgXSgjY29tcG9zZSksIGBvYCBwZXJmb3JtcyByaWdodC10by1sZWZ0IGZ1bmN0aW9uIGNvbXBvc2l0aW9uLlxuICogVW5saWtlIFtgY29tcG9zZWBdKCNjb21wb3NlKSwgdGhlIHJpZ2h0bW9zdCBmdW5jdGlvbiBwYXNzZWQgdG8gYG9gIHdpbGwgYmVcbiAqIGludm9rZWQgd2l0aCBvbmx5IG9uZSBhcmd1bWVudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yNC4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKGIgLT4gYykgLT4gKGEgLT4gYikgLT4gYSAtPiBjXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBnXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5jb21wb3NlLCBSLnBpcGVcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgY2xhc3N5R3JlZXRpbmcgPSBuYW1lID0+IFwiVGhlIG5hbWUncyBcIiArIG5hbWUubGFzdCArIFwiLCBcIiArIG5hbWUuZmlyc3QgKyBcIiBcIiArIG5hbWUubGFzdFxuICogICAgICB2YXIgeWVsbEdyZWV0aW5nID0gUi5vKFIudG9VcHBlciwgY2xhc3N5R3JlZXRpbmcpO1xuICogICAgICB5ZWxsR3JlZXRpbmcoe2ZpcnN0OiAnSmFtZXMnLCBsYXN0OiAnQm9uZCd9KTsgLy89PiBcIlRIRSBOQU1FJ1MgQk9ORCwgSkFNRVMgQk9ORFwiXG4gKlxuICogICAgICBSLm8oUi5tdWx0aXBseSgxMCksIFIuYWRkKDEwKSkoLTQpIC8vPT4gNjBcbiAqXG4gKiBAc3ltYiBSLm8oZiwgZywgeCkgPSBmKGcoeCkpXG4gKi9cblxuXG52YXIgbyA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIG8oZiwgZywgeCkge1xuICByZXR1cm4gZihnKHgpKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBvOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgYSBzaW5nbGUga2V5OnZhbHVlIHBhaXIuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTguMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyBTdHJpbmcgLT4gYSAtPiB7U3RyaW5nOmF9XG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7T2JqZWN0fVxuICogQHNlZSBSLnBhaXJcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbWF0Y2hQaHJhc2VzID0gUi5jb21wb3NlKFxuICogICAgICAgIFIub2JqT2YoJ211c3QnKSxcbiAqICAgICAgICBSLm1hcChSLm9iak9mKCdtYXRjaF9waHJhc2UnKSlcbiAqICAgICAgKTtcbiAqICAgICAgbWF0Y2hQaHJhc2VzKFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4ge211c3Q6IFt7bWF0Y2hfcGhyYXNlOiAnZm9vJ30sIHttYXRjaF9waHJhc2U6ICdiYXInfSwge21hdGNoX3BocmFzZTogJ2Jheid9XX1cbiAqL1xuXG5cbnZhciBvYmpPZiA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIG9iak9mKGtleSwgdmFsKSB7XG4gIHZhciBvYmogPSB7fTtcbiAgb2JqW2tleV0gPSB2YWw7XG4gIHJldHVybiBvYmo7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gb2JqT2Y7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBfb2YgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fb2YnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc2luZ2xldG9uIGFycmF5IGNvbnRhaW5pbmcgdGhlIHZhbHVlIHByb3ZpZGVkLlxuICpcbiAqIE5vdGUgdGhpcyBgb2ZgIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBFUzYgYG9mYDsgU2VlXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9vZlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjMuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIGEgLT4gW2FdXG4gKiBAcGFyYW0geyp9IHggYW55IHZhbHVlXG4gKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgd3JhcHBpbmcgYHhgLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIub2YobnVsbCk7IC8vPT4gW251bGxdXG4gKiAgICAgIFIub2YoWzQyXSk7IC8vPT4gW1s0Ml1dXG4gKi9cblxuXG52YXIgb2YgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShfb2YpO1xubW9kdWxlLmV4cG9ydHMgPSBvZjsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgcGFydGlhbCBjb3B5IG9mIGFuIG9iamVjdCBvbWl0dGluZyB0aGUga2V5cyBzcGVjaWZpZWQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIFtTdHJpbmddIC0+IHtTdHJpbmc6ICp9IC0+IHtTdHJpbmc6ICp9XG4gKiBAcGFyYW0ge0FycmF5fSBuYW1lcyBhbiBhcnJheSBvZiBTdHJpbmcgcHJvcGVydHkgbmFtZXMgdG8gb21pdCBmcm9tIHRoZSBuZXcgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gY29weSBmcm9tXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgbmV3IG9iamVjdCB3aXRoIHByb3BlcnRpZXMgZnJvbSBgbmFtZXNgIG5vdCBvbiBpdC5cbiAqIEBzZWUgUi5waWNrXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5vbWl0KFsnYScsICdkJ10sIHthOiAxLCBiOiAyLCBjOiAzLCBkOiA0fSk7IC8vPT4ge2I6IDIsIGM6IDN9XG4gKi9cblxuXG52YXIgb21pdCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIG9taXQobmFtZXMsIG9iaikge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIHZhciBpbmRleCA9IHt9O1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IG5hbWVzLmxlbmd0aDtcblxuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgaW5kZXhbbmFtZXNbaWR4XV0gPSAxO1xuICAgIGlkeCArPSAxO1xuICB9XG5cbiAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHtcbiAgICBpZiAoIWluZGV4Lmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICByZXN1bHRbcHJvcF0gPSBvYmpbcHJvcF07XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gb21pdDsiLCJ2YXIgX2FyaXR5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2FyaXR5Jyk7XG5cbnZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG4vKipcbiAqIEFjY2VwdHMgYSBmdW5jdGlvbiBgZm5gIGFuZCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBndWFyZHMgaW52b2NhdGlvbiBvZlxuICogYGZuYCBzdWNoIHRoYXQgYGZuYCBjYW4gb25seSBldmVyIGJlIGNhbGxlZCBvbmNlLCBubyBtYXR0ZXIgaG93IG1hbnkgdGltZXNcbiAqIHRoZSByZXR1cm5lZCBmdW5jdGlvbiBpcyBpbnZva2VkLiBUaGUgZmlyc3QgdmFsdWUgY2FsY3VsYXRlZCBpcyByZXR1cm5lZCBpblxuICogc3Vic2VxdWVudCBpbnZvY2F0aW9ucy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoYS4uLiAtPiBiKSAtPiAoYS4uLiAtPiBiKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHdyYXAgaW4gYSBjYWxsLW9ubHktb25jZSB3cmFwcGVyLlxuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSB3cmFwcGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBhZGRPbmVPbmNlID0gUi5vbmNlKHggPT4geCArIDEpO1xuICogICAgICBhZGRPbmVPbmNlKDEwKTsgLy89PiAxMVxuICogICAgICBhZGRPbmVPbmNlKGFkZE9uZU9uY2UoNTApKTsgLy89PiAxMVxuICovXG5cblxudmFyIG9uY2UgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiBvbmNlKGZuKSB7XG4gIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgdmFyIHJlc3VsdDtcbiAgcmV0dXJuIF9hcml0eShmbi5sZW5ndGgsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY2FsbGVkKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBjYWxsZWQgPSB0cnVlO1xuICAgIHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gb25jZTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiBvbmUgb3IgYm90aCBvZiBpdHMgYXJndW1lbnRzIGFyZSBgdHJ1ZWAuIFJldHVybnMgYGZhbHNlYFxuICogaWYgYm90aCBhcmd1bWVudHMgYXJlIGBmYWxzZWAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTG9naWNcbiAqIEBzaWcgYSAtPiBiIC0+IGEgfCBiXG4gKiBAcGFyYW0ge0FueX0gYVxuICogQHBhcmFtIHtBbnl9IGJcbiAqIEByZXR1cm4ge0FueX0gdGhlIGZpcnN0IGFyZ3VtZW50IGlmIHRydXRoeSwgb3RoZXJ3aXNlIHRoZSBzZWNvbmQgYXJndW1lbnQuXG4gKiBAc2VlIFIuZWl0aGVyXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5vcih0cnVlLCB0cnVlKTsgLy89PiB0cnVlXG4gKiAgICAgIFIub3IodHJ1ZSwgZmFsc2UpOyAvLz0+IHRydWVcbiAqICAgICAgUi5vcihmYWxzZSwgdHJ1ZSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLm9yKGZhbHNlLCBmYWxzZSk7IC8vPT4gZmFsc2VcbiAqL1xuXG5cbnZhciBvciA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIG9yKGEsIGIpIHtcbiAgcmV0dXJuIGEgfHwgYjtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBvcjsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLy8gYElkZW50aXR5YCBpcyBhIGZ1bmN0b3IgdGhhdCBob2xkcyBhIHNpbmdsZSB2YWx1ZSwgd2hlcmUgYG1hcGAgc2ltcGx5XG4vLyB0cmFuc2Zvcm1zIHRoZSBoZWxkIHZhbHVlIHdpdGggdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLlxuXG5cbnZhciBJZGVudGl0eSA9IGZ1bmN0aW9uICh4KSB7XG4gIHJldHVybiB7IHZhbHVlOiB4LCBtYXA6IGZ1bmN0aW9uIChmKSB7XG4gICAgICByZXR1cm4gSWRlbnRpdHkoZih4KSk7XG4gICAgfSB9O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgXCJzZXR0aW5nXCIgdGhlIHBvcnRpb24gb2YgdGhlIGdpdmVuIGRhdGEgc3RydWN0dXJlXG4gKiBmb2N1c2VkIGJ5IHRoZSBnaXZlbiBsZW5zIHRvIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgdGhlIGdpdmVuIGZ1bmN0aW9uIHRvXG4gKiB0aGUgZm9jdXNlZCB2YWx1ZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNi4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAdHlwZWRlZm4gTGVucyBzIGEgPSBGdW5jdG9yIGYgPT4gKGEgLT4gZiBhKSAtPiBzIC0+IGYgc1xuICogQHNpZyBMZW5zIHMgYSAtPiAoYSAtPiBhKSAtPiBzIC0+IHNcbiAqIEBwYXJhbSB7TGVuc30gbGVuc1xuICogQHBhcmFtIHsqfSB2XG4gKiBAcGFyYW0geyp9IHhcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIucHJvcCwgUi5sZW5zSW5kZXgsIFIubGVuc1Byb3BcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgaGVhZExlbnMgPSBSLmxlbnNJbmRleCgwKTtcbiAqXG4gKiAgICAgIFIub3ZlcihoZWFkTGVucywgUi50b1VwcGVyLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnRk9PJywgJ2JhcicsICdiYXonXVxuICovXG52YXIgb3ZlciA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIG92ZXIobGVucywgZiwgeCkge1xuICAvLyBUaGUgdmFsdWUgcmV0dXJuZWQgYnkgdGhlIGdldHRlciBmdW5jdGlvbiBpcyBmaXJzdCB0cmFuc2Zvcm1lZCB3aXRoIGBmYCxcbiAgLy8gdGhlbiBzZXQgYXMgdGhlIHZhbHVlIG9mIGFuIGBJZGVudGl0eWAuIFRoaXMgaXMgdGhlbiBtYXBwZWQgb3ZlciB3aXRoIHRoZVxuICAvLyBzZXR0ZXIgZnVuY3Rpb24gb2YgdGhlIGxlbnMuXG4gIHJldHVybiBsZW5zKGZ1bmN0aW9uICh5KSB7XG4gICAgcmV0dXJuIElkZW50aXR5KGYoeSkpO1xuICB9KSh4KS52YWx1ZTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBvdmVyOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFRha2VzIHR3byBhcmd1bWVudHMsIGBmc3RgIGFuZCBgc25kYCwgYW5kIHJldHVybnMgYFtmc3QsIHNuZF1gLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE4LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIGEgLT4gYiAtPiAoYSxiKVxuICogQHBhcmFtIHsqfSBmc3RcbiAqIEBwYXJhbSB7Kn0gc25kXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBzZWUgUi5vYmpPZiwgUi5vZlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucGFpcignZm9vJywgJ2JhcicpOyAvLz0+IFsnZm9vJywgJ2JhciddXG4gKi9cblxuXG52YXIgcGFpciA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHBhaXIoZnN0LCBzbmQpIHtcbiAgcmV0dXJuIFtmc3QsIHNuZF07XG59KTtcbm1vZHVsZS5leHBvcnRzID0gcGFpcjsiLCJ2YXIgX2NvbmNhdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jb25jYXQnKTtcblxudmFyIF9jcmVhdGVQYXJ0aWFsQXBwbGljYXRvciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jcmVhdGVQYXJ0aWFsQXBwbGljYXRvcicpO1xuXG4vKipcbiAqIFRha2VzIGEgZnVuY3Rpb24gYGZgIGFuZCBhIGxpc3Qgb2YgYXJndW1lbnRzLCBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIGBnYC5cbiAqIFdoZW4gYXBwbGllZCwgYGdgIHJldHVybnMgdGhlIHJlc3VsdCBvZiBhcHBseWluZyBgZmAgdG8gdGhlIGFyZ3VtZW50c1xuICogcHJvdmlkZWQgaW5pdGlhbGx5IGZvbGxvd2VkIGJ5IHRoZSBhcmd1bWVudHMgcHJvdmlkZWQgdG8gYGdgLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEwLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKGEsIGIsIGMsIC4uLiwgbikgLT4geCkgLT4gW2EsIGIsIGMsIC4uLl0gLT4gKChkLCBlLCBmLCAuLi4sIG4pIC0+IHgpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5wYXJ0aWFsUmlnaHRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgbXVsdGlwbHkyID0gKGEsIGIpID0+IGEgKiBiO1xuICogICAgICB2YXIgZG91YmxlID0gUi5wYXJ0aWFsKG11bHRpcGx5MiwgWzJdKTtcbiAqICAgICAgZG91YmxlKDIpOyAvLz0+IDRcbiAqXG4gKiAgICAgIHZhciBncmVldCA9IChzYWx1dGF0aW9uLCB0aXRsZSwgZmlyc3ROYW1lLCBsYXN0TmFtZSkgPT5cbiAqICAgICAgICBzYWx1dGF0aW9uICsgJywgJyArIHRpdGxlICsgJyAnICsgZmlyc3ROYW1lICsgJyAnICsgbGFzdE5hbWUgKyAnISc7XG4gKlxuICogICAgICB2YXIgc2F5SGVsbG8gPSBSLnBhcnRpYWwoZ3JlZXQsIFsnSGVsbG8nXSk7XG4gKiAgICAgIHZhciBzYXlIZWxsb1RvTXMgPSBSLnBhcnRpYWwoc2F5SGVsbG8sIFsnTXMuJ10pO1xuICogICAgICBzYXlIZWxsb1RvTXMoJ0phbmUnLCAnSm9uZXMnKTsgLy89PiAnSGVsbG8sIE1zLiBKYW5lIEpvbmVzISdcbiAqIEBzeW1iIFIucGFydGlhbChmLCBbYSwgYl0pKGMsIGQpID0gZihhLCBiLCBjLCBkKVxuICovXG5cblxudmFyIHBhcnRpYWwgPSAvKiNfX1BVUkVfXyovX2NyZWF0ZVBhcnRpYWxBcHBsaWNhdG9yKF9jb25jYXQpO1xubW9kdWxlLmV4cG9ydHMgPSBwYXJ0aWFsOyIsInZhciBfY29uY2F0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbmNhdCcpO1xuXG52YXIgX2NyZWF0ZVBhcnRpYWxBcHBsaWNhdG9yID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2NyZWF0ZVBhcnRpYWxBcHBsaWNhdG9yJyk7XG5cbnZhciBmbGlwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZmxpcCcpO1xuXG4vKipcbiAqIFRha2VzIGEgZnVuY3Rpb24gYGZgIGFuZCBhIGxpc3Qgb2YgYXJndW1lbnRzLCBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIGBnYC5cbiAqIFdoZW4gYXBwbGllZCwgYGdgIHJldHVybnMgdGhlIHJlc3VsdCBvZiBhcHBseWluZyBgZmAgdG8gdGhlIGFyZ3VtZW50c1xuICogcHJvdmlkZWQgdG8gYGdgIGZvbGxvd2VkIGJ5IHRoZSBhcmd1bWVudHMgcHJvdmlkZWQgaW5pdGlhbGx5LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEwLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKGEsIGIsIGMsIC4uLiwgbikgLT4geCkgLT4gW2QsIGUsIGYsIC4uLiwgbl0gLT4gKChhLCBiLCBjLCAuLi4pIC0+IHgpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5wYXJ0aWFsXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGdyZWV0ID0gKHNhbHV0YXRpb24sIHRpdGxlLCBmaXJzdE5hbWUsIGxhc3ROYW1lKSA9PlxuICogICAgICAgIHNhbHV0YXRpb24gKyAnLCAnICsgdGl0bGUgKyAnICcgKyBmaXJzdE5hbWUgKyAnICcgKyBsYXN0TmFtZSArICchJztcbiAqXG4gKiAgICAgIHZhciBncmVldE1zSmFuZUpvbmVzID0gUi5wYXJ0aWFsUmlnaHQoZ3JlZXQsIFsnTXMuJywgJ0phbmUnLCAnSm9uZXMnXSk7XG4gKlxuICogICAgICBncmVldE1zSmFuZUpvbmVzKCdIZWxsbycpOyAvLz0+ICdIZWxsbywgTXMuIEphbmUgSm9uZXMhJ1xuICogQHN5bWIgUi5wYXJ0aWFsUmlnaHQoZiwgW2EsIGJdKShjLCBkKSA9IGYoYywgZCwgYSwgYilcbiAqL1xuXG5cbnZhciBwYXJ0aWFsUmlnaHQgPSAvKiNfX1BVUkVfXyovX2NyZWF0ZVBhcnRpYWxBcHBsaWNhdG9yKCAvKiNfX1BVUkVfXyovZmxpcChfY29uY2F0KSk7XG5tb2R1bGUuZXhwb3J0cyA9IHBhcnRpYWxSaWdodDsiLCJ2YXIgZmlsdGVyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZmlsdGVyJyk7XG5cbnZhciBqdXh0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vanV4dCcpO1xuXG52YXIgcmVqZWN0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmVqZWN0Jyk7XG5cbi8qKlxuICogVGFrZXMgYSBwcmVkaWNhdGUgYW5kIGEgbGlzdCBvciBvdGhlciBgRmlsdGVyYWJsZWAgb2JqZWN0IGFuZCByZXR1cm5zIHRoZVxuICogcGFpciBvZiBmaWx0ZXJhYmxlIG9iamVjdHMgb2YgdGhlIHNhbWUgdHlwZSBvZiBlbGVtZW50cyB3aGljaCBkbyBhbmQgZG8gbm90XG4gKiBzYXRpc2Z5LCB0aGUgcHJlZGljYXRlLCByZXNwZWN0aXZlbHkuIEZpbHRlcmFibGUgb2JqZWN0cyBpbmNsdWRlIHBsYWluIG9iamVjdHMgb3IgYW55IG9iamVjdFxuICogdGhhdCBoYXMgYSBmaWx0ZXIgbWV0aG9kIHN1Y2ggYXMgYEFycmF5YC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjRcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIEZpbHRlcmFibGUgZiA9PiAoYSAtPiBCb29sZWFuKSAtPiBmIGEgLT4gW2YgYSwgZiBhXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSB0byBkZXRlcm1pbmUgd2hpY2ggc2lkZSB0aGUgZWxlbWVudCBiZWxvbmdzIHRvLlxuICogQHBhcmFtIHtBcnJheX0gZmlsdGVyYWJsZSB0aGUgbGlzdCAob3Igb3RoZXIgZmlsdGVyYWJsZSkgdG8gcGFydGl0aW9uLlxuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5LCBjb250YWluaW5nIGZpcnN0IHRoZSBzdWJzZXQgb2YgZWxlbWVudHMgdGhhdCBzYXRpc2Z5IHRoZVxuICogICAgICAgICBwcmVkaWNhdGUsIGFuZCBzZWNvbmQgdGhlIHN1YnNldCBvZiBlbGVtZW50cyB0aGF0IGRvIG5vdCBzYXRpc2Z5LlxuICogQHNlZSBSLmZpbHRlciwgUi5yZWplY3RcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnBhcnRpdGlvbihSLmNvbnRhaW5zKCdzJyksIFsnc3NzJywgJ3R0dCcsICdmb28nLCAnYmFycyddKTtcbiAqICAgICAgLy8gPT4gWyBbICdzc3MnLCAnYmFycycgXSwgIFsgJ3R0dCcsICdmb28nIF0gXVxuICpcbiAqICAgICAgUi5wYXJ0aXRpb24oUi5jb250YWlucygncycpLCB7IGE6ICdzc3MnLCBiOiAndHR0JywgZm9vOiAnYmFycycgfSk7XG4gKiAgICAgIC8vID0+IFsgeyBhOiAnc3NzJywgZm9vOiAnYmFycycgfSwgeyBiOiAndHR0JyB9ICBdXG4gKi9cblxuXG52YXIgcGFydGl0aW9uID0gLyojX19QVVJFX18qL2p1eHQoW2ZpbHRlciwgcmVqZWN0XSk7XG5tb2R1bGUuZXhwb3J0cyA9IHBhcnRpdGlvbjsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgdmFsdWUgYXQgYSBnaXZlbiBwYXRoLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHR5cGVkZWZuIElkeCA9IFN0cmluZyB8IEludFxuICogQHNpZyBbSWR4XSAtPiB7YX0gLT4gYSB8IFVuZGVmaW5lZFxuICogQHBhcmFtIHtBcnJheX0gcGF0aCBUaGUgcGF0aCB0byB1c2UuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcmV0cmlldmUgdGhlIG5lc3RlZCBwcm9wZXJ0eSBmcm9tLlxuICogQHJldHVybiB7Kn0gVGhlIGRhdGEgYXQgYHBhdGhgLlxuICogQHNlZSBSLnByb3BcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnBhdGgoWydhJywgJ2InXSwge2E6IHtiOiAyfX0pOyAvLz0+IDJcbiAqICAgICAgUi5wYXRoKFsnYScsICdiJ10sIHtjOiB7YjogMn19KTsgLy89PiB1bmRlZmluZWRcbiAqL1xuXG5cbnZhciBwYXRoID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gcGF0aChwYXRocywgb2JqKSB7XG4gIHZhciB2YWwgPSBvYmo7XG4gIHZhciBpZHggPSAwO1xuICB3aGlsZSAoaWR4IDwgcGF0aHMubGVuZ3RoKSB7XG4gICAgaWYgKHZhbCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhbCA9IHZhbFtwYXRoc1tpZHhdXTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gdmFsO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHBhdGg7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbnZhciBlcXVhbHMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9lcXVhbHMnKTtcblxudmFyIHBhdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wYXRoJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIGEgbmVzdGVkIHBhdGggb24gYW4gb2JqZWN0IGhhcyBhIHNwZWNpZmljIHZhbHVlLCBpblxuICogW2BSLmVxdWFsc2BdKCNlcXVhbHMpIHRlcm1zLiBNb3N0IGxpa2VseSB1c2VkIHRvIGZpbHRlciBhIGxpc3QuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNy4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEB0eXBlZGVmbiBJZHggPSBTdHJpbmcgfCBJbnRcbiAqIEBzaWcgW0lkeF0gLT4gYSAtPiB7YX0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtBcnJheX0gcGF0aCBUaGUgcGF0aCBvZiB0aGUgbmVzdGVkIHByb3BlcnR5IHRvIHVzZVxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIGNvbXBhcmUgdGhlIG5lc3RlZCBwcm9wZXJ0eSB3aXRoXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2sgdGhlIG5lc3RlZCBwcm9wZXJ0eSBpblxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSB2YWx1ZSBlcXVhbHMgdGhlIG5lc3RlZCBvYmplY3QgcHJvcGVydHksXG4gKiAgICAgICAgIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciB1c2VyMSA9IHsgYWRkcmVzczogeyB6aXBDb2RlOiA5MDIxMCB9IH07XG4gKiAgICAgIHZhciB1c2VyMiA9IHsgYWRkcmVzczogeyB6aXBDb2RlOiA1NTU1NSB9IH07XG4gKiAgICAgIHZhciB1c2VyMyA9IHsgbmFtZTogJ0JvYicgfTtcbiAqICAgICAgdmFyIHVzZXJzID0gWyB1c2VyMSwgdXNlcjIsIHVzZXIzIF07XG4gKiAgICAgIHZhciBpc0ZhbW91cyA9IFIucGF0aEVxKFsnYWRkcmVzcycsICd6aXBDb2RlJ10sIDkwMjEwKTtcbiAqICAgICAgUi5maWx0ZXIoaXNGYW1vdXMsIHVzZXJzKTsgLy89PiBbIHVzZXIxIF1cbiAqL1xuXG5cbnZhciBwYXRoRXEgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBwYXRoRXEoX3BhdGgsIHZhbCwgb2JqKSB7XG4gIHJldHVybiBlcXVhbHMocGF0aChfcGF0aCwgb2JqKSwgdmFsKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoRXE7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbnZhciBkZWZhdWx0VG8gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9kZWZhdWx0VG8nKTtcblxudmFyIHBhdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wYXRoJyk7XG5cbi8qKlxuICogSWYgdGhlIGdpdmVuLCBub24tbnVsbCBvYmplY3QgaGFzIGEgdmFsdWUgYXQgdGhlIGdpdmVuIHBhdGgsIHJldHVybnMgdGhlXG4gKiB2YWx1ZSBhdCB0aGF0IHBhdGguIE90aGVyd2lzZSByZXR1cm5zIHRoZSBwcm92aWRlZCBkZWZhdWx0IHZhbHVlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE4LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEB0eXBlZGVmbiBJZHggPSBTdHJpbmcgfCBJbnRcbiAqIEBzaWcgYSAtPiBbSWR4XSAtPiB7YX0gLT4gYVxuICogQHBhcmFtIHsqfSBkIFRoZSBkZWZhdWx0IHZhbHVlLlxuICogQHBhcmFtIHtBcnJheX0gcCBUaGUgcGF0aCB0byB1c2UuXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcmV0cmlldmUgdGhlIG5lc3RlZCBwcm9wZXJ0eSBmcm9tLlxuICogQHJldHVybiB7Kn0gVGhlIGRhdGEgYXQgYHBhdGhgIG9mIHRoZSBzdXBwbGllZCBvYmplY3Qgb3IgdGhlIGRlZmF1bHQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5wYXRoT3IoJ04vQScsIFsnYScsICdiJ10sIHthOiB7YjogMn19KTsgLy89PiAyXG4gKiAgICAgIFIucGF0aE9yKCdOL0EnLCBbJ2EnLCAnYiddLCB7Yzoge2I6IDJ9fSk7IC8vPT4gXCJOL0FcIlxuICovXG5cblxudmFyIHBhdGhPciA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIHBhdGhPcihkLCBwLCBvYmopIHtcbiAgcmV0dXJuIGRlZmF1bHRUbyhkLCBwYXRoKHAsIG9iaikpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHBhdGhPcjsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxudmFyIHBhdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wYXRoJyk7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHNwZWNpZmllZCBvYmplY3QgcHJvcGVydHkgYXQgZ2l2ZW4gcGF0aCBzYXRpc2ZpZXMgdGhlXG4gKiBnaXZlbiBwcmVkaWNhdGU7IGBmYWxzZWAgb3RoZXJ3aXNlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE5LjBcbiAqIEBjYXRlZ29yeSBMb2dpY1xuICogQHR5cGVkZWZuIElkeCA9IFN0cmluZyB8IEludFxuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbSWR4XSAtPiB7YX0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZFxuICogQHBhcmFtIHtBcnJheX0gcHJvcFBhdGhcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHNlZSBSLnByb3BTYXRpc2ZpZXMsIFIucGF0aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucGF0aFNhdGlzZmllcyh5ID0+IHkgPiAwLCBbJ3gnLCAneSddLCB7eDoge3k6IDJ9fSk7IC8vPT4gdHJ1ZVxuICovXG5cblxudmFyIHBhdGhTYXRpc2ZpZXMgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBwYXRoU2F0aXNmaWVzKHByZWQsIHByb3BQYXRoLCBvYmopIHtcbiAgcmV0dXJuIHByb3BQYXRoLmxlbmd0aCA+IDAgJiYgcHJlZChwYXRoKHByb3BQYXRoLCBvYmopKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoU2F0aXNmaWVzOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFJldHVybnMgYSBwYXJ0aWFsIGNvcHkgb2YgYW4gb2JqZWN0IGNvbnRhaW5pbmcgb25seSB0aGUga2V5cyBzcGVjaWZpZWQuIElmXG4gKiB0aGUga2V5IGRvZXMgbm90IGV4aXN0LCB0aGUgcHJvcGVydHkgaXMgaWdub3JlZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgW2tdIC0+IHtrOiB2fSAtPiB7azogdn1cbiAqIEBwYXJhbSB7QXJyYXl9IG5hbWVzIGFuIGFycmF5IG9mIFN0cmluZyBwcm9wZXJ0eSBuYW1lcyB0byBjb3B5IG9udG8gYSBuZXcgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gY29weSBmcm9tXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgbmV3IG9iamVjdCB3aXRoIG9ubHkgcHJvcGVydGllcyBmcm9tIGBuYW1lc2Agb24gaXQuXG4gKiBAc2VlIFIub21pdCwgUi5wcm9wc1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucGljayhbJ2EnLCAnZCddLCB7YTogMSwgYjogMiwgYzogMywgZDogNH0pOyAvLz0+IHthOiAxLCBkOiA0fVxuICogICAgICBSLnBpY2soWydhJywgJ2UnLCAnZiddLCB7YTogMSwgYjogMiwgYzogMywgZDogNH0pOyAvLz0+IHthOiAxfVxuICovXG5cblxudmFyIHBpY2sgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBwaWNrKG5hbWVzLCBvYmopIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICB2YXIgaWR4ID0gMDtcbiAgd2hpbGUgKGlkeCA8IG5hbWVzLmxlbmd0aCkge1xuICAgIGlmIChuYW1lc1tpZHhdIGluIG9iaikge1xuICAgICAgcmVzdWx0W25hbWVzW2lkeF1dID0gb2JqW25hbWVzW2lkeF1dO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHBpY2s7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogU2ltaWxhciB0byBgcGlja2AgZXhjZXB0IHRoYXQgdGhpcyBvbmUgaW5jbHVkZXMgYSBga2V5OiB1bmRlZmluZWRgIHBhaXIgZm9yXG4gKiBwcm9wZXJ0aWVzIHRoYXQgZG9uJ3QgZXhpc3QuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIFtrXSAtPiB7azogdn0gLT4ge2s6IHZ9XG4gKiBAcGFyYW0ge0FycmF5fSBuYW1lcyBhbiBhcnJheSBvZiBTdHJpbmcgcHJvcGVydHkgbmFtZXMgdG8gY29weSBvbnRvIGEgbmV3IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGNvcHkgZnJvbVxuICogQHJldHVybiB7T2JqZWN0fSBBIG5ldyBvYmplY3Qgd2l0aCBvbmx5IHByb3BlcnRpZXMgZnJvbSBgbmFtZXNgIG9uIGl0LlxuICogQHNlZSBSLnBpY2tcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnBpY2tBbGwoWydhJywgJ2QnXSwge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9KTsgLy89PiB7YTogMSwgZDogNH1cbiAqICAgICAgUi5waWNrQWxsKFsnYScsICdlJywgJ2YnXSwge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9KTsgLy89PiB7YTogMSwgZTogdW5kZWZpbmVkLCBmOiB1bmRlZmluZWR9XG4gKi9cblxuXG52YXIgcGlja0FsbCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHBpY2tBbGwobmFtZXMsIG9iaikge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gbmFtZXMubGVuZ3RoO1xuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgdmFyIG5hbWUgPSBuYW1lc1tpZHhdO1xuICAgIHJlc3VsdFtuYW1lXSA9IG9ialtuYW1lXTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHBpY2tBbGw7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIHBhcnRpYWwgY29weSBvZiBhbiBvYmplY3QgY29udGFpbmluZyBvbmx5IHRoZSBrZXlzIHRoYXQgc2F0aXNmeVxuICogdGhlIHN1cHBsaWVkIHByZWRpY2F0ZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC44LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcgKCh2LCBrKSAtPiBCb29sZWFuKSAtPiB7azogdn0gLT4ge2s6IHZ9XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkIEEgcHJlZGljYXRlIHRvIGRldGVybWluZSB3aGV0aGVyIG9yIG5vdCBhIGtleVxuICogICAgICAgIHNob3VsZCBiZSBpbmNsdWRlZCBvbiB0aGUgb3V0cHV0IG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBjb3B5IGZyb21cbiAqIEByZXR1cm4ge09iamVjdH0gQSBuZXcgb2JqZWN0IHdpdGggb25seSBwcm9wZXJ0aWVzIHRoYXQgc2F0aXNmeSBgcHJlZGBcbiAqICAgICAgICAgb24gaXQuXG4gKiBAc2VlIFIucGljaywgUi5maWx0ZXJcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgaXNVcHBlckNhc2UgPSAodmFsLCBrZXkpID0+IGtleS50b1VwcGVyQ2FzZSgpID09PSBrZXk7XG4gKiAgICAgIFIucGlja0J5KGlzVXBwZXJDYXNlLCB7YTogMSwgYjogMiwgQTogMywgQjogNH0pOyAvLz0+IHtBOiAzLCBCOiA0fVxuICovXG5cblxudmFyIHBpY2tCeSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHBpY2tCeSh0ZXN0LCBvYmopIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgIGlmICh0ZXN0KG9ialtwcm9wXSwgcHJvcCwgb2JqKSkge1xuICAgICAgcmVzdWx0W3Byb3BdID0gb2JqW3Byb3BdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHBpY2tCeTsiLCJ2YXIgX2FyaXR5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2FyaXR5Jyk7XG5cbnZhciBfcGlwZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19waXBlJyk7XG5cbnZhciByZWR1Y2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZWR1Y2UnKTtcblxudmFyIHRhaWwgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi90YWlsJyk7XG5cbi8qKlxuICogUGVyZm9ybXMgbGVmdC10by1yaWdodCBmdW5jdGlvbiBjb21wb3NpdGlvbi4gVGhlIGxlZnRtb3N0IGZ1bmN0aW9uIG1heSBoYXZlXG4gKiBhbnkgYXJpdHk7IHRoZSByZW1haW5pbmcgZnVuY3Rpb25zIG11c3QgYmUgdW5hcnkuXG4gKlxuICogSW4gc29tZSBsaWJyYXJpZXMgdGhpcyBmdW5jdGlvbiBpcyBuYW1lZCBgc2VxdWVuY2VgLlxuICpcbiAqICoqTm90ZToqKiBUaGUgcmVzdWx0IG9mIHBpcGUgaXMgbm90IGF1dG9tYXRpY2FsbHkgY3VycmllZC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoKChhLCBiLCAuLi4sIG4pIC0+IG8pLCAobyAtPiBwKSwgLi4uLCAoeCAtPiB5KSwgKHkgLT4geikpIC0+ICgoYSwgYiwgLi4uLCBuKSAtPiB6KVxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3Rpb25zXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5jb21wb3NlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGYgPSBSLnBpcGUoTWF0aC5wb3csIFIubmVnYXRlLCBSLmluYyk7XG4gKlxuICogICAgICBmKDMsIDQpOyAvLyAtKDNeNCkgKyAxXG4gKiBAc3ltYiBSLnBpcGUoZiwgZywgaCkoYSwgYikgPSBoKGcoZihhLCBiKSkpXG4gKi9cblxuXG5mdW5jdGlvbiBwaXBlKCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigncGlwZSByZXF1aXJlcyBhdCBsZWFzdCBvbmUgYXJndW1lbnQnKTtcbiAgfVxuICByZXR1cm4gX2FyaXR5KGFyZ3VtZW50c1swXS5sZW5ndGgsIHJlZHVjZShfcGlwZSwgYXJndW1lbnRzWzBdLCB0YWlsKGFyZ3VtZW50cykpKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gcGlwZTsiLCJ2YXIgY29tcG9zZUsgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jb21wb3NlSycpO1xuXG52YXIgcmV2ZXJzZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JldmVyc2UnKTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBsZWZ0LXRvLXJpZ2h0IEtsZWlzbGkgY29tcG9zaXRpb24gb2YgdGhlIHByb3ZpZGVkIGZ1bmN0aW9ucyxcbiAqIGVhY2ggb2Ygd2hpY2ggbXVzdCByZXR1cm4gYSB2YWx1ZSBvZiBhIHR5cGUgc3VwcG9ydGVkIGJ5IFtgY2hhaW5gXSgjY2hhaW4pLlxuICpcbiAqIGBSLnBpcGVLKGYsIGcsIGgpYCBpcyBlcXVpdmFsZW50IHRvIGBSLnBpcGUoZiwgUi5jaGFpbihnKSwgUi5jaGFpbihoKSlgLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE2LjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyBDaGFpbiBtID0+ICgoYSAtPiBtIGIpLCAoYiAtPiBtIGMpLCAuLi4sICh5IC0+IG0geikpIC0+IChhIC0+IG0geilcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259XG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5jb21wb3NlS1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIC8vICBwYXJzZUpzb24gOjogU3RyaW5nIC0+IE1heWJlICpcbiAqICAgICAgLy8gIGdldCA6OiBTdHJpbmcgLT4gT2JqZWN0IC0+IE1heWJlICpcbiAqXG4gKiAgICAgIC8vICBnZXRTdGF0ZUNvZGUgOjogTWF5YmUgU3RyaW5nIC0+IE1heWJlIFN0cmluZ1xuICogICAgICB2YXIgZ2V0U3RhdGVDb2RlID0gUi5waXBlSyhcbiAqICAgICAgICBwYXJzZUpzb24sXG4gKiAgICAgICAgZ2V0KCd1c2VyJyksXG4gKiAgICAgICAgZ2V0KCdhZGRyZXNzJyksXG4gKiAgICAgICAgZ2V0KCdzdGF0ZScpLFxuICogICAgICAgIFIuY29tcG9zZShNYXliZS5vZiwgUi50b1VwcGVyKVxuICogICAgICApO1xuICpcbiAqICAgICAgZ2V0U3RhdGVDb2RlKCd7XCJ1c2VyXCI6e1wiYWRkcmVzc1wiOntcInN0YXRlXCI6XCJueVwifX19Jyk7XG4gKiAgICAgIC8vPT4gSnVzdCgnTlknKVxuICogICAgICBnZXRTdGF0ZUNvZGUoJ1tJbnZhbGlkIEpTT05dJyk7XG4gKiAgICAgIC8vPT4gTm90aGluZygpXG4gKiBAc3ltYiBSLnBpcGVLKGYsIGcsIGgpKGEpID0gUi5jaGFpbihoLCBSLmNoYWluKGcsIGYoYSkpKVxuICovXG5cblxuZnVuY3Rpb24gcGlwZUsoKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwaXBlSyByZXF1aXJlcyBhdCBsZWFzdCBvbmUgYXJndW1lbnQnKTtcbiAgfVxuICByZXR1cm4gY29tcG9zZUsuYXBwbHkodGhpcywgcmV2ZXJzZShhcmd1bWVudHMpKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gcGlwZUs7IiwidmFyIF9hcml0eSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19hcml0eScpO1xuXG52YXIgX3BpcGVQID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3BpcGVQJyk7XG5cbnZhciByZWR1Y2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZWR1Y2UnKTtcblxudmFyIHRhaWwgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi90YWlsJyk7XG5cbi8qKlxuICogUGVyZm9ybXMgbGVmdC10by1yaWdodCBjb21wb3NpdGlvbiBvZiBvbmUgb3IgbW9yZSBQcm9taXNlLXJldHVybmluZ1xuICogZnVuY3Rpb25zLiBUaGUgbGVmdG1vc3QgZnVuY3Rpb24gbWF5IGhhdmUgYW55IGFyaXR5OyB0aGUgcmVtYWluaW5nIGZ1bmN0aW9uc1xuICogbXVzdCBiZSB1bmFyeS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMC4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgKChhIC0+IFByb21pc2UgYiksIChiIC0+IFByb21pc2UgYyksIC4uLiwgKHkgLT4gUHJvbWlzZSB6KSkgLT4gKGEgLT4gUHJvbWlzZSB6KVxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3Rpb25zXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5jb21wb3NlUFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIC8vICBmb2xsb3dlcnNGb3JVc2VyIDo6IFN0cmluZyAtPiBQcm9taXNlIFtVc2VyXVxuICogICAgICB2YXIgZm9sbG93ZXJzRm9yVXNlciA9IFIucGlwZVAoZGIuZ2V0VXNlckJ5SWQsIGRiLmdldEZvbGxvd2Vycyk7XG4gKi9cblxuXG5mdW5jdGlvbiBwaXBlUCgpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3BpcGVQIHJlcXVpcmVzIGF0IGxlYXN0IG9uZSBhcmd1bWVudCcpO1xuICB9XG4gIHJldHVybiBfYXJpdHkoYXJndW1lbnRzWzBdLmxlbmd0aCwgcmVkdWNlKF9waXBlUCwgYXJndW1lbnRzWzBdLCB0YWlsKGFyZ3VtZW50cykpKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gcGlwZVA7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBtYXAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tYXAnKTtcblxudmFyIHByb3AgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wcm9wJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IGJ5IHBsdWNraW5nIHRoZSBzYW1lIG5hbWVkIHByb3BlcnR5IG9mZiBhbGwgb2JqZWN0cyBpblxuICogdGhlIGxpc3Qgc3VwcGxpZWQuXG4gKlxuICogYHBsdWNrYCB3aWxsIHdvcmsgb25cbiAqIGFueSBbZnVuY3Rvcl0oaHR0cHM6Ly9naXRodWIuY29tL2ZhbnRhc3lsYW5kL2ZhbnRhc3ktbGFuZCNmdW5jdG9yKSBpblxuICogYWRkaXRpb24gdG8gYXJyYXlzLCBhcyBpdCBpcyBlcXVpdmFsZW50IHRvIGBSLm1hcChSLnByb3AoayksIGYpYC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIEZ1bmN0b3IgZiA9PiBrIC0+IGYge2s6IHZ9IC0+IGYgdlxuICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfSBrZXkgVGhlIGtleSBuYW1lIHRvIHBsdWNrIG9mZiBvZiBlYWNoIG9iamVjdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGYgVGhlIGFycmF5IG9yIGZ1bmN0b3IgdG8gY29uc2lkZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3Qgb2YgdmFsdWVzIGZvciB0aGUgZ2l2ZW4ga2V5LlxuICogQHNlZSBSLnByb3BzXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5wbHVjaygnYScpKFt7YTogMX0sIHthOiAyfV0pOyAvLz0+IFsxLCAyXVxuICogICAgICBSLnBsdWNrKDApKFtbMSwgMl0sIFszLCA0XV0pOyAgIC8vPT4gWzEsIDNdXG4gKiAgICAgIFIucGx1Y2soJ3ZhbCcsIHthOiB7dmFsOiAzfSwgYjoge3ZhbDogNX19KTsgLy89PiB7YTogMywgYjogNX1cbiAqIEBzeW1iIFIucGx1Y2soJ3gnLCBbe3g6IDEsIHk6IDJ9LCB7eDogMywgeTogNH0sIHt4OiA1LCB5OiA2fV0pID0gWzEsIDMsIDVdXG4gKiBAc3ltYiBSLnBsdWNrKDAsIFtbMSwgMl0sIFszLCA0XSwgWzUsIDZdXSkgPSBbMSwgMywgNV1cbiAqL1xuXG5cbnZhciBwbHVjayA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHBsdWNrKHAsIGxpc3QpIHtcbiAgcmV0dXJuIG1hcChwcm9wKHApLCBsaXN0KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBwbHVjazsiLCJ2YXIgX2NvbmNhdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jb25jYXQnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IHdpdGggdGhlIGdpdmVuIGVsZW1lbnQgYXQgdGhlIGZyb250LCBmb2xsb3dlZCBieSB0aGVcbiAqIGNvbnRlbnRzIG9mIHRoZSBsaXN0LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgYSAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0geyp9IGVsIFRoZSBpdGVtIHRvIGFkZCB0byB0aGUgaGVhZCBvZiB0aGUgb3V0cHV0IGxpc3QuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBhZGQgdG8gdGhlIHRhaWwgb2YgdGhlIG91dHB1dCBsaXN0LlxuICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGFycmF5LlxuICogQHNlZSBSLmFwcGVuZFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucHJlcGVuZCgnZmVlJywgWydmaScsICdmbycsICdmdW0nXSk7IC8vPT4gWydmZWUnLCAnZmknLCAnZm8nLCAnZnVtJ11cbiAqL1xuXG5cbnZhciBwcmVwZW5kID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gcHJlcGVuZChlbCwgbGlzdCkge1xuICByZXR1cm4gX2NvbmNhdChbZWxdLCBsaXN0KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBwcmVwZW5kOyIsInZhciBtdWx0aXBseSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL211bHRpcGx5Jyk7XG5cbnZhciByZWR1Y2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9yZWR1Y2UnKTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHRvZ2V0aGVyIGFsbCB0aGUgZWxlbWVudHMgb2YgYSBsaXN0LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IE1hdGhcbiAqIEBzaWcgW051bWJlcl0gLT4gTnVtYmVyXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IEFuIGFycmF5IG9mIG51bWJlcnNcbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHByb2R1Y3Qgb2YgYWxsIHRoZSBudW1iZXJzIGluIHRoZSBsaXN0LlxuICogQHNlZSBSLnJlZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucHJvZHVjdChbMiw0LDYsOCwxMDAsMV0pOyAvLz0+IDM4NDAwXG4gKi9cblxuXG52YXIgcHJvZHVjdCA9IC8qI19fUFVSRV9fKi9yZWR1Y2UobXVsdGlwbHksIDEpO1xubW9kdWxlLmV4cG9ydHMgPSBwcm9kdWN0OyIsInZhciBfbWFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX21hcCcpO1xuXG52YXIgaWRlbnRpdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pZGVudGl0eScpO1xuXG52YXIgcGlja0FsbCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3BpY2tBbGwnKTtcblxudmFyIHVzZVdpdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi91c2VXaXRoJyk7XG5cbi8qKlxuICogUmVhc29uYWJsZSBhbmFsb2cgdG8gU1FMIGBzZWxlY3RgIHN0YXRlbWVudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBba10gLT4gW3trOiB2fV0gLT4gW3trOiB2fV1cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBuYW1lcyB0byBwcm9qZWN0XG4gKiBAcGFyYW0ge0FycmF5fSBvYmpzIFRoZSBvYmplY3RzIHRvIHF1ZXJ5XG4gKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgb2Ygb2JqZWN0cyB3aXRoIGp1c3QgdGhlIGBwcm9wc2AgcHJvcGVydGllcy5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgYWJieSA9IHtuYW1lOiAnQWJieScsIGFnZTogNywgaGFpcjogJ2Jsb25kJywgZ3JhZGU6IDJ9O1xuICogICAgICB2YXIgZnJlZCA9IHtuYW1lOiAnRnJlZCcsIGFnZTogMTIsIGhhaXI6ICdicm93bicsIGdyYWRlOiA3fTtcbiAqICAgICAgdmFyIGtpZHMgPSBbYWJieSwgZnJlZF07XG4gKiAgICAgIFIucHJvamVjdChbJ25hbWUnLCAnZ3JhZGUnXSwga2lkcyk7IC8vPT4gW3tuYW1lOiAnQWJieScsIGdyYWRlOiAyfSwge25hbWU6ICdGcmVkJywgZ3JhZGU6IDd9XVxuICovXG5cblxudmFyIHByb2plY3QgPSAvKiNfX1BVUkVfXyovdXNlV2l0aChfbWFwLCBbcGlja0FsbCwgaWRlbnRpdHldKTsgLy8gcGFzc2luZyBgaWRlbnRpdHlgIGdpdmVzIGNvcnJlY3QgYXJpdHlcbm1vZHVsZS5leHBvcnRzID0gcHJvamVjdDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIHBhdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wYXRoJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2hlbiBzdXBwbGllZCBhbiBvYmplY3QgcmV0dXJucyB0aGUgaW5kaWNhdGVkXG4gKiBwcm9wZXJ0eSBvZiB0aGF0IG9iamVjdCwgaWYgaXQgZXhpc3RzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyBzIC0+IHtzOiBhfSAtPiBhIHwgVW5kZWZpbmVkXG4gKiBAcGFyYW0ge1N0cmluZ30gcCBUaGUgcHJvcGVydHkgbmFtZVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHF1ZXJ5XG4gKiBAcmV0dXJuIHsqfSBUaGUgdmFsdWUgYXQgYG9iai5wYC5cbiAqIEBzZWUgUi5wYXRoXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5wcm9wKCd4Jywge3g6IDEwMH0pOyAvLz0+IDEwMFxuICogICAgICBSLnByb3AoJ3gnLCB7fSk7IC8vPT4gdW5kZWZpbmVkXG4gKi9cblxudmFyIHByb3AgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBwcm9wKHAsIG9iaikge1xuICByZXR1cm4gcGF0aChbcF0sIG9iaik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gcHJvcDsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxudmFyIGVxdWFscyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2VxdWFscycpO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBzcGVjaWZpZWQgb2JqZWN0IHByb3BlcnR5IGlzIGVxdWFsLCBpblxuICogW2BSLmVxdWFsc2BdKCNlcXVhbHMpIHRlcm1zLCB0byB0aGUgZ2l2ZW4gdmFsdWU7IGBmYWxzZWAgb3RoZXJ3aXNlLlxuICogWW91IGNhbiB0ZXN0IG11bHRpcGxlIHByb3BlcnRpZXMgd2l0aCBbYFIud2hlcmVgXSgjd2hlcmUpLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIFN0cmluZyAtPiBhIC0+IE9iamVjdCAtPiBCb29sZWFuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHNlZSBSLndoZXJlRXEsIFIucHJvcFNhdGlzZmllcywgUi5lcXVhbHNcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgYWJieSA9IHtuYW1lOiAnQWJieScsIGFnZTogNywgaGFpcjogJ2Jsb25kJ307XG4gKiAgICAgIHZhciBmcmVkID0ge25hbWU6ICdGcmVkJywgYWdlOiAxMiwgaGFpcjogJ2Jyb3duJ307XG4gKiAgICAgIHZhciBydXN0eSA9IHtuYW1lOiAnUnVzdHknLCBhZ2U6IDEwLCBoYWlyOiAnYnJvd24nfTtcbiAqICAgICAgdmFyIGFsb2lzID0ge25hbWU6ICdBbG9pcycsIGFnZTogMTUsIGRpc3Bvc2l0aW9uOiAnc3VybHknfTtcbiAqICAgICAgdmFyIGtpZHMgPSBbYWJieSwgZnJlZCwgcnVzdHksIGFsb2lzXTtcbiAqICAgICAgdmFyIGhhc0Jyb3duSGFpciA9IFIucHJvcEVxKCdoYWlyJywgJ2Jyb3duJyk7XG4gKiAgICAgIFIuZmlsdGVyKGhhc0Jyb3duSGFpciwga2lkcyk7IC8vPT4gW2ZyZWQsIHJ1c3R5XVxuICovXG5cblxudmFyIHByb3BFcSA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIHByb3BFcShuYW1lLCB2YWwsIG9iaikge1xuICByZXR1cm4gZXF1YWxzKHZhbCwgb2JqW25hbWVdKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBwcm9wRXE7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbnZhciBpcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2lzJyk7XG5cbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHNwZWNpZmllZCBvYmplY3QgcHJvcGVydHkgaXMgb2YgdGhlIGdpdmVuIHR5cGU7XG4gKiBgZmFsc2VgIG90aGVyd2lzZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNi4wXG4gKiBAY2F0ZWdvcnkgVHlwZVxuICogQHNpZyBUeXBlIC0+IFN0cmluZyAtPiBPYmplY3QgLT4gQm9vbGVhblxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHlwZVxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHNlZSBSLmlzLCBSLnByb3BTYXRpc2ZpZXNcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnByb3BJcyhOdW1iZXIsICd4Jywge3g6IDEsIHk6IDJ9KTsgIC8vPT4gdHJ1ZVxuICogICAgICBSLnByb3BJcyhOdW1iZXIsICd4Jywge3g6ICdmb28nfSk7ICAgIC8vPT4gZmFsc2VcbiAqICAgICAgUi5wcm9wSXMoTnVtYmVyLCAneCcsIHt9KTsgICAgICAgICAgICAvLz0+IGZhbHNlXG4gKi9cblxuXG52YXIgcHJvcElzID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gcHJvcElzKHR5cGUsIG5hbWUsIG9iaikge1xuICByZXR1cm4gaXModHlwZSwgb2JqW25hbWVdKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBwcm9wSXM7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbnZhciBfaGFzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2hhcycpO1xuXG4vKipcbiAqIElmIHRoZSBnaXZlbiwgbm9uLW51bGwgb2JqZWN0IGhhcyBhbiBvd24gcHJvcGVydHkgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUsXG4gKiByZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGF0IHByb3BlcnR5LiBPdGhlcndpc2UgcmV0dXJucyB0aGUgcHJvdmlkZWQgZGVmYXVsdFxuICogdmFsdWUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNi4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIGEgLT4gU3RyaW5nIC0+IE9iamVjdCAtPiBhXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgZGVmYXVsdCB2YWx1ZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byByZXR1cm4uXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJuIHsqfSBUaGUgdmFsdWUgb2YgZ2l2ZW4gcHJvcGVydHkgb2YgdGhlIHN1cHBsaWVkIG9iamVjdCBvciB0aGUgZGVmYXVsdCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgYWxpY2UgPSB7XG4gKiAgICAgICAgbmFtZTogJ0FMSUNFJyxcbiAqICAgICAgICBhZ2U6IDEwMVxuICogICAgICB9O1xuICogICAgICB2YXIgZmF2b3JpdGUgPSBSLnByb3AoJ2Zhdm9yaXRlTGlicmFyeScpO1xuICogICAgICB2YXIgZmF2b3JpdGVXaXRoRGVmYXVsdCA9IFIucHJvcE9yKCdSYW1kYScsICdmYXZvcml0ZUxpYnJhcnknKTtcbiAqXG4gKiAgICAgIGZhdm9yaXRlKGFsaWNlKTsgIC8vPT4gdW5kZWZpbmVkXG4gKiAgICAgIGZhdm9yaXRlV2l0aERlZmF1bHQoYWxpY2UpOyAgLy89PiAnUmFtZGEnXG4gKi9cblxuXG52YXIgcHJvcE9yID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gcHJvcE9yKHZhbCwgcCwgb2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiBfaGFzKHAsIG9iaikgPyBvYmpbcF0gOiB2YWw7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gcHJvcE9yOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBzcGVjaWZpZWQgb2JqZWN0IHByb3BlcnR5IHNhdGlzZmllcyB0aGUgZ2l2ZW5cbiAqIHByZWRpY2F0ZTsgYGZhbHNlYCBvdGhlcndpc2UuIFlvdSBjYW4gdGVzdCBtdWx0aXBsZSBwcm9wZXJ0aWVzIHdpdGhcbiAqIFtgUi53aGVyZWBdKCN3aGVyZSkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTYuMFxuICogQGNhdGVnb3J5IExvZ2ljXG4gKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFN0cmluZyAtPiB7U3RyaW5nOiBhfSAtPiBCb29sZWFuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHsqfSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAc2VlIFIud2hlcmUsIFIucHJvcEVxLCBSLnByb3BJc1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucHJvcFNhdGlzZmllcyh4ID0+IHggPiAwLCAneCcsIHt4OiAxLCB5OiAyfSk7IC8vPT4gdHJ1ZVxuICovXG5cblxudmFyIHByb3BTYXRpc2ZpZXMgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBwcm9wU2F0aXNmaWVzKHByZWQsIG5hbWUsIG9iaikge1xuICByZXR1cm4gcHJlZChvYmpbbmFtZV0pO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHByb3BTYXRpc2ZpZXM7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogQWN0cyBhcyBtdWx0aXBsZSBgcHJvcGA6IGFycmF5IG9mIGtleXMgaW4sIGFycmF5IG9mIHZhbHVlcyBvdXQuIFByZXNlcnZlc1xuICogb3JkZXIuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIFtrXSAtPiB7azogdn0gLT4gW3ZdXG4gKiBAcGFyYW0ge0FycmF5fSBwcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gZmV0Y2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBxdWVyeVxuICogQHJldHVybiB7QXJyYXl9IFRoZSBjb3JyZXNwb25kaW5nIHZhbHVlcyBvciBwYXJ0aWFsbHkgYXBwbGllZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnByb3BzKFsneCcsICd5J10sIHt4OiAxLCB5OiAyfSk7IC8vPT4gWzEsIDJdXG4gKiAgICAgIFIucHJvcHMoWydjJywgJ2EnLCAnYiddLCB7YjogMiwgYTogMX0pOyAvLz0+IFt1bmRlZmluZWQsIDEsIDJdXG4gKlxuICogICAgICB2YXIgZnVsbE5hbWUgPSBSLmNvbXBvc2UoUi5qb2luKCcgJyksIFIucHJvcHMoWydmaXJzdCcsICdsYXN0J10pKTtcbiAqICAgICAgZnVsbE5hbWUoe2xhc3Q6ICdCdWxsZXQtVG9vdGgnLCBhZ2U6IDMzLCBmaXJzdDogJ1RvbnknfSk7IC8vPT4gJ1RvbnkgQnVsbGV0LVRvb3RoJ1xuICovXG5cblxudmFyIHByb3BzID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gcHJvcHMocHMsIG9iaikge1xuICB2YXIgbGVuID0gcHMubGVuZ3RoO1xuICB2YXIgb3V0ID0gW107XG4gIHZhciBpZHggPSAwO1xuXG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBvdXRbaWR4XSA9IG9ialtwc1tpZHhdXTtcbiAgICBpZHggKz0gMTtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gcHJvcHM7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfaXNOdW1iZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNOdW1iZXInKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBvZiBudW1iZXJzIGZyb20gYGZyb21gIChpbmNsdXNpdmUpIHRvIGB0b2AgKGV4Y2x1c2l2ZSkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IFtOdW1iZXJdXG4gKiBAcGFyYW0ge051bWJlcn0gZnJvbSBUaGUgZmlyc3QgbnVtYmVyIGluIHRoZSBsaXN0LlxuICogQHBhcmFtIHtOdW1iZXJ9IHRvIE9uZSBtb3JlIHRoYW4gdGhlIGxhc3QgbnVtYmVyIGluIHRoZSBsaXN0LlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBsaXN0IG9mIG51bWJlcnMgaW4gdHRoZSBzZXQgYFthLCBiKWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5yYW5nZSgxLCA1KTsgICAgLy89PiBbMSwgMiwgMywgNF1cbiAqICAgICAgUi5yYW5nZSg1MCwgNTMpOyAgLy89PiBbNTAsIDUxLCA1Ml1cbiAqL1xuXG5cbnZhciByYW5nZSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHJhbmdlKGZyb20sIHRvKSB7XG4gIGlmICghKF9pc051bWJlcihmcm9tKSAmJiBfaXNOdW1iZXIodG8pKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvdGggYXJndW1lbnRzIHRvIHJhbmdlIG11c3QgYmUgbnVtYmVycycpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIG4gPSBmcm9tO1xuICB3aGlsZSAobiA8IHRvKSB7XG4gICAgcmVzdWx0LnB1c2gobik7XG4gICAgbiArPSAxO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gcmFuZ2U7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbnZhciBfcmVkdWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3JlZHVjZScpO1xuXG4vKipcbiAqIFJldHVybnMgYSBzaW5nbGUgaXRlbSBieSBpdGVyYXRpbmcgdGhyb3VnaCB0aGUgbGlzdCwgc3VjY2Vzc2l2ZWx5IGNhbGxpbmdcbiAqIHRoZSBpdGVyYXRvciBmdW5jdGlvbiBhbmQgcGFzc2luZyBpdCBhbiBhY2N1bXVsYXRvciB2YWx1ZSBhbmQgdGhlIGN1cnJlbnRcbiAqIHZhbHVlIGZyb20gdGhlIGFycmF5LCBhbmQgdGhlbiBwYXNzaW5nIHRoZSByZXN1bHQgdG8gdGhlIG5leHQgY2FsbC5cbiAqXG4gKiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gcmVjZWl2ZXMgdHdvIHZhbHVlczogKihhY2MsIHZhbHVlKSouIEl0IG1heSB1c2VcbiAqIFtgUi5yZWR1Y2VkYF0oI3JlZHVjZWQpIHRvIHNob3J0Y3V0IHRoZSBpdGVyYXRpb24uXG4gKlxuICogVGhlIGFyZ3VtZW50cycgb3JkZXIgb2YgW2ByZWR1Y2VSaWdodGBdKCNyZWR1Y2VSaWdodCkncyBpdGVyYXRvciBmdW5jdGlvblxuICogaXMgKih2YWx1ZSwgYWNjKSouXG4gKlxuICogTm90ZTogYFIucmVkdWNlYCBkb2VzIG5vdCBza2lwIGRlbGV0ZWQgb3IgdW5hc3NpZ25lZCBpbmRpY2VzIChzcGFyc2VcbiAqIGFycmF5cyksIHVubGlrZSB0aGUgbmF0aXZlIGBBcnJheS5wcm90b3R5cGUucmVkdWNlYCBtZXRob2QuIEZvciBtb3JlIGRldGFpbHNcbiAqIG9uIHRoaXMgYmVoYXZpb3IsIHNlZTpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3JlZHVjZSNEZXNjcmlwdGlvblxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGByZWR1Y2VgIG1ldGhvZCBvZiB0aGUgdGhpcmQgYXJndW1lbnQsIGlmIHByZXNlbnQuIFdoZW5cbiAqIGRvaW5nIHNvLCBpdCBpcyB1cCB0byB0aGUgdXNlciB0byBoYW5kbGUgdGhlIFtgUi5yZWR1Y2VkYF0oI3JlZHVjZWQpXG4gKiBzaG9ydGN1dGluZywgYXMgdGhpcyBpcyBub3QgaW1wbGVtZW50ZWQgYnkgYHJlZHVjZWAuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoKGEsIGIpIC0+IGEpIC0+IGEgLT4gW2JdIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBpdGVyYXRvciBmdW5jdGlvbi4gUmVjZWl2ZXMgdHdvIHZhbHVlcywgdGhlIGFjY3VtdWxhdG9yIGFuZCB0aGVcbiAqICAgICAgICBjdXJyZW50IGVsZW1lbnQgZnJvbSB0aGUgYXJyYXkuXG4gKiBAcGFyYW0geyp9IGFjYyBUaGUgYWNjdW11bGF0b3IgdmFsdWUuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4geyp9IFRoZSBmaW5hbCwgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKiBAc2VlIFIucmVkdWNlZCwgUi5hZGRJbmRleCwgUi5yZWR1Y2VSaWdodFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucmVkdWNlKFIuc3VidHJhY3QsIDAsIFsxLCAyLCAzLCA0XSkgLy8gPT4gKCgoKDAgLSAxKSAtIDIpIC0gMykgLSA0KSA9IC0xMFxuICogICAgICAvLyAgICAgICAgICAtICAgICAgICAgICAgICAgLTEwXG4gKiAgICAgIC8vICAgICAgICAgLyBcXCAgICAgICAgICAgICAgLyBcXFxuICogICAgICAvLyAgICAgICAgLSAgIDQgICAgICAgICAgIC02ICAgNFxuICogICAgICAvLyAgICAgICAvIFxcICAgICAgICAgICAgICAvIFxcXG4gKiAgICAgIC8vICAgICAgLSAgIDMgICA9PT4gICAgIC0zICAgM1xuICogICAgICAvLyAgICAgLyBcXCAgICAgICAgICAgICAgLyBcXFxuICogICAgICAvLyAgICAtICAgMiAgICAgICAgICAgLTEgICAyXG4gKiAgICAgIC8vICAgLyBcXCAgICAgICAgICAgICAgLyBcXFxuICogICAgICAvLyAgMCAgIDEgICAgICAgICAgICAwICAgMVxuICpcbiAqIEBzeW1iIFIucmVkdWNlKGYsIGEsIFtiLCBjLCBkXSkgPSBmKGYoZihhLCBiKSwgYyksIGQpXG4gKi9cblxuXG52YXIgcmVkdWNlID0gLyojX19QVVJFX18qL19jdXJyeTMoX3JlZHVjZSk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlZHVjZTsiLCJ2YXIgX2N1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeU4nKTtcblxudmFyIF9kaXNwYXRjaGFibGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fZGlzcGF0Y2hhYmxlJyk7XG5cbnZhciBfaGFzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2hhcycpO1xuXG52YXIgX3JlZHVjZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19yZWR1Y2UnKTtcblxudmFyIF94cmVkdWNlQnkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9feHJlZHVjZUJ5Jyk7XG5cbi8qKlxuICogR3JvdXBzIHRoZSBlbGVtZW50cyBvZiB0aGUgbGlzdCBhY2NvcmRpbmcgdG8gdGhlIHJlc3VsdCBvZiBjYWxsaW5nXG4gKiB0aGUgU3RyaW5nLXJldHVybmluZyBmdW5jdGlvbiBga2V5Rm5gIG9uIGVhY2ggZWxlbWVudCBhbmQgcmVkdWNlcyB0aGUgZWxlbWVudHNcbiAqIG9mIGVhY2ggZ3JvdXAgdG8gYSBzaW5nbGUgdmFsdWUgdmlhIHRoZSByZWR1Y2VyIGZ1bmN0aW9uIGB2YWx1ZUZuYC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGJhc2ljYWxseSBhIG1vcmUgZ2VuZXJhbCBbYGdyb3VwQnlgXSgjZ3JvdXBCeSkgZnVuY3Rpb24uXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIwLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICgoYSwgYikgLT4gYSkgLT4gYSAtPiAoYiAtPiBTdHJpbmcpIC0+IFtiXSAtPiB7U3RyaW5nOiBhfVxuICogQHBhcmFtIHtGdW5jdGlvbn0gdmFsdWVGbiBUaGUgZnVuY3Rpb24gdGhhdCByZWR1Y2VzIHRoZSBlbGVtZW50cyBvZiBlYWNoIGdyb3VwIHRvIGEgc2luZ2xlXG4gKiAgICAgICAgdmFsdWUuIFJlY2VpdmVzIHR3byB2YWx1ZXMsIGFjY3VtdWxhdG9yIGZvciBhIHBhcnRpY3VsYXIgZ3JvdXAgYW5kIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gKiBAcGFyYW0geyp9IGFjYyBUaGUgKGluaXRpYWwpIGFjY3VtdWxhdG9yIHZhbHVlIGZvciBlYWNoIGdyb3VwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5Rm4gVGhlIGZ1bmN0aW9uIHRoYXQgbWFwcyB0aGUgbGlzdCdzIGVsZW1lbnQgaW50byBhIGtleS5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGdyb3VwLlxuICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3Qgd2l0aCB0aGUgb3V0cHV0IG9mIGBrZXlGbmAgZm9yIGtleXMsIG1hcHBlZCB0byB0aGUgb3V0cHV0IG9mXG4gKiAgICAgICAgIGB2YWx1ZUZuYCBmb3IgZWxlbWVudHMgd2hpY2ggcHJvZHVjZWQgdGhhdCBrZXkgd2hlbiBwYXNzZWQgdG8gYGtleUZuYC5cbiAqIEBzZWUgUi5ncm91cEJ5LCBSLnJlZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciByZWR1Y2VUb05hbWVzQnkgPSBSLnJlZHVjZUJ5KChhY2MsIHN0dWRlbnQpID0+IGFjYy5jb25jYXQoc3R1ZGVudC5uYW1lKSwgW10pO1xuICogICAgICB2YXIgbmFtZXNCeUdyYWRlID0gcmVkdWNlVG9OYW1lc0J5KGZ1bmN0aW9uKHN0dWRlbnQpIHtcbiAqICAgICAgICB2YXIgc2NvcmUgPSBzdHVkZW50LnNjb3JlO1xuICogICAgICAgIHJldHVybiBzY29yZSA8IDY1ID8gJ0YnIDpcbiAqICAgICAgICAgICAgICAgc2NvcmUgPCA3MCA/ICdEJyA6XG4gKiAgICAgICAgICAgICAgIHNjb3JlIDwgODAgPyAnQycgOlxuICogICAgICAgICAgICAgICBzY29yZSA8IDkwID8gJ0InIDogJ0EnO1xuICogICAgICB9KTtcbiAqICAgICAgdmFyIHN0dWRlbnRzID0gW3tuYW1lOiAnTHVjeScsIHNjb3JlOiA5Mn0sXG4gKiAgICAgICAgICAgICAgICAgICAgICB7bmFtZTogJ0RyZXcnLCBzY29yZTogODV9LFxuICogICAgICAgICAgICAgICAgICAgICAgLy8gLi4uXG4gKiAgICAgICAgICAgICAgICAgICAgICB7bmFtZTogJ0JhcnQnLCBzY29yZTogNjJ9XTtcbiAqICAgICAgbmFtZXNCeUdyYWRlKHN0dWRlbnRzKTtcbiAqICAgICAgLy8ge1xuICogICAgICAvLyAgICdBJzogWydMdWN5J10sXG4gKiAgICAgIC8vICAgJ0InOiBbJ0RyZXcnXVxuICogICAgICAvLyAgIC8vIC4uLixcbiAqICAgICAgLy8gICAnRic6IFsnQmFydCddXG4gKiAgICAgIC8vIH1cbiAqL1xuXG5cbnZhciByZWR1Y2VCeSA9IC8qI19fUFVSRV9fKi9fY3VycnlOKDQsIFtdLCAvKiNfX1BVUkVfXyovX2Rpc3BhdGNoYWJsZShbXSwgX3hyZWR1Y2VCeSwgZnVuY3Rpb24gcmVkdWNlQnkodmFsdWVGbiwgdmFsdWVBY2MsIGtleUZuLCBsaXN0KSB7XG4gIHJldHVybiBfcmVkdWNlKGZ1bmN0aW9uIChhY2MsIGVsdCkge1xuICAgIHZhciBrZXkgPSBrZXlGbihlbHQpO1xuICAgIGFjY1trZXldID0gdmFsdWVGbihfaGFzKGtleSwgYWNjKSA/IGFjY1trZXldIDogdmFsdWVBY2MsIGVsdCk7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30sIGxpc3QpO1xufSkpO1xubW9kdWxlLmV4cG9ydHMgPSByZWR1Y2VCeTsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc2luZ2xlIGl0ZW0gYnkgaXRlcmF0aW5nIHRocm91Z2ggdGhlIGxpc3QsIHN1Y2Nlc3NpdmVseSBjYWxsaW5nXG4gKiB0aGUgaXRlcmF0b3IgZnVuY3Rpb24gYW5kIHBhc3NpbmcgaXQgYW4gYWNjdW11bGF0b3IgdmFsdWUgYW5kIHRoZSBjdXJyZW50XG4gKiB2YWx1ZSBmcm9tIHRoZSBhcnJheSwgYW5kIHRoZW4gcGFzc2luZyB0aGUgcmVzdWx0IHRvIHRoZSBuZXh0IGNhbGwuXG4gKlxuICogU2ltaWxhciB0byBbYHJlZHVjZWBdKCNyZWR1Y2UpLCBleGNlcHQgbW92ZXMgdGhyb3VnaCB0aGUgaW5wdXQgbGlzdCBmcm9tIHRoZVxuICogcmlnaHQgdG8gdGhlIGxlZnQuXG4gKlxuICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIHJlY2VpdmVzIHR3byB2YWx1ZXM6ICoodmFsdWUsIGFjYykqLCB3aGlsZSB0aGUgYXJndW1lbnRzJ1xuICogb3JkZXIgb2YgYHJlZHVjZWAncyBpdGVyYXRvciBmdW5jdGlvbiBpcyAqKGFjYywgdmFsdWUpKi5cbiAqXG4gKiBOb3RlOiBgUi5yZWR1Y2VSaWdodGAgZG9lcyBub3Qgc2tpcCBkZWxldGVkIG9yIHVuYXNzaWduZWQgaW5kaWNlcyAoc3BhcnNlXG4gKiBhcnJheXMpLCB1bmxpa2UgdGhlIG5hdGl2ZSBgQXJyYXkucHJvdG90eXBlLnJlZHVjZVJpZ2h0YCBtZXRob2QuIEZvciBtb3JlIGRldGFpbHNcbiAqIG9uIHRoaXMgYmVoYXZpb3IsIHNlZTpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L3JlZHVjZVJpZ2h0I0Rlc2NyaXB0aW9uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoKGEsIGIpIC0+IGIpIC0+IGIgLT4gW2FdIC0+IGJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBpdGVyYXRvciBmdW5jdGlvbi4gUmVjZWl2ZXMgdHdvIHZhbHVlcywgdGhlIGN1cnJlbnQgZWxlbWVudCBmcm9tIHRoZSBhcnJheVxuICogICAgICAgIGFuZCB0aGUgYWNjdW11bGF0b3IuXG4gKiBAcGFyYW0geyp9IGFjYyBUaGUgYWNjdW11bGF0b3IgdmFsdWUuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4geyp9IFRoZSBmaW5hbCwgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKiBAc2VlIFIucmVkdWNlLCBSLmFkZEluZGV4XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5yZWR1Y2VSaWdodChSLnN1YnRyYWN0LCAwLCBbMSwgMiwgMywgNF0pIC8vID0+ICgxIC0gKDIgLSAoMyAtICg0IC0gMCkpKSkgPSAtMlxuICogICAgICAvLyAgICAtICAgICAgICAgICAgICAgLTJcbiAqICAgICAgLy8gICAvIFxcICAgICAgICAgICAgICAvIFxcXG4gKiAgICAgIC8vICAxICAgLSAgICAgICAgICAgIDEgICAzXG4gKiAgICAgIC8vICAgICAvIFxcICAgICAgICAgICAgICAvIFxcXG4gKiAgICAgIC8vICAgIDIgICAtICAgICA9PT4gICAgMiAgLTFcbiAqICAgICAgLy8gICAgICAgLyBcXCAgICAgICAgICAgICAgLyBcXFxuICogICAgICAvLyAgICAgIDMgICAtICAgICAgICAgICAgMyAgIDRcbiAqICAgICAgLy8gICAgICAgICAvIFxcICAgICAgICAgICAgICAvIFxcXG4gKiAgICAgIC8vICAgICAgICA0ICAgMCAgICAgICAgICAgIDQgICAwXG4gKlxuICogQHN5bWIgUi5yZWR1Y2VSaWdodChmLCBhLCBbYiwgYywgZF0pID0gZihiLCBmKGMsIGYoZCwgYSkpKVxuICovXG5cblxudmFyIHJlZHVjZVJpZ2h0ID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gcmVkdWNlUmlnaHQoZm4sIGFjYywgbGlzdCkge1xuICB2YXIgaWR4ID0gbGlzdC5sZW5ndGggLSAxO1xuICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICBhY2MgPSBmbihsaXN0W2lkeF0sIGFjYyk7XG4gICAgaWR4IC09IDE7XG4gIH1cbiAgcmV0dXJuIGFjYztcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSByZWR1Y2VSaWdodDsiLCJ2YXIgX2N1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeU4nKTtcblxudmFyIF9yZWR1Y2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fcmVkdWNlJyk7XG5cbnZhciBfcmVkdWNlZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19yZWR1Y2VkJyk7XG5cbi8qKlxuICogTGlrZSBbYHJlZHVjZWBdKCNyZWR1Y2UpLCBgcmVkdWNlV2hpbGVgIHJldHVybnMgYSBzaW5nbGUgaXRlbSBieSBpdGVyYXRpbmdcbiAqIHRocm91Z2ggdGhlIGxpc3QsIHN1Y2Nlc3NpdmVseSBjYWxsaW5nIHRoZSBpdGVyYXRvciBmdW5jdGlvbi4gYHJlZHVjZVdoaWxlYFxuICogYWxzbyB0YWtlcyBhIHByZWRpY2F0ZSB0aGF0IGlzIGV2YWx1YXRlZCBiZWZvcmUgZWFjaCBzdGVwLiBJZiB0aGUgcHJlZGljYXRlXG4gKiByZXR1cm5zIGBmYWxzZWAsIGl0IFwic2hvcnQtY2lyY3VpdHNcIiB0aGUgaXRlcmF0aW9uIGFuZCByZXR1cm5zIHRoZSBjdXJyZW50XG4gKiB2YWx1ZSBvZiB0aGUgYWNjdW11bGF0b3IuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMjIuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKChhLCBiKSAtPiBCb29sZWFuKSAtPiAoKGEsIGIpIC0+IGEpIC0+IGEgLT4gW2JdIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgVGhlIHByZWRpY2F0ZS4gSXQgaXMgcGFzc2VkIHRoZSBhY2N1bXVsYXRvciBhbmQgdGhlXG4gKiAgICAgICAgY3VycmVudCBlbGVtZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLiBSZWNlaXZlcyB0d28gdmFsdWVzLCB0aGVcbiAqICAgICAgICBhY2N1bXVsYXRvciBhbmQgdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAqIEBwYXJhbSB7Kn0gYSBUaGUgYWNjdW11bGF0b3IgdmFsdWUuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4geyp9IFRoZSBmaW5hbCwgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKiBAc2VlIFIucmVkdWNlLCBSLnJlZHVjZWRcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgaXNPZGQgPSAoYWNjLCB4KSA9PiB4ICUgMiA9PT0gMTtcbiAqICAgICAgdmFyIHhzID0gWzEsIDMsIDUsIDYwLCA3NzcsIDgwMF07XG4gKiAgICAgIFIucmVkdWNlV2hpbGUoaXNPZGQsIFIuYWRkLCAwLCB4cyk7IC8vPT4gOVxuICpcbiAqICAgICAgdmFyIHlzID0gWzIsIDQsIDZdXG4gKiAgICAgIFIucmVkdWNlV2hpbGUoaXNPZGQsIFIuYWRkLCAxMTEsIHlzKTsgLy89PiAxMTFcbiAqL1xuXG5cbnZhciByZWR1Y2VXaGlsZSA9IC8qI19fUFVSRV9fKi9fY3VycnlOKDQsIFtdLCBmdW5jdGlvbiBfcmVkdWNlV2hpbGUocHJlZCwgZm4sIGEsIGxpc3QpIHtcbiAgcmV0dXJuIF9yZWR1Y2UoZnVuY3Rpb24gKGFjYywgeCkge1xuICAgIHJldHVybiBwcmVkKGFjYywgeCkgPyBmbihhY2MsIHgpIDogX3JlZHVjZWQoYWNjKTtcbiAgfSwgYSwgbGlzdCk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gcmVkdWNlV2hpbGU7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBfcmVkdWNlZCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19yZWR1Y2VkJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIHZhbHVlIHdyYXBwZWQgdG8gaW5kaWNhdGUgdGhhdCBpdCBpcyB0aGUgZmluYWwgdmFsdWUgb2YgdGhlIHJlZHVjZVxuICogYW5kIHRyYW5zZHVjZSBmdW5jdGlvbnMuIFRoZSByZXR1cm5lZCB2YWx1ZSBzaG91bGQgYmUgY29uc2lkZXJlZCBhIGJsYWNrXG4gKiBib3g6IHRoZSBpbnRlcm5hbCBzdHJ1Y3R1cmUgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgc3RhYmxlLlxuICpcbiAqIE5vdGU6IHRoaXMgb3B0aW1pemF0aW9uIGlzIHVuYXZhaWxhYmxlIHRvIGZ1bmN0aW9ucyBub3QgZXhwbGljaXRseSBsaXN0ZWRcbiAqIGFib3ZlLiBGb3IgaW5zdGFuY2UsIGl0IGlzIG5vdCBjdXJyZW50bHkgc3VwcG9ydGVkIGJ5XG4gKiBbYHJlZHVjZVJpZ2h0YF0oI3JlZHVjZVJpZ2h0KS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBhIC0+ICpcbiAqIEBwYXJhbSB7Kn0geCBUaGUgZmluYWwgdmFsdWUgb2YgdGhlIHJlZHVjZS5cbiAqIEByZXR1cm4geyp9IFRoZSB3cmFwcGVkIHZhbHVlLlxuICogQHNlZSBSLnJlZHVjZSwgUi50cmFuc2R1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgIFIucmVkdWNlKFxuICogICAgICAgKGFjYywgaXRlbSkgPT4gaXRlbSA+IDMgPyBSLnJlZHVjZWQoYWNjKSA6IGFjYy5jb25jYXQoaXRlbSksXG4gKiAgICAgICBbXSxcbiAqICAgICAgIFsxLCAyLCAzLCA0LCA1XSkgLy8gWzEsIDIsIDNdXG4gKi9cblxuXG52YXIgcmVkdWNlZCA9IC8qI19fUFVSRV9fKi9fY3VycnkxKF9yZWR1Y2VkKTtcbm1vZHVsZS5leHBvcnRzID0gcmVkdWNlZDsiLCJ2YXIgX2NvbXBsZW1lbnQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29tcGxlbWVudCcpO1xuXG52YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIGZpbHRlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ZpbHRlcicpO1xuXG4vKipcbiAqIFRoZSBjb21wbGVtZW50IG9mIFtgZmlsdGVyYF0oI2ZpbHRlcikuXG4gKlxuICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLiBGaWx0ZXJhYmxlXG4gKiBvYmplY3RzIGluY2x1ZGUgcGxhaW4gb2JqZWN0cyBvciBhbnkgb2JqZWN0IHRoYXQgaGFzIGEgZmlsdGVyIG1ldGhvZCBzdWNoXG4gKiBhcyBgQXJyYXlgLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgRmlsdGVyYWJsZSBmID0+IChhIC0+IEJvb2xlYW4pIC0+IGYgYSAtPiBmIGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGZpbHRlcmFibGVcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQHNlZSBSLmZpbHRlciwgUi50cmFuc2R1Y2UsIFIuYWRkSW5kZXhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgaXNPZGQgPSAobikgPT4gbiAlIDIgPT09IDE7XG4gKlxuICogICAgICBSLnJlamVjdChpc09kZCwgWzEsIDIsIDMsIDRdKTsgLy89PiBbMiwgNF1cbiAqXG4gKiAgICAgIFIucmVqZWN0KGlzT2RkLCB7YTogMSwgYjogMiwgYzogMywgZDogNH0pOyAvLz0+IHtiOiAyLCBkOiA0fVxuICovXG5cblxudmFyIHJlamVjdCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHJlamVjdChwcmVkLCBmaWx0ZXJhYmxlKSB7XG4gIHJldHVybiBmaWx0ZXIoX2NvbXBsZW1lbnQocHJlZCksIGZpbHRlcmFibGUpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlamVjdDsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBzdWItbGlzdCBvZiBgbGlzdGAgc3RhcnRpbmcgYXQgaW5kZXggYHN0YXJ0YCBhbmQgY29udGFpbmluZ1xuICogYGNvdW50YCBlbGVtZW50cy4gX05vdGUgdGhhdCB0aGlzIGlzIG5vdCBkZXN0cnVjdGl2ZV86IGl0IHJldHVybnMgYSBjb3B5IG9mXG4gKiB0aGUgbGlzdCB3aXRoIHRoZSBjaGFuZ2VzLlxuICogPHNtYWxsPk5vIGxpc3RzIGhhdmUgYmVlbiBoYXJtZWQgaW4gdGhlIGFwcGxpY2F0aW9uIG9mIHRoaXMgZnVuY3Rpb24uPC9zbWFsbD5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yLjJcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0IFRoZSBwb3NpdGlvbiB0byBzdGFydCByZW1vdmluZyBlbGVtZW50c1xuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IFRoZSBudW1iZXIgb2YgZWxlbWVudHMgdG8gcmVtb3ZlXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIHJlbW92ZSBmcm9tXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgQXJyYXkgd2l0aCBgY291bnRgIGVsZW1lbnRzIGZyb20gYHN0YXJ0YCByZW1vdmVkLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucmVtb3ZlKDIsIDMsIFsxLDIsMyw0LDUsNiw3LDhdKTsgLy89PiBbMSwyLDYsNyw4XVxuICovXG5cblxudmFyIHJlbW92ZSA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIHJlbW92ZShzdGFydCwgY291bnQsIGxpc3QpIHtcbiAgdmFyIHJlc3VsdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGxpc3QsIDApO1xuICByZXN1bHQuc3BsaWNlKHN0YXJ0LCBjb3VudCk7XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gcmVtb3ZlOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgYWx3YXlzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYWx3YXlzJyk7XG5cbnZhciB0aW1lcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3RpbWVzJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIGZpeGVkIGxpc3Qgb2Ygc2l6ZSBgbmAgY29udGFpbmluZyBhIHNwZWNpZmllZCBpZGVudGljYWwgdmFsdWUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4xXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBhIC0+IG4gLT4gW2FdXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byByZXBlYXQuXG4gKiBAcGFyYW0ge051bWJlcn0gbiBUaGUgZGVzaXJlZCBzaXplIG9mIHRoZSBvdXRwdXQgbGlzdC5cbiAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBhcnJheSBjb250YWluaW5nIGBuYCBgdmFsdWVgcy5cbiAqIEBzZWUgUi50aW1lc1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucmVwZWF0KCdoaScsIDUpOyAvLz0+IFsnaGknLCAnaGknLCAnaGknLCAnaGknLCAnaGknXVxuICpcbiAqICAgICAgdmFyIG9iaiA9IHt9O1xuICogICAgICB2YXIgcmVwZWF0ZWRPYmpzID0gUi5yZXBlYXQob2JqLCA1KTsgLy89PiBbe30sIHt9LCB7fSwge30sIHt9XVxuICogICAgICByZXBlYXRlZE9ianNbMF0gPT09IHJlcGVhdGVkT2Jqc1sxXTsgLy89PiB0cnVlXG4gKiBAc3ltYiBSLnJlcGVhdChhLCAwKSA9IFtdXG4gKiBAc3ltYiBSLnJlcGVhdChhLCAxKSA9IFthXVxuICogQHN5bWIgUi5yZXBlYXQoYSwgMikgPSBbYSwgYV1cbiAqL1xuXG5cbnZhciByZXBlYXQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiByZXBlYXQodmFsdWUsIG4pIHtcbiAgcmV0dXJuIHRpbWVzKGFsd2F5cyh2YWx1ZSksIG4pO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcGVhdDsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBSZXBsYWNlIGEgc3Vic3RyaW5nIG9yIHJlZ2V4IG1hdGNoIGluIGEgc3RyaW5nIHdpdGggYSByZXBsYWNlbWVudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC43LjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBzaWcgUmVnRXhwfFN0cmluZyAtPiBTdHJpbmcgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtSZWdFeHB8U3RyaW5nfSBwYXR0ZXJuIEEgcmVndWxhciBleHByZXNzaW9uIG9yIGEgc3Vic3RyaW5nIHRvIG1hdGNoLlxuICogQHBhcmFtIHtTdHJpbmd9IHJlcGxhY2VtZW50IFRoZSBzdHJpbmcgdG8gcmVwbGFjZSB0aGUgbWF0Y2hlcyB3aXRoLlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIGRvIHRoZSBzZWFyY2ggYW5kIHJlcGxhY2VtZW50IGluLlxuICogQHJldHVybiB7U3RyaW5nfSBUaGUgcmVzdWx0LlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIucmVwbGFjZSgnZm9vJywgJ2JhcicsICdmb28gZm9vIGZvbycpOyAvLz0+ICdiYXIgZm9vIGZvbydcbiAqICAgICAgUi5yZXBsYWNlKC9mb28vLCAnYmFyJywgJ2ZvbyBmb28gZm9vJyk7IC8vPT4gJ2JhciBmb28gZm9vJ1xuICpcbiAqICAgICAgLy8gVXNlIHRoZSBcImdcIiAoZ2xvYmFsKSBmbGFnIHRvIHJlcGxhY2UgYWxsIG9jY3VycmVuY2VzOlxuICogICAgICBSLnJlcGxhY2UoL2Zvby9nLCAnYmFyJywgJ2ZvbyBmb28gZm9vJyk7IC8vPT4gJ2JhciBiYXIgYmFyJ1xuICovXG5cblxudmFyIHJlcGxhY2UgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiByZXBsYWNlKHJlZ2V4LCByZXBsYWNlbWVudCwgc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShyZWdleCwgcmVwbGFjZW1lbnQpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcGxhY2U7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBfaXNTdHJpbmcgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNTdHJpbmcnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGxpc3Qgb3Igc3RyaW5nIHdpdGggdGhlIGVsZW1lbnRzIG9yIGNoYXJhY3RlcnMgaW4gcmV2ZXJzZVxuICogb3JkZXIuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbYV0gLT4gW2FdXG4gKiBAc2lnIFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBsaXN0XG4gKiBAcmV0dXJuIHtBcnJheXxTdHJpbmd9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5yZXZlcnNlKFsxLCAyLCAzXSk7ICAvLz0+IFszLCAyLCAxXVxuICogICAgICBSLnJldmVyc2UoWzEsIDJdKTsgICAgIC8vPT4gWzIsIDFdXG4gKiAgICAgIFIucmV2ZXJzZShbMV0pOyAgICAgICAgLy89PiBbMV1cbiAqICAgICAgUi5yZXZlcnNlKFtdKTsgICAgICAgICAvLz0+IFtdXG4gKlxuICogICAgICBSLnJldmVyc2UoJ2FiYycpOyAgICAgIC8vPT4gJ2NiYSdcbiAqICAgICAgUi5yZXZlcnNlKCdhYicpOyAgICAgICAvLz0+ICdiYSdcbiAqICAgICAgUi5yZXZlcnNlKCdhJyk7ICAgICAgICAvLz0+ICdhJ1xuICogICAgICBSLnJldmVyc2UoJycpOyAgICAgICAgIC8vPT4gJydcbiAqL1xuXG5cbnZhciByZXZlcnNlID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gcmV2ZXJzZShsaXN0KSB7XG4gIHJldHVybiBfaXNTdHJpbmcobGlzdCkgPyBsaXN0LnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJykgOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCAwKS5yZXZlcnNlKCk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gcmV2ZXJzZTsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBTY2FuIGlzIHNpbWlsYXIgdG8gW2ByZWR1Y2VgXSgjcmVkdWNlKSwgYnV0IHJldHVybnMgYSBsaXN0IG9mIHN1Y2Nlc3NpdmVseVxuICogcmVkdWNlZCB2YWx1ZXMgZnJvbSB0aGUgbGVmdFxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEwLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnICgoYSwgYikgLT4gYSkgLT4gYSAtPiBbYl0gLT4gW2FdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24uIFJlY2VpdmVzIHR3byB2YWx1ZXMsIHRoZSBhY2N1bXVsYXRvciBhbmQgdGhlXG4gKiAgICAgICAgY3VycmVudCBlbGVtZW50IGZyb20gdGhlIGFycmF5XG4gKiBAcGFyYW0geyp9IGFjYyBUaGUgYWNjdW11bGF0b3IgdmFsdWUuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4ge0FycmF5fSBBIGxpc3Qgb2YgYWxsIGludGVybWVkaWF0ZWx5IHJlZHVjZWQgdmFsdWVzLlxuICogQHNlZSBSLnJlZHVjZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBudW1iZXJzID0gWzEsIDIsIDMsIDRdO1xuICogICAgICB2YXIgZmFjdG9yaWFscyA9IFIuc2NhbihSLm11bHRpcGx5LCAxLCBudW1iZXJzKTsgLy89PiBbMSwgMSwgMiwgNiwgMjRdXG4gKiBAc3ltYiBSLnNjYW4oZiwgYSwgW2IsIGNdKSA9IFthLCBmKGEsIGIpLCBmKGYoYSwgYiksIGMpXVxuICovXG5cblxudmFyIHNjYW4gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBzY2FuKGZuLCBhY2MsIGxpc3QpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgdmFyIHJlc3VsdCA9IFthY2NdO1xuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgYWNjID0gZm4oYWNjLCBsaXN0W2lkeF0pO1xuICAgIHJlc3VsdFtpZHggKyAxXSA9IGFjYztcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHNjYW47IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBhcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2FwJyk7XG5cbnZhciBtYXAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9tYXAnKTtcblxudmFyIHByZXBlbmQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9wcmVwZW5kJyk7XG5cbnZhciByZWR1Y2VSaWdodCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JlZHVjZVJpZ2h0Jyk7XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhIFtUcmF2ZXJzYWJsZV0oaHR0cHM6Ly9naXRodWIuY29tL2ZhbnRhc3lsYW5kL2ZhbnRhc3ktbGFuZCN0cmF2ZXJzYWJsZSlcbiAqIG9mIFtBcHBsaWNhdGl2ZV0oaHR0cHM6Ly9naXRodWIuY29tL2ZhbnRhc3lsYW5kL2ZhbnRhc3ktbGFuZCNhcHBsaWNhdGl2ZSkgaW50byBhblxuICogQXBwbGljYXRpdmUgb2YgVHJhdmVyc2FibGUuXG4gKlxuICogRGlzcGF0Y2hlcyB0byB0aGUgYHNlcXVlbmNlYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoQXBwbGljYXRpdmUgZiwgVHJhdmVyc2FibGUgdCkgPT4gKGEgLT4gZiBhKSAtPiB0IChmIGEpIC0+IGYgKHQgYSlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9mXG4gKiBAcGFyYW0geyp9IHRyYXZlcnNhYmxlXG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLnRyYXZlcnNlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5zZXF1ZW5jZShNYXliZS5vZiwgW0p1c3QoMSksIEp1c3QoMiksIEp1c3QoMyldKTsgICAvLz0+IEp1c3QoWzEsIDIsIDNdKVxuICogICAgICBSLnNlcXVlbmNlKE1heWJlLm9mLCBbSnVzdCgxKSwgSnVzdCgyKSwgTm90aGluZygpXSk7IC8vPT4gTm90aGluZygpXG4gKlxuICogICAgICBSLnNlcXVlbmNlKFIub2YsIEp1c3QoWzEsIDIsIDNdKSk7IC8vPT4gW0p1c3QoMSksIEp1c3QoMiksIEp1c3QoMyldXG4gKiAgICAgIFIuc2VxdWVuY2UoUi5vZiwgTm90aGluZygpKTsgICAgICAgLy89PiBbTm90aGluZygpXVxuICovXG5cblxudmFyIHNlcXVlbmNlID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gc2VxdWVuY2Uob2YsIHRyYXZlcnNhYmxlKSB7XG4gIHJldHVybiB0eXBlb2YgdHJhdmVyc2FibGUuc2VxdWVuY2UgPT09ICdmdW5jdGlvbicgPyB0cmF2ZXJzYWJsZS5zZXF1ZW5jZShvZikgOiByZWR1Y2VSaWdodChmdW5jdGlvbiAoeCwgYWNjKSB7XG4gICAgcmV0dXJuIGFwKG1hcChwcmVwZW5kLCB4KSwgYWNjKTtcbiAgfSwgb2YoW10pLCB0cmF2ZXJzYWJsZSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gc2VxdWVuY2U7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbnZhciBhbHdheXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hbHdheXMnKTtcblxudmFyIG92ZXIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9vdmVyJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcmVzdWx0IG9mIFwic2V0dGluZ1wiIHRoZSBwb3J0aW9uIG9mIHRoZSBnaXZlbiBkYXRhIHN0cnVjdHVyZVxuICogZm9jdXNlZCBieSB0aGUgZ2l2ZW4gbGVucyB0byB0aGUgZ2l2ZW4gdmFsdWUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTYuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHR5cGVkZWZuIExlbnMgcyBhID0gRnVuY3RvciBmID0+IChhIC0+IGYgYSkgLT4gcyAtPiBmIHNcbiAqIEBzaWcgTGVucyBzIGEgLT4gYSAtPiBzIC0+IHNcbiAqIEBwYXJhbSB7TGVuc30gbGVuc1xuICogQHBhcmFtIHsqfSB2XG4gKiBAcGFyYW0geyp9IHhcbiAqIEByZXR1cm4geyp9XG4gKiBAc2VlIFIucHJvcCwgUi5sZW5zSW5kZXgsIFIubGVuc1Byb3BcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgeExlbnMgPSBSLmxlbnNQcm9wKCd4Jyk7XG4gKlxuICogICAgICBSLnNldCh4TGVucywgNCwge3g6IDEsIHk6IDJ9KTsgIC8vPT4ge3g6IDQsIHk6IDJ9XG4gKiAgICAgIFIuc2V0KHhMZW5zLCA4LCB7eDogMSwgeTogMn0pOyAgLy89PiB7eDogOCwgeTogMn1cbiAqL1xuXG5cbnZhciBzZXQgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBzZXQobGVucywgdiwgeCkge1xuICByZXR1cm4gb3ZlcihsZW5zLCBhbHdheXModiksIHgpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHNldDsiLCJ2YXIgX2NoZWNrRm9yTWV0aG9kID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2NoZWNrRm9yTWV0aG9kJyk7XG5cbnZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGVsZW1lbnRzIG9mIHRoZSBnaXZlbiBsaXN0IG9yIHN0cmluZyAob3Igb2JqZWN0IHdpdGggYSBgc2xpY2VgXG4gKiBtZXRob2QpIGZyb20gYGZyb21JbmRleGAgKGluY2x1c2l2ZSkgdG8gYHRvSW5kZXhgIChleGNsdXNpdmUpLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBzbGljZWAgbWV0aG9kIG9mIHRoZSB0aGlyZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjRcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gW2FdIC0+IFthXVxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBmcm9tSW5kZXggVGhlIHN0YXJ0IGluZGV4IChpbmNsdXNpdmUpLlxuICogQHBhcmFtIHtOdW1iZXJ9IHRvSW5kZXggVGhlIGVuZCBpbmRleCAoZXhjbHVzaXZlKS5cbiAqIEBwYXJhbSB7Kn0gbGlzdFxuICogQHJldHVybiB7Kn1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnNsaWNlKDEsIDMsIFsnYScsICdiJywgJ2MnLCAnZCddKTsgICAgICAgIC8vPT4gWydiJywgJ2MnXVxuICogICAgICBSLnNsaWNlKDEsIEluZmluaXR5LCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7IC8vPT4gWydiJywgJ2MnLCAnZCddXG4gKiAgICAgIFIuc2xpY2UoMCwgLTEsIFsnYScsICdiJywgJ2MnLCAnZCddKTsgICAgICAgLy89PiBbJ2EnLCAnYicsICdjJ11cbiAqICAgICAgUi5zbGljZSgtMywgLTEsIFsnYScsICdiJywgJ2MnLCAnZCddKTsgICAgICAvLz0+IFsnYicsICdjJ11cbiAqICAgICAgUi5zbGljZSgwLCAzLCAncmFtZGEnKTsgICAgICAgICAgICAgICAgICAgICAvLz0+ICdyYW0nXG4gKi9cblxuXG52YXIgc2xpY2UgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyggLyojX19QVVJFX18qL19jaGVja0Zvck1ldGhvZCgnc2xpY2UnLCBmdW5jdGlvbiBzbGljZShmcm9tSW5kZXgsIHRvSW5kZXgsIGxpc3QpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGxpc3QsIGZyb21JbmRleCwgdG9JbmRleCk7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IHNsaWNlOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFJldHVybnMgYSBjb3B5IG9mIHRoZSBsaXN0LCBzb3J0ZWQgYWNjb3JkaW5nIHRvIHRoZSBjb21wYXJhdG9yIGZ1bmN0aW9uLFxuICogd2hpY2ggc2hvdWxkIGFjY2VwdCB0d28gdmFsdWVzIGF0IGEgdGltZSBhbmQgcmV0dXJuIGEgbmVnYXRpdmUgbnVtYmVyIGlmIHRoZVxuICogZmlyc3QgdmFsdWUgaXMgc21hbGxlciwgYSBwb3NpdGl2ZSBudW1iZXIgaWYgaXQncyBsYXJnZXIsIGFuZCB6ZXJvIGlmIHRoZXlcbiAqIGFyZSBlcXVhbC4gUGxlYXNlIG5vdGUgdGhhdCB0aGlzIGlzIGEgKipjb3B5Kiogb2YgdGhlIGxpc3QuIEl0IGRvZXMgbm90XG4gKiBtb2RpZnkgdGhlIG9yaWdpbmFsLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKChhLCBhKSAtPiBOdW1iZXIpIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbXBhcmF0b3IgQSBzb3J0aW5nIGZ1bmN0aW9uIDo6IGEgLT4gYiAtPiBJbnRcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gc29ydFxuICogQHJldHVybiB7QXJyYXl9IGEgbmV3IGFycmF5IHdpdGggaXRzIGVsZW1lbnRzIHNvcnRlZCBieSB0aGUgY29tcGFyYXRvciBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgZGlmZiA9IGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEgLSBiOyB9O1xuICogICAgICBSLnNvcnQoZGlmZiwgWzQsMiw3LDVdKTsgLy89PiBbMiwgNCwgNSwgN11cbiAqL1xuXG5cbnZhciBzb3J0ID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gc29ydChjb21wYXJhdG9yLCBsaXN0KSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCAwKS5zb3J0KGNvbXBhcmF0b3IpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHNvcnQ7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogU29ydHMgdGhlIGxpc3QgYWNjb3JkaW5nIHRvIHRoZSBzdXBwbGllZCBmdW5jdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBPcmQgYiA9PiAoYSAtPiBiKSAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBzb3J0LlxuICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGxpc3Qgc29ydGVkIGJ5IHRoZSBrZXlzIGdlbmVyYXRlZCBieSBgZm5gLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBzb3J0QnlGaXJzdEl0ZW0gPSBSLnNvcnRCeShSLnByb3AoMCkpO1xuICogICAgICB2YXIgc29ydEJ5TmFtZUNhc2VJbnNlbnNpdGl2ZSA9IFIuc29ydEJ5KFIuY29tcG9zZShSLnRvTG93ZXIsIFIucHJvcCgnbmFtZScpKSk7XG4gKiAgICAgIHZhciBwYWlycyA9IFtbLTEsIDFdLCBbLTIsIDJdLCBbLTMsIDNdXTtcbiAqICAgICAgc29ydEJ5Rmlyc3RJdGVtKHBhaXJzKTsgLy89PiBbWy0zLCAzXSwgWy0yLCAyXSwgWy0xLCAxXV1cbiAqICAgICAgdmFyIGFsaWNlID0ge1xuICogICAgICAgIG5hbWU6ICdBTElDRScsXG4gKiAgICAgICAgYWdlOiAxMDFcbiAqICAgICAgfTtcbiAqICAgICAgdmFyIGJvYiA9IHtcbiAqICAgICAgICBuYW1lOiAnQm9iJyxcbiAqICAgICAgICBhZ2U6IC0xMFxuICogICAgICB9O1xuICogICAgICB2YXIgY2xhcmEgPSB7XG4gKiAgICAgICAgbmFtZTogJ2NsYXJhJyxcbiAqICAgICAgICBhZ2U6IDMxNC4xNTlcbiAqICAgICAgfTtcbiAqICAgICAgdmFyIHBlb3BsZSA9IFtjbGFyYSwgYm9iLCBhbGljZV07XG4gKiAgICAgIHNvcnRCeU5hbWVDYXNlSW5zZW5zaXRpdmUocGVvcGxlKTsgLy89PiBbYWxpY2UsIGJvYiwgY2xhcmFdXG4gKi9cblxuXG52YXIgc29ydEJ5ID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gc29ydEJ5KGZuLCBsaXN0KSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCAwKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgdmFyIGFhID0gZm4oYSk7XG4gICAgdmFyIGJiID0gZm4oYik7XG4gICAgcmV0dXJuIGFhIDwgYmIgPyAtMSA6IGFhID4gYmIgPyAxIDogMDtcbiAgfSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gc29ydEJ5OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIFNvcnRzIGEgbGlzdCBhY2NvcmRpbmcgdG8gYSBsaXN0IG9mIGNvbXBhcmF0b3JzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIzLjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyBbKGEsIGEpIC0+IE51bWJlcl0gLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtBcnJheX0gZnVuY3Rpb25zIEEgbGlzdCBvZiBjb21wYXJhdG9yIGZ1bmN0aW9ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gc29ydC5cbiAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBsaXN0IHNvcnRlZCBhY2NvcmRpbmcgdG8gdGhlIGNvbWFyYXRvciBmdW5jdGlvbnMuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGFsaWNlID0ge1xuICogICAgICAgIG5hbWU6ICdhbGljZScsXG4gKiAgICAgICAgYWdlOiA0MFxuICogICAgICB9O1xuICogICAgICB2YXIgYm9iID0ge1xuICogICAgICAgIG5hbWU6ICdib2InLFxuICogICAgICAgIGFnZTogMzBcbiAqICAgICAgfTtcbiAqICAgICAgdmFyIGNsYXJhID0ge1xuICogICAgICAgIG5hbWU6ICdjbGFyYScsXG4gKiAgICAgICAgYWdlOiA0MFxuICogICAgICB9O1xuICogICAgICB2YXIgcGVvcGxlID0gW2NsYXJhLCBib2IsIGFsaWNlXTtcbiAqICAgICAgdmFyIGFnZU5hbWVTb3J0ID0gUi5zb3J0V2l0aChbXG4gKiAgICAgICAgUi5kZXNjZW5kKFIucHJvcCgnYWdlJykpLFxuICogICAgICAgIFIuYXNjZW5kKFIucHJvcCgnbmFtZScpKVxuICogICAgICBdKTtcbiAqICAgICAgYWdlTmFtZVNvcnQocGVvcGxlKTsgLy89PiBbYWxpY2UsIGNsYXJhLCBib2JdXG4gKi9cblxuXG52YXIgc29ydFdpdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBzb3J0V2l0aChmbnMsIGxpc3QpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGxpc3QsIDApLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgcmVzdWx0ID0gMDtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKHJlc3VsdCA9PT0gMCAmJiBpIDwgZm5zLmxlbmd0aCkge1xuICAgICAgcmVzdWx0ID0gZm5zW2ldKGEsIGIpO1xuICAgICAgaSArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBzb3J0V2l0aDsiLCJ2YXIgaW52b2tlciA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludm9rZXInKTtcblxuLyoqXG4gKiBTcGxpdHMgYSBzdHJpbmcgaW50byBhbiBhcnJheSBvZiBzdHJpbmdzIGJhc2VkIG9uIHRoZSBnaXZlblxuICogc2VwYXJhdG9yLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHNpZyAoU3RyaW5nIHwgUmVnRXhwKSAtPiBTdHJpbmcgLT4gW1N0cmluZ11cbiAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gc2VwIFRoZSBwYXR0ZXJuLlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIHNlcGFyYXRlIGludG8gYW4gYXJyYXkuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGFycmF5IG9mIHN0cmluZ3MgZnJvbSBgc3RyYCBzZXBhcmF0ZWQgYnkgYHN0cmAuXG4gKiBAc2VlIFIuam9pblxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBwYXRoQ29tcG9uZW50cyA9IFIuc3BsaXQoJy8nKTtcbiAqICAgICAgUi50YWlsKHBhdGhDb21wb25lbnRzKCcvdXNyL2xvY2FsL2Jpbi9ub2RlJykpOyAvLz0+IFsndXNyJywgJ2xvY2FsJywgJ2JpbicsICdub2RlJ11cbiAqXG4gKiAgICAgIFIuc3BsaXQoJy4nLCAnYS5iLmMueHl6LmQnKTsgLy89PiBbJ2EnLCAnYicsICdjJywgJ3h5eicsICdkJ11cbiAqL1xuXG5cbnZhciBzcGxpdCA9IC8qI19fUFVSRV9fKi9pbnZva2VyKDEsICdzcGxpdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBzcGxpdDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIGxlbmd0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2xlbmd0aCcpO1xuXG52YXIgc2xpY2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zbGljZScpO1xuXG4vKipcbiAqIFNwbGl0cyBhIGdpdmVuIGxpc3Qgb3Igc3RyaW5nIGF0IGEgZ2l2ZW4gaW5kZXguXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTkuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgTnVtYmVyIC0+IFthXSAtPiBbW2FdLCBbYV1dXG4gKiBAc2lnIE51bWJlciAtPiBTdHJpbmcgLT4gW1N0cmluZywgU3RyaW5nXVxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBpbmRleCB3aGVyZSB0aGUgYXJyYXkvc3RyaW5nIGlzIHNwbGl0LlxuICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGFycmF5IFRoZSBhcnJheS9zdHJpbmcgdG8gYmUgc3BsaXQuXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnNwbGl0QXQoMSwgWzEsIDIsIDNdKTsgICAgICAgICAgLy89PiBbWzFdLCBbMiwgM11dXG4gKiAgICAgIFIuc3BsaXRBdCg1LCAnaGVsbG8gd29ybGQnKTsgICAgICAvLz0+IFsnaGVsbG8nLCAnIHdvcmxkJ11cbiAqICAgICAgUi5zcGxpdEF0KC0xLCAnZm9vYmFyJyk7ICAgICAgICAgIC8vPT4gWydmb29iYScsICdyJ11cbiAqL1xuXG5cbnZhciBzcGxpdEF0ID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gc3BsaXRBdChpbmRleCwgYXJyYXkpIHtcbiAgcmV0dXJuIFtzbGljZSgwLCBpbmRleCwgYXJyYXkpLCBzbGljZShpbmRleCwgbGVuZ3RoKGFycmF5KSwgYXJyYXkpXTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBzcGxpdEF0OyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgc2xpY2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zbGljZScpO1xuXG4vKipcbiAqIFNwbGl0cyBhIGNvbGxlY3Rpb24gaW50byBzbGljZXMgb2YgdGhlIHNwZWNpZmllZCBsZW5ndGguXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTYuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgTnVtYmVyIC0+IFthXSAtPiBbW2FdXVxuICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IFtTdHJpbmddXG4gKiBAcGFyYW0ge051bWJlcn0gblxuICogQHBhcmFtIHtBcnJheX0gbGlzdFxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5zcGxpdEV2ZXJ5KDMsIFsxLCAyLCAzLCA0LCA1LCA2LCA3XSk7IC8vPT4gW1sxLCAyLCAzXSwgWzQsIDUsIDZdLCBbN11dXG4gKiAgICAgIFIuc3BsaXRFdmVyeSgzLCAnZm9vYmFyYmF6Jyk7IC8vPT4gWydmb28nLCAnYmFyJywgJ2JheiddXG4gKi9cblxuXG52YXIgc3BsaXRFdmVyeSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHNwbGl0RXZlcnkobiwgbGlzdCkge1xuICBpZiAobiA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCB0byBzcGxpdEV2ZXJ5IG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyJyk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgaWR4ID0gMDtcbiAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgcmVzdWx0LnB1c2goc2xpY2UoaWR4LCBpZHggKz0gbiwgbGlzdCkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gc3BsaXRFdmVyeTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBUYWtlcyBhIGxpc3QgYW5kIGEgcHJlZGljYXRlIGFuZCByZXR1cm5zIGEgcGFpciBvZiBsaXN0cyB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqXG4gKiAgLSB0aGUgcmVzdWx0IG9mIGNvbmNhdGVuYXRpbmcgdGhlIHR3byBvdXRwdXQgbGlzdHMgaXMgZXF1aXZhbGVudCB0byB0aGUgaW5wdXQgbGlzdDtcbiAqICAtIG5vbmUgb2YgdGhlIGVsZW1lbnRzIG9mIHRoZSBmaXJzdCBvdXRwdXQgbGlzdCBzYXRpc2ZpZXMgdGhlIHByZWRpY2F0ZTsgYW5kXG4gKiAgLSBpZiB0aGUgc2Vjb25kIG91dHB1dCBsaXN0IGlzIG5vbi1lbXB0eSwgaXRzIGZpcnN0IGVsZW1lbnQgc2F0aXNmaWVzIHRoZSBwcmVkaWNhdGUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTkuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFtbYV0sIFthXV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgVGhlIHByZWRpY2F0ZSB0aGF0IGRldGVybWluZXMgd2hlcmUgdGhlIGFycmF5IGlzIHNwbGl0LlxuICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gYmUgc3BsaXQuXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnNwbGl0V2hlbihSLmVxdWFscygyKSwgWzEsIDIsIDMsIDEsIDIsIDNdKTsgICAvLz0+IFtbMV0sIFsyLCAzLCAxLCAyLCAzXV1cbiAqL1xuXG5cbnZhciBzcGxpdFdoZW4gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiBzcGxpdFdoZW4ocHJlZCwgbGlzdCkge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICB2YXIgcHJlZml4ID0gW107XG5cbiAgd2hpbGUgKGlkeCA8IGxlbiAmJiAhcHJlZChsaXN0W2lkeF0pKSB7XG4gICAgcHJlZml4LnB1c2gobGlzdFtpZHhdKTtcbiAgICBpZHggKz0gMTtcbiAgfVxuXG4gIHJldHVybiBbcHJlZml4LCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChsaXN0LCBpZHgpXTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBzcGxpdFdoZW47IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBlcXVhbHMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9lcXVhbHMnKTtcblxudmFyIHRha2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi90YWtlJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBzdGFydHMgd2l0aCB0aGUgcHJvdmlkZWQgdmFsdWVzXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMjQuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IEJvb2xlYW5cbiAqIEBzaWcgU3RyaW5nIC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7Kn0gcHJlZml4XG4gKiBAcGFyYW0geyp9IGxpc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi5zdGFydHNXaXRoKCdhJywgJ2FiYycpICAgICAgICAgICAgICAgIC8vPT4gdHJ1ZVxuICogICAgICBSLnN0YXJ0c1dpdGgoJ2InLCAnYWJjJykgICAgICAgICAgICAgICAgLy89PiBmYWxzZVxuICogICAgICBSLnN0YXJ0c1dpdGgoWydhJ10sIFsnYScsICdiJywgJ2MnXSkgICAgLy89PiB0cnVlXG4gKiAgICAgIFIuc3RhcnRzV2l0aChbJ2InXSwgWydhJywgJ2InLCAnYyddKSAgICAvLz0+IGZhbHNlXG4gKi9cblxuXG52YXIgc3RhcnRzV2l0aCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIChwcmVmaXgsIGxpc3QpIHtcbiAgcmV0dXJuIGVxdWFscyh0YWtlKHByZWZpeC5sZW5ndGgsIGxpc3QpLCBwcmVmaXgpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHN0YXJ0c1dpdGg7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogU3VidHJhY3RzIGl0cyBzZWNvbmQgYXJndW1lbnQgZnJvbSBpdHMgZmlyc3QgYXJndW1lbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IE51bWJlclxuICogQHBhcmFtIHtOdW1iZXJ9IGEgVGhlIGZpcnN0IHZhbHVlLlxuICogQHBhcmFtIHtOdW1iZXJ9IGIgVGhlIHNlY29uZCB2YWx1ZS5cbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJlc3VsdCBvZiBgYSAtIGJgLlxuICogQHNlZSBSLmFkZFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuc3VidHJhY3QoMTAsIDgpOyAvLz0+IDJcbiAqXG4gKiAgICAgIHZhciBtaW51czUgPSBSLnN1YnRyYWN0KFIuX18sIDUpO1xuICogICAgICBtaW51czUoMTcpOyAvLz0+IDEyXG4gKlxuICogICAgICB2YXIgY29tcGxlbWVudGFyeUFuZ2xlID0gUi5zdWJ0cmFjdCg5MCk7XG4gKiAgICAgIGNvbXBsZW1lbnRhcnlBbmdsZSgzMCk7IC8vPT4gNjBcbiAqICAgICAgY29tcGxlbWVudGFyeUFuZ2xlKDcyKTsgLy89PiAxOFxuICovXG5cblxudmFyIHN1YnRyYWN0ID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gc3VidHJhY3QoYSwgYikge1xuICByZXR1cm4gTnVtYmVyKGEpIC0gTnVtYmVyKGIpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHN1YnRyYWN0OyIsInZhciBhZGQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hZGQnKTtcblxudmFyIHJlZHVjZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3JlZHVjZScpO1xuXG4vKipcbiAqIEFkZHMgdG9nZXRoZXIgYWxsIHRoZSBlbGVtZW50cyBvZiBhIGxpc3QuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHNpZyBbTnVtYmVyXSAtPiBOdW1iZXJcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgQW4gYXJyYXkgb2YgbnVtYmVyc1xuICogQHJldHVybiB7TnVtYmVyfSBUaGUgc3VtIG9mIGFsbCB0aGUgbnVtYmVycyBpbiB0aGUgbGlzdC5cbiAqIEBzZWUgUi5yZWR1Y2VcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnN1bShbMiw0LDYsOCwxMDAsMV0pOyAvLz0+IDEyMVxuICovXG5cblxudmFyIHN1bSA9IC8qI19fUFVSRV9fKi9yZWR1Y2UoYWRkLCAwKTtcbm1vZHVsZS5leHBvcnRzID0gc3VtOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgY29uY2F0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY29uY2F0Jyk7XG5cbnZhciBkaWZmZXJlbmNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZGlmZmVyZW5jZScpO1xuXG4vKipcbiAqIEZpbmRzIHRoZSBzZXQgKGkuZS4gbm8gZHVwbGljYXRlcykgb2YgYWxsIGVsZW1lbnRzIGNvbnRhaW5lZCBpbiB0aGUgZmlyc3Qgb3JcbiAqIHNlY29uZCBsaXN0LCBidXQgbm90IGJvdGguXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTkuMFxuICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gKiBAc2lnIFsqXSAtPiBbKl0gLT4gWypdXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0MSBUaGUgZmlyc3QgbGlzdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QyIFRoZSBzZWNvbmQgbGlzdC5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgZWxlbWVudHMgaW4gYGxpc3QxYCBvciBgbGlzdDJgLCBidXQgbm90IGJvdGguXG4gKiBAc2VlIFIuc3ltbWV0cmljRGlmZmVyZW5jZVdpdGgsIFIuZGlmZmVyZW5jZSwgUi5kaWZmZXJlbmNlV2l0aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIuc3ltbWV0cmljRGlmZmVyZW5jZShbMSwyLDMsNF0sIFs3LDYsNSw0LDNdKTsgLy89PiBbMSwyLDcsNiw1XVxuICogICAgICBSLnN5bW1ldHJpY0RpZmZlcmVuY2UoWzcsNiw1LDQsM10sIFsxLDIsMyw0XSk7IC8vPT4gWzcsNiw1LDEsMl1cbiAqL1xuXG5cbnZhciBzeW1tZXRyaWNEaWZmZXJlbmNlID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gc3ltbWV0cmljRGlmZmVyZW5jZShsaXN0MSwgbGlzdDIpIHtcbiAgcmV0dXJuIGNvbmNhdChkaWZmZXJlbmNlKGxpc3QxLCBsaXN0MiksIGRpZmZlcmVuY2UobGlzdDIsIGxpc3QxKSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gc3ltbWV0cmljRGlmZmVyZW5jZTsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxudmFyIGNvbmNhdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2NvbmNhdCcpO1xuXG52YXIgZGlmZmVyZW5jZVdpdGggPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9kaWZmZXJlbmNlV2l0aCcpO1xuXG4vKipcbiAqIEZpbmRzIHRoZSBzZXQgKGkuZS4gbm8gZHVwbGljYXRlcykgb2YgYWxsIGVsZW1lbnRzIGNvbnRhaW5lZCBpbiB0aGUgZmlyc3Qgb3JcbiAqIHNlY29uZCBsaXN0LCBidXQgbm90IGJvdGguIER1cGxpY2F0aW9uIGlzIGRldGVybWluZWQgYWNjb3JkaW5nIHRvIHRoZSB2YWx1ZVxuICogcmV0dXJuZWQgYnkgYXBwbHlpbmcgdGhlIHN1cHBsaWVkIHByZWRpY2F0ZSB0byB0d28gbGlzdCBlbGVtZW50cy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgKChhLCBhKSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW2FdIC0+IFthXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSB1c2VkIHRvIHRlc3Qgd2hldGhlciB0d28gaXRlbXMgYXJlIGVxdWFsLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdDEgVGhlIGZpcnN0IGxpc3QuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0MiBUaGUgc2Vjb25kIGxpc3QuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGVsZW1lbnRzIGluIGBsaXN0MWAgb3IgYGxpc3QyYCwgYnV0IG5vdCBib3RoLlxuICogQHNlZSBSLnN5bW1ldHJpY0RpZmZlcmVuY2UsIFIuZGlmZmVyZW5jZSwgUi5kaWZmZXJlbmNlV2l0aFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBlcUEgPSBSLmVxQnkoUi5wcm9wKCdhJykpO1xuICogICAgICB2YXIgbDEgPSBbe2E6IDF9LCB7YTogMn0sIHthOiAzfSwge2E6IDR9XTtcbiAqICAgICAgdmFyIGwyID0gW3thOiAzfSwge2E6IDR9LCB7YTogNX0sIHthOiA2fV07XG4gKiAgICAgIFIuc3ltbWV0cmljRGlmZmVyZW5jZVdpdGgoZXFBLCBsMSwgbDIpOyAvLz0+IFt7YTogMX0sIHthOiAyfSwge2E6IDV9LCB7YTogNn1dXG4gKi9cblxuXG52YXIgc3ltbWV0cmljRGlmZmVyZW5jZVdpdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiBzeW1tZXRyaWNEaWZmZXJlbmNlV2l0aChwcmVkLCBsaXN0MSwgbGlzdDIpIHtcbiAgcmV0dXJuIGNvbmNhdChkaWZmZXJlbmNlV2l0aChwcmVkLCBsaXN0MSwgbGlzdDIpLCBkaWZmZXJlbmNlV2l0aChwcmVkLCBsaXN0MiwgbGlzdDEpKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBzeW1tZXRyaWNEaWZmZXJlbmNlV2l0aDsiLCJ2YXIgX2NoZWNrRm9yTWV0aG9kID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2NoZWNrRm9yTWV0aG9kJyk7XG5cbnZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgc2xpY2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zbGljZScpO1xuXG4vKipcbiAqIFJldHVybnMgYWxsIGJ1dCB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcgKG9yIG9iamVjdFxuICogd2l0aCBhIGB0YWlsYCBtZXRob2QpLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGBzbGljZWAgbWV0aG9kIG9mIHRoZSBmaXJzdCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFthXSAtPiBbYV1cbiAqIEBzaWcgU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHsqfSBsaXN0XG4gKiBAcmV0dXJuIHsqfVxuICogQHNlZSBSLmhlYWQsIFIuaW5pdCwgUi5sYXN0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50YWlsKFsxLCAyLCAzXSk7ICAvLz0+IFsyLCAzXVxuICogICAgICBSLnRhaWwoWzEsIDJdKTsgICAgIC8vPT4gWzJdXG4gKiAgICAgIFIudGFpbChbMV0pOyAgICAgICAgLy89PiBbXVxuICogICAgICBSLnRhaWwoW10pOyAgICAgICAgIC8vPT4gW11cbiAqXG4gKiAgICAgIFIudGFpbCgnYWJjJyk7ICAvLz0+ICdiYydcbiAqICAgICAgUi50YWlsKCdhYicpOyAgIC8vPT4gJ2InXG4gKiAgICAgIFIudGFpbCgnYScpOyAgICAvLz0+ICcnXG4gKiAgICAgIFIudGFpbCgnJyk7ICAgICAvLz0+ICcnXG4gKi9cblxuXG52YXIgdGFpbCA9IC8qI19fUFVSRV9fKi9fY3VycnkxKCAvKiNfX1BVUkVfXyovX2NoZWNrRm9yTWV0aG9kKCd0YWlsJywgLyojX19QVVJFX18qL3NsaWNlKDEsIEluZmluaXR5KSkpO1xubW9kdWxlLmV4cG9ydHMgPSB0YWlsOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2Rpc3BhdGNoYWJsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcblxudmFyIF94dGFrZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL194dGFrZScpO1xuXG52YXIgc2xpY2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zbGljZScpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGBuYCBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gbGlzdCwgc3RyaW5nLCBvclxuICogdHJhbnNkdWNlci90cmFuc2Zvcm1lciAob3Igb2JqZWN0IHdpdGggYSBgdGFrZWAgbWV0aG9kKS5cbiAqXG4gKiBEaXNwYXRjaGVzIHRvIHRoZSBgdGFrZWAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gW2FdIC0+IFthXVxuICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEBwYXJhbSB7Kn0gbGlzdFxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi5kcm9wXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50YWtlKDEsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydmb28nXVxuICogICAgICBSLnRha2UoMiwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2ZvbycsICdiYXInXVxuICogICAgICBSLnRha2UoMywgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2ZvbycsICdiYXInLCAnYmF6J11cbiAqICAgICAgUi50YWtlKDQsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydmb28nLCAnYmFyJywgJ2JheiddXG4gKiAgICAgIFIudGFrZSgzLCAncmFtZGEnKTsgICAgICAgICAgICAgICAvLz0+ICdyYW0nXG4gKlxuICogICAgICB2YXIgcGVyc29ubmVsID0gW1xuICogICAgICAgICdEYXZlIEJydWJlY2snLFxuICogICAgICAgICdQYXVsIERlc21vbmQnLFxuICogICAgICAgICdFdWdlbmUgV3JpZ2h0JyxcbiAqICAgICAgICAnSm9lIE1vcmVsbG8nLFxuICogICAgICAgICdHZXJyeSBNdWxsaWdhbicsXG4gKiAgICAgICAgJ0JvYiBCYXRlcycsXG4gKiAgICAgICAgJ0pvZSBEb2RnZScsXG4gKiAgICAgICAgJ1JvbiBDcm90dHknXG4gKiAgICAgIF07XG4gKlxuICogICAgICB2YXIgdGFrZUZpdmUgPSBSLnRha2UoNSk7XG4gKiAgICAgIHRha2VGaXZlKHBlcnNvbm5lbCk7XG4gKiAgICAgIC8vPT4gWydEYXZlIEJydWJlY2snLCAnUGF1bCBEZXNtb25kJywgJ0V1Z2VuZSBXcmlnaHQnLCAnSm9lIE1vcmVsbG8nLCAnR2VycnkgTXVsbGlnYW4nXVxuICogQHN5bWIgUi50YWtlKC0xLCBbYSwgYl0pID0gW2EsIGJdXG4gKiBAc3ltYiBSLnRha2UoMCwgW2EsIGJdKSA9IFtdXG4gKiBAc3ltYiBSLnRha2UoMSwgW2EsIGJdKSA9IFthXVxuICogQHN5bWIgUi50YWtlKDIsIFthLCBiXSkgPSBbYSwgYl1cbiAqL1xuXG5cbnZhciB0YWtlID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFsndGFrZSddLCBfeHRha2UsIGZ1bmN0aW9uIHRha2UobiwgeHMpIHtcbiAgcmV0dXJuIHNsaWNlKDAsIG4gPCAwID8gSW5maW5pdHkgOiBuLCB4cyk7XG59KSk7XG5tb2R1bGUuZXhwb3J0cyA9IHRha2U7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBkcm9wID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZHJvcCcpO1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCBjb250YWluaW5nIHRoZSBsYXN0IGBuYCBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gbGlzdC5cbiAqIElmIGBuID4gbGlzdC5sZW5ndGhgLCByZXR1cm5zIGEgbGlzdCBvZiBgbGlzdC5sZW5ndGhgIGVsZW1lbnRzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE2LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIE51bWJlciAtPiBbYV0gLT4gW2FdXG4gKiBAc2lnIE51bWJlciAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gKiBAcGFyYW0ge051bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIHRvIHJldHVybi5cbiAqIEBwYXJhbSB7QXJyYXl9IHhzIFRoZSBjb2xsZWN0aW9uIHRvIGNvbnNpZGVyLlxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAc2VlIFIuZHJvcExhc3RcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnRha2VMYXN0KDEsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydiYXonXVxuICogICAgICBSLnRha2VMYXN0KDIsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydiYXInLCAnYmF6J11cbiAqICAgICAgUi50YWtlTGFzdCgzLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnZm9vJywgJ2JhcicsICdiYXonXVxuICogICAgICBSLnRha2VMYXN0KDQsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydmb28nLCAnYmFyJywgJ2JheiddXG4gKiAgICAgIFIudGFrZUxhc3QoMywgJ3JhbWRhJyk7ICAgICAgICAgICAgICAgLy89PiAnbWRhJ1xuICovXG5cblxudmFyIHRha2VMYXN0ID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gdGFrZUxhc3QobiwgeHMpIHtcbiAgcmV0dXJuIGRyb3AobiA+PSAwID8geHMubGVuZ3RoIC0gbiA6IDAsIHhzKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB0YWtlTGFzdDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIHNsaWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vc2xpY2UnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGxpc3QgY29udGFpbmluZyB0aGUgbGFzdCBgbmAgZWxlbWVudHMgb2YgYSBnaXZlbiBsaXN0LCBwYXNzaW5nXG4gKiBlYWNoIHZhbHVlIHRvIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgZnVuY3Rpb24sIGFuZCB0ZXJtaW5hdGluZyB3aGVuIHRoZVxuICogcHJlZGljYXRlIGZ1bmN0aW9uIHJldHVybnMgYGZhbHNlYC4gRXhjbHVkZXMgdGhlIGVsZW1lbnQgdGhhdCBjYXVzZWQgdGhlXG4gKiBwcmVkaWNhdGUgZnVuY3Rpb24gdG8gZmFpbC4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiBpcyBwYXNzZWQgb25lIGFyZ3VtZW50OlxuICogKih2YWx1ZSkqLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE2LjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBbYV1cbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtBcnJheX0geHMgVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGFycmF5LlxuICogQHNlZSBSLmRyb3BMYXN0V2hpbGUsIFIuYWRkSW5kZXhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgaXNOb3RPbmUgPSB4ID0+IHggIT09IDE7XG4gKlxuICogICAgICBSLnRha2VMYXN0V2hpbGUoaXNOb3RPbmUsIFsxLCAyLCAzLCA0XSk7IC8vPT4gWzIsIDMsIDRdXG4gKlxuICogICAgICBSLnRha2VMYXN0V2hpbGUoeCA9PiB4ICE9PSAnUicgLCAnUmFtZGEnKTsgLy89PiAnYW1kYSdcbiAqL1xuXG5cbnZhciB0YWtlTGFzdFdoaWxlID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gdGFrZUxhc3RXaGlsZShmbiwgeHMpIHtcbiAgdmFyIGlkeCA9IHhzLmxlbmd0aCAtIDE7XG4gIHdoaWxlIChpZHggPj0gMCAmJiBmbih4c1tpZHhdKSkge1xuICAgIGlkeCAtPSAxO1xuICB9XG4gIHJldHVybiBzbGljZShpZHggKyAxLCBJbmZpbml0eSwgeHMpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHRha2VMYXN0V2hpbGU7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfZGlzcGF0Y2hhYmxlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2Rpc3BhdGNoYWJsZScpO1xuXG52YXIgX3h0YWtlV2hpbGUgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9feHRha2VXaGlsZScpO1xuXG52YXIgc2xpY2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zbGljZScpO1xuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgbGlzdCBjb250YWluaW5nIHRoZSBmaXJzdCBgbmAgZWxlbWVudHMgb2YgYSBnaXZlbiBsaXN0LFxuICogcGFzc2luZyBlYWNoIHZhbHVlIHRvIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgZnVuY3Rpb24sIGFuZCB0ZXJtaW5hdGluZyB3aGVuXG4gKiB0aGUgcHJlZGljYXRlIGZ1bmN0aW9uIHJldHVybnMgYGZhbHNlYC4gRXhjbHVkZXMgdGhlIGVsZW1lbnQgdGhhdCBjYXVzZWQgdGhlXG4gKiBwcmVkaWNhdGUgZnVuY3Rpb24gdG8gZmFpbC4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiBpcyBwYXNzZWQgb25lIGFyZ3VtZW50OlxuICogKih2YWx1ZSkqLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGB0YWtlV2hpbGVgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBbYV1cbiAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtBcnJheX0geHMgVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGFycmF5LlxuICogQHNlZSBSLmRyb3BXaGlsZSwgUi50cmFuc2R1Y2UsIFIuYWRkSW5kZXhcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgaXNOb3RGb3VyID0geCA9PiB4ICE9PSA0O1xuICpcbiAqICAgICAgUi50YWtlV2hpbGUoaXNOb3RGb3VyLCBbMSwgMiwgMywgNCwgMywgMiwgMV0pOyAvLz0+IFsxLCAyLCAzXVxuICpcbiAqICAgICAgUi50YWtlV2hpbGUoeCA9PiB4ICE9PSAnZCcgLCAnUmFtZGEnKTsgLy89PiAnUmFtJ1xuICovXG5cblxudmFyIHRha2VXaGlsZSA9IC8qI19fUFVSRV9fKi9fY3VycnkyKCAvKiNfX1BVUkVfXyovX2Rpc3BhdGNoYWJsZShbJ3Rha2VXaGlsZSddLCBfeHRha2VXaGlsZSwgZnVuY3Rpb24gdGFrZVdoaWxlKGZuLCB4cykge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IHhzLmxlbmd0aDtcbiAgd2hpbGUgKGlkeCA8IGxlbiAmJiBmbih4c1tpZHhdKSkge1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBzbGljZSgwLCBpZHgsIHhzKTtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gdGFrZVdoaWxlOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgX2Rpc3BhdGNoYWJsZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19kaXNwYXRjaGFibGUnKTtcblxudmFyIF94dGFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3h0YXAnKTtcblxuLyoqXG4gKiBSdW5zIHRoZSBnaXZlbiBmdW5jdGlvbiB3aXRoIHRoZSBzdXBwbGllZCBvYmplY3QsIHRoZW4gcmV0dXJucyB0aGUgb2JqZWN0LlxuICpcbiAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gYXMgc2Vjb25kIHBhcmFtZXRlci5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHNpZyAoYSAtPiAqKSAtPiBhIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIHdpdGggYHhgLiBUaGUgcmV0dXJuIHZhbHVlIG9mIGBmbmAgd2lsbCBiZSB0aHJvd24gYXdheS5cbiAqIEBwYXJhbSB7Kn0geFxuICogQHJldHVybiB7Kn0gYHhgLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBzYXlYID0geCA9PiBjb25zb2xlLmxvZygneCBpcyAnICsgeCk7XG4gKiAgICAgIFIudGFwKHNheVgsIDEwMCk7IC8vPT4gMTAwXG4gKiAgICAgIC8vIGxvZ3MgJ3ggaXMgMTAwJ1xuICogQHN5bWIgUi50YXAoZiwgYSkgPSBhXG4gKi9cblxuXG52YXIgdGFwID0gLyojX19QVVJFX18qL19jdXJyeTIoIC8qI19fUFVSRV9fKi9fZGlzcGF0Y2hhYmxlKFtdLCBfeHRhcCwgZnVuY3Rpb24gdGFwKGZuLCB4KSB7XG4gIGZuKHgpO1xuICByZXR1cm4geDtcbn0pKTtcbm1vZHVsZS5leHBvcnRzID0gdGFwOyIsInZhciBfY2xvbmVSZWdFeHAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY2xvbmVSZWdFeHAnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBfaXNSZWdFeHAgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faXNSZWdFeHAnKTtcblxudmFyIHRvU3RyaW5nID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdG9TdHJpbmcnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBnaXZlbiBzdHJpbmcgbWF0Y2hlcyBhIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMi4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAc2lnIFJlZ0V4cCAtPiBTdHJpbmcgLT4gQm9vbGVhblxuICogQHBhcmFtIHtSZWdFeHB9IHBhdHRlcm5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAc2VlIFIubWF0Y2hcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnRlc3QoL154LywgJ3h5eicpOyAvLz0+IHRydWVcbiAqICAgICAgUi50ZXN0KC9eeS8sICd4eXonKTsgLy89PiBmYWxzZVxuICovXG5cblxudmFyIHRlc3QgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiB0ZXN0KHBhdHRlcm4sIHN0cikge1xuICBpZiAoIV9pc1JlZ0V4cChwYXR0ZXJuKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ+KAmHRlc3TigJkgcmVxdWlyZXMgYSB2YWx1ZSBvZiB0eXBlIFJlZ0V4cCBhcyBpdHMgZmlyc3QgYXJndW1lbnQ7IHJlY2VpdmVkICcgKyB0b1N0cmluZyhwYXR0ZXJuKSk7XG4gIH1cbiAgcmV0dXJuIF9jbG9uZVJlZ0V4cChwYXR0ZXJuKS50ZXN0KHN0cik7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gdGVzdDsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBDYWxscyBhbiBpbnB1dCBmdW5jdGlvbiBgbmAgdGltZXMsIHJldHVybmluZyBhbiBhcnJheSBjb250YWluaW5nIHRoZSByZXN1bHRzXG4gKiBvZiB0aG9zZSBmdW5jdGlvbiBjYWxscy5cbiAqXG4gKiBgZm5gIGlzIHBhc3NlZCBvbmUgYXJndW1lbnQ6IFRoZSBjdXJyZW50IHZhbHVlIG9mIGBuYCwgd2hpY2ggYmVnaW5zIGF0IGAwYFxuICogYW5kIGlzIGdyYWR1YWxseSBpbmNyZW1lbnRlZCB0byBgbiAtIDFgLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIuM1xuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKE51bWJlciAtPiBhKSAtPiBOdW1iZXIgLT4gW2FdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLiBQYXNzZWQgb25lIGFyZ3VtZW50LCB0aGUgY3VycmVudCB2YWx1ZSBvZiBgbmAuXG4gKiBAcGFyYW0ge051bWJlcn0gbiBBIHZhbHVlIGJldHdlZW4gYDBgIGFuZCBgbiAtIDFgLiBJbmNyZW1lbnRzIGFmdGVyIGVhY2ggZnVuY3Rpb24gY2FsbC5cbiAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSBjb250YWluaW5nIHRoZSByZXR1cm4gdmFsdWVzIG9mIGFsbCBjYWxscyB0byBgZm5gLlxuICogQHNlZSBSLnJlcGVhdFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudGltZXMoUi5pZGVudGl0eSwgNSk7IC8vPT4gWzAsIDEsIDIsIDMsIDRdXG4gKiBAc3ltYiBSLnRpbWVzKGYsIDApID0gW11cbiAqIEBzeW1iIFIudGltZXMoZiwgMSkgPSBbZigwKV1cbiAqIEBzeW1iIFIudGltZXMoZiwgMikgPSBbZigwKSwgZigxKV1cbiAqL1xuXG5cbnZhciB0aW1lcyA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHRpbWVzKGZuLCBuKSB7XG4gIHZhciBsZW4gPSBOdW1iZXIobik7XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGlzdDtcblxuICBpZiAobGVuIDwgMCB8fCBpc05hTihsZW4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ24gbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXInKTtcbiAgfVxuICBsaXN0ID0gbmV3IEFycmF5KGxlbik7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBsaXN0W2lkeF0gPSBmbihpZHgpO1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBsaXN0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHRpbWVzOyIsInZhciBpbnZva2VyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW52b2tlcicpO1xuXG4vKipcbiAqIFRoZSBsb3dlciBjYXNlIHZlcnNpb24gb2YgYSBzdHJpbmcuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAc2lnIFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byBsb3dlciBjYXNlLlxuICogQHJldHVybiB7U3RyaW5nfSBUaGUgbG93ZXIgY2FzZSB2ZXJzaW9uIG9mIGBzdHJgLlxuICogQHNlZSBSLnRvVXBwZXJcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnRvTG93ZXIoJ1hZWicpOyAvLz0+ICd4eXonXG4gKi9cblxuXG52YXIgdG9Mb3dlciA9IC8qI19fUFVSRV9fKi9pbnZva2VyKDAsICd0b0xvd2VyQ2FzZScpO1xubW9kdWxlLmV4cG9ydHMgPSB0b0xvd2VyOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgX2hhcyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19oYXMnKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBvYmplY3QgaW50byBhbiBhcnJheSBvZiBrZXksIHZhbHVlIGFycmF5cy4gT25seSB0aGUgb2JqZWN0J3NcbiAqIG93biBwcm9wZXJ0aWVzIGFyZSB1c2VkLlxuICogTm90ZSB0aGF0IHRoZSBvcmRlciBvZiB0aGUgb3V0cHV0IGFycmF5IGlzIG5vdCBndWFyYW50ZWVkIHRvIGJlIGNvbnNpc3RlbnRcbiAqIGFjcm9zcyBkaWZmZXJlbnQgSlMgcGxhdGZvcm1zLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjQuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyB7U3RyaW5nOiAqfSAtPiBbW1N0cmluZywqXV1cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBleHRyYWN0IGZyb21cbiAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSBvZiBrZXksIHZhbHVlIGFycmF5cyBmcm9tIHRoZSBvYmplY3QncyBvd24gcHJvcGVydGllcy5cbiAqIEBzZWUgUi5mcm9tUGFpcnNcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnRvUGFpcnMoe2E6IDEsIGI6IDIsIGM6IDN9KTsgLy89PiBbWydhJywgMV0sIFsnYicsIDJdLCBbJ2MnLCAzXV1cbiAqL1xuXG5cbnZhciB0b1BhaXJzID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gdG9QYWlycyhvYmopIHtcbiAgdmFyIHBhaXJzID0gW107XG4gIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgaWYgKF9oYXMocHJvcCwgb2JqKSkge1xuICAgICAgcGFpcnNbcGFpcnMubGVuZ3RoXSA9IFtwcm9wLCBvYmpbcHJvcF1dO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcGFpcnM7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gdG9QYWlyczsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBvYmplY3QgaW50byBhbiBhcnJheSBvZiBrZXksIHZhbHVlIGFycmF5cy4gVGhlIG9iamVjdCdzIG93blxuICogcHJvcGVydGllcyBhbmQgcHJvdG90eXBlIHByb3BlcnRpZXMgYXJlIHVzZWQuIE5vdGUgdGhhdCB0aGUgb3JkZXIgb2YgdGhlXG4gKiBvdXRwdXQgYXJyYXkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmUgY29uc2lzdGVudCBhY3Jvc3MgZGlmZmVyZW50IEpTXG4gKiBwbGF0Zm9ybXMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuNC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHtTdHJpbmc6ICp9IC0+IFtbU3RyaW5nLCpdXVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGV4dHJhY3QgZnJvbVxuICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIGtleSwgdmFsdWUgYXJyYXlzIGZyb20gdGhlIG9iamVjdCdzIG93blxuICogICAgICAgICBhbmQgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIEYgPSBmdW5jdGlvbigpIHsgdGhpcy54ID0gJ1gnOyB9O1xuICogICAgICBGLnByb3RvdHlwZS55ID0gJ1knO1xuICogICAgICB2YXIgZiA9IG5ldyBGKCk7XG4gKiAgICAgIFIudG9QYWlyc0luKGYpOyAvLz0+IFtbJ3gnLCdYJ10sIFsneScsJ1knXV1cbiAqL1xuXG5cbnZhciB0b1BhaXJzSW4gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiB0b1BhaXJzSW4ob2JqKSB7XG4gIHZhciBwYWlycyA9IFtdO1xuICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgIHBhaXJzW3BhaXJzLmxlbmd0aF0gPSBbcHJvcCwgb2JqW3Byb3BdXTtcbiAgfVxuICByZXR1cm4gcGFpcnM7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gdG9QYWlyc0luOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgX3RvU3RyaW5nID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3RvU3RyaW5nJyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBnaXZlbiB2YWx1ZS4gYGV2YWxgJ2luZyB0aGUgb3V0cHV0XG4gKiBzaG91bGQgcmVzdWx0IGluIGEgdmFsdWUgZXF1aXZhbGVudCB0byB0aGUgaW5wdXQgdmFsdWUuIE1hbnkgb2YgdGhlIGJ1aWx0LWluXG4gKiBgdG9TdHJpbmdgIG1ldGhvZHMgZG8gbm90IHNhdGlzZnkgdGhpcyByZXF1aXJlbWVudC5cbiAqXG4gKiBJZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gYFtvYmplY3QgT2JqZWN0XWAgd2l0aCBhIGB0b1N0cmluZ2AgbWV0aG9kIG90aGVyXG4gKiB0aGFuIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCwgdGhpcyBtZXRob2QgaXMgaW52b2tlZCB3aXRoIG5vIGFyZ3VtZW50c1xuICogdG8gcHJvZHVjZSB0aGUgcmV0dXJuIHZhbHVlLiBUaGlzIG1lYW5zIHVzZXItZGVmaW5lZCBjb25zdHJ1Y3RvciBmdW5jdGlvbnNcbiAqIGNhbiBwcm92aWRlIGEgc3VpdGFibGUgYHRvU3RyaW5nYCBtZXRob2QuIEZvciBleGFtcGxlOlxuICpcbiAqICAgICBmdW5jdGlvbiBQb2ludCh4LCB5KSB7XG4gKiAgICAgICB0aGlzLnggPSB4O1xuICogICAgICAgdGhpcy55ID0geTtcbiAqICAgICB9XG4gKlxuICogICAgIFBvaW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICogICAgICAgcmV0dXJuICduZXcgUG9pbnQoJyArIHRoaXMueCArICcsICcgKyB0aGlzLnkgKyAnKSc7XG4gKiAgICAgfTtcbiAqXG4gKiAgICAgUi50b1N0cmluZyhuZXcgUG9pbnQoMSwgMikpOyAvLz0+ICduZXcgUG9pbnQoMSwgMiknXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTQuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHNpZyAqIC0+IFN0cmluZ1xuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnRvU3RyaW5nKDQyKTsgLy89PiAnNDInXG4gKiAgICAgIFIudG9TdHJpbmcoJ2FiYycpOyAvLz0+ICdcImFiY1wiJ1xuICogICAgICBSLnRvU3RyaW5nKFsxLCAyLCAzXSk7IC8vPT4gJ1sxLCAyLCAzXSdcbiAqICAgICAgUi50b1N0cmluZyh7Zm9vOiAxLCBiYXI6IDIsIGJhejogM30pOyAvLz0+ICd7XCJiYXJcIjogMiwgXCJiYXpcIjogMywgXCJmb29cIjogMX0nXG4gKiAgICAgIFIudG9TdHJpbmcobmV3IERhdGUoJzIwMDEtMDItMDNUMDQ6MDU6MDZaJykpOyAvLz0+ICduZXcgRGF0ZShcIjIwMDEtMDItMDNUMDQ6MDU6MDYuMDAwWlwiKSdcbiAqL1xuXG5cbnZhciB0b1N0cmluZyA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIHRvU3RyaW5nKHZhbCkge1xuICByZXR1cm4gX3RvU3RyaW5nKHZhbCwgW10pO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHRvU3RyaW5nOyIsInZhciBpbnZva2VyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW52b2tlcicpO1xuXG4vKipcbiAqIFRoZSB1cHBlciBjYXNlIHZlcnNpb24gb2YgYSBzdHJpbmcuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOS4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAc2lnIFN0cmluZyAtPiBTdHJpbmdcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byB1cHBlciBjYXNlLlxuICogQHJldHVybiB7U3RyaW5nfSBUaGUgdXBwZXIgY2FzZSB2ZXJzaW9uIG9mIGBzdHJgLlxuICogQHNlZSBSLnRvTG93ZXJcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnRvVXBwZXIoJ2FiYycpOyAvLz0+ICdBQkMnXG4gKi9cblxuXG52YXIgdG9VcHBlciA9IC8qI19fUFVSRV9fKi9pbnZva2VyKDAsICd0b1VwcGVyQ2FzZScpO1xubW9kdWxlLmV4cG9ydHMgPSB0b1VwcGVyOyIsInZhciBfcmVkdWNlID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3JlZHVjZScpO1xuXG52YXIgX3h3cmFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX3h3cmFwJyk7XG5cbnZhciBjdXJyeU4gPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9jdXJyeU4nKTtcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhIHRyYW5zZHVjZXIgdXNpbmcgc3VwcGxpZWQgaXRlcmF0b3IgZnVuY3Rpb24uIFJldHVybnMgYSBzaW5nbGVcbiAqIGl0ZW0gYnkgaXRlcmF0aW5nIHRocm91Z2ggdGhlIGxpc3QsIHN1Y2Nlc3NpdmVseSBjYWxsaW5nIHRoZSB0cmFuc2Zvcm1lZFxuICogaXRlcmF0b3IgZnVuY3Rpb24gYW5kIHBhc3NpbmcgaXQgYW4gYWNjdW11bGF0b3IgdmFsdWUgYW5kIHRoZSBjdXJyZW50IHZhbHVlXG4gKiBmcm9tIHRoZSBhcnJheSwgYW5kIHRoZW4gcGFzc2luZyB0aGUgcmVzdWx0IHRvIHRoZSBuZXh0IGNhbGwuXG4gKlxuICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIHJlY2VpdmVzIHR3byB2YWx1ZXM6ICooYWNjLCB2YWx1ZSkqLiBJdCB3aWxsIGJlXG4gKiB3cmFwcGVkIGFzIGEgdHJhbnNmb3JtZXIgdG8gaW5pdGlhbGl6ZSB0aGUgdHJhbnNkdWNlci4gQSB0cmFuc2Zvcm1lciBjYW4gYmVcbiAqIHBhc3NlZCBkaXJlY3RseSBpbiBwbGFjZSBvZiBhbiBpdGVyYXRvciBmdW5jdGlvbi4gSW4gYm90aCBjYXNlcywgaXRlcmF0aW9uXG4gKiBtYXkgYmUgc3RvcHBlZCBlYXJseSB3aXRoIHRoZSBbYFIucmVkdWNlZGBdKCNyZWR1Y2VkKSBmdW5jdGlvbi5cbiAqXG4gKiBBIHRyYW5zZHVjZXIgaXMgYSBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgYSB0cmFuc2Zvcm1lciBhbmQgcmV0dXJucyBhXG4gKiB0cmFuc2Zvcm1lciBhbmQgY2FuIGJlIGNvbXBvc2VkIGRpcmVjdGx5LlxuICpcbiAqIEEgdHJhbnNmb3JtZXIgaXMgYW4gYW4gb2JqZWN0IHRoYXQgcHJvdmlkZXMgYSAyLWFyaXR5IHJlZHVjaW5nIGl0ZXJhdG9yXG4gKiBmdW5jdGlvbiwgc3RlcCwgMC1hcml0eSBpbml0aWFsIHZhbHVlIGZ1bmN0aW9uLCBpbml0LCBhbmQgMS1hcml0eSByZXN1bHRcbiAqIGV4dHJhY3Rpb24gZnVuY3Rpb24sIHJlc3VsdC4gVGhlIHN0ZXAgZnVuY3Rpb24gaXMgdXNlZCBhcyB0aGUgaXRlcmF0b3JcbiAqIGZ1bmN0aW9uIGluIHJlZHVjZS4gVGhlIHJlc3VsdCBmdW5jdGlvbiBpcyB1c2VkIHRvIGNvbnZlcnQgdGhlIGZpbmFsXG4gKiBhY2N1bXVsYXRvciBpbnRvIHRoZSByZXR1cm4gdHlwZSBhbmQgaW4gbW9zdCBjYXNlcyBpc1xuICogW2BSLmlkZW50aXR5YF0oI2lkZW50aXR5KS4gVGhlIGluaXQgZnVuY3Rpb24gY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSBhblxuICogaW5pdGlhbCBhY2N1bXVsYXRvciwgYnV0IGlzIGlnbm9yZWQgYnkgdHJhbnNkdWNlLlxuICpcbiAqIFRoZSBpdGVyYXRpb24gaXMgcGVyZm9ybWVkIHdpdGggW2BSLnJlZHVjZWBdKCNyZWR1Y2UpIGFmdGVyIGluaXRpYWxpemluZyB0aGUgdHJhbnNkdWNlci5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMi4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYyAtPiBjKSAtPiAoKGEsIGIpIC0+IGEpIC0+IGEgLT4gW2JdIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHhmIFRoZSB0cmFuc2R1Y2VyIGZ1bmN0aW9uLiBSZWNlaXZlcyBhIHRyYW5zZm9ybWVyIGFuZCByZXR1cm5zIGEgdHJhbnNmb3JtZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24uIFJlY2VpdmVzIHR3byB2YWx1ZXMsIHRoZSBhY2N1bXVsYXRvciBhbmQgdGhlXG4gKiAgICAgICAgY3VycmVudCBlbGVtZW50IGZyb20gdGhlIGFycmF5LiBXcmFwcGVkIGFzIHRyYW5zZm9ybWVyLCBpZiBuZWNlc3NhcnksIGFuZCB1c2VkIHRvXG4gKiAgICAgICAgaW5pdGlhbGl6ZSB0aGUgdHJhbnNkdWNlclxuICogQHBhcmFtIHsqfSBhY2MgVGhlIGluaXRpYWwgYWNjdW11bGF0b3IgdmFsdWUuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4geyp9IFRoZSBmaW5hbCwgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKiBAc2VlIFIucmVkdWNlLCBSLnJlZHVjZWQsIFIuaW50b1xuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBudW1iZXJzID0gWzEsIDIsIDMsIDRdO1xuICogICAgICB2YXIgdHJhbnNkdWNlciA9IFIuY29tcG9zZShSLm1hcChSLmFkZCgxKSksIFIudGFrZSgyKSk7XG4gKiAgICAgIFIudHJhbnNkdWNlKHRyYW5zZHVjZXIsIFIuZmxpcChSLmFwcGVuZCksIFtdLCBudW1iZXJzKTsgLy89PiBbMiwgM11cbiAqXG4gKiAgICAgIHZhciBpc09kZCA9ICh4KSA9PiB4ICUgMiA9PT0gMTtcbiAqICAgICAgdmFyIGZpcnN0T2RkVHJhbnNkdWNlciA9IFIuY29tcG9zZShSLmZpbHRlcihpc09kZCksIFIudGFrZSgxKSk7XG4gKiAgICAgIFIudHJhbnNkdWNlKGZpcnN0T2RkVHJhbnNkdWNlciwgUi5mbGlwKFIuYXBwZW5kKSwgW10sIFIucmFuZ2UoMCwgMTAwKSk7IC8vPT4gWzFdXG4gKi9cblxuXG52YXIgdHJhbnNkdWNlID0gLyojX19QVVJFX18qL2N1cnJ5Tig0LCBmdW5jdGlvbiB0cmFuc2R1Y2UoeGYsIGZuLCBhY2MsIGxpc3QpIHtcbiAgcmV0dXJuIF9yZWR1Y2UoeGYodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nID8gX3h3cmFwKGZuKSA6IGZuKSwgYWNjLCBsaXN0KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB0cmFuc2R1Y2U7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbi8qKlxuICogVHJhbnNwb3NlcyB0aGUgcm93cyBhbmQgY29sdW1ucyBvZiBhIDJEIGxpc3QuXG4gKiBXaGVuIHBhc3NlZCBhIGxpc3Qgb2YgYG5gIGxpc3RzIG9mIGxlbmd0aCBgeGAsXG4gKiByZXR1cm5zIGEgbGlzdCBvZiBgeGAgbGlzdHMgb2YgbGVuZ3RoIGBuYC5cbiAqXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTkuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW1thXV0gLT4gW1thXV1cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgQSAyRCBsaXN0XG4gKiBAcmV0dXJuIHtBcnJheX0gQSAyRCBsaXN0XG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi50cmFuc3Bvc2UoW1sxLCAnYSddLCBbMiwgJ2InXSwgWzMsICdjJ11dKSAvLz0+IFtbMSwgMiwgM10sIFsnYScsICdiJywgJ2MnXV1cbiAqICAgICAgUi50cmFuc3Bvc2UoW1sxLCAyLCAzXSwgWydhJywgJ2InLCAnYyddXSkgLy89PiBbWzEsICdhJ10sIFsyLCAnYiddLCBbMywgJ2MnXV1cbiAqXG4gKiAgICAgIC8vIElmIHNvbWUgb2YgdGhlIHJvd3MgYXJlIHNob3J0ZXIgdGhhbiB0aGUgZm9sbG93aW5nIHJvd3MsIHRoZWlyIGVsZW1lbnRzIGFyZSBza2lwcGVkOlxuICogICAgICBSLnRyYW5zcG9zZShbWzEwLCAxMV0sIFsyMF0sIFtdLCBbMzAsIDMxLCAzMl1dKSAvLz0+IFtbMTAsIDIwLCAzMF0sIFsxMSwgMzFdLCBbMzJdXVxuICogQHN5bWIgUi50cmFuc3Bvc2UoW1thXSwgW2JdLCBbY11dKSA9IFthLCBiLCBjXVxuICogQHN5bWIgUi50cmFuc3Bvc2UoW1thLCBiXSwgW2MsIGRdXSkgPSBbW2EsIGNdLCBbYiwgZF1dXG4gKiBAc3ltYiBSLnRyYW5zcG9zZShbW2EsIGJdLCBbY11dKSA9IFtbYSwgY10sIFtiXV1cbiAqL1xuXG5cbnZhciB0cmFuc3Bvc2UgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiB0cmFuc3Bvc2Uob3V0ZXJsaXN0KSB7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB3aGlsZSAoaSA8IG91dGVybGlzdC5sZW5ndGgpIHtcbiAgICB2YXIgaW5uZXJsaXN0ID0gb3V0ZXJsaXN0W2ldO1xuICAgIHZhciBqID0gMDtcbiAgICB3aGlsZSAoaiA8IGlubmVybGlzdC5sZW5ndGgpIHtcbiAgICAgIGlmICh0eXBlb2YgcmVzdWx0W2pdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXN1bHRbal0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdFtqXS5wdXNoKGlubmVybGlzdFtqXSk7XG4gICAgICBqICs9IDE7XG4gICAgfVxuICAgIGkgKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHRyYW5zcG9zZTsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxudmFyIG1hcCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL21hcCcpO1xuXG52YXIgc2VxdWVuY2UgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9zZXF1ZW5jZScpO1xuXG4vKipcbiAqIE1hcHMgYW4gW0FwcGxpY2F0aXZlXShodHRwczovL2dpdGh1Yi5jb20vZmFudGFzeWxhbmQvZmFudGFzeS1sYW5kI2FwcGxpY2F0aXZlKS1yZXR1cm5pbmdcbiAqIGZ1bmN0aW9uIG92ZXIgYSBbVHJhdmVyc2FibGVdKGh0dHBzOi8vZ2l0aHViLmNvbS9mYW50YXN5bGFuZC9mYW50YXN5LWxhbmQjdHJhdmVyc2FibGUpLFxuICogdGhlbiB1c2VzIFtgc2VxdWVuY2VgXSgjc2VxdWVuY2UpIHRvIHRyYW5zZm9ybSB0aGUgcmVzdWx0aW5nIFRyYXZlcnNhYmxlIG9mIEFwcGxpY2F0aXZlXG4gKiBpbnRvIGFuIEFwcGxpY2F0aXZlIG9mIFRyYXZlcnNhYmxlLlxuICpcbiAqIERpc3BhdGNoZXMgdG8gdGhlIGB0cmF2ZXJzZWAgbWV0aG9kIG9mIHRoZSB0aGlyZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xOS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoQXBwbGljYXRpdmUgZiwgVHJhdmVyc2FibGUgdCkgPT4gKGEgLT4gZiBhKSAtPiAoYSAtPiBmIGIpIC0+IHQgYSAtPiBmICh0IGIpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvZlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZlxuICogQHBhcmFtIHsqfSB0cmF2ZXJzYWJsZVxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi5zZXF1ZW5jZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIC8vIFJldHVybnMgYE5vdGhpbmdgIGlmIHRoZSBnaXZlbiBkaXZpc29yIGlzIGAwYFxuICogICAgICBzYWZlRGl2ID0gbiA9PiBkID0+IGQgPT09IDAgPyBOb3RoaW5nKCkgOiBKdXN0KG4gLyBkKVxuICpcbiAqICAgICAgUi50cmF2ZXJzZShNYXliZS5vZiwgc2FmZURpdigxMCksIFsyLCA0LCA1XSk7IC8vPT4gSnVzdChbNSwgMi41LCAyXSlcbiAqICAgICAgUi50cmF2ZXJzZShNYXliZS5vZiwgc2FmZURpdigxMCksIFsyLCAwLCA1XSk7IC8vPT4gTm90aGluZ1xuICovXG5cblxudmFyIHRyYXZlcnNlID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gdHJhdmVyc2Uob2YsIGYsIHRyYXZlcnNhYmxlKSB7XG4gIHJldHVybiB0eXBlb2YgdHJhdmVyc2FibGVbJ2ZhbnRhc3ktbGFuZC90cmF2ZXJzZSddID09PSAnZnVuY3Rpb24nID8gdHJhdmVyc2FibGVbJ2ZhbnRhc3ktbGFuZC90cmF2ZXJzZSddKGYsIG9mKSA6IHNlcXVlbmNlKG9mLCBtYXAoZiwgdHJhdmVyc2FibGUpKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB0cmF2ZXJzZTsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxudmFyIHdzID0gJ1xceDA5XFx4MEFcXHgwQlxceDBDXFx4MERcXHgyMFxceEEwXFx1MTY4MFxcdTE4MEVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzJyArICdcXHUyMDA0XFx1MjAwNVxcdTIwMDZcXHUyMDA3XFx1MjAwOFxcdTIwMDlcXHUyMDBBXFx1MjAyRlxcdTIwNUZcXHUzMDAwXFx1MjAyOCcgKyAnXFx1MjAyOVxcdUZFRkYnO1xudmFyIHplcm9XaWR0aCA9ICdcXHUyMDBiJztcbnZhciBoYXNQcm90b1RyaW0gPSB0eXBlb2YgU3RyaW5nLnByb3RvdHlwZS50cmltID09PSAnZnVuY3Rpb24nO1xuLyoqXG4gKiBSZW1vdmVzIChzdHJpcHMpIHdoaXRlc3BhY2UgZnJvbSBib3RoIGVuZHMgb2YgdGhlIHN0cmluZy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC42LjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBzaWcgU3RyaW5nIC0+IFN0cmluZ1xuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIHRyaW0uXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFRyaW1tZWQgdmVyc2lvbiBvZiBgc3RyYC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnRyaW0oJyAgIHh5eiAgJyk7IC8vPT4gJ3h5eidcbiAqICAgICAgUi5tYXAoUi50cmltLCBSLnNwbGl0KCcsJywgJ3gsIHksIHonKSk7IC8vPT4gWyd4JywgJ3knLCAneiddXG4gKi9cbnZhciBfdHJpbSA9ICFoYXNQcm90b1RyaW0gfHwgLyojX19QVVJFX18qL3dzLnRyaW0oKSB8fCAhIC8qI19fUFVSRV9fKi96ZXJvV2lkdGgudHJpbSgpID8gZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgdmFyIGJlZ2luUnggPSBuZXcgUmVnRXhwKCdeWycgKyB3cyArICddWycgKyB3cyArICddKicpO1xuICB2YXIgZW5kUnggPSBuZXcgUmVnRXhwKCdbJyArIHdzICsgJ11bJyArIHdzICsgJ10qJCcpO1xuICByZXR1cm4gc3RyLnJlcGxhY2UoYmVnaW5SeCwgJycpLnJlcGxhY2UoZW5kUngsICcnKTtcbn0gOiBmdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnRyaW0oKTtcbn07XG52YXIgdHJpbSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKF90cmltKTtcbm1vZHVsZS5leHBvcnRzID0gdHJpbTsiLCJ2YXIgX2FyaXR5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2FyaXR5Jyk7XG5cbnZhciBfY29uY2F0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbmNhdCcpO1xuXG52YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBgdHJ5Q2F0Y2hgIHRha2VzIHR3byBmdW5jdGlvbnMsIGEgYHRyeWVyYCBhbmQgYSBgY2F0Y2hlcmAuIFRoZSByZXR1cm5lZFxuICogZnVuY3Rpb24gZXZhbHVhdGVzIHRoZSBgdHJ5ZXJgOyBpZiBpdCBkb2VzIG5vdCB0aHJvdywgaXQgc2ltcGx5IHJldHVybnMgdGhlXG4gKiByZXN1bHQuIElmIHRoZSBgdHJ5ZXJgICpkb2VzKiB0aHJvdywgdGhlIHJldHVybmVkIGZ1bmN0aW9uIGV2YWx1YXRlcyB0aGVcbiAqIGBjYXRjaGVyYCBmdW5jdGlvbiBhbmQgcmV0dXJucyBpdHMgcmVzdWx0LiBOb3RlIHRoYXQgZm9yIGVmZmVjdGl2ZVxuICogY29tcG9zaXRpb24gd2l0aCB0aGlzIGZ1bmN0aW9uLCBib3RoIHRoZSBgdHJ5ZXJgIGFuZCBgY2F0Y2hlcmAgZnVuY3Rpb25zXG4gKiBtdXN0IHJldHVybiB0aGUgc2FtZSB0eXBlIG9mIHJlc3VsdHMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMjAuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICguLi54IC0+IGEpIC0+ICgoZSwgLi4ueCkgLT4gYSkgLT4gKC4uLnggLT4gYSlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyeWVyIFRoZSBmdW5jdGlvbiB0aGF0IG1heSB0aHJvdy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhdGNoZXIgVGhlIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBldmFsdWF0ZWQgaWYgYHRyeWVyYCB0aHJvd3MuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gdGhhdCB3aWxsIGNhdGNoIGV4Y2VwdGlvbnMgYW5kIHNlbmQgdGhlbiB0byB0aGUgY2F0Y2hlci5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnRyeUNhdGNoKFIucHJvcCgneCcpLCBSLkYpKHt4OiB0cnVlfSk7IC8vPT4gdHJ1ZVxuICogICAgICBSLnRyeUNhdGNoKFIucHJvcCgneCcpLCBSLkYpKG51bGwpOyAgICAgIC8vPT4gZmFsc2VcbiAqL1xuXG5cbnZhciB0cnlDYXRjaCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIF90cnlDYXRjaCh0cnllciwgY2F0Y2hlcikge1xuICByZXR1cm4gX2FyaXR5KHRyeWVyLmxlbmd0aCwgZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gdHJ5ZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gY2F0Y2hlci5hcHBseSh0aGlzLCBfY29uY2F0KFtlXSwgYXJndW1lbnRzKSk7XG4gICAgfVxuICB9KTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB0cnlDYXRjaDsiLCJ2YXIgX2N1cnJ5MSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTEnKTtcblxuLyoqXG4gKiBHaXZlcyBhIHNpbmdsZS13b3JkIHN0cmluZyBkZXNjcmlwdGlvbiBvZiB0aGUgKG5hdGl2ZSkgdHlwZSBvZiBhIHZhbHVlLFxuICogcmV0dXJuaW5nIHN1Y2ggYW5zd2VycyBhcyAnT2JqZWN0JywgJ051bWJlcicsICdBcnJheScsIG9yICdOdWxsJy4gRG9lcyBub3RcbiAqIGF0dGVtcHQgdG8gZGlzdGluZ3Vpc2ggdXNlciBPYmplY3QgdHlwZXMgYW55IGZ1cnRoZXIsIHJlcG9ydGluZyB0aGVtIGFsbCBhc1xuICogJ09iamVjdCcuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuOC4wXG4gKiBAY2F0ZWdvcnkgVHlwZVxuICogQHNpZyAoKiAtPiB7Kn0pIC0+IFN0cmluZ1xuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnR5cGUoe30pOyAvLz0+IFwiT2JqZWN0XCJcbiAqICAgICAgUi50eXBlKDEpOyAvLz0+IFwiTnVtYmVyXCJcbiAqICAgICAgUi50eXBlKGZhbHNlKTsgLy89PiBcIkJvb2xlYW5cIlxuICogICAgICBSLnR5cGUoJ3MnKTsgLy89PiBcIlN0cmluZ1wiXG4gKiAgICAgIFIudHlwZShudWxsKTsgLy89PiBcIk51bGxcIlxuICogICAgICBSLnR5cGUoW10pOyAvLz0+IFwiQXJyYXlcIlxuICogICAgICBSLnR5cGUoL1tBLXpdLyk7IC8vPT4gXCJSZWdFeHBcIlxuICogICAgICBSLnR5cGUoKCkgPT4ge30pOyAvLz0+IFwiRnVuY3Rpb25cIlxuICogICAgICBSLnR5cGUodW5kZWZpbmVkKTsgLy89PiBcIlVuZGVmaW5lZFwiXG4gKi9cblxuXG52YXIgdHlwZSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIHR5cGUodmFsKSB7XG4gIHJldHVybiB2YWwgPT09IG51bGwgPyAnTnVsbCcgOiB2YWwgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkuc2xpY2UoOCwgLTEpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHR5cGU7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbi8qKlxuICogVGFrZXMgYSBmdW5jdGlvbiBgZm5gLCB3aGljaCB0YWtlcyBhIHNpbmdsZSBhcnJheSBhcmd1bWVudCwgYW5kIHJldHVybnMgYVxuICogZnVuY3Rpb24gd2hpY2g6XG4gKlxuICogICAtIHRha2VzIGFueSBudW1iZXIgb2YgcG9zaXRpb25hbCBhcmd1bWVudHM7XG4gKiAgIC0gcGFzc2VzIHRoZXNlIGFyZ3VtZW50cyB0byBgZm5gIGFzIGFuIGFycmF5OyBhbmRcbiAqICAgLSByZXR1cm5zIHRoZSByZXN1bHQuXG4gKlxuICogSW4gb3RoZXIgd29yZHMsIGBSLnVuYXBwbHlgIGRlcml2ZXMgYSB2YXJpYWRpYyBmdW5jdGlvbiBmcm9tIGEgZnVuY3Rpb24gd2hpY2hcbiAqIHRha2VzIGFuIGFycmF5LiBgUi51bmFwcGx5YCBpcyB0aGUgaW52ZXJzZSBvZiBbYFIuYXBwbHlgXSgjYXBwbHkpLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjguMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnIChbKi4uLl0gLT4gYSkgLT4gKCouLi4gLT4gYSlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBzZWUgUi5hcHBseVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIudW5hcHBseShKU09OLnN0cmluZ2lmeSkoMSwgMiwgMyk7IC8vPT4gJ1sxLDIsM10nXG4gKiBAc3ltYiBSLnVuYXBwbHkoZikoYSwgYikgPSBmKFthLCBiXSlcbiAqL1xuXG5cbnZhciB1bmFwcGx5ID0gLyojX19QVVJFX18qL19jdXJyeTEoZnVuY3Rpb24gdW5hcHBseShmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmbihBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgfTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB1bmFwcGx5OyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG52YXIgbkFyeSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL25BcnknKTtcblxuLyoqXG4gKiBXcmFwcyBhIGZ1bmN0aW9uIG9mIGFueSBhcml0eSAoaW5jbHVkaW5nIG51bGxhcnkpIGluIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzXG4gKiBleGFjdGx5IDEgcGFyYW1ldGVyLiBBbnkgZXh0cmFuZW91cyBwYXJhbWV0ZXJzIHdpbGwgbm90IGJlIHBhc3NlZCB0byB0aGVcbiAqIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgqIC0+IGIpIC0+IChhIC0+IGIpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbiB3cmFwcGluZyBgZm5gLiBUaGUgbmV3IGZ1bmN0aW9uIGlzIGd1YXJhbnRlZWQgdG8gYmUgb2ZcbiAqICAgICAgICAgYXJpdHkgMS5cbiAqIEBzZWUgUi5iaW5hcnksIFIubkFyeVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciB0YWtlc1R3b0FyZ3MgPSBmdW5jdGlvbihhLCBiKSB7XG4gKiAgICAgICAgcmV0dXJuIFthLCBiXTtcbiAqICAgICAgfTtcbiAqICAgICAgdGFrZXNUd29BcmdzLmxlbmd0aDsgLy89PiAyXG4gKiAgICAgIHRha2VzVHdvQXJncygxLCAyKTsgLy89PiBbMSwgMl1cbiAqXG4gKiAgICAgIHZhciB0YWtlc09uZUFyZyA9IFIudW5hcnkodGFrZXNUd29BcmdzKTtcbiAqICAgICAgdGFrZXNPbmVBcmcubGVuZ3RoOyAvLz0+IDFcbiAqICAgICAgLy8gT25seSAxIGFyZ3VtZW50IGlzIHBhc3NlZCB0byB0aGUgd3JhcHBlZCBmdW5jdGlvblxuICogICAgICB0YWtlc09uZUFyZygxLCAyKTsgLy89PiBbMSwgdW5kZWZpbmVkXVxuICogQHN5bWIgUi51bmFyeShmKShhLCBiLCBjKSA9IGYoYSlcbiAqL1xuXG5cbnZhciB1bmFyeSA9IC8qI19fUFVSRV9fKi9fY3VycnkxKGZ1bmN0aW9uIHVuYXJ5KGZuKSB7XG4gIHJldHVybiBuQXJ5KDEsIGZuKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB1bmFyeTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIGN1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2N1cnJ5TicpO1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiBvZiBhcml0eSBgbmAgZnJvbSBhIChtYW51YWxseSkgY3VycmllZCBmdW5jdGlvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNC4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzaWcgTnVtYmVyIC0+IChhIC0+IGIpIC0+IChhIC0+IGMpXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIFRoZSBhcml0eSBmb3IgdGhlIHJldHVybmVkIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHVuY3VycnkuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24uXG4gKiBAc2VlIFIuY3VycnlcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgYWRkRm91ciA9IGEgPT4gYiA9PiBjID0+IGQgPT4gYSArIGIgKyBjICsgZDtcbiAqXG4gKiAgICAgIHZhciB1bmN1cnJpZWRBZGRGb3VyID0gUi51bmN1cnJ5Tig0LCBhZGRGb3VyKTtcbiAqICAgICAgdW5jdXJyaWVkQWRkRm91cigxLCAyLCAzLCA0KTsgLy89PiAxMFxuICovXG5cblxudmFyIHVuY3VycnlOID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gdW5jdXJyeU4oZGVwdGgsIGZuKSB7XG4gIHJldHVybiBjdXJyeU4oZGVwdGgsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY3VycmVudERlcHRoID0gMTtcbiAgICB2YXIgdmFsdWUgPSBmbjtcbiAgICB2YXIgaWR4ID0gMDtcbiAgICB2YXIgZW5kSWR4O1xuICAgIHdoaWxlIChjdXJyZW50RGVwdGggPD0gZGVwdGggJiYgdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBlbmRJZHggPSBjdXJyZW50RGVwdGggPT09IGRlcHRoID8gYXJndW1lbnRzLmxlbmd0aCA6IGlkeCArIHZhbHVlLmxlbmd0aDtcbiAgICAgIHZhbHVlID0gdmFsdWUuYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCBpZHgsIGVuZElkeCkpO1xuICAgICAgY3VycmVudERlcHRoICs9IDE7XG4gICAgICBpZHggPSBlbmRJZHg7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gdW5jdXJyeU47IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogQnVpbGRzIGEgbGlzdCBmcm9tIGEgc2VlZCB2YWx1ZS4gQWNjZXB0cyBhbiBpdGVyYXRvciBmdW5jdGlvbiwgd2hpY2ggcmV0dXJuc1xuICogZWl0aGVyIGZhbHNlIHRvIHN0b3AgaXRlcmF0aW9uIG9yIGFuIGFycmF5IG9mIGxlbmd0aCAyIGNvbnRhaW5pbmcgdGhlIHZhbHVlXG4gKiB0byBhZGQgdG8gdGhlIHJlc3VsdGluZyBsaXN0IGFuZCB0aGUgc2VlZCB0byBiZSB1c2VkIGluIHRoZSBuZXh0IGNhbGwgdG8gdGhlXG4gKiBpdGVyYXRvciBmdW5jdGlvbi5cbiAqXG4gKiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gcmVjZWl2ZXMgb25lIGFyZ3VtZW50OiAqKHNlZWQpKi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xMC4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBbYl0pIC0+ICogLT4gW2JdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24uIHJlY2VpdmVzIG9uZSBhcmd1bWVudCwgYHNlZWRgLCBhbmQgcmV0dXJuc1xuICogICAgICAgIGVpdGhlciBmYWxzZSB0byBxdWl0IGl0ZXJhdGlvbiBvciBhbiBhcnJheSBvZiBsZW5ndGggdHdvIHRvIHByb2NlZWQuIFRoZSBlbGVtZW50XG4gKiAgICAgICAgYXQgaW5kZXggMCBvZiB0aGlzIGFycmF5IHdpbGwgYmUgYWRkZWQgdG8gdGhlIHJlc3VsdGluZyBhcnJheSwgYW5kIHRoZSBlbGVtZW50XG4gKiAgICAgICAgYXQgaW5kZXggMSB3aWxsIGJlIHBhc3NlZCB0byB0aGUgbmV4dCBjYWxsIHRvIGBmbmAuXG4gKiBAcGFyYW0geyp9IHNlZWQgVGhlIHNlZWQgdmFsdWUuXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGZpbmFsIGxpc3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGYgPSBuID0+IG4gPiA1MCA/IGZhbHNlIDogWy1uLCBuICsgMTBdO1xuICogICAgICBSLnVuZm9sZChmLCAxMCk7IC8vPT4gWy0xMCwgLTIwLCAtMzAsIC00MCwgLTUwXVxuICogQHN5bWIgUi51bmZvbGQoZiwgeCkgPSBbZih4KVswXSwgZihmKHgpWzFdKVswXSwgZihmKGYoeClbMV0pWzFdKVswXSwgLi4uXVxuICovXG5cblxudmFyIHVuZm9sZCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHVuZm9sZChmbiwgc2VlZCkge1xuICB2YXIgcGFpciA9IGZuKHNlZWQpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHdoaWxlIChwYWlyICYmIHBhaXIubGVuZ3RoKSB7XG4gICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gcGFpclswXTtcbiAgICBwYWlyID0gZm4ocGFpclsxXSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB1bmZvbGQ7IiwidmFyIF9jb25jYXQgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29uY2F0Jyk7XG5cbnZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG52YXIgY29tcG9zZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2NvbXBvc2UnKTtcblxudmFyIHVuaXEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi91bmlxJyk7XG5cbi8qKlxuICogQ29tYmluZXMgdHdvIGxpc3RzIGludG8gYSBzZXQgKGkuZS4gbm8gZHVwbGljYXRlcykgY29tcG9zZWQgb2YgdGhlIGVsZW1lbnRzXG4gKiBvZiBlYWNoIGxpc3QuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAqIEBzaWcgWypdIC0+IFsqXSAtPiBbKl1cbiAqIEBwYXJhbSB7QXJyYXl9IGFzIFRoZSBmaXJzdCBsaXN0LlxuICogQHBhcmFtIHtBcnJheX0gYnMgVGhlIHNlY29uZCBsaXN0LlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBmaXJzdCBhbmQgc2Vjb25kIGxpc3RzIGNvbmNhdGVuYXRlZCwgd2l0aFxuICogICAgICAgICBkdXBsaWNhdGVzIHJlbW92ZWQuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi51bmlvbihbMSwgMiwgM10sIFsyLCAzLCA0XSk7IC8vPT4gWzEsIDIsIDMsIDRdXG4gKi9cblxuXG52YXIgdW5pb24gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MiggLyojX19QVVJFX18qL2NvbXBvc2UodW5pcSwgX2NvbmNhdCkpO1xubW9kdWxlLmV4cG9ydHMgPSB1bmlvbjsiLCJ2YXIgX2NvbmNhdCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jb25jYXQnKTtcblxudmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbnZhciB1bmlxV2l0aCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3VuaXFXaXRoJyk7XG5cbi8qKlxuICogQ29tYmluZXMgdHdvIGxpc3RzIGludG8gYSBzZXQgKGkuZS4gbm8gZHVwbGljYXRlcykgY29tcG9zZWQgb2YgdGhlIGVsZW1lbnRzXG4gKiBvZiBlYWNoIGxpc3QuIER1cGxpY2F0aW9uIGlzIGRldGVybWluZWQgYWNjb3JkaW5nIHRvIHRoZSB2YWx1ZSByZXR1cm5lZCBieVxuICogYXBwbHlpbmcgdGhlIHN1cHBsaWVkIHByZWRpY2F0ZSB0byB0d28gbGlzdCBlbGVtZW50cy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICogQHNpZyAoKGEsIGEpIC0+IEJvb2xlYW4pIC0+IFsqXSAtPiBbKl0gLT4gWypdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkIEEgcHJlZGljYXRlIHVzZWQgdG8gdGVzdCB3aGV0aGVyIHR3byBpdGVtcyBhcmUgZXF1YWwuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0MSBUaGUgZmlyc3QgbGlzdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QyIFRoZSBzZWNvbmQgbGlzdC5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgZmlyc3QgYW5kIHNlY29uZCBsaXN0cyBjb25jYXRlbmF0ZWQsIHdpdGhcbiAqICAgICAgICAgZHVwbGljYXRlcyByZW1vdmVkLlxuICogQHNlZSBSLnVuaW9uXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIGwxID0gW3thOiAxfSwge2E6IDJ9XTtcbiAqICAgICAgdmFyIGwyID0gW3thOiAxfSwge2E6IDR9XTtcbiAqICAgICAgUi51bmlvbldpdGgoUi5lcUJ5KFIucHJvcCgnYScpKSwgbDEsIGwyKTsgLy89PiBbe2E6IDF9LCB7YTogMn0sIHthOiA0fV1cbiAqL1xuXG5cbnZhciB1bmlvbldpdGggPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiB1bmlvbldpdGgocHJlZCwgbGlzdDEsIGxpc3QyKSB7XG4gIHJldHVybiB1bmlxV2l0aChwcmVkLCBfY29uY2F0KGxpc3QxLCBsaXN0MikpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHVuaW9uV2l0aDsiLCJ2YXIgaWRlbnRpdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pZGVudGl0eScpO1xuXG52YXIgdW5pcUJ5ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vdW5pcUJ5Jyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IGNvbnRhaW5pbmcgb25seSBvbmUgY29weSBvZiBlYWNoIGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsXG4gKiBsaXN0LiBbYFIuZXF1YWxzYF0oI2VxdWFscykgaXMgdXNlZCB0byBkZXRlcm1pbmUgZXF1YWxpdHkuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbYV0gLT4gW2FdXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBvZiB1bmlxdWUgaXRlbXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi51bmlxKFsxLCAxLCAyLCAxXSk7IC8vPT4gWzEsIDJdXG4gKiAgICAgIFIudW5pcShbMSwgJzEnXSk7ICAgICAvLz0+IFsxLCAnMSddXG4gKiAgICAgIFIudW5pcShbWzQyXSwgWzQyXV0pOyAvLz0+IFtbNDJdXVxuICovXG5cblxudmFyIHVuaXEgPSAvKiNfX1BVUkVfXyovdW5pcUJ5KGlkZW50aXR5KTtcbm1vZHVsZS5leHBvcnRzID0gdW5pcTsiLCJ2YXIgX1NldCA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19TZXQnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IGNvbnRhaW5pbmcgb25seSBvbmUgY29weSBvZiBlYWNoIGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsXG4gKiBsaXN0LCBiYXNlZCB1cG9uIHRoZSB2YWx1ZSByZXR1cm5lZCBieSBhcHBseWluZyB0aGUgc3VwcGxpZWQgZnVuY3Rpb24gdG9cbiAqIGVhY2ggbGlzdCBlbGVtZW50LiBQcmVmZXJzIHRoZSBmaXJzdCBpdGVtIGlmIHRoZSBzdXBwbGllZCBmdW5jdGlvbiBwcm9kdWNlc1xuICogdGhlIHNhbWUgdmFsdWUgb24gdHdvIGl0ZW1zLiBbYFIuZXF1YWxzYF0oI2VxdWFscykgaXMgdXNlZCBmb3IgY29tcGFyaXNvbi5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNi4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyAoYSAtPiBiKSAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBBIGZ1bmN0aW9uIHVzZWQgdG8gcHJvZHVjZSBhIHZhbHVlIHRvIHVzZSBkdXJpbmcgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBvZiB1bmlxdWUgaXRlbXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi51bmlxQnkoTWF0aC5hYnMsIFstMSwgLTUsIDIsIDEwLCAxLCAyXSk7IC8vPT4gWy0xLCAtNSwgMiwgMTBdXG4gKi9cblxuXG52YXIgdW5pcUJ5ID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gdW5pcUJ5KGZuLCBsaXN0KSB7XG4gIHZhciBzZXQgPSBuZXcgX1NldCgpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpZHggPSAwO1xuICB2YXIgYXBwbGllZEl0ZW0sIGl0ZW07XG5cbiAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgaXRlbSA9IGxpc3RbaWR4XTtcbiAgICBhcHBsaWVkSXRlbSA9IGZuKGl0ZW0pO1xuICAgIGlmIChzZXQuYWRkKGFwcGxpZWRJdGVtKSkge1xuICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gdW5pcUJ5OyIsInZhciBfY29udGFpbnNXaXRoID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2NvbnRhaW5zV2l0aCcpO1xuXG52YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGxpc3QgY29udGFpbmluZyBvbmx5IG9uZSBjb3B5IG9mIGVhY2ggZWxlbWVudCBpbiB0aGUgb3JpZ2luYWxcbiAqIGxpc3QsIGJhc2VkIHVwb24gdGhlIHZhbHVlIHJldHVybmVkIGJ5IGFwcGx5aW5nIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgdG9cbiAqIHR3byBsaXN0IGVsZW1lbnRzLiBQcmVmZXJzIHRoZSBmaXJzdCBpdGVtIGlmIHR3byBpdGVtcyBjb21wYXJlIGVxdWFsIGJhc2VkXG4gKiBvbiB0aGUgcHJlZGljYXRlLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjIuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKChhLCBhKSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkIEEgcHJlZGljYXRlIHVzZWQgdG8gdGVzdCB3aGV0aGVyIHR3byBpdGVtcyBhcmUgZXF1YWwuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBvZiB1bmlxdWUgaXRlbXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgdmFyIHN0ckVxID0gUi5lcUJ5KFN0cmluZyk7XG4gKiAgICAgIFIudW5pcVdpdGgoc3RyRXEpKFsxLCAnMScsIDIsIDFdKTsgLy89PiBbMSwgMl1cbiAqICAgICAgUi51bmlxV2l0aChzdHJFcSkoW3t9LCB7fV0pOyAgICAgICAvLz0+IFt7fV1cbiAqICAgICAgUi51bmlxV2l0aChzdHJFcSkoWzEsICcxJywgMV0pOyAgICAvLz0+IFsxXVxuICogICAgICBSLnVuaXFXaXRoKHN0ckVxKShbJzEnLCAxLCAxXSk7ICAgIC8vPT4gWycxJ11cbiAqL1xuXG5cbnZhciB1bmlxV2l0aCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHVuaXFXaXRoKHByZWQsIGxpc3QpIHtcbiAgdmFyIGlkeCA9IDA7XG4gIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgaXRlbTtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGl0ZW0gPSBsaXN0W2lkeF07XG4gICAgaWYgKCFfY29udGFpbnNXaXRoKHByZWQsIGl0ZW0sIHJlc3VsdCkpIHtcbiAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IGl0ZW07XG4gICAgfVxuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gdW5pcVdpdGg7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8qKlxuICogVGVzdHMgdGhlIGZpbmFsIGFyZ3VtZW50IGJ5IHBhc3NpbmcgaXQgdG8gdGhlIGdpdmVuIHByZWRpY2F0ZSBmdW5jdGlvbi4gSWZcbiAqIHRoZSBwcmVkaWNhdGUgaXMgbm90IHNhdGlzZmllZCwgdGhlIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2ZcbiAqIGNhbGxpbmcgdGhlIGB3aGVuRmFsc2VGbmAgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBhcmd1bWVudC4gSWYgdGhlIHByZWRpY2F0ZVxuICogaXMgc2F0aXNmaWVkLCB0aGUgYXJndW1lbnQgaXMgcmV0dXJuZWQgYXMgaXMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTguMFxuICogQGNhdGVnb3J5IExvZ2ljXG4gKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IChhIC0+IGEpIC0+IGEgLT4gYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCAgICAgICAgQSBwcmVkaWNhdGUgZnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHdoZW5GYWxzZUZuIEEgZnVuY3Rpb24gdG8gaW52b2tlIHdoZW4gdGhlIGBwcmVkYCBldmFsdWF0ZXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIGEgZmFsc3kgdmFsdWUuXG4gKiBAcGFyYW0geyp9ICAgICAgICB4ICAgICAgICAgICBBbiBvYmplY3QgdG8gdGVzdCB3aXRoIHRoZSBgcHJlZGAgZnVuY3Rpb24gYW5kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzIHRvIGB3aGVuRmFsc2VGbmAgaWYgbmVjZXNzYXJ5LlxuICogQHJldHVybiB7Kn0gRWl0aGVyIGB4YCBvciB0aGUgcmVzdWx0IG9mIGFwcGx5aW5nIGB4YCB0byBgd2hlbkZhbHNlRm5gLlxuICogQHNlZSBSLmlmRWxzZSwgUi53aGVuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgbGV0IHNhZmVJbmMgPSBSLnVubGVzcyhSLmlzTmlsLCBSLmluYyk7XG4gKiAgICAgIHNhZmVJbmMobnVsbCk7IC8vPT4gbnVsbFxuICogICAgICBzYWZlSW5jKDEpOyAvLz0+IDJcbiAqL1xuXG5cbnZhciB1bmxlc3MgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiB1bmxlc3MocHJlZCwgd2hlbkZhbHNlRm4sIHgpIHtcbiAgcmV0dXJuIHByZWQoeCkgPyB4IDogd2hlbkZhbHNlRm4oeCk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gdW5sZXNzOyIsInZhciBfaWRlbnRpdHkgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faWRlbnRpdHknKTtcblxudmFyIGNoYWluID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vY2hhaW4nKTtcblxuLyoqXG4gKiBTaG9ydGhhbmQgZm9yIGBSLmNoYWluKFIuaWRlbnRpdHkpYCwgd2hpY2ggcmVtb3ZlcyBvbmUgbGV2ZWwgb2YgbmVzdGluZyBmcm9tXG4gKiBhbnkgW0NoYWluXShodHRwczovL2dpdGh1Yi5jb20vZmFudGFzeWxhbmQvZmFudGFzeS1sYW5kI2NoYWluKS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4zLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIENoYWluIGMgPT4gYyAoYyBhKSAtPiBjIGFcbiAqIEBwYXJhbSB7Kn0gbGlzdFxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi5mbGF0dGVuLCBSLmNoYWluXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi51bm5lc3QoWzEsIFsyXSwgW1szXV1dKTsgLy89PiBbMSwgMiwgWzNdXVxuICogICAgICBSLnVubmVzdChbWzEsIDJdLCBbMywgNF0sIFs1LCA2XV0pOyAvLz0+IFsxLCAyLCAzLCA0LCA1LCA2XVxuICovXG5cblxudmFyIHVubmVzdCA9IC8qI19fUFVSRV9fKi9jaGFpbihfaWRlbnRpdHkpO1xubW9kdWxlLmV4cG9ydHMgPSB1bm5lc3Q7IiwidmFyIF9jdXJyeTMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkzJyk7XG5cbi8qKlxuICogVGFrZXMgYSBwcmVkaWNhdGUsIGEgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb24sIGFuZCBhbiBpbml0aWFsIHZhbHVlLFxuICogYW5kIHJldHVybnMgYSB2YWx1ZSBvZiB0aGUgc2FtZSB0eXBlIGFzIHRoZSBpbml0aWFsIHZhbHVlLlxuICogSXQgZG9lcyBzbyBieSBhcHBseWluZyB0aGUgdHJhbnNmb3JtYXRpb24gdW50aWwgdGhlIHByZWRpY2F0ZSBpcyBzYXRpc2ZpZWQsXG4gKiBhdCB3aGljaCBwb2ludCBpdCByZXR1cm5zIHRoZSBzYXRpc2ZhY3RvcnkgdmFsdWUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMjAuMFxuICogQGNhdGVnb3J5IExvZ2ljXG4gKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IChhIC0+IGEpIC0+IGEgLT4gYVxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSBmdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uXG4gKiBAcGFyYW0geyp9IGluaXQgSW5pdGlhbCB2YWx1ZVxuICogQHJldHVybiB7Kn0gRmluYWwgdmFsdWUgdGhhdCBzYXRpc2ZpZXMgcHJlZGljYXRlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi51bnRpbChSLmd0KFIuX18sIDEwMCksIFIubXVsdGlwbHkoMikpKDEpIC8vID0+IDEyOFxuICovXG5cblxudmFyIHVudGlsID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gdW50aWwocHJlZCwgZm4sIGluaXQpIHtcbiAgdmFyIHZhbCA9IGluaXQ7XG4gIHdoaWxlICghcHJlZCh2YWwpKSB7XG4gICAgdmFsID0gZm4odmFsKTtcbiAgfVxuICByZXR1cm4gdmFsO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHVudGlsOyIsInZhciBfY3VycnkzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MycpO1xuXG52YXIgYWRqdXN0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vYWRqdXN0Jyk7XG5cbnZhciBhbHdheXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9hbHdheXMnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGNvcHkgb2YgdGhlIGFycmF5IHdpdGggdGhlIGVsZW1lbnQgYXQgdGhlIHByb3ZpZGVkIGluZGV4XG4gKiByZXBsYWNlZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNC4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBOdW1iZXIgLT4gYSAtPiBbYV0gLT4gW2FdXG4gKiBAcGFyYW0ge051bWJlcn0gaWR4IFRoZSBpbmRleCB0byB1cGRhdGUuXG4gKiBAcGFyYW0geyp9IHggVGhlIHZhbHVlIHRvIGV4aXN0IGF0IHRoZSBnaXZlbiBpbmRleCBvZiB0aGUgcmV0dXJuZWQgYXJyYXkuXG4gKiBAcGFyYW0ge0FycmF5fEFyZ3VtZW50c30gbGlzdCBUaGUgc291cmNlIGFycmF5LWxpa2Ugb2JqZWN0IHRvIGJlIHVwZGF0ZWQuXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBjb3B5IG9mIGBsaXN0YCB3aXRoIHRoZSB2YWx1ZSBhdCBpbmRleCBgaWR4YCByZXBsYWNlZCB3aXRoIGB4YC5cbiAqIEBzZWUgUi5hZGp1c3RcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnVwZGF0ZSgxLCAxMSwgWzAsIDEsIDJdKTsgICAgIC8vPT4gWzAsIDExLCAyXVxuICogICAgICBSLnVwZGF0ZSgxKSgxMSkoWzAsIDEsIDJdKTsgICAgIC8vPT4gWzAsIDExLCAyXVxuICogQHN5bWIgUi51cGRhdGUoLTEsIGEsIFtiLCBjXSkgPSBbYiwgYV1cbiAqIEBzeW1iIFIudXBkYXRlKDAsIGEsIFtiLCBjXSkgPSBbYSwgY11cbiAqIEBzeW1iIFIudXBkYXRlKDEsIGEsIFtiLCBjXSkgPSBbYiwgYV1cbiAqL1xuXG5cbnZhciB1cGRhdGUgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MyhmdW5jdGlvbiB1cGRhdGUoaWR4LCB4LCBsaXN0KSB7XG4gIHJldHVybiBhZGp1c3QoYWx3YXlzKHgpLCBpZHgsIGxpc3QpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHVwZGF0ZTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIGN1cnJ5TiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2N1cnJ5TicpO1xuXG4vKipcbiAqIEFjY2VwdHMgYSBmdW5jdGlvbiBgZm5gIGFuZCBhIGxpc3Qgb2YgdHJhbnNmb3JtZXIgZnVuY3Rpb25zIGFuZCByZXR1cm5zIGFcbiAqIG5ldyBjdXJyaWVkIGZ1bmN0aW9uLiBXaGVuIHRoZSBuZXcgZnVuY3Rpb24gaXMgaW52b2tlZCwgaXQgY2FsbHMgdGhlXG4gKiBmdW5jdGlvbiBgZm5gIHdpdGggcGFyYW1ldGVycyBjb25zaXN0aW5nIG9mIHRoZSByZXN1bHQgb2YgY2FsbGluZyBlYWNoXG4gKiBzdXBwbGllZCBoYW5kbGVyIG9uIHN1Y2Nlc3NpdmUgYXJndW1lbnRzIHRvIHRoZSBuZXcgZnVuY3Rpb24uXG4gKlxuICogSWYgbW9yZSBhcmd1bWVudHMgYXJlIHBhc3NlZCB0byB0aGUgcmV0dXJuZWQgZnVuY3Rpb24gdGhhbiB0cmFuc2Zvcm1lclxuICogZnVuY3Rpb25zLCB0aG9zZSBhcmd1bWVudHMgYXJlIHBhc3NlZCBkaXJlY3RseSB0byBgZm5gIGFzIGFkZGl0aW9uYWxcbiAqIHBhcmFtZXRlcnMuIElmIHlvdSBleHBlY3QgYWRkaXRpb25hbCBhcmd1bWVudHMgdGhhdCBkb24ndCBuZWVkIHRvIGJlXG4gKiB0cmFuc2Zvcm1lZCwgYWx0aG91Z2ggeW91IGNhbiBpZ25vcmUgdGhlbSwgaXQncyBiZXN0IHRvIHBhc3MgYW4gaWRlbnRpdHlcbiAqIGZ1bmN0aW9uIHNvIHRoYXQgdGhlIG5ldyBmdW5jdGlvbiByZXBvcnRzIHRoZSBjb3JyZWN0IGFyaXR5LlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAc2lnICgoeDEsIHgyLCAuLi4pIC0+IHopIC0+IFsoYSAtPiB4MSksIChiIC0+IHgyKSwgLi4uXSAtPiAoYSAtPiBiIC0+IC4uLiAtPiB6KVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0FycmF5fSB0cmFuc2Zvcm1lcnMgQSBsaXN0IG9mIHRyYW5zZm9ybWVyIGZ1bmN0aW9uc1xuICogQHJldHVybiB7RnVuY3Rpb259IFRoZSB3cmFwcGVkIGZ1bmN0aW9uLlxuICogQHNlZSBSLmNvbnZlcmdlXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi51c2VXaXRoKE1hdGgucG93LCBbUi5pZGVudGl0eSwgUi5pZGVudGl0eV0pKDMsIDQpOyAvLz0+IDgxXG4gKiAgICAgIFIudXNlV2l0aChNYXRoLnBvdywgW1IuaWRlbnRpdHksIFIuaWRlbnRpdHldKSgzKSg0KTsgLy89PiA4MVxuICogICAgICBSLnVzZVdpdGgoTWF0aC5wb3csIFtSLmRlYywgUi5pbmNdKSgzLCA0KTsgLy89PiAzMlxuICogICAgICBSLnVzZVdpdGgoTWF0aC5wb3csIFtSLmRlYywgUi5pbmNdKSgzKSg0KTsgLy89PiAzMlxuICogQHN5bWIgUi51c2VXaXRoKGYsIFtnLCBoXSkoYSwgYikgPSBmKGcoYSksIGgoYikpXG4gKi9cblxuXG52YXIgdXNlV2l0aCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uIHVzZVdpdGgoZm4sIHRyYW5zZm9ybWVycykge1xuICByZXR1cm4gY3VycnlOKHRyYW5zZm9ybWVycy5sZW5ndGgsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIHZhciBpZHggPSAwO1xuICAgIHdoaWxlIChpZHggPCB0cmFuc2Zvcm1lcnMubGVuZ3RoKSB7XG4gICAgICBhcmdzLnB1c2godHJhbnNmb3JtZXJzW2lkeF0uY2FsbCh0aGlzLCBhcmd1bWVudHNbaWR4XSkpO1xuICAgICAgaWR4ICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIHRyYW5zZm9ybWVycy5sZW5ndGgpKSk7XG4gIH0pO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHVzZVdpdGg7IiwidmFyIF9jdXJyeTEgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkxJyk7XG5cbnZhciBrZXlzID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4va2V5cycpO1xuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCB0aGUgZW51bWVyYWJsZSBvd24gcHJvcGVydGllcyBvZiB0aGUgc3VwcGxpZWQgb2JqZWN0LlxuICogTm90ZSB0aGF0IHRoZSBvcmRlciBvZiB0aGUgb3V0cHV0IGFycmF5IGlzIG5vdCBndWFyYW50ZWVkIGFjcm9zcyBkaWZmZXJlbnRcbiAqIEpTIHBsYXRmb3Jtcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcge2s6IHZ9IC0+IFt2XVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGV4dHJhY3QgdmFsdWVzIGZyb21cbiAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSBvZiB0aGUgdmFsdWVzIG9mIHRoZSBvYmplY3QncyBvd24gcHJvcGVydGllcy5cbiAqIEBzZWUgUi52YWx1ZXNJbiwgUi5rZXlzXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi52YWx1ZXMoe2E6IDEsIGI6IDIsIGM6IDN9KTsgLy89PiBbMSwgMiwgM11cbiAqL1xuXG5cbnZhciB2YWx1ZXMgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiB2YWx1ZXMob2JqKSB7XG4gIHZhciBwcm9wcyA9IGtleXMob2JqKTtcbiAgdmFyIGxlbiA9IHByb3BzLmxlbmd0aDtcbiAgdmFyIHZhbHMgPSBbXTtcbiAgdmFyIGlkeCA9IDA7XG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICB2YWxzW2lkeF0gPSBvYmpbcHJvcHNbaWR4XV07XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHZhbHM7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gdmFsdWVzOyIsInZhciBfY3VycnkxID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MScpO1xuXG4vKipcbiAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCB0aGUgcHJvcGVydGllcywgaW5jbHVkaW5nIHByb3RvdHlwZSBwcm9wZXJ0aWVzLCBvZiB0aGVcbiAqIHN1cHBsaWVkIG9iamVjdC5cbiAqIE5vdGUgdGhhdCB0aGUgb3JkZXIgb2YgdGhlIG91dHB1dCBhcnJheSBpcyBub3QgZ3VhcmFudGVlZCB0byBiZSBjb25zaXN0ZW50XG4gKiBhY3Jvc3MgZGlmZmVyZW50IEpTIHBsYXRmb3Jtcy5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4yLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBzaWcge2s6IHZ9IC0+IFt2XVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGV4dHJhY3QgdmFsdWVzIGZyb21cbiAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSBvZiB0aGUgdmFsdWVzIG9mIHRoZSBvYmplY3QncyBvd24gYW5kIHByb3RvdHlwZSBwcm9wZXJ0aWVzLlxuICogQHNlZSBSLnZhbHVlcywgUi5rZXlzSW5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICB2YXIgRiA9IGZ1bmN0aW9uKCkgeyB0aGlzLnggPSAnWCc7IH07XG4gKiAgICAgIEYucHJvdG90eXBlLnkgPSAnWSc7XG4gKiAgICAgIHZhciBmID0gbmV3IEYoKTtcbiAqICAgICAgUi52YWx1ZXNJbihmKTsgLy89PiBbJ1gnLCAnWSddXG4gKi9cblxuXG52YXIgdmFsdWVzSW4gPSAvKiNfX1BVUkVfXyovX2N1cnJ5MShmdW5jdGlvbiB2YWx1ZXNJbihvYmopIHtcbiAgdmFyIHByb3A7XG4gIHZhciB2cyA9IFtdO1xuICBmb3IgKHByb3AgaW4gb2JqKSB7XG4gICAgdnNbdnMubGVuZ3RoXSA9IG9ialtwcm9wXTtcbiAgfVxuICByZXR1cm4gdnM7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gdmFsdWVzSW47IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8vIGBDb25zdGAgaXMgYSBmdW5jdG9yIHRoYXQgZWZmZWN0aXZlbHkgaWdub3JlcyB0aGUgZnVuY3Rpb24gZ2l2ZW4gdG8gYG1hcGAuXG5cblxudmFyIENvbnN0ID0gZnVuY3Rpb24gKHgpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IHgsICdmYW50YXN5LWxhbmQvbWFwJzogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSB9O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgXCJ2aWV3XCIgb2YgdGhlIGdpdmVuIGRhdGEgc3RydWN0dXJlLCBkZXRlcm1pbmVkIGJ5IHRoZSBnaXZlbiBsZW5zLlxuICogVGhlIGxlbnMncyBmb2N1cyBkZXRlcm1pbmVzIHdoaWNoIHBvcnRpb24gb2YgdGhlIGRhdGEgc3RydWN0dXJlIGlzIHZpc2libGUuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTYuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHR5cGVkZWZuIExlbnMgcyBhID0gRnVuY3RvciBmID0+IChhIC0+IGYgYSkgLT4gcyAtPiBmIHNcbiAqIEBzaWcgTGVucyBzIGEgLT4gcyAtPiBhXG4gKiBAcGFyYW0ge0xlbnN9IGxlbnNcbiAqIEBwYXJhbSB7Kn0geFxuICogQHJldHVybiB7Kn1cbiAqIEBzZWUgUi5wcm9wLCBSLmxlbnNJbmRleCwgUi5sZW5zUHJvcFxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciB4TGVucyA9IFIubGVuc1Byb3AoJ3gnKTtcbiAqXG4gKiAgICAgIFIudmlldyh4TGVucywge3g6IDEsIHk6IDJ9KTsgIC8vPT4gMVxuICogICAgICBSLnZpZXcoeExlbnMsIHt4OiA0LCB5OiAyfSk7ICAvLz0+IDRcbiAqL1xudmFyIHZpZXcgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiB2aWV3KGxlbnMsIHgpIHtcbiAgLy8gVXNpbmcgYENvbnN0YCBlZmZlY3RpdmVseSBpZ25vcmVzIHRoZSBzZXR0ZXIgZnVuY3Rpb24gb2YgdGhlIGBsZW5zYCxcbiAgLy8gbGVhdmluZyB0aGUgdmFsdWUgcmV0dXJuZWQgYnkgdGhlIGdldHRlciBmdW5jdGlvbiB1bm1vZGlmaWVkLlxuICByZXR1cm4gbGVucyhDb25zdCkoeCkudmFsdWU7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gdmlldzsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBUZXN0cyB0aGUgZmluYWwgYXJndW1lbnQgYnkgcGFzc2luZyBpdCB0byB0aGUgZ2l2ZW4gcHJlZGljYXRlIGZ1bmN0aW9uLiBJZlxuICogdGhlIHByZWRpY2F0ZSBpcyBzYXRpc2ZpZWQsIHRoZSBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgcmVzdWx0IG9mIGNhbGxpbmdcbiAqIHRoZSBgd2hlblRydWVGbmAgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBhcmd1bWVudC4gSWYgdGhlIHByZWRpY2F0ZSBpcyBub3RcbiAqIHNhdGlzZmllZCwgdGhlIGFyZ3VtZW50IGlzIHJldHVybmVkIGFzIGlzLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjE4LjBcbiAqIEBjYXRlZ29yeSBMb2dpY1xuICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiAoYSAtPiBhKSAtPiBhIC0+IGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgICAgICAgQSBwcmVkaWNhdGUgZnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHdoZW5UcnVlRm4gQSBmdW5jdGlvbiB0byBpbnZva2Ugd2hlbiB0aGUgYGNvbmRpdGlvbmBcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZhbHVhdGVzIHRvIGEgdHJ1dGh5IHZhbHVlLlxuICogQHBhcmFtIHsqfSAgICAgICAgeCAgICAgICAgICBBbiBvYmplY3QgdG8gdGVzdCB3aXRoIHRoZSBgcHJlZGAgZnVuY3Rpb24gYW5kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3MgdG8gYHdoZW5UcnVlRm5gIGlmIG5lY2Vzc2FyeS5cbiAqIEByZXR1cm4geyp9IEVpdGhlciBgeGAgb3IgdGhlIHJlc3VsdCBvZiBhcHBseWluZyBgeGAgdG8gYHdoZW5UcnVlRm5gLlxuICogQHNlZSBSLmlmRWxzZSwgUi51bmxlc3NcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICAvLyB0cnVuY2F0ZSA6OiBTdHJpbmcgLT4gU3RyaW5nXG4gKiAgICAgIHZhciB0cnVuY2F0ZSA9IFIud2hlbihcbiAqICAgICAgICBSLnByb3BTYXRpc2ZpZXMoUi5ndChSLl9fLCAxMCksICdsZW5ndGgnKSxcbiAqICAgICAgICBSLnBpcGUoUi50YWtlKDEwKSwgUi5hcHBlbmQoJ+KApicpLCBSLmpvaW4oJycpKVxuICogICAgICApO1xuICogICAgICB0cnVuY2F0ZSgnMTIzNDUnKTsgICAgICAgICAvLz0+ICcxMjM0NSdcbiAqICAgICAgdHJ1bmNhdGUoJzAxMjM0NTY3ODlBQkMnKTsgLy89PiAnMDEyMzQ1Njc4OeKApidcbiAqL1xuXG5cbnZhciB3aGVuID0gLyojX19QVVJFX18qL19jdXJyeTMoZnVuY3Rpb24gd2hlbihwcmVkLCB3aGVuVHJ1ZUZuLCB4KSB7XG4gIHJldHVybiBwcmVkKHgpID8gd2hlblRydWVGbih4KSA6IHg7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gd2hlbjsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIF9oYXMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9faGFzJyk7XG5cbi8qKlxuICogVGFrZXMgYSBzcGVjIG9iamVjdCBhbmQgYSB0ZXN0IG9iamVjdDsgcmV0dXJucyB0cnVlIGlmIHRoZSB0ZXN0IHNhdGlzZmllc1xuICogdGhlIHNwZWMuIEVhY2ggb2YgdGhlIHNwZWMncyBvd24gcHJvcGVydGllcyBtdXN0IGJlIGEgcHJlZGljYXRlIGZ1bmN0aW9uLlxuICogRWFjaCBwcmVkaWNhdGUgaXMgYXBwbGllZCB0byB0aGUgdmFsdWUgb2YgdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgb2YgdGhlXG4gKiB0ZXN0IG9iamVjdC4gYHdoZXJlYCByZXR1cm5zIHRydWUgaWYgYWxsIHRoZSBwcmVkaWNhdGVzIHJldHVybiB0cnVlLCBmYWxzZVxuICogb3RoZXJ3aXNlLlxuICpcbiAqIGB3aGVyZWAgaXMgd2VsbCBzdWl0ZWQgdG8gZGVjbGFyYXRpdmVseSBleHByZXNzaW5nIGNvbnN0cmFpbnRzIGZvciBvdGhlclxuICogZnVuY3Rpb25zIHN1Y2ggYXMgW2BmaWx0ZXJgXSgjZmlsdGVyKSBhbmQgW2BmaW5kYF0oI2ZpbmQpLlxuICpcbiAqIEBmdW5jXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMVxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHNpZyB7U3RyaW5nOiAoKiAtPiBCb29sZWFuKX0gLT4ge1N0cmluZzogKn0gLT4gQm9vbGVhblxuICogQHBhcmFtIHtPYmplY3R9IHNwZWNcbiAqIEBwYXJhbSB7T2JqZWN0fSB0ZXN0T2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHNlZSBSLnByb3BTYXRpc2ZpZXMsIFIud2hlcmVFcVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIC8vIHByZWQgOjogT2JqZWN0IC0+IEJvb2xlYW5cbiAqICAgICAgdmFyIHByZWQgPSBSLndoZXJlKHtcbiAqICAgICAgICBhOiBSLmVxdWFscygnZm9vJyksXG4gKiAgICAgICAgYjogUi5jb21wbGVtZW50KFIuZXF1YWxzKCdiYXInKSksXG4gKiAgICAgICAgeDogUi5ndChSLl9fLCAxMCksXG4gKiAgICAgICAgeTogUi5sdChSLl9fLCAyMClcbiAqICAgICAgfSk7XG4gKlxuICogICAgICBwcmVkKHthOiAnZm9vJywgYjogJ3h4eCcsIHg6IDExLCB5OiAxOX0pOyAvLz0+IHRydWVcbiAqICAgICAgcHJlZCh7YTogJ3h4eCcsIGI6ICd4eHgnLCB4OiAxMSwgeTogMTl9KTsgLy89PiBmYWxzZVxuICogICAgICBwcmVkKHthOiAnZm9vJywgYjogJ2JhcicsIHg6IDExLCB5OiAxOX0pOyAvLz0+IGZhbHNlXG4gKiAgICAgIHByZWQoe2E6ICdmb28nLCBiOiAneHh4JywgeDogMTAsIHk6IDE5fSk7IC8vPT4gZmFsc2VcbiAqICAgICAgcHJlZCh7YTogJ2ZvbycsIGI6ICd4eHgnLCB4OiAxMSwgeTogMjB9KTsgLy89PiBmYWxzZVxuICovXG5cblxudmFyIHdoZXJlID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gd2hlcmUoc3BlYywgdGVzdE9iaikge1xuICBmb3IgKHZhciBwcm9wIGluIHNwZWMpIHtcbiAgICBpZiAoX2hhcyhwcm9wLCBzcGVjKSAmJiAhc3BlY1twcm9wXSh0ZXN0T2JqW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB3aGVyZTsiLCJ2YXIgX2N1cnJ5MiA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTInKTtcblxudmFyIGVxdWFscyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2VxdWFscycpO1xuXG52YXIgbWFwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vbWFwJyk7XG5cbnZhciB3aGVyZSA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL3doZXJlJyk7XG5cbi8qKlxuICogVGFrZXMgYSBzcGVjIG9iamVjdCBhbmQgYSB0ZXN0IG9iamVjdDsgcmV0dXJucyB0cnVlIGlmIHRoZSB0ZXN0IHNhdGlzZmllc1xuICogdGhlIHNwZWMsIGZhbHNlIG90aGVyd2lzZS4gQW4gb2JqZWN0IHNhdGlzZmllcyB0aGUgc3BlYyBpZiwgZm9yIGVhY2ggb2YgdGhlXG4gKiBzcGVjJ3Mgb3duIHByb3BlcnRpZXMsIGFjY2Vzc2luZyB0aGF0IHByb3BlcnR5IG9mIHRoZSBvYmplY3QgZ2l2ZXMgdGhlIHNhbWVcbiAqIHZhbHVlIChpbiBbYFIuZXF1YWxzYF0oI2VxdWFscykgdGVybXMpIGFzIGFjY2Vzc2luZyB0aGF0IHByb3BlcnR5IG9mIHRoZVxuICogc3BlYy5cbiAqXG4gKiBgd2hlcmVFcWAgaXMgYSBzcGVjaWFsaXphdGlvbiBvZiBbYHdoZXJlYF0oI3doZXJlKS5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xNC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAc2lnIHtTdHJpbmc6ICp9IC0+IHtTdHJpbmc6ICp9IC0+IEJvb2xlYW5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzcGVjXG4gKiBAcGFyYW0ge09iamVjdH0gdGVzdE9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBzZWUgUi5wcm9wRXEsIFIud2hlcmVcbiAqIEBleGFtcGxlXG4gKlxuICogICAgICAvLyBwcmVkIDo6IE9iamVjdCAtPiBCb29sZWFuXG4gKiAgICAgIHZhciBwcmVkID0gUi53aGVyZUVxKHthOiAxLCBiOiAyfSk7XG4gKlxuICogICAgICBwcmVkKHthOiAxfSk7ICAgICAgICAgICAgICAvLz0+IGZhbHNlXG4gKiAgICAgIHByZWQoe2E6IDEsIGI6IDJ9KTsgICAgICAgIC8vPT4gdHJ1ZVxuICogICAgICBwcmVkKHthOiAxLCBiOiAyLCBjOiAzfSk7ICAvLz0+IHRydWVcbiAqICAgICAgcHJlZCh7YTogMSwgYjogMX0pOyAgICAgICAgLy89PiBmYWxzZVxuICovXG5cblxudmFyIHdoZXJlRXEgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiB3aGVyZUVxKHNwZWMsIHRlc3RPYmopIHtcbiAgcmV0dXJuIHdoZXJlKG1hcChlcXVhbHMsIHNwZWMpLCB0ZXN0T2JqKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB3aGVyZUVxOyIsInZhciBfY29udGFpbnMgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY29udGFpbnMnKTtcblxudmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbnZhciBmbGlwID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vZmxpcCcpO1xuXG52YXIgcmVqZWN0ID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vcmVqZWN0Jyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBsaXN0IHdpdGhvdXQgdmFsdWVzIGluIHRoZSBmaXJzdCBhcmd1bWVudC5cbiAqIFtgUi5lcXVhbHNgXSgjZXF1YWxzKSBpcyB1c2VkIHRvIGRldGVybWluZSBlcXVhbGl0eS5cbiAqXG4gKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMTkuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgW2FdIC0+IFthXSAtPiBbYV1cbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3QxIFRoZSB2YWx1ZXMgdG8gYmUgcmVtb3ZlZCBmcm9tIGBsaXN0MmAuXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0MiBUaGUgYXJyYXkgdG8gcmVtb3ZlIHZhbHVlcyBmcm9tLlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBuZXcgYXJyYXkgd2l0aG91dCB2YWx1ZXMgaW4gYGxpc3QxYC5cbiAqIEBzZWUgUi50cmFuc2R1Y2UsIFIuZGlmZmVyZW5jZVxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIud2l0aG91dChbMSwgMl0sIFsxLCAyLCAxLCAzLCA0XSk7IC8vPT4gWzMsIDRdXG4gKi9cblxuXG52YXIgd2l0aG91dCA9IC8qI19fUFVSRV9fKi9fY3VycnkyKGZ1bmN0aW9uICh4cywgbGlzdCkge1xuICByZXR1cm4gcmVqZWN0KGZsaXAoX2NvbnRhaW5zKSh4cyksIGxpc3QpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHdpdGhvdXQ7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBsaXN0IG91dCBvZiB0aGUgdHdvIHN1cHBsaWVkIGJ5IGNyZWF0aW5nIGVhY2ggcG9zc2libGUgcGFpclxuICogZnJvbSB0aGUgbGlzdHMuXG4gKlxuICogQGZ1bmNcbiAqIEBtZW1iZXJPZiBSXG4gKiBAc2luY2UgdjAuMS4wXG4gKiBAY2F0ZWdvcnkgTGlzdFxuICogQHNpZyBbYV0gLT4gW2JdIC0+IFtbYSxiXV1cbiAqIEBwYXJhbSB7QXJyYXl9IGFzIFRoZSBmaXJzdCBsaXN0LlxuICogQHBhcmFtIHtBcnJheX0gYnMgVGhlIHNlY29uZCBsaXN0LlxuICogQHJldHVybiB7QXJyYXl9IFRoZSBsaXN0IG1hZGUgYnkgY29tYmluaW5nIGVhY2ggcG9zc2libGUgcGFpciBmcm9tXG4gKiAgICAgICAgIGBhc2AgYW5kIGBic2AgaW50byBwYWlycyAoYFthLCBiXWApLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIFIueHByb2QoWzEsIDJdLCBbJ2EnLCAnYiddKTsgLy89PiBbWzEsICdhJ10sIFsxLCAnYiddLCBbMiwgJ2EnXSwgWzIsICdiJ11dXG4gKiBAc3ltYiBSLnhwcm9kKFthLCBiXSwgW2MsIGRdKSA9IFtbYSwgY10sIFthLCBkXSwgW2IsIGNdLCBbYiwgZF1dXG4gKi9cblxuXG52YXIgeHByb2QgPSAvKiNfX1BVUkVfXyovX2N1cnJ5MihmdW5jdGlvbiB4cHJvZChhLCBiKSB7XG4gIC8vID0geHByb2RXaXRoKHByZXBlbmQpOyAodGFrZXMgYWJvdXQgMyB0aW1lcyBhcyBsb25nLi4uKVxuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGlsZW4gPSBhLmxlbmd0aDtcbiAgdmFyIGo7XG4gIHZhciBqbGVuID0gYi5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgd2hpbGUgKGlkeCA8IGlsZW4pIHtcbiAgICBqID0gMDtcbiAgICB3aGlsZSAoaiA8IGpsZW4pIHtcbiAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IFthW2lkeF0sIGJbal1dO1xuICAgICAgaiArPSAxO1xuICAgIH1cbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHhwcm9kOyIsInZhciBfY3VycnkyID0gLyojX19QVVJFX18qL3JlcXVpcmUoJy4vaW50ZXJuYWwvX2N1cnJ5MicpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgbGlzdCBvdXQgb2YgdGhlIHR3byBzdXBwbGllZCBieSBwYWlyaW5nIHVwIGVxdWFsbHktcG9zaXRpb25lZFxuICogaXRlbXMgZnJvbSBib3RoIGxpc3RzLiBUaGUgcmV0dXJuZWQgbGlzdCBpcyB0cnVuY2F0ZWQgdG8gdGhlIGxlbmd0aCBvZiB0aGVcbiAqIHNob3J0ZXIgb2YgdGhlIHR3byBpbnB1dCBsaXN0cy5cbiAqIE5vdGU6IGB6aXBgIGlzIGVxdWl2YWxlbnQgdG8gYHppcFdpdGgoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gW2EsIGJdIH0pYC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4xLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFthXSAtPiBbYl0gLT4gW1thLGJdXVxuICogQHBhcmFtIHtBcnJheX0gbGlzdDEgVGhlIGZpcnN0IGFycmF5IHRvIGNvbnNpZGVyLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdDIgVGhlIHNlY29uZCBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBtYWRlIGJ5IHBhaXJpbmcgdXAgc2FtZS1pbmRleGVkIGVsZW1lbnRzIG9mIGBsaXN0MWAgYW5kIGBsaXN0MmAuXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICAgUi56aXAoWzEsIDIsIDNdLCBbJ2EnLCAnYicsICdjJ10pOyAvLz0+IFtbMSwgJ2EnXSwgWzIsICdiJ10sIFszLCAnYyddXVxuICogQHN5bWIgUi56aXAoW2EsIGIsIGNdLCBbZCwgZSwgZl0pID0gW1thLCBkXSwgW2IsIGVdLCBbYywgZl1dXG4gKi9cblxuXG52YXIgemlwID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gemlwKGEsIGIpIHtcbiAgdmFyIHJ2ID0gW107XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gTWF0aC5taW4oYS5sZW5ndGgsIGIubGVuZ3RoKTtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIHJ2W2lkeF0gPSBbYVtpZHhdLCBiW2lkeF1dO1xuICAgIGlkeCArPSAxO1xuICB9XG4gIHJldHVybiBydjtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSB6aXA7IiwidmFyIF9jdXJyeTIgPSAvKiNfX1BVUkVfXyovcmVxdWlyZSgnLi9pbnRlcm5hbC9fY3VycnkyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBvYmplY3Qgb3V0IG9mIGEgbGlzdCBvZiBrZXlzIGFuZCBhIGxpc3Qgb2YgdmFsdWVzLlxuICogS2V5L3ZhbHVlIHBhaXJpbmcgaXMgdHJ1bmNhdGVkIHRvIHRoZSBsZW5ndGggb2YgdGhlIHNob3J0ZXIgb2YgdGhlIHR3byBsaXN0cy5cbiAqIE5vdGU6IGB6aXBPYmpgIGlzIGVxdWl2YWxlbnQgdG8gYHBpcGUoemlwLCBmcm9tUGFpcnMpYC5cbiAqXG4gKiBAZnVuY1xuICogQG1lbWJlck9mIFJcbiAqIEBzaW5jZSB2MC4zLjBcbiAqIEBjYXRlZ29yeSBMaXN0XG4gKiBAc2lnIFtTdHJpbmddIC0+IFsqXSAtPiB7U3RyaW5nOiAqfVxuICogQHBhcmFtIHtBcnJheX0ga2V5cyBUaGUgYXJyYXkgdGhhdCB3aWxsIGJlIHByb3BlcnRpZXMgb24gdGhlIG91dHB1dCBvYmplY3QuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIGxpc3Qgb2YgdmFsdWVzIG9uIHRoZSBvdXRwdXQgb2JqZWN0LlxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgb2JqZWN0IG1hZGUgYnkgcGFpcmluZyB1cCBzYW1lLWluZGV4ZWQgZWxlbWVudHMgb2YgYGtleXNgIGFuZCBgdmFsdWVzYC5cbiAqIEBleGFtcGxlXG4gKlxuICogICAgICBSLnppcE9iaihbJ2EnLCAnYicsICdjJ10sIFsxLCAyLCAzXSk7IC8vPT4ge2E6IDEsIGI6IDIsIGM6IDN9XG4gKi9cblxuXG52YXIgemlwT2JqID0gLyojX19QVVJFX18qL19jdXJyeTIoZnVuY3Rpb24gemlwT2JqKGtleXMsIHZhbHVlcykge1xuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IE1hdGgubWluKGtleXMubGVuZ3RoLCB2YWx1ZXMubGVuZ3RoKTtcbiAgdmFyIG91dCA9IHt9O1xuICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgb3V0W2tleXNbaWR4XV0gPSB2YWx1ZXNbaWR4XTtcbiAgICBpZHggKz0gMTtcbiAgfVxuICByZXR1cm4gb3V0O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHppcE9iajsiLCJ2YXIgX2N1cnJ5MyA9IC8qI19fUFVSRV9fKi9yZXF1aXJlKCcuL2ludGVybmFsL19jdXJyeTMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGxpc3Qgb3V0IG9mIHRoZSB0d28gc3VwcGxpZWQgYnkgYXBwbHlpbmcgdGhlIGZ1bmN0aW9uIHRvIGVhY2hcbiAqIGVxdWFsbHktcG9zaXRpb25lZCBwYWlyIGluIHRoZSBsaXN0cy4gVGhlIHJldHVybmVkIGxpc3QgaXMgdHJ1bmNhdGVkIHRvIHRoZVxuICogbGVuZ3RoIG9mIHRoZSBzaG9ydGVyIG9mIHRoZSB0d28gaW5wdXQgbGlzdHMuXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyT2YgUlxuICogQHNpbmNlIHYwLjEuMFxuICogQGNhdGVnb3J5IExpc3RcbiAqIEBzaWcgKChhLCBiKSAtPiBjKSAtPiBbYV0gLT4gW2JdIC0+IFtjXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHVzZWQgdG8gY29tYmluZSB0aGUgdHdvIGVsZW1lbnRzIGludG8gb25lIHZhbHVlLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdDEgVGhlIGZpcnN0IGFycmF5IHRvIGNvbnNpZGVyLlxuICogQHBhcmFtIHtBcnJheX0gbGlzdDIgVGhlIHNlY29uZCBhcnJheSB0byBjb25zaWRlci5cbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBtYWRlIGJ5IGNvbWJpbmluZyBzYW1lLWluZGV4ZWQgZWxlbWVudHMgb2YgYGxpc3QxYCBhbmQgYGxpc3QyYFxuICogICAgICAgICB1c2luZyBgZm5gLlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgIHZhciBmID0gKHgsIHkpID0+IHtcbiAqICAgICAgICAvLyAuLi5cbiAqICAgICAgfTtcbiAqICAgICAgUi56aXBXaXRoKGYsIFsxLCAyLCAzXSwgWydhJywgJ2InLCAnYyddKTtcbiAqICAgICAgLy89PiBbZigxLCAnYScpLCBmKDIsICdiJyksIGYoMywgJ2MnKV1cbiAqIEBzeW1iIFIuemlwV2l0aChmbiwgW2EsIGIsIGNdLCBbZCwgZSwgZl0pID0gW2ZuKGEsIGQpLCBmbihiLCBlKSwgZm4oYywgZildXG4gKi9cblxuXG52YXIgemlwV2l0aCA9IC8qI19fUFVSRV9fKi9fY3VycnkzKGZ1bmN0aW9uIHppcFdpdGgoZm4sIGEsIGIpIHtcbiAgdmFyIHJ2ID0gW107XG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gTWF0aC5taW4oYS5sZW5ndGgsIGIubGVuZ3RoKTtcbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIHJ2W2lkeF0gPSBmbihhW2lkeF0sIGJbaWR4XSk7XG4gICAgaWR4ICs9IDE7XG4gIH1cbiAgcmV0dXJuIHJ2O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IHppcFdpdGg7IiwiLy9jb25zdCB7IExpc3QsIE1hcCwgUmVjb3JkIH0gPSByZXF1aXJlKCdpbW11dGFibGUnKTsgXG5jb25zdCBSID0gcmVxdWlyZSgncmFtZGEnKTsgXG5cbihhc3luYyBmdW5jdGlvbiBtYWluKCkge1xuXHRjb25zdCBCT0FSRF9XSURUSCA9IDEwMDtcblx0Y29uc3QgQk9BUkRfSEVJR0hUID0gMTAwO1xuXHRjb25zdCBUSUxFX1NJWkUgPSAxMDtcblxuXHRjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9hcmQnKTtcblx0Y2FudmFzLndpZHRoID0gQk9BUkRfV0lEVEg7XG5cdGNhbnZhcy5oZWlnaHQgPSBCT0FSRF9IRUlHSFQ7XG5cblx0Y29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5cdHZhciB3b3JsZE1hcCA9IHtcblx0XHRyb3dzOiAxMCwgXG5cdFx0Y29sczogMTAsXG5cdFx0bGF5ZXJzOlx0W1xuXHRcdFx0MCwgMSwgMSwgMCwgMSwgMSwgMCwgMSwgMSwgMCxcblx0XHRcdDAsIDIsIDEsIDAsIDIsIDEsIDAsIDIsIDEsIDAsXG5cdFx0XHQwLCAxLCAyLCAwLCAxLCAyLCAwLCAxLCAyLCAwLFxuXHRcdFx0MCwgMiwgMSwgMCwgMiwgMSwgMCwgMiwgMSwgMCxcblx0XHRcdDAsIDEsIDEsIDAsIDEsIDEsIDAsIDEsIDEsIDAsXG5cdFx0XHQwLCAyLCAyLCAwLCAyLCAyLCAwLCAyLCAyLCAwLFxuXHRcdFx0MCwgMSwgMSwgMCwgMSwgMSwgMCwgMSwgMSwgMCxcblx0XHRcdDAsIDIsIDEsIDAsIDIsIDEsIDAsIDIsIDEsIDAsXG5cdFx0XHQwLCAxLCAyLCAwLCAxLCAyLCAwLCAxLCAyLCAwLFxuXHRcdFx0MCwgMiwgMiwgMCwgMiwgMiwgMCwgMiwgMiwgMCxcblx0XHRdXG5cdH1cblx0dmFyIGNhbWVyYSA9IHtcblx0XHR4OiAwLFxuXHRcdHk6IDAsXG5cdFx0d2lkdGg6IDUwLFxuXHRcdGhlaWdodDogNTAsXG5cdFx0bWF4WDogOTAsXG5cdFx0bWF4WTogOTBcblx0fVxuXHR2YXIgdGlsZUF0bGFzID0gbmV3IE1hcCgpXG5cdHRpbGVBdGxhcy5zZXQoMCwgJ2dyZWVuJylcblx0dGlsZUF0bGFzLnNldCgxLCAncHVycGxlJylcblx0dGlsZUF0bGFzLnNldCgyLCAnYmx1ZScpXG5cblxuXHR2YXIgZ2V0VGlsZUluZGV4ID0gKHJvdywgY29sLCBjb2xzKSA9PiByb3cqY29scyArIGNvbFxuXHQvLyB2YWwgaXMgbm90IHVzZWQgYnV0IG5lZWRlZCBmb3IgXG5cdHZhciBnZXRSb3dDb2wgPSAoY29scywgdmFsLCBpZHgpID0+IHtcblx0XHRyZXR1cm4geyByb3c6IE1hdGguZmxvb3IoaWR4IC8gY29scyksIGNvbDogaWR4ICUgY29scywgdmFsOiB2YWx9IFxuXHR9XG5cdGdldFJvd0NvbCA9IFIuY3VycnkoZ2V0Um93Q29sKSh3b3JsZE1hcC5jb2xzKVxuXG5cdHZhciB2aXNpYmxlUmFuZ2UgPSAoY2FtU3RhcnQsIGNhbVNpemUsIHRzaXplKSA9PiB7XG5cdFx0cmV0dXJuIHsgXG5cdFx0XHRzdGFydDogTWF0aC5mbG9vcihjYW1TdGFydCAvIHRzaXplKSxcblx0XHRcdGVuZDogTWF0aC5mbG9vcihjYW1TdGFydCAvIHRzaXplKSArIGNhbVNpemUgLyB0c2l6ZVxuXHRcdH1cblx0fVxuXG5cdHZhciBjb2xSYW5nZSA9IHZpc2libGVSYW5nZShjYW1lcmEueCwgY2FtZXJhLndpZHRoLCBUSUxFX1NJWkUpXG5cdHZhciByb3dSYW5nZSA9IHZpc2libGVSYW5nZShjYW1lcmEueSwgY2FtZXJhLmhlaWdodCwgVElMRV9TSVpFKVxuXHR2YXIgZmlsdGVyVmlzaWJsZSA9IFIuY29tcG9zZShcblx0XHRSLmZpbHRlcihcblx0XHRcdFIud2hlcmUoe1xuXHRcdFx0XHRyb3c6IFIuYm90aChSLmd0KFIuX18sIHJvd1JhbmdlLnN0YXJ0IC0gMSksIFIubHQoUi5fXywgcm93UmFuZ2UuZW5kKSksXG5cdFx0XHRcdGNvbDogUi5ib3RoKFIuZ3QoUi5fXywgY29sUmFuZ2Uuc3RhcnQgLSAxKSwgUi5sdChSLl9fLCBjb2xSYW5nZS5lbmQpKVxuXHRcdFx0fSkpLFxuXHRcdFIuYWRkSW5kZXgoUi5tYXApKGdldFJvd0NvbCkpXG5cblx0dmFyIG9mZnNldD0gUi5jdXJyeSgodHNpemUsIGNhbVBvcykgPT4gLWNhbVBvcyArIE1hdGguZmxvb3IoY2FtUG9zIC8gdHNpemUpICogdHNpemUpKFRJTEVfU0laRSlcblx0dmFyIHJvd0NvbFZhbFRvWFlWYWwgPSBSLmN1cnJ5KCh0c2l6ZSwgY2FtLCByb3dDb2xWYWwpID0+IHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0eDogcm93Q29sVmFsLmNvbCAqIHRzaXplICsgb2Zmc2V0KGNhbS54KSwgXG5cdFx0XHR5OiByb3dDb2xWYWwucm93ICogdHNpemUgKyBvZmZzZXQoY2FtLnkpLCBcblx0XHRcdHZhbDogcm93Q29sVmFsLnZhbFxuXHRcdH1cblx0fSkoVElMRV9TSVpFLCBjYW1lcmEpIFxuXHR2YXIgcmVuZGVySW1hZ2UgPSBSLmN1cnJ5KCh0c2l6ZSwgY3R4LCB0YXRsYXMsIFhZVmFsKSA9PiB7XG5cdFx0Y3R4LmZpbGxTdHlsZSA9IHRhdGxhcy5nZXQoWFlWYWwudmFsKVxuXHRcdGN0eC5maWxsUmVjdChYWVZhbC54LCBYWVZhbC55LCB0c2l6ZSwgdHNpemUpIFxuXHR9KShUSUxFX1NJWkUsIGNvbnRleHQsIHRpbGVBdGxhcylcblx0cmVuZGVySW1hZ2Uoe3g6IDQwLCB5OiAzMCwgdmFsOjF9KVxuXHR2YXIgcmVuZGVyTWFwID0gUi5jb21wb3NlKFIubWFwKHJlbmRlckltYWdlKSwgUi5tYXAocm93Q29sVmFsVG9YWVZhbCksIGZpbHRlclZpc2libGUpXG5cblx0cmVuZGVyTWFwKHdvcmxkTWFwLmxheWVycylcbn0pKClcbiJdfQ==
