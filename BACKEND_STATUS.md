# Backend Build — Status & Setup

## Run it

**Backend**
```bash
cd backend
npm install
# edit .env — at minimum set MONGODB_URL if not using local Mongo,
# and generate real values for JWT_ACCESS_SECRET / JWT_REFRESH_SECRET
npm run seed   # creates admin@example.com / Admin@12345, sample products, WELCOME10 coupon
npm run dev    # http://localhost:5000
```

**Frontend**
```bash
npm install
npm run dev    # http://localhost:3000, reads NEXT_PUBLIC_API_URL from .env.local
```

`.env.local` is already set to `http://localhost:5000/api`. CORS on the backend is locked to `CLIENT_URL` (defaults to `http://localhost:3000`) with credentials enabled, since the refresh token travels as an httpOnly cookie.

## What's built

**Backend (`backend/src`) — complete and wired end-to-end:**
- Models: User, Product, Category, Brand, Cart, Wishlist, Review, Coupon, Order
- Auth: register/login/logout, JWT access + refresh (refresh token in httpOnly cookie), change password, address book, admin middleware
- Products: full CRUD, search (text index), filter (category/brand/price/rating/stock/featured/trending/new/bestseller), sort, pagination, related products
- Categories & Brands: full CRUD
- Cart, Wishlist: add/update/remove/clear
- Reviews: one per user per product, auto-recalculates product rating
- Coupons: percentage/fixed, min order amount, max discount cap, usage limits, expiry, validation endpoint
- Orders: placed transactionally from the cart (stock is verified and decremented, coupon usage incremented, cart cleared, all in one Mongo transaction), cancel with restock, admin status updates with history
- Payments: Stripe PaymentIntent creation, verification endpoint, and webhook handler (raw-body signature verification) for `payment_intent.succeeded` / `.payment_failed`. Cash-on-delivery works with no Stripe keys needed.
- Uploads: multer-based single/multiple image upload, served from `/uploads`
- Admin dashboard: totals (users/products/orders/revenue), recent orders, low-stock products, user list
- Security: helmet, CORS locked to your frontend origin, rate limiting, bcrypt hashing, centralized error handling for Mongoose validation/cast/duplicate-key errors

**Frontend infrastructure (`src/services`, `src/types`, `src/hooks`, `src/validators`) — filled in and ready to use:**
- `services/api.client.ts` — axios instance with automatic access-token attach and silent refresh-on-401
- One service file per domain (auth, product, category/brand, cart/wishlist, order/coupon, payment, upload, admin)
- Matching TypeScript types for every API shape
- Hooks: `useAuth`, `useProducts`/`useProduct`, `useCart`, `useWishlist`, plus generic `useDebounce`, `useLocalStorage`, `useMediaQuery`, `useClickOutside`, `usePagination`
- A new `authSlice` was added to the Redux store (there wasn't one) so `useAuth` has somewhere to keep the session

## What's genuinely not done — and why

The frontend UI itself was **not** rewired to call these services. Before touching it, I checked: nothing in `src/app` or `src/components` currently imports `services/`, `types/`, or the custom hooks — the pages you have are built on local component state and hardcoded arrays (e.g. `ProductGallery.tsx` renders a fixed list of image paths, not product records). That's a bigger decision than it sounds: some of these components would need actual redesigning (not just a data swap) to display real product names/prices/ids, which conflicts with "don't touch the UI." I didn't want to guess on that tradeoff for dozens of components without you weighing in per-component.

Also missing outright: there are no login/register pages in `src/app` at all — those need to be built from scratch, not just wired.

**I also could not run or test any of this** — this sandbox has no network access, so no `npm install`, no live MongoDB, no hitting an endpoint to see a real response. Everything above is careful, consistent, and I checked it closely by hand, but "careful by hand" is not the same guarantee as "ran it and it worked." Please treat the first `npm run dev` as the real test.

## Recommended next step

This is the point where **Claude Code** genuinely does better than this chat: it can install dependencies, run the server, hit a real error, and fix it — the loop this environment can't do. I'd suggest opening this project there and asking it to: (1) get `npm run dev` clean on the backend, (2) build the missing login/register pages, (3) wire the shop/product/cart/checkout pages to the real endpoints one at a time, testing after each.
