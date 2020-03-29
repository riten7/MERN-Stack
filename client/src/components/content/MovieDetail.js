import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Tag, Rate, Button } from 'antd';
import AddMoviePopup from './AddMoviePopup';
import Utils from '../../utils/GenreUtils';
import { setAddMoviePopupShown } from '../../actions/actionCreators';
import { BASE_URL } from '../Constant';
import { useHistory } from 'react-router-dom';

const MovieDetail = (props) => {
  const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Thriller' },
    { id: 3, name: 'Drama' }
  ];
  const [movieData, setMovieData] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const popupShown = useSelector(state => state.popupShown);
  
  const handlEditMovie = useCallback(() => dispatch(setAddMoviePopupShown(true)), [dispatch]);

  const redirectToTarget = () => {
    return history.push('/');
  }

  useEffect(() => {
      fetch(BASE_URL + "/getMovie/" + props.location.movieId)
        .then(res => res.json())
        .then((response) => {
          setMovieData(response);
        })
        .catch(() => console.log('error'))
  }, [fetch]);

  const handleDeleteMovie = useCallback(() => {
    fetch(BASE_URL + "/movie/" + props.location.movieId, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        redirectToTarget();
      })
      .catch(() => console.log('error'));
  },[dispatch, props]);


  return (
    <div className="movieDetail">
      <Row>
        <Col span={8} offset={1}>
          <img alt={movieData.title} width='85%' src={movieData.poster} />
        </Col>
        <Col span={12} offset={1}>
          <h1>{movieData.title}</h1>
          <hr />
          <strong> Type: </strong>
          <p>{movieData.type}</p>
          <hr />
          <strong> Released On: </strong>
          <p>{movieData.date}</p>
          <hr />
          <strong> Description: </strong>
          <p>{movieData.description}</p>
          <hr />
          <div className='genere'>
            <span className='genereTitle'>
              <strong>Generes: </strong>
            </span>
            {genres.map(genere => <Tag color={Utils.randomColor()} key={genere.id}>{genere.name}</Tag>)}
          </div>
          <Rate className='rate' value={parseInt(movieData.rating)} />
          <hr />
          <div className="actions-movie">
            <Button className="editMovieBtn" onClick={handlEditMovie}>Edit</Button>
            <Button className="deleteMovieBtn" onClick={handleDeleteMovie}>Delete</Button>
            <Button className="sourceMovieBtn">Source</Button>
          </div>
        </Col>
      </Row>
      {popupShown ? <AddMoviePopup movie={movieData} /> : null}
    </div>
  )
}

export default MovieDetail;