import { Router } from "express";
import * as paymentController from "../controllers/payment.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/create-intent", requireAuth, paymentController.createPaymentIntent);
router.post("/verify", requireAuth, paymentController.verifyPayment);

export default router;
