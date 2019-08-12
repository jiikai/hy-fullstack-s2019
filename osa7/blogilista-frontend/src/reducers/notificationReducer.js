const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET':
      return action.data;
    default:
      return state;
  }
};

export const setNotification = (notification, timeout = 5000) => (dispatch) => {
  dispatch({type: 'SET', data: {...notification}});
  setTimeout(() => {
    dispatch({type: 'SET', data: null});
  }, timeout);
};

export default reducer;