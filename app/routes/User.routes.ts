import { Router } from "express";
import UserController from "../controllers/User.controller";
import { signUpValidator, signInValidator } from "../middleware/validations.middleware";
import roleMiddleware from "../middleware/role.middleware";
import authMiddleware from "../middleware/auth.middleware";
import upload from "../middleware/uploar.middleware";

const userRouter = Router();

userRouter.post("/signup", upload.single("picture"), signUpValidator, UserController.signUp);
userRouter.post("/signin", signInValidator, UserController.signIn);
userRouter.get("/users", roleMiddleware("admin"), signUpValidator, UserController.getAll);
userRouter.get("/user", authMiddleware, UserController.getUser);
userRouter.get("/user/:id", authMiddleware, UserController.getUser);
userRouter.patch("/user/:id", upload.single("picture"), roleMiddleware("admin"), UserController.editUser);
userRouter.delete("/user/:id", roleMiddleware("admin"), UserController.deleteUser);

export default userRouter;
