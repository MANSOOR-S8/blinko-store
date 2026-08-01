// placeholder for src/store/slices/uiSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Fahad changes
// Product Types
// export interface Product {
//   id: number;
//   img: string;
//   title: string;
//   description: string;
//   price: number;
//   discount: number;
// }

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
}

// State Types
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  singleProduct: Product | null;
}

// Initial State
const initialState: ProductState = {
  products: [
    { id: 1, title: "Premium Wireless Headphones", description: "High quality wireless headphones.", price: 299.00, discount: 0, img: "/images/products/product-1.png" },
    { id: 2, title: "Minimalist Cotton T-Shirt", description: "100% Cotton soft t-shirt.", price: 25.00, discount: 0, img: "/images/products/product-2.png" },
  ],
  loading: false,
  error: null,
  singleProduct: null,
};

// API Base URL
// const API_URL = "http://localhost:5000";

// API ERROR FAHAD SOLVE
const API_URL = "http://localhost:5000/api";

// Async Thunk for fetching all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      // console lagya 
         console.log("API Response:", response.data);

      // return response.data;
      // FAHAD changes
      return response.data.data.products;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || axiosError.message);
    }
  },
);

//  Async Thunk for fetching single product
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || axiosError.message);
    }
  },
);

// Create Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSingleProduct: (state) => {
      state.singleProduct = null;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<string | number>) => {
      state.products = state.products.filter(p => String(p.id) !== String(action.payload));
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const idx = state.products.findIndex(p => String(p.id) === String(action.payload.id));
      if (idx !== -1) {
        state.products[idx] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch All Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Single Product
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.singleProduct = action.payload;
        },
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSingleProduct, addProduct, deleteProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
