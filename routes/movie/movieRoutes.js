const MovieController = require('./movieController');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    MovieController.getPopularMovies().then(movies => {
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

router.post('/Search', (req, res) => {
    const searchValue = req.body.searchValue;
    MovieController.searchMovies(searchValue).then(movies => {
        //console.log(movies);
        res.send(movies);
    })
});


module.exports = router;