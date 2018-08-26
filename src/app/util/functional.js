export function compose(...fns) {
  return function composed(result) {
    return fns.reduceRight(function reducer(result, fn) {
      return fn(result);
    }, result);
  };
}

// export var map = (fn, arr) => arr.map(fn);
export function map(fn, arr) {
  return arr.map(fn);
}

export var pipeAsync =  
  (...fns) =>
    init => 
      fns.reduce( 
        (acc, fn) => acc.then(fn), 
        Promise.resolve(init)
      );
  
export function composeAsync(...fns) {
  return function composed(initialValue) {
    return fns.reduceRight(
      function applyAsync(sum, fn) {
        return Promise.resolve(sum).then(fn);
      }, 
      initialValue
    );
  };
}

export function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      var args = prevArgs.concat([nextArg]);
      if (args.length >= arity) {
        return fn(...args);
      }
      else {
        return nextCurried(args);
      }
    };
  })([]);
}

export var flatten = 
  arr => 
    arr.reduce(
      (list, v) =>
        list.concat(Array.isArray(v)? flatten(v) : v),
      []);

export var maybe =
  arg => arg ? arg : 0;