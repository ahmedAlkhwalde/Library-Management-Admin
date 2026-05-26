import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationsCount: 3,
  notifications: [
    { id: 1, message: "New borrow request from Omar", read: false },
    { id: 2, message: "Clean Code is 5 days overdue", read: false },
    { id: 3, message: "New user registered: Sara Ali", read: false },
  ],
  stats: {
    totalBooks: null,
    availableBooks: null,
    borrowedBooks: null,
    totalUsers: null,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    markAllNotificationsRead: (state) => {
      state.notificationsCount = 0;
      state.notifications = state.notifications.map((n) => ({ ...n, read: true }));
    },
    markNotificationRead: (state, action) => {
      const n = state.notifications.find((n) => n.id === action.payload);
      if (n) n.read = true;
      state.notificationsCount = state.notifications.filter((n) => !n.read).length;
    },
    addNotification: (state, action) => {
      state.notifications.unshift({ ...action.payload, read: false });
      state.notificationsCount += 1;
    },
    setStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
  },
});

export const { markAllNotificationsRead, markNotificationRead, addNotification, setStats } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;