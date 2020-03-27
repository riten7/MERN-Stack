
const searchReducer = (initialFilter = {
  type: 'SHOW_ALL',
  text: ''
}, action) => {
  switch (action.type) {
    case 'FILTER':
      return {
        type: action.type,
        text: action.payload.filterBy
      }
    default:
      return initialFilter;
  }
}

export default searchReducer;