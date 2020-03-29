import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setMovieList, clearMovieList } from '../../actions/actionCreators';
import SearchFilter from './SearchFilter';
import { BASE_URL } from '../Constant';
import MovieListItem from './MovieListItem';
import { Row, Spin } from 'antd';

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
    return function cleanup() {
      dispatch(clearMovieList());
    };
  }, [fetchData]);

  return (
    <div className="movie-container">
      <Row className="movieSearch">
        <SearchFilter />
      </Row>
      {!isLoading && !error ?
        <Row className="movieList">
          <MovieListItem />
        </Row>
        : <Spin size="large"/>
      }
    </div>
  )
}

export default MovieList;