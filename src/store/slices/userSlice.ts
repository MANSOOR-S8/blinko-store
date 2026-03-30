import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [
    { id: "USR-001", name: "John Doe", email: "john@example.com", role: "Customer", status: "Active", joined: "2026-01-15" },
    { id: "USR-002", name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Active", joined: "2025-11-20" },
    { id: "USR-003", name: "Robert Brown", email: "robert@example.com", role: "Customer", status: "Inactive", joined: "2026-02-10" },
    { id: "USR-004", name: "Emily Davis", email: "emily@example.com", role: "Customer", status: "Active", joined: "2026-03-01" },
    { id: "USR-005", name: "Michael Wilson", email: "michael@example.com", role: "Moderator", status: "Active", joined: "2025-10-05" },
  ]
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    }
  }
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
