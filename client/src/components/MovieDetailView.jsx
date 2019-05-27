import React, { Component } from 'react';
import { Segment, Modal, Grid, Label, Rating, Tab } from 'semantic-ui-react';
import { getMovieDetails } from '../service/ClientMovieService.js';
import './MovieDetailView.css';

// const crewView = props => {
// 	return (

// 	)
// }

const panes = [
  { menuItem: 'Trailers', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: 'Similiar Movies', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: 'Cast', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: 'Crew', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> }
]

const DetailTabs = () => <Tab panes={panes} menu={{ color: 'white', inverted: true, attached: false, tabular: false }}/>

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

    getDetails() {
    	getMovieDetails(this.state.movieId)
    	.then(res => this.setState({ movieDetails : res }))
    	.catch(err => console.log('ERROR: ', err));    	
    }

    get isLoading() {
        return this.state.movieDetails === null;
    }

    render() {
    	const movie = this.state.movieDetails;
    	const trigger = (
	    	<span onClick={() => this.getDetails()}>
	    		{this.state.triggerElement} 
	    	</span>
    	);
    	const poster = movie ? movie.image : null;
    	const releaseDate = movie && movie.releaseDate ? movie.releaseDate : 'Unknown';
    	const title = movie ? movie.title : '';
    	const status = movie && movie.status ? movie.status : 'Unknown';
    	const description = movie ? movie.description : '';
    	const tagline = movie ? movie.tagline : '';
    	const rating = movie && movie.rating ? movie.rating : 0;
    	const genres = movie && movie.genres ? movie.genres.map(genre => <Label as='a' tag color='blue'>{genre}</Label>) : null;
        return (
          <Modal trigger={trigger} basic>
	        <Modal.Header>Movie Details</Modal.Header>
          		<img className="MovieViewPoster" src={poster} width="350px" height="100%"/>
          		<div className="MovieViewDetails">
			        <p> 
			        	<h2>{title} ({releaseDate})</h2>
			        </p>
			        <p>
					    <h3>{tagline}</h3>
			        </p>	
			        <p>
			        	{genres}
			        </p>		        	
			        <p>
					    <Label as='a' tag>
					      {status}
					    </Label>
			        </p>
			        <p>
					    <Rating defaultRating={rating} maxRating={5} disabled/>
			        </p>			        
			        <p>
					    {description}
			        </p>	
			        <p>
					   <DetailTabs/>
			        </p>				        		        		        
          		</div>
	       
	      </Modal>
        );
    }
}