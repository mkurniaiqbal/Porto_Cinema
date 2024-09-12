// pathSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const pathSlice = createSlice({
  name: "path",
  initialState: {
    redirectPath: "",
  },
  reducers: {
    setRedirectPath: (state, action) => {
      state.redirectPath = action.payload;
    },
    clearRedirectPath: (state) => {
      state.redirectPath = "";
    },
  },
});

export const { setRedirectPath, clearRedirectPath } = pathSlice.actions;

export default pathSlice.reducer;
