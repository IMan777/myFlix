import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./director-view.scss";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;
    if (!director) return null;

    return (
      <Card>
        <Card.Body className="directorview">
          <Card.Title>{director.Name}</Card.Title>
          <Card.Text>
            Bio:{director.Bio}
            <br />
            DOB:{director.Birth}
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
