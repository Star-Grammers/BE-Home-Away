import express from "express";
import routes from "./routes";

function createServer() {
  const app = express();
  app.use(express.json());
  app.use("/", routes);
  return app;
}

export default createServer;
