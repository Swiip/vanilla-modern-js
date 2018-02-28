// ❤️ http://2ality.com/2013/11/initializing-arrays.html
function range(n) {
  return Array.apply(null, Array(n)).map((_, i) => i);
}

// ❤️ https://stackoverflow.com/a/15030117
function flatten(array) {
  return array.reduce((flat, toFlatten) => {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    );
  }, []);
}

function times(n, func) {
  for (let i = 0; i < n; i++) {
    func();
  }
}
