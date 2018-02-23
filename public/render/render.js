import { map } from "/utils/utils.js";

function setAttrs($target, attrs) {
  Object.keys(attrs).forEach(name => {
    $target.setAttribute(name, attrs[name]);
  });
}

function updateAttr($target, name, newVal, oldVal) {
  if (!newVal) {
    $target.removeAttribute(name);
  } else if (!oldVal || newVal !== oldVal) {
    $target.setAttribute(name, newVal);
  }
}

function updateAttrs($target, newAttrs, oldAttrs = {}) {
  const attrs = Object.assign({}, newAttrs, oldAttrs);
  Object.keys(attrs).forEach(name => {
    updateAttr($target, name, newAttrs[name], oldAttrs[name]);
  });
}

function createElement(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  setAttrs($el, node.attrs);
  node.children.map(createElement).forEach($el.appendChild.bind($el));
  return $el;
}

function changed(node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
}

export function updateElement($parent, newNode, oldNode, index = 0) {
  if (!oldNode) {
    $parent.appendChild(createElement(newNode));
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
  } else if (newNode.type) {
    updateAttrs($parent.childNodes[index], newNode.attrs, oldNode.attrs);
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    const start = (newLength > oldLength ? newLength : oldLength) - 1;
    for (let i = start; i >= 0; i--) {
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}
