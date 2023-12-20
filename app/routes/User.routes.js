import { Router } from "express";
import UserController from "../controllers/User.controller.js";
<<<<<<< HEAD
import {
   signUpValidator,
   signInValidator,
   profileValidator,
   updateProfileValidator,
} from "../middleware/validations.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import ProfileController from "../controllers/Profile.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
=======
import signUpValidator from "../middleware/signUpValidation.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
>>>>>>> 9c4e3c4bce8cd8a32cf451a688fcb81a18e5949a

const userRouter = new Router();

userRouter.get("/users", roleMiddleware("admin"), UserController.getAll);
userRouter.post("/signup", signUpValidator, UserController.signUp);
<<<<<<< HEAD
userRouter.post("/signin", signInValidator, UserController.signIn);

userRouter.post("/profile", authMiddleware, profileValidator, ProfileController.createProfile);
userRouter.get("/userProfile/:id", roleMiddleware("admin"), ProfileController.getUserProfiles);
userRouter.get("/profile", authMiddleware, ProfileController.getMyProfiles);
userRouter.patch("/userProfile/:id", roleMiddleware("admin"), updateProfileValidator, ProfileController.updateUserProfile);
userRouter.patch("/profile/:id", authMiddleware, updateProfileValidator, ProfileController.updateMyProfiles);
userRouter.delete("/userProfile/:id", roleMiddleware("admin"), ProfileController.deleteUserProfile);
userRouter.delete("/profile/:id", authMiddleware, ProfileController.deleteMyProfiles);
=======
userRouter.post("/signin", UserController.signIn);
>>>>>>> 9c4e3c4bce8cd8a32cf451a688fcb81a18e5949a

export default userRouter;
