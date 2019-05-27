const MovieController = require('./movieController');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    MovieController.getPopularMovies().then(movies => {
        res.send(movies);
    })
});

router.get('/Detail', (req, res) => {
    const movieId = req.query.movieId;
    MovieController.getMovieDetails(movieId).then(movieDetails => {
        res.send(movieDetails);
    })
    .catch(err => console.log('Error: ', err));
});

router.get('/Video', (req, res) => {
    const movieId = req.query.movieId;
    MovieController.getMovieVideos(movieId).then(videos => {
        res.send(videos);
    })
});

router.get('/Search', (req, res) => {
    const searchValue = req.query.searchValue;
    MovieController.searchMovies(searchValue).then(movies => {
        res.send(movies);
    })
});

router.get('/People', (req, res) => {
    const personId = req.query.personId;
    MovieController.getPersonDetails(personId).then(personDetails => {
        res.send(personDetails);
    })
});


module.exports = router;