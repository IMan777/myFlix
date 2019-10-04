import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-view.scss';

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
        <Card.Body>
          <Card.Title className="label">Title</Card.Title>
          <Card.Text className="value">{movie.Title}</Card.Text>
        
          <Card.Title className="label">Description</Card.Title>
          <Card.Text className="value">{movie.Description}</Card.Text>
     
          <Card.Title className="label">Genre</Card.Title>
          <Card.Text className="value">{movie.Genre.Name}</Card.Text>
       
        
          <Card.Title className="label">Director</Card.Title>
          <Card.Text className="value">{movie.Director.Name}</Card.Text>
       
        <br></br>
        <Button variant="success" onClick={() => onClick() }>Movie List</Button> 
       </Card.Body>
</div>
       

    );
    
  }
}