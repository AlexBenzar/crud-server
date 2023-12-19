import mongoose from "mongoose";

const User = new mongoose.Schema({
   username: { type: String, unique: true, required: true },
   email: { type: String, unique: true, required: true },
   password: { type: String, required: true },
   role: { type: String, ref: "Role" },
   picture: { type: String },
});

export default mongoose.model("User", User);
