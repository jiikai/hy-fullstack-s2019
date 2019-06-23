import axios from 'axios';
const baseUrl = 'https://api.apixu.com/v1/current.json';
const apixuKey = 'acc493882fad439a834112307192306'

const getCurrentWeather = (query) =>
  axios.get(`${baseUrl}?key=${apixuKey}&q=${query}`)
    .then(response => response.data);

export default {getCurrentWeather};