import React from 'react';
import { useSelector } from 'react-redux';
import { PLACEHOLDER_IMG } from '../Constant';
import { Link } from 'react-router-dom';

const MovieListItem = () => {

  const movieList = useSelector((state) => {
    return getFilteredList(state.movieList, state.filterMovieBy);
  });
  return (
    <>
      {movieList && movieList.length > 0 ? movieList.map(item => (
        <div key={item._id} className="row">
          <Link to={{
            pathname: '/detail',
            movieId: item._id
          }}>
            <div className="col-md-3 col-sm-4 col-xs-6">
              <div className="movieCard card">
                <img src={item.poster ? item.poster : PLACEHOLDER_IMG} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5>{item.title}</h5>
                  <p>{item.year}</p>
                  <p>{item.type}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )) : <div>No Movie Found</div>}
    </>
  );
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

export default MovieListItem;