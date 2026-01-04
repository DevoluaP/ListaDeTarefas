const jsonServer = require("json-server");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const fs = require("fs");
const path = require("path");
const data = JSON.parse(fs.readFileSync(path.join(__dirname, "db.json"), "utf-8"));
const router = jsonServer.router(data);

server.use(middlewares);

server.use(router);
server.listen(3000, () => {
 console.log("JSON Server is running");
});

module.exports = server;
