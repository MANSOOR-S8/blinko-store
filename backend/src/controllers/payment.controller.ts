import { Request, Response } from "express";
import Stripe from "stripe";
import Order from "../models/Order.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { getStripe } from "../config/stripe";
import { env } from "../config/env";

// Creates a Stripe PaymentIntent for an existing (pending) order and returns its client secret.
type AuthRequest = Request & { user?: { id: string; role: string } };
export const createPaymentIntent = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { orderId } = req.body;
  if (!orderId) throw new ApiError(400, "orderId is required.");

  const order = await Order.findById(orderId);
  if (!order) throw new ApiError(404, "Order not found.");
  if (order.user.toString() !== req.user!.id) throw new ApiError(403, "Access denied.");
  if (order.paymentStatus === "paid") throw new ApiError(400, "Order has already been paid.");

  const stripe = getStripe();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.totalPrice * 100), // cents
    currency: "usd",
    metadata: { orderId: order.id },
    automatic_payment_methods: { enabled: true },
  });

  order.stripePaymentIntentId = paymentIntent.id;
  await order.save();

  res.status(200).json({
    success: true,
    data: { clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id },
  });
});

// Confirms payment status directly against Stripe (used as a fallback to the webhook).
export const verifyPayment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { paymentIntentId } = req.body;
  if (!paymentIntentId) throw new ApiError(400, "paymentIntentId is required.");

  const stripe = getStripe();
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  const order = await Order.findOne({ stripePaymentIntentId: paymentIntentId });
  if (!order) throw new ApiError(404, "Order not found for this payment.");

  if (paymentIntent.status === "succeeded") {
    order.paymentStatus = "paid";
    if (order.status === "pending") {
      order.status = "processing";
      order.statusHistory.push({ status: "processing", changedAt: new Date() });
    }
    await order.save();
    return res.status(200).json({ success: true, message: "Payment verified.", data: { order } });
  }

  if (paymentIntent.status === "requires_payment_method" || paymentIntent.status === "canceled") {
    order.paymentStatus = "failed";
    await order.save();
    return res.status(200).json({ success: true, message: "Payment failed.", data: { order } });
  }

  res.status(200).json({ success: true, message: `Payment status: ${paymentIntent.status}`, data: { order } });
});

// Stripe webhook — must receive the raw request body (configured in app.ts).
export const stripeWebhook = asyncHandler(async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"] as string;
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[stripe webhook] signature verification failed:", err);
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      const order = await Order.findOne({ stripePaymentIntentId: pi.id });
      if (order && order.paymentStatus !== "paid") {
        order.paymentStatus = "paid";
        if (order.status === "pending") {
          order.status = "processing";
          order.statusHistory.push({ status: "processing", changedAt: new Date() });
        }
        await order.save();
      }
      break;
    }
    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      const order = await Order.findOne({ stripePaymentIntentId: pi.id });
      if (order) {
        order.paymentStatus = "failed";
        await order.save();
      }
      break;
    }
    default:
      break;
  }

  res.status(200).json({ received: true });
});
