import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () =>
  axios.get(baseUrl).then(res => res.data);

const create = async newObject => {
  const res = await axios.post(baseUrl, newObject, {
    headers: {Authorization: token}
  });
  return res.data;
};

const update = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject).then(res => res.data);

const remove = id =>
  axios.delete(`${baseUrl}/${id}`, {
    headers: {Authorization: token}
  });

export default {getAll, create, update, remove, setToken};