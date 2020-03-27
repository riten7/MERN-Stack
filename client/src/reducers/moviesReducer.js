const initialData = [];

const moviesReducer = (state = initialData, action) => {
  switch (action.type) {
    case 'LOAD':
      return [...state, action.payload.list].flat();

    default:
      return state;
  }
}

export default moviesReducer;