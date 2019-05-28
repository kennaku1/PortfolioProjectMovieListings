import React, { Component } from 'react';
import { Modal, Label, Rating, Tab, Loader } from 'semantic-ui-react';
import { getMovieDetails, getImageURL } from '../service/ClientMovieService.js';
import PeopleDetails from './PeopleDetails';
import './MovieDetailView.css';

const SimliarMovies = ({ list, redirect }) => {
	const rows = list.map(item => <li><a href="void(0);" onClick={(e) => redirect(e, item.id)}>{item.title}</a></li>);
	return (
		<ul>
			{rows}
		</ul>
	);
};

const panes = ( cast, crew, similiarMovies, redirect ) => {
	return [
		{ menuItem: 'Similiar Movies', render: () => <Tab.Pane key={1} inverted><SimliarMovies list={similiarMovies} redirect={redirect}/></Tab.Pane> },
		{ menuItem: 'Cast', render: () => <Tab.Pane key={2} inverted> <PeopleDetails people={cast} isCrew={false}/> </Tab.Pane> },
		{ menuItem: 'Crew', render: () => <Tab.Pane key={3} inverted> <PeopleDetails people={crew} isCrew={true}/> </Tab.Pane> }
	];
}

const DetailTabs = ({ panes }) => <Tab panes={panes} menu={{ color: 'white', inverted: true, attached: false, tabular: false }} />

const MovieDetailContent = ({ movie, detailPanes }) => {
	if (!movie) return <Loader/>;

	const poster = movie ? movie.image : null;
	const genres = movie && movie.genres ? movie.genres.map(genre => <Label as='a' tag color='blue'>{genre}</Label>) : null;	
	return (
		<div>
			<img className="MovieViewPoster" src={getImageURL(poster)} width="350px" height="100%" />
			<div className="MovieViewDetails">
				<p>
					<h2>{movie.title} ({movie.releaseDate})</h2>
				</p>
				<p>
					<h3>{movie.tagline}</h3>
				</p>
				<p>
					{genres}
				</p>
				<p>
					<Label as='a' tag>
						{movie.status}
					</Label>
				</p>
				<p>
					<Rating icon='star' rating={movie.rating} maxRating={5} disabled />
				</p>
				<p>
					{movie.description}
				</p>
				<p>
					<DetailTabs panes={detailPanes}/>
				</p>
			</div>
		</div>
	);	
}

export default class MovieDetailView extends Component {
	constructor(props) {
		super();
		this.state = {
			movieId: props.movieId,
			triggerElement: props.trigger,
			movieDetails: null,
			movieTitle: props.movieTitle
		}
	}

	redirect(event, movieId) {
		event.preventDefault();
		getMovieDetails(movieId)
			.then(res => this.setState({ movieDetails: res }))
			.catch(err => console.log('ERROR: ', err));		
	}

	getDetails() {
		getMovieDetails(this.state.movieId)
			.then(res => this.setState({ movieDetails: res }))
			.catch(err => console.log('ERROR: ', err));
	}

	get isLoading() {
		return this.state.movieDetails === null;
	}

	detailPanes() {
		const movieDetails = this.state.movieDetails;
		if (!movieDetails) return;
		return panes(movieDetails.cast, movieDetails.crew, movieDetails.related, this.redirect.bind(this));
	}

	render() {
		const movie = this.state.movieDetails;
		const trigger = (
			<span onClick={() => this.getDetails()}>
				{this.state.triggerElement}
			</span>
		);

		return (
			<Modal trigger={trigger} dimmer="blurring" basic closeIcon>
				<Modal.Header>Movie Details</Modal.Header>
				<MovieDetailContent movie={movie} detailPanes={this.detailPanes()}/> 
			</Modal>
		);
	}
}