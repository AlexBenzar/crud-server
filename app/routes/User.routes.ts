import { Router } from "express";
import UserController from "../controllers/User.controller";
import { signUpValidator, signInValidator, updateUserValidator } from "../middleware/validations.middleware";
import roleMiddleware from "../middleware/role.middleware";
import authMiddleware from "../middleware/auth.middleware";
import upload from "../middleware/uploar.middleware";

const userRouter = Router();

userRouter.post("/signup", upload.single("picture"), signUpValidator, UserController.signUp);
userRouter.post("/signin", signInValidator, UserController.signIn);
userRouter.get("/dashboard", roleMiddleware("admin"), UserController.getDashboard);
userRouter.get("/users", roleMiddleware("admin"), UserController.getAll);
userRouter.get("/user", authMiddleware, UserController.getUser);
userRouter.get("/user/:id", authMiddleware, UserController.getUser);
userRouter.patch("/user/:id", roleMiddleware("admin"), upload.single("picture"), updateUserValidator, UserController.editUser);
userRouter.delete("/user/:id", roleMiddleware("admin"), UserController.deleteUser);

export default userRouter;
