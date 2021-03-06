import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import "./profile-view.scss";

export function ProfileEdit(props) {
  const {
    Username: prevUsername,
    Password: prevPassword,
    Email: prevEmail,
    DOB: prevDOB
  } = props.userDetails;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");

  useEffect(() => {
    setUsername(prevUsername);
    setPassword(prevPassword);
    setEmail(prevEmail);
    setDOB(prevDOB);
  }, [prevUsername, prevPassword, prevEmail, prevDOB]);

  const user = props.user;

  const handleEdit = e => {
    e.preventDefault();
    const userDetails = {
      Username: username,
      Password: password,
      Email: email,
      DOB: dob
    };
    axios
      .put(`https://my-flix-10.herokuapp.com/users/${user}`, userDetails, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then(response => {
        props.editUser(userDetails);
        console.log("Profile Edited");
        alert("Profile Edited Successfully");
      })
      .catch(e => {
        const errors = e.response.data.errors || [];
        let errorMsg = "";
        errors.forEach(err => {
          errorMsg += err.msg;
        });
        alert("Error In Editing Profile");
      });
  };

  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload();
    
}

  return (
    <Container>
      
      <Form className="profileedit">
        <h3 className="title">Profile Edit</h3>
        <p style={{ textAlign: "center" }}>
          This Section Will Allow You To Update Your Information.
        </p>
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
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={dob}
            placeholder="Enter Date of Birthday"
            onChange={e => setDOB(e.target.value)}
          />
        </Form.Group>
        <div>
          <Button variant="success" type="submit" onClick={handleEdit}>
            Edit Profile
          </Button>
        </div>
      </Form>
    </Container>
  );
}
