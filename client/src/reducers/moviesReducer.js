const initialData = [];

const moviesReducer = (state = initialData, action) => {
  switch (action.type) {
    case 'LOAD':
      return [...state, action.payload.list].flat();

    case 'ADD':
      return [...state, action.payload.movie].flat();;

    case 'CLEAR':
      return [];

    default:
      return state;
  }
}

export default moviesReducer;