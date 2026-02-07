import axios from 'axios';

const client = axios.create({baseURL: 'http://backend:5091'});

export default client;