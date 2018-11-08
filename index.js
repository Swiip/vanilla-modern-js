const http2 = require("http2");
const fs = require("fs");
const path = require("path");
const util = require("util");

const open = util.promisify(fs.open);
const stat = util.promisify(fs.stat);
const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);

const { findPushFiles, getFilePath } = require("./discover");

const extTypeMap = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".wasm": "application/wasm"
};

const acceptedRequests = {
  "/": "/index.html",
  "/index.html": "/index.html",
  "/logic/store.js": "/logic/store.js",
  "/sw.js": "/sw.js",
  "/rust/debug/2048.wasm": "/rust/debug/2048.wasm",
  "/rust/release/2048.wasm": "/rust/release/2048.wasm"
};

const server = http2.createSecureServer({
  key: fs.readFileSync("certs/localhost-privkey.pem"),
  cert: fs.readFileSync("certs/localhost-cert.pem")
});

server.on("error", err => console.error("error", err));
server.on("socketError", err => console.error(err));

const send = async (stream, requestPath, log = "send") => {
  const filePath = path.join(__dirname, "public", requestPath);
  const fd = await open(filePath, "r");

  const ext = path.extname(filePath);
  const statData = await stat(filePath);

  const headers = {
    "content-length": statData.size,
    "last-modified": statData.mtime.toUTCString(),
    "content-type": `${extTypeMap[ext]}; charset=utf-8`
  };

  stream.respondWithFD(fd, headers);
};

const push = (stream, filePath, from = null) => {
  stream.pushStream({ ":path": filePath }, (err, pushStream) => {
    pushStream.on("error", error => console.error("Push stream error", error));
    send(pushStream, filePath, `push from ${from}`);
  });
};

server.on("stream", async (stream, headers) => {
  console.log("request", headers[":path"]);

  stream.on("error", error => console.error("Stream error", error));

  if (Object.keys(acceptedRequests).includes(headers[":path"])) {
    const request = acceptedRequests[headers[":path"]];
    let pushFiles = await findPushFiles(request);
    pushFiles = Array.from(new Set(pushFiles));
    pushFiles.forEach(pushFile => {
      push(stream, pushFile, request);
    });
    send(stream, request);
  } else {
    stream.respond({ ":status": 404 });
    stream.end();
  }
});

server.on("error", error => console.error("Server error", error));

server.listen(8443);
