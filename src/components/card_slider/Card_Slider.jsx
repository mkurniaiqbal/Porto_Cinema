import React from "react";
import Mark from "../../assets/Mark.svg";
import Favorite from "../../assets/Favorite.svg";
import { Link } from "react-router-dom";
import "./Card_Slider.css";

function CardSlider({ films, headerCard, className }) {
  return (
    <div className="bg-contents">
      <div className="container py-3">
        <div className={`header-card ${className}`}>
          <h4>{headerCard}</h4>
        </div>

        <div className="slider-container">
          <div className={`slider`}>
            {films.map((film) => (
              <div className="slider-item" key={film.id}>
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
                      />
                    </div>
                    <div className="card-body bg-card rounded-bottom">
                      <h5 className="text-header-card text-ellipsis">
                        {film.title ? film.title : film.name}
                      </h5>
                      <p>
                        {film.release_date
                          ? film.release_date.split("-")[0]
                          : film.first_air_date.split("-")[0]}
                      </p>
                    </div>
                  </Link>

                  <div className="position-relative">
                    <div
                      className="icon-mark"

                      // onClick={() => handleMark(film)}
                    >
                      <i class="bi bi-bookmark fs-5"></i>
                    </div>
                    <div
                      className="icon-favorite"
                      // onClick={() => handleFavorite(film)}
                    >
                      <i class="bi bi-heart fs-5"></i>
                    </div>
                    {/* <img
                      src={Mark}
                      alt="Mark Icon"
                      className="icon-mark"
                      // onClick={() => handleMark(film)}
                    />
                    <img
                      src={Favorite}
                      alt="Favorite Icon"
                      className="icon-favorite"
                    /> */}
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

export default CardSlider;
