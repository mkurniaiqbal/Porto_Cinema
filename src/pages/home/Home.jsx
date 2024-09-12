// src/components/Home.js
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMovies } from "../../store/movie/Movie.jsx";
import { fetchTvShows } from "../../store/tv/tv.jsx";
import Card from "../../components/card/Card.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import CardSlider from "../../components/card_slider/Card_Slider.jsx";

function Home() {
  const dispatch = useDispatch();
  const { movies, errorMovies, loadingMovies } = useSelector(
    (state) => state.movies
  );
  const { tvShows, loadingTvShows, errorTvShows } = useSelector(
    (state) => state.tvShows
  );

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchTvShows());
  }, [dispatch]);

  if (loadingMovies || loadingTvShows) {
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

  if (errorMovies) return <div>Error loading movies: {errorMovies}</div>;
  if (errorTvShows) return <div>Error loading TV shows: {errorTvShows}</div>;

  return (
    <div className="container-fluid p-0">
      <section>
        <Navbar />
      </section>

      <section>
        <CardSlider
          films={tvShows}
          className={"mt-4"}
          headerCard={"TV Shows"}
        />
        <Card films={movies} headerCard={"Movies"} />
        <Card films={tvShows} className={"mt-4"} headerCard={"TV Shows"} />
      </section>
    </div>
  );
}

export default Home;
