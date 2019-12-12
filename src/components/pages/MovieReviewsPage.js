import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../Services/api';

export default class MovieReviewsPage extends Component {
  static propTypes = {
    match: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    reviews: null,
  };

  async componentDidMount() {
    const { match } = this.props;
    this.fecthMovieReviews(match.params.moviesId);
  }

  fecthMovieReviews = async id => {
    const reviews = await api.getMoviesReviews(id);
    this.setState({ reviews });
  };

  render() {
    const { reviews } = this.state;
    const message = 'We don`t have any reviews for this movie';
    return (
      <div>
        {reviews &&
          (reviews.length === 0 ? (
            <p>{message}</p>
          ) : (
            reviews.map(index => (
              <div key={index.id}>
                <h2>{index.author}</h2>
                <p>{index.content}</p>
              </div>
            ))
          ))}
      </div>
    );
  }
}
