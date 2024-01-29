import mongoose from "mongoose";

const Profile = new mongoose.Schema({
   photo: { type: String },
   full_name: { type: String, required: true },
   gender: { type: String, required: true },
   birthdate: { type: Date, required: true },
   city: { type: String, required: true },
   country: { type: String, required: true },
   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

type ProfileType = mongoose.InferSchemaType<typeof Profile>;
export default mongoose.model<ProfileType>("Profile", Profile);
