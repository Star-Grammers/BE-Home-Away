import cors from "cors";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import x from "./testData.js";
import { User } from "./models/Post.js";

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post("/api/reservations/", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user.reservations);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});
// TODO: /api/reservation/edit, use $set, or wtvr works for editing each input
router.put("/api/reservations/creation", async (req, res) => {
  const { guestCount, petsCount, phoneNumber, checkInDate, userId } = req.body;
  const reservationId = uuidv4();
  try {
    const userFound = await User.findByIdAndUpdate(userId, {
      $push: {
        reservations: {
          guestCount,
          petsCount,
          phoneNumber,
          checkInDate,
          reservationId,
        },
      },
    });
    res.status(200).json(userFound);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

router.put("/reservations/delete", async (req, res) => {
  const { reservationId, userId } = req.body;
  console.log(userId, "userId mofo");
  console.log(reservationId, "the reservationId");
  try {
    const reservationDeleted = await User.findByIdAndUpdate(userId, {
      $pull: {
        reservations: { reservationId },
      },
    });
    res.status(200).json(reservationDeleted);
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

router.delete("/users/delete", async (req, res) => {
  const { userId } = req.body;
  console.log(userId, "userId");
  try {
    await User.findOneAndDelete(userId);
    res.status(200).send("reservation deleted");
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
