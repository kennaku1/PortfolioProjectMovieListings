import React, { Component } from 'react';
import {getPopularMovies, searchMovies} from '../service/ClientMovieService.js';
import PropTypes from 'prop-types'
//import SearchBar from './SearchBar';
import { Checkbox, Icon, Table, Segment, Rating, Search, Header, Label } from 'semantic-ui-react';
import './MovieListings.css';



const resultRenderer = ({ title }) => <Label content={title} />

resultRenderer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}


const ListingRow = ({ title, popularity, description, moviePoster, launch}) => {
    return (
        <Table.Row>
            <Table.Cell><img src={moviePoster} width="250px"/> </Table.Cell>
            <Table.Cell>
                <h3>
                    <a>{title}</a>
                </h3>
            </Table.Cell>
            <Table.Cell>
                {description}
            </Table.Cell>            
            <Table.Cell>
                <Rating defaultRating={popularity} maxRating={5} disabled/>
            </Table.Cell>
        </Table.Row>
    );
};

const ListingTable = props => {
    return (
        <div className="listingTable">
            <Table columns={4} inverted>
                <Table.Header>
                    <Table.Row aligned='center'>
                        <Table.HeaderCell colSpan='4'>               
                            <input onChange={props.handleSearch} placeholder='Search movies...'/> 
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>   
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell/>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Rating</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.movies.map(movie => <ListingRow title={movie.title} popularity={movie.popularity} description={movie.description} moviePoster={movie.image} id={movie.id}/>)}
                </Table.Body>
            </Table>
        </div>
    );
};

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

    handleSearch(event, data) {
        console.log('data', event.target.value);
        this.setState({ isLoading: true });
        searchMovies(event.target.value)
        .then(listings => this.setState({ movies: listings, isLoading: false }))
        .then(() => console.log(this.state.movies));
    }

    render() {
        const movies = this.state.movies && this.state.movies.listings ? this.state.movies.listings : [];
        console.log(movies);
        return (
            <Segment inverted loading={this.isLoading} className="movieListingsContainer">
                <Header inverted as='h1' className="movieListingsHeader" textAlign="center">
                    <Icon name='play' />
                    <Header.Content>
                        Movie Listings
                        <Header.Subheader>Discover movies and watch trailers</Header.Subheader>
                    </Header.Content>
                </Header>
                <ListingTable movies={movies.splice(10)} onSearch={this.handleSearch.bind(this)} handleSearch={this.handleSearch.bind(this)}/>
            </Segment>
        );
    }
}