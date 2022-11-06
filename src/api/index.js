import axios from 'axios';

const url = 'https://api.themoviedb.org/3';
const apiKey = '56daad2a468cbf938113f1e79c8ff61c';

export const getTrending = () => axios.get(`${url}/trending/all/day?api_key=${apiKey}`);

// Movies
export const getPopularMovies = (page = 1) => axios.get(`${url}/movie/popular?api_key=${apiKey}&page=${page}`);

export const getTopRatedMovies = (page = 1) => axios.get(`${url}/movie/top_rated?api_key=${apiKey}&page=${page}`);

export const getUpcomingMovies = (page = 1) => axios.get(`${url}/movie/upcoming?api_key=${apiKey}&page=${page}`);

export const getMovieDetail = (id) => axios.get(`${url}/movie/${id}?api_key=${apiKey}`);

export const getMovieCredits = (id) => axios.get(`${url}/movie/${id}/credits?api_key=${apiKey}`);

export const getMovieImages = (id) => axios.get(`${url}/movie/${id}/images?api_key=${apiKey}`);

export const getMovieVideos = (id) => axios.get(`${url}/movie/${id}/videos?api_key=${apiKey}`);

// TV Shows
export const getPopularTvShows = (page = 1) => axios.get(`${url}/tv/popular?api_key=${apiKey}&page=${page}`);

export const getTopRatedTvShows = (page = 1) => axios.get(`${url}/tv/top_rated?api_key=${apiKey}&page=${page}`);

export const getTvDetail = (id) => axios.get(`${url}/tv/${id}?api_key=${apiKey}`);

export const getTvCredits = (id) => axios.get(`${url}/tv/${id}/credits?api_key=${apiKey}`);

export const getTvImages = (id) => axios.get(`${url}/tv/${id}/images?api_key=${apiKey}`);

export const getTvVideos = (id) => axios.get(`${url}/tv/${id}/videos?api_key=${apiKey}`);

// People
export const getPopularPeople = (page = 1) => axios.get(`${url}/person/popular?api_key=${apiKey}&page=${page}`);

export const getPersonDetail = (id) => axios.get(`${url}/person/${id}?api_key=${apiKey}`);

export const getPersonCombinedCredits = (id) => axios.get(`${url}/person/${id}/combined_credits?api_key=${apiKey}`);

// Search
export const multiSearch = (query) => axios.get(`${url}/search/multi?api_key=${apiKey}&query=${query}`);