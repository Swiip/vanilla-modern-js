// ❤️ http://2ality.com/2013/11/initializing-arrays.html
export function range(n) {
  return Array.apply(null, Array(n)).map((_, i) => i);
}

// ❤️ https://stackoverflow.com/a/15030117
export function flatten(array) {
  return array.reduce((flat, toFlatten) => {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    );
  }, []);
}

export function times(n, func) {
  for (let i = 0; i < n; i++) {
    func();
  }
}

export const forEach = (...args) => Array.prototype.forEach.call(...args);
export const map = (...args) => Array.prototype.map.call(...args);
export const reduce = (...args) => Array.prototype.reduce.call(...args);
