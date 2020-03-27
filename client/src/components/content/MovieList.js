import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMovieList } from '../../actions/actionCreators';
import SearchFilter from './SearchFilter';
import { BASE_URL, PLACEHOLDER_IMG } from '../Constant';

const MovieList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const movieList = useSelector((state) => {
    return getFilteredList(state.movieList, state.filterMovieBy);
  });

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
          <div className="row">
            {movieList && movieList.length > 0 ? movieList.map(item => (
              <div key={item._id} className="col-md-3 col-sm-4 col-xs-6">
                <div className="movieCard card">
                  <img src={item.poster ? item.poster : PLACEHOLDER_IMG} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5>{item.title}</h5>
                    <p>{item.year}</p>
                    <p>{item.type}</p>
                  </div>
                </div>
              </div>
            )) :  <div>No Movie Found</div>}
          </div>
        }
      </div>
    </div>
  )
}

const getFilteredList = (list, filterObj) => {
    switch (filterObj.type) {
      case 'SHOW_ALL':
        return list;
      case 'FILTER':
        return list.flat().filter(item => {
          let title = item.title.toLowerCase();
          return title.indexOf(filterObj.text.toLowerCase()) > -1;
        });
      default:
        return;
    }
  }

export default MovieList;