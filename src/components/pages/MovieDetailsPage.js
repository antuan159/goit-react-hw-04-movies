import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import MovieCastPage from './MovieCastPage';
import MovieReviewsPage from './MovieReviewsPage';
import routes from '../../routes';
import api from '../Services/api';
import style from './MovieDetailsPage.module.css';

export default class MovieDetailsPage extends Component {
  static propTypes = {
    match: PropTypes.instanceOf(Object).isRequired,
    location: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    movie: null,
  };

  async componentDidMount() {
    const { match } = this.props;
    this.getDetailMovie(match.params.moviesId);
  }

  getDetailMovie = async id => {
    const movie = await api.getDetailMovie(id);
    this.setState({ movie });
  };

  handleGoBack = () => {
    const { location, history } = this.props;
    if (!location.state) {
      history.push('/');
      return;
    }

    history.push({
      pathname: '/movies',
      search: location.state.from.search,
    });
  };

  render() {
    const { match, location } = this.props;
    const { movie } = this.state;
    return (
      <div>
        {movie && (
          <div>
            <button type="button" onClick={this.handleGoBack}>
              Go back
            </button>
            <div className={style.description}>
              <div className={style.image}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                  alt="poster"
                />
              </div>
              <div>
                <p className={style.title}>
                  {`${movie.original_title}  (${movie.release_date.slice(
                    0,
                    4,
                  )})`}
                </p>

                <p>User score: {movie.vote_average * 10}%</p>
                <p className={style.title}>Overview</p>
                <p>{movie.overview}</p>
                <p className={style.title}>Genres</p>
                <div>
                  {movie.genres.map(index => (
                    <span key={index.id}>{index.name} </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <ul>
          <li>
            <Link
              to={{
                pathname: `${match.url}/Cast`,
                state: location.state,
              }}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: `${match.url}/Reviews`,
                state: location.state,
              }}
            >
              Reviews
            </Link>
          </li>
        </ul>

        <Switch>
          <Route exact path={routes.MOVIES_CAST} component={MovieCastPage} />
          <Route
            exact
            path={routes.MOVIES_REVIEWS}
            component={MovieReviewsPage}
          />
        </Switch>
      </div>
    );
  }
}
