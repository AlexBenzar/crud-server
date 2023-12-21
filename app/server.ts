import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/User.routes";

const PORT: number = 5000;
const DB__URL: string = `mongodb+srv://olexandrbenzarsifex:12345@crud-database.xlbnxut.mongodb.net/`;

const app = express();

app.use(express.json());
app.use("/api", userRouter);

async function startApp() {
   try {
      await mongoose.connect(DB__URL);
      app.listen(PORT, () => console.log("Server is working..."));
   } catch (error) {
      console.log(error);
   }
}

startApp();
