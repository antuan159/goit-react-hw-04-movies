import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import api from '../Services/api';

export default class MoviesPage extends Component {
  static propTypes = {
    location: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    query: '',
    movies: null,
  };

  componentDidMount() {
    const { location } = this.props;
    if (!location.search) {
      return;
    }
    const queryObject = queryString.parse(location.search);
    this.fetchSearchMovies(queryObject.query);
  }

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.fetchSearchMovies(this.state.query);
    const { location, history } = this.props;

    history.replace({
      pathname: location.pathname,
      search: `?query=${this.state.query}`,
    });

    this.setState({ query: '' });
  };

  fetchSearchMovies = async query => {
    const searchMovies = await api.searchMovies(query);
    this.setState({ movies: searchMovies });
  };

  render() {
    const { query, movies } = this.state;
    const { location } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={query} onChange={this.handleChange} />
          <button type="submit">Search</button>
        </form>
        {movies && (
          <ul>
            {movies.map(move => (
              <li key={move.id}>
                <Link
                  to={{
                    pathname: `/movies/${move.id}`,
                    state: { from: location },
                  }}
                >
                  {move.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
