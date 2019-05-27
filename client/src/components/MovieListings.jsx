import React, { Component } from 'react';
import { Icon, Table, Segment, Header } from 'semantic-ui-react';
import {getPopularMovies, searchMovies} from '../service/ClientMovieService.js';
import SearchBar from './SearchBar';
import {MovieListingsTable} from './MovieListingsTable';
import './MovieListings.css';

export default class MovieListings extends Component {
    constructor() {
        super();
        this.state = {
            movies : {},
            isLoading : true,
            searchResults : [],
            searchValue : ''
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

    componentWillMount() {
        //Get results
        getPopularMovies()
        .then(listings => this.setState({ movies: listings, isLoading : false }))
    }

    handleSearch(val) {
        this.isLoading = true;
        searchMovies(val)
        .then(listings => this.setState({ movies: listings, isLoading: false }))
    }

    render() {
        const movies = this.state.movies && this.state.movies.listings ? this.state.movies.listings : [];
        return (
            <Segment inverted textAlign='center'>
                <Segment inverted textAlign='center'>
                    <Header as="h1" textAlign='center' inverted>
                        <Icon name='play' />
                        <Header.Content>
                            Movie Listings
                            <Header.Subheader>Discover movies and watch trailers</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Segment>            
                <Segment inverted loading={this.isLoading} className="movieListingsContainer">
                    <MovieListingsTable movies={movies} handleSearch={this.handleSearch.bind(this)}/>
                </Segment>
            </Segment>
        );
    }
}