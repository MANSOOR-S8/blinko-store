import { Router } from "express";
import * as reviewController from "../controllers/review.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router({ mergeParams: true });

router.get("/", reviewController.getProductReviews);
router.post("/", requireAuth, reviewController.createReview);
router.patch("/:reviewId", requireAuth, reviewController.updateReview);
router.delete("/:reviewId", requireAuth, reviewController.deleteReview);

export default router;
