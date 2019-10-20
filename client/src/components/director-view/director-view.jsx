import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import {connect} from "react-redux";
import "./director-view.scss";

function DirectorView(props)  {
  
    const { directorName , movies } = props;
    if (!movies) return null;

    const director = movies.find(movie => movie.Director.Name === directorName).Director;
    return (
      <Card>
        <h3 className="title">Director Info</h3>
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

  export default connect (({movies}) =>({movies}))(DirectorView);
