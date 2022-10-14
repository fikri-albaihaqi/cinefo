import axios from 'axios';

const url = 'https://api.themoviedb.org/3';
const apiKey = '';

export const getTrending = () => axios.get(`${url}/trending/all/day?api_key=${apiKey}`);