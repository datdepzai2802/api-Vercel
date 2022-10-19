const jsonServer = require("json-server");
const cors = require("cors");
const auth = require("json-server-auth");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({
  noCors: true,
});
server.db = router.db;

const rules = auth.rewriter({
  // Permission rules
  // users: 600,
  // messages: 640
});

// You must apply the middlewares in the following order
server.use(cors());
server.use(rules);
server.use(auth);

server.use(middlewares);
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Max-Age", "1800");
res.setHeader("Access-Control-Allow-Headers", "content-type");

server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createAt = Date.now();
    req.body.updateAt = Date.now();
  } else if (req.method === "PATCH") {
    req.body.updateAt = Date.now();
  }
  next();
});

server.use("/api", router);
server.listen(4000, () => {
  console.log("JSON Server is running");
});
