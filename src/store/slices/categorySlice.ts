import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  id: string;
  name: string;
  items: number;
  status: string;
}

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [
    { id: "CAT-001", name: "Electronics", items: 120, status: "Active" },
    { id: "CAT-002", name: "Clothing", items: 350, status: "Active" },
    { id: "CAT-003", name: "Home & Garden", items: 85, status: "Active" },
    { id: "CAT-004", name: "Sports", items: 45, status: "Inactive" },
    { id: "CAT-005", name: "Books", items: 210, status: "Active" },
  ]
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(c => c.id !== action.payload);
    }
  }
});

export const { addCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
