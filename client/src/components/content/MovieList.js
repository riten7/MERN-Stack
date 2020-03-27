import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setMovieList } from '../../actions/actionCreators';
import SearchFilter from './SearchFilter';
import { BASE_URL } from '../Constant';
import MovieListItem from './MovieListItem';

const MovieList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const fetchData = useCallback(() => {
    fetch(BASE_URL + "/getMovies")
      .then(res => res.json())
      .then(response => {
        dispatch(setMovieList(response));
        setIsLoading(false);
      })
      .catch(() => setError(true))
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [fetchData]);

  return (
    <div className="movie-container">
      <div className="container">
        <SearchFilter />
        {!isLoading && !error &&
         <MovieListItem />
        }
      </div>
    </div>
  )
}

export default MovieList;