import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import Container from 'react-bootstrap/Container';
export class MovieCard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      movie,
      onClick
    } = this.props;
    return React.createElement(Container, null, React.createElement(Card, {
      style: {
        width: '14rem'
      },
      className: "movie-card"
    }, React.createElement(Card.Img, {
      variant: "top",
      src: movie.ImagePath
    }), React.createElement(Card.Body, null, React.createElement(Card.Title, null, movie.Title), React.createElement(Card.Text, null, movie.Description), React.createElement(Button, {
      onClick: () => onClick(movie),
      variant: "dark"
    }, "Open"))));
  }

}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    })
  }).isRequired,
  onClick: PropTypes.func.isRequired
};