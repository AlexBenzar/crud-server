import mongoose from "mongoose";

const User = new mongoose.Schema({
   username: { type: String, required: true },
   email: { type: String, unique: true, required: true },
   password: { type: String, required: true },
   role: { type: String, ref: "Role" },
   picture: { type: String },
});

type UserType = mongoose.InferSchemaType<typeof User>;
export default mongoose.model<UserType>("User", User);
