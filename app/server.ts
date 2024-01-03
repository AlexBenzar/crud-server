import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/User.routes";
import cors from "cors";

const PORT = 5001;
const DB__URL = `mongodb+srv://olexandrbenzarsifex:12345@crud-database.xlbnxut.mongodb.net/`;

export const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", userRouter);

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
