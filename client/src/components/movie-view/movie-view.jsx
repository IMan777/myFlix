import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-view.scss';
/*import { RegistrationView } from '../registration-view/registration-view';*/
export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  /* navigate(){
     window.open(<RegistrationView/> ) ; 
     
   } */


  render() {
    const {
      movie,
      onClick
    } = this.props;
    if (!movie) return null;
    /*Displays Selected Movie Attributes */

    return React.createElement("div", {
      className: "movie-view"
    }, React.createElement(Card.Body, {
      style: {
        width: '18rem'
      },
      className: "view-movie"
    }, React.createElement(Card.Img, {
      variant: "top",
      className: "movie-poster",
      src: movie.ImagePath
    }), React.createElement(Card.Title, {
      className: "label"
    }, "Title"), React.createElement(Card.Text, {
      className: "value"
    }, movie.Title), React.createElement(Card.Title, {
      className: "label"
    }, "Description"), React.createElement(Card.Text, {
      className: "value"
    }, movie.Description), React.createElement(Card.Title, {
      className: "label"
    }, "Genre"), React.createElement(Card.Text, {
      className: "value"
    }, movie.Genre.Name), React.createElement(Card.Title, {
      className: "label"
    }, "Director"), React.createElement(Card.Text, {
      className: "value"
    }, movie.Director.Name), React.createElement("br", null), React.createElement(Button, {
      variant: "success",
      onClick: () => onClick()
    }, "Movie List")));
  }

}