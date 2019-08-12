import axios from 'axios';

const baseUrl = '/api/users';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () =>
  axios.get(baseUrl).then(res => res.data);

const create = (newObject) =>
  axios.post(baseUrl, newObject).then(res => res.data);

const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then(res => res.data);

const remove = (id) =>
  axios.delete(`${baseUrl}/${id}`, {
    headers: {Authorization: token}
  });

export default {getAll, create, update, remove, setToken};