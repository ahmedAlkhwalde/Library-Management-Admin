import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUserStatus: (state, action) => {
      state.status = action.payload;
    },
    setUserError: (state, action) => {
      state.error = action.payload;
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.email === action.payload.email,
      );
      if (index !== -1) {
        state.users[index] = {
          ...state.users[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { setUsers, setUserStatus, setUserError, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
