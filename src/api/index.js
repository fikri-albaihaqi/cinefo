import axios from 'axios';

const url = 'https://api.themoviedb.org/3';
const apiKey = '56daad2a468cbf938113f1e79c8ff61c';

export const getTrending = () => axios.get(`${url}/trending/all/day?api_key=${apiKey}`);

export const getPopularMovies = () => axios.get(`${url}/movie/popular?api_key=${apiKey}`);