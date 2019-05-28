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

const getPersonDetails = personId => {
	return movieService.getPersonDetails(personId);
};

const getInvalidQueryError = res => {
    res.status(400).send('Invalid API Query');
};


module.exports = {
    getPopularMovies: getPopularMovies,
    getMovieDetails: getMovieDetails,
    searchMovies: searchMovies,
    getPersonDetails: getPersonDetails,
    getInvalidQueryError: getInvalidQueryError
};