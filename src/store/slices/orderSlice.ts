import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Order {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: string;
  status: string;
  payment: string;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [
    { id: "#ORD-001", customer: "John Doe", date: "2026-03-25", items: 3, total: "$120.00", status: "Completed", payment: "Paid" },
    { id: "#ORD-002", customer: "Jane Smith", date: "2026-03-24", items: 1, total: "$450.50", status: "Processing", payment: "Pending" },
    { id: "#ORD-003", customer: "Robert Brown", date: "2026-03-24", items: 5, total: "$89.99", status: "Pending", payment: "Pending" },
    { id: "#ORD-004", customer: "Emily Davis", date: "2026-03-23", items: 2, total: "$299.00", status: "Completed", payment: "Paid" },
    { id: "#ORD-005", customer: "Michael Wilson", date: "2026-03-23", items: 10, total: "$1,200.00", status: "Cancelled", payment: "Refunded" },
  ]
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    updateOrderStatus: (state, action: PayloadAction<{id: string, status: string}>) => {
      const order = state.orders.find(o => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    }
  }
});

export const { updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
