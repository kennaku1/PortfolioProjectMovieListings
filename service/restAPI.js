const fetch = require('node-fetch');

class RestAPI {

    buildURI(base, path, options) {
        return new Promise((resolve, reject) => {
            try {
                if (!options) resolve(`${base}/${path}`);
                let params = null;
                for (const prop in options) {
                    if (params) params += `&${prop}=${encodeURI(options[prop])}`
                    else params = `${prop}=${encodeURI(options[prop])}`;
                }
                let uri = `${base}/${path}?${params}`;
                resolve(uri);
            } catch(err) {
                reject(err);
            }
        });
    }

    get(base, path, options) {
        return new Promise((resolve, reject) => {
            this.buildURI(base, path, options)
            .then(fullURI => {
                return fetch(fullURI)
            })
            .then(response => {
                if (response.ok) return response.json();
                throw 'Request Error';
            })
            .then(data => {
              resolve(data);
            })
            .catch(error => reject(error));
        });
    }
}

module.exports = RestAPI;