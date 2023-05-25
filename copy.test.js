// import app from "./server.test.js";
const request = require("supertest");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

const { MONGODB_URI } = process.env;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", async (req, res) => {
  try {
    res.send("Hello, world!").status(200);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

describe("GET /", () => {
  test("responds with status code 200 and correct response body", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  }, 10000);
  test("responds with correct response body", async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe("Hello, world!");
  }, 10000);
});
