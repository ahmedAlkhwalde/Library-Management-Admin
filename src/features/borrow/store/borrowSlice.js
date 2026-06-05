import { createSlice } from '@reduxjs/toolkit';

const borrowSlice = createSlice({
  name: 'borrow',
  initialState: {
    status: 'all',      // مشترك
    currentPage: 1,     // مشترك
  },
  reducers: {
    setStatus: (state, action) => { state.status = action.payload; state.currentPage = 1; },
    setCurrentPage: (state, action) => { state.currentPage = action.payload; },
  },
});

export const { setStatus, setCurrentPage } = borrowSlice.actions;
export default borrowSlice.reducer;