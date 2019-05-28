const MovieService = require('../../service/movieService');
const MovieListing = require('../../service/movieListing');
const service = new MovieService();

const testMovieID = 246655;
const testMovieTitle = 'X-Men: Apocalypse'
const testPersonId = 2888;
const testPersonName = 'Will Smith';

describe('Movie Service & API calls to themoviedb API', () => {
  test('MovieService returned.', () => {
  	expect(service).toBeDefined()
  })

  test('getPopularMovies, should return results.', () => {
  	service.getPopularMovies()
  	.then(res => {
			expect(res).toBeDefined()
			expect(res.listings).toBeDefined()
  	})
	})
	
  test('getPopularMovies, with page option', () => {
  	service.getPopularMovies(2)
  	.then(res => {
  		expect(res).toBeDefined()	
  	})
	})
	
  test('getMovieDetails', () => {
  	service.getMovieDetails(testMovieID)
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
  	service.searchMovies(testMovieTitle)
  	.then(res => {
			expect(res).toBeDefined()	
			expect(res.listings).toBeDefined()	
  	})
	})		
	
	test('get MovieDB People results', () => {
		service.getPersonDetails(testPersonId)
		.then(res => {
			expect(res).toBeDefined()
			expect(res.id).toBe(testPersonId)
			expect(res.name).toBe(testPersonName)
		})
	})
})