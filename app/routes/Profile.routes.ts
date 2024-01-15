import { Router } from "express";
import ProfileController from "../controllers/Profile.controller";
import { profileValidator } from "../middleware/validations.middleware";
import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";

const profileRouter = Router();

profileRouter.get("/profile", authMiddleware, ProfileController.getProfiles);
profileRouter.get("/profile/:id", authMiddleware, ProfileController.getProfiles);
profileRouter.post("/profile", authMiddleware, profileValidator, ProfileController.createProfile);
profileRouter.post("/profile/:id", authMiddleware, profileValidator, ProfileController.createProfile);
// profileRouter.patch("/userProfile/:id", roleMiddleware("admin"), updateProfileValidator, ProfileController.updateUserProfile);
// profileRouter.patch("/profile/:id", authMiddleware, updateProfileValidator, ProfileController.updateMyProfiles);
// profileRouter.delete("/userProfile/:id", roleMiddleware("admin"), ProfileController.deleteUserProfile);
// profileRouter.delete("/profile/:id", authMiddleware, ProfileController.deleteMyProfiles);

export default profileRouter;
