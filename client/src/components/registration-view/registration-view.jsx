import React, { useState } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [DOB, setDOB] = useState("");

  const submitRegistration = e => {
    e.preventDefault();

    axios.post("https://my-flix-10.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        DOB: DOB
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
      })
      .catch(e => {
        console.log("Error Registering New User");
      });
  };

  return (
    <Container>
      <Form className="registrationForm">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Set Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Set Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter EMail"
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicDOB">
          <Form.Label>Date Of Birth:</Form.Label>
          <Form.Control
            type="date"
            value={DOB}
            placeholder="Enter Date of Birth"
            onChange={e => setDOB(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckBox">
          <Form.Check type="checkbox" label="Check Me Out" />
        </Form.Group>
        <Button variant="dark" onClick={submitRegistration}>
          Submit
        </Button>
        <Link to={`/`}>
          <Button variant="outline-info">Return</Button>
        </Link>
      </Form>
    </Container>
  );
}

RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  DOB: PropTypes.string.isRequired,
  newMember: PropTypes.func.isRequired,
  newRegistration: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
