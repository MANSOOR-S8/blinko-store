// placeholder for src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";
import categoryReducer from "./slices/categorySlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    users: userReducer,
    orders: orderReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
