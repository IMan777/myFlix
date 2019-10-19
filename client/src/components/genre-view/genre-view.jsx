import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import {connect} from "react-redux";
import "./genre-view.scss";

function GenreView (props) {
 
    const { genName, movies} = props;
    if (!movies) return null;

    const movie = movies.find(movie => movie.genre.Name === genName);

    return (
      <Card>
        <h3 className="title">Genre Info</h3>
        <Card.Body className="genreview">
          <Card.Title>{movie.genre.Name}</Card.Title>
          <Card.Text>
            Description:{movie.genre.Description}
            <br />
          </Card.Text>
          <div>
            <Link to={'/'}>
              <Button variant="dark">Return</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }

export default connect (({movies}) =>({movies}))(GenreView);