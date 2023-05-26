import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
// import router from "./routes";
import router from "./routes.js";

dotenv.config();
const { PORT = 3030, DB_URI } = process.env;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use("/", router);

    app.listen(PORT, () => {
      console.log("Server has started on :", PORT);
    });
  });
