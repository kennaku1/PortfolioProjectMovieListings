import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieListings from './components/MovieListings';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MovieListings />
      </div>
    );
  }
}

export default App;
