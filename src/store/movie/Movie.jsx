// src/slices/moviesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Mengambil URL dan token dari .env
const apiUrlMovies = import.meta.env.VITE_API_URL_MOVIES;
const apiUrlSearch = import.meta.env.VITE_API_URL_SEARCH;
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
  searchResults: [],
};

// Thunk untuk fetch movies
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get(apiUrlMovies, {
    headers: headersConfig,
    params,
  });
  return response.data.results;
});

// Thunk untuk search movies
export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (query) => {
    const response = await axios.get(apiUrlSearch, {
      headers: headersConfig,
      params: {
        query,
        language: "en-US",
      },
    });
    return {
      results: response.data.results,
      totalResults: response.data.total_results, // Include total_results
    };
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Movies
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
      })
      // Search Movies
      .addCase(searchMovies.pending, (state) => {
        state.loadingMovies = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchResults = action.payload.results;
        state.totalResults = action.payload.totalResults;
        state.loadingMovies = false;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.errorMovies = action.error.message;
        state.loadingMovies = false;
      });
  },
});

export const { clearSearchResults } = moviesSlice.actions;

export default moviesSlice.reducer;
