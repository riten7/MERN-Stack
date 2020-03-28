import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterText, setAddMoviePopupShown } from '../../actions/actionCreators';
import AddMoviePopup from './AddMoviePopup';
import { Col, Input, Button } from 'antd';

const SearchFilter = () => {
  const dispatch = useDispatch();
  const popupShown = useSelector(state => state.popupShown);

  const handleInputChange = useCallback((e) => {
    dispatch(setFilterText(e.target.value));
  }, [dispatch]);

  const openPopup = useCallback(() => dispatch(setAddMoviePopupShown(true)), [dispatch]);

  return (
    <>
      <Col span={14} offset={3}>
        <Input className="searchInput" type="text" placeholder="Search your movie here..."
          onChange={handleInputChange} />
      </Col>
      <Col span={6} offset={1}>
        <Button className="addMovieBtn" type="primary" onClick={openPopup}>Add Movie</Button>
      </Col>
      {popupShown ? <AddMoviePopup /> : null}
    </>
  );
}

export default SearchFilter;