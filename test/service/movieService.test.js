const MovieService = require('../service/movieService');
const service = new MovieService();

describe('Movie Service & API calls to themoviedb API', () => {
  test('MovieService returned.', () => {
  	expect(service).toBeDefined()
  })

  test('getPopularMovies, should return results.', () => {
  	service.getPopularMovies()
  	.then(res => {
  		expect(actual).toBeDefined()	
  	})
  	.catch(err => console.log('getPopularMovies: An error occured during this test.'))
  })
})