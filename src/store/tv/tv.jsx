// src/slices/tvShowsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Mengambil URL dari variabel lingkungan
const apiUrlTvShows = import.meta.env.VITE_API_URL_TV_SHOWS;
const token = import.meta.env.VITE_TOKEN;

const headersConfig = {
  Authorization: `Bearer ${token}`,
};

const params = {
  page: 1,
  language: "en-US",
};

const initialState = {
  tvShows: [],
  loadingTvShows: true,
  errorTvShows: null,
};

export const fetchTvShows = createAsyncThunk(
  "tvShows/fetchTvShows",
  async () => {
    const response = await axios.get(apiUrlTvShows, {
      headers: headersConfig,
      params,
    });
    return response.data.results;
  }
);

const tvShowsSlice = createSlice({
  name: "tvShows",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTvShows.pending, (state) => {
        state.loadingTvShows = true;
      })
      .addCase(fetchTvShows.fulfilled, (state, action) => {
        state.tvShows = action.payload;
        state.loadingTvShows = false;
      })
      .addCase(fetchTvShows.rejected, (state, action) => {
        state.errorTvShows = action.error.message;
        state.loadingTvShows = false;
      });
  },
});

export default tvShowsSlice.reducer;
