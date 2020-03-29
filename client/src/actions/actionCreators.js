export const setMovieList = (list) => ({
	type: 'LOAD',
	payload: {
		list
	}
});

export const clearMovieList = () => ({
  type: 'CLEAR'
})

export const setFilterText = (filterBy) => ({
  type: 'FILTER',
  payload: {
    filterBy
  }
});

export const setAddMoviePopupShown = (value) => ({
  type: 'POPUP_SHOWN',
  payload: {
    isPopupShown: value
  }
});