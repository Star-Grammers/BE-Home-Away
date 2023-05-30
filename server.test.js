import dotenv from "dotenv";
import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "./server.js";

dotenv.config();
const { DB_URI } = process.env;

beforeEach(async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Error connecting to the MongoDB database:", error);
  }
});

afterEach(async () => {
  try {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error dropping the MongoDB database:", error);
  }
});

const app = createServer();
test("GET /", async () => {
  await supertest(app)
    .get("/")
    .expect(200)
    .then((response) => {
      expect(response.text).toBe("Hello, world!");
    });
});
