import axios from 'axios';

const baseUrl = 'https://restcountries.eu/rest/v2';

const getAll = () => 
  axios.get(`${baseUrl}/all`).then(response => response.data);

export default {getAll};