import React, { Component } from 'react'
import { Modal, Header } from 'semantic-ui-react';
import { getPeopleDetails, getImageURL } from '../service/ClientMovieService.js';

export default class PersonView extends Component {
    constructor(props) {
        super();
        this.state = {
            person: null,
            personId: props.personId
        };
    }

    get isLoading() {
        return this.state.person === null;
    }

    componentWillMount() {
        const personId = this.state.personId;
        getPeopleDetails(personId)
        .then(res => {
            this.setState({
                person: res
            });
        });
    }

    render() {
        const person = this.state.person;
        if (!person) return '';
        const ageStatement = person && person.deathday ? `${person.birthday} to ${person.deathday}` : `${person.birthday} to Current`;
        return (
            <Modal.Content scrolling>
                <p>
                    <h3>{person.name}</h3>
                    <h4>{ageStatement}</h4>
                </p>
                <p>
                    <img width="150px" src={getImageURL(person.profile_path)}/>
                </p>
                <p>
                    {person.biography}
                </p>
            </Modal.Content>
        );
    }
    
}