import { forEach } from "/utils/utils.js";

function updateAttr(target, name, newAttr, oldAttr) {
  if (!newAttr) {
    target.removeAttribute(name);
  } else if (!oldAttr.value || newAttr.value !== oldAttr.value) {
    target.setAttribute(name, newAttr.value);
  }
}

function updateAttrs(target, newNode) {
  const attrNames = new Set();
  [target, newNode].forEach(node =>
    forEach(node.attributes, attr => attrNames.add(attr.name))
  );
  attrNames.forEach(name =>
    updateAttr(target, name, newNode.attributes[name], target.attributes[name])
  );
}

function changed(node1, node2) {
  return (
    ((node1.tagName !== undefined || node2.tagName !== undefined) &&
      node1.tagName !== node2.tagName) ||
    (node1.tagName === undefined &&
      node2.tagName === undefined &&
      node1.data !== node2.data)
  );
}

export function updateElement(parent, newNode, index = 0) {
  const oldNode = parent.childNodes[index];
  // console.log("updateElement", parent, newNode, oldNode, index);
  if (!oldNode) {
    // console.log("append", newNode);
    parent.appendChild(newNode);
  } else if (!newNode) {
    // console.log("remove", oldNode);
    parent.removeChild(oldNode);
  } else if (changed(newNode, oldNode)) {
    // console.log("replace", newNode);
    parent.replaceChild(newNode, oldNode);
  } else if (newNode.tagName) {
    updateAttrs(oldNode, newNode);
    const newLength = newNode.childNodes.length;
    const oldLength = oldNode.childNodes.length;
    const start = (newLength > oldLength ? newLength : oldLength) - 1;
    for (let i = start; i >= 0; i--) {
      updateElement(oldNode, newNode.childNodes[i], i);
    }
  }
}
