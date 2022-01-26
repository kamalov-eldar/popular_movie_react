import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import MovieInfo from "./MovieInfo.js";
const API_KEY = "8ccb0f71-adf6-4b8f-9927-980b4f08e9d5";

export const MovieItem = (props) => {
  const [modalInfoMovie, setModalInfoMovie] = useState(false); // показывать инф. о фильме
  const [modalShowPoster, setModalPoster] = useState(false); // показывать постер крупнее
  const [infoMovie, setInfoMovie] = useState([]);

  const genresStr = props.movie.genres.map((itemGenre) => itemGenre.genre).join(" / ");
  const countriesStr = props.movie.countries.map((itemCountry) => itemCountry.country).join(" / ");
  const movie = props.movie;

  async function getInfoMovie() {
    const movieId = movie.filmId;
    const responce = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}`, {
      headers: {
        "Content-Type": "aplication/json",
        "X-API-KEY": API_KEY,
      },
    });

    const infoMovie = await responce.json();
    setInfoMovie(infoMovie);
    setModalInfoMovie(true);
  }

  function clickPoster() {
    setModalPoster(true);
  }

  return (
    <Card>
      <Card.Body>
        <div className="poster">
          <img src={movie.posterUrlPreview} alt="" className="poster-img" onClick={() => clickPoster()} />
        </div>
        <Modal show={modalInfoMovie} size="xl" onHide={() => setModalInfoMovie(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{movie.nameRu}</Modal.Title>
          </Modal.Header>
          <MovieInfo infoMovie={infoMovie}> </MovieInfo>
        </Modal>
        <Modal closeButton show={modalShowPoster} size="xl" onHide={() => setModalPoster(false)}>
          <Modal.Body >
          <Modal.Header closeButton>  </Modal.Header>
             <img src={movie.posterUrlPreview} alt="" className="poster-modal" />{" "}
          </Modal.Body >
        </Modal>
        <div className="movie">
          <div className="movie-head">
            <h2 className="movie-title">{movie.nameRu}</h2>
            <span className="b-rating-icon" title="Рейтинг Кинопоиск">
              <svg
                viewBox="0 0 16 16"
                width="1em"
                height="1em"
                focusable="false"
                role="img"
                aria-label="star fill"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi-star-fill b-icon bi"
              >
                <g>
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </g>
              </svg>
              {movie.rating}
            </span>
          </div>
          <div className="movie-desciption">
            <div className="movie-table">
              <span>
                {movie.nameEn} • {movie.year}
              </span>
              <span>{countriesStr}</span>
              <span>{genresStr}</span>
              <span> </span>
            </div>
            <Button className="movie-about" size="md" variant="outline-primary" onClick={() => getInfoMovie()}>
              Подробнее
            </Button>{" "}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
