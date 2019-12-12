import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../Services/api';

export default class MovieCastPage extends Component {
  static propTypes = {
    match: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    cast: null,
  };

  async componentDidMount() {
    const { match } = this.props;
    this.fecthMovieCast(match.params.moviesId);
  }

  fecthMovieCast = async id => {
    const data = await api.getMoviesCast(id);
    this.setState({ cast: data.cast });
  };

  render() {
    const { cast } = this.state;
    return (
      <div>
        {cast &&
          cast.map(index => (
            <div key={index.id}>
              <h3>Hero: {index.character}</h3>
              <p>Actor: {index.name}</p>
              <img
                src={`https://image.tmdb.org/t/p/w200${index.profile_path}`}
                alt="photoActor"
              />
            </div>
          ))}
      </div>
    );
  }
}
