import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../store/movie/Movie.jsx";
import { fetchTvShows } from "../../store/tv/tv.jsx";
import Mark from "../../assets/Mark.svg";
import Favorite from "../../assets/Favorite.svg";
import Navbar from "../../components/navbar/Navbar";
import CardSlider from "../../components/card_slider/Card_Slider";

function Detail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { film } = location.state || {}; // Ambil data film dari state link to

  const { id } = useParams();
  const { movies, errorMovies, loadingMovies } = useSelector(
    (state) => state.movies
  );
  const { tvShows, loadingTvShows, errorTvShows } = useSelector(
    (state) => state.tvShows
  );

  function handleMark(param) {
    const existingMark = JSON.parse(localStorage.getItem("WatchList")) || [];

    const isFilmExists = existingMark.some((film) => film.id === param.id);

    if (!isFilmExists) {
      existingMark.push(param);
      localStorage.setItem("WatchList", JSON.stringify(existingMark));
    }
  }

  function handleFavorite(param) {
    const existingFavorite =
      JSON.parse(localStorage.getItem("FavoriteList")) || [];

    const isFilmExists = existingFavorite.some((film) => film.id === param.id);

    if (!isFilmExists) {
      existingFavorite.push(param);
      localStorage.setItem("FavoriteList", JSON.stringify(existingFavorite));
    }
  }

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchTvShows());
  }, [dispatch]);

  if (!film) {
    return <p>No film data available</p>;
  }

  if (loadingTvShows || loadingMovies) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="spinner-border text-info"
          style={{ width: "5rem", height: "5rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (errorMovies)
    return <div>Error loading movies: {errorMovies.message}</div>;
  if (errorTvShows)
    return <div>Error loading TV shows: {errorTvShows.message}</div>;

  return (
    <>
      <Navbar />
      <div className="position-relative">
        <img
          src={`https://image.tmdb.org/t/p/w780${film.backdrop_path}`}
          alt="Backdrop"
          className="w-100"
          style={{ height: "400px", objectFit: "cover" }}
        />

        <div className="container">
          <div
            className="d-flex align-items-start"
            style={{ marginTop: "-350px" }}
          >
            <img
              src={
                film.poster_path
                  ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                  : `https://i.pinimg.com/736x/5e/e5/b8/5ee5b85fa75816d3f9a1f4e2f138a89c.jpg`
              }
              alt="Poster"
              style={{
                height: "300px",
                borderRadius: "8px",
                marginRight: "20px", // Space between poster and text
              }}
            />

            <div className="mt-3">
              <h1 className="text-white text-title">
                {film.original_title ? film.original_title : film.original_name}{" "}
                (
                {film.release_date
                  ? film.release_date.split("-")[0]
                  : film.first_air_date.split("-")[0]}
                )
              </h1>
              <p className="text-section-description">
                {film.release_date ? film.release_date : film.first_air_date} |{" "}
                {film.media_type}
              </p>
              <div className="d-flex gap-2">
                <div
                  className="bg-white rounded-circle"
                  style={{ width: "30px", height: "30px" }}
                >
                  <p
                    className=" text-primary"
                    style={{
                      fontSize: "11px",
                      marginTop: "7px",
                      marginLeft: "7px",
                      textShadow: "1px 1px 2px grey",
                    }}
                  >
                    {film.vote_average.toFixed(1)}
                  </p>
                </div>
                <img
                  src={Mark}
                  alt="Mark"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleMark(film)}
                />
                <img
                  src={Favorite}
                  alt="Fav"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleFavorite(film)}
                />
              </div>
              <p className="text-section-description mt-3 fst-italic ">
                {film.title ? film.title : film.name}
              </p>
              <p className="text-overview" style={{ lineHeight: "0.3" }}>
                Overview
              </p>
              <p
                className="text-section-description text-desc fs-md-6 fs-lg-3"
                style={{ lineHeight: "1.2" }}
              >
                {film.overview}
              </p>
              {/* Add more text or details as needed */}
            </div>
          </div>
        </div>
      </div>

      <CardSlider
        films={tvShows}
        headerCard={"Recommendations TV Shows"}
        className="mt-5 pt-5"
      />
      <CardSlider
        films={movies}
        headerCard={"Recommendations Movies"}
        className={"mt-3"}
      />
    </>
  );
}

export default Detail;
