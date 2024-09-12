import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movie/Movie";
import tvShowsReducer from "./tv/tv";
import pathReducer from "./path/Path";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    tvShows: tvShowsReducer,
    path: pathReducer,
  },
});
