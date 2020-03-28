import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Tag, Rate, Button } from 'antd';
import AddMoviePopup from './AddMoviePopup';
import Utils from '../../utils/GenreUtils';
import { setAddMoviePopupShown, setMovieList } from '../../actions/actionCreators';
import { BASE_URL } from '../Constant';
import { Link } from 'react-router-dom';

const MovieDetail = (props) => {
  const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Thriller' },
    { id: 3, name: 'Drama' }
  ];
  const dispatch = useDispatch();
  const popupShown = useSelector(state => state.popupShown);
  const movie = useSelector(state => state.movieList.flat().filter(item => props.location.movieId && item._id === props.location.movieId));

  const handlEditMovie = useCallback(() => dispatch(setAddMoviePopupShown(true)), [dispatch]);

  const redirectToTarget = () => {
    // return <Link to={{
    //   pathname: '/'
    // }}>
    // </Link>
  }

  const handleDeleteMovie = useCallback(() => {
    fetch(BASE_URL + "/movie/" + movie[0].id, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then((response) => {
        dispatch(setMovieList(response));
        redirectToTarget();
      })
      .catch(() => console.log('error'));
  },[dispatch, movie]);


  return (
    <div className="movieDetail">
      <Row>
        <Col span={8} offset={1}>
          <img alt={movie[0].title} width='85%' src={movie[0].poster} />
        </Col>
        <Col span={12} offset={1}>
          <h1>{movie[0].title}</h1>
          <hr />
          <strong> Type: </strong>
          <p>{movie[0].type}</p>
          <hr />
          <strong> Released On: </strong>
          <p>{movie[0].date}</p>
          <hr />
          <strong> Description: </strong>
          <p>{movie[0].description}</p>
          <hr />
          <div className='genere'>
            <span className='genereTitle'>
              <strong>Generes: </strong>
            </span>
            {genres.map(genere => <Tag color={Utils.randomColor()} key={genere.id}>{genere.name}</Tag>)}
          </div>
          <Rate className='rate' value={parseInt(movie[0].rating)} />
          <hr />
          <div className="actions-movie">
            <Button className="editMovieBtn" onClick={handlEditMovie}>Edit</Button>
            <Button className="deleteMovieBtn" onClick={handleDeleteMovie}>Delete</Button>
            <Button className="sourceMovieBtn">Source</Button>
          </div>
        </Col>
      </Row>
      {popupShown ? <AddMoviePopup movie={movie[0]} /> : null}
    </div>
  )
}

export default MovieDetail;