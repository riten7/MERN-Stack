import React from 'react';

const DisplayDetail = (props) => {
  const movie = props.item;
  return (
    <>
      <h3>Movie: {movie.title}</h3>
      <ul className="list-group">
        <li className="list-group-item"><h6>Year:</h6> {movie.year}</li>
        <li className="list-group-item"><h6>Rated:</h6> {movie.year}</li>
        <li className="list-group-item"><h6>Released:</h6> {movie.year}</li>
        <li className="list-group-item"><h6>Runtime:</h6> {movie.year}</li>
        <li className="list-group-item"><h6>Genre:</h6> {movie.year}</li>
        <li className="list-group-item"><h6>Director:</h6> {movie.year}</li>
        <li className="list-group-item"><h6>Actors:</h6> {movie.year}</li>
        <li className="list-group-item"><h6>Imdb rating: </h6>{movie.year}</li>
      </ul>
    </>
  )
}

export default DisplayDetail;