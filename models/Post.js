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
export default { User };
