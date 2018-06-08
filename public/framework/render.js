import { forEach, find, flatten } from "/utils/utils.js";

const domParser = new DOMParser();

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
    // console.log('set property', target, newNode, newNode[name], newNode.__)
    if (newNode.__ && newNode.__[name] !== undefined) {
      // console.log('set computed property', name, newNode.__[name])
      target[name] = newNode.__[name];
    }
  });
}

function changed(node1, node2) {
  // console.log('changed', node1, node2, node1.tagName, node2.tagName);
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
        // if (newChildNode.attributes && newChildNode.attributes.key) {
        //   console.log('find', oldChildNode.attributes.key.value, newChildNode.attributes.key.value, oldChildNode.__, newChildNode.__)
        // }
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
      oldIndex++;
    } else if (
      newChildNode !== undefined &&
      pairs.find(pair => newChildNode === pair[1])
    ) {
      newIndex++;
    } else {
      pairs.push([oldChildNode, newChildNode]);
      oldIndex++;
      newIndex++;
    }
  }

  return pairs;
}

function updateElement(parent, newNode, oldNode) {
  if (!oldNode) {
    parent.appendChild(newNode);
  } else if (!newNode) {
    parent.removeChild(oldNode);
  } else if (changed(newNode, oldNode)) {
    parent.replaceChild(newNode, oldNode);
  } else if (newNode.tagName) {
    // console.log('updateElement merge', oldNode, newNode)
    updateAttrs(oldNode, newNode);
    makeChildPairs(oldNode, newNode).forEach(pair => {
      // console.log('pairs', pair[1], pair[0])
      updateElement(oldNode, pair[1], pair[0]);
    });
  }
}

// Thanks to : http://2ality.com/2014/07/jsx-template-strings.html
function parse(htmlString) {
  const doc = domParser.parseFromString(htmlString, "text/html");

  // DomParser with text/html recreates html / body each times
  return doc.querySelector("body > *");
}

export function render(parent, htmlString) {
  updateElement(parent, parse(htmlString), parent.childNodes[0]);
}

// Parser V2

const paramRegex = /__(\d)+/;

const templateParser = string => {
  const template = document.createElement("template");
  template.innerHTML = string.trim();
  // console.log('parser', string.trim(), template.content.childNodes[0].cloneNode())
  return template.content;
};

const replaceAnchors = (parent, params) => {
  // console.log('replaceAnchors', parent, params)
  forEach(parent.childNodes, childNode => {
    if (childNode.attributes) {
      forEach(childNode.attributes, (attr) => {
        const match = attr.value.trim().match(paramRegex);
        if (match) {
          if (!childNode.__) {
            childNode.__ = {};
          }
          childNode.__[attr.name] = params[parseInt(match[1])];
          childNode.setAttribute(attr.name, params[parseInt(match[1])]);
        }
      })
    }
    if (childNode.nodeValue) {
      const match = childNode.nodeValue.trim().match(paramRegex);
      if (match) {
        const param = params[parseInt(match[1])];
        // console.log('coucou', param, param instanceof DocumentFragment || Array.isArray(param));
        if (param instanceof DocumentFragment || Array.isArray(param)) {
          let children = Array.isArray(param) ? flatten(param) : [param]
          parent.removeChild(childNode);
          children.forEach(child => parent.appendChild(child));
        } else {
          childNode.nodeValue = param;
        }
      }
    } else {
      replaceAnchors(childNode, params);
    }
  });
};

// ❤️ http://2ality.com/2014/07/jsx-template-strings.html
// ❤️ https://gist.github.com/lygaret/a68220defa69174bdec5
export function html(parts, ...params) {
  const stringWithAnchors = parts.reduce(
    (acc, part, i) =>
      i !== parts.length - 1 ? `${acc}${part}__${i}` : `${acc}${part}`,
    ""
  );
  const domWithAnchors = templateParser(stringWithAnchors);
  // console.log('parse', stringWithAnchors, domWithAnchors);
  replaceAnchors(domWithAnchors, params);
  return domWithAnchors.childNodes[0];
}

export function render2(parent, html) {
  // console.log('render2', parent, html, parent.childNodes[0]);
  updateElement(parent, html, parent.childNodes[0]);
}
