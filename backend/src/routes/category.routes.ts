import { Router } from "express";
import * as categoryController from "../controllers/category.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";

const router = Router();

router.get("/", categoryController.getCategories);
router.get("/:idOrSlug", categoryController.getCategoryBySlugOrId);
router.post("/", requireAuth, requireAdmin, categoryController.createCategory);
router.patch("/:id", requireAuth, requireAdmin, categoryController.updateCategory);
router.delete("/:id", requireAuth, requireAdmin, categoryController.deleteCategory);

export default router;
