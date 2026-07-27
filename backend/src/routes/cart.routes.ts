import { Router } from "express";
import * as cartController from "../controllers/cart.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();
router.use(requireAuth);

router.get("/", cartController.getCart);
router.post("/", cartController.addToCart);
router.patch("/:itemId", cartController.updateCartItem);
router.delete("/:itemId", cartController.removeCartItem);
router.delete("/", cartController.clearCart);

export default router;
