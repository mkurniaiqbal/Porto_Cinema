import React from "react";
import Mark from "../../assets/Mark.svg";
import Favorite from "../../assets/Favorite.svg";
import { Link } from "react-router-dom";
import "./Card_Slider.css";

function CardSlider({ films, headerCard, className }) {
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
        <HeaderCard headerCard={headerCard} className={className} />

        <div className="slider-container">
          <div className={`slider`}>
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
    </div>
  );
}

export default CardSlider;

function HeaderCard({ headerCard, className }) {
  return (
    <div className={`header-card ${className}`}>
      <h4>{headerCard}</h4>
    </div>
  );
}

function FilmCard({ film, onMark, onFavorite }) {
  const releaseDate = film.release_date || film.first_air_date;
  const releaseYear = releaseDate ? releaseDate.split("-")[0] : "Unknown";
  return (
    <div className="slider-item" key={film.id} data-aos="fade-left">
      <div className="card border-0 rounded size-card">
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
              className="card-img-top"
              alt={film.title}
              style={{ height: "290px", objectFit: "cover" }}
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
