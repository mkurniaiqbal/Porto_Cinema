import Mark from "../../assets/Mark.svg";
import Favorite from "../../assets/Favorite.svg";
import { Link } from "react-router-dom";

function Card({ films, headerCard, className }) {
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

  return (
    <div className="bg-contents">
      <div className="container py-3">
        <div className={`row ${className}`}>
          <HeaderCard headerCard={headerCard} />

          {films.length == 0 ? (
            <HandleNoFilm />
          ) : (
            films.map((film) => (
              <FilmCard
                key={film.id}
                film={film}
                onMark={handleMark}
                onFavorite={handleFavorite}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;

function HeaderCard({ headerCard }) {
  return (
    <div className="header-card mt-4">
      <h4>{headerCard}</h4>
    </div>
  );
}

function FilmCard({ film, onMark, onFavorite }) {
  // Extract and safely handle release_date or first_air_date
  const releaseDate = film.release_date || film.first_air_date;
  const releaseYear = releaseDate ? releaseDate.split("-")[0] : "Unknown";

  return (
    <div className="col-6 col-sm-4 col-md-3 col-lg-2 py-2" key={film.id}>
      <div className="card border-0 rounded size-card" data-aos="fade-up">
        <Link
          to={`/detail/${film.id}`}
          state={{ film }}
          className="text-decoration-none"
        >
          <div className="position-relative">
            <img
              src={
                film.poster_path
                  ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                  : `https://i.pinimg.com/736x/5e/e5/b8/5ee5b85fa75816d3f9a1f4e2f138a89c.jpg`
              }
              className="card-img-top size-img-card"
              alt={film.title}
            />
          </div>
          <div className="card-body bg-card rounded-bottom">
            <h5 className="text-header-card text-ellipsis">
              {film.title ? film.title : film.name}
            </h5>
            <p>{releaseYear}</p>
          </div>
        </Link>

        <div className="position-relative">
          <img
            src={Mark}
            alt="Mark Icon"
            className="icon-mark"
            onClick={() => onMark(film)}
          />
          <img
            src={Favorite}
            alt="Favorite Icon"
            className="icon-favorite"
            onClick={() => onFavorite(film)}
          />
        </div>
      </div>
    </div>
  );
}

function HandleNoFilm() {
  return (
    <div className="text-center">
      <h5>No films found ..</h5>
    </div>
  );
}
