// Email sending (welcome emails, order confirmations) happens server-side only —
// see backend/src/controllers for where these would be triggered (e.g. after
// order placement in order.controller.ts). This file intentionally has no
// client-callable exports; the frontend should never send emails directly.
export {};
