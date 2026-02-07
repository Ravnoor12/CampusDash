import axios from 'axios';

const client = axios.create({baseURL: 'http://10.16.246.191:5091'});

export default client;