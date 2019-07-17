const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET':
      return action.data;
    default:
      return state;
  }
};

export const setNotification = (msg, timeout) => (dispatch) => {
  dispatch({type: 'SET', data: msg});
  setTimeout(() => {
    dispatch({type: 'SET', data: ''});
  }, timeout);
};

export default reducer;