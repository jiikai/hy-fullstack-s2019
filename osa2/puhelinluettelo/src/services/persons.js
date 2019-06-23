import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const create = newObject => 
  axios.post(baseUrl, newObject).then(response => response.data);

const destroy = id =>
  axios.delete(`${baseUrl}/${id}`).then(response => response.data);

const getAll = () => 
  axios.get(baseUrl).then(response => response.data.concat({
    id: 10000,
    name: 'Neil NonExisting',
    number: '42',
  }));

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