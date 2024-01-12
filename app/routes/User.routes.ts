import { Router, Request, Response } from "express";
import UserController from "../controllers/User.controller";
import ProfileController from "../controllers/Profile.controller";
import { signUpValidator, signInValidator, profileValidator, updateProfileValidator } from "../middleware/validations.middleware";
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

// userRouter.post("/profile", authMiddleware, profileValidator, ProfileController.createProfile);
// userRouter.get("/userProfile/:id", roleMiddleware("admin"), ProfileController.getUserProfiles);
// userRouter.get("/profile", authMiddleware, ProfileController.getMyProfiles);
// userRouter.patch("/userProfile/:id", roleMiddleware("admin"), updateProfileValidator, ProfileController.updateUserProfile);
// userRouter.patch("/profile/:id", authMiddleware, updateProfileValidator, ProfileController.updateMyProfiles);
// userRouter.delete("/userProfile/:id", roleMiddleware("admin"), ProfileController.deleteUserProfile);
// userRouter.delete("/profile/:id", authMiddleware, ProfileController.deleteMyProfiles);

export default userRouter;
