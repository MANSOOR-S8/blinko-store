import { Router } from "express";
import { body } from "express-validator";
import * as authController from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";

const router = Router();

router.post(
  "/register",
  [body("name").notEmpty(), body("email").isEmail(), body("password").isLength({ min: 6 })],
  validate,
  authController.register,
);
router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  validate,
  authController.login,
);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);

router.get("/me", requireAuth, authController.getMe);
router.patch("/me", requireAuth, authController.updateMe);
router.post(
  "/change-password",
  requireAuth,
  [body("currentPassword").notEmpty(), body("newPassword").isLength({ min: 6 })],
  validate,
  authController.changePassword,
);
router.post("/addresses", requireAuth, authController.addAddress);
router.delete("/addresses/:addressId", requireAuth, authController.deleteAddress);

export default router;
