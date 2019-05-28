import React, { Component } from 'react';
import { Checkbox, Icon, Table, Segment, Rating, Search, Header, Label, Input, Pagination } from 'semantic-ui-react';
import SearchBar from './SearchBar';
import MovieDetailView from './MovieDetailView';
import { getImageURL } from '../service/ClientMovieService.js';
import './MovieListingsTable.css';

const ListingRow = ({ id, title, rating, description, moviePoster, launch}) => {
    const headerElement = (
        <h3>
            <a>{title}</a>
        </h3>
    );
    const actionLink = title && id ? <MovieDetailView key={id} trigger={headerElement} movieTitle={title} movieId={id}/> : null;
    return (
        <Table.Row key={id}>
            <Table.Cell><img src={getImageURL(moviePoster)} width="250px"/> </Table.Cell>
            <Table.Cell>
                {actionLink}
            </Table.Cell>
            <Table.Cell>
                {description}
            </Table.Cell>            
            <Table.Cell>
                <Rating defaultRating={rating} maxRating={5} disabled inverted/>
            </Table.Cell>
        </Table.Row>
    );
};

export const MovieListingsTable = props => {
    return (
        <div>
            <Table columns={4} className="MovieListingsTable" inverted>
                <Table.Header>
                    <Table.Row align="center">
                        <Table.HeaderCell colSpan='4'>              
                            <SearchBar handleSearch={props.handleSearch} />
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
                    {props.movies.map((movie, index )=> <ListingRow key={index} title={movie.title} rating={movie.rating} description={movie.description} moviePoster={movie.image} id={movie.id}/>)}
                </Table.Body>
                <Table.Footer fullWidth>
                  <Table.Row align="center">
                    <Table.HeaderCell colSpan='4'>        
                        <Pagination defaultActivePage={1} activePage={props.activePage} totalPages={props.totalPages} onPageChange={props.onPageChange} inverted/>
                    </Table.HeaderCell>   
                  </Table.Row>  
                </Table.Footer>
            </Table>
        </div>
    );
};