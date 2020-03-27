const popupReducer = (state = false, action) => {
  switch (action.type) {
    case 'POPUP_SHOWN':
      return action.payload.isPopupShown

    default:
      return state;
  }
}

export default popupReducer;