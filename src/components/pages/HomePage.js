import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../Services/api';

export default class HomePage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    this.fecthPopularMovies();
  }

  fecthPopularMovies = async () => {
    const movies = await api.getPopularMovies();
    this.setState({ movies });
    //
  };

  render() {
    const { movies } = this.state;
    return (
      <div>
        <h1>Trending today</h1>
        <ul>
          {movies.map(move => (
            <li key={move.id}>
              <Link to={`/movies/${move.id}`}>{move.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
