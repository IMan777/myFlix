import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-view.scss';

import { Link } from "react-router-dom";

function addMovie(event) {
  event.preventDefault();
  axios.post(`https://my-flix-10.herokuapp.com/users/${localStorage.getItem('user')}/FavouriteFilms/${movie._id}`, {
    Username: localStorage.getItem('user')
  }, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
    .then(response => {
      console.log(response);
      alert('This Movie Has Been Added To Your Favorites');
    })
    .catch(event => {
      console.log('Error!');
      alert('Error! Movie Not Added');
    });
};


export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      movie,
      onClick
    } = this.props;
    if (!movie) return null;
    /*Displays Selected Movie Attributes */

    return (
    <div className="movie-view">

<Card.Img variant="top" className="movie-poster" src={movie.ImagePath} />  
        <Card.Body style={{ width: '14rem' }}>
          <Card.Title className="label">Title</Card.Title>
          <Card.Text className="value">{movie.Title}</Card.Text>
        
          <Card.Title className="label">Description</Card.Title>
          <Card.Text className="value">{movie.Description}</Card.Text>
          <div>
          <Link to={`/genres/${movie.Genre.Name}`}><Button variant="link">Genre</Button></Link>
          <Link to={`/directors/${movie.Director.Name}`}><Button variant="link">Director</Button></Link>
          <Link to={'/'}><Button variant="success" >Movie List</Button> </Link>
           
        <Button variant="outline-secondary" onClick={event => addMovie(event)}> Add to Favourites </Button>
        </div>
       </Card.Body>
       
       
       <Link to={`/`}><Button variant="outline-info">Return</Button></Link> 
</div>
       

    );
    
  }
}