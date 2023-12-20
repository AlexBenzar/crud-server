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

userRouter.post("/profile", authMiddleware, profileValidator, ProfileController.createProfile);
userRouter.get("/userProfile/:id", roleMiddleware("admin"), ProfileController.getUserProfiles);
userRouter.get("/profile", authMiddleware, ProfileController.getMyProfiles);
userRouter.patch("/userProfile/:id", roleMiddleware("admin"), updateProfileValidator, ProfileController.updateUserProfile);
userRouter.patch("/profile/:id", authMiddleware, updateProfileValidator, ProfileController.updateMyProfiles);
userRouter.delete("/userProfile/:id", roleMiddleware("admin"), ProfileController.deleteUserProfile);
userRouter.delete("/profile/:id", authMiddleware, ProfileController.deleteMyProfiles);

export default userRouter;
