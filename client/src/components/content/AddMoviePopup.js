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
        <label>Title: <input type="text" name="nameField" /></label>
        <label>Type: <input type="text" name="typeField" /></label>
        <label>Year: <input type="text" name="yearField"/></label>
        <label>Poster: <input type="text" name="posterField" /></label>
        <button type="submit" value="Submit" disabled={!isValid}>Submit</button>
      </div>
    </form>
  )
}

export default AddMoviePopup;