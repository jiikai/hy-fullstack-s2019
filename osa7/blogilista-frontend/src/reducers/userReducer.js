import userService from '../services/users';

export const createUser = (username, name, password) => (dispatch) =>
  userService.create({
    username, name, password
  }).then(newUser => dispatch({
    type: 'CREATE_USER', data: newUser
  }));

export const initUsers = () => (dispatch) =>
  userService.getAll().then(users => dispatch({
    type: 'INIT_USER', data: users
  }));

export const removeUser = (id) => (dispatch) =>
  userService.remove(id).then(() => dispatch({
    type: 'REMOVE_USER', data: id
  }));

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return [...state, {...action.data}];
    case 'INIT_USER':
      return action.data;
    case 'REMOVE_USER':
      return state.filter(b => b.id !== action.data);
    default:
      return state;
  }
};

export default reducer;