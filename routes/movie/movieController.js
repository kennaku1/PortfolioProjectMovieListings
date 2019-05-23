const MovieAPI = require('../../service/movieService');

const movieService = new MovieAPI();

const getPopularMovies = page => {
    return movieService.getPopularMovies(page);
};

const getMovieDetails = movieId => {
    return movieService.getMovieDetails(movieId);
};

const searchMovies = page => {
    return movieService.searchMovies(page);
};

const getMovieVideos = movieId => {
    return movieService.getMovieVideos(movieId);
};


module.exports = {
    getPopularMovies: getPopularMovies,
    getMovieDetails: getMovieDetails,
    searchMovies: searchMovies,
    getMovieVideos, getMovieVideos
};