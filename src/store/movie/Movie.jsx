// src/slices/moviesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Mengambil URL dari variabel lingkungan
const apiUrlMovies = import.meta.env.VITE_API_URL_MOVIES;
const token = import.meta.env.VITE_TOKEN;

const headersConfig = {
  Authorization: `Bearer ${token}`,
};

const params = {
  page: 1,
  language: "en-US",
};

const initialState = {
  movies: [],
  loadingMovies: true,
  errorMovies: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get(apiUrlMovies, {
    headers: headersConfig,
    params,
  });
  return response.data.results;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loadingMovies = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loadingMovies = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.errorMovies = action.error.message;
        state.loadingMovies = false;
      });
  },
});

export default moviesSlice.reducer;
