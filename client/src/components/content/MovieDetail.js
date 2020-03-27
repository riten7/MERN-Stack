import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DisplayDetail from './DisplayDetail';
import EditDetail from './EditDetail';

const MovieDetail = (props) => {
  const[isEditMode, setEditMode] = useState(false);
  const movie = useSelector(state => state.movieList.flat().filter(item => props.location.movieId && item._id === props.location.movieId));
  return (
    <div className="movie-detail-panel">
      <div className="container movie-detail-wrapper">
        <div className="row movie-detail">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <img src={movie[0].poster} alt='poster' />
              </div>
              <div className="actions">
                <button type="button" onClick={() => setEditMode(true)}>{isEditMode ? 'Send' : 'Edit'}</button>
                <button type="button">Delete</button>
              </div>
            </div>
          </div>
          <div className="col">
            {isEditMode ? <EditDetail item = {movie[0]}/> : <DisplayDetail item = {movie[0]}/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail;