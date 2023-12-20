import { Router } from "express";
import UserController from "../controllers/User.controller.js";
import {
   signUpValidator,
   signInValidator,
   profileValidator,
   updateProfileValidator,
} from "../middleware/validations.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import ProfileController from "../controllers/Profile.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const userRouter = new Router();

userRouter.get("/users", roleMiddleware("admin"), UserController.getAll);
userRouter.post("/signup", signUpValidator, UserController.signUp);
userRouter.post("/signin", signInValidator, UserController.signIn);
userRouter.get("/userProfile/:id", roleMiddleware("admin"), ProfileController.getUserProfiles);
userRouter.get("/profile", authMiddleware, ProfileController.getMyProfiles);
userRouter.post("/profile", authMiddleware, profileValidator, ProfileController.createProfile);
userRouter.patch("/userProfile/:id", roleMiddleware("admin"), updateProfileValidator, ProfileController.updateUserProfile);
userRouter.patch("/profile/:id", authMiddleware, ProfileController.updateMyProfiles);

export default userRouter;
