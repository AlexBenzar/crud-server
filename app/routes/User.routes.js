import { Router } from "express";
import UserController from "../controllers/User.controller.js";
import signUpValidator from "../middleware/signUpValidation.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

const userRouter = new Router();
var a = 5;

console.log(a);
userRouter.get("/users", roleMiddleware("admin"), UserController.getAll);
userRouter.post("/signup", signUpValidator, UserController.signUp);
userRouter.post("/signin", UserController.signIn);

export default userRouter;
