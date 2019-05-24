export const getPopularMovies = (page = 1) => {
    return new Promise((resolve, reject) => {
        fetch('/Movie', 
        {
            method: "GET"
        })
        .then(response => response.json())
        .then(listings => {
            console.log(listings);
            resolve(listings)
        })
        .catch(err => console.log(err));
    });

};

export const searchMovies = (searchValue, page = 1) => {
    return new Promise((resolve, reject) => {
        if (!searchValue || !page) reject('Invalid Search Value')
        let data = new FormData();
        data.append('pageNumber', page);
        data.append('searchValue', searchValue);
        fetch('/Movie/Search', 
        {
            method: "POST",
            headers:  {'content-type': 'application/json'},
            body: JSON.stringify({ 
                pageNumber: page,
                searchValue: searchValue
            })
        })
        .then(response => response.json())
        .then(listings => {
            console.log(listings);
            resolve(listings)
        })
        .catch(err => console.log(err));
    });

};