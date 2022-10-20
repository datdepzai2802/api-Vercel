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

server.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "https://nhom7-angular.vercel.app/");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );

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
