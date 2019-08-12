import axios from 'axios';

const baseUrl = '/api/blogs';
let token = null;

const create = (newObject, additionalUrl = '') =>
  axios.post(`${baseUrl}/${additionalUrl}`, newObject, {
    headers: {Authorization: token}
  }).then(res => res.data);

const getAll = () =>
  axios.get(baseUrl).then(res => res.data);

const remove = (id) =>
  axios.delete(`${baseUrl}/${id}`, {
    headers: {Authorization: token}
  });

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then(res => res.data);

export default {create, getAll, remove, setToken, update};