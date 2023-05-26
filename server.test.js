// import request from "supertest";
// import app from "./routes";

// describe("GET /", () => {
//   test("responds with status code 200 and correct response body", async () => {
//     const response = await request(app).get("/");
//     expect(response.statusCode).toBe(200);
//   }, 10000);

//   test("responds with correct response body", async () => {
//     const response = await request(app).get("/");
//     expect(response.text).toBe("Hello, world!");
//   }, 10000);
// });

import dotenv from "dotenv";
import mongoose from "mongoose";
// import request from "supertest";
import supertest from "supertest";
import createServer from "./server";
// import UserModel from "./models/Post.js";

dotenv.config();
const { DB_URI } = process.env;

// beforeEach((done) => {
//   mongoose.connect(
//     "mongodb://localhost:27017/test",
//     { useNewUrlParser: true },
//     () => done()
//   );
// });

// afterEach((done) => {
//   mongoose.connection.db.dropDatabase(() => {
//     mongoose.connection.close(() => done());
//   });
// });
beforeEach(async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // console.log("Server runing");
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
// console.log(app, "app mf");
test("GET /", async () => {
  // const userModel = await UserModel.create({
  //   email: "ismael@gmail.com",

  //   password: "123",
  // });

  await supertest(app)
    .get("/")
    .expect(200)
    .then((response) => {
      expect(response.text).toBe("Hello, world!");
      // expect(response.body.length).toEqual(1);

      // expect(response.body[0]._id).toBe(post.id);
      // expect(response.body[0].email).toBe(userModel.email);
      // expect(response.body[0].password).toBe(userModel.password);
    });
});
