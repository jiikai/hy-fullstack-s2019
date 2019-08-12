import loginService from '../services/login';
import blogService from '../services/blogs';

/*export const initFromLocalStorage = (localStorageKey) => (dispatch) => {
  const localStorageData = window.localStorage.getItem(localStorageKey);
  if (localStorageData) {
    const user = JSON.parse(localStorageData);
    blogService.setToken(user.token);
    return dispatch({
      type: 'LOGIN', data: JSON.parse(localStorageData)
    });
  }
  return dispatch({type: 'LOGOUT', data: null});
};*/

export const login = (username, password) => (dispatch) =>
  loginService.login({username, password}).then(user => {
    blogService.setToken(user.token);
    //window.localStorage.setItem(localStorageKey, JSON.stringify(user));
    return dispatch({type: 'LOGIN', data: user});
  });

export const logout = () => (dispatch) => {
  blogService.setToken(null);
  //if (window.localStorage.getItem(localStorageKey))
  //window.localStorage.removeItem(localStorageKey);
  return dispatch({type: 'LOGOUT', data: null});
};

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export default reducer;