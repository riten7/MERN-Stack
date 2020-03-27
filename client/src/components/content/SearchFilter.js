import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterText, setAddMoviePopupShown } from '../../actions/actionCreators';
import AddMoviePopup from './AddMoviePopup';

const SearchFilter = () => {
  const dispatch = useDispatch();
  const popupShown = useSelector(state => state.popupShown);

  const handleInputChange = useCallback((e) => {
    dispatch(setFilterText(e.target.value));
  }, [dispatch]);

  const openPopup = useCallback(() => dispatch(setAddMoviePopupShown(true)), [dispatch]);

  return (
    <div className="searchPanel">
      <div className="container">
        <input type="text" className="form-control" placeholder="Type your movie here ..."
          onChange={handleInputChange} /> 
        <button type="button" className="addMovieBtn" onClick={openPopup}>Add Movie</button>
      </div>
      { popupShown ? <AddMoviePopup /> : null }
    </div>
  );
}

export default SearchFilter;