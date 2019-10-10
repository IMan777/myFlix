import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./genre-view.scss";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;
    if (!genre) return null;

    return (
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
    );
  }
}
