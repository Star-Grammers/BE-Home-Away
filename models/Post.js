import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", userSchema);

const reservationSchema = new mongoose.Schema({
  guestCount: {
    type: Number,
    required: true,
  },
  petsCount: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);
export default { UserModel, Reservation };
