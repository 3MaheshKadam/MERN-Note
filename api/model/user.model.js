import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: string,
      unique: true,
      required: true,
    },
    email: {
      type: string,
      unique: true,
      required: true,
    },
    password: {
      type: string,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);

export default User;
