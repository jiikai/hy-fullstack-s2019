import axios from 'axios';

const baseUrl = '/api/login';

const login = (cred) => axios.post(baseUrl, cred).then(res => res.data);

export default {login};