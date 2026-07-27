import { Router } from "express";
import * as productController from "../controllers/product.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";

const router = Router();

router.get("/", productController.getProducts);
router.get("/:idOrSlug", productController.getProductBySlugOrId);
router.get("/:id/related", productController.getRelatedProducts);

router.post("/", requireAuth, requireAdmin, productController.createProduct);
router.patch("/:id", requireAuth, requireAdmin, productController.updateProduct);
router.patch("/:id/stock", requireAuth, requireAdmin, productController.updateStock);
router.delete("/:id", requireAuth, requireAdmin, productController.deleteProduct);

export default router;
