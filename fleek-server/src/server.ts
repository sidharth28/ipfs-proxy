import bodyParser from "body-parser";
import express from "express";
import config from "config";
import { createProxyMiddleware } from "http-proxy-middleware";

import connectDB from "../config/database";

import auth from "./routes/api/auth";
import apiKey from "./routes/api/apiKey";
import user from "./routes/api/user";
import authM from "./middleware/authM";
import log from "./middleware/log";

const app = express();

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5011);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const secret: string = config.get("secret");
const ipfsEndpoint: string = config.get("ipfsEndpoint");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, HEAD"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});
app.options("/*", (_, res) => {
  res.sendStatus(200);
});

app.use(
  "/api",
  authM,
  log,
  createProxyMiddleware({
    target: ipfsEndpoint,
  })
);

app.get("/test", (_req, res) => {
  res.json("Fleek Assingment - Ready");
});

app.use("/v1/api/auth", auth);
app.use("/v1/api/user", user);
app.use("/v1/api/key", apiKey);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
