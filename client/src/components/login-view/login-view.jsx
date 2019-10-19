import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("https://my-flix-10.herokuapp.com/login", {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log("Nonexistent User");
        alert("Nonexistent User. Please Try Again.");
      });
  };

  return (
    <Container>
      
      <Form className="loginForm">
      <h4 className="title">Login</h4>
      <h5 className="title">or register to join!</h5>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        
        <br></br>
        <div>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Log In
          </Button>
          {"   "}
          <Link to={`/register`}>
            <Button variant="dark">Resigter</Button>
          </Link>
        </div>
      </Form>
    </Container>
  );
}
