const movieController = require('../../routes/movie/movieController')

const testMovieID = 246655
const testMovieTitle = 'X-Men: Apocalypse'

describe('MovieController test', () => {

    test('MovieController returned.', () => {
        expect(movieController).toBeDefined()
    })

    test('getPopularMovies, should return results.', () => {
        movieController.getPopularMovies()
            .then(res => {
                expect(res).toBeDefined()
                expect(res.listings).toBeDefined()
            })
    })

    test('getPopularMovies, with page option', () => {
        movieController.getPopularMovies(2)
            .then(res => {
                expect(res).toBeDefined()
            })
    })

    test('getMovieDetails', () => {
        movieController.getMovieDetails(testMovieID)
            .then(res => {
                expect(res).toBeDefined()
                expect(res.title).toEqual(testMovieTitle)
                expect(res.id).toEqual(testMovieID)
                expect(res.related).toBeDefined()
                expect(res.cast).toBeDefined()
                expect(res.crew).toBeDefined()
            })
    })

    test('searching for value', () => {
        movieController.searchMovies(testMovieTitle)
            .then(res => {
                expect(res).toBeDefined()
                expect(res.listings).toBeDefined()
            })
    })
})