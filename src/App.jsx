import { useState, useEffect } from "react";
import axios from "axios";
import Mark from "./assets/Mark.svg";
import Favorite from "./assets/Favorite.svg";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [loadingTvShows, setLoadingTvShows] = useState(true);
  const [errorMovies, setErrorMovies] = useState(null);
  const [errorTvShows, setErrorTvShows] = useState(null);

  const apiKey = "853d07cb69a23b1aa30a0153245a34cb"; // Not required for v4 API requests
  const accountId = "66df132d6b244965206d525b"; // Replace with your actual account ID
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NTNkMDdjYjY5YTIzYjFhYTMwYTAxNTMyNDVhMzRjYiIsIm5iZiI6MTcyNTg5OTI2MS43MTI0OTksInN1YiI6IjY2ZGYxMzJkNmIyNDQ5NjUyMDZkNTI1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-8-I6Ld6dzOmTnIsWMJmdGNtqILw5L25NhpfeMSsxqI"; // Replace with your actual Bearer token

  const apiUrlMovies = `https://api.themoviedb.org/4/account/${accountId}/movie/recommendations`;
  const apiUrlTvShows = `https://api.themoviedb.org/4/account/${accountId}/tv/recommendations`;

  const headersConfig = {
    Authorization: `Bearer ${token}`,
  };

  const params = {
    page: 1,
    language: "en-US",
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(apiUrlMovies, {
          headers: headersConfig,
          params,
        });
        setMovies(response.data.results);
        setLoadingMovies(false);
      } catch (error) {
        setErrorMovies(error);
        setLoadingMovies(false);
      }
    };

    const fetchTvShows = async () => {
      try {
        const response = await axios.get(apiUrlTvShows, {
          headers: headersConfig,
          params,
        });
        setTvShows(response.data.results);
        setLoadingTvShows(false);
      } catch (error) {
        setErrorTvShows(error);
        setLoadingTvShows(false);
      }
    };

    fetchMovies();
    fetchTvShows();
  }, []);

  if (loadingMovies || loadingTvShows) return <div>Loading...</div>;
  if (errorMovies)
    return <div>Error loading movies: {errorMovies.message}</div>;
  if (errorTvShows)
    return <div>Error loading TV shows: {errorTvShows.message}</div>;

  return (
    <div className="container-fluid p-0">
      <div className="bg-info">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <h1
              className="text-uppercase text-white pt-2"
              style={{ letterSpacing: 10 }}
            >
              Cinema
            </h1>
          </div>
          <div className="d-flex justify-content-between align-items-center text-capitalize pt-3">
            <div className="me-3">
              <p>Favorite</p>
            </div>
            <div>
              <p>Watchlist</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-contents">
        <div className="container py-3">
          <div className="row">
            <div className="header-card mt-4">
              <h4>Movies</h4>
            </div>
            {movies.map((movie) => (
              <div
                className="col-6 col-sm-4 col-md-3 col-lg-2 py-2"
                key={movie.id}
              >
                <div className="card border-0 rounded size-card">
                  <div className="position-relative">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      className="card-img-top size-img-card poster"
                      alt={movie.title}
                    />
                    <img
                      src={Mark}
                      alt="Mark Icon"
                      className="position-absolute bottom-0 end-0 icon-mark" // Right bottom corner with margin
                    />
                    <img
                      src={Favorite}
                      alt="Favorite Icon"
                      className="position-absolute bottom-0 end-0 icon-favorite" // Center horizontally with margin
                    />
                  </div>
                  <div className="card-body bg-card rounded-bottom">
                    <h5 className="text-header-card text-ellipsis">
                      {movie.title}
                    </h5>
                    <p>{movie.release_date.split("-")[0]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row mt-4">
            <div className="header-card mt-4">
              <h4>TV Shows</h4>
            </div>
            {tvShows.map((tvShow) => (
              <div
                className="col-6 col-sm-4 col-md-3 col-lg-2 py-2"
                key={tvShow.id}
              >
                <div className="card border-0 rounded size-card">
                  <div className="position-relative">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                      className="card-img-top size-img-card poster"
                      alt={tvShow.name}
                    />
                    <img
                      src={Mark}
                      alt="Mark Icon"
                      className="position-absolute bottom-0 end-0 icon-mark" // Right bottom corner with margin
                    />
                    <img
                      src={Favorite}
                      alt="Favorite Icon"
                      className="position-absolute bottom-0 end-0 icon-favorite" // Center horizontally with margin
                    />
                  </div>
                  <div className="card-body bg-card rounded-bottom">
                    <h5 className="text-header-card text-ellipsis">
                      {tvShow.name}
                    </h5>
                    <p>{tvShow.first_air_date.split("-")[0]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
