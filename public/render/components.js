import { find, map } from "/utils/utils.js";

function findImport(documentPath, doc = document) {
  if (!doc) {
    return null;
  }
  const links = doc.querySelectorAll(`link[rel="import"][href$=".html"]`);
  const match = find(
    links,
    link => link.attributes.href.value === documentPath
  );
  if (match) {
    return match.import;
  }
  return map(links, link => findImport(documentPath, link.import)).find(
    link => link
  );
}

export function attachShadow(documentPath, selector = "template") {
  const template = findImport(documentPath).querySelector(selector);

  this.attachShadow({ mode: "open" });
  this.shadowRoot.appendChild(template.content.cloneNode(true));

  console.log("Attach Shadow", documentPath, template);
}
