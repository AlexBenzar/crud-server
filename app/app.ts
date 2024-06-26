import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/User.routes";
import cors from "cors";
import profileRouter from "./routes/Profile.routes";

const PORT = 5000;
const DB__URL = `mongodb://database:27017/test`;

export const app = express();

app.use(express.json());
app.use(
   cors({
      credentials: true,
      origin: true,
   }),
);
app.use("/api", userRouter);
app.use("/profiles", profileRouter);

async function startApp() {
   try {
      await mongoose.connect(DB__URL);
      if (process.env.NODE_ENV !== "test") {
         app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
      }
   } catch (error) {
      console.log(error);
   }
}

startApp();
