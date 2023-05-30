import cors from "cors";
import express from "express";
import x from "./testData.js";
import { User, Reservation } from "./models/Post.js";

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post("/api/reservations", async (req, res) => {
  const { guestCount, petsCount, phoneNumber, checkInDate } = req.body;

  try {
    const newReservation = new Reservation({
      guestCount,
      petsCount,
      phoneNumber,
      checkInDate,
    });

    await newReservation.save();
    console.log(newReservation, "the newReservation");
    res.status(200).json({ message: "Reservation saved successfully" });
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

router.get("/api/reservations", async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    res.json(reservations);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

router.get("/", async (req, res) => {
  try {
    res.send("Hello, world!").status(200);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

router.post("/user/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).send("User already exists");
    } else {
      const newUser = new User({ email, password });
      await newUser.save();

      res.send({ message: "User created successfully" });
    }
  } catch (error) {
    res.status(500).send(`This is your error: ${error}`);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      res.status(401).send("Invalid email or password");
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

router.get("/api/listings", (req, res) => {
  res.json(x);
});

export default router;
