import React, { Component } from 'react'
import { Modal, Header } from 'semantic-ui-react';
import { getPeopleDetails, getImageURL } from '../service/ClientMovieService.js';
import PersonView from './PersonView';

const TriggerTitle = (title, id) => {
  return (
      <a value={id}>{title}</a>
  );
};

const PersonContent = async function({ onStart}) {
  if (!onStart) return null;
  const person = await onStart();
  if (!person) return 'Person Details not found..';
  const ageStatement = person && person.deathday ? `${person.birthday} to ${person.deathday}` : `${person.birthday} to Current`;
  return (
    <div>
      <p>
        <h3>{person.name}</h3>
        <h4>{ageStatement}</h4>
      </p>
      <p>

      </p>
      <p>
        {person.biography}
      </p>
    </div>
  );
};

const PeopleDetailModal = ({ person, index, isCrew, onStart }) => {
  const title = isCrew ? `${person.name} as ${person.job}` : `${person.name} as ${person.character}`;
  return (
    <li>
      <Modal trigger={<a value={person.id}>{title}</a>} size="small">
        <Header content={title} />
        <PersonView personId={person.id}/>
      </Modal>
    </li>
  );

};

export default class PeopleDetails extends Component {

  constructor(props) {
    super();
    this.state = {
      people: props.people || [],
      isCrew : props.isCrew
    };
  }


  getPersonDetails(index) {
    return new Promise((resolve, reject) => {
      const people = this.state.people;
      let person = people && people.length ? people[index] : null;
      if (!person || person.hasDetails) reject('Invalid Person');
      else if (person.hasDetails) resolve(person);
      else {
        getPeopleDetails(person.id)
        .then(res => {
          Object.assign(person, res);
          person.hasDetails = true;
          people[index] = person;
          this.setState({
            people: people
          });
          resolve(person);
        });
      }
    });
  }

  getTiles() {
    if (!this.state.people) return null;
    return this.state.people.map((person, index) => <PeopleDetailModal key={index} person={person} isCrew={this.state.isCrew} onStart={this.getPersonDetails.bind(this, index)}/>)
  }

  render() {
    const tiles = this.getTiles();
    console.log('tiles: ', tiles);
    return (
      <ul>
        {this.state.people.map((person, index) => <PeopleDetailModal key={index} person={person} isCrew={this.state.isCrew} onStart={this.getPersonDetails.bind(this, index)}/>)}
      </ul>
    );
  }
}
