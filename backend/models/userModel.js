import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name : { type: String, required: true },
    email : { type: String, required: true, unique: true },
    phone : { type: Number, required: true, unique: true },
    role : { type: String, enum: ["user", "admin"], default: "user" }
  }
)

export const userModel = mongoose.model("users", userSchema);