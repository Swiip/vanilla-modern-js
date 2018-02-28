const fs = require("fs");
const path = require("path");
const util = require("util");

const open = util.promisify(fs.open);
const readFile = util.promisify(fs.readFile);

const pushTypes = [".html", ".js", ".css"];

const htmlLinkRegex = /<link[^>]+href="([^"]*)"[\s/]*[^>]*>/g;
const htmlScriptRegex = /<script[^>]*src="([^"]*)"[^>]*>[\s]*<\/script>/g;
const jsImportRegex = /import.*from[\s]+['"]([^'"]*)['"]/g;
const jsWorkerRegex = /new\s+Worker\s*\(\s*['"]([^'"]*)['"]/g;
const jsImportScriptsRegex = /importScripts\s*\(\s*['"]([^'"]*)['"]/g;
const cssImportRegex = /url\("([^"]*)"\)/g;

const gatherMatches = (regex, content) => {
  const results = [];
  while ((result = regex.exec(content)) !== null) {
    results.push(result[1]);
  }
  return results;
};

const findPushFiles = async requestPath => {
  const filePath = path.join(__dirname, "public", requestPath);
  const ext = path.extname(filePath);

  if (!pushTypes.includes(ext)) {
    return [];
  }

  const content = await readFile(filePath);

  let pushes = [];

  if (ext === ".html") {
    pushes.push(...gatherMatches(htmlLinkRegex, content));
    pushes.push(...gatherMatches(htmlScriptRegex, content));
    pushes.push(...gatherMatches(jsImportRegex, content));
  }

  if (ext === ".js") {
    pushes.push(...gatherMatches(jsImportRegex, content));
    // pushes.push(...gatherMatches(jsWorkerRegex, content));
    pushes.push(...gatherMatches(jsImportScriptsRegex, content));
  }

  if (ext === ".css") {
    pushes.push(...gatherMatches(cssImportRegex, content));
  }

  await Promise.all(
    pushes.map(async filePath => {
      pushes.push(...(await findPushFiles(filePath)));
    })
  );

  pushes = pushes.map(filePath => path.resolve("/", filePath));

  return pushes;
};

exports.findPushFiles = findPushFiles;
