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
  reservations: {
    type: Array,
    required: false,
  },
});

export const User = mongoose.model("User", userSchema);

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

// export const Reservation = mongoose.model("Reservation", reservationSchema);
// export default { User, Reservation};
export default { User };
