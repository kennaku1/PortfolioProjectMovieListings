const RestAPI = require('./restAPI');
const MovieDBConfig = require('../config/movieDBAuth.json');
const MovieListing = require('./MovieListing');

const PATHS = Object.freeze({
    search: 'search',
    popular: 'popular',
    movie: 'movie',
    credits: 'credits',
    similar: 'similar',
    person: 'person'
});

const ENDPOINT = 'https://api.themoviedb.org';
const APIVERSION = '3';

const buildRequestOptions = (apiKey, local, params = {}) => {
    let base = { 
        api_key: apiKey, 
        language: local 
    };
    return Object.freeze(Object.assign(base, params));
};

const buildPath = (...routes) => {
    return routes.join('/');
};

class MovieService extends RestAPI {
    constructor(local = 'en-US') {
        super();
        this.local = local;
    }

    getPopularMovies(page = 1) {
        return new Promise((resolve, reject) => {
            super.get(
                buildPath(ENDPOINT, APIVERSION),
                buildPath(PATHS.movie, PATHS.popular),
                buildRequestOptions(
                    MovieDBConfig.apiKey,
                    this.local,
                    { 
                        page: page
                    }
                )
            )
            .then(response => {
                resolve(resolveMovieListings(response));
            })
        });

    }

    getMovieDetails(movieId) {
        return new Promise((resolve, reject) => {
            super.get(
                buildPath(ENDPOINT, APIVERSION),
                buildPath(PATHS.movie, movieId),
                buildRequestOptions(
                    MovieDBConfig.apiKey,
                    this.local
                )
            )
            .then(response => this.getMovieCast(new MovieListing(response).withMovieDetails(response)))
            .then(response => this.getRelatedMovies(response))
            .then(results => resolve(results))
            .catch(err => reject(err));
        });
    }
    /**
        @param movie: takes in an instance of a MovieListing
    **/
    getMovieCast(movie) {
        return new Promise((resolve, reject) => {
            if (!movie || !movie instanceof MovieListing || movie.id === null) reject('Invalid Movie');
            super.get(
                buildPath(ENDPOINT, APIVERSION),
                buildPath(PATHS.movie, movie.id, PATHS.credits),
                {
                    api_key: MovieDBConfig.apiKey
                },
                {
                    movie_id: movie.id
                }
            )
            .then(response => {
                resolve(movie.withCast(response));
            })
            .catch(err => reject(err));
        });
    }

    /**
        @param movie: takes in an instance of a MovieListing
    **/
    getRelatedMovies(movie, page = 1) {
        return new Promise((resolve, reject) => {
            if (!movie || !movie instanceof MovieListing || movie.id === null) reject('Invalid Movie');
            super.get(
                buildPath(ENDPOINT, APIVERSION),
                buildPath(PATHS.movie, movie.id, PATHS.similar),
                buildRequestOptions(
                    MovieDBConfig.apiKey,
                    this.local
                ),
                {
                    movie_id: movie.id,
                    page: page
                }                
            )
            .then(response => {
                resolve(movie.withRelated(response));
            })
            .catch(err => reject(err));
        });
    }    

    searchMovies(queryTitle, page = 1, showAdult = false) {
        return new Promise((resolve, reject) => {
            super.get(
                buildPath(ENDPOINT, APIVERSION),
                buildPath(PATHS.search, PATHS.movie),
                buildRequestOptions(
                    MovieDBConfig.apiKey,
                    this.local,
                    { 
                        query: queryTitle,
                        include_adult: showAdult,
                        page: page
                    }
                )
            )
            .then(response => {
                resolve(resolveMovieListings(response));
            })
            .catch(err => reject(err));
        });
    }

    getPersonDetails(personId) {
        if (!personId) reject('Invalid Person');
        return new Promise((resolve, reject) => {
            super.get(
                buildPath(ENDPOINT, APIVERSION),
                buildPath(PATHS.person, personId),
                buildRequestOptions(
                    MovieDBConfig.apiKey,
                    this.local,
                    { 
                        person_id: personId
                    }
                )
            )
            .then(response => {
                resolve(response);
            })
            .catch(err => {

            })
        });        
    }

}

const resolveMovieListings = ({ page, total_pages, results }) => {
    const listings = results.map(movie => new MovieListing(movie));
    return {
        listings: listings,
        page: page,
        totalPages: total_pages
    };
};

module.exports = MovieService;