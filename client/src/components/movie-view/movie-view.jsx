import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import './movie-view.scss';

 function MovieView(props) {
 const {
    movies ,movieId
  } = props;
  if (!movie) return null;
  const movie = movies.find(m => m._id === movieId);
  
  
  function addMovie(event) {
    event.preventDefault();
    console.log('click click boom')
    axios.post(`https://my-flix-10.herokuapp.com/users/${localStorage.getItem('user')}/movies/${movie._id}`, {
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

  return (
    <div >
      <Card className="view-movie">
      <Card.Img variant="top" className="movie-poster" src={movie.ImagePath} />
      <Card.Body style={{ width: '16rem' }} >
        <Card.Title className="label">Title</Card.Title>
        <Card.Text className="value">{movie.Title}</Card.Text>

        <Card.Title className="label">Description</Card.Title>
        <Card.Text className="value">{movie.Description}</Card.Text>
        <div>
          <Link to={`/genres/${movie.Genre.Name}`}><Button variant="link">Genre</Button></Link>
          <Link to={`/directors/${movie.Director.Name}`}><Button variant="link">Director</Button></Link>
          <Link to={'/'}><Button variant="success" size='sm' >Movies</Button> </Link>

               <Button variant="outline-primary" size="lg" onClick={event => addMovie(event)}> Add to Favourites </Button>
        </div>
      </Card.Body>
      </Card>
    </div>


  );

}
export default connect(({movies}) => ({movies}))(MovieView);