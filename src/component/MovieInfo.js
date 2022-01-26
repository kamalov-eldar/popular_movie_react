import React, { useState } from "react";

const MovieInfo = (props) => {
  const [imdbUrl, handleFetchIMDBId] = useState(""); // показывать постер крупнее

  const movie = props.infoMovie;
  console.log("movie: ", movie);
  const genresStr = props.infoMovie.genres.map((itemGenre) => itemGenre.genre).join(" / ");
  const countriesStr = props.infoMovie.countries.map((itemCountry) => itemCountry.country).join(" / ");

  const clickImdbLink = () => {
    console.log("movie.imdbId ", movie.imdbId);
    movie.imdbId === null ?  movie.imdbId = null : handleFetchIMDBId(`https://www.imdb.com/title/${movie.imdbId}`);
  };

  return (
    <div className="modal-container">
      <img src={movie.posterUrlPreview} alt="" className="modal-poster" />
      <div className="modal-movie">
        <div className="modal-movie-table">
          <span>Оригинальное название </span>
          <span>{movie.nameRu}</span>
          <span>Год </span>
          <span> {movie.year} </span>
          <span>Страна </span>
          <span>{countriesStr}</span>
          <span>Время </span>
          <span>{movie.filmLength} мин</span>
          <span>Жанр </span>
          <span>{genresStr}</span>
        </div>
        <div className="rating-container">
          <span className="rating-imdb">
            {movie.imdbId !== null ? (
              <a href={imdbUrl} target="_blank" onClick={() => clickImdbLink()}>
                <img className="rating-imdb-pic" src="img/imdb.png" alt="" />
              </a>
            ) : (
              <img className="rating-imdb-pic" src="img/imdb.png" alt="" />
            )}
            <span className="rating-number" title="Рейтинг IMDB">
              {" "}
              {movie.ratingImdb}{" "}
            </span>
            <span className="rating-count" title="Количество голосов">
              {" "}
              {movie.ratingImdbVoteCount}
            </span>
          </span>
          <span className="rating-kinopoisk">
            <a href={movie.webUrl} target="_blank">
              <img className="rating-kinopoisk-pic" src="img/kinopoisk.png" alt="" />
            </a>
            <span className="rating-number" title="Рейтинг Кинопоиск">
              {movie.ratingKinopoisk}{" "}
            </span>
            <span className="rating-count" title="Количество голосов">
              {" "}
              {movie.ratingKinopoiskVoteCount}{" "}
            </span>
          </span>

          <span className="rating-age" title="Ограничение по возрасту">
            {movie.ratingAgeLimits ? movie.ratingAgeLimits.slice(3) + "+" : "-"}
          </span>
        </div>
        <p className="modal-movie-description">{movie.description}</p>
      </div>
    </div>
  );
};

export default MovieInfo;
