import axios from 'axios';

const url = 'https://api.themoviedb.org/3';
const apiKey = '56daad2a468cbf938113f1e79c8ff61c';

export const getTrending = () => axios.get(`${url}/trending/all/day?api_key=${apiKey}`);

export const getPopularMovies = () => axios.get(`${url}/movie/popular?api_key=${apiKey}`);

export const getPopularTVShows = () => axios.get(`${url}/tv/popular?api_key=${apiKey}`);

export const getUpcomingMovies = () => axios.get(`${url}/movie/upcoming?api_key=${apiKey}`);

export const getMovieDetail = (id) => axios.get(`${url}/movie/${id}?api_key=${apiKey}`);

export const getMovieCredits = (id) => axios.get(`${url}/movie/${id}/credits?api_key=${apiKey}`);

export const getMovieImages = (id) => axios.get(`${url}/movie/${id}/images?api_key=${apiKey}`);

export const getTvDetail = (id) => axios.get(`${url}/tv/${id}?api_key=${apiKey}`);

export const getTvCredits = (id) => axios.get(`${url}/tv/${id}/credits?api_key=${apiKey}`);

export const getTvImages = (id) => axios.get(`${url}/tv/${id}/images?api_key=${apiKey}`);