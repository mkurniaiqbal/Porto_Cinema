import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movie/Movie";
import tvShowsReducer from "./tv/tv";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    tvShows: tvShowsReducer,
  },
});
