const MovieController = require('./movieController');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const page = req.query && req.query.pageNumber ? req.query.pageNumber : null;
    MovieController.getPopularMovies(page).then(movies => {
        res.send(movies);
    })
    .catch(err => res.status(500).send('Internal Service Error :' + err));
});

router.get('/Detail', (req, res) => {
    if (!req.query || !req.query.movieId) MovieController.getInvalidQueryError(res);
    const movieId = req.query.movieId;
    MovieController.getMovieDetails(movieId).then(movieDetails => {
        res.send(movieDetails);
    })
    .catch(err => res.status(500).send('Internal Service Error :' + err));
});

router.get('/Search', (req, res) => {
    if (!req.query || !req.query.searchValue) MovieController.getInvalidQueryError(res);
    const searchValue = req.query.searchValue;
    const page = req.query.pageNumber || null;
    MovieController.searchMovies(searchValue, page).then(movies => {
        res.send(movies);
    })
    .catch(err => res.status(500).send('Internal Service Error :' + err));
});

router.get('/People', (req, res) => {
    if (!req.query || !req.query.personId) MovieController.getInvalidQueryError(res);
    const personId = req.query.personId;
    MovieController.getPersonDetails(personId).then(personDetails => {
        res.send(personDetails);
    })
    .catch(err => res.status(500).send('Internal Service Error :' + err));
});


module.exports = router;