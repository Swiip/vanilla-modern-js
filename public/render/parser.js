import { map, reduce } from "/utils/utils.js";

const domParser = new DOMParser();
const errorDoc = domParser.parseFromString("INVALID", "text/xml");
const errorNs = errorDoc.getElementsByTagName("parsererror")[0].namespaceURI;

function partsToXml(parts, params) {
  let str = "";

  parts.forEach((part, i) => {
    str += part;

    if (i != parts.length - 1) {
      str += params[i];
    }
  });

  const doc = domParser.parseFromString(str, "text/xml");
  const errors = doc.getElementsByTagNameNS(errorNs, "parsererror");
  if (errors.length > 0) {
    const error = errors[0].textContent.split("\n")[0];
    throw `invalid dom: ${error}\n${xmlstr}`;
  }

  return doc;
}

function xmlToVdom(node) {
  if (node.children.length === 0) {
    return [node.innerHTML];
  }
  return map(node.children, child => ({
    type: child.tagName,
    attrs: reduce(
      child.attributes,
      (result, attr) => {
        result[attr.name] = attr.value;
        return result;
      },
      {}
    ),
    children: xmlToVdom(child)
  }));
}

export function parser(parts, ...params) {
  const doc = partsToXml(parts, params);
  const tree = xmlToVdom(doc)[0];
  console.log("doc", doc, tree);
  return tree;
}
