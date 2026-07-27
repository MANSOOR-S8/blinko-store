import { Router } from "express";
import * as uploadController from "../controllers/upload.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import { upload } from "../middleware/upload.middleware";

const router = Router();

router.post("/single", requireAuth, requireAdmin, upload.single("image"), uploadController.uploadSingle);
router.post(
  "/multiple",
  requireAuth,
  requireAdmin,
  upload.array("images", 10),
  uploadController.uploadMultiple,
);

export default router;
