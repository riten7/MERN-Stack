import React from 'react';
import { useSelector } from 'react-redux';

const MovieDetail = (props) => {
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
                <button type="button">Edit</button>
                <button type="button">Delete</button>
              </div>
            </div>
          </div>
          <div className="col">
            <h3>Movie: {movie[0].Title}</h3>
            <ul className="list-group">
              <li className="list-group-item"><h6>Year:</h6> {movie[0].year}</li>
              <li className="list-group-item"><h6>Rated:</h6> {movie[0].year}</li>
              <li className="list-group-item"><h6>Released:</h6> {movie[0].year}</li>
              <li className="list-group-item"><h6>Runtime:</h6> {movie[0].year}</li>
              <li className="list-group-item"><h6>Genre:</h6> {movie[0].year}</li>
              <li className="list-group-item"><h6>Director:</h6> {movie[0].year}</li>
              <li className="list-group-item"><h6>Actors:</h6> {movie[0].year}</li>
              <li className="list-group-item"><h6>Imdb rating: </h6>{movie[0].year}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail;