import axios from 'axios';
const baseUrl = '/api/persons';

const create = newObject => 
  axios.post(baseUrl, newObject).then(response => response.data);

const destroy = id =>
  axios.delete(`${baseUrl}/${id}`).then(response => response.data);

const getAll = () => 
  axios.get(baseUrl).then(response => response.data);

const getOne = id =>
  axios.get(`${baseUrl}/${id}`).then(response => response.data);

const update = (id, newObject) => 
  axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data);

export default {
  create,
  destroy,
  getAll, 
  getOne,
  update,
}