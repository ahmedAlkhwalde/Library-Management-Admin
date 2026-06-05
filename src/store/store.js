import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/store/authSlice";
import dashboardReducer from "../features/dashboard/store/dashboardSlice";
import borrowReducer from "../features/borrow/store/borrowSlice"
import profileReducer from "../features/profile/store/profileSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    borrow:borrowReducer,
    profile:profileReducer
  },
});
