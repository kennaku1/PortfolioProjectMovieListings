import { Component } from 'react';
import MovieService from './MovieService';
import SearchBar from './SearchBar';
import { Checkbox, Icon, Table, Segment } from 'semantic-ui-react';
import MovieView from './MovieView';

const ListingRow = ({ title, popularity, description }) => {
    return (
        <Table.Row>
            <Table.Cell>IMAGE HERE</Table.Cell>
            <Table.Cell>{title}</Table.Cell>
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
            <Table columns={4}>
                <SearchBar onSearch={props.handleSearch}/>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell/>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Rating</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.movies.map(movie => <ListingRow title={movie.title} popularity={movie.popularity} description={movie.overview} image={movie.poster_path} id={movie.id}/>)}
                </Table.Body>
            </Table>
        </div>
    );
};

export default class MovieListings extends Component {
    constructor() {
        super();
        this.state = {
            movies : [],
            isLoading : true
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
        MovieService.init().then(res => {
            this.setState({
                movies: res.listings,
                isLoading: false
            });
        });
    }

    handleSearch(val) {
        MovieService.searchByName(val).then(res => {
            this.setState({
                movies: res,
                isLoading: false
            });           
        });
    }

    render() {
        return (
            <div className="movieListingsContainer">
                <h1>Movie Listings</h1>
                <Segment loading={this.isLoading}>
                    <ListingTable onSearch={this.handleSearch.bind(this)}/>
                </Segment>
            </div>
        );
    }
}