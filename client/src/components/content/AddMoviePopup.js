import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMovieList, setAddMoviePopupShown } from '../../actions/actionCreators';
import { BASE_URL } from '../Constant';

const AddMoviePopup = () => {
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  const addMovieToDb = useCallback((data) => {
    fetch(BASE_URL + "/movie", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    })
      .then(res => res.json())
      .then(response => {
        dispatch(setAddMoviePopupShown(false));
        dispatch(setMovieList(response));
      })
      .catch(() => console.log('error'));
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let title = event.currentTarget.nameField.value;
    let type = event.currentTarget.typeField.value;
    let year = event.currentTarget.yearField.value;
    let poster = event.currentTarget.posterField.value;
    if (isValid) {
      addMovieToDb(JSON.stringify({ title, type, year, poster }));
    }
  }

  const onHandleChange = (event) => {
    let title = event.currentTarget.nameField.value;
    let type = event.currentTarget.typeField.value;
    let year = event.currentTarget.yearField.value;
    let poster = event.currentTarget.posterField.value;

    if (title.length > 1 && type.length > 1 && year.length > 1 && poster.length > 1) {
      setIsValid(true);
    }
  }

  return (
    <form className="popup" onSubmit={handleSubmit} onChange={onHandleChange}>
      <div className="popup_inner">
        <ul className="list-group">
          <li className="list-group-item"><label>Title: <input type="text" name="nameField"/></label></li>
          <li className="list-group-item"><label>Type: <input type="text" name="typeField"/></label></li>
          <li className="list-group-item"><label>Year: <input type="text" name="yearField"/></label></li>
          <li className="list-group-item"><label>Poster: <input type="text" name="posterField"/></label></li>
        </ul>
        <button type="submit" value="Submit" disabled={!isValid}>Submit</button>
      </div>
    </form>
  )
}

export default AddMoviePopup;