import mongoose from "mongoose";

const Role = new mongoose.Schema({
   value: { type: String, unique: true, default: "user" },
});

type RoleType = mongoose.InferSchemaType<typeof Role>;
export default mongoose.model<RoleType>("Role", Role);
