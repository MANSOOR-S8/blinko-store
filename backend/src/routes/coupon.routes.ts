import { Router } from "express";
import * as couponController from "../controllers/coupon.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";

const router = Router();

router.post("/validate", requireAuth, couponController.validateCoupon);

router.get("/", requireAuth, requireAdmin, couponController.getCoupons);
router.post("/", requireAuth, requireAdmin, couponController.createCoupon);
router.patch("/:id", requireAuth, requireAdmin, couponController.updateCoupon);
router.delete("/:id", requireAuth, requireAdmin, couponController.deleteCoupon);

export default router;
