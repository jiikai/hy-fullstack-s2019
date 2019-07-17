const reducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.data.trim().toLowerCase();
    default:
      return state;
  }
};

export const changeFilter = str => ({type: 'CHANGE', data: str});

export default reducer;