import { combineReducers } from 'redux';
import movieList from './moviesReducer';
import filterMovieBy from './searchFilterReducer';
import popupShown from './popupReducer';

export default combineReducers({
	movieList,
  filterMovieBy,
  popupShown
});