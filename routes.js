// import dotenv from "dotenv";
// import cors from "cors";
import express from "express";
// import mongoose from "mongoose";
import testData from "./testData.js";
import UserModel from "./models/Post.js";

const router = express.Router();

// dotenv.config();
// const app = express();

// const { PORT = 3000, DB_URI } = process.env;

// app.use(cors());
// app.use(express.json());

// mongoose
//   .connect(DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Failed to connect to MongoDB:", error);
//   });

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });
// const User = mongoose.model("User", userSchema);

// const reservationSchema = new mongoose.Schema({
//   guestCount: {
//     type: Number,
//     required: true,
//   },
//   petsCount: {
//     type: Number,
//     required: true,
//   },
//   phoneNumber: {
//     type: String,
//     required: true,
//   },
//   checkInDate: {
//     type: Date,
//     required: true,
//   },
// });

// const Reservation = mongoose.model("Reservation", reservationSchema);

// app.post("/api/reservations", async (req, res) => {
//   const { guestCount, petsCount, phoneNumber, checkInDate } = req.body;

//   try {
//     const newReservation = new Reservation({
//       guestCount,
//       petsCount,
//       phoneNumber,
//       checkInDate,
//     });

//     await newReservation.save();
//     console.log(newReservation, "the newReservation");
//     res.status(200).json({ message: "Reservation saved successfully" });
//   } catch (error) {
//     res.status(500).send("An error occurred");
//   }
// });
// router.post("/api/reservations", async (req, res) => {
//   const { guestCount, petsCount, phoneNumber, checkInDate } = req.body;

//   try {
//     const newReservation = new Reservation({
//       guestCount,
//       petsCount,
//       phoneNumber,
//       checkInDate,
//     });

//     await newReservation.save();
//     console.log(newReservation, "the newReservation");
//     res.status(200).json({ message: "Reservation saved successfully" });
//   } catch (error) {
//     res.status(500).send("An error occurred");
//   }
// });

// app.get("/api/reservations", async (req, res) => {
//   try {
//     const reservations = await Reservation.find({});
//     res.json(reservations);
//   } catch (error) {
//     res.status(500).send("An error occurred");
//   }
// });
// router.get("/api/reservations", async (req, res) => {
//   try {
//     const reservations = await Reservation.find({});
//     res.json(reservations);
//   } catch (error) {
//     res.status(500).send("An error occurred");
//   }
// });

// app.get("/", async (req, res) => {
//   try {
//     res.send("Hello, world!").status(200);
//   } catch (error) {
//     res.status(500).send("An error occurred");
//   }
// });
router.get("/", async (req, res) => {
  try {
    res.send("Hello, world!").status(200);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

// app.post("/user/signup", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       res.status(409).send("User already exists");
//     } else {
//       const newUser = new User({ email, password });
//       await newUser.save();

//       res.send({ message: "User created successfully" });
//     }
//   } catch (error) {
//     res.status(500).send("An error occurred");
//   }
// });

router.post("/user/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res.status(409).send("User already exists");
    } else {
      const newUser = new UserModel({ email, password });
      await newUser.save();

      res.send({ message: "User created successfully" });
    }
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.json(users);
//   } catch (error) {
//     res.status(500).send("An error occurred");
//   }
// });
router.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

// app.post("/user/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user || user.password !== password) {
//       res.status(401).send("Invalid email or password");
//     } else {
//       res.send({ token: user.token });
//     }
//   } catch (error) {
//     res.status(500).send("An error occurred");
//   }
// });
router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user || user.password !== password) {
      res.status(401).send("Invalid email or password");
    } else {
      res.send({ token: user.token });
    }
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

// app.get("/api/listings", (req, res) => {
//   res.json(testData);
// });

router.get("/api/listings", (req, res) => {
  res.json(testData);
});

// function errorHandler(err) {
//   if (err) console.log(err);
//   console.log("Server listening on PORT", PORT);
// }

// app.listen(PORT, errorHandler);

// export default app;
export default router;
