import { Router } from "express";
import * as brandController from "../controllers/brand.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";

const router = Router();

router.get("/", brandController.getBrands);
router.get("/:idOrSlug", brandController.getBrandBySlugOrId);
router.post("/", requireAuth, requireAdmin, brandController.createBrand);
router.patch("/:id", requireAuth, requireAdmin, brandController.updateBrand);
router.delete("/:id", requireAuth, requireAdmin, brandController.deleteBrand);

export default router;
