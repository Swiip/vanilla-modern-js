import { map, reduce } from "/utils/utils.js";

const domParser = new DOMParser();

export function dom(parts, ...params) {
  let str = "";

  parts.forEach((part, i) => {
    str += part;

    if (i != parts.length - 1) {
      str += params[i];
    }
  });

  const doc = domParser.parseFromString(str, "text/html");

  // DomParser with text/html recreates html / body each times
  return doc.querySelector("body > *");
}
