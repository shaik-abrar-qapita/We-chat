import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"]
    },
    username: {
      type: String,
      unique: true,
      required: [true, "Name is required"]
    },

    phone: {
      type: Number,
      unique: true,
      required: [true, "Phone no is required"]
    },
    password: {
      type: String,
      required: [true, "Password is requierd"]
    },
    gender: {
      type: String,
      required: [true, "Gender is requierd"],
      enum: ["male", "female"]
    },
    profilePic: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", UserModel);

export default User;
