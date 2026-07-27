import { Router } from "express";
import * as adminController from "../controllers/admin.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";

const router = Router();
router.use(requireAuth, requireAdmin);

router.get("/stats", adminController.getDashboardStats);
router.get("/users", adminController.getAllUsers);

export default router;
