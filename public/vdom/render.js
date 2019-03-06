export const forEach = (...args) => Array.prototype.forEach.call(...args);
export const find = (...args) => Array.prototype.find.call(...args);

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
  attrNames.forEach(name => {
    updateAttr(target, name, newNode.attributes[name], target.attributes[name]);
  });
}

function changed(node1, node2) {
  // console.log("changed", node1, node2, node1.tagName, node2.tagName);
  return (
    ((node1.tagName !== undefined || node2.tagName !== undefined) &&
      node1.tagName !== node2.tagName) ||
    (node1.tagName === undefined &&
      node2.tagName === undefined &&
      node1.data !== node2.data)
  );
}

function makeChildPairs(oldNode, newNode) {
  const pairs = [];

  // Matching keys
  forEach(oldNode.childNodes, oldChildNode => {
    if (oldChildNode.attributes && oldChildNode.attributes.key) {
      const match = find(newNode.childNodes, newChildNode => {
        return (
          newChildNode.attributes &&
          newChildNode.attributes.key &&
          oldChildNode.attributes.key.value ===
            newChildNode.attributes.key.value
        );
      });
      if (match) {
        pairs.push([oldChildNode, match]);
      } else {
        pairs.push([oldChildNode, undefined]);
      }
    }
  });

  // Others
  let oldIndex = 0;
  let newIndex = 0;

  while (
    oldIndex < oldNode.childNodes.length ||
    newIndex < newNode.childNodes.length
  ) {
    const oldChildNode = oldNode.childNodes[oldIndex];
    const newChildNode = newNode.childNodes[newIndex];
    if (
      oldChildNode !== undefined &&
      pairs.find(pair => oldChildNode === pair[0])
    ) {
      oldIndex += 1;
    } else if (
      newChildNode !== undefined &&
      pairs.find(pair => newChildNode === pair[1])
    ) {
      newIndex += 1;
    } else {
      pairs.push([oldChildNode, newChildNode]);
      oldIndex += 1;
      newIndex += 1;
    }
  }

  return pairs;
}

function updateElement(parent, newNode, oldNode) {
  // console.log("update", newNode, oldNode);
  if (!oldNode) {
    parent.appendChild(newNode);
  } else if (!newNode) {
    parent.removeChild(oldNode);
  } else if (changed(newNode, oldNode)) {
    parent.replaceChild(newNode, oldNode);
  } else if (newNode.tagName) {
    // console.log("updateElement merge", oldNode, newNode);
    updateAttrs(oldNode, newNode);
    makeChildPairs(oldNode, newNode).forEach(pair => {
      // console.log("pairs", pair[1], pair[0]);
      updateElement(oldNode, pair[1], pair[0]);
    });
  }
}

const parser = string => {
  const template = document.createElement("template");
  template.innerHTML = string.trim();
  // console.log('parser', string.trim(), template.content.childNodes[0].cloneNode())
  return template.content.childNodes[0];
};

export function render(parent, html) {
  // console.log('render2', parent, html, parent.childNodes[0]);
  updateElement(parent, parser(html), parent.childNodes[0]);
}
