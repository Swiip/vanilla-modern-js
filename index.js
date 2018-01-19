const http2 = require("http2");
const fs = require("fs");
const path = require("path");
const util = require("util");

const open = util.promisify(fs.open);
const stat = util.promisify(fs.stat);
const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);

const { findPushFiles } = require("./discover");

const extTypeMap = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css"
};

const server = http2.createSecureServer({
  key: fs.readFileSync("certs/localhost-privkey.pem"),
  cert: fs.readFileSync("certs/localhost-cert.pem")
});

server.on("error", err => console.error(err));
server.on("socketError", err => console.error(err));

const send = async (stream, requestPath) => {
  const filePath = path.join(__dirname, "public", requestPath);
  const fd = await open(filePath, "r");

  const ext = path.extname(filePath);
  const statData = await stat(filePath);

  const headers = {
    "content-length": statData.size,
    "last-modified": statData.mtime.toUTCString(),
    "content-type": extTypeMap[ext]
  };

  console.log("send", requestPath);

  stream.respondWithFD(fd, headers);
};

const push = (stream, filePath) => {
  stream.pushStream({ ":path": filePath }, (err, pushStream) => {
    send(pushStream, filePath);
  });
};

server.on("stream", async (stream, headers) => {
  console.log("request", headers[":path"]);

  if (headers[":path"] === "/" || headers[":path"] === "/index.html") {
    const pushFiles = await findPushFiles("index.html");
    pushFiles.forEach(pushFile => {
      push(stream, pushFile);
    });
    send(stream, "index.html");
  } else {
    stream.respond({ ":status": 404 });
    stream.end();
  }
});

server.listen(8443);
