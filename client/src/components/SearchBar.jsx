import React, { Component } from 'react';
import { Icon, Segment, Input } from 'semantic-ui-react';

export default class SearchBar extends Component{
	constructor(props) {
		super();
		this.state = {
			executeSearch : props.handleSearch,
			value: null
		};
	}

	executeSearch() {
		if (this.state.executeSearch && this.state.value) this.state.executeSearch(this.state.value);
	}

	handleKey(e) {
		if (e.key && e.key === 'Enter') this.executeSearch()
	}

	handleValueChange(e) {
		this.setState({ value : e.target.value });
	}

	render() {
		return (
			<Input id="seachBar"icon='search' iconPosition='left' value={this.state.value} onKeyPress={this.handleKey.bind(this)} onChange={this.handleValueChange.bind(this)} onBlur={this.executeSearch.bind(this)} placeholder='Search movies...'/> 
		)
	}
}
