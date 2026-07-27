import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user.types";

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
}

const initialState: AuthState = {
  user: null,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.status = "authenticated";
    },
    clearUser: (state) => {
      state.user = null;
      state.status = "unauthenticated";
    },
    setAuthLoading: (state) => {
      state.status = "loading";
    },
  },
});

export const { setUser, clearUser, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
