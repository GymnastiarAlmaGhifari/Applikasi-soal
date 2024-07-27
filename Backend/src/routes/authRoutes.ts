import { Router } from "express";
import { register, login, logout, getUserInfo } from "../controllers/authController";
import { accessValidation } from "../middleware/authMiddleware";

const router = Router();

// router.get("/google", googleAuth);
// router.get("/google/callback", googleCallback);
router.post("/register", register);
router.post("/login", login);
router.get("/me", getUserInfo);
router.get("/info", getUserInfo);
router.post("/logout", accessValidation, logout);

export default router;
