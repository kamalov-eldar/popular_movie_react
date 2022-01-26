import React, { useState, useEffect } from "react";
import { MovieItem } from "./MovieItem.js";
import ReactUltimatePagination from "react-ultimate-pagination-bootstrap-4";
import axios from "axios";

const API_KEY = "8ccb0f71-adf6-4b8f-9927-980b4f08e9d5";

export const Movies = () => {
  const [films, setFilms] = useState([]); // состояние с фильмами
  const [pagesCount, setPagesCount] = useState(1); // состояние страницы
  const [active, getNumberPressedPages] = useState(1); // состояние

  //useEffect будет следить за изменением handleFetchData и производить ререндер если это необходимо
  useEffect(() => {
    handleFetchData();
  }, []);

  /* useEffect(() => {
    handleFetchData();
  }, [setFilms]); */

  /**************************************/

  /* const handleFetchData = (pageNumber = 1) => {
    fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${pageNumber}`,
    {
      headers: {
        "Content-Type": "aplication/json",
        "X-API-KEY": API_KEY,
      },
    })
      .then((responce) => responce.json())
      .then((data) => {
        //console.log("data.films", data);
        setPagesCount(data.pagesCount);
        setFilms(data.films);
      });
  }; */

  /*
  useEffect(() => {
    const apiUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    axios.get(apiUrl).then((resp) => {
      const allPersons = resp.data;
      setAppState(allPersons);
    });
  }, [setAppState]);

  */

  const handleFetchData = (pageNumber = 1) => {
    const apiUrl = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${pageNumber}`;
    // https://kinopoiskapiunofficial.tech/api/v2.2/films/301'
    axios
      .get(apiUrl, {
        headers: {
          "Content-Type": "aplication/json",
          "X-API-KEY": API_KEY,
        },
      })
      .then((resp) => {
        const movies = resp.data;
        setPagesCount(movies.pagesCount);
        setFilms(movies.films);
      });
  };


  function handlePageChange(pageNumber) {
    handleFetchData(pageNumber);
    getNumberPressedPages(pageNumber);
    // скролл наверх страницы
    const container = document.querySelector(".movie-container");
    window.scrollTo(0, container.scrollTop);
  }
  return (
    <div className="movie-container">
      <h1>Популярные фильмы и сериалы</h1>

      <ReactUltimatePagination totalPages={pagesCount} currentPage={active} onChange={handlePageChange} />

      <ul className="movie-list">
        {films.map((movie) => (
          <li key={movie.filmId}>
            <MovieItem movie={movie} /* onClick={clickPoster} */></MovieItem>
          </li>
        ))}
      </ul>

      <ReactUltimatePagination totalPages={pagesCount} currentPage={active} onChange={handlePageChange} />
    </div>
  );
};
