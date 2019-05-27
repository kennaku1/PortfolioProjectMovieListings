const IMAGEURI = 'https://image.tmdb.org/t/p/original';
const getImagePath = imagePath => {
    return [IMAGEURI, imagePath].join('');
};

class MovieListing {
    constructor({ id, poster_path, overview, adult, vote_average, title, video }) {
        this.id = id;
        this.title = title;
        this.image = getImagePath(poster_path);
        this.description = overview;
        this.isAdult = adult;
        this.hasVideo = video;
        this.rating = vote_average / 2; //Vote Rating is returning on a scale of 1-10, front end is looking for a double ranging from 0 - 5 (Star Rating System)
    }

    withMovieDetails({ budget, revenue, imdb_id, genres, release_date, tagline, status }) {
        console.log('getMovieDetails', tagline, status);
        this.budget = budget;
        this.revenue = revenue;
        this.imdbId = imdb_id;
        this.genres = genres.map(genre => genre.name);
        this.releaseDate = release_date;
        this.tagline = tagline;
        this.status = status;
        return this;
    }

    withCast({ cast, crew }) {
        this.cast = cast;
        this.crew = crew;
        return this;
    }

    withRelated({ results }) {
        this.related = results.map(movie => new MovieListing(movie));
        return this;
    }

    withVideos({ results }) {
        this.videos = results;
    }
}

module.exports = MovieListing;