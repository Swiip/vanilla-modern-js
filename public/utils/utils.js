// ❤️ http://2ality.com/2013/11/initializing-arrays.html
export function range(n) {
  return Array.apply(null, Array(n)).map((_, i) => i);
}
