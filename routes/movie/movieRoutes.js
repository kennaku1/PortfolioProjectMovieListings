const MovieController = require('./movieController');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    MovieController.getPopularMovies().then(movies => {
        console.log('MOVIES: ', movies);
        res.send(movies);
    })
});

router.get('/Detail', (req, res) => {
    MovieController.getMovieDetails(157433).then(movieDetails => {
        console.log(movieDetails);
    });
});

router.get('/Video', (req, res) => {
    MovieController.getMovieVideos(157433).then(videos => {
        console.log(videos);
    })
});

router.get('/Search', (req, res) => {
    MovieController.searchMovies('Scarface').then(movies => {
        console.log(movies);
        res.send(movies);
    })
});


module.exports = router;