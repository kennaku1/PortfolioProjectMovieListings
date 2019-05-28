const ImageBaseURL = 'https://image.tmdb.org/t/p/w500';

export const getPopularMovies = (page = 1) => {
    const path = page > 1 ? buildPath('/Movie', { pageNumber: page }) : '/Movie';

    return new Promise((resolve, reject) => {
        fetch(path)
        .then(response => response.json())
        .then(listings => {
            resolve(listings)
        })
        .catch(err => reject(err));
    });

};

export const searchMovies = (searchValue, page = 1) => {
    return new Promise((resolve, reject) => {
        if (!searchValue || page < 1) reject('Invalid Search Value');
        fetch(buildPath('/Movie/Search', 
        {
            pageNumber: page,
            searchValue: searchValue
        }), 
        {
            method: "GET"
        })
        .then(response => response.json())
        .then(listings => {
            console.log('listings: ', listings);
            resolve(listings)
        })
        .catch(err => reject(err));
    });

};

export const getMovieDetails = (movieId) => {
     return new Promise((resolve, reject) => {
        if (!movieId) reject('Invalid Movie Id');
        fetch(buildPath('/Movie/Detail', {
            movieId: movieId
        }), 
        {
            method: "GET",
            headers:  {'content-type': 'application/json'}
        })
        .then(response => response.json())
        .then(listings => {
            resolve(listings);
        })
        .catch(err => reject(err));
    }); 

};

export const getPeopleDetails = (personId) => {
     return new Promise((resolve, reject) => {
        if (!personId) reject('Invalid Movie Id');
        fetch(buildPath('/Movie/People', {
            personId: personId
        }), 
        {
            method: "GET",
            headers:  {'content-type': 'application/json'}
        })
        .then(response => response.json())
        .then(listings => {
            resolve(listings);
        })
        .catch(err => reject(err));
    }); 

};

export const getImageURL = imageId => {
    return [ImageBaseURL, imageId].join('/');
};

function buildPath(base, options) {
    if (!options) return base;
    let params = null;
    for (const prop in options) {
        if (params) params += `&${prop}=${encodeURI(options[prop])}`
        else params = `${prop}=${encodeURI(options[prop])}`;
    }
    return `${base}?${params}`;
}