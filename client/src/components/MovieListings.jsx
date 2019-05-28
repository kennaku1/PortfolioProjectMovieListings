import React, { Component } from 'react';
import { Icon, Segment, Header, Grid } from 'semantic-ui-react';
import { getPopularMovies, searchMovies } from '../service/ClientMovieService.js';
import { MovieListingsTable } from './MovieListingsTable';

const POPULAR_MODE = 'POPULAR';
const SEARCH_MODE = 'SEARCH';

export default class MovieListings extends Component {
    constructor() {
        super();
        this.state = {
            movies : {},
            isLoading : true,
            searchResults : [],
            searchValue : '',
            activePage: 1,
            mode : POPULAR_MODE
        };
    }

    get isLoading() {
        return this.state.isLoading;
    }

    set isLoading(val) {
        if (typeof variable !== "boolean") return;
        this.setState({
            isLoading: val
        });
    }

    get totalPages() {
        const { mode, movies } = this.state;
        if (mode === SEARCH_MODE) return 1;
        return movies.totalPages;
    }

    componentWillMount() {
        //Get results
        getPopularMovies()
        .then(listings => this.setState({ movies: listings, isLoading : false }))
    }

    handleSearch(val) {
        this.isLoading = true;
        searchMovies(val)
        .then(listings => this.setState({ movies: listings, isLoading: false, mode: SEARCH_MODE, searchValue: val }))
    }

    onPageChange(event, { activePage }) {
        const { mode, searchValue } = this.state;
        if (mode === SEARCH_MODE) {
            this.isLoading = true;
            searchMovies(searchValue, activePage)
            .then(listings => this.setState({ movies: listings, isLoading : false, activePage }))
        } else if (mode === POPULAR_MODE) {
            this.isLoading = true;
            getPopularMovies(activePage)
            .then(listings => this.setState({ movies: listings, isLoading : false, activePage }))
        }
    }

    render() {
        const movies = this.state.movies && this.state.movies.listings ? this.state.movies.listings : [];
        return (
            <Segment inverted textAlign='center'>
                <Segment inverted textAlign='center'>
                    <Grid textAlign='center' columns={1}>
                        <Header as="h1" textAlign='center' inverted>
                            <Icon name='play'/>
                            <Header.Content>
                                Movie Listings
                                <Header.Subheader>Discover movies and watch trailers</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Grid>
                </Segment>            
                <Segment inverted loading={this.isLoading} className="movieListingsContainer">
                    <MovieListingsTable movies={movies} handleSearch={this.handleSearch.bind(this)} activePage={this.state.activePage} totalPages={this.totalPages} onPageChange={this.onPageChange.bind(this)}/>
                </Segment>
            </Segment>
        );
    }
}