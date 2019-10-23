import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import "./genre-view.scss";


function GenreView (props) {
 
    const { genre} = props;
    if (!genre) return null;

    

    return (
      <Container>
        
      <Card>
        <h3 className="title">Genre Info</h3>
        <Card.Body className="genreview">
          <Card.Title>{genre.Name}</Card.Title>
          <Card.Text>
            Description:{genre.Description}
            <br />
          </Card.Text>
          <div>
            <Link to={'/'}>
              <Button variant="dark">Return</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
      </Container> 
    );
  }

export default connect (({movies}) =>({movies}))(GenreView);