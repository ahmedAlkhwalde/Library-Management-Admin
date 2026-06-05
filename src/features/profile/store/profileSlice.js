import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: { name: "Ahmad Ali", email: "admin@greenteam.edu", phone: "+1 234 567 890" },
  },
  reducers: {
    setProfile: (state, action) => {
      state.user = action.payload;
    }
  }
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;