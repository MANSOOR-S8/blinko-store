import { Router } from "express";
import * as orderController from "../controllers/order.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";

const router = Router();
router.use(requireAuth);

router.post("/", orderController.placeOrder);
router.get("/my-orders", orderController.getMyOrders);
router.get("/:id", orderController.getOrderById);
router.post("/:id/cancel", orderController.cancelOrder);

router.get("/", requireAdmin, orderController.getAllOrders);
router.patch("/:id/status", requireAdmin, orderController.updateOrderStatus);

export default router;
